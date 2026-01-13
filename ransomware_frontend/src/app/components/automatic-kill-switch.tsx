import { motion } from 'motion/react';
import { ShieldAlert, Shield, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export function AutomaticKillSwitch() {
  const [stage, setStage] = useState<'activating' | 'activated'>('activating');

  useEffect(() => {
    // Stage 1: Activating (0-0.8s)
    const timer = setTimeout(() => {
      setStage('activated');
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-red-500/20 to-red-600/20 border-2 border-red-500/50 rounded-lg p-6"
    >
      {stage === 'activating' ? (
        // Stage 1: Activating Protection (0-0.8s)
        <div className="flex items-center gap-4">
          <motion.div
            className="p-3 bg-red-500/20 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ShieldAlert className="w-8 h-8 text-red-400" />
          </motion.div>
          
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-red-400 mb-2">
              Activating Protection...
            </h3>
            <p className="text-slate-300 text-sm">
              Ransomware behavior detected • Initiating automatic response
            </p>
          </div>

          <motion.div
            className="w-3 h-3 bg-red-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.3, 1]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      ) : (
        // Stage 2: Activated (0.8s - 6s+)
        <div>
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className="p-3 bg-green-500/20 rounded-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Shield className="w-8 h-8 text-green-400" />
            </motion.div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-green-400">
                  Automatic Protection Activated
                </h3>
                <motion.div
                  className="w-3 h-3 bg-green-400 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              <p className="text-slate-300 text-sm">
                Threat neutralized • System will return to secure state
              </p>
            </div>
          </div>

          {/* Protection Checklist */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 text-sm"
            >
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span className="text-slate-300">Host isolated from network</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 text-sm"
            >
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span className="text-slate-300">File write operations blocked</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 text-sm"
            >
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span className="text-slate-300">Encryption activity stopped</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 text-sm"
            >
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span className="text-slate-300">Files protected: 247 secured</span>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="mt-6 pt-4 border-t border-red-500/30">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs text-slate-400 mb-1">Encryption Blocked</div>
                <div className="text-lg font-semibold text-white">47 files</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Processes Terminated</div>
                <div className="text-lg font-semibold text-white">3</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Response Time</div>
                <div className="text-lg font-semibold text-white">0.3s</div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-slate-500">
            Maintaining protection state for visibility...
          </div>
        </div>
      )}
    </motion.div>
  );
}
