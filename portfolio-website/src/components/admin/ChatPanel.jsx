import React, { useEffect, useMemo, useState } from "react";
import { useChat } from "../../contexts/ChatContext";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../common/Button";
import { formatDistanceToNow } from "date-fns";
import { useData } from "../../contexts/DataContext";

const formatTime = (ts) => {
  if (!ts) return "just now";
  if (typeof ts === "number") return formatDistanceToNow(ts, { addSuffix: true });
  if (ts?.seconds) return formatDistanceToNow(ts.seconds * 1000, { addSuffix: true });
  return "just now";
};

const ChatPanel = () => {
  const { isAdmin } = useAuth();
  const { contactMessages } = useData();
  const { allChats, activeChatId, setActiveChatId, messagesByChat, sendMessage } = useChat();
  const [message, setMessage] = useState("");

  const selectedChat = useMemo(() => allChats.find((c) => c.id === activeChatId) || allChats[0], [allChats, activeChatId]);

  useEffect(() => {
    if (!selectedChat) return;
    if (selectedChat.id !== activeChatId) setActiveChatId(selectedChat.id);
  }, [selectedChat, activeChatId, setActiveChatId]);

  const handleSend = async () => {
    if (!selectedChat || !message.trim()) return;
    await sendMessage(selectedChat.id, message.trim(), "admin");
    setMessage("");
  };

  const messages = selectedChat ? messagesByChat[selectedChat.id] || [] : [];

  return (
    <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-4">
      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-3 space-y-3 max-h-[440px] overflow-y-auto">
        <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 px-2">Live chats</p>
        {allChats.length === 0 && <p className="text-sm text-gray-500 dark:text-gray-400">No chats yet.</p>}
        {allChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => setActiveChatId(chat.id)}
            className={`w-full text-left rounded-xl border px-3 py-2 space-y-1 ${
              chat.id === selectedChat?.id
                ? "border-amber-400 bg-amber-50/70 dark:bg-white/10"
                : "border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{chat.visitorName || "Guest"}</p>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">{formatTime(chat.lastMessageAt)}</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">{chat.visitorEmail || "No email"}</p>
            {chat.lastMessage && <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-1">{chat.lastMessage}</p>}
          </button>
        ))}

        <div className="h-px bg-black/10 dark:bg-white/10 my-2" />

        <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 px-2">Contact messages</p>
        {contactMessages.length === 0 && <p className="text-sm text-gray-500 dark:text-gray-400">No contact submissions yet.</p>}
        {contactMessages.map((msg) => (
          <div key={msg.id} className="rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-3 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{msg.name || "Guest"}</p>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                {msg.createdAt?.seconds ? formatTime(msg.createdAt) : "just now"}
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">{msg.email || "No email"}</p>
            <p className="text-xs text-gray-700 dark:text-gray-300">{msg.message}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 flex flex-col gap-3 min-h-[360px]">
        {selectedChat ? (
          <>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{selectedChat.visitorName || "Guest"}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{selectedChat.visitorEmail || "No email"}</p>
            </div>
            <div className="flex-1 rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-3 space-y-2 overflow-y-auto">
              {messages.length === 0 && <p className="text-xs text-gray-500 dark:text-gray-400">No messages yet.</p>}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[80%] text-sm px-3 py-2 rounded-xl ${
                    msg.senderRole === "admin"
                      ? "bg-amber-500/20 text-amber-900 dark:text-amber-100"
                      : "bg-blue-500/15 text-blue-900 dark:text-blue-100 ml-auto"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a reply"
                className="flex-1 h-10 rounded-lg bg-white border border-black/10 px-3 text-sm text-slate-900 placeholder:text-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 outline-none dark:bg-white/5 dark:text-white dark:border-white/10"
              />
              <Button className="!px-4" onClick={handleSend}>
                Send
              </Button>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">Select a conversation.</p>
        )}
      </div>
    </div>
  );
};

export default ChatPanel;
