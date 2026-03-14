"use client";

import { useState } from "react";

export type BlueprintPhase = {
  id: string;
  title: string;
  description: string;
};

export type Blueprint = {
  id: string;
  mitigation_id: string;
  title: string;
  phases: BlueprintPhase[];
  created_at: string;
  updated_at: string;
};

export type BlueprintFields = {
  title: string;
  phases: BlueprintPhase[];
};

type BlueprintCardProps = {
  blueprint: Blueprint;
  onSave: (fields: BlueprintFields) => Promise<void>;
  onDelete: () => Promise<void>;
  isSaving: boolean;
  onEditingChange: (editing: boolean) => void;
};

export function BlueprintCard({ blueprint, onSave, onDelete, isSaving, onEditingChange }: BlueprintCardProps) {
  const [draft, setDraft] = useState<BlueprintFields | null>(null);
  const [error, setError] = useState<string | null>(null);
  const editing = draft !== null;
  const fields = draft ?? pickBlueprintFields(blueprint);

  const startEditing = () => {
    setDraft(pickBlueprintFields(blueprint));
    setError(null);
    onEditingChange(true);
  };

  const cancelEditing = () => {
    setDraft(null);
    setError(null);
    onEditingChange(false);
  };

  const handleSave = async () => {
    if (!draft) return;
    try {
      await onSave(draft);
      setDraft(null);
      setError(null);
      onEditingChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update blueprint");
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete blueprint");
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-200">
      <div className="flex flex-wrap items-start justify-between gap-3">
        {editing ? (
          <input
            className="w-full rounded-2xl border border-white/15 bg-black/30 px-3 py-2 text-base font-semibold text-white focus:border-sky-400/60 focus:outline-none"
            value={fields.title}
            onChange={(event) => setDraft((prev) => (prev ? { ...prev, title: event.target.value } : prev))}
            placeholder="Blueprint title"
          />
        ) : (
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Blueprint</p>
            <h5 className="text-lg font-semibold text-white">{blueprint.title}</h5>
          </div>
        )}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => (editing ? cancelEditing() : startEditing())}
            className="rounded-full border border-white/20 px-3 py-1 font-semibold text-white"
          >
            {editing ? "Cancel" : "Edit"}
          </button>
          {!editing && (
            <button
              onClick={handleDelete}
              className="rounded-full border border-white/20 px-3 py-1 font-semibold text-rose-200 hover:border-rose-200"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Phases</p>
        {editing ? (
          <PhaseListEditor
            phases={fields.phases}
            onChange={(phases) => setDraft((prev) => (prev ? { ...prev, phases } : prev))}
          />
        ) : (
          <ol className="mt-3 space-y-2 text-sm text-slate-100">
            {blueprint.phases.map((phase) => (
              <li key={phase.id} className="rounded-xl border border-white/10 bg-black/20 p-3">
                <p className="font-semibold text-white">{phase.title}</p>
                <p className="text-xs text-slate-400">{phase.description}</p>
              </li>
            ))}
          </ol>
        )}
      </div>

      {editing && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-slate-900 shadow-lg shadow-slate-900/20 disabled:opacity-60"
          >
            {isSaving ? "Saving…" : "Save blueprint"}
          </button>
          {error && <p className="text-xs text-rose-300">{error}</p>}
        </div>
      )}
    </div>
  );
}

type BlueprintCreateProps = {
  onCreate: (fields: BlueprintFields) => Promise<void>;
  isSaving: boolean;
  onCancel: () => void;
};

export function BlueprintCreatePanel({ onCreate, isSaving, onCancel }: BlueprintCreateProps) {
  const [fields, setFields] = useState<BlueprintFields>({
    title: "",
    phases: [createEmptyPhase()],
  });
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!fields.title.trim()) {
      setError("Blueprint title required");
      return;
    }
    if (!fields.phases.length) {
      setError("Add at least one phase");
      return;
    }

    try {
      await onCreate(fields);
      setFields({ title: "", phases: [createEmptyPhase()] });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create blueprint");
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-200">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">New blueprint</p>
      <div className="mt-3 space-y-3">
        <input
          className="w-full rounded-2xl border border-white/15 bg-black/30 px-3 py-2 text-base text-white focus:border-sky-400/60 focus:outline-none"
          placeholder="Blueprint title"
          value={fields.title}
          onChange={(event) => setFields((prev) => ({ ...prev, title: event.target.value }))}
        />
        <PhaseListEditor phases={fields.phases} onChange={(phases) => setFields((prev) => ({ ...prev, phases }))} />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={handleCreate}
          disabled={isSaving}
          className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-slate-900 shadow-lg shadow-slate-900/20 disabled:opacity-60"
        >
          {isSaving ? "Creating…" : "Create blueprint"}
        </button>
        <button
          onClick={onCancel}
          className="rounded-full border border-white/20 px-5 py-2 text-xs font-semibold text-white"
        >
          Cancel
        </button>
        {error && <p className="text-xs text-rose-300">{error}</p>}
      </div>
    </div>
  );
}

type PhaseListEditorProps = {
  phases: BlueprintPhase[];
  onChange: (phases: BlueprintPhase[]) => void;
};

function PhaseListEditor({ phases, onChange }: PhaseListEditorProps) {
  const updatePhase = (phaseId: string, key: keyof BlueprintPhase, value: string) => {
    onChange(
      phases.map((phase) => (phase.id === phaseId ? { ...phase, [key]: value } : phase)),
    );
  };

  const removePhase = (phaseId: string) => {
    if (phases.length === 1) return;
    onChange(phases.filter((phase) => phase.id !== phaseId));
  };

  const addPhase = () => {
    onChange([...phases, createEmptyPhase()]);
  };

  return (
    <div className="space-y-3">
      {phases.map((phase, index) => (
        <div key={phase.id} className="rounded-2xl border border-white/10 bg-black/30 p-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Phase {index + 1}</span>
            {phases.length > 1 && (
              <button
                onClick={() => removePhase(phase.id)}
                className="text-rose-200 hover:text-rose-100"
              >
                Remove
              </button>
            )}
          </div>
          <input
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-white focus:border-sky-400/60 focus:outline-none"
            placeholder="Phase title"
            value={phase.title}
            onChange={(event) => updatePhase(phase.id, 'title', event.target.value)}
          />
          <textarea
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 p-3 text-sm text-white focus:border-sky-400/60 focus:outline-none"
            placeholder="Phase description"
            value={phase.description}
            onChange={(event) => updatePhase(phase.id, 'description', event.target.value)}
          />
        </div>
      ))}
      <button
        onClick={addPhase}
        className="w-full rounded-2xl border border-dashed border-white/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200"
      >
        + Add phase
      </button>
    </div>
  );
}

function createEmptyPhase(): BlueprintPhase {
  return {
    id: `phase-${crypto.randomUUID()}`,
    title: "",
    description: "",
  };
}

function pickBlueprintFields(blueprint: Blueprint): BlueprintFields {
  return {
    title: blueprint.title,
    phases: blueprint.phases.length
      ? blueprint.phases
      : [createEmptyPhase()],
  };
}
