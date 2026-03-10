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

      <div className="grid gap-5 md:grid-cols-2">
        <Column title="Decisions locked in" items={brainData.decisions} />
        <Column title="Working assumptions" items={brainData.assumptions} />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Column title="Risks" items={brainData.risks} tone="alert" />
        <Column title="Open questions" items={brainData.openQuestions} />
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
