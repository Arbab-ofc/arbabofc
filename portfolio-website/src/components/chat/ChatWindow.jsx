import React, { useState } from "react";
import { useChat } from "../../contexts/ChatContext";
import { X } from "lucide-react";

const ChatWindow = ({ onClose }) => {
  const { activeChatId, sendMessage, messagesByChat, currentChat } = useChat();
  const [message, setMessage] = useState("");
  const messages = activeChatId ? messagesByChat[activeChatId] || [] : [];

  const handleSend = () => {
    if (!message.trim() || !activeChatId) return;
    sendMessage(activeChatId, message.trim());
    setMessage("");
  };

  return (
    <div className="w-80 rounded-2xl card-surface border border-white/15 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div>
          <p className="text-sm text-white font-semibold">Chat with Arbab</p>
          <p className="text-xs text-gray-400">{currentChat?.visitorName || "Guest"}</p>
        </div>
        <button onClick={onClose} aria-label="Close chat" className="text-gray-300 hover:text-white">
          <X size={16} />
        </button>
      </div>
      <div className="max-h-64 overflow-y-auto p-4 space-y-2 bg-white/5">
        {messages.length ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`text-sm px-3 py-2 rounded-xl ${
                msg.senderRole === "admin" ? "bg-amber-500/20 text-amber-50" : "bg-blue-500/20 text-blue-50 ml-auto"
              }`}
            >
              {msg.text}
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-400">Say hi to start the conversation.</p>
        )}
      </div>
      <div className="p-3 border-t border-white/10 bg-black/40">
        <div className="flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            className="flex-1 h-10 rounded-lg bg-white/5 border border-white/10 px-3 text-sm text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none"
          />
          <button
            className="px-3 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
