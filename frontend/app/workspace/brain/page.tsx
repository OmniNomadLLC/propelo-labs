"use client";

import { useState, type ComponentType, type SVGProps } from "react";
import { brainData } from "../demo-data";

type IconProps = SVGProps<SVGSVGElement>;

const iconBase = "h-5 w-5";

const IconPulse: ComponentType<IconProps> = ({ className = iconBase, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className} text-emerald-300`}
    {...props}
  >
    <path d="M2 12h4l2 6 4-16 2 10h6" />
  </svg>
);

const IconDial: ComponentType<IconProps> = ({ className = iconBase, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className} text-cyan-300`}
    {...props}
  >
    <circle cx={12} cy={12} r={9} />
    <path d="M12 7v5l3 3" />
  </svg>
);

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
    className={`text-sm p-5 ${
      tone === "alert"
        ? "rounded-2xl border border-rose-500/40 bg-rose-500/10"
        : "tier-three"
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

const signalMetrics = [
  {
    label: "Decisions locked",
    value: brainData.decisions.length,
    detail: "+3 this session",
  },
  {
    label: "Working assumptions",
    value: brainData.assumptions.length,
    detail: "2 pending validation",
  },
  {
    label: "Risks tracked",
    value: brainData.risks.length,
    detail: "Mitigate before Build",
  },
];

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
          Decisions, assumptions, and risks that keep the automation blueprint honest.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Column title="Decisions locked in" items={brainData.decisions} />
        <div className="tier-two flex flex-col gap-5 rounded-3xl p-6 text-sm text-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Signal monitor</p>
              <p className="text-base font-semibold text-white">Project readiness snapshot</p>
            </div>
            <IconPulse className="h-6 w-6" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {signalMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/15 bg-white/5 p-4"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  {metric.label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">{metric.value}</p>
                <p className="text-xs text-slate-400">{metric.detail}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center gap-3">
              <IconDial className="h-6 w-6" />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Confidence index
                </p>
                <p className="text-2xl font-semibold text-white">84%</p>
              </div>
              <span className="ml-auto rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200">
                Ready for Build
              </span>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              All critical risks documented. Waiting on compliance review to move into Build mode.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Column title="Working assumptions" items={brainData.assumptions} />
        <Column title="Risks" items={brainData.risks} tone="alert" />
      </div>

      <div className="tier-three p-5 text-sm text-slate-300">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Open questions</p>
        <div className="mt-4 space-y-3">
          {brainData.openQuestions.map((question) => {
            const isOpen = expandedQuestion === question;
            return (
              <button
                key={question}
                onClick={() => setExpandedQuestion(isOpen ? null : question)}
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
            Promote resolved questions to Decisions. Unresolved ones block the Scope handoff.
          </p>
        )}
      </div>

      <div className="tier-three p-5 text-sm text-slate-200">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Focus</p>
        <p className="mt-3">
          Promote answers from Open Questions once validated. Move risks into the Task Board when
          mitigation tasks exist.
        </p>
      </div>
    </div>
  );
}
