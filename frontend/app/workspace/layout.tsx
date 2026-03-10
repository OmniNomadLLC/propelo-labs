import type { ReactNode } from "react";
import Link from "next/link";
import { SidebarNav } from "./components";
import { projectSummary } from "./demo-data";

export default function WorkspaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/5 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
              Propelo Labs Workspace
            </p>
            <p className="text-lg font-semibold text-white">
              {projectSummary.name}
            </p>
          </div>
           <div className="flex items-center gap-3 text-sm">
             <span className="rounded-full border border-white/10 px-4 py-2 text-slate-300">
               Mode: Architect
             </span>
             <Link
               href="/"
               className="rounded-full bg-white px-5 py-2 font-semibold text-slate-900"
             >
               Back to site
             </Link>
           </div>
         </div>
       </header>

       <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 lg:grid-cols-[260px_1fr]">
         <aside className="space-y-8">
           <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 text-sm text-slate-300">
             <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
               Project summary
             </p>
             <dl className="mt-4 space-y-2">
               <div className="flex items-center justify-between">
                 <dt className="text-slate-500">Type</dt>
                 <dd className="text-white">{projectSummary.type}</dd>
               </div>
               <div className="flex items-center justify-between">
                 <dt className="text-slate-500">Owner</dt>
                 <dd className="text-white">{projectSummary.owner}</dd>
               </div>
               <div className="flex items-center justify-between">
                 <dt className="text-slate-500">Status</dt>
                 <dd className="text-white">{projectSummary.status}</dd>
               </div>
               <div className="flex items-center justify-between">
                 <dt className="text-slate-500">Cadence</dt>
                 <dd className="text-white">{projectSummary.cadence}</dd>
               </div>
               <div className="flex items-center justify-between">
                 <dt className="text-slate-500">Last update</dt>
                 <dd className="text-white">{projectSummary.lastUpdated}</dd>
               </div>
             </dl>
           </div>
           <SidebarNav />
         </aside>

         <main className="min-h-[70vh] rounded-3xl border border-white/10 bg-slate-900/50 p-8">
           {children}
         </main>
       </div>
     </div>
  );
}
