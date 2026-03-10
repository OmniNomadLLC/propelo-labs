export const projectSummary = {
  name: "Lead Reactivation — North River Dental",
  type: "Automation Blueprint",
  owner: "Growth Ops",
  status: "Blueprinting",
  cadence: "Weekly ops sync",
  lastUpdated: "Today, 09:15",
};

export const intakeData = {
  mission:
    "Re-engage dormant patients with compliant outreach that feels like a concierge experience, not a blast.",
  constraints: [
    "HIPAA-safe messaging only",
    "Existing CRM = HighLevel (keep data in place)",
    "Ops team can only handle 40 warm replies per day",
  ],
  successSignals: [
    "18% of dormant leads reactivated within 45 days",
    "Clinic calendar filled with 30 high-intent consultations",
    "Clear attribution dashboard for owner within GHL",
  ],
  assumptions: [
    "Data export contains SMS opt-in status",
    "Clinic already has a review automation we can piggyback",
    "Growth assistant can edit email/SMS copy daily",
  ],
  guidance: {
    prompts: [
      "Clarify tone for SMS vs email sequences",
      "Narrow Phase 1 to hygiene + first touch",
      "Surface dependencies before promising outcomes",
      "Ask for owner definition of a 'reactivated' lead",
    ],
    nextActions: [
      "Tag intake answers that belong in Scope",
      "Highlight any compliance blockers",
      "Pin the smallest useful version before ideating variants",
    ],
  },
};

export const brainData = {
  decisions: [
    "Use Propelo Labs as source-of-truth for scope + handoffs",
    "Keep patient communications inside GHL, orchestrate logic elsewhere",
    "Prioritize automated hygiene checks before outreach",
  ],
  assumptions: [
    "Dental CRM has API access for tagging",
    "Clinic will approve compliance templates within 24 hours",
  ],
  risks: [
    "Stale contact info could tank deliverability",
    "Clinic team might under-staff follow-up mode",
    "Owner may request upsell logic mid-flight",
  ],
  openQuestions: [
    "Do we have bilingual outreach needs?",
    "Who signs off on escalation copy?",
    "What metrics prove success to the owner?",
  ],
};

export const scopeBlueprint = {
  overview: {
    summary:
      "Lead Reactivation moves from chaos to a four-phase automation plan with QA gates and clear escalation ownership.",
    smallestUsefulVersion:
      "Single-segment outreach focused on patients inactive 6-12 months with SMS-first touch.",
    mvpBoundary:
      "Phase 02 completion with deliverability + compliance sign-off; no upsell journeys yet.",
    implementationPath: [
      "Architect hygiene + tagging inside GHL",
      "Prototype outreach ladders in Propelo Tasks",
      "Connect n8n for automation orchestration",
      "Review + handoff to clinic coordinators",
    ],
  },
  inScope: [
    "Data hygiene + tagging plan inside GHL",
    "Multi-channel reactivation flow (SMS + Email)",
    "Escalation to office team with detailed task list",
    "QA gates for copy, timing, and compliance",
  ],
  outOfScope: [
    "Net-new ad campaigns",
    "Third-party dialer build",
    "Full analytics overhaul",
  ],
  phases: [
    {
      id: "Phase 01",
      title: "Prepare",
      summary:
        "Scrub contact list, re-tag segments, and sync opt-in fields before any outreach.",
      deliverables: ["Data hygiene checklist", "Segment map", "Compliance sign-off"],
    },
    {
      id: "Phase 02",
      title: "Activate",
      summary:
        "Launch SMS + email cascades with adaptive timing and track replies inside Tasks board.",
      deliverables: ["SMS sequences", "Email v1", "Fallback automation"],
    },
    {
      id: "Phase 03",
      title: "Escalate",
      summary:
        "Route warm replies to office coordinators with proof-of-work tasks and scripts.",
      deliverables: ["Coordinator playbook", "Task automations", "Handoff script"],
    },
    {
      id: "Phase 04",
      title: "Review",
      summary:
        "Measure conversion lift, QA logs, and prep wrap-up packet for the clinic owner.",
      deliverables: ["Retention dashboard", "QA log", "Owner-ready summary"],
    },
  ],
  automationFlow: [
    {
      name: "Trigger",
      detail: "Nightly check for contacts tagged Dormant + Opt-in",
    },
    {
      name: "Branch",
      detail: "Split warm vs cold leads, personalize outreach",
    },
    {
      name: "Nurture",
      detail: "3-touch SMS + email with review-safe copy",
    },
    {
      name: "Escalate",
      detail: "Push positive replies into Tasks with owner context",
    },
    {
      name: "Measure",
      detail: "Sync engagement tags back to dashboard",
    },
  ],
};

export const taskBoard = {
  columns: [
    {
      title: "Design",
      tasks: [
        { title: "Define reactivation promise", owner: "Strategist", proof: "Narrative doc" },
        { title: "Map HIPAA-safe copy guardrails", owner: "Compliance", proof: "Checklist" },
      ],
    },
    {
      title: "Build",
      tasks: [
        { title: "Create segmentation automation", owner: "Automation", proof: "n8n scenario" },
        { title: "Draft SMS ladder", owner: "Copy", proof: "Figma board" },
      ],
    },
    {
      title: "QA",
      tasks: [
        { title: "Run deliverability test", owner: "Ops", proof: "Deliverability sheet" },
        { title: "Dry-run escalation flow", owner: "Project Lead", proof: "QA log" },
      ],
    },
    {
      title: "Ready",
      tasks: [
        { title: "Owner-ready wrap-up", owner: "Project Lead", proof: "Snapshot" },
      ],
    },
  ],
};

export const wrapUpData = {
  sessionSummary:
    "Blueprinted the full reactivation flow, aligned on success metrics, and locked the first sprint backlog.",
  proofPoints: [
    "Scope v1 approved by Growth Ops",
    "Automation map exported for builders",
    "QA gates defined for SMS + email",
  ],
  risks: [
    "Clinic capacity could bottleneck escalations",
    "Opt-in data may be stale for older contacts",
  ],
  nextSteps: [
    "Finalize copy review with compliance lead",
    "Connect Propelo Labs tasks to n8n prototypes",
    "Schedule owner walkthrough of Wrap-up packet",
  ],
  snapshot: {
    context: "Phase 1 focused on drafting and validating the reactivation blueprint for North River Dental.",
    decisions: [
      "Keep Phase 1 limited to hygiene + SMS/email ladder",
      "Escalations stay manual with Propelo tasks as proof-of-work",
    ],
    insights: [
      "Clinic capacity is the true limiter, so automation must meter replies",
      "Owner values attribution dashboards more than automation novelty",
    ],
    outOfScope: [
      "Paid traffic boosts",
      "Multilingual nurture paths",
    ],
    consequences: [
      "Blueprint must expose throughput caps to prevent over-promising",
      "Wrap-up packet will double as clinic training deck",
    ],
    nextStep: "Move into Build mode for Phase 02 once compliance clears the SMS ladder.",
  },
};
