"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // In auth.ts, we expect "email" and "password" fields. We pass our username as email.
    const res = await signIn("credentials", {
      email: form.username,
      password: form.password,
      redirect: false,
    });
    
    setLoading(false);
    if (res?.error) {
      setError("Invalid admin credentials.");
    } else {
      router.push("/admin");
    }
  };

  return (
    <main className="min-h-screen bg-ink flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        <div className="bg-sand p-6 flex flex-col items-center border-b border-border-brand">
          <div className="w-12 h-12 bg-purple text-white rounded-full flex items-center justify-center mb-3">
            <Lock size={20} />
          </div>
          <h1 className="font-serif font-bold text-xl text-ink text-center">Admin Portal</h1>
          <p className="text-xs text-muted mt-1">Authorized personnel only</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-muted uppercase tracking-wide">Admin Username</label>
              <input
                name="username" type="text" required
                value={form.username} onChange={handleChange}
                placeholder="Enter username"
                className="border border-border-brand rounded-lg px-4 py-2.5 text-[14px] focus:border-purple focus:ring-1 focus:ring-purple focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-muted uppercase tracking-wide">Password</label>
              <input
                name="password" type="password" required
                value={form.password} onChange={handleChange}
                placeholder="Enter password"
                className="border border-border-brand rounded-lg px-4 py-2.5 text-[14px] focus:border-purple focus:ring-1 focus:ring-purple focus:outline-none"
              />
            </div>
            
            {error && <p className="text-red-500 text-[12px] font-medium">{error}</p>}
            
            <button
              type="submit" disabled={loading}
              className="w-full bg-purple hover:bg-purple/90 text-white font-semibold text-[14px] py-3 rounded-lg transition-colors disabled:opacity-60 mt-2"
            >
              {loading ? "Authenticating..." : "Login to Admin"}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
