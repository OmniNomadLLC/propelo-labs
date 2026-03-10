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
            className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-white text-slate-900"
                : "text-slate-300 hover:bg-white/5"
            }`}
          >
            <span>{item.label}</span>
            <span className="text-xs tracking-[0.3em] text-slate-500">
              {isActive ? "NOW" : "GO"}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
