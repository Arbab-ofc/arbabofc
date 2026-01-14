import React, { useState } from "react";
import { MessagesSquare } from "lucide-react";
import { useChat } from "../../contexts/ChatContext";
import ChatWindow from "./ChatWindow";
import { useAuth } from "../../contexts/AuthContext";

const ChatWidget = () => {
  const { activeChatId, startSession } = useChat();
  const { user, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({ name: "", email: "" });
  const [needsInfo, setNeedsInfo] = useState(false);
  const [error, setError] = useState("");

  const handleOpen = () => {
    if (isAdmin) return;
    if (!activeChatId) {
      setNeedsInfo(true);
      return;
    }
    setOpen((prev) => !prev);
  };

  const startGuest = async () => {
    if (!details.name.trim() || !details.email.trim()) return;
    setError("");
    try {
      await startSession({ name: details.name.trim(), email: details.email.trim() });
      setNeedsInfo(false);
      setOpen(true);
    } catch (err) {
      console.error("Chat start failed", err);
      setError("Chat is unavailable right now. Please try again shortly.");
    }
  };

  if (isAdmin) return null;

  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-3">
      {open && <ChatWindow onClose={() => setOpen(false)} />}
      {needsInfo && (
        <div className="w-72 rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-[#0b0f1c] shadow-2xl p-4 space-y-2">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Start a chat</p>
          <input
            className="w-full h-10 rounded-lg bg-white border border-black/10 px-3 text-sm text-slate-900 placeholder:text-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 outline-none dark:bg-white/5 dark:text-white dark:border-white/10"
            placeholder="Your name"
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
          />
          <input
            className="w-full h-10 rounded-lg bg-white border border-black/10 px-3 text-sm text-slate-900 placeholder:text-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 outline-none dark:bg-white/5 dark:text-white dark:border-white/10"
            placeholder="Your email"
            type="email"
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
          />
          <div className="flex gap-2">
            <button
              className="flex-1 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 dark:text-white text-sm font-semibold py-2 border border-amber-300/60 hover:translate-y-[-1px] active:scale-[0.99] transition"
              onClick={startGuest}
            >
              Start
            </button>
            <button
              className="px-3 py-2 text-sm rounded-lg border border-black/10 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-amber-400/60"
              onClick={() => setNeedsInfo(false)}
            >
              Cancel
            </button>
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      )}
      <button
        className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-500 via-rose-500 to-indigo-600 text-white shadow-[0_16px_50px_rgba(0,0,0,0.35)] grid place-items-center border border-amber-200/60 dark:border-white/20"
        onClick={handleOpen}
        aria-label="Open chat"
      >
        <MessagesSquare />
      </button>
    </div>
  );
};

export default ChatWidget;
