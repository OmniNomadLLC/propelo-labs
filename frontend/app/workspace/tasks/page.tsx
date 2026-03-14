"use client";

import { useState } from "react";
import { SectionBlock } from "@/app/ui/primitives";
import { taskBoard } from "../demo-data";

const modes = ["All", ...taskBoard.columns.map((column) => column.title)];

export default function TasksScreen() {
  const [activeMode, setActiveMode] = useState("All");
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

      <div className="flex flex-wrap gap-3">
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {taskBoard.columns.map((column) => {
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

      <SectionBlock eyebrow="Rules" className="tier-three p-5 text-sm text-slate-200">
        <p className="mt-2">
          Every task requires a proof-of-work artifact. Promote tasks to Ready
          only after QA sign-off captured in Wrap-up.
        </p>
      </SectionBlock>
    </div>
  );
}
