"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabase";

type Task = {
  id: string;
  title: string;
  class_name: string | null;
  done: boolean;
  due_date: string | null;
};

const FIELDS = "id, title, class_name, done, due_date";

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
  const [className, setClassName] = useState("");
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
    if (!supabase || !title.trim() || !className.trim()) return;
    setError("");
    const { data, error } = await supabase
      .from("tasks")
      .insert({ title: title.trim(), class_name: className.trim(), due_date: dueDate || null })
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

  // Every class the person has used, in alphabetical order. Tasks saved
  // before classes existed have no class and are left out.
  const classNames = [
    ...new Set(tasks.map((t) => t.class_name).filter((c): c is string => !!c)),
  ].sort();

  // Count unfinished tasks per class. The class with the most (or classes,
  // if tied) is "Behind". A class with nothing left to do is never Behind.
  const counts = classNames.map((c) => ({
    className: c,
    count: tasks.filter((t) => !t.done && t.class_name === c).length,
  }));
  const most = Math.max(0, ...counts.map((c) => c.count));

  const today = todayString();

  return (
    <section className="tasks">
      <h2>Unfinished by class</h2>
      {counts.length === 0 ? (
        <p className="summary-empty">Add a task with a class to see your summary.</p>
      ) : (
        <ul className="class-summary">
          {counts.map((c) => (
            <li key={c.className}>
              <span>
                {c.className} {c.count}
              </span>
              {most > 0 && c.count === most && <span className="behind">Behind</span>}
            </li>
          ))}
        </ul>
      )}

      <h2>Study tasks</h2>
      <form className="task-form" onSubmit={handleAdd}>
        <input
          type="text"
          required
          placeholder="What do you need to do?"
          aria-label="Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="Class, e.g. BUS102"
          aria-label="Class"
          list="class-names"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <datalist id="class-names">
          {classNames.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
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
          const rowClass = [task.done && "done", overdue && "overdue"].filter(Boolean).join(" ");
          return (
            <li key={task.id} className={rowClass || undefined}>
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
                {task.class_name && <span className="class-label">{task.class_name}</span>}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
