import React from 'react';
import { Award } from 'lucide-react';
import { TechNode } from '../types';
import { TECH_NODES } from '../data';

interface TechTreeProps {
  usageTrack: Record<string, number>;
  techStats: {
    distillCount: number;
    thermalCancels: number;
    toxOver60: number;
    herbTotal: number;
    mineralTotal: number;
  };
  techUnlocked: Record<string, boolean>;
}

export const TechTree: React.FC<TechTreeProps> = ({
  usageTrack,
  techStats,
  techUnlocked,
}) => {
  // Helper to determine real percentage progress
  const getProgress = (node: TechNode): number => {
    let minPct = 1.0;
    
    for (const [key, needed] of Object.entries(node.req)) {
      let current = 0;
      if (key.startsWith('_')) {
        const stat = key.replace('_', '');
        if (stat === 'process_Distill') current = techStats?.distillCount || 0;
        if (stat === 'thermal_cancel')  current = techStats?.thermalCancels || 0;
        if (stat === 'tox_over60')      current = techStats?.toxOver60 || 0;
        if (stat === 'herb_total')      current = techStats?.herbTotal || 0;
        if (stat === 'mineral_total')   current = techStats?.mineralTotal || 0;
      } else {
        current = usageTrack[key] || 0;
      }
      minPct = Math.min(minPct, current / needed);
    }
    return Math.min(1, Math.max(0, minPct));
  };

  return (
    <div className="flex flex-col gap-2">
      {TECH_NODES.map((node) => {
        const isUnlocked = !!techUnlocked[node.id];
        const progressPct = Math.round(getProgress(node) * 100);

        let cardClass = 'border-[#5c3d1a] bg-[#1a1208]/60 opacity-60';
        let progressColor = 'text-[#7a5f35]';

        if (isUnlocked) {
          cardClass = 'border-green-600/50 bg-green-950/5 shadow-md shadow-green-900/5';
          progressColor = 'text-green-500 font-bold';
        } else if (progressPct > 0) {
          cardClass = 'border-[#c8961e]/60 bg-[#1a1208] hover:border-[#c8961e]';
          progressColor = 'text-[#f0c040] font-semibold';
        }

        return (
          <div
            key={node.id}
            className={`border rounded-lg p-2.5 flex items-center gap-3 transition-all ${cardClass}`}
          >
            {/* Status award icon or symbol */}
            <div className="text-lg w-8 h-8 rounded-full bg-[#0d0a06] border border-[#5c3d1a] flex items-center justify-center shrink-0">
              {isUnlocked ? (
                <span className="text-green-500 text-sm">✓</span>
              ) : (
                <span role="img" aria-label="node-icon">{node.icon}</span>
              )}
            </div>

            {/* Main Info */}
            <div className="flex-1 min-w-0">
              <h5 className="font-serif text-[#e8d5a3] text-xs font-bold truncate">
                {node.name}
              </h5>
              <p className="text-[10px] text-[#7a5f35] leading-snug">
                {node.desc}
              </p>
            </div>

            {/* Achievement track badge */}
            <span className={`text-[10px] font-mono shrink-0 ${progressColor}`}>
              {isUnlocked ? 'Hotovo' : `${progressPct}%`}
            </span>
          </div>
        );
      })}
    </div>
  );
};
export default TechTree;
