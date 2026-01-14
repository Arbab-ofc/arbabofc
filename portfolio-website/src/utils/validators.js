import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  subject: z.string().min(4, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const adminLoginSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const blogSchema = z.object({
  title: z.string().min(4),
  slug: z.string().min(4),
  content: z.string().min(20),
  status: z.enum(["draft", "published"]),
});

export const projectSchema = z.object({
  title: z.string().min(3),
  subtitle: z.string().min(3),
  description: z.string().min(10),
  category: z.string().min(2),
  status: z.string(),
});
