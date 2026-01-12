import { Shield, Lock, Zap, Brain, AlertTriangle, FileWarning } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-500/10 rounded-full mb-6">
            <Shield className="w-10 h-10 text-cyan-400" />
          </div>
          <h1 className="text-4xl font-semibold text-white mb-4">
            Ransomware Detection Platform
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Enterprise-grade protection powered by machine learning to detect and stop ransomware attacks before they encrypt your data.
          </p>
        </div>

        {/* What is Ransomware */}
        <section className="mb-12 bg-slate-900/50 border border-slate-800 rounded-lg p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <Lock className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">
                What is Ransomware?
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Ransomware is malicious software that encrypts your files, making them inaccessible. 
                Attackers demand payment (ransom) in exchange for the decryption key. Without proper 
                protection, victims face permanent data loss or are forced to pay substantial ransoms.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Modern ransomware attacks can spread across networks in minutes, encrypting thousands 
                of files and causing catastrophic damage to businesses and individuals.
              </p>
            </div>
          </div>
        </section>

        {/* Why It's Dangerous */}
        <section className="mb-12 bg-slate-900/50 border border-slate-800 rounded-lg p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">
                Why Ransomware is Dangerous
              </h2>
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"></div>
                  <p className="text-slate-300 leading-relaxed">
                    <strong className="text-white">Data Loss:</strong> Critical business documents, 
                    personal files, and irreplaceable data can be permanently lost
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"></div>
                  <p className="text-slate-300 leading-relaxed">
                    <strong className="text-white">Financial Impact:</strong> Ransom payments, recovery costs, 
                    and business downtime can cost millions
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"></div>
                  <p className="text-slate-300 leading-relaxed">
                    <strong className="text-white">Operational Disruption:</strong> Systems become unavailable, 
                    halting business operations and productivity
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"></div>
                  <p className="text-slate-300 leading-relaxed">
                    <strong className="text-white">Reputation Damage:</strong> Security breaches erode customer 
                    trust and can result in legal consequences
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Automatic Protection */}
        <section className="mb-12 bg-slate-900/50 border border-slate-800 rounded-lg p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Zap className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">
                The Importance of Automatic Protection
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Ransomware attacks happen in seconds. By the time a human detects suspicious activity, 
                hundreds or thousands of files may already be encrypted. Automatic protection is essential 
                because:
              </p>
              <div className="grid gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"></div>
                  <p className="text-slate-300">
                    <strong className="text-white">Instant Response:</strong> Threats are neutralized in 
                    milliseconds, not minutes
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"></div>
                  <p className="text-slate-300">
                    <strong className="text-white">24/7 Monitoring:</strong> Protection never sleeps, even 
                    when your team is offline
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"></div>
                  <p className="text-slate-300">
                    <strong className="text-white">Zero Human Error:</strong> Automated systems don't 
                    hesitate or make mistakes under pressure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Machine Learning */}
        <section className="mb-12 bg-slate-900/50 border border-slate-800 rounded-lg p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">
                How Machine Learning Detects Ransomware
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Our platform uses advanced machine learning algorithms to analyze file system behavior 
                and detect ransomware activity patterns:
              </p>
              <div className="grid gap-4">
                <div className="bg-slate-950/50 border border-slate-700 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Behavioral Analysis</h3>
                  <p className="text-slate-400 text-sm">
                    Monitors file access patterns, modification rates, and encryption indicators to 
                    identify suspicious behavior
                  </p>
                </div>
                <div className="bg-slate-950/50 border border-slate-700 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Entropy Detection</h3>
                  <p className="text-slate-400 text-sm">
                    Analyzes file randomness to detect encryption processes in real-time
                  </p>
                </div>
                <div className="bg-slate-950/50 border border-slate-700 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Anomaly Detection</h3>
                  <p className="text-slate-400 text-sm">
                    Learns normal system behavior and flags deviations that match ransomware signatures
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Purpose */}
        <section className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-8">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <FileWarning className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">
                Platform Purpose
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                This ransomware detection platform serves three critical functions:
              </p>
              <div className="grid gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white font-medium">Education</p>
                    <p className="text-slate-400 text-sm">
                      Help users understand ransomware threats and protection strategies
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white font-medium">Real-time Monitoring</p>
                    <p className="text-slate-400 text-sm">
                      Continuous surveillance of file system activity and threat detection
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white font-medium">Automatic Response</p>
                    <p className="text-slate-400 text-sm">
                      Instant threat neutralization with kill switch activation and network isolation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
