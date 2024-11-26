import streamlit as st
from dotenv import load_dotenv
import os
import openai

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

st.title("HYE WE ARE HERE TO HELP YOU FRIEND 😊")

if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "system", "content": "You are a helpful AI that can do all. 🤖"}
    ]

user_input = st.text_input("You:", placeholder="Type your message here my friend!!!...")

if user_input:
    st.session_state.messages.append({"role": "user", "content": user_input})

    with st.spinner("let me answer you 😎!!!!..."):
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=st.session_state.messages,
                temperature=0.7
            )
            ai_response = response.choices[0].message.content
        except Exception as e:
            ai_response = f"Error: {str(e)}"

   
    ai_response += " 😎"
    st.session_state.messages.append({"role": "assistant", "content": ai_response})


for msg in st.session_state.messages:
    if msg["role"] == "user":
        st.write(f"**You:** {msg['content']} 🤔")
    elif msg["role"] == "assistant":
        st.write(f"**Assistant:** {msg['content']} 🤖")
