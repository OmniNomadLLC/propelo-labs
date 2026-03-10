"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/workspace/intake", label: "Project Intake" },
  { href: "/workspace/brain", label: "Project Brain" },
  { href: "/workspace/scope", label: "Scope & Blueprint" },
  { href: "/workspace/tasks", label: "Task Board" },
  { href: "/workspace/wrap", label: "Wrap-up / Handoff" },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group relative flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-white text-slate-900 shadow-lg"
                : "text-slate-200 hover:bg-white/5"
            }`}
          >
            <span>{item.label}</span>
            <span className="text-xs tracking-[0.3em] text-slate-500">
              {isActive ? "NOW" : "GO"}
            </span>
            <span
              className={`absolute inset-y-1 -left-1 w-1 rounded-full transition ${
                isActive
                  ? "bg-sky-400"
                  : "bg-transparent group-hover:bg-white/40"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
