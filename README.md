# Student Feedback Sentiment Analysis System

This project is designed to **analyze student feedback** and generate actionable **insights for teachers** using **natural language processing** (NLP). It classifies feedback into **Positive**, **Neutral**, or **Negative** categories and presents the results in a **visual teacher dashboard**.

---

## Features

-  **Multi-class Sentiment Classification** (Positive / Neutral / Negative)
-  Fine-tuned **BERT/DistilBERT/Roberta** models with class weighting
-  Teacher dashboard with **bar charts** and **word clouds**
-  Handles class imbalance using **class weights** and optional **upsampling**
-  Runs on **GPU** for efficient training
-  Data preprocessing, cleaning, and tokenization with HuggingFace Datasets

---

##  Project Structure
```bash
student-review-system/
├── .gitignore
├── Frontend/                  
│   ├── app/                   
│   ├── components/            
│   ├── hooks/                 
│   ├── lib/                   
│   ├── public/                
│   ├── utils/                 
│   ├── next.config.mjs
│   ├── package.json
│   ├── tailwind.config.js
│   └── README.md              
├── Model/                     
│   ├── API/                   
│   ├── results/               
│   ├── LSTM_Model.ipynb       
│   ├── model.ipynb            
│   ├── remove_common_words_model.ipynb
│   └── trainingdata.csv       
