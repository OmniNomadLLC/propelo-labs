"use client";

import { useState } from "react";

export type Risk = {
  id: string;
  decision_id: string;
  title: string;
  description: string;
  severity: string;
  likelihood: string;
  mitigation: string;
  created_at: string;
  updated_at: string;
};

export type RiskFields = {
  title: string;
  description: string;
  severity: string;
  likelihood: string;
  mitigation: string;
};

type RiskCardProps = {
  risk: Risk;
  onSave: (fields: RiskFields) => Promise<void>;
  isSaving: boolean;
  onEditingChange: (editing: boolean) => void;
};

export function RiskCard({ risk, onSave, isSaving, onEditingChange }: RiskCardProps) {
  const [draft, setDraft] = useState<RiskFields | null>(null);
  const [error, setError] = useState<string | null>(null);
  const editing = draft !== null;
  const fields = draft ?? pickRiskFields(risk);

  const startEditing = () => {
    setDraft(pickRiskFields(risk));
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
      setError(err instanceof Error ? err.message : "Unable to update risk");
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-200">
      <div className="flex items-start justify-between gap-3">
        {editing ? (
          <input
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white focus:border-rose-400/60 focus:outline-none"
            value={fields.title}
            onChange={(event) => setDraft((prev) => (prev ? { ...prev, title: event.target.value } : prev))}
          />
        ) : (
          <h4 className="text-base font-semibold text-white">{risk.title}</h4>
        )}
        <button
          onClick={() => (editing ? cancelEditing() : startEditing())}
          className="rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold text-white"
        >
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>
      <div className="mt-2 text-xs text-slate-400">
        Severity: {fields.severity} · Likelihood: {fields.likelihood}
      </div>
      <div className="mt-3">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Description</p>
        {editing ? (
          <textarea
            className="mt-2 h-24 w-full rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white focus:border-rose-400/60 focus:outline-none"
            value={fields.description}
            onChange={(event) =>
              setDraft((prev) => (prev ? { ...prev, description: event.target.value } : prev))
            }
          />
        ) : (
          <p className="mt-2 text-slate-200">{risk.description}</p>
        )}
      </div>
      <div className="mt-3">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Mitigation</p>
        {editing ? (
          <textarea
            className="mt-2 h-20 w-full rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white focus:border-rose-400/60 focus:outline-none"
            value={fields.mitigation}
            onChange={(event) =>
              setDraft((prev) => (prev ? { ...prev, mitigation: event.target.value } : prev))
            }
          />
        ) : (
          <p className="mt-2 text-slate-200">{risk.mitigation}</p>
        )}
      </div>
      {editing && (
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-slate-900 shadow-lg shadow-slate-900/20 disabled:opacity-60"
          >
            {isSaving ? "Saving…" : "Save risk"}
          </button>
          {error && <p className="text-xs text-rose-300">{error}</p>}
        </div>
      )}
    </div>
  );
}

type RiskCreateProps = {
  onCreate: (fields: RiskFields) => Promise<void>;
  isSaving: boolean;
  onCancel: () => void;
};

export function RiskCreatePanel({ onCreate, isSaving, onCancel }: RiskCreateProps) {
  const [fields, setFields] = useState<RiskFields>({
    title: "",
    description: "",
    severity: "High",
    likelihood: "Medium",
    mitigation: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!fields.title.trim()) {
      setError("Risk title required");
      return;
    }
    try {
      await onCreate(fields);
      setFields({ title: "", description: "", severity: "High", likelihood: "Medium", mitigation: "" });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create risk");
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-200">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">New risk</p>
      <div className="mt-3 grid gap-3">
        <input
          className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white focus:border-rose-400/60 focus:outline-none"
          placeholder="Risk title"
          value={fields.title}
          onChange={(event) => setFields((prev) => ({ ...prev, title: event.target.value }))}
        />
        <textarea
          className="rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white focus:border-rose-400/60 focus:outline-none"
          placeholder="Describe the risk"
          value={fields.description}
          onChange={(event) => setFields((prev) => ({ ...prev, description: event.target.value }))}
        />
        <div className="grid gap-3 md:grid-cols-2">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Severity
            <select
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-white focus:border-rose-400/60 focus:outline-none"
              value={fields.severity}
              onChange={(event) => setFields((prev) => ({ ...prev, severity: event.target.value }))}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Likelihood
            <select
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-white focus:border-rose-400/60 focus:outline-none"
              value={fields.likelihood}
              onChange={(event) => setFields((prev) => ({ ...prev, likelihood: event.target.value }))}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>
        </div>
        <textarea
          className="rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white focus:border-rose-400/60 focus:outline-none"
          placeholder="Mitigation strategy"
          value={fields.mitigation}
          onChange={(event) => setFields((prev) => ({ ...prev, mitigation: event.target.value }))}
        />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={handleCreate}
          disabled={isSaving}
          className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-slate-900 shadow-lg shadow-slate-900/20 disabled:opacity-60"
        >
          {isSaving ? "Creating…" : "Create risk"}
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

function pickRiskFields(risk: Risk): RiskFields {
  return {
    title: risk.title,
    description: risk.description,
    severity: risk.severity,
    likelihood: risk.likelihood,
    mitigation: risk.mitigation,
  };
}
