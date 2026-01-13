import { FileText, AlertCircle, Activity } from 'lucide-react';

interface SystemStatsProps {
  filesMonitored: number;
  activeAlerts: number;
  systemStatus: 'Active' | 'Inactive';
}

export function SystemStats({ filesMonitored, activeAlerts, systemStatus }: SystemStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-cyan-500/10 rounded-lg">
            <FileText className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-slate-400 text-sm">Files Monitored</span>
        </div>
        <div className="text-2xl font-semibold text-white">
          {filesMonitored.toLocaleString()}
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-cyan-500/10 rounded-lg">
            <AlertCircle className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-slate-400 text-sm">Active Alerts</span>
        </div>
        <div className="text-2xl font-semibold text-white">
          {activeAlerts}
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-cyan-500/10 rounded-lg">
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-slate-400 text-sm">System Status</span>
        </div>
        <div className="text-2xl font-semibold text-white">
          {systemStatus}
        </div>
      </div>
    </div>
  );
}
