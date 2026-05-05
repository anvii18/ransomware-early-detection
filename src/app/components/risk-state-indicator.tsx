import { motion } from 'motion/react';

export type RiskLevel = 'normal' | 'warning' | 'critical';

interface RiskStateIndicatorProps {
  level: RiskLevel;
}

export function RiskStateIndicator({ level }: RiskStateIndicatorProps) {
  const configs = {
    normal: {
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      dotColor: 'bg-green-400',
      label: 'NORMAL'
    },
    warning: {
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      dotColor: 'bg-yellow-400',
      label: 'WARNING'
    },
    critical: {
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      dotColor: 'bg-red-400',
      label: 'CRITICAL'
    }
  };

  const config = configs[level];
  const shouldPulse = level !== 'normal';

  return (
    <div className={`inline-flex items-center gap-3 px-5 py-3 ${config.bg} ${config.border} border rounded-full`}>
      <div className="relative">
        <motion.div
          className={`w-3 h-3 ${config.dotColor} rounded-full`}
          animate={shouldPulse ? {
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1]
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {shouldPulse && (
          <motion.div
            className={`absolute inset-0 ${config.dotColor} rounded-full`}
            animate={{
              scale: [1, 2, 2],
              opacity: [0.5, 0, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        )}
      </div>
      <span className={`${config.color} font-semibold text-sm tracking-wider`}>
        {config.label}
      </span>
    </div>
  );
}
