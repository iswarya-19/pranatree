from fastapi import FastAPI
from pydantic import BaseModel
from secret import OPENAI_API_KEY
from langchain_openai import ChatOpenAI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

os.environ['OPENAI_API_KEY'] = OPENAI_API_KEY
llm = ChatOpenAI(temperature=0.5)

faq = {
    "Do you offer home delivery?":"Yes, we offer home delivery for most items. Delivery charges vary based on the item size and delivery location.",
    "How long does delivery take?":"Standard delivery takes 3-5 business days. Expedited options are available for an additional charge.",
    "Can I track my order?":" Yes, you will receive a tracking link in your confirmation email once your order is shipped.",
    "Do you offer discounts for students?":"Yes, we offer a 10% discount for students and seniors every Wednesday. A valid ID is required."
}

class QuestionRequest(BaseModel):
    question: str

app = FastAPI()

@app.post("/ask")
async def ask_question(request: QuestionRequest):
    question = request.question.lower()  
    if question in faq:
        answer = faq[question]
    else:
        response = f"your assistant: {question}"
        llm_response = llm.invoke(response)
        answer = llm_response.content

    return {"answer": answer}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True, 
    allow_methods=["*"],  
    allow_headers=["*"],  
)
