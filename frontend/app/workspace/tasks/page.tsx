"use client";

import { useState } from "react";
import { SectionBlock } from "@/app/ui/primitives";
import { useProject, type ColumnKey } from "../project-context";

export default function TasksScreen() {
  const { tasks, addTask, scopeBlueprint } = useProject();
  const modes = ["All", ...tasks.columns.map((column) => column.title)];
  const [activeMode, setActiveMode] = useState("All");
  const [showForm, setShowForm] = useState(false);
  type TaskForm = { title: string; owner: string; proof: string; column: ColumnKey };
  const [newTask, setNewTask] = useState<TaskForm>({
    title: "",
    owner: "",
    proof: "",
    column: "design",
  });
  const columnTitleMap = tasks.columns.reduce<Record<string, string>>((acc, column) => {
    acc[column.id] = column.title;
    return acc;
  }, {});
  const suggestionColumns: ColumnKey[] = ["design", "build", "qa", "ready"];
  const suggestions = scopeBlueprint.phases.map((phase, index) => {
    const column = suggestionColumns[Math.min(index, suggestionColumns.length - 1)];
    return {
      id: phase.id,
      title: `${phase.title} narrative`,
      detail: phase.summary,
      owner: "Architect",
      proof: `${phase.title} proof-of-work`,
      column,
    } as const;
  });

  const handleTaskSubmit = () => {
    if (!newTask.title.trim() || !newTask.owner.trim() || !newTask.proof.trim()) {
      return;
    }
    addTask(newTask);
    setNewTask({ title: "", owner: "", proof: "", column: newTask.column });
    setShowForm(false);
  };
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
          Screen · Task Board
        </p>
        <h1 className="text-3xl font-semibold text-white">Task Board</h1>
        <p className="text-sm text-slate-400">
          Proof-of-work tasks organized by mode so the team always knows what to
          ship next.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white hover:border-white"
        >
          + Add task
        </button>
        {modes.map((mode) => (
          <button
            key={mode}
            onClick={() => setActiveMode(mode)}
            className={`chip-active rounded-full border px-4 py-2 text-xs font-semibold ${
              activeMode === mode
                ? "border-white bg-white text-slate-900"
                : "border-white/20 text-slate-200 hover:border-white"
            }`}
          >
            {mode === "All" ? "All modes" : mode}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="tier-three p-5 text-sm text-slate-200">
          <div className="grid gap-3 md:grid-cols-2">
            <input
              value={newTask.title}
              onChange={(event) => setNewTask((prev) => ({ ...prev, title: event.target.value }))}
              placeholder="Task title"
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 focus:border-sky-400/60 focus:outline-none"
            />
            <input
              value={newTask.owner}
              onChange={(event) => setNewTask((prev) => ({ ...prev, owner: event.target.value }))}
              placeholder="Owner"
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 focus:border-sky-400/60 focus:outline-none"
            />
            <input
              value={newTask.proof}
              onChange={(event) => setNewTask((prev) => ({ ...prev, proof: event.target.value }))}
              placeholder="Proof artifact"
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 focus:border-sky-400/60 focus:outline-none"
            />
            <label className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Column
              <select
                value={newTask.column}
                onChange={(event) =>
                  setNewTask((prev) => ({
                    ...prev,
                    column: event.target.value as ColumnKey,
                  }))
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-slate-100"
              >
                {tasks.columns.map((column) => (
                  <option key={column.id} value={column.id}>
                    {column.title}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleTaskSubmit}
              className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900"
            >
              Save task
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {tasks.columns.map((column) => {
          const dimColumn =
            activeMode !== "All" && activeMode !== column.title;
          return (
            <div
              key={column.title}
              className={`tier-two p-4 transition ${
                dimColumn ? "opacity-40" : "opacity-100"
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="tracking-[0.3em] uppercase">{column.title}</span>
                <span>{column.tasks.length}</span>
              </div>
              <div className="mt-4 space-y-3">
                {column.tasks.map((task) => (
                  <div
                    key={task.title}
                    className="rounded-xl border border-white/10 bg-white/5 p-3"
                  >
                    <p className="text-sm font-semibold text-white">{task.title}</p>
                    <p className="text-xs text-slate-400">Owner: {task.owner}</p>
                    <p className="mt-1 text-xs text-slate-300">Proof: {task.proof}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <SectionBlock eyebrow="Suggested tasks" className="tier-three p-5 text-sm text-slate-200">
        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div>
                <p className="text-sm font-semibold text-white">{suggestion.title}</p>
                <p className="text-xs text-slate-400">{suggestion.detail}</p>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={() =>
                    addTask({
                      title: suggestion.title,
                      owner: suggestion.owner,
                      proof: suggestion.proof,
                      column: suggestion.column,
                    })
                  }
                  className="rounded-full border border-white/30 px-4 py-1 text-xs font-semibold text-white hover:border-white"
                >
                  Add to {columnTitleMap[suggestion.column]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock eyebrow="Rules" className="tier-three p-5 text-sm text-slate-200">
        <p className="mt-2">
          Every task requires a proof-of-work artifact. Promote tasks to Ready
          only after QA sign-off captured in Wrap-up.
        </p>
      </SectionBlock>
    </div>
  );
}
