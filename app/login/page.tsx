"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [role, setRole] = useState<"SUPPLIER" | "BUYER">("SUPPLIER");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/dashboard");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, role }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Registration failed.");
      setLoading(false);
      return;
    }
    // Auto-login after registration
    await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-sand flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <img src="/logo.png" alt="Biznecto" className="h-12 w-auto object-contain" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-brand border border-border-brand overflow-hidden">
          {/* Tab switcher */}
          <div className="flex border-b border-border-brand">
            <button
              onClick={() => setTab("login")}
              className={`flex-1 py-4 text-[13px] font-semibold transition-colors ${
                tab === "login" ? "text-teal border-b-2 border-teal" : "text-muted hover:text-ink"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setTab("register")}
              className={`flex-1 py-4 text-[13px] font-semibold transition-colors ${
                tab === "register" ? "text-teal border-b-2 border-teal" : "text-muted hover:text-ink"
              }`}
            >
              Create Account
            </button>
          </div>

          <div className="p-8">
            {tab === "login" ? (
              <>
                <h1 className="font-sans font-bold text-[22px] text-ink mb-1">Welcome back</h1>
                <p className="text-[13px] text-muted mb-6">Sign in to access your dashboard and leads.</p>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-muted uppercase tracking-wide">Email or Username</label>
                    <input
                      name="email" type="text" required
                      value={form.email} onChange={handleChange}
                      placeholder="you@company.com"
                      className="border border-border-brand rounded-lg px-4 py-2.5 text-[14px] focus:border-teal focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-muted uppercase tracking-wide">Password</label>
                    <input
                      name="password" type="password" required
                      value={form.password} onChange={handleChange}
                      placeholder="Enter your password"
                      className="border border-border-brand rounded-lg px-4 py-2.5 text-[14px] focus:border-teal focus:outline-none"
                    />
                  </div>
                  {error && <p className="text-red-500 text-[12px] font-medium">{error}</p>}
                  <button
                    type="submit" disabled={loading}
                    className="w-full bg-teal hover:bg-teal-dark text-white font-semibold text-[14px] py-3 rounded-lg transition-colors disabled:opacity-60 mt-2"
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </button>
                </form>
              </>
            ) : (
              <>
                <h1 className="font-sans font-bold text-[22px] text-ink mb-1">Join Biznecto</h1>
                <p className="text-[13px] text-muted mb-4">Create your free account to connect with global buyers.</p>

                {/* Role Selector */}
                <div className="flex gap-3 mb-5">
                  {(["SUPPLIER", "BUYER"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`flex-1 py-2.5 rounded-lg border text-[13px] font-semibold transition-all ${
                        role === r
                          ? "border-teal bg-teal/5 text-teal"
                          : "border-border-brand text-muted hover:border-ink/30"
                      }`}
                    >
                      {r === "SUPPLIER" ? "🏭 Supplier" : "🛒 Buyer"}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-muted uppercase tracking-wide">Full Name</label>
                    <input
                      name="name" type="text" required
                      value={form.name} onChange={handleChange}
                      placeholder="Your full name"
                      className="border border-border-brand rounded-lg px-4 py-2.5 text-[14px] focus:border-teal focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-muted uppercase tracking-wide">Work Email</label>
                    <input
                      name="email" type="email" required
                      value={form.email} onChange={handleChange}
                      placeholder="you@company.com"
                      className="border border-border-brand rounded-lg px-4 py-2.5 text-[14px] focus:border-teal focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-muted uppercase tracking-wide">Password</label>
                    <input
                      name="password" type="password" required minLength={8}
                      value={form.password} onChange={handleChange}
                      placeholder="Min. 8 characters"
                      className="border border-border-brand rounded-lg px-4 py-2.5 text-[14px] focus:border-teal focus:outline-none"
                    />
                  </div>
                  {error && <p className="text-red-500 text-[12px] font-medium">{error}</p>}
                  <button
                    type="submit" disabled={loading}
                    className="w-full bg-teal hover:bg-teal-dark text-white font-semibold text-[14px] py-3 rounded-lg transition-colors disabled:opacity-60 mt-2"
                  >
                    {loading ? "Creating account..." : "Create Free Account"}
                  </button>
                  <p className="text-[11px] text-muted text-center">
                    By creating an account you agree to our{" "}
                    <Link href="/legal/terms" className="text-teal hover:underline">Terms of Service</Link>
                    {" & "}
                    <Link href="/legal/privacy" className="text-teal hover:underline">Privacy Policy</Link>.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
