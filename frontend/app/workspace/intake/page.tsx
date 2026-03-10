import { intakeData, projectSummary } from "../demo-data";

const FieldCard = ({ title, items }: { title: string; items: string[] }) => (
  <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
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

export default function IntakeScreen() {
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

      <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-6">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Mission</p>
        <p className="mt-3 text-lg text-slate-100">{intakeData.mission}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FieldCard title="Success signals" items={intakeData.successSignals} />
        <FieldCard title="Constraints" items={intakeData.constraints} />
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
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
    </div>
  );
}
