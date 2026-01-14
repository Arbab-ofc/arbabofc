import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

const shouldLogRemote = import.meta.env.VITE_ENABLE_REMOTE_LOGS !== "false";
const LOG_COLLECTION = "analytics";

const makeMeta = (meta) => {
  if (!meta) return {};
  try {
    return JSON.parse(JSON.stringify(meta));
  } catch (err) {
    return { detail: "Meta not serializable", fallback: String(meta) };
  }
};

export const logEvent = async (level = "info", message = "", meta) => {
  const payload = {
    level,
    message,
    meta: makeMeta(meta),
    createdAt: new Date().toISOString(),
  };

  // Always log to console for quick local debugging
  // eslint-disable-next-line no-console
  console[level === "error" ? "error" : "log"](`[${level}] ${message}`, payload.meta);

  if (!shouldLogRemote || !db) return;
  try {
    await addDoc(collection(db, LOG_COLLECTION), {
      ...payload,
      createdAt: serverTimestamp(),
      clientTime: payload.createdAt,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("logEvent remote failed", err);
  }
};

export const logError = (message, meta) => logEvent("error", message, meta);
export const logInfo = (message, meta) => logEvent("info", message, meta);
