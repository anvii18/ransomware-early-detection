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
  const [autoMode, setAutoMode] = useState(false);

  // Automatic state progression
  useEffect(() => {
    if (!autoMode) return;

    let timeoutId: NodeJS.Timeout;

    if (riskLevel === 'normal') {
      // Stay normal for 3 seconds
      timeoutId = setTimeout(() => {
        setRiskLevel('warning');
      }, 3000);
    } else if (riskLevel === 'warning') {
      // Stay warning for 7 seconds
      timeoutId = setTimeout(() => {
        setRiskLevel('critical');
        setShowKillSwitch(true);
      }, 7000);
    } else if (riskLevel === 'critical') {
      // Stay critical for minimum 6 seconds
      timeoutId = setTimeout(() => {
        setRiskLevel('normal');
        setIsProtected(true);
        setShowKillSwitch(false);
      }, 6000);
    }

    return () => clearTimeout(timeoutId);
  }, [riskLevel, autoMode]);

  const getHeaderGradient = () => {
    if (riskLevel === 'critical') return 'from-red-500/5 to-red-600/5';
    if (riskLevel === 'warning') return 'from-yellow-500/5 to-yellow-600/5';
    return 'from-cyan-500/5 to-blue-500/5';
  };

  const startAutoDemo = () => {
    setAutoMode(true);
    setRiskLevel('normal');
    setIsProtected(false);
    setShowKillSwitch(false);
  };

  const stopAutoDemo = () => {
    setAutoMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
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
              
              {/* Protected State Banner */}
              {isProtected && riskLevel === 'normal' && (
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

        {/* Demo Controls */}
        <div className="mb-8 bg-slate-900/30 border border-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400">Demo Controls:</span>
              <button
                onClick={() => {
                  setRiskLevel('normal');
                  setIsProtected(false);
                  setShowKillSwitch(false);
                  setAutoMode(false);
                }}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                  riskLevel === 'normal' && !autoMode
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                Normal State
              </button>
              <button
                onClick={() => {
                  setRiskLevel('warning');
                  setIsProtected(false);
                  setShowKillSwitch(false);
                  setAutoMode(false);
                }}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                  riskLevel === 'warning' && !autoMode
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                Warning State
              </button>
              <button
                onClick={() => {
                  setRiskLevel('critical');
                  setShowKillSwitch(true);
                  setIsProtected(false);
                  setAutoMode(false);
                }}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                  riskLevel === 'critical' && !autoMode
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                Critical State
              </button>
            </div>
            
            <button
              onClick={autoMode ? stopAutoDemo : startAutoDemo}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                autoMode
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-cyan-500 hover:bg-cyan-600 text-white'
              }`}
            >
              {autoMode ? 'Stop Auto Demo' : 'Start Auto Demo'}
            </button>
          </div>
        </div>

        {/* System Stats */}
        <div className="mb-8">
          <SystemStats
            filesMonitored={247}
            activeAlerts={riskLevel === 'critical' ? 3 : riskLevel === 'warning' ? 2 : 0}
            systemStatus="Active"
          />
        </div>

        {/* Automatic Kill Switch - Only in Critical State */}
        {showKillSwitch && riskLevel === 'critical' && (
          <div className="mb-8">
            <AutomaticKillSwitch />
          </div>
        )}

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Device Status */}
          <div className="lg:col-span-1">
            <DeviceStatus riskLevel={riskLevel} isProtected={isProtected} />
          </div>

          {/* Right Column - Activity Graph */}
          <div className="lg:col-span-2">
            <ActivityGraph riskLevel={riskLevel} isProtected={isProtected} />
          </div>
        </div>

        {/* Alerts Panel */}
        <div>
          <AlertsPanel riskLevel={riskLevel} />
        </div>
      </div>
    </div>
  );
}
