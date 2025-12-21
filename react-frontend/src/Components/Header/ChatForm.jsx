import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const ChatForm = ({ onClose }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  const employeeId = localStorage.getItem("employee_id");
  const employeeName = localStorage.getItem("employee_name");

  const fetchChatHistory = async () => {
    try {
      const res = await axios.get(
        "https://fbts.flamingohrms.com/api/method/fbts.api.flamingoApi.group_chat"
      );
      if (res.data.message) {
        setChatHistory(res.data.message);
        setTimeout(() => {
          scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } catch (err) {
      console.error("Failed to fetch chat history:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);
    setError("");

    try {
      const res = await axios.post(
        "https://fbts.flamingohrms.com/api/method/fbts.api.flamingoApi.chat",
        {
          message,
          employee: employeeId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.message?.name) {
        setMessage("");
        await fetchChatHistory();
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 w-[370px] max-h-[90vh] flex flex-col bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-green-600 text-white px-4 py-2 flex justify-between items-center">
        <span className="font-semibold">Group Chat</span>
        {onClose && (
          <button onClick={onClose} className="text-white text-xl leading-none">×</button>
        )}
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto bg-[#ECE5DD] px-3 py-2 space-y-2 text-sm">
        {chatHistory.map((item, index) => {
          if (item.type === "date") {
            return (
              <div key={`date-${index}`} className="text-center text-gray-500 text-xs py-1">
                ─ {item.label} ─
              </div>
            );
          } else if (item.type === "message") {
            const isSelf = item.employee === employeeId;
            return (
              <div
                key={`msg-${index}`}
                className={`max-w-[80%] rounded-lg px-3 py-2 text-sm shadow-sm ${
                  isSelf
                    ? "ml-auto bg-[#DCF8C6] text-right"
                    : "mr-auto bg-white text-left"
                }`}
              >
                {!isSelf && (
                  <div className="text-xs text-gray-600 font-semibold mb-0.5">
                    {item.employee_name}
                  </div>
                )}
                <div>{item.message}</div>
                <div className="text-[10px] text-gray-500 mt-1">{item.time}</div>
              </div>
            );
          }
          return null;
        })}
        <div ref={scrollRef} />
      </div>

      {/* Message input bar */}
      <form onSubmit={handleSubmit} className="bg-white border-t px-3 py-2 flex gap-2">
        <input
          type="text"
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          disabled={sending}
          className="bg-green-600 text-white text-sm px-4 py-1.5 rounded-full hover:bg-green-700 disabled:opacity-60"
        >
          Send
        </button>
      </form>

      {error && (
        <div className="text-red-600 text-xs text-center py-1 border-t bg-white">{error}</div>
      )}
    </div>
  );
};

export default ChatForm;