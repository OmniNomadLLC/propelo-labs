"use client";

import { useState } from "react";
import { brainData } from "../demo-data";

const Column = ({
  title,
  items,
  tone = "default",
}: {
  title: string;
  items: string[];
  tone?: "default" | "alert";
}) => (
  <div
    className={`rounded-2xl border p-5 text-sm ${
      tone === "alert"
        ? "border-rose-500/40 bg-rose-500/10"
        : "border-white/10 bg-slate-900/60"
    }`}
  >
    <p
      className={`text-xs uppercase tracking-[0.4em] ${
        tone === "alert" ? "text-rose-200" : "text-slate-500"
      }`}
    >
      {title}
    </p>
    <ul className="mt-3 space-y-2 text-slate-100">
      {items.map((item) => (
        <li key={item} className="rounded-xl bg-black/20 px-3 py-2">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default function BrainScreen() {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
          Screen · Project Brain
        </p>
        <h1 className="text-3xl font-semibold text-white">Project Brain</h1>
        <p className="text-sm text-slate-400">
          Decisions, assumptions, and risks that keep the automation blueprint
          honest.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Column title="Decisions locked in" items={brainData.decisions} />
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
            Signal monitor
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            {[
              { label: "Decisions", value: brainData.decisions.length },
              { label: "Assumptions", value: brainData.assumptions.length },
              { label: "Risks", value: brainData.risks.length },
            ].map((metric) => (
              <div key={metric.label} className="rounded-xl border border-white/10 bg-black/20 p-3">
                <p className="text-2xl font-semibold text-white">{metric.value}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Keep Decisions ≥ Risks to avoid scope slippage before entering Build
            mode.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Column title="Working assumptions" items={brainData.assumptions} />
        <Column title="Risks" items={brainData.risks} tone="alert" />
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-sm text-slate-300">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
          Open questions
        </p>
        <div className="mt-4 space-y-3">
          {brainData.openQuestions.map((question) => {
            const isOpen = expandedQuestion === question;
            return (
              <button
                key={question}
                onClick={() =>
                  setExpandedQuestion(isOpen ? null : question)
                }
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-slate-100 transition ${
                  isOpen
                    ? "border-sky-400/50 bg-sky-500/10"
                    : "border-white/10 bg-white/5 hover:border-sky-400/30"
                }`}
              >
                <span className="text-sm">{question}</span>
                <span className="text-xs tracking-[0.3em] text-slate-400">
                  {isOpen ? "HIDE" : "EXPAND"}
                </span>
              </button>
            );
          })}
        </div>
        {expandedQuestion && (
          <p className="mt-4 text-xs text-slate-400">
            Promote resolved questions to Decisions. Unresolved ones block the
            Scope handoff.
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-sm text-slate-300">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Focus</p>
        <p className="mt-3">
          Promote answers from Open Questions once validated. Move risks into the
          Task Board when mitigation tasks exist.
        </p>
      </div>
    </div>
  );
}
