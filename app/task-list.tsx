"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabase";

const SKILLS = ["Reading", "Writing", "Listening", "Speaking"] as const;

type Task = { id: string; title: string; skill: string; done: boolean };

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [skill, setSkill] = useState<string>(SKILLS[0]);
  const [error, setError] = useState("");

  // Load this account's tasks. The database only returns rows the signed-in
  // person owns, so other accounts' tasks never reach the page.
  useEffect(() => {
    supabase
      ?.from("tasks")
      .select("id, title, skill, done")
      .order("created_at")
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setTasks(data ?? []);
      });
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase || !title.trim()) return;
    setError("");
    const { data, error } = await supabase
      .from("tasks")
      .insert({ title: title.trim(), skill })
      .select("id, title, skill, done")
      .single();
    if (error) setError(error.message);
    else {
      setTasks((current) => [...current, data]);
      setTitle("");
    }
  }

  async function handleToggle(task: Task) {
    if (!supabase) return;
    setError("");
    // Tick the box straight away, then put it back if saving fails.
    const setDone = (done: boolean) =>
      setTasks((current) => current.map((t) => (t.id === task.id ? { ...t, done } : t)));
    setDone(!task.done);
    const { error } = await supabase.from("tasks").update({ done: !task.done }).eq("id", task.id);
    if (error) {
      setDone(task.done);
      setError(error.message);
    }
  }

  return (
    <section className="tasks">
      <h2>Study tasks</h2>
      <form className="task-form" onSubmit={handleAdd}>
        <input
          type="text"
          required
          placeholder="What will you practice?"
          aria-label="Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select aria-label="Skill" value={skill} onChange={(e) => setSkill(e.target.value)}>
          {SKILLS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>

      {error && (
        <p className="auth-error" role="alert">
          {error}
        </p>
      )}

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.done ? "done" : undefined}>
            <label>
              <input type="checkbox" checked={task.done} onChange={() => handleToggle(task)} />
              <span className="task-title">{task.title}</span>
            </label>
            <span className="skill-label">{task.skill}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
