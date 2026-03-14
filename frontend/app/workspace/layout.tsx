import type { ReactNode } from "react";
import Link from "next/link";
import { SidebarNav } from "./components";
import { projectSummary } from "./demo-data";
import { InfoRow } from "@/app/ui/primitives";

export default function WorkspaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/5 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5">
          <div>
            <p className="eyebrow text-[11px] text-slate-300">
              Propelo Labs Workspace
            </p>
            <p className="text-lg font-semibold text-white">
              {projectSummary.name}
            </p>
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
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
              Project summary
            </p>
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
          {children}
        </main>
      </div>
    </div>
  );
}
