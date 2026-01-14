import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { adminLoginSchema } from "../utils/validators";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { loginAdmin } from "../services/auth";
import { ADMIN_EMAIL } from "../utils/constants";
import toast from "react-hot-toast";
import SEOHead from "../components/seo/SEOHead";

const AdminLogin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(adminLoginSchema), defaultValues: { email: ADMIN_EMAIL } });

  const onSubmit = async (values) => {
    try {
      await loginAdmin(values.email, values.password);
      toast.success("Welcome back, Arbab.");
      navigate("/admin");
    } catch (error) {
      toast.error("Unable to sign in. Check credentials.");
    }
  };

  return (
    <Layout>
      <SEOHead title="Admin Login" />
      <section className="min-h-screen flex items-center justify-center px-4 pt-16 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(212,175,55,0.16),transparent_50%)] opacity-80" aria-hidden />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:140px_140px] opacity-30" aria-hidden />

        <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-8 items-center relative">
          <div className="space-y-5 hidden lg:block">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs uppercase tracking-[0.3em] text-gray-200">
              Admin Console
            </div>
            <h1 className="text-4xl font-bold text-white leading-tight">
              Precision control over content, data, and realtime experiences.
            </h1>
            <p className="text-gray-300">
              Manage projects, blogs, chats, analytics, and settings with enterprise-grade access. Restricted to <strong>{ADMIN_EMAIL}</strong>.
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-xs text-gray-400">Authentication</p>
                <p className="text-white font-semibold">Email + Password</p>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-xs text-gray-400">Role</p>
                <p className="text-white font-semibold">Admin Only</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-blue-600/25 via-purple-500/18 to-amber-400/20 blur-2xl" aria-hidden />
            <div className="relative rounded-3xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-[#0a0c18]/85 backdrop-blur-xl p-7 shadow-2xl shadow-blue-900/30 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">Secure Entry</p>
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-1">Admin Login</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Credentials are limited to {ADMIN_EMAIL}.</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-white/10 border border-black/10 dark:border-white/20 grid place-items-center text-blue-600 dark:text-blue-200 text-sm font-semibold">
                  A
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <Input
                  placeholder="Email"
                  type="email"
                  className="bg-white/80 text-slate-900 border-black/10 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/30"
                  {...register("email")}
                  error={errors.email}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="bg-white/80 text-slate-900 border-black/10 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/30"
                  {...register("password")}
                  error={errors.password}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
              </form>
              <p className="text-xs text-gray-600 dark:text-gray-400">If you are not {ADMIN_EMAIL}, you cannot access this dashboard.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminLogin;
