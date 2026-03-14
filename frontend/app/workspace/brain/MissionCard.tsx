"use client";

import { useMemo, useState } from "react";

export type Mission = {
  id: string;
  title: string;
  problem: string;
  constraints: string;
  success_criteria: string;
  created_at: string;
  updated_at: string;
};

export type MissionFields = {
  title: string;
  problem: string;
  constraints: string;
  success_criteria: string;
};

type MissionCardProps = {
  mission: Mission;
  onSave: (fields: MissionFields) => Promise<void>;
  isSaving: boolean;
};

export function MissionCard({ mission, onSave, isSaving }: MissionCardProps) {
  const [draftFields, setDraftFields] = useState<MissionFields | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const isEditing = draftFields !== null;
  const fields = draftFields ?? pickFields(mission);

  const timestamps = useMemo(() => {
    const created = new Date(mission.created_at);
    const updated = new Date(mission.updated_at);
    return {
      created: created.toLocaleString(),
      updated: updated.toLocaleString(),
    };
  }, [mission.created_at, mission.updated_at]);

  const handleSave = async () => {
    if (!draftFields) return;
    try {
      await onSave(draftFields);
      setDraftFields(null);
      setLocalError(null);
    } catch (error) {
      setLocalError(error instanceof Error ? error.message : "Unable to save mission");
    }
  };

  const beginEditing = () => {
    setDraftFields(pickFields(mission));
    setLocalError(null);
  };

  return (
    <div className="tier-one rounded-3xl border border-white/10 bg-slate-950/70 p-6 text-sm text-slate-200 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Mission</p>
          {isEditing ? (
            <input
              className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-3 py-2 text-base font-semibold text-white focus:border-sky-400/60 focus:outline-none"
              value={fields.title}
              onChange={(event) => setFields((prev) => ({ ...prev, title: event.target.value }))}
              placeholder="Mission title"
            />
          ) : (
            <h2 className="mt-2 text-2xl font-semibold text-white">{mission.title}</h2>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="rounded-full border border-white/15 px-3 py-1">
            Last updated: {timestamps.updated}
          </div>
          <button
            onClick={() => (isEditing ? setDraftFields(null) : beginEditing())}
            className="rounded-full border border-white/30 px-3 py-1 text-xs font-semibold text-white transition hover:border-white"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <FieldBlock
          label="Problem"
          description="Why this system must exist"
          value={fields.problem}
          editing={isEditing}
          onChange={(value) =>
            setDraftFields((prev) => (prev ? { ...prev, problem: value } : prev))
          }
        />
        <FieldBlock
          label="Constraints"
          description="Boundaries, mandates, or limitations"
          value={fields.constraints}
          editing={isEditing}
          onChange={(value) =>
            setDraftFields((prev) => (prev ? { ...prev, constraints: value } : prev))
          }
        />
        <FieldBlock
          label="Success criteria"
          description="Signals that prove the mission worked"
          value={fields.success_criteria}
          editing={isEditing}
          onChange={(value) =>
            setDraftFields((prev) => (prev ? { ...prev, success_criteria: value } : prev))
          }
        />
      </div>

      {isEditing && (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving…" : "Save mission"}
          </button>
          <button
            onClick={() => {
              setDraftFields(null);
              setLocalError(null);
            }}
            className="rounded-full border border-white/20 px-6 py-2 text-sm font-semibold text-white hover:border-white"
          >
            Cancel edits
          </button>
          {localError && <p className="text-xs text-rose-300">{localError}</p>}
        </div>
      )}
    </div>
  );
}

type FieldBlockProps = {
  label: string;
  description: string;
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
};

function FieldBlock({ label, description, value, editing, onChange }: FieldBlockProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{label}</p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-slate-500">{description}</p>
      {editing ? (
        <textarea
          className="mt-3 h-32 w-full rounded-2xl border border-white/15 bg-slate-950/60 p-3 text-sm text-slate-100 focus:border-sky-400/60 focus:outline-none"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <p className="mt-3 text-sm text-slate-100">{value || '—'}</p>
      )}
    </div>
  );
}

export type MissionCreateProps = {
  onCreate: (fields: MissionFields) => Promise<void>;
  isSaving: boolean;
};

export function MissionCreatePanel({ onCreate, isSaving }: MissionCreateProps) {
  const [fields, setFields] = useState<MissionFields>({
    title: "",
    problem: "",
    constraints: "",
    success_criteria: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    try {
      if (!fields.title.trim()) {
        setError("Mission title is required");
        return;
      }
      await onCreate(fields);
      setFields({ title: "", problem: "", constraints: "", success_criteria: "" });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create mission");
    }
  };

  return (
    <div className="tier-two rounded-3xl border border-white/10 bg-slate-950/60 p-6 text-sm text-slate-200">
      <p className="text-xs uppercase tracking-[0.4em] text-slate-500">New mission</p>
      <div className="mt-4 grid gap-4">
        <input
          className="rounded-2xl border border-white/15 bg-black/30 px-3 py-2 text-base text-white focus:border-sky-400/60 focus:outline-none"
          placeholder="Mission title"
          value={fields.title}
          onChange={(event) => setFields((prev) => ({ ...prev, title: event.target.value }))}
        />
        <textarea
          className="rounded-2xl border border-white/15 bg-black/30 p-3 text-sm text-white focus:border-sky-400/60 focus:outline-none"
          placeholder="Describe the problem"
          value={fields.problem}
          onChange={(event) => setFields((prev) => ({ ...prev, problem: event.target.value }))}
        />
        <textarea
          className="rounded-2xl border border-white/15 bg-black/30 p-3 text-sm text-white focus:border-sky-400/60 focus:outline-none"
          placeholder="List key constraints"
          value={fields.constraints}
          onChange={(event) => setFields((prev) => ({ ...prev, constraints: event.target.value }))}
        />
        <textarea
          className="rounded-2xl border border-white/15 bg-black/30 p-3 text-sm text-white focus:border-sky-400/60 focus:outline-none"
          placeholder="Define success criteria"
          value={fields.success_criteria}
          onChange={(event) => setFields((prev) => ({ ...prev, success_criteria: event.target.value }))}
        />
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={handleCreate}
          disabled={isSaving}
          className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-900/20 disabled:opacity-60"
        >
          {isSaving ? "Creating…" : "Create mission"}
        </button>
        {error && <p className="text-xs text-rose-300">{error}</p>}
      </div>
    </div>
  );
}

function pickFields(mission: Mission): MissionFields {
  return {
    title: mission.title,
    problem: mission.problem,
    constraints: mission.constraints,
    success_criteria: mission.success_criteria,
  };
}
