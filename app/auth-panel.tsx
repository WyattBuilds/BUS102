"use client";

import { useState } from "react";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

type Session = { email: string; accessToken: string };
type Mode = "idle" | "signup" | "login";

// Talks to Supabase's sign-in service directly with fetch, so no extra
// packages are needed.
async function authRequest(path: string, body: object) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
    method: "POST",
    headers: { apikey: SUPABASE_KEY ?? "", "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.msg || data.error_description || data.message || "Something went wrong.");
  }
  return data;
}

export default function AuthPanel() {
  const [session, setSession] = useState<Session | null>(null);
  const [mode, setMode] = useState<Mode>("idle");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function openForm(next: Mode) {
    setMode(next);
    setError("");
    setPassword("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      setError("Sign-in is not set up on this deployment.");
      return;
    }
    setBusy(true);
    try {
      const data =
        mode === "signup"
          ? await authRequest("signup", { email, password })
          : await authRequest("token?grant_type=password", { email, password });
      if (!data.access_token) {
        throw new Error("Account created, but sign-in did not start. Try Log in.");
      }
      setSession({ email: data.user?.email ?? email, accessToken: data.access_token });
      setMode("idle");
      setPassword("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(mode === "login" ? "Wrong email or password." : message);
    } finally {
      setBusy(false);
    }
  }

  async function handleSignOut() {
    if (session) {
      // Best effort: tell Supabase to end the session, then clear it here either way.
      await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
        method: "POST",
        headers: { apikey: SUPABASE_KEY ?? "", Authorization: `Bearer ${session.accessToken}` },
      }).catch(() => {});
    }
    setSession(null);
    setEmail("");
    openForm("idle");
  }

  if (session) {
    return (
      <div className="auth">
        <p className="auth-status">
          Signed in as <strong>{session.email}</strong>
        </p>
        <button type="button" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="auth">
      <div className="auth-buttons">
        <button type="button" onClick={() => openForm("login")}>
          Log in
        </button>
        <button type="button" className="secondary" onClick={() => openForm("signup")}>
          Sign up
        </button>
      </div>

      {mode !== "idle" && (
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>{mode === "signup" ? "Sign up" : "Log in"}</h2>
          <label>
            Email
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              minLength={6}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" disabled={busy}>
            {busy ? "Please wait…" : mode === "signup" ? "Create account" : "Log in"}
          </button>
        </form>
      )}

      {error && (
        <p className="auth-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
