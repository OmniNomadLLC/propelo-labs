import { scopeBlueprint } from "../demo-data";

export default function ScopeScreen() {
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

      <div className="rounded-2xl border border-sky-400/40 bg-sky-500/10 p-5">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-200">
          Automation flow logic
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {scopeBlueprint.automationFlow.map((node) => (
            <div key={node.name} className="rounded-2xl bg-black/20 p-4 text-sm text-slate-100">
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
  );
}
