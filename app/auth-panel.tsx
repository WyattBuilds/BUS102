"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import TaskList from "./task-list";

type Mode = "idle" | "signup" | "login";

export default function AuthPanel() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>("idle");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // Pick up a saved sign-in when the page loads, and follow any later changes.
  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setUserEmail(data.session?.user.email ?? null);
      setLoading(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user.email ?? null);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  function openForm(next: Mode) {
    setMode(next);
    setError("");
    setPassword("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!supabase) {
      setError("Sign-in is not set up on this deployment.");
      return;
    }
    setBusy(true);
    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else if (!data.session) setError("Account created, but sign-in did not start. Try Log in.");
      else openForm("idle");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError("Wrong email or password.");
      else openForm("idle");
    }
    setBusy(false);
  }

  async function handleSignOut() {
    await supabase?.auth.signOut();
    setEmail("");
    openForm("idle");
  }

  if (loading) return null;

  if (userEmail) {
    return (
      <>
        <div className="auth">
          <p className="auth-status">
            Signed in as <strong>{userEmail}</strong>
          </p>
          <button type="button" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
        <TaskList />
      </>
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
