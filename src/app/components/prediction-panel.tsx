import { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle, LoaderCircle } from 'lucide-react';

type PredictionResult = {
  status: string;
  risk_score: number;
  threat_level: string;
  safe_probability: number;
  ransomware_probability: number;
  mode: string;
  disclaimer: string;
};

const apiBase = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');

export function PredictionPanel() {
  const [filesPerSec, setFilesPerSec] = useState(18);
  const [renameCount, setRenameCount] = useState(2);
  const [entropyChange, setEntropyChange] = useState(0.18);
  const [honeypot, setHoneypot] = useState<0 | 1>(0);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function runPrediction(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(apiBase + '/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          files_per_sec: filesPerSec,
          rename_count: renameCount,
          entropy_change: entropyChange,
          honeypot,
        }),
      });
      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.detail || 'Prediction request failed.');
      }
      setResult(body as PredictionResult);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message + ' Make sure the Python API is running and VITE_API_URL is correct.'
          : 'Could not reach the prediction API.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mb-8 rounded-lg border border-slate-800 bg-slate-900/50 p-6">
      <div className="mb-5 flex items-start gap-3">
        <div className="rounded-lg bg-cyan-500/10 p-2">
          <Activity className="h-5 w-5 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">ML Prediction Playground</h2>
          <p className="mt-1 text-sm text-slate-400">
            Submit sample activity features to the trained Random Forest model.
          </p>
        </div>
      </div>

      <form onSubmit={runPrediction} className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-300">
          File operations per second
          <input
            className="mt-2 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white"
            type="number" min="0" max="1000000" step="1" required
            value={filesPerSec}
            onChange={(event) => setFilesPerSec(Number(event.target.value))}
          />
        </label>
        <label className="text-sm text-slate-300">
          Rename operations
          <input
            className="mt-2 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white"
            type="number" min="0" max="1000000" step="1" required
            value={renameCount}
            onChange={(event) => setRenameCount(Number(event.target.value))}
          />
        </label>
        <label className="text-sm text-slate-300">
          Entropy change (0–1)
          <input
            className="mt-2 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white"
            type="number" min="0" max="1" step="0.01" required
            value={entropyChange}
            onChange={(event) => setEntropyChange(Number(event.target.value))}
          />
        </label>
        <label className="text-sm text-slate-300">
          Honeypot interaction
          <select
            className="mt-2 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white"
            value={honeypot}
            onChange={(event) => setHoneypot(Number(event.target.value) as 0 | 1)}
          >
            <option value={0}>No (0)</option>
            <option value={1}>Yes (1)</option>
          </select>
        </label>
        <div className="md:col-span-2">
          <button
            className="inline-flex items-center gap-2 rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Activity className="h-4 w-4" />}
            {loading ? 'Running model…' : 'Run ML prediction'}
          </button>
        </div>
      </form>

      {error && (
        <div role="alert" className="mt-4 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-5 rounded-lg border border-slate-700 bg-slate-950/70 p-5" aria-live="polite">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {result.risk_score >= 60
                ? <AlertTriangle className="h-5 w-5 text-red-400" />
                : <CheckCircle className="h-5 w-5 text-cyan-400" />}
              <div>
                <p className="font-semibold text-white">{result.status}</p>
                <p className="text-sm text-slate-400">{result.threat_level}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold text-white">{result.risk_score}/100</p>
              <p className="text-xs text-slate-500">Model risk score</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-md bg-slate-900 p-3">
              <p className="text-xs text-slate-400">Safe probability</p>
              <p className="mt-1 text-lg font-medium text-white">{(result.safe_probability * 100).toFixed(1)}%</p>
            </div>
            <div className="rounded-md bg-slate-900 p-3">
              <p className="text-xs text-slate-400">Ransomware probability</p>
              <p className="mt-1 text-lg font-medium text-white">{(result.ransomware_probability * 100).toFixed(1)}%</p>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-amber-200/80">{result.disclaimer}</p>
        </div>
      )}

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Demo only: these are manually entered sample features, not readings from a live file-system monitor.
      </p>
    </section>
  );
}
