// Chatbot.tsx
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios, { AxiosError } from "axios";

const OPENAI_API_KEY = "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"; // Replace with your actual OpenAI API key

const Chatbot: React.FC = () => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Add the animated-background class when the component mounts
    document.body.classList.add("animated-background");

    // Remove the animated-background class when the component unmounts or when isChatbotVisible changes
    return () => {
      document.body.classList.remove("animated-background");
    };
  }, []);

  const toggleChatbot = () => {
    setIsChatbotVisible((prev) => !prev);
  };

  const sendMessage = async () => {
    if (userInput.trim() !== "") {
      setIsLoading(true);

      // Add user message to chat history
      const userMessage = `User: ${userInput}`;
      setChatHistory((prevHistory) => [...prevHistory, userMessage]);

      try {
        // Make a request to the OpenAI API
        const response = await axios.post(
          "https://api.openai.com/v1/engines/davinci-codex/completions",
          {
            prompt: userInput,
            max_tokens: 100,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
          }
        );

        // Add chatbot response to chat history
        const chatbotResponse = `Chatbot: ${response.data.choices[0].text}`;
        setChatHistory((prevHistory) => [...prevHistory, chatbotResponse]);
      } catch (error: any) {
        console.error("Error calling OpenAI API:", error);

        // Display user-friendly error message in chat history
        setChatHistory((prevHistory) => [
          ...prevHistory,
          "Error processing request. Please try again later.",
        ]);

        if (axios.isAxiosError(error)) {
          // AxiosError has a response property
          if (error.response) {
            console.error("Server responded with:", error.response.data);
          } else {
            console.error("No response received from the server");
          }
        } else {
          // Handle other types of errors
          console.error("Error:", error.message);
        }
      }

      setIsLoading(false);
      setUserInput("");
    }
  };

  return (
    <div>
      {/* Chatbot button */}
      <div
        className={`fixed bottom-10 right-10 bg-blue-500 text-white p-4 rounded-full cursor-pointer z-50 shadow-lg 
        ${isChatbotVisible ? "hidden" : ""}`}
        onClick={toggleChatbot}
      >
        <FontAwesomeIcon icon={faComment} />
      </div>

      {/* Chatbot container */}
      {isChatbotVisible && (
        <div className="fixed bottom-10 right-10 w-72 bg-white border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg">
          <div className="bg-blue-500 text-white p-3 flex justify-between items-center">
            <div>
              <FontAwesomeIcon icon={faComment} className="mr-2" />
              Chat Assistant
            </div>
            <div className="cursor-pointer" onClick={toggleChatbot}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto p-4">
            {isLoading && (
              <div className="text-center text-gray-500">Loading...</div>
            )}
            {!isLoading &&
              chatHistory.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    message.includes("User")
                      ? "text-blue-500"
                      : "text-green-500"
                  }`}
                >
                  {message}
                </div>
              ))}
          </div>
          <div className="p-4 flex items-center border-t border-gray-300">
            <input
              className="flex-1 p-2 border border-gray-300 rounded-l"
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type here..."
            />
            <button
              className="bg-blue-500 text-white p-2 rounded-r"
              onClick={sendMessage}
              disabled={isLoading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
