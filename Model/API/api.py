from flask import Flask, jsonify # type: ignore
import firebase_admin # type: ignore
from firebase_admin import credentials, firestore # type: ignore
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import torch.nn.functional as F



# Initialize Flask
app = Flask(__name__)

# Firebase setup
cred = credentials.Certificate("AIzaSyDThVfUseiXk-hCeSvbTG2qciJjR-H4_4M")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Load the model and tokenizer
model_path = "./initialModel" 
tokenizer = AutoTokenizer.from_pretrained(model_path, local_files_only=True)
model = AutoModelForSequenceClassification.from_pretrained(model_path, local_files_only=True)

# Set to evaluation mode (important for inference)
model.eval()

# Label mapping
label_map = {0: "negative", 1: "neutral", 2: "positive"}

def classify_feedback(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
        probs = F.softmax(outputs.logits, dim=1)
        predicted_label = torch.argmax(probs, dim=1).item()
    return label_map[predicted_label], round(probs[0][predicted_label].item(), 4)

@app.route("/classify_feedbacks", methods=["PUT"])
def classify_feedbacks():
    feedbacks_ref = db.collection("feedback") 
    docs = feedbacks_ref.stream()

    results = []
    for doc in docs:
        data = doc.to_dict()
        feedback = data.get("comment")  
        if feedback:
            sentiment, confidence = classify_feedback(feedback)
            results.append({
                "id": doc.id,
                "feedback": feedback,
                "predicted_sentiment": sentiment,
                "confidence": confidence
            })

    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)
