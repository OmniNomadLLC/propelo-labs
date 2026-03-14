"use client";

import { useState } from "react";
import { SectionBlock } from "@/app/ui/primitives";
import { useProject, type ProjectContextValue } from "../project-context";

type SnapshotKey = keyof ProjectContextValue["wrapSnapshot"]["snapshot"];

const snapshotStructure: {
  label: string;
  type: "text" | "list";
  key: SnapshotKey;
}[] = [
  { label: "Context", type: "text", key: "context" },
  { label: "Decisions locked in", type: "list", key: "decisions" },
  { label: "New insights", type: "list", key: "insights" },
  { label: "What is explicitly out of scope", type: "list", key: "outOfScope" },
  { label: "Product / UX consequences", type: "list", key: "consequences" },
  { label: "Next recommended step", type: "text", key: "nextStep" },
];

export default function WrapScreen() {
  const { wrapSnapshot, generateSnapshot } = useProject();
  const [copied, setCopied] = useState(false);

  const copySnapshot = async () => {
    const snapshotText = snapshotStructure
      .map((section) => {
        const value = wrapSnapshot.snapshot[section.key];
        if (Array.isArray(value)) {
          return `${section.label}:\n- ${value.join("\n- ")}`;
        }
        return `${section.label}: ${value}`;
      })
      .join("\n\n");

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(snapshotText);
      } catch {
        // noop in prototype
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
          Screen · Wrap-up / Handoff
        </p>
        <h1 className="text-3xl font-semibold text-white">Wrap-up & Handoff</h1>
        <p className="text-sm text-slate-400">
          Capture what shifted, what is locked, and what happens next before the
          project leaves Architect mode.
        </p>
        <button
          onClick={generateSnapshot}
          className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white hover:border-white"
        >
          Generate snapshot
        </button>
      </header>

      <SectionBlock eyebrow="Session summary" className="tier-one p-6">
        <p className="mt-3 text-lg leading-relaxed text-slate-100">
          {wrapSnapshot.sessionSummary}
        </p>
      </SectionBlock>

      <div className="grid gap-5 md:grid-cols-3">
        <SectionBlock
          eyebrow="Proof of work"
          className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5"
          eyebrowClassName="text-xs uppercase tracking-[0.4em] text-emerald-200"
        >
          <ul className="mt-3 space-y-2 text-sm text-emerald-50">
            {wrapSnapshot.proofPoints.map((point) => (
              <li key={point} className="rounded-xl bg-black/10 px-3 py-2">
                {point}
              </li>
            ))}
          </ul>
        </SectionBlock>
        <SectionBlock
          eyebrow="Risks to watch"
          className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-5"
          eyebrowClassName="text-xs uppercase tracking-[0.4em] text-amber-200"
        >
          <ul className="mt-3 space-y-2 text-sm text-amber-50">
            {wrapSnapshot.risks.map((risk) => (
              <li key={risk} className="rounded-xl bg-black/10 px-3 py-2">
                {risk}
              </li>
            ))}
          </ul>
        </SectionBlock>
        <SectionBlock
          eyebrow="Next steps"
          className="rounded-2xl border border-sky-400/40 bg-sky-500/10 p-5"
          eyebrowClassName="text-xs uppercase tracking-[0.4em] text-slate-200"
        >
          <ul className="mt-3 space-y-2 text-sm text-slate-100">
            {wrapSnapshot.nextSteps.map((step) => (
              <li key={step} className="rounded-xl bg-black/20 px-3 py-2">
                {step}
              </li>
            ))}
          </ul>
        </SectionBlock>
      </div>

      <div className="tier-one p-6 text-sm text-slate-100">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-200">
              Project memory snapshot
            </p>
            <p className="text-sm text-slate-300">
              Structured to paste directly into the Project Memory doc.
            </p>
          </div>
          <button
            onClick={copySnapshot}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              copied
                ? "bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/30"
                : "bg-white text-slate-900 shadow-lg shadow-slate-900/10 hover:bg-slate-100"
            }`}
          >
            {copied ? "Copied" : "Copy snapshot"}
          </button>
        </div>
        <div className="mt-4 space-y-4 rounded-2xl border border-white/20 bg-white/80 p-5 text-slate-900 shadow-inner">
          {snapshotStructure.map((section) => {
            const value = wrapSnapshot.snapshot[section.key];
            return (
              <div key={section.label}>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  {section.label}
                </p>
                {Array.isArray(value) ? (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                    {value.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm font-medium leading-relaxed">{value}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
