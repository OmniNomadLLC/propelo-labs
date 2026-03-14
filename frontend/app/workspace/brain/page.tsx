"use client";

import { useState, type ComponentType, type SVGProps } from "react";
import { SectionBlock, StatusChip } from "@/app/ui/primitives";
import { useProject, type ConfidenceLevel } from "../project-context";

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

export default function BrainScreen() {
  const { brainWorkflows, addDecision, addRisk } = useProject();
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [showDecisionForm, setShowDecisionForm] = useState(false);
  const [decisionText, setDecisionText] = useState("");
  const [decisionConfidence, setDecisionConfidence] = useState<ConfidenceLevel>("medium");
  const [showRiskForm, setShowRiskForm] = useState(false);
  const [riskDescription, setRiskDescription] = useState("");
  const [riskImpact, setRiskImpact] = useState<ConfidenceLevel>("medium");
  const [riskLikelihood, setRiskLikelihood] = useState<ConfidenceLevel>("medium");
  const handleDecisionSubmit = () => {
    if (!decisionText.trim()) return;
    addDecision({ text: decisionText, confidence: decisionConfidence });
    setDecisionText("");
    setDecisionConfidence("medium");
    setShowDecisionForm(false);
  };

  const handleRiskSubmit = () => {
    if (!riskDescription.trim()) return;
    addRisk({
      description: riskDescription,
      impact: riskImpact,
      likelihood: riskLikelihood,
    });
    setRiskDescription("");
    setRiskImpact("medium");
    setRiskLikelihood("medium");
    setShowRiskForm(false);
  };

  const signalMetrics = [
    {
      label: "Decisions locked",
      value: brainWorkflows.decisions.length,
      detail: "+3 this session",
    },
    {
      label: "Working assumptions",
      value: brainWorkflows.assumptions.length,
      detail: "2 pending validation",
    },
    {
      label: "Risks tracked",
      value: brainWorkflows.risks.length,
      detail: "Mitigate before Build",
    },
  ];

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
        <SectionBlock
          eyebrow="Decisions locked in"
          className="tier-three p-5 text-sm"
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowDecisionForm((prev) => !prev)}
              className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-slate-100 hover:border-white"
            >
              + Add decision
            </button>
          </div>
          {showDecisionForm && (
            <div className="mt-3 rounded-2xl border border-white/10 bg-black/30 p-4">
              <textarea
                value={decisionText}
                onChange={(event) => setDecisionText(event.target.value)}
                placeholder="Decision detail"
                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-100 focus:border-sky-400/60 focus:outline-none"
              />
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                <label className="text-slate-400">
                  Confidence
                  <select
                    value={decisionConfidence}
                    onChange={(event) =>
                      setDecisionConfidence(event.target.value as ConfidenceLevel)
                    }
                    className="ml-2 rounded-full border border-white/20 bg-slate-900 px-3 py-1 text-slate-100"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </label>
                <button
                  onClick={handleDecisionSubmit}
                  className="rounded-full bg-white px-4 py-1 text-xs font-semibold text-slate-900"
                >
                  Save
                </button>
              </div>
            </div>
          )}
          <ul className="mt-4 space-y-2 text-slate-100">
            {brainWorkflows.decisions.map((item) => (
              <li key={item.id} className="rounded-xl bg-black/20 px-3 py-2">
                <p>{item.text}</p>
                <p className="mt-1 text-xs text-slate-400">
                  Confidence: <span className="font-semibold">{item.confidence}</span>
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Impact</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-300">
              <li>
                Anchors {brainWorkflows.decisions.length} blueprint checkpoints before Scope moves forward.
              </li>
              <li>Promotes new guardrails into Tasks when delivery modes change.</li>
              <li>
                Links {brainWorkflows.risks.length} tracked risks so QA sees what stays under watch.
              </li>
            </ul>
          </div>
        </SectionBlock>
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
        <SectionBlock
          eyebrow="Working assumptions"
          className="tier-three p-5 text-sm"
        >
          <ul className="mt-3 space-y-2 text-slate-100">
            {brainWorkflows.assumptions.map((item) => (
              <li key={item} className="rounded-xl bg-black/20 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </SectionBlock>
        <SectionBlock
          eyebrow="Risks"
          className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-5 text-sm"
          eyebrowClassName="text-xs uppercase tracking-[0.4em] text-rose-200"
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowRiskForm((prev) => !prev)}
              className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-rose-50 hover:border-white/60"
            >
              + Add risk
            </button>
          </div>
          {showRiskForm && (
            <div className="mt-3 rounded-2xl border border-rose-400/40 bg-black/30 p-4">
              <textarea
                value={riskDescription}
                onChange={(event) => setRiskDescription(event.target.value)}
                placeholder="Risk description"
                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-100 focus:border-rose-400/60 focus:outline-none"
              />
              <div className="mt-3 flex flex-wrap gap-3 text-xs">
                <label className="text-rose-100">
                  Impact
                  <select
                    value={riskImpact}
                    onChange={(event) => setRiskImpact(event.target.value as ConfidenceLevel)}
                    className="ml-2 rounded-full border border-white/20 bg-slate-900 px-3 py-1 text-slate-100"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </label>
                <label className="text-rose-100">
                  Likelihood
                  <select
                    value={riskLikelihood}
                    onChange={(event) =>
                      setRiskLikelihood(event.target.value as ConfidenceLevel)
                    }
                    className="ml-2 rounded-full border border-white/20 bg-slate-900 px-3 py-1 text-slate-100"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </label>
                <button
                  onClick={handleRiskSubmit}
                  className="rounded-full bg-white px-4 py-1 text-xs font-semibold text-slate-900"
                >
                  Save
                </button>
              </div>
            </div>
          )}
          <ul className="mt-4 space-y-2 text-rose-50">
            {brainWorkflows.risks.map((item) => (
              <li key={item.id} className="rounded-xl bg-black/20 px-3 py-2">
                <p>{item.description}</p>
                <div className="mt-1 flex flex-wrap gap-2 text-xs text-rose-100">
                  <StatusChip label={`Impact: ${item.impact}`} variant="outline" className="border-rose-200/40 text-rose-50" />
                  <StatusChip label={`Likelihood: ${item.likelihood}`} variant="outline" className="border-rose-200/40 text-rose-50" />
                </div>
              </li>
            ))}
          </ul>
        </SectionBlock>
      </div>

      <SectionBlock
        eyebrow="Open questions"
        className="tier-three p-5 text-sm text-slate-300"
      >
        <div className="mt-4 space-y-3">
          {brainWorkflows.openQuestions.map((question) => {
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
      </SectionBlock>

      <SectionBlock eyebrow="Focus" className="tier-three p-5 text-sm text-slate-200">
        <p className="mt-3">
          Promote answers from Open Questions once validated. Move risks into the Task Board when
          mitigation tasks exist.
        </p>
      </SectionBlock>
    </div>
  );
}
