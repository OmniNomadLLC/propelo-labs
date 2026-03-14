"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  projectSummary as projectSummarySeed,
  intakeData,
  brainData,
  scopeBlueprint as scopeBlueprintSeed,
  taskBoard,
  wrapUpData,
} from "./demo-data";

export type ConfidenceLevel = "low" | "medium" | "high";

export type BrainDecision = {
  id: string;
  text: string;
  confidence: ConfidenceLevel;
};

export type BrainRisk = {
  id: string;
  description: string;
  impact: ConfidenceLevel;
  likelihood: ConfidenceLevel;
};

export type ColumnKey = "design" | "build" | "qa" | "ready";

export type TaskCard = {
  id: string;
  title: string;
  owner: string;
  proof: string;
  column: ColumnKey;
};

type TaskColumn = {
  id: ColumnKey;
  title: string;
  tasks: TaskCard[];
};

type TasksState = {
  columns: TaskColumn[];
};

type WrapSnapshotState = typeof wrapUpData;

export type ProjectContextValue = {
  projectSummary: typeof projectSummarySeed;
  intakeAnswers: typeof intakeData;
  brainWorkflows: Omit<typeof brainData, "decisions" | "risks"> & {
    decisions: BrainDecision[];
    risks: BrainRisk[];
  };
  scopeBlueprint: typeof scopeBlueprintSeed;
  tasks: TasksState;
  wrapSnapshot: WrapSnapshotState;
  addDecision: (input: { text: string; confidence: ConfidenceLevel }) => void;
  addRisk: (input: {
    description: string;
    impact: ConfidenceLevel;
    likelihood: ConfidenceLevel;
  }) => void;
  addTask: (input: {
    title: string;
    owner: string;
    proof: string;
    column: ColumnKey;
  }) => void;
  generateSnapshot: () => void;
};

const ProjectContext = createContext<ProjectContextValue | undefined>(undefined);

const columnConfig: { id: ColumnKey; title: string }[] = [
  { id: "design", title: "Design" },
  { id: "build", title: "Build" },
  { id: "qa", title: "QA" },
  { id: "ready", title: "Ready" },
];

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projectSummary] = useState(projectSummarySeed);
  const [intakeAnswers] = useState(intakeData);
  const [brainWorkflows, setBrainWorkflows] = useState<ProjectContextValue["brainWorkflows"]>(() => ({
    ...brainData,
    decisions: brainData.decisions.map((text, index) => ({
      id: `decision-${index}`,
      text,
      confidence: "medium",
    })),
    risks: brainData.risks.map((description, index) => ({
      id: `risk-${index}`,
      description,
      impact: "medium",
      likelihood: "medium",
    })),
  }));
  const [scopeBlueprint] = useState(scopeBlueprintSeed);
  const [tasks, setTasks] = useState<TasksState>(() => ({
    columns: columnConfig.map((config, columnIndex) => {
      const matchingSeed = taskBoard.columns.find(
        (seedColumn) => seedColumn.title.toLowerCase() === config.title.toLowerCase(),
      );
      return {
        id: config.id,
        title: config.title,
        tasks:
          matchingSeed?.tasks.map((task, taskIndex) => ({
            id: `task-${columnIndex}-${taskIndex}`,
            title: task.title,
            owner: task.owner,
            proof: task.proof,
            column: config.id,
          })) ?? [],
      };
    }),
  }));
  const [wrapSnapshot, setWrapSnapshot] = useState<WrapSnapshotState>(wrapUpData);

  const addDecision: ProjectContextValue["addDecision"] = ({ text, confidence }) => {
    if (!text.trim()) return;
    setBrainWorkflows((prev) => ({
      ...prev,
      decisions: [
        ...prev.decisions,
        { id: `decision-${crypto.randomUUID()}`, text: text.trim(), confidence },
      ],
    }));
  };

  const addRisk: ProjectContextValue["addRisk"] = ({ description, impact, likelihood }) => {
    if (!description.trim()) return;
    setBrainWorkflows((prev) => ({
      ...prev,
      risks: [
        ...prev.risks,
        {
          id: `risk-${crypto.randomUUID()}`,
          description: description.trim(),
          impact,
          likelihood,
        },
      ],
    }));
  };

  const addTask: ProjectContextValue["addTask"] = ({ title, owner, proof, column }) => {
    if (!title.trim() || !owner.trim() || !proof.trim()) return;

    setTasks((prev) => ({
      columns: prev.columns.map((col) => {
        if (col.id !== column) {
          return col;
        }
        return {
          ...col,
          tasks: [
            ...col.tasks,
            {
              id: `task-${crypto.randomUUID()}`,
              title: title.trim(),
              owner: owner.trim(),
              proof: proof.trim(),
              column,
            },
          ],
        };
      }),
    }));
  };

  const generateSnapshot = () => {
    const decisionCount = brainWorkflows.decisions.length;
    const riskCount = brainWorkflows.risks.length;
    const allTasks = tasks.columns.flatMap((column) => column.tasks);

    const summary = `Documented ${decisionCount} decisions, ${riskCount} risks, and tracking ${allTasks.length} tasks.`;
    const proofPoints = allTasks.slice(0, 3).map((task) => `${task.title} — ${task.proof}`);
    const risks = brainWorkflows.risks.map(
      (risk) => `${risk.description} (Impact: ${risk.impact}, Likelihood: ${risk.likelihood})`,
    );
    const nextSteps = [
      "Move vetted decisions into Scope",
      "Assign owners to remaining Build tasks",
      "Prep wrap packet for stakeholder review",
    ];

    setWrapSnapshot({
      sessionSummary: summary,
      proofPoints: proofPoints.length ? proofPoints : ["No proof-of-work logged yet."],
      risks: risks.length ? risks : ["No risks documented."],
      nextSteps,
      snapshot: {
        context: summary,
        decisions: brainWorkflows.decisions.map((decision) => decision.text),
        insights: proofPoints.length ? proofPoints : ["Tasks pending."],
        outOfScope: ["Backend build", "New integrations"],
        consequences: risks.slice(0, 2),
        nextStep: nextSteps[0],
      },
    });
  };

  const value: ProjectContextValue = {
    projectSummary,
    intakeAnswers,
    brainWorkflows,
    scopeBlueprint,
    tasks,
    wrapSnapshot,
    addDecision,
    addRisk,
    addTask,
    generateSnapshot,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
