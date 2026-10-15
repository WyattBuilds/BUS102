"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabase";

const SKILLS = ["Reading", "Writing", "Listening", "Speaking"] as const;

type Task = { id: string; title: string; skill: string; done: boolean; due_date: string | null };

const FIELDS = "id, title, skill, done, due_date";

// Today's date as YYYY-MM-DD in the person's own time zone, so it can be
// compared directly with a due date.
function todayString() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// Show "Oct 17" for "2026-10-17". Built from the parts so the date never
// shifts by a day because of time zones.
function formatDue(due: string) {
  const [y, m, d] = due.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [skill, setSkill] = useState<string>(SKILLS[0]);
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  // Load this account's tasks. The database only returns rows the signed-in
  // person owns, so other accounts' tasks never reach the page.
  useEffect(() => {
    supabase
      ?.from("tasks")
      .select(FIELDS)
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
      .insert({ title: title.trim(), skill, due_date: dueDate || null })
      .select(FIELDS)
      .single();
    if (error) setError(error.message);
    else {
      setTasks((current) => [...current, data]);
      setTitle("");
      setDueDate("");
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

  // Count completed tasks per skill. The lowest count (or counts, if tied)
  // is the skill being avoided.
  const counts = SKILLS.map((s) => ({
    skill: s,
    count: tasks.filter((t) => t.done && t.skill === s).length,
  }));
  const lowest = Math.min(...counts.map((c) => c.count));

  const today = todayString();

  return (
    <section className="tasks">
      <h2>Skill summary</h2>
      <ul className="skill-summary">
        {counts.map((c) => (
          <li key={c.skill}>
            <span>
              {c.skill} {c.count}
            </span>
            {c.count === lowest && <span className="avoiding">Avoiding</span>}
          </li>
        ))}
      </ul>

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
        <input
          type="date"
          aria-label="Due date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {error && (
        <p className="auth-error" role="alert">
          {error}
        </p>
      )}

      <ul className="task-list">
        {tasks.map((task) => {
          const overdue = !task.done && task.due_date !== null && task.due_date < today;
          const classes = [task.done && "done", overdue && "overdue"].filter(Boolean).join(" ");
          return (
            <li key={task.id} className={classes || undefined}>
              <label>
                <input type="checkbox" checked={task.done} onChange={() => handleToggle(task)} />
                <span className="task-title">{task.title}</span>
              </label>
              <span className="task-meta">
                {task.due_date && (
                  <span className="due-date">
                    Due {formatDue(task.due_date)}
                    {overdue && <strong> Overdue</strong>}
                  </span>
                )}
                <span className="skill-label">{task.skill}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
