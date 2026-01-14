export const formatDate = (value) => {
  if (!value) return "";
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(value));
};

export const truncate = (text, limit = 140) => {
  if (!text) return "";
  return text.length > limit ? `${text.slice(0, limit)}…` : text;
};

export const classNames = (...values) => values.filter(Boolean).join(" ");

export const slugify = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
