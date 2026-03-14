"use client";

import { useEffect, useState } from "react";
import { MissionCard, MissionCreatePanel, type Mission, type MissionFields } from "./MissionCard";
import {
  DecisionCard,
  DecisionCreatePanel,
  type Decision,
  type DecisionFields,
} from "./DecisionCard";
import {
  RiskCard,
  RiskCreatePanel,
  type Risk,
  type RiskFields,
} from "./RiskCard";
import {
  MitigationCard,
  MitigationCreatePanel,
  type Mitigation,
  type MitigationFields,
} from "./MitigationCard";
import {
  BlueprintCard,
  BlueprintCreatePanel,
  type Blueprint,
  type BlueprintFields,
} from "./BlueprintCard";
import { API_BASE } from "@/lib/api";

export default function MissionWorkspacePage() {
  const [mission, setMission] = useState<Mission | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [decisionRisks, setDecisionRisks] = useState<Record<string, Risk[]>>({});
  const [riskMitigations, setRiskMitigations] = useState<Record<string, Mitigation[]>>({});
  const [mitigationBlueprints, setMitigationBlueprints] = useState<Record<string, Blueprint[]>>({});
  const [decisionsLoading, setDecisionsLoading] = useState(false);
  const [decisionsError, setDecisionsError] = useState<string | null>(null);
  const [decisionSavingId, setDecisionSavingId] = useState<string | null>(null);
  const [showDecisionCreate, setShowDecisionCreate] = useState(false);
  const [isDecisionEditing, setIsDecisionEditing] = useState(false);

  const [activeRiskCreate, setActiveRiskCreate] = useState<string | null>(null);
  const [riskSavingId, setRiskSavingId] = useState<string | null>(null);
  const [isRiskEditing, setIsRiskEditing] = useState(false);
  const [activeMitigationCreate, setActiveMitigationCreate] = useState<string | null>(null);
  const [mitigationSavingId, setMitigationSavingId] = useState<string | null>(null);
  const [isMitigationEditing, setIsMitigationEditing] = useState(false);
  const [activeBlueprintCreate, setActiveBlueprintCreate] = useState<string | null>(null);
  const [blueprintSavingId, setBlueprintSavingId] = useState<string | null>(null);
  const [isBlueprintEditing, setIsBlueprintEditing] = useState(false);
  const activeStage =
    isBlueprintEditing ? 4 : isMitigationEditing ? 3 : isRiskEditing ? 2 : isDecisionEditing ? 1 : 0;

  useEffect(() => {
    void loadMission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMission = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE}/missions`, { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Unable to load mission");
      }
      const missions: Mission[] = await response.json();
      setMission(missions[0] ?? null);
      if (missions[0]) {
        await loadDecisions(missions[0].id);
      } else {
        setDecisions([]);
        setDecisionRisks({});
        setRiskMitigations({});
        setMitigationBlueprints({});
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load mission");
      setMission(null);
      setDecisions([]);
      setDecisionRisks({});
      setRiskMitigations({});
      setMitigationBlueprints({});
    } finally {
      setIsLoading(false);
    }
  };

  const loadDecisions = async (missionId: string) => {
    try {
      setDecisionsLoading(true);
      setDecisionsError(null);
      const response = await fetch(`${API_BASE}/missions/${missionId}/decisions`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Unable to load decisions");
      }
      const data: Decision[] = await response.json();
      const risksMap: Record<string, Risk[]> = {};
      const mitigationsMap: Record<string, Mitigation[]> = {};
      await Promise.all(
        data.map(async (decision) => {
          const risks = await fetchRisks(decision.id);
          risksMap[decision.id] = risks;
          await Promise.all(
            risks.map(async (risk) => {
              mitigationsMap[risk.id] = await fetchMitigations(risk.id);
            }),
          );
        }),
      );
      setDecisions(data);
      setDecisionRisks(risksMap);
      setRiskMitigations(mitigationsMap);
    } catch (err) {
      setDecisionsError(err instanceof Error ? err.message : "Unable to load decisions");
      setDecisions([]);
      setDecisionRisks({});
      setRiskMitigations({});
    } finally {
      setDecisionsLoading(false);
    }
  };

  const fetchRisks = async (decisionId: string): Promise<Risk[]> => {
    const response = await fetch(`${API_BASE}/decisions/${decisionId}/risks`, { cache: "no-store" });
    if (!response.ok) {
      return [];
    }
    return (await response.json()) as Risk[];
  };

  const refreshDecisionRisks = async (decisionId: string) => {
    const risks = await fetchRisks(decisionId);
    setDecisionRisks((prev) => ({ ...prev, [decisionId]: risks }));
    const mitigationsMap: Record<string, Mitigation[]> = { ...riskMitigations };
    const blueprintsMap: Record<string, Blueprint[]> = { ...mitigationBlueprints };
    await Promise.all(
      risks.map(async (risk) => {
        mitigationsMap[risk.id] = await fetchMitigations(risk.id);
        await Promise.all(
          mitigationsMap[risk.id].map(async (mitigation) => {
            blueprintsMap[mitigation.id] = await fetchBlueprints(mitigation.id);
          }),
        );
      }),
    );
    setRiskMitigations(mitigationsMap);
    setMitigationBlueprints(blueprintsMap);
  };

  const fetchMitigations = async (riskId: string): Promise<Mitigation[]> => {
    const response = await fetch(`${API_BASE}/risks/${riskId}/mitigations`, { cache: "no-store" });
    if (!response.ok) {
      return [];
    }
    return (await response.json()) as Mitigation[];
  };

  const fetchBlueprints = async (mitigationId: string): Promise<Blueprint[]> => {
    const response = await fetch(`${API_BASE}/mitigations/${mitigationId}/blueprints`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return [];
    }
    return (await response.json()) as Blueprint[];
  };

  const refreshRiskMitigations = async (riskId: string) => {
    const mitigations = await fetchMitigations(riskId);
    const blueprintsMap: Record<string, Blueprint[]> = { ...mitigationBlueprints };
    await Promise.all(
      mitigations.map(async (mitigation) => {
        blueprintsMap[mitigation.id] = await fetchBlueprints(mitigation.id);
      }),
    );
    setMitigationBlueprints(blueprintsMap);
    setRiskMitigations((prev) => ({ ...prev, [riskId]: mitigations }));
  };

  const refreshMitigationBlueprints = async (mitigationId: string) => {
    const blueprints = await fetchBlueprints(mitigationId);
    setMitigationBlueprints((prev) => ({ ...prev, [mitigationId]: blueprints }));
  };

  const saveMission = async (fields: MissionFields) => {
    if (!mission) return;
    setIsSaving(true);
    try {
      const response = await fetch(`${API_BASE}/missions/${mission.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!response.ok) {
        throw new Error("Unable to update mission");
      }
      const updated: Mission = await response.json();
      setMission(updated);
    } finally {
      setIsSaving(false);
    }
  };

  const createMission = async (fields: MissionFields) => {
    setIsSaving(true);
    try {
      const response = await fetch(`${API_BASE}/missions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!response.ok) {
        throw new Error("Unable to create mission");
      }
      const created: Mission = await response.json();
      setMission(created);
      setShowCreateForm(false);
      await loadDecisions(created.id);
    } finally {
      setIsSaving(false);
    }
  };

  const createDecision = async (fields: DecisionFields) => {
    if (!mission) return;
    setDecisionSavingId("new");
    try {
      const response = await fetch(`${API_BASE}/decisions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, mission_id: mission.id }),
      });
      if (!response.ok) {
        throw new Error("Unable to create decision");
      }
      await loadDecisions(mission.id);
      setShowDecisionCreate(false);
      setIsDecisionEditing(false);
    } finally {
      setDecisionSavingId(null);
    }
  };

  const updateDecision = async (id: string, fields: DecisionFields) => {
    setDecisionSavingId(id);
    try {
      const response = await fetch(`${API_BASE}/decisions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!response.ok) {
        throw new Error("Unable to update decision");
      }
      if (mission) {
        await loadDecisions(mission.id);
      }
    } finally {
      setDecisionSavingId(null);
    }
  };

  const createRisk = async (decisionId: string, fields: RiskFields) => {
    setRiskSavingId(`new-${decisionId}`);
    try {
      const response = await fetch(`${API_BASE}/risks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, decision_id: decisionId }),
      });
      if (!response.ok) {
        throw new Error("Unable to create risk");
      }
      await refreshDecisionRisks(decisionId);
      setActiveRiskCreate(null);
      setIsRiskEditing(false);
    } finally {
      setRiskSavingId(null);
    }
  };

  const updateRisk = async (riskId: string, decisionId: string, fields: RiskFields) => {
    setRiskSavingId(riskId);
    try {
      const response = await fetch(`${API_BASE}/risks/${riskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!response.ok) {
        throw new Error("Unable to update risk");
      }
      await refreshDecisionRisks(decisionId);
    } finally {
      setRiskSavingId(null);
    }
  };

  const createMitigation = async (riskId: string, fields: MitigationFields) => {
    setMitigationSavingId(`new-${riskId}`);
    try {
      const response = await fetch(`${API_BASE}/mitigations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, risk_id: riskId }),
      });
      if (!response.ok) {
        throw new Error("Unable to create mitigation");
      }
      await refreshRiskMitigations(riskId);
      setActiveMitigationCreate(null);
      setIsMitigationEditing(false);
    } finally {
      setMitigationSavingId(null);
    }
  };

  const updateMitigation = async (
    mitigationId: string,
    riskId: string,
    fields: MitigationFields,
  ) => {
    setMitigationSavingId(mitigationId);
    try {
      const response = await fetch(`${API_BASE}/mitigations/${mitigationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!response.ok) {
        throw new Error("Unable to update mitigation");
      }
      await refreshRiskMitigations(riskId);
    } finally {
      setMitigationSavingId(null);
    }
  };

  const createBlueprint = async (mitigationId: string, fields: BlueprintFields) => {
    setBlueprintSavingId(`new-${mitigationId}`);
    try {
      const response = await fetch(`${API_BASE}/blueprints`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, mitigation_id: mitigationId }),
      });
      if (!response.ok) {
        throw new Error("Unable to create blueprint");
      }
      await refreshMitigationBlueprints(mitigationId);
      setActiveBlueprintCreate(null);
      setIsBlueprintEditing(false);
    } finally {
      setBlueprintSavingId(null);
    }
  };

  const updateBlueprint = async (
    blueprintId: string,
    mitigationId: string,
    fields: BlueprintFields,
  ) => {
    setBlueprintSavingId(blueprintId);
    try {
      const response = await fetch(`${API_BASE}/blueprints/${blueprintId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!response.ok) {
        throw new Error("Unable to update blueprint");
      }
      await refreshMitigationBlueprints(mitigationId);
    } finally {
      setBlueprintSavingId(null);
    }
  };

  const deleteBlueprint = async (blueprintId: string, mitigationId: string) => {
    const response = await fetch(`${API_BASE}/blueprints/${blueprintId}`, {
      method: "DELETE",
    });
    if (!response.ok && response.status !== 204) {
      throw new Error("Unable to delete blueprint");
    }
    await refreshMitigationBlueprints(mitigationId);
  };

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Screen · Mission Engine</p>
        <h1 className="text-3xl font-semibold text-white">Define the mission</h1>
        <p className="text-sm text-slate-400">
          Capture the problem, constraints, and success signals before any architecture work begins.
        </p>
      </header>

      <PipelineIndicator
        activeStage={activeStage}
      />

      {isLoading ? (
        <p className="text-sm text-slate-400">Loading mission…</p>
      ) : mission ? (
        <MissionCard mission={mission} onSave={saveMission} isSaving={isSaving} />
      ) : (
        <EmptyMissionState
          error={error}
          showCreateForm={showCreateForm}
          onCreateClick={() => setShowCreateForm(true)}
          onDismissForm={() => setShowCreateForm(false)}
          isSaving={isSaving}
          onCreate={createMission}
        />
      )}

      {mission && (
        <DecisionsSection
          decisions={decisions}
          decisionRisks={decisionRisks}
          mitigationBlueprints={mitigationBlueprints}
          isLoading={decisionsLoading}
          error={decisionsError}
          showCreate={showDecisionCreate}
          decisionSavingId={decisionSavingId}
          riskSavingId={riskSavingId}
          activeRiskCreate={activeRiskCreate}
          activeBlueprintCreate={activeBlueprintCreate}
          onCreateDecision={() => {
            setShowDecisionCreate(true);
            setIsDecisionEditing(true);
          }}
          onCancelDecisionCreate={() => {
            setShowDecisionCreate(false);
            setIsDecisionEditing(false);
          }}
          onCreateDecisionSubmit={createDecision}
          onDecisionSave={updateDecision}
          onDecisionEditingChange={(editing) => setIsDecisionEditing(editing)}
          onShowRiskCreate={(decisionId) => {
            setActiveRiskCreate(decisionId);
            setIsRiskEditing(true);
          }}
          onCancelRiskCreate={() => {
            setActiveRiskCreate(null);
            setIsRiskEditing(false);
          }}
          onCreateRiskSubmit={createRisk}
          onRiskSave={updateRisk}
          onRiskEditingChange={(editing) => setIsRiskEditing(editing)}
          riskMitigations={riskMitigations}
          activeMitigationCreate={activeMitigationCreate}
          mitigationSavingId={mitigationSavingId}
          onShowMitigationCreate={(riskId) => {
            setActiveMitigationCreate(riskId);
            setIsMitigationEditing(true);
          }}
          onCancelMitigationCreate={() => {
            setActiveMitigationCreate(null);
            setIsMitigationEditing(false);
          }}
          onCreateMitigation={createMitigation}
          onMitigationSave={updateMitigation}
          onMitigationEditingChange={(editing) => setIsMitigationEditing(editing)}
          blueprintSavingId={blueprintSavingId}
          onShowBlueprintCreate={(mitigationId) => {
            setActiveBlueprintCreate(mitigationId);
            setIsBlueprintEditing(true);
          }}
          onCancelBlueprintCreate={() => {
            setActiveBlueprintCreate(null);
            setIsBlueprintEditing(false);
          }}
          onCreateBlueprint={createBlueprint}
          onBlueprintSave={updateBlueprint}
          onBlueprintDelete={deleteBlueprint}
          onBlueprintEditingChange={(editing) => setIsBlueprintEditing(editing)}
        />
      )}
    </div>
  );
}

const stages = ["Mission", "Decisions", "Risks", "Mitigations", "Blueprints", "Tasks", "Snapshot"];

function PipelineIndicator({ activeStage = 0 }: { activeStage?: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-xs text-slate-400">
      <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500">Architecture pipeline</p>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        {stages.map((stage, index) => (
          <div key={stage} className="flex items-center gap-2">
            <StageChip label={stage} active={index === activeStage} />
            {index < stages.length - 1 && (
              <span className="text-[10px] tracking-[0.4em] text-slate-500">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StageChip({ label, active }: { label: string; active?: boolean }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] ${
        active ? "bg-white text-slate-950" : "border border-white/20 text-slate-400"
      }`}
    >
      {label}
    </span>
  );
}

type DecisionsSectionProps = {
  decisions: Decision[];
  decisionRisks: Record<string, Risk[]>;
  mitigationBlueprints: Record<string, Blueprint[]>;
  riskMitigations: Record<string, Mitigation[]>;
  isLoading: boolean;
  error: string | null;
  showCreate: boolean;
  decisionSavingId: string | null;
  riskSavingId: string | null;
  activeRiskCreate: string | null;
  activeBlueprintCreate: string | null;
  onCreateDecision: () => void;
  onCancelDecisionCreate: () => void;
  onCreateDecisionSubmit: (fields: DecisionFields) => Promise<void>;
  onDecisionSave: (id: string, fields: DecisionFields) => Promise<void>;
  onDecisionEditingChange: (editing: boolean) => void;
  onShowRiskCreate: (decisionId: string) => void;
  onCancelRiskCreate: () => void;
  onCreateRiskSubmit: (decisionId: string, fields: RiskFields) => Promise<void>;
  onRiskSave: (riskId: string, decisionId: string, fields: RiskFields) => Promise<void>;
  onRiskEditingChange: (editing: boolean) => void;
  activeMitigationCreate: string | null;
  mitigationSavingId: string | null;
  onShowMitigationCreate: (riskId: string) => void;
  onCancelMitigationCreate: () => void;
  onCreateMitigationSubmit: (riskId: string, fields: MitigationFields) => Promise<void>;
  onMitigationSave: (mitigationId: string, riskId: string, fields: MitigationFields) => Promise<void>;
  onMitigationEditingChange: (editing: boolean) => void;
  blueprintSavingId: string | null;
  onShowBlueprintCreate: (mitigationId: string) => void;
  onCancelBlueprintCreate: () => void;
  onCreateBlueprint: (mitigationId: string, fields: BlueprintFields) => Promise<void>;
  onBlueprintSave: (
    blueprintId: string,
    mitigationId: string,
    fields: BlueprintFields,
  ) => Promise<void>;
  onBlueprintDelete: (blueprintId: string, mitigationId: string) => Promise<void>;
  onBlueprintEditingChange: (editing: boolean) => void;
};

function DecisionsSection({
  decisions,
  decisionRisks,
  mitigationBlueprints,
  riskMitigations,
  isLoading,
  error,
  showCreate,
  decisionSavingId,
  riskSavingId,
  activeRiskCreate,
  activeBlueprintCreate,
  onCreateDecision,
  onCancelDecisionCreate,
  onCreateDecisionSubmit,
  onDecisionSave,
  onDecisionEditingChange,
  onShowRiskCreate,
  onCancelRiskCreate,
  onCreateRiskSubmit,
  onRiskSave,
  onRiskEditingChange,
  activeMitigationCreate,
  mitigationSavingId,
  onShowMitigationCreate,
  onCancelMitigationCreate,
  onCreateMitigationSubmit,
  onMitigationSave,
  onMitigationEditingChange,
  blueprintSavingId,
  onShowBlueprintCreate,
  onCancelBlueprintCreate,
  onCreateBlueprint,
  onBlueprintSave,
  onBlueprintDelete,
  onBlueprintEditingChange,
}: DecisionsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Architecture decisions</p>
          <p className="text-sm text-slate-400">
            Decisions connect the mission to the rest of the architecture pipeline.
          </p>
        </div>
        {!showCreate && (
          <button
            onClick={onCreateDecision}
            className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white hover:border-white"
          >
            Add decision
          </button>
        )}
      </div>

      {showCreate && (
        <DecisionCreatePanel
          onCreate={async (fields) => {
            await onCreateDecisionSubmit(fields);
            onDecisionEditingChange(false);
          }}
          isSaving={decisionSavingId === "new"}
          onCancel={() => {
            onCancelDecisionCreate();
            onDecisionEditingChange(false);
          }}
        />
      )}

      {isLoading ? (
        <p className="text-sm text-slate-400">Loading decisions…</p>
      ) : decisions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-slate-950/40 p-6 text-center text-sm text-slate-400">
          <p>No architectural decisions recorded yet.</p>
          {!showCreate && (
            <button
              onClick={onCreateDecision}
              className="mt-4 rounded-full bg-white px-5 py-2 text-xs font-semibold text-slate-900 shadow-lg shadow-slate-900/20"
            >
              Add decision
            </button>
          )}
          {error && <p className="mt-3 text-xs text-rose-300">{error}</p>}
        </div>
      ) : (
        <div className="grid gap-4">
          {decisions.map((decision) => (
            <div key={decision.id} className="space-y-3 rounded-3xl border border-white/10 bg-slate-950/40 p-4">
              <DecisionCard
                decision={decision}
                onSave={(fields) => onDecisionSave(decision.id, fields)}
                isSaving={decisionSavingId === decision.id}
                onEditingChange={(editing) => onDecisionEditingChange(editing)}
              />
              <RiskSection
                decisionId={decision.id}
                risks={decisionRisks[decision.id] ?? []}
                showCreate={activeRiskCreate === decision.id}
                riskSavingId={riskSavingId}
                onShowCreate={() => onShowRiskCreate(decision.id)}
                onCancelCreate={onCancelRiskCreate}
                onCreateRisk={(fields) => onCreateRiskSubmit(decision.id, fields)}
                onRiskSave={onRiskSave}
                onRiskEditingChange={onRiskEditingChange}
                riskMitigations={riskMitigations}
                activeMitigationCreate={activeMitigationCreate}
                mitigationSavingId={mitigationSavingId}
                onShowMitigationCreate={onShowMitigationCreate}
                onCancelMitigationCreate={onCancelMitigationCreate}
                onCreateMitigation={onCreateMitigationSubmit}
                onMitigationSave={onMitigationSave}
                onMitigationEditingChange={onMitigationEditingChange}
                mitigationBlueprints={mitigationBlueprints}
                activeBlueprintCreate={activeBlueprintCreate}
                blueprintSavingId={blueprintSavingId}
                onShowBlueprintCreate={onShowBlueprintCreate}
                onCancelBlueprintCreate={onCancelBlueprintCreate}
                onCreateBlueprint={onCreateBlueprint}
                onBlueprintSave={onBlueprintSave}
                onBlueprintDelete={onBlueprintDelete}
                onBlueprintEditingChange={onBlueprintEditingChange}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

type RiskSectionProps = {
  decisionId: string;
  risks: Risk[];
  showCreate: boolean;
  riskSavingId: string | null;
  onShowCreate: () => void;
  onCancelCreate: () => void;
  onCreateRisk: (fields: RiskFields) => Promise<void>;
  onRiskSave: (riskId: string, decisionId: string, fields: RiskFields) => Promise<void>;
  onRiskEditingChange: (editing: boolean) => void;
  riskMitigations: Record<string, Mitigation[]>;
  activeMitigationCreate: string | null;
  mitigationSavingId: string | null;
  onShowMitigationCreate: (riskId: string) => void;
  onCancelMitigationCreate: () => void;
  onCreateMitigation: (riskId: string, fields: MitigationFields) => Promise<void>;
  onMitigationSave: (mitigationId: string, riskId: string, fields: MitigationFields) => Promise<void>;
  onMitigationEditingChange: (editing: boolean) => void;
  mitigationBlueprints: Record<string, Blueprint[]>;
  activeBlueprintCreate: string | null;
  blueprintSavingId: string | null;
  onShowBlueprintCreate: (mitigationId: string) => void;
  onCancelBlueprintCreate: () => void;
  onCreateBlueprint: (mitigationId: string, fields: BlueprintFields) => Promise<void>;
  onBlueprintSave: (
    blueprintId: string,
    mitigationId: string,
    fields: BlueprintFields,
  ) => Promise<void>;
  onBlueprintDelete: (blueprintId: string, mitigationId: string) => Promise<void>;
  onBlueprintEditingChange: (editing: boolean) => void;
};

function RiskSection({
  decisionId,
  risks,
  showCreate,
  riskSavingId,
  onShowCreate,
  onCancelCreate,
  onCreateRisk,
  onRiskSave,
  onRiskEditingChange,
  riskMitigations,
  activeMitigationCreate,
  mitigationSavingId,
  onShowMitigationCreate,
  onCancelMitigationCreate,
  onCreateMitigation,
  onMitigationSave,
  onMitigationEditingChange,
  mitigationBlueprints,
  activeBlueprintCreate,
  blueprintSavingId,
  onShowBlueprintCreate,
  onCancelBlueprintCreate,
  onCreateBlueprint,
  onBlueprintSave,
  onBlueprintDelete,
  onBlueprintEditingChange,
}: RiskSectionProps) {
  return (
    <div className="space-y-3 border-t border-white/10 pt-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Risks</p>
        {!showCreate && (
          <button
            onClick={onShowCreate}
            className="rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold text-white"
          >
            Add risk
          </button>
        )}
      </div>
      {showCreate && (
        <RiskCreatePanel
          onCreate={async (fields) => {
            await onCreateRisk(fields);
            onRiskEditingChange(false);
          }}
          isSaving={riskSavingId === `new-${decisionId}`}
          onCancel={() => {
            onCancelCreate();
            onRiskEditingChange(false);
          }}
        />
      )}
      {risks.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-xs text-slate-400">
          No risks recorded for this decision.
        </div>
      ) : (
        <div className="grid gap-3">
          {risks.map((risk) => (
            <div key={risk.id} className="space-y-3 rounded-2xl border border-white/15 bg-black/20 p-3">
              <RiskCard
                risk={risk}
                onSave={(fields) => onRiskSave(risk.id, decisionId, fields)}
                isSaving={riskSavingId === risk.id}
                onEditingChange={onRiskEditingChange}
              />
              <MitigationSection
                riskId={risk.id}
                mitigations={riskMitigations[risk.id] ?? []}
                showCreate={activeMitigationCreate === risk.id}
                mitigationSavingId={mitigationSavingId}
                onShowCreate={() => onShowMitigationCreate(risk.id)}
                onCancelCreate={onCancelMitigationCreate}
                onCreateMitigation={(fields) => onCreateMitigation(risk.id, fields)}
                onMitigationSave={(mitigationId, fields) => onMitigationSave(mitigationId, risk.id, fields)}
                onMitigationEditingChange={onMitigationEditingChange}
                mitigationBlueprints={mitigationBlueprints}
                activeBlueprintCreate={activeBlueprintCreate}
                blueprintSavingId={blueprintSavingId}
                onShowBlueprintCreate={onShowBlueprintCreate}
                onCancelBlueprintCreate={onCancelBlueprintCreate}
                onCreateBlueprint={onCreateBlueprint}
                onBlueprintSave={onBlueprintSave}
                onBlueprintDelete={onBlueprintDelete}
                onBlueprintEditingChange={onBlueprintEditingChange}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

type MitigationSectionProps = {
  riskId: string;
  mitigations: Mitigation[];
  showCreate: boolean;
  mitigationSavingId: string | null;
  onShowCreate: () => void;
  onCancelCreate: () => void;
  onCreateMitigation: (fields: MitigationFields) => Promise<void>;
  onMitigationSave: (mitigationId: string, fields: MitigationFields) => Promise<void>;
  onMitigationEditingChange: (editing: boolean) => void;
  mitigationBlueprints: Record<string, Blueprint[]>;
  activeBlueprintCreate: string | null;
  blueprintSavingId: string | null;
  onShowBlueprintCreate: (mitigationId: string) => void;
  onCancelBlueprintCreate: () => void;
  onCreateBlueprint: (mitigationId: string, fields: BlueprintFields) => Promise<void>;
  onBlueprintSave: (
    blueprintId: string,
    mitigationId: string,
    fields: BlueprintFields,
  ) => Promise<void>;
  onBlueprintDelete: (blueprintId: string, mitigationId: string) => Promise<void>;
  onBlueprintEditingChange: (editing: boolean) => void;
};

function MitigationSection({
  riskId,
  mitigations,
  showCreate,
  mitigationSavingId,
  onShowCreate,
  onCancelCreate,
  onCreateMitigation,
  onMitigationSave,
  onMitigationEditingChange,
  mitigationBlueprints,
  activeBlueprintCreate,
  blueprintSavingId,
  onShowBlueprintCreate,
  onCancelBlueprintCreate,
  onCreateBlueprint,
  onBlueprintSave,
  onBlueprintDelete,
  onBlueprintEditingChange,
}: MitigationSectionProps) {
  return (
    <div className="space-y-3 border-t border-white/10 pt-3">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Mitigations</p>
        {!showCreate && (
          <button
            onClick={onShowCreate}
            className="rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold text-white"
          >
            Add mitigation
          </button>
        )}
      </div>
      {showCreate && (
        <MitigationCreatePanel
          onCreate={async (fields) => {
            await onCreateMitigation(fields);
            onMitigationEditingChange(false);
          }}
          isSaving={mitigationSavingId === `new-${riskId}`}
          onCancel={() => {
            onCancelCreate();
            onMitigationEditingChange(false);
          }}
        />
      )}
      {mitigations.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-black/20 p-3 text-xs text-slate-400">
          No mitigation strategies defined yet.
        </div>
      ) : (
        <div className="grid gap-2">
          {mitigations.map((mitigation) => (
            <div key={mitigation.id} className="space-y-3 rounded-2xl border border-white/15 bg-black/20 p-3">
              <MitigationCard
                mitigation={mitigation}
                onSave={(fields) => onMitigationSave(mitigation.id, fields)}
                isSaving={mitigationSavingId === mitigation.id}
                onEditingChange={onMitigationEditingChange}
              />
              <BlueprintSection
                mitigationId={mitigation.id}
                blueprints={mitigationBlueprints[mitigation.id] ?? []}
                showCreate={activeBlueprintCreate === mitigation.id}
                blueprintSavingId={blueprintSavingId}
                onShowCreate={() => onShowBlueprintCreate(mitigation.id)}
                onCancelCreate={onCancelBlueprintCreate}
                onCreateBlueprint={(fields) => onCreateBlueprint(mitigation.id, fields)}
                onBlueprintSave={(blueprintId, fields) =>
                  onBlueprintSave(blueprintId, mitigation.id, fields)
                }
                onBlueprintDelete={(blueprintId) => onBlueprintDelete(blueprintId, mitigation.id)}
                onBlueprintEditingChange={onBlueprintEditingChange}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

type BlueprintSectionProps = {
  mitigationId: string;
  blueprints: Blueprint[];
  showCreate: boolean;
  blueprintSavingId: string | null;
  onShowCreate: () => void;
  onCancelCreate: () => void;
  onCreateBlueprint: (fields: BlueprintFields) => Promise<void>;
  onBlueprintSave: (blueprintId: string, fields: BlueprintFields) => Promise<void>;
  onBlueprintDelete: (blueprintId: string) => Promise<void>;
  onBlueprintEditingChange: (editing: boolean) => void;
};

function BlueprintSection({
  mitigationId,
  blueprints,
  showCreate,
  blueprintSavingId,
  onShowCreate,
  onCancelCreate,
  onCreateBlueprint,
  onBlueprintSave,
  onBlueprintDelete,
  onBlueprintEditingChange,
}: BlueprintSectionProps) {
  return (
    <div className="space-y-3 border-t border-white/10 pt-3">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Blueprints</p>
        {!showCreate && (
          <button
            onClick={onShowCreate}
            className="rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold text-white"
          >
            Add blueprint
          </button>
        )}
      </div>
      {showCreate && (
        <BlueprintCreatePanel
          onCreate={async (fields) => {
            await onCreateBlueprint(fields);
            onBlueprintEditingChange(false);
          }}
          isSaving={blueprintSavingId === `new-${mitigationId}`}
          onCancel={() => {
            onCancelCreate();
            onBlueprintEditingChange(false);
          }}
        />
      )}
      {blueprints.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-3 text-xs text-slate-400">
          No blueprints yet.
        </div>
      ) : (
        <div className="space-y-2">
          {blueprints.map((blueprint) => (
            <BlueprintCard
              key={blueprint.id}
              blueprint={blueprint}
              onSave={(fields) => onBlueprintSave(blueprint.id, fields)}
              onDelete={() => onBlueprintDelete(blueprint.id)}
              isSaving={blueprintSavingId === blueprint.id}
              onEditingChange={onBlueprintEditingChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

type EmptyStateProps = {
  error: string | null;
  showCreateForm: boolean;
  isSaving: boolean;
  onCreateClick: () => void;
  onDismissForm: () => void;
  onCreate: (fields: MissionFields) => Promise<void>;
};

function EmptyMissionState({
  error,
  showCreateForm,
  isSaving,
  onCreateClick,
  onDismissForm,
  onCreate,
}: EmptyStateProps) {
  if (showCreateForm) {
    return (
      <div className="space-y-4">
        <MissionCreatePanel onCreate={onCreate} isSaving={isSaving} />
        <button
          onClick={onDismissForm}
          className="rounded-full border border-white/30 px-6 py-2 text-sm font-semibold text-white hover:border-white"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-dashed border-white/20 bg-slate-950/40 p-8 text-center text-sm text-slate-400">
      <p className="text-base font-semibold text-white">Define the mission of the system you are designing.</p>
      <p className="mt-2 text-slate-400">
        Missions capture the problem, constraints, and success criteria so future decisions stay grounded.
      </p>
      <button
        onClick={onCreateClick}
        className="mt-6 rounded-full bg-white px-6 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-900/20"
      >
        Create mission
      </button>
      {error && <p className="mt-4 text-xs text-rose-300">{error}</p>}
    </div>
  );
}
