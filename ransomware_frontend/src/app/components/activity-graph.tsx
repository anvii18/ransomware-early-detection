import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { RiskLevel } from './risk-state-indicator';

interface ActivityGraphProps {
  riskLevel: RiskLevel;
  isProtected?: boolean;
}

export function ActivityGraph({ riskLevel, isProtected = false }: ActivityGraphProps) {
  // Generate data based on risk level
  const generateData = () => {
    const baseData = [
      { time: '00:00', activity: 12 },
      { time: '02:00', activity: 8 },
      { time: '04:00', activity: 15 },
      { time: '06:00', activity: 25 },
      { time: '08:00', activity: 45 },
      { time: '10:00', activity: 38 },
      { time: '12:00', activity: 42 },
      { time: '14:00', activity: 35 },
      { time: '16:00', activity: 48 },
      { time: '18:00', activity: 52 },
      { time: '20:00', activity: 30 },
      { time: '22:00', activity: 18 },
    ];

    if (isProtected) {
      // Reduced activity after protection
      return baseData.map(d => ({
        ...d,
        activity: Math.floor(d.activity * 0.2)
      }));
    }

    if (riskLevel === 'critical') {
      return baseData.map((d, i) => ({
        ...d,
        activity: i > 8 ? d.activity + Math.random() * 150 : d.activity
      }));
    }

    if (riskLevel === 'warning') {
      return baseData.map((d, i) => ({
        ...d,
        activity: i > 9 ? d.activity + Math.random() * 40 : d.activity
      }));
    }

    return baseData;
  };

  const data = generateData();

  const getLineColor = () => {
    if (riskLevel === 'critical') return '#f87171';
    if (riskLevel === 'warning') return '#facc15';
    return '#22d3ee';
  };

  const getGradientId = () => {
    if (riskLevel === 'critical') return 'colorCritical';
    if (riskLevel === 'warning') return 'colorWarning';
    return 'colorNormal';
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">File Activity Monitor</h3>
        <div className="text-sm text-slate-400">Last 24 hours</div>
      </div>

      <div className="w-full" style={{ height: '256px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorWarning" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#facc15" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f87171" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis 
              dataKey="time" 
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Area
              type="monotone"
              dataKey="activity"
              stroke={getLineColor()}
              strokeWidth={2}
              fill={`url(#${getGradientId()})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {isProtected && riskLevel === 'normal' && (
        <div className="mt-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
            Network isolated - Activity reduced to 20% of normal levels
          </div>
        </div>
      )}

      {riskLevel === 'critical' && (
        <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
          <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            Abnormal activity spike detected at 20:00
          </div>
        </div>
      )}

      {riskLevel === 'warning' && (
        <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
          <div className="flex items-center gap-2 text-yellow-400 text-sm font-medium">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            Elevated file access patterns detected
          </div>
        </div>
      )}
    </div>
  );
}