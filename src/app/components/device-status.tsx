import { Cpu, HardDrive, Wifi, WifiOff } from 'lucide-react';
import { motion } from 'motion/react';
import { RiskLevel } from './risk-state-indicator';

interface DeviceStatusProps {
  riskLevel: RiskLevel;
  isProtected?: boolean;
}

export function DeviceStatus({ riskLevel, isProtected = false }: DeviceStatusProps) {
  const isNormal = riskLevel === 'normal';
  const isWarning = riskLevel === 'warning';
  const isCritical = riskLevel === 'critical';

  // Dynamic CPU usage based on state
  const cpuUsage = isNormal ? 34 : isWarning ? (40 + Math.floor(Math.random() * 20)) : 80;
  
  // Dynamic Disk I/O
  const diskIO = isNormal ? 'Normal' : isWarning ? 'Elevated' : 'Critical';
  
  // Network status
  const networkStatus = (isCritical || isProtected) ? 'Isolated' : 'Connected';

  const getCpuColor = () => {
    if (isCritical) return 'text-red-400';
    if (isWarning) return 'text-yellow-400';
    return 'text-cyan-400';
  };

  const getDiskColor = () => {
    if (isCritical) return 'text-red-400';
    if (isWarning) return 'text-yellow-400';
    return 'text-cyan-400';
  };

  const getNetworkColor = () => {
    return (isCritical || isProtected) ? 'text-red-400' : 'text-cyan-400';
  };

  const getCpuBarColor = () => {
    if (isCritical) return 'bg-red-400';
    if (isWarning) return 'bg-yellow-400';
    return 'bg-cyan-400';
  };

  const shouldPulse = isWarning || isCritical;

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Device Status</h3>
        {isWarning && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold px-3 py-1.5 rounded-full">
            ENHANCED MONITORING
          </div>
        )}
        {isCritical && (
          <motion.div
            className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold px-3 py-1.5 rounded-full"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            PROTECTION ACTIVE
          </motion.div>
        )}
      </div>

      <div className="space-y-4">
        {/* CPU Usage */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className={`p-2 ${isCritical ? 'bg-red-500/10' : isWarning ? 'bg-yellow-500/10' : 'bg-cyan-500/10'} rounded-lg relative`}
              animate={shouldPulse ? {
                boxShadow: [
                  '0 0 0 0 rgba(250, 204, 21, 0)',
                  '0 0 0 8px rgba(250, 204, 21, 0.1)',
                  '0 0 0 0 rgba(250, 204, 21, 0)'
                ]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            >
              <Cpu className={`w-4 h-4 ${getCpuColor()}`} />
            </motion.div>
            <div>
              <div className="text-sm text-slate-400">CPU Usage</div>
              <motion.div
                className={`text-lg font-semibold ${getCpuColor()}`}
                animate={isCritical ? {
                  scale: [1, 1.05, 1],
                } : {}}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {cpuUsage}%
              </motion.div>
            </div>
          </div>
          <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${getCpuBarColor()} transition-all duration-300`}
              style={{ width: `${cpuUsage}%` }}
              animate={shouldPulse ? {
                opacity: [1, 0.7, 1]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>

        {/* Disk I/O */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className={`p-2 ${isCritical ? 'bg-red-500/10' : isWarning ? 'bg-yellow-500/10' : 'bg-cyan-500/10'} rounded-lg`}
              animate={shouldPulse ? {
                boxShadow: [
                  '0 0 0 0 rgba(250, 204, 21, 0)',
                  '0 0 0 8px rgba(250, 204, 21, 0.1)',
                  '0 0 0 0 rgba(250, 204, 21, 0)'
                ]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.5
              }}
            >
              <HardDrive className={`w-4 h-4 ${getDiskColor()}`} />
            </motion.div>
            <div>
              <div className="text-sm text-slate-400">Disk I/O</div>
              <motion.div
                className={`text-lg font-semibold ${getDiskColor()}`}
                animate={isCritical ? {
                  scale: [1, 1.05, 1],
                } : {}}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              >
                {diskIO}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Network Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 ${(isCritical || isProtected) ? 'bg-red-500/10' : 'bg-cyan-500/10'} rounded-lg`}>
              {(isCritical || isProtected) ? (
                <WifiOff className={`w-4 h-4 ${getNetworkColor()}`} />
              ) : (
                <Wifi className={`w-4 h-4 ${getNetworkColor()}`} />
              )}
            </div>
            <div>
              <div className="text-sm text-slate-400">Network</div>
              <div className={`text-lg font-semibold ${getNetworkColor()}`}>
                {networkStatus}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isWarning && (
        <div className="mt-6 pt-4 border-t border-slate-800">
          <div className="text-sm text-yellow-400 font-medium">
            ⚠ Enhanced monitoring active
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Suspicious file activity patterns detected
          </div>
        </div>
      )}

      {isCritical && (
        <div className="mt-6 pt-4 border-t border-slate-800">
          <div className="text-sm text-red-400 font-medium">
            ⚠ Automatic Protection Activated
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Threat detected and neutralized. Network isolated.
          </div>
        </div>
      )}
    </div>
  );
}
