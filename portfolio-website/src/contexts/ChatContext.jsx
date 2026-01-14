import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ref, onValue, push, set, serverTimestamp, update, off } from "firebase/database";
import { rtdb } from "../services/firebase";
import { useAuth } from "./AuthContext";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { user, isAdmin } = useAuth();
  const [activeChatId, setActiveChatId] = useState(null);
  const [allChats, setAllChats] = useState([]);
  const [messagesByChat, setMessagesByChat] = useState({});
  const [currentChat, setCurrentChat] = useState(null);

  // Subscribe to all chats (open access as requested)
  useEffect(() => {
    const chatsRef = ref(rtdb, "chats");
    const handler = (snap) => {
      const data = snap.val() || {};
      const list = Object.entries(data).map(([id, value]) => ({ id, ...value }));
      setAllChats(list.sort((a, b) => (b.lastMessageAt || 0) - (a.lastMessageAt || 0)));
      if (!activeChatId && list.length) setActiveChatId(list[0].id);
    };
    onValue(chatsRef, handler);
    return () => off(chatsRef, "value", handler);
  }, [activeChatId]);

  // Subscribe to messages for the active chat
  useEffect(() => {
    if (!activeChatId) return;
    const messagesRef = ref(rtdb, `chats/${activeChatId}/messages`);
    const handler = (snap) => {
      const data = snap.val() || {};
      const list = Object.entries(data)
        .map(([id, value]) => ({ id, ...value }))
        .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
      setMessagesByChat((prev) => ({ ...prev, [activeChatId]: list }));
    };
    onValue(messagesRef, handler);
    return () => off(messagesRef, "value", handler);
  }, [activeChatId]);

  // Subscribe to active chat meta
  useEffect(() => {
    if (!activeChatId) return;
    const chatRef = ref(rtdb, `chats/${activeChatId}`);
    const handler = (snap) => {
      setCurrentChat(snap.exists() ? { id: activeChatId, ...snap.val() } : null);
    };
    onValue(chatRef, handler);
    return () => off(chatRef, "value", handler);
  }, [activeChatId]);

  const startSession = async ({ name, email }) => {
    const chatRef = push(ref(rtdb, "chats"));
    const chatId = chatRef.key;
    const payload = {
      visitorName: name || "Guest User",
      visitorEmail: email || "",
      visitorId: user?.uid || null,
      status: "open",
      createdAt: serverTimestamp(),
      lastMessage: "",
      lastMessageAt: serverTimestamp(),
    };
    await set(chatRef, payload);
    setActiveChatId(chatId);
    setCurrentChat({ id: chatId, ...payload });
    return chatId;
  };

  const sendMessage = async (chatId, message, role = "visitor") => {
    if (!chatId || !message?.trim()) return;
    const msgRef = push(ref(rtdb, `chats/${chatId}/messages`));
    const payload = {
      id: msgRef.key,
      senderId: user?.uid || "guest",
      senderRole: role,
      senderName: role === "admin" ? "Admin" : "Guest",
      text: message.trim(),
      timestamp: serverTimestamp(),
    };
    await set(msgRef, payload);
    await update(ref(rtdb, `chats/${chatId}`), {
      lastMessage: payload.text,
      lastMessageAt: serverTimestamp(),
      lastMessageBy: role,
    });
  };

  const value = useMemo(
    () => ({
      activeChatId,
      setActiveChatId,
      allChats,
      messagesByChat,
      startSession,
      sendMessage,
      isAdmin,
      currentChat,
    }),
    [activeChatId, allChats, messagesByChat, isAdmin, currentChat]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => useContext(ChatContext);
