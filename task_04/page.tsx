"use client";
import { useState } from "react";

async function handleAskQuestion(question: string) {
  const response = await fetch("http://127.0.0.1:8000/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch answer: ${errorText}`);
  }

  const data = await response.json();
  console.log(data);
  return data.answer;
}

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    try {
      const answer = await handleAskQuestion(question);
      setAnswer(answer);
    } catch (error) {
      setAnswer("Sorry, there was an error.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="title">FAQ Chatbot</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
        />
        <button className="button" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Ask"}
        </button>
      </form>

      {answer && <p className="answer">{answer}</p>}
    </div>
  );
}
