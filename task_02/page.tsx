"use client";
import { useState } from "react";

interface Message {
  sender: "user" | "assistant";
  text: string;
}

export default function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const reqSubmit = async (): Promise<void> => {
    if (!inputValue.trim()) {
      alert("Please enter a query.");
      return;
    }

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: inputValue.trim() },
    ]);
    setInputValue("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chatcal/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input: inputValue.trim() }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch AI response.");
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: data.assistant_response },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: "Sorry, there was an error processing your request.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = (): void => {
    setMessages([]);
    setInputValue("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-green-200 to-blue-500 text-white">
      <nav className="bg-white bg-opacity-10 backdrop-blur-lg w-full p-4 shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-white">AI Chat</div>
          <div className="hidden md:flex gap-6">
            <a href="#" className="text-white hover:text-pink-400">
              Home
            </a>
            <a href="#" className="text-white hover:text-pink-400">
              About
            </a>
            <a href="#" className="text-white hover:text-pink-400">
              Contact
            </a>
          </div>
        </div>
      </nav>
      <div className="mt-16 flex flex-col items-center justify-center flex-1 p-6">
        <div className="max-w-lg w-full bg-white bg-opacity-10 rounded-2xl shadow-2xl p-6 flex flex-col">
          <div className="text-center pb-4 border-b border-white/20">
            <h1 className="text-3xl font-extrabold text-white">
              Here to help you
            </h1>
            <p className="text-sm text-white/80">Let us find out!!!</p>
          </div>

          <div className="flex-1 overflow-y-auto mt-4 space-y-4 custom-scrollbar">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-3xl ${
                    message.sender === "user"
                      ? "bg-pink-500 text-white"
                      : "bg-white text-gray-800"
                  } shadow-lg`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-3xl bg-white text-gray-800 shadow-md">
                  Typing...
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") reqSubmit();
                }}
                className="flex-1 bg-white bg-opacity-10 border border-white/20 rounded-3xl px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button
                onClick={reqSubmit}
                className="bg-pink-500 hover:bg-pink-400 text-white px-4 py-2 rounded-3xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                Send
              </button>
            </div>
            <button
              onClick={clearChat}
              className="bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded-3xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              Clear Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
