"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { SidebarNav } from "./components";
import { InfoRow, StatusChip } from "@/app/ui/primitives";
import { useProject } from "./project-context";

export function WorkspaceFrame({ children }: { children: ReactNode }) {
  const { projectSummary, brainWorkflows, tasks } = useProject();
  const decisionCount = brainWorkflows.decisions.length;
  const riskCount = brainWorkflows.risks.length;
  const taskCount = tasks.columns.reduce((acc, column) => acc + column.tasks.length, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/5 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5">
          <div>
            <p className="eyebrow text-[11px] text-slate-300">Propelo Labs Workspace</p>
            <p className="text-lg font-semibold text-white">{projectSummary.name}</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="rounded-full border border-white/15 px-4 py-2 text-slate-200">
              Mode: Architect
            </span>
            <Link
              href="/"
              className="rounded-full bg-white px-5 py-2 font-semibold text-slate-900 shadow-lg shadow-slate-900/20"
            >
              Back to site
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6">
          <div className="tier-three p-5 text-sm text-slate-200">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Project summary</p>
            <div className="mt-4 space-y-2">
              <InfoRow label="Type" value={projectSummary.type} />
              <InfoRow label="Owner" value={projectSummary.owner} />
              <InfoRow label="Status" value={projectSummary.status} />
              <InfoRow label="Cadence" value={projectSummary.cadence} />
              <InfoRow label="Last update" value={projectSummary.lastUpdated} />
            </div>
          </div>
          <SidebarNav />
        </aside>

        <main className="tier-one animate-rise min-h-[70vh] w-full overflow-hidden p-6 md:p-8">
          <SystemMap
            decisionCount={decisionCount}
            riskCount={riskCount}
            taskCount={taskCount}
          />
          {children}
        </main>
      </div>
    </div>
  );
}

function SystemMap({
  decisionCount,
  riskCount,
  taskCount,
}: {
  decisionCount: number;
  riskCount: number;
  taskCount: number;
}) {
  const nodes = [
    {
      label: "Mission",
      description: "Intake clarity",
      href: "/workspace/intake",
    },
    {
      label: "Decisions",
      description: `${decisionCount} decisions · ${riskCount} risks`,
      href: "/workspace/brain",
    },
    {
      label: "Blueprint",
      description: "Phases + scope",
      href: "/workspace/scope",
    },
    {
      label: "Tasks",
      description: `${taskCount} active tasks`,
      href: "/workspace/tasks",
    },
    {
      label: "Snapshot",
      description: "Wrap & handoff",
      href: "/workspace/wrap",
    },
  ];

  return (
    <div className="mb-6 rounded-2xl border border-white/15 bg-white/5 p-5 text-sm text-slate-200">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">System map</p>
        <StatusChip label="Live" variant="solid" className="text-slate-900" />
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {nodes.map((node, index) => (
          <div key={node.label}>
            <Link
              href={node.href}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-slate-100 transition hover:border-white/40"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{node.label}</p>
                <p className="text-base font-semibold text-white">{node.description}</p>
              </div>
              <span className="text-xs tracking-[0.3em] text-slate-400">GO</span>
            </Link>
            {index < nodes.length - 1 && (
              <div className="flex items-center justify-center py-1 text-xs text-slate-500">
                ↓
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
