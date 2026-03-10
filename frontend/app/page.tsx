import Link from "next/link";

const problemPoints = [
  "Client requests arrive as voice notes, Looms, and half-written docs.",
  "Builders waste days translating chaos into runnable plans.",
  "Hand-offs are brittle because nothing captures decisions or scope.",
];

const flowSteps = [
  {
    title: "Intake",
    copy: "Capture messy context, owner goals, and constraints inside a guided canvas.",
  },
  {
    title: "Project Brain",
    copy: "Lock decisions, assumptions, and risks so the project memory stays trustworthy.",
  },
  {
    title: "Scope & Blueprint",
    copy: "Translate intent into phased structure, guardrails, and automation logic.",
  },
  {
    title: "Task Board",
    copy: "Sequence the work with proof-of-work style tasks and mode-ready columns.",
  },
  {
    title: "Wrap-up",
    copy: "Ship decisions and next steps with project snapshots and QA gates.",
  },
];

const featureTiles = [
  "Structured prompts tuned for workflow + automation wedge.",
  "Guided intake chips that clarify missions before handoff.",
  "Project memory layer that keeps scope and decisions visible.",
  "Guided blueprinting for flows, phases, and QA.",
  "Copy-ready snapshots for durable handoffs.",
  "Seeded demo states so every screen feels alive day one.",
];

const audience = [
  "Solo automation builders tightening delivery",
  "Small agencies juggling multiple client workflows",
  "Service operators productizing repeatable projects",
  "Internal teams mapping ops systems before implementation",
];

const differentiation = [
  "Guided build OS, not an aimless chatbot.",
  "Scope-first workflow that respects memory and handoffs.",
  "Designed to coexist with GHL, n8n, and existing stacks.",
  "Proof-of-work mindset borrowed from serious build teams.",
];

const useCaseMilestones = [
  {
    label: "Signal",
    text: "Clinic has thousands of dormant leads and wants a non-spammy reactivation flow.",
  },
  {
    label: "Blueprint",
    text: "Propelo Labs maps phases: data hygiene, outreach, nurture, QA & review.",
  },
  {
    label: "Execution",
    text: "Each phase ships with logic, tools, and proof-of-work tasks for the ops team.",
  },
];

const visionPillars = [
  "Universal Project Brain that stores every decision and dependency.",
  "Execution Engine with modes (Architect, Build, Refine) to guide work.",
  "Delivery Layer hooks for future orchestration across tools and codebases.",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/5 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Propelo Labs
            </p>
            <p className="text-lg font-semibold text-slate-50">
              AI-guided project operating system
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="#problem"
              className="text-sm font-medium text-slate-300 hover:text-white"
            >
              Why it matters
            </Link>
            <Link
              href="/workspace/intake"
              className="rounded-full bg-sky-400/90 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
            >
              Launch prototype
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 py-16">
        <section id="hero" className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="inline-flex items-center rounded-full border border-white/10 px-4 py-1 text-xs tracking-[0.3em] text-slate-200">
              Workflow & Automation Blueprint OS
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Turn messy workflow ideas into structured, phased execution plans.
            </h1>
            <p className="text-lg text-slate-300">
              Propelo Labs is the calm build surface for automation agencies and
              service operators. Capture chaos, lock decisions, and leave every
              session with a blueprint that teammates can trust.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/workspace/intake"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900"
              >
                Explore seeded demo
              </Link>
              <Link
                href="#solution"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-slate-100"
              >
                See how it flows
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Demo project snapshot
            </p>
            <h3 className="mt-4 text-2xl font-semibold text-white">
              Lead Reactivation — North River Dental
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Status: Blueprinting · Owner: Growth Ops · Mode: Architect
            </p>
            <dl className="mt-8 grid gap-6 text-sm text-slate-300 sm:grid-cols-2">
              <div>
                <dt className="text-slate-500">Dormant records</dt>
                <dd className="text-2xl font-semibold text-white">3,842</dd>
              </div>
              <div>
                <dt className="text-slate-500">Reactivation target</dt>
                <dd className="text-2xl font-semibold text-white">18%</dd>
              </div>
              <div>
                <dt className="text-slate-500">Automation phases locked</dt>
                <dd className="text-2xl font-semibold text-white">4</dd>
              </div>
              <div>
                <dt className="text-slate-500">QA gates</dt>
                <dd className="text-2xl font-semibold text-white">3</dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="problem" className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Problem
          </p>
          <h2 className="text-3xl font-semibold text-white">
            Workflow projects die in the gap between intake and execution.
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {problemPoints.map((point) => (
              <p
                key={point}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-slate-300"
              >
                {point}
              </p>
            ))}
          </div>
        </section>

        <section id="solution" className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Solution flow
          </p>
          <h2 className="text-3xl font-semibold text-white">
            One calm operating system that keeps every step intentional.
          </h2>
          <div className="grid gap-4 lg:grid-cols-5">
            {flowSteps.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-5"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  {step.title}
                </p>
                <p className="mt-3 text-sm text-slate-300">{step.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Features & benefits
          </p>
          <h2 className="text-3xl font-semibold text-white">
            Built for agencies that need clarity, not chaos.
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {featureTiles.map((tile) => (
              <div
                key={tile}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-slate-300"
              >
                {tile}
              </div>
            ))}
          </div>
        </section>

        <section id="who" className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Who it’s for
          </p>
          <h2 className="text-3xl font-semibold text-white">
            Operators who turn briefs into reliable client outcomes.
          </h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {audience.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-white/5 bg-slate-900/40 px-5 py-4 text-sm text-slate-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section id="differentiation" className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Differentiation
          </p>
          <h2 className="text-3xl font-semibold text-white">
            A guided operating system, not a no-code clone.
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {differentiation.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/5 bg-gradient-to-br from-slate-900 to-slate-950 p-6 text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section id="use-case" className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Example use case
          </p>
          <div className="rounded-3xl border border-sky-500/30 bg-slate-900/60 p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                  Seeded demo
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white">
                  Lead Reactivation for Dental Clinic
                </h3>
              </div>
              <Link
                href="/workspace/scope"
                className="rounded-full border border-sky-400/70 px-5 py-2 text-sm font-semibold text-sky-300"
              >
                View blueprint screen
              </Link>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {useCaseMilestones.map((milestone) => (
                <div key={milestone.label} className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                    {milestone.label}
                  </p>
                  <p className="text-sm text-slate-200">{milestone.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="vision" className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Long-term vision
          </p>
          <h2 className="text-3xl font-semibold text-white">
            Phase 1: Workflow & automation blueprinting. Future: build OS.
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {visionPillars.map((pillar) => (
              <div
                key={pillar}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-sm text-slate-300"
              >
                {pillar}
              </div>
            ))}
          </div>
        </section>

        <section id="cta" className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-400/10 via-sky-500/10 to-blue-500/10 p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-200">
                Final CTA
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                Give your next workflow project a disciplined operating system.
              </h2>
              <p className="mt-2 text-base text-slate-200">
                Explore the seeded Lead Reactivation workspace, then plug in your
                own intake to see how Propelo Labs keeps scope honest.
              </p>
            </div>
            <div className="flex flex-col gap-3 text-sm font-semibold">
              <Link
                href="/workspace/intake"
                className="rounded-full bg-white/90 px-6 py-3 text-center text-slate-900"
              >
                Open prototype workspace
              </Link>
              <a
                href="mailto:hello@propelolabs.com"
                className="rounded-full border border-white/40 px-6 py-3 text-center text-white"
              >
                Request build partner access
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
