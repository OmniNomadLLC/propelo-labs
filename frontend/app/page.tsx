import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { IconCard, SectionBlock } from "@/app/ui/primitives";

type IconProps = SVGProps<SVGSVGElement>;

const iconBase = "h-5 w-5 text-sky-300";

const IconSpark: ComponentType<IconProps> = ({ className = iconBase, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 2v6" />
    <path d="M12 16v6" />
    <path d="M4.93 4.93l4.24 4.24" />
    <path d="M14.83 14.83l4.24 4.24" />
    <path d="M2 12h6" />
    <path d="M16 12h6" />
  </svg>
);

const IconLayers: ComponentType<IconProps> = ({ className = iconBase, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 2 3 7l9 5 9-5Z" />
    <path d="M3 17l9 5 9-5" />
    <path d="M3 12l9 5 9-5" />
  </svg>
);

const IconTarget: ComponentType<IconProps> = ({ className = iconBase, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx={12} cy={12} r={8} />
    <circle cx={12} cy={12} r={4} />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
  </svg>
);

const IconShield: ComponentType<IconProps> = ({ className = iconBase, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 22s8-4 8-10V5L12 2 4 5v7c0 6 8 10 8 10z" />
  </svg>
);

const IconWorkflow: ComponentType<IconProps> = ({ className = iconBase, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x={3} y={3} width={7} height={7} rx={1.5} />
    <rect x={14} y={3} width={7} height={7} rx={1.5} />
    <rect x={9} y={14} width={7} height={7} rx={1.5} />
    <path d="M7 7h10v10" />
  </svg>
);

const painPoints = [
  {
    label: "Intake",
    title: "Unstructured requests",
    description:
      "Voice notes, Looms, and random docs take hours to normalize before any real planning.",
    icon: IconSpark,
  },
  {
    label: "Translation",
    title: "Chaos to clarity gap",
    description:
      "Teams manually rewrite context into scope docs, often losing decisions and constraints.",
    icon: IconLayers,
  },
  {
    label: "Handoffs",
    title: "Fragile accountability",
    description:
      "When memory is scattered, QA and client trust collapse — every phase starts from scratch.",
    icon: IconShield,
  },
];

const flowSteps = [
  {
    title: "Intake",
    copy: "Guided canvas pulls clarity from messy inputs.",
    icon: IconSpark,
  },
  {
    title: "Project Brain",
    copy: "Decisions, assumptions, and risks stay visible.",
    icon: IconLayers,
  },
  {
    title: "Scope & Blueprint",
    copy: "Translate intent into phases, boundaries, and QA.",
    icon: IconWorkflow,
  },
  {
    title: "Task Board",
    copy: "Mode-based tasks keep proof-of-work attached.",
    icon: IconTarget,
  },
  {
    title: "Wrap-up",
    copy: "Snapshots ship handoffs and next steps in minutes.",
    icon: IconShield,
  },
];

const featureTiles = [
  {
    title: "Mission guidance",
    body: "Live chips and suggestion rails refine intake statements before scope work begins.",
    icon: IconSpark,
    tag: "Guided AI surface",
  },
  {
    title: "Project memory",
    body: "Decisions, assumptions, and risks stay synced with the build modes and handoffs.",
    icon: IconLayers,
    tag: "Continuity core",
  },
  {
    title: "Structured blueprinting",
    body: "Scope & Blueprint locks smallest useful version, MVP boundary, and automation map.",
    icon: IconWorkflow,
    tag: "Planning engine",
  },
  {
    title: "Proof-of-work tasks",
    body: "Every task carries a mode, owner, and artifact so QA and wraps stay honest.",
    icon: IconTarget,
    tag: "Execution layer",
  },
];

const personas = [
  {
    name: "Solo automation builder",
    focus: "Ships client revives, onboarding flows, retention automations.",
    chip: "Workflow studio",
    icon: IconSpark,
  },
  {
    name: "Boutique agency lead",
    focus: "Needs reliable scoping and handoffs across multiple accounts.",
    chip: "Client ops",
    icon: IconLayers,
  },
  {
    name: "Service operator",
    focus: "Turns repeatable service IP into structured delivery playbooks.",
    chip: "Productized services",
    icon: IconWorkflow,
  },
];

const differentiation = [
  {
    title: "Memory-led build",
    detail: "Propelo keeps every decision and guardrail visible inside the OS.",
    icon: IconShield,
  },
  {
    title: "Scope-first execution",
    detail: "Blueprint before build: smallest useful version, MVP boundary, QA gates.",
    icon: IconTarget,
  },
  {
    title: "Proof-driven tasks",
    detail: "Work moves forward only with attached artifacts and wrap-ready context.",
    icon: IconWorkflow,
  },
  {
    title: "Coexists with your stack",
    detail: "Designed to sit above GHL, n8n, Airtable, and internal wikis without disruption.",
    icon: IconLayers,
  },
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
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5">
          <div>
            <p className="eyebrow text-[11px] text-slate-300">
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

      <main className="mx-auto flex max-w-6xl flex-col gap-20 px-5 py-14">
        <section
          id="hero"
          className="ambient-hero tier-one grid gap-10 overflow-hidden px-8 py-12 md:px-10 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div className="relative space-y-8">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-200">
              <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] text-white">
                Guided OS
              </span>
              Workflow & Automation Blueprint
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Turn messy workflow ideas into structured, phased execution plans.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-slate-200 md:text-lg">
              Propelo Labs is the calm build surface for automation agencies and
              service operators. Capture chaos, lock decisions, and leave every
              session with a blueprint that teammates can trust.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/workspace/intake"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-sky-500/25 transition hover:-translate-y-0.5"
              >
                Explore seeded demo
              </Link>
              <Link
                href="#solution"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-slate-100 transition hover:border-white"
              >
                See how it flows
              </Link>
            </div>
            <div className="tier-two hover-lift grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                  AI guidance
                </p>
                <p className="mt-1 text-base text-white">
                  Mission chips + copy-ready snapshots
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                  Blueprint stack
                </p>
                <p className="mt-1 text-base text-white">
                  Intake → Brain → Scope → Tasks → Wrap
                </p>
              </div>
            </div>
          </div>
          <div className="relative tier-two overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="absolute bottom-6 left-6 flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Live seeded snapshot
            </div>
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
              <div className="hover-lift rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-slate-500">Dormant records</dt>
                <dd className="text-2xl font-semibold text-white">3,842</dd>
              </div>
              <div className="hover-lift rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-slate-500">Reactivation target</dt>
                <dd className="text-2xl font-semibold text-white">18%</dd>
              </div>
              <div className="hover-lift rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-slate-500">Automation phases locked</dt>
                <dd className="text-2xl font-semibold text-white">4</dd>
              </div>
              <div className="hover-lift rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-slate-500">QA gates</dt>
                <dd className="text-2xl font-semibold text-white">3</dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="problem">
          <SectionBlock
            eyebrow="Problem"
            title="Workflow projects die long before anyone opens a builder."
            className="space-y-6"
          >
            <div className="grid gap-5 lg:grid-cols-3">
              {painPoints.map((pain, index) => (
                <IconCard
                  key={pain.title}
                  icon={pain.icon}
                  title={pain.title}
                  description={pain.description}
                  metaLeft={pain.label}
                  metaRight={`0${index + 1}`}
                  className="tier-two relative overflow-hidden rounded-3xl p-6"
                />
              ))}
            </div>
          </SectionBlock>
        </section>

        <section id="solution">
          <SectionBlock
            eyebrow="Solution flow"
            title="A guided operating system from Intake to Wrap-up."
            className="space-y-6"
          >
            <div className="tier-two overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 p-6">
              <ol className="grid gap-4 md:grid-cols-5">
                {flowSteps.map((step, index) => {
                  const Icon = step.icon;
                  const last = index === flowSteps.length - 1;
                  return (
                    <li
                    key={step.title}
                    className={`relative rounded-2xl border border-white/10 bg-white/5 p-5 ${
                      !last
                        ? "md:after:absolute md:after:right-[-12px] md:after:top-1/2 md:after:h-px md:after:w-6 md:after:-translate-y-1/2 md:after:bg-white/30"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
                        Step 0{index + 1}
                      </span>
                      <Icon />
                    </div>
                    <p className="mt-3 text-base font-semibold text-white">
                      {step.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-200">
                      {step.copy}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </SectionBlock>
        </section>

        <section id="features">
          <SectionBlock
            eyebrow="Features & benefits"
            title="Every screen behaves like an operator-grade system surface."
            className="space-y-6"
          >
            <div className="grid gap-5 md:grid-cols-2">
              {featureTiles.map((feature) => (
                <IconCard
                  key={feature.title}
                  icon={feature.icon}
                  tag={feature.tag}
                  title={feature.title}
                  description={feature.body}
                  className="tier-three rounded-3xl p-6"
                  descriptionClassName="mt-4 text-sm leading-relaxed text-slate-200"
                />
              ))}
            </div>
          </SectionBlock>
        </section>

        <section id="who">
          <SectionBlock
            eyebrow="Who it’s for"
            title="Built for builders who turn vague intent into reliable execution."
            className="space-y-6"
          >
            <div className="grid gap-5 lg:grid-cols-3">
              {personas.map((persona) => (
                <IconCard
                  key={persona.name}
                  icon={persona.icon}
                  tag={persona.chip}
                  title={persona.name}
                  description={persona.focus}
                  className="tier-three rounded-3xl p-6"
                  descriptionClassName="mt-3 text-sm leading-relaxed text-slate-200"
                />
              ))}
            </div>
          </SectionBlock>
        </section>

        <section id="differentiation">
          <SectionBlock
            eyebrow="Differentiation"
            title="Propelo vs. the typical “AI tool” promise."
            className="space-y-6"
          >
            <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
              <div className="tier-three rounded-3xl p-6">
                <p className="text-sm font-semibold text-rose-300">Traditional tooling</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  <li>• Generic chat wrappers with no project memory.</li>
                  <li>• Unscoped promises that collapse during handoff.</li>
                  <li>• No proof-of-work artifacts or continuity layer.</li>
                </ul>
              </div>
              <div className="tier-one rounded-3xl p-6">
                <p className="text-sm font-semibold text-emerald-300">
                  Why Propelo Labs is different
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {differentiation.map((diff) => (
                    <IconCard
                      key={diff.title}
                      icon={diff.icon}
                      title={diff.title}
                      description={diff.detail}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                      titleClassName="text-base font-semibold text-white"
                      descriptionClassName="mt-2 text-sm leading-relaxed text-slate-200"
                    />
                  ))}
                </div>
              </div>
            </div>
          </SectionBlock>
        </section>

        <section id="use-case">
          <SectionBlock
            eyebrow="Example use case"
            className="space-y-6"
            eyebrowClassName="text-sm uppercase tracking-[0.3em] text-slate-400"
          >
            <div className="tier-one relative overflow-hidden rounded-3xl border border-sky-500/30 bg-slate-900/60 p-8">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-transparent" />
              <div className="relative z-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
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
              <div className="relative z-10 mt-8 grid gap-5 md:grid-cols-3">
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
          </SectionBlock>
        </section>

        <section id="vision">
          <SectionBlock
            eyebrow="Long-term vision"
            title="Phase 1: Workflow & automation blueprinting. Future: build OS."
            className="space-y-6"
            eyebrowClassName="text-sm uppercase tracking-[0.3em] text-slate-400"
          >
            <div className="grid gap-4 md:grid-cols-3">
              {visionPillars.map((pillar) => (
                <div
                  key={pillar}
                  className="tier-three hover-lift p-6 text-sm leading-relaxed text-slate-200"
                >
                  {pillar}
                </div>
              ))}
            </div>
          </SectionBlock>
        </section>

        <section
          id="cta"
          className="tier-one rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-400/10 via-sky-500/10 to-blue-500/10 p-10"
        >
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
                className="rounded-full bg-white/95 px-6 py-3 text-center text-base font-semibold text-slate-900 shadow-lg shadow-slate-900/20"
              >
                Open prototype workspace
              </Link>
              <a
                href="mailto:hello@propelolabs.com"
                className="rounded-full border border-white/50 px-6 py-3 text-center text-sm font-medium text-white hover:border-white"
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
