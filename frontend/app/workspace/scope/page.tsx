"use client";

import { useState } from "react";
import { scopeBlueprint } from "../demo-data";

export default function ScopeScreen() {
  const [selectedPath, setSelectedPath] = useState(
    scopeBlueprint.overview.implementationPath[0],
  );
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
          Screen · Scope & Blueprint
        </p>
        <h1 className="text-3xl font-semibold text-white">Scope & Blueprint</h1>
        <p className="text-sm text-slate-400">
          Strongest screen: shows how we turn intake into phased execution with
          crystal-clear boundaries.
        </p>
      </header>

      <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
              Smallest useful version
            </p>
            <p className="mt-2 text-sm text-slate-200">
              {scopeBlueprint.overview.smallestUsefulVersion}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
              MVP boundary
            </p>
            <p className="mt-2 text-sm text-slate-200">
              {scopeBlueprint.overview.mvpBoundary}
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-200">
              Blueprint summary
            </p>
            <p className="mt-2 text-sm text-emerald-50">
              {scopeBlueprint.overview.summary}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-green-400/30 bg-green-500/10 p-5">
          <p className="text-xs uppercase tracking-[0.4em] text-green-200">
            In scope
          </p>
          <ul className="mt-3 space-y-2 text-sm text-green-50">
            {scopeBlueprint.inScope.map((item) => (
              <li key={item} className="rounded-xl bg-black/10 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-rose-400/40 bg-rose-500/10 p-5">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-200">
            Out of scope (for now)
          </p>
          <ul className="mt-3 space-y-2 text-sm text-rose-50">
            {scopeBlueprint.outOfScope.map((item) => (
              <li key={item} className="rounded-xl bg-black/10 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
          Phased blueprint
        </p>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {scopeBlueprint.phases.map((phase) => (
            <div key={phase.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-start justify-between text-xs text-slate-400">
                <span className="font-semibold tracking-[0.3em]">{phase.id}</span>
                <span>Mode: Architect</span>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white">{phase.title}</h3>
              <p className="mt-2 text-sm text-slate-200">{phase.summary}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.4em] text-slate-500">
                Deliverables
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-100">
                {phase.deliverables.map((deliverable) => (
                  <li key={deliverable}>{deliverable}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-sky-400/40 bg-sky-500/10 p-5">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-200">
            Recommended implementation path
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {scopeBlueprint.overview.implementationPath.map((step) => (
              <button
                key={step}
                onClick={() => setSelectedPath(step)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  selectedPath === step
                    ? "border-white bg-white text-slate-900"
                    : "border-white/20 text-slate-100 hover:border-white"
                }`}
              >
                {step}
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-white/20 bg-black/20 p-4 text-sm text-slate-100">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
              Currently highlighted step
            </p>
            <p className="mt-2">{selectedPath}</p>
            <p className="mt-2 text-xs text-slate-400">
              Keep this path visible in Wrap-up so the next mode knows what to
              execute.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-200">
            Automation flow logic
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-5">
            {scopeBlueprint.automationFlow.map((node) => (
              <div
                key={node.name}
                className="rounded-2xl bg-black/20 p-4 text-sm text-slate-100"
              >
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
                  {node.name}
                </p>
                <p className="mt-2 text-slate-100">{node.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-300">
            Each stage pairs with QA gates before advancing into the Task Board.
          </p>
        </div>
      </div>
    </div>
  );
}
