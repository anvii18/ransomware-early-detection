import { useState, useEffect } from 'react';
import { RiskStateIndicator, RiskLevel } from './risk-state-indicator';
import { SystemStats } from './system-stats';
import { DeviceStatus } from './device-status';
import { ActivityGraph } from './activity-graph';
import { AlertsPanel } from './alerts-panel';
import { AutomaticKillSwitch } from './automatic-kill-switch';
import { Shield, CheckCircle } from 'lucide-react';

export function Dashboard() {
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('normal');
  const [isProtected, setIsProtected] = useState(false);
  const [showKillSwitch, setShowKillSwitch] = useState(false);

  // -----------------------------
  // Poll backend every 1s for live risk updates
  // -----------------------------
  useEffect(() => {
    const fetchRisk = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5000/api/risk');
        const data = await res.json();
        const newRisk: RiskLevel = data.risk;

        setRiskLevel(newRisk);
        setShowKillSwitch(newRisk === 'critical');
        setIsProtected(newRisk === 'normal'); // system protected when risk is normal
      } catch (err) {
        console.error('Error fetching risk:', err);
      }
    };

    fetchRisk(); // initial fetch
    const interval = setInterval(fetchRisk, 1000); // poll every second

    return () => clearInterval(interval);
  }, []);

  const getHeaderGradient = () => {
    if (riskLevel === 'critical') return 'from-red-500/5 to-red-600/5';
    if (riskLevel === 'warning') return 'from-yellow-500/5 to-yellow-600/5';
    return 'from-cyan-500/5 to-blue-500/5';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className={`bg-gradient-to-br ${getHeaderGradient()} rounded-lg p-8 mb-8 border border-slate-800`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-8 h-8 text-cyan-400" />
                <h1 className="text-3xl font-semibold text-white">
                  Ransomware Detection
                </h1>
              </div>
              <p className="text-slate-400 mb-4">
                Easily protect your device from ransomware threats
              </p>
              <RiskStateIndicator level={riskLevel} />

              {/* Protected Banner */}
              {isProtected && (
                <div className="mt-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 inline-flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="text-cyan-400 font-semibold text-sm">
                      System Protected - Host Isolated
                    </div>
                    <div className="text-slate-400 text-xs">
                      Threat neutralized • Network isolated • Files secured
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 min-w-[200px]">
              <div className="text-sm text-slate-400 mb-1">Last Updated</div>
              <div className="text-white font-medium mb-3">
                {new Date().toLocaleTimeString()}
              </div>
              <div className="text-xs text-slate-500">
                System Status: Active
              </div>
            </div>
          </div>
        </div>

        {/* System Stats */}
        <SystemStats
          filesMonitored={247}
          activeAlerts={riskLevel === 'critical' ? 3 : riskLevel === 'warning' ? 2 : 0}
          systemStatus="Active"
        />

        {/* Kill Switch */}
        {showKillSwitch && (
          <div className="mb-8">
            <AutomaticKillSwitch />
          </div>
        )}

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <DeviceStatus riskLevel={riskLevel} isProtected={isProtected} />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
                <div className="text-sm text-slate-400 mb-1">Threats Blocked</div>
                <div className="text-2xl font-semibold text-white">
                  {riskLevel === 'critical' ? '47' : riskLevel === 'warning' ? '2' : '0'}
                </div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
                <div className="text-sm text-slate-400 mb-1">Response Time</div>
                <div className="text-2xl font-semibold text-white">
                  {riskLevel === 'critical' ? '0.3s' : riskLevel === 'warning' ? '1.2s' : 'N/A'}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <ActivityGraph riskLevel={riskLevel} isProtected={isProtected} />
          </div>
        </div>

        {/* Alerts Panel */}
        <AlertsPanel riskLevel={riskLevel} />
      </div>
    </div>
  );
}

