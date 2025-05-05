from fastapi import FastAPI
from pydantic import BaseModel
import torch
from transformers.models.auto.tokenization_auto import (
    AutoTokenizer,
)
from transformers.models.auto.modeling_auto import AutoModelForSequenceClassification

app = FastAPI()

# Load model and tokenizer
model_name = "unitary/toxic-bert"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# Define labels
labels = ["toxic", "severeToxic", "obscene", "threat", "insult", "identityHate"]


# Request body model
class TextRequest(BaseModel):
    text: str


# Predict function
def predict(text, tokenizer, model, device):
    model.eval()
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True).to(
        device
    )
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probs = torch.sigmoid(logits)
    return probs.cpu().numpy()[0]


# API endpoint
@app.post("/predict")
def predict_text(request: TextRequest):
    probs = predict(request.text, tokenizer, model, device)
    results = {label: float(score) for label, score in zip(labels, probs)}
    avg_score = float(sum(probs) / len(probs))
    return {"text": request.text, "scores": results, "averageScore": avg_score}
