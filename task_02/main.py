from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

class UserInput(BaseModel):
    user_input: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chatcal/")
async def chatai(user_input: UserInput):
    messages = [ 
        {"role": "user", "content": user_input.user_input}
    ]

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0.7
        )
        ai_response = response.choices[0].message.content
        messages.append({"role": "assistant", "content": ai_response})
        return {"assistant_response": ai_response}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
