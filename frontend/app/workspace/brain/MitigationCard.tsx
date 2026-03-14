"use client";

import { useState } from "react";

export type Mitigation = {
  id: string;
  risk_id: string;
  title: string;
  description: string;
  strategy: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type MitigationFields = {
  title: string;
  description: string;
  strategy: string;
  status: string;
};

type MitigationCardProps = {
  mitigation: Mitigation;
  onSave: (fields: MitigationFields) => Promise<void>;
  isSaving: boolean;
  onEditingChange: (editing: boolean) => void;
};

export function MitigationCard({ mitigation, onSave, isSaving, onEditingChange }: MitigationCardProps) {
  const [draft, setDraft] = useState<MitigationFields | null>(null);
  const [error, setError] = useState<string | null>(null);
  const editing = draft !== null;
  const fields = draft ?? pickFields(mitigation);

  const startEditing = () => {
    setDraft(pickFields(mitigation));
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
      setError(err instanceof Error ? err.message : "Unable to update mitigation");
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4 text-sm text-slate-200">
      <div className="flex items-start justify-between gap-3">
        {editing ? (
          <input
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white focus:border-emerald-400/60 focus:outline-none"
            value={fields.title}
            onChange={(event) => setDraft((prev) => (prev ? { ...prev, title: event.target.value } : prev))}
          />
        ) : (
          <h5 className="text-base font-semibold text-white">{mitigation.title}</h5>
        )}
        <button
          onClick={() => (editing ? cancelEditing() : startEditing())}
          className="rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold text-white"
        >
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>
      <div className="mt-2 text-xs text-slate-400">
        Strategy: {fields.strategy} · Status: {fields.status}
      </div>
      <div className="mt-3">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Description</p>
        {editing ? (
          <textarea
            className="mt-2 h-20 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white focus:border-emerald-400/60 focus:outline-none"
            value={fields.description}
            onChange={(event) =>
              setDraft((prev) => (prev ? { ...prev, description: event.target.value } : prev))
            }
          />
        ) : (
          <p className="mt-2 text-slate-200">{mitigation.description}</p>
        )}
      </div>
      {editing && (
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-slate-900 shadow-lg shadow-slate-900/20 disabled:opacity-60"
          >
            {isSaving ? "Saving…" : "Save mitigation"}
          </button>
          {error && <p className="text-xs text-rose-300">{error}</p>}
        </div>
      )}
    </div>
  );
}

type MitigationCreateProps = {
  onCreate: (fields: MitigationFields) => Promise<void>;
  isSaving: boolean;
  onCancel: () => void;
};

export function MitigationCreatePanel({ onCreate, isSaving, onCancel }: MitigationCreateProps) {
  const [fields, setFields] = useState<MitigationFields>({
    title: "",
    description: "",
    strategy: "",
    status: "planned",
  });
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!fields.title.trim()) {
      setError("Mitigation title required");
      return;
    }
    try {
      await onCreate(fields);
      setFields({ title: "", description: "", strategy: "", status: "planned" });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create mitigation");
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-200">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">New mitigation</p>
      <div className="mt-3 grid gap-3">
        <input
          className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white focus:border-emerald-400/60 focus:outline-none"
          placeholder="Mitigation title"
          value={fields.title}
          onChange={(event) => setFields((prev) => ({ ...prev, title: event.target.value }))}
        />
        <textarea
          className="rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white focus:border-emerald-400/60 focus:outline-none"
          placeholder="Describe the mitigation"
          value={fields.description}
          onChange={(event) => setFields((prev) => ({ ...prev, description: event.target.value }))}
        />
        <input
          className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white focus:border-emerald-400/60 focus:outline-none"
          placeholder="Strategy"
          value={fields.strategy}
          onChange={(event) => setFields((prev) => ({ ...prev, strategy: event.target.value }))}
        />
        <select
          className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white focus:border-emerald-400/60 focus:outline-none"
          value={fields.status}
          onChange={(event) => setFields((prev) => ({ ...prev, status: event.target.value }))}
        >
          <option value="planned">Planned</option>
          <option value="in-progress">In progress</option>
          <option value="implemented">Implemented</option>
        </select>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={handleCreate}
          disabled={isSaving}
          className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-slate-900 shadow-lg shadow-slate-900/20 disabled:opacity-60"
        >
          {isSaving ? "Creating…" : "Create mitigation"}
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

function pickFields(mitigation: Mitigation): MitigationFields {
  return {
    title: mitigation.title,
    description: mitigation.description,
    strategy: mitigation.strategy,
    status: mitigation.status,
  };
}
