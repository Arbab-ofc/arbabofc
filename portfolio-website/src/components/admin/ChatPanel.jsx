import React from "react";
import { formatDistanceToNow } from "date-fns";
import { useData } from "../../contexts/DataContext";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../common/Button";

const formatTime = (ts) => {
  if (!ts) return "just now";
  if (typeof ts === "number") return formatDistanceToNow(ts, { addSuffix: true });
  if (ts?.seconds) return formatDistanceToNow(ts.seconds * 1000, { addSuffix: true });
  return "just now";
};

const ChatPanel = () => {
  const { contactMessages, deleteContactMessage } = useData();
  const { isAdmin } = useAuth();

  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-3 space-y-3 max-h-[440px] overflow-y-auto">
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
          {isAdmin && (
            <div className="flex justify-end">
              <Button
                variant="ghost"
                className="!px-3 !py-1 text-[11px]"
                onClick={() => deleteContactMessage(msg.id)}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatPanel;
