"use client";

import { useState } from "react";

export type Decision = {
  id: string;
  mission_id: string;
  title: string;
  reasoning: string;
  confidence: number;
  impact: string;
  created_at: string;
  updated_at: string;
};

export type DecisionFields = {
  title: string;
  reasoning: string;
  confidence: number;
  impact: string;
};

type DecisionCardProps = {
  decision: Decision;
  onSave: (fields: DecisionFields) => Promise<void>;
  isSaving: boolean;
  onEditingChange: (editing: boolean) => void;
};

export function DecisionCard({ decision, onSave, isSaving, onEditingChange }: DecisionCardProps) {
  const [draft, setDraft] = useState<DecisionFields | null>(null);
  const [error, setError] = useState<string | null>(null);
  const editing = draft !== null;

  const fields = draft ?? pickDecisionFields(decision);

  const startEditing = () => {
    setDraft(pickDecisionFields(decision));
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
      setError(err instanceof Error ? err.message : "Unable to update decision");
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 text-sm text-slate-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          {editing ? (
            <input
              className="w-full rounded-2xl border border-white/15 bg-black/30 px-3 py-2 text-base font-semibold text-white focus:border-sky-400/60 focus:outline-none"
              value={fields.title}
              onChange={(event) =>
                setDraft((prev) => (prev ? { ...prev, title: event.target.value } : prev))
              }
            />
          ) : (
            <h3 className="text-lg font-semibold text-white">{decision.title}</h3>
          )}
          <p className="mt-2 text-xs text-slate-400">Confidence: {(fields.confidence * 100).toFixed(0)}%</p>
          <p className="text-xs text-slate-400">Impact: {fields.impact}</p>
        </div>
        <button
          onClick={() => (editing ? cancelEditing() : startEditing())}
          className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white"
        >
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="mt-4">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Reasoning</p>
        {editing ? (
          <textarea
            className="mt-2 h-28 w-full rounded-2xl border border-white/15 bg-black/30 p-3 text-sm text-white focus:border-sky-400/60 focus:outline-none"
            value={fields.reasoning}
            onChange={(event) =>
              setDraft((prev) => (prev ? { ...prev, reasoning: event.target.value } : prev))
            }
          />
        ) : (
          <p className="mt-2 text-slate-200">{decision.reasoning}</p>
        )}
      </div>

      {editing && (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Confidence
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={fields.confidence}
              onChange={(event) =>
                setDraft((prev) => (prev ? { ...prev, confidence: Number(event.target.value) } : prev))
              }
              className="mt-2 w-full"
            />
            <span className="text-sm text-slate-200">{(fields.confidence * 100).toFixed(0)}%</span>
          </label>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Impact
            <select
              className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-3 py-2 text-white focus:border-sky-400/60 focus:outline-none"
              value={fields.impact}
              onChange={(event) =>
                setDraft((prev) => (prev ? { ...prev, impact: event.target.value } : prev))
              }
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>
        </div>
      )}

      {editing && (
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-slate-900 shadow-lg shadow-slate-900/20 disabled:opacity-60"
          >
            {isSaving ? "Saving…" : "Save decision"}
          </button>
          {error && <p className="text-xs text-rose-300">{error}</p>}
        </div>
      )}
    </div>
  );
}

type DecisionCreateProps = {
  onCreate: (fields: DecisionFields) => Promise<void>;
  isSaving: boolean;
  onCancel: () => void;
};

export function DecisionCreatePanel({ onCreate, isSaving, onCancel }: DecisionCreateProps) {
  const [fields, setFields] = useState<DecisionFields>({
    title: "",
    reasoning: "",
    confidence: 0.5,
    impact: "High",
  });
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!fields.title.trim()) {
      setError("Decision title required");
      return;
    }
    try {
      await onCreate(fields);
      setFields({ title: "", reasoning: "", confidence: 0.5, impact: "High" });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create decision");
    }
  };

  return (
    <div className="rounded-3xl border border-white/15 bg-slate-950/60 p-5 text-sm text-slate-200">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">New architectural decision</p>
      <div className="mt-4 grid gap-3">
        <input
          className="rounded-2xl border border-white/15 bg-black/30 px-3 py-2 text-base text-white focus:border-sky-400/60 focus:outline-none"
          placeholder="Decision title"
          value={fields.title}
          onChange={(event) => setFields((prev) => ({ ...prev, title: event.target.value }))}
        />
        <textarea
          className="rounded-2xl border border-white/15 bg-black/30 p-3 text-sm text-white focus:border-sky-400/60 focus:outline-none"
          placeholder="Capture the reasoning or tradeoffs"
          value={fields.reasoning}
          onChange={(event) => setFields((prev) => ({ ...prev, reasoning: event.target.value }))}
        />
        <div className="grid gap-3 md:grid-cols-2">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Confidence
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={fields.confidence}
              onChange={(event) =>
                setFields((prev) => ({ ...prev, confidence: Number(event.target.value) }))
              }
              className="mt-2 w-full"
            />
            <span className="text-sm text-slate-200">{(fields.confidence * 100).toFixed(0)}%</span>
          </label>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Impact
            <select
              className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-3 py-2 text-white focus:border-sky-400/60 focus:outline-none"
              value={fields.impact}
              onChange={(event) => setFields((prev) => ({ ...prev, impact: event.target.value }))}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={handleCreate}
          disabled={isSaving}
          className="rounded-full bg-white px-6 py-2 text-xs font-semibold text-slate-900 shadow-lg shadow-slate-900/20 disabled:opacity-60"
        >
          {isSaving ? "Creating…" : "Create decision"}
        </button>
        <button
          onClick={onCancel}
          className="rounded-full border border-white/20 px-6 py-2 text-xs font-semibold text-white hover:border-white"
        >
          Cancel
        </button>
        {error && <p className="text-xs text-rose-300">{error}</p>}
      </div>
    </div>
  );
}

function pickDecisionFields(decision: Decision): DecisionFields {
  return {
    title: decision.title,
    reasoning: decision.reasoning,
    confidence: decision.confidence,
    impact: decision.impact,
  };
}
