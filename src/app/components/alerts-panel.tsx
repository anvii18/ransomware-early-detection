import { AlertTriangle, Shield, FileWarning } from 'lucide-react';
import { RiskLevel } from './risk-state-indicator';

interface AlertsPanelProps {
  riskLevel: RiskLevel;
}

export function AlertsPanel({ riskLevel }: AlertsPanelProps) {
  const alerts = {
    normal: [
      {
        icon: Shield,
        title: 'System Protected',
        description: 'All systems operating normally',
        severity: 'info',
        time: '2 min ago'
      }
    ],
    warning: [
      {
        icon: AlertTriangle,
        title: 'Suspicious Activity Detected',
        description: 'Unusual file modification patterns observed',
        severity: 'warning',
        time: '5 min ago'
      },
      {
        icon: FileWarning,
        title: 'Elevated File Access',
        description: 'Multiple files accessed in rapid succession',
        severity: 'warning',
        time: '7 min ago'
      }
    ],
    critical: [
      {
        icon: AlertTriangle,
        title: 'Ransomware Attack Detected',
        description: 'Encryption attempt blocked - Kill switch activated',
        severity: 'critical',
        time: 'Just now'
      },
      {
        icon: Shield,
        title: 'Encryption Attempts Blocked',
        description: '47 files protected from unauthorized encryption',
        severity: 'critical',
        time: '1 min ago'
      },
      {
        icon: FileWarning,
        title: 'Network Isolation Active',
        description: 'Threat contained - System isolated from network',
        severity: 'critical',
        time: '1 min ago'
      }
    ]
  };

  const currentAlerts = alerts[riskLevel];

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-red-500/10',
          border: 'border-red-500/30',
          iconBg: 'bg-red-500/10',
          iconColor: 'text-red-400',
          textColor: 'text-red-400'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/30',
          iconBg: 'bg-yellow-500/10',
          iconColor: 'text-yellow-400',
          textColor: 'text-yellow-400'
        };
      default:
        return {
          bg: 'bg-cyan-500/10',
          border: 'border-cyan-500/30',
          iconBg: 'bg-cyan-500/10',
          iconColor: 'text-cyan-400',
          textColor: 'text-cyan-400'
        };
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Active Alerts</h3>
      
      <div className="grid gap-4">
        {currentAlerts.map((alert, index) => {
          const styles = getSeverityStyles(alert.severity);
          const Icon = alert.icon;

          return (
            <div
              key={index}
              className={`${styles.bg} ${styles.border} border rounded-lg p-4`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 ${styles.iconBg} rounded-lg flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${styles.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className={`font-semibold ${styles.textColor}`}>
                      {alert.title}
                    </h4>
                    <span className="text-xs text-slate-500 flex-shrink-0">
                      {alert.time}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">
                    {alert.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mt-6">
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
  );
}
