from flask import Flask, jsonify # type: ignore
import firebase_admin # type: ignore
from firebase_admin import credentials, firestore # type: ignore
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import torch.nn.functional as F
import ollama # type: ignore
import json
from flask_cors import CORS # type: ignore

# Flask Setup 
app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

# Firebase Setup
cred = credentials.Certificate("./student-review.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Load Sentiment Classifier
model_path = "../initialModel"
tokenizer = AutoTokenizer.from_pretrained(model_path, local_files_only=True)
model = AutoModelForSequenceClassification.from_pretrained(model_path, local_files_only=True)
model.eval()

# Map numeric labels to strings
label_map = {0: "negative", 1: "neutral", 2: "positive"}

def classify_feedback(text: str):
    """
    Run your transformer model on a single feedback string,
    return (label, confidence).
    """
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
        probs = F.softmax(outputs.logits, dim=1)
        predicted_label = torch.argmax(probs, dim=1).item()
    return label_map[predicted_label], round(probs[0][predicted_label].item(), 4)


# Ollama-Based Feedback Analyzer 
def analyze_feedback(feedback_list):
    """
    1) Summarize feedback_list into key issues via Ollama.
    2) Ask Ollama to return JSON suggestions for each issue.
    """

    feedback_list = [fb for fb in feedback_list if fb.strip()]
    if not feedback_list:
        return "", []

    feedback_text = "\n".join(f"- {fb}" for fb in feedback_list)
    prompt_summary = f"""Here is a list of student complaints:
{feedback_text}

Summarize these feedbacks into key issues."""
    
    summary_resp = ollama.chat(
        model="llama3",
        messages=[{"role": "user", "content": prompt_summary}]
    )
    summary = summary_resp["message"]["content"].strip()

    prompt_improve = f"""
Here are the summarized student feedback issues:

{summary}

Return a JSON array where each object has:
  - "issue": the specific issue
  - "suggestion": one actionable improvement for that issue

Respond ONLY with valid JSON (no extra text)."""
    
    suggestion_resp = ollama.chat(
        model="llama3",
        messages=[{"role": "user", "content": prompt_improve}]
    )
    raw_json = suggestion_resp["message"]["content"].strip()

    try:
        suggestions_json = json.loads(raw_json)
    except json.JSONDecodeError:
        print("Ollama did not return valid JSON. Raw output:")
        print(raw_json)
        suggestions_json = []

    return summary, suggestions_json

# Endpoints 
@app.route('/')
def home():
    return 'Student Review Suggestion API is running.'

@app.route("/classify_feedbacks", methods=["POST"])
def classify_feedbacks():
    """
    Re-classify all feedbacks and optionally update their sentiment in Firestore.
    """
    feedbacks_ref = db.collection("feedback")
    docs = feedbacks_ref.stream()

    results = []
    for doc in docs:
        data = doc.to_dict()
        text = data.get("comment", "").strip()
        if not text:
            continue
        sentiment, confidence = classify_feedback(text)

        # Update the document with new sentiment (optional)
        doc.reference.update({"sentiment": sentiment})

        results.append({
            "id": doc.id,
            "feedback": text,
            "predicted_sentiment": sentiment,
            "confidence": confidence
        })

    return jsonify(results)



@app.route("/suggest_improvements/<teacher_id>", methods=["GET"])
def suggest_improvements(teacher_id):
    """
    Suggest improvements for a specific teacher:
    - Fetch only feedbacks with sentiment == "negative"
    - Use Ollama to analyze the issues and suggest improvements
    """
    feedbacks_ref = db.collection("feedback")
    docs = feedbacks_ref.where("teacherId", "==", teacher_id).where("sentiment", "==", "negative").stream()

    negative_texts = []
    for doc in docs:
        data = doc.to_dict()
        text = data.get("comment", "").strip()
        if text:
            negative_texts.append(text)

    if not negative_texts:
        return jsonify({
            "teacher_id": teacher_id,
            "message": "No negative feedback found.",
            "summary": "",
            "suggestions": []
        }), 200

    summary, suggestions = analyze_feedback(negative_texts)
    return jsonify({
        "teacher_id": teacher_id,
        "summary": summary,
        "suggestions": suggestions
    }), 200



if __name__ == "__main__":
    app.run(port=5000, debug=True)
