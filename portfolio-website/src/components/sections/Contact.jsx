import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "../../utils/validators";
import SectionHeader from "../common/SectionHeader";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import toast from "react-hot-toast";
import { saveContactMessage } from "../../services/firestore";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values) => {
    try {
      await saveContactMessage(values);
      toast.success("Message captured. I'll get back to you soon.");
      reset();
    } catch (err) {
      console.error("Contact save failed", err);
      toast.error("Could not send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container max-w-5xl">
        <SectionHeader title="Contact" subtitle="Reach Out" />
        <div className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-white via-slate-50 to-amber-50 dark:from-[#0b1020] dark:via-[#0f172a] dark:to-[#0b0f1a] shadow-[0_24px_70px_rgba(0,0,0,0.25)]">
          <div className="absolute inset-0 pointer-events-none opacity-70 bg-[radial-gradient(circle_at_10%_10%,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_85%_8%,rgba(212,175,55,0.16),transparent_42%),radial-gradient(circle_at_60%_100%,rgba(124,58,237,0.12),transparent_48%)]" />
          <div className="relative grid lg:grid-cols-[1.05fr_1fr] gap-8 p-8 lg:p-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 border border-emerald-400/30 text-xs dark:text-emerald-100">
                Response time: under 24h
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Let’s build something remarkable.</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Share your idea, product brief, or collaboration request. Anonymous visitors are welcome; your message is stored securely with spam-safe validation.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Email</p>
                  <a className="text-slate-900 dark:text-white font-semibold hover:text-amber-700 dark:hover:text-amber-200" href="mailto:arbabprvt@gmail.com">
                    arbabprvt@gmail.com
                  </a>
                </div>
                <div className="p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Phone</p>
                  <a className="text-slate-900 dark:text-white font-semibold" href="tel:+917367084034">
                    +91 7367084034
                  </a>
                </div>
                <div className="p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Location</p>
                  <p className="text-slate-900 dark:text-white font-semibold">Patna, Bihar, India</p>
                </div>
                <div className="p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Availability</p>
                  <p className="text-slate-900 dark:text-white font-semibold">Open for roles & projects</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.18)]">
              <div className="grid md:grid-cols-2 gap-4">
                <Input className="bg-white text-slate-900 border-black/10 dark:bg-white/5 dark:text-white dark:border-white/10" placeholder="Name" {...register("name")} error={errors.name} />
                <Input className="bg-white text-slate-900 border-black/10 dark:bg-white/5 dark:text-white dark:border-white/10" placeholder="Email" type="email" {...register("email")} error={errors.email} />
              </div>
              <Input className="bg-white text-slate-900 border-black/10 dark:bg-white/5 dark:text-white dark:border-white/10" placeholder="Subject" {...register("subject")} error={errors.subject} />
              <div className="space-y-1">
                <textarea
                  rows="4"
                  className="w-full rounded-xl bg-white text-slate-900 border border-black/10 px-4 py-3 text-sm placeholder:text-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 outline-none dark:bg-white/5 dark:text-white dark:border-white/10 dark:placeholder:text-gray-400"
                  placeholder="How can I help you?"
                  {...register("message")}
                />
                {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
              </div>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <p className="text-xs text-gray-600 dark:text-gray-400">Protected with validation & rate limiting.</p>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
