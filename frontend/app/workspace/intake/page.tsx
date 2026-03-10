"use client";

import { useState } from "react";
import { intakeData, projectSummary } from "../demo-data";

const FieldCard = ({ title, items }: { title: string; items: string[] }) => (
  <div className="tier-three p-5">
    <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{title}</p>
    <ul className="mt-3 space-y-2 text-sm text-slate-100">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-slate-200"
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const promptDetails: Record<string, string> = {
  "Clarify tone for SMS vs email sequences":
    "Ask: How personal should SMS be vs. email? Capture exact tone adjectives.",
  "Narrow Phase 1 to hygiene + first touch":
    "Prompt: “What is the smallest slice of the funnel we must prove before scaling?”",
  "Surface dependencies before promising outcomes":
    "Checklist: CRM tags, opt-in audit, office staffing plan.",
  "Ask for owner definition of a 'reactivated' lead":
    "Without a shared definition, reporting breaks. Capture it here now.",
};

export default function IntakeScreen() {
  const [activePrompt, setActivePrompt] = useState(
    intakeData.guidance.prompts[0],
  );
  const [completedActions, setCompletedActions] = useState<string[]>([]);

  const toggleAction = (action: string) => {
    setCompletedActions((prev) =>
      prev.includes(action)
        ? prev.filter((item) => item !== action)
        : [...prev, action],
    );
  };

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
          Screen · Project Intake
        </p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-white">Project Intake</h1>
            <p className="text-sm text-slate-400">
              Capture intent, align on constraints, and define success before
              anyone opens a builder.
            </p>
          </div>
          <div className="text-right text-sm text-slate-400">
            <p>{projectSummary.owner}</p>
            <p>Last updated · {projectSummary.lastUpdated}</p>
          </div>
        </div>
      </div>

      <div className="tier-one p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
              Mission in progress
            </p>
            <p className="mt-3 text-lg text-slate-100">{intakeData.mission}</p>
          </div>
          <div className="tier-three p-4 text-sm text-slate-200 md:w-72">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
              Guided next step
            </p>
            <p className="mt-2 text-slate-100">
              Use a prompt chip below to tighten this mission before it moves to
              Scope.
            </p>
          </div>
        </div>
      </div>

      <div className="tier-two p-6">
        <div className="flex flex-wrap gap-3">
          {intakeData.guidance.prompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => setActivePrompt(prompt)}
              className={`chip-active rounded-full border px-4 py-2 text-xs font-semibold ${
                activePrompt === prompt
                  ? "border-sky-400/60 bg-sky-400/10 text-sky-100"
                  : "border-white/10 text-slate-300 hover:border-sky-400/40"
              }`}
            >
              {prompt}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-sky-400/20 bg-slate-950/60 p-5 text-sm text-slate-200">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
            Suggested clarification
          </p>
          <p className="mt-2 text-base text-white">{activePrompt}</p>
          <p className="mt-3 text-slate-300">{promptDetails[activePrompt]}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FieldCard title="Success signals" items={intakeData.successSignals} />
        <FieldCard title="Constraints" items={intakeData.constraints} />
      </div>

      <div className="tier-three p-5">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
          Working assumptions
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {intakeData.assumptions.map((assumption) => (
            <div key={assumption} className="rounded-xl bg-white/5 p-4 text-sm text-slate-200">
              {assumption}
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-400">
          Anything uncertain belongs here. Promote items into the Project Brain
          when validated.
        </p>
      </div>

      <div className="tier-three p-5">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
          Intake actions to lock
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {intakeData.guidance.nextActions.map((action) => {
            const isDone = completedActions.includes(action);
            return (
              <button
                key={action}
                onClick={() => toggleAction(action)}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                  isDone
                    ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-50"
                    : "border-white/10 bg-white/5 text-slate-200 hover:border-emerald-400/30"
                }`}
              >
                <span className="block font-semibold">
                  {isDone ? "Marked" : "Pending"}
                </span>
                <span className="mt-1 block text-xs text-slate-300">{action}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-slate-400">
          These guide rails do not save anywhere yet—they simply show how Propelo
          keeps intake structured.
        </p>
      </div>
    </div>
  );
}
