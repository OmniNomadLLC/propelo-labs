import { taskBoard } from "../demo-data";

export default function TasksScreen() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
          Screen · Task Board
        </p>
        <h1 className="text-3xl font-semibold text-white">Task Board</h1>
        <p className="text-sm text-slate-400">
          Proof-of-work tasks organized by mode so the team always knows what to
          ship next.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-4">
        {taskBoard.columns.map((column) => (
          <div key={column.title} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="tracking-[0.3em] uppercase">{column.title}</span>
              <span>{column.tasks.length}</span>
            </div>
            <div className="mt-4 space-y-3">
              {column.tasks.map((task) => (
                <div key={task.title} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-sm font-semibold text-white">{task.title}</p>
                  <p className="text-xs text-slate-400">Owner: {task.owner}</p>
                  <p className="mt-1 text-xs text-slate-300">Proof: {task.proof}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-sm text-slate-300">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Rules</p>
        <p className="mt-2">
          Every task requires a proof-of-work artifact. Promote tasks to Ready
          only after QA sign-off captured in Wrap-up.
        </p>
      </div>
    </div>
  );
}
