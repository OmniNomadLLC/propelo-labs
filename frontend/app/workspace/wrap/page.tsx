import { wrapUpData } from "../demo-data";

export default function WrapScreen() {
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
      </header>

      <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-6">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
          Session summary
        </p>
        <p className="mt-3 text-lg text-slate-100">{wrapUpData.sessionSummary}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-200">
            Proof of work
          </p>
          <ul className="mt-3 space-y-2 text-sm text-emerald-50">
            {wrapUpData.proofPoints.map((point) => (
              <li key={point} className="rounded-xl bg-black/10 px-3 py-2">
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-5">
          <p className="text-xs uppercase tracking-[0.4em] text-amber-200">
            Risks to watch
          </p>
          <ul className="mt-3 space-y-2 text-sm text-amber-50">
            {wrapUpData.risks.map((risk) => (
              <li key={risk} className="rounded-xl bg-black/10 px-3 py-2">
                {risk}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-sky-400/40 bg-sky-500/10 p-5">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-200">
            Next steps
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-100">
            {wrapUpData.nextSteps.map((step) => (
              <li key={step} className="rounded-xl bg-black/20 px-3 py-2">
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-100">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-200">
          Snapshot preview
        </p>
        <p className="mt-3 text-base font-medium text-white">
          {wrapUpData.snapshot}
        </p>
        <p className="mt-4 text-xs text-slate-200">
          Copy this block into the Memory Snapshot template when publishing.
        </p>
      </div>
    </div>
  );
}
