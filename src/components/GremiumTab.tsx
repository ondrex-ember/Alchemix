import React from 'react';
import { Users, Plus, ShieldAlert, Award, Compass, Eye, Heart, Zap } from 'lucide-react';
import { Apprentice, ForageLocation } from '../types';
import { FORAGE_LOCATIONS } from '../data';

interface GremiumTabProps {
  gremiumUnlocked: boolean;
  questsCompleted: number;
  swampUnlockBonus: number;
  gold: number;
  gameDay: number;
  apprentices: Apprentice[];
  upgrades: Record<string, boolean>;
  onHire: (slot: number) => void;
  onDismiss: (appId: string) => void;
  onSend: (appId: string, type: 'forage' | 'scavenge', locationId: string | null) => void;
}

const HIRE_COSTS = [120, 250, 500];

const APP_LEVELS = [
  { level: 1, title: 'Novicus' },
  { level: 2, title: 'Discipulus' },
  { level: 3, title: 'Scholaris' },
  { level: 4, title: 'Practicus' },
  { level: 5, title: 'Adeptus' },
  { level: 6, title: 'Baccalaureus' },
  { level: 7, title: 'Licentiatus' },
  { level: 8, title: 'Magister' },
  { level: 9, title: 'Doctor' },
  { level: 10, title: 'Philosophus' },
];

export function getAppLevelData(level: number) {
  return APP_LEVELS.find((l) => l.level === level) || { title: 'Novicus' };
}

export const GremiumTab: React.FC<GremiumTabProps> = ({
  gremiumUnlocked,
  questsCompleted,
  swampUnlockBonus,
  gold,
  gameDay,
  apprentices,
  upgrades,
  onHire,
  onDismiss,
  onSend,
}) => {
  if (!gremiumUnlocked) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-[#1a1208]/40 border border-[#5c3d1a] border-dashed rounded-xl py-12">
        <Users className="w-12 h-12 text-[#7a5f35] mb-4 stroke-1 animate-pulse" />
        <h3 className="font-serif text-[#f0c040] text-sm uppercase tracking-wider mb-2">
          🔒 Gremium Uzamčeno
        </h3>
        <p className="text-xs text-[#b5945a] leading-relaxed max-w-xs mb-4">
          Dokonči alespoň <strong className="text-white">15 řádných zakázek</strong>. Jakmile si tvá
          dílna získá věhlas, obdržíš dopis s povolením přijmout první učedníky!
        </p>
        <span className="text-[10px] text-[#7a5f35] font-serif italic">
          Progress: {questsCompleted} / 15 zakázek
        </span>
      </div>
    );
  }

  // Calculate maximum allowed slots
  const slotsCount = 3;

  return (
    <div className="flex flex-col gap-4">
      {/* Apprentice list */}
      <div className="flex flex-col gap-3">
        {apprentices.map((app) => {
          const lvlData = getAppLevelData(app.level);
          const xpNeeded = app.level * 35; // scales with level
          const xpPct = Math.min(100, Math.round((app.xp / xpNeeded) * 100));

          const isResting = app.status === 'resting';
          const isBusy = app.status === 'foraging' || app.status === 'scavenging';
          const isIdle = app.status === 'idle' && gameDay >= app.restUntilDay;

          let statusLabel = 'Volný';
          let badgeColor = 'text-green-500 border-green-500/20 bg-green-500/5';

          if (isResting) {
            statusLabel = `Zotavení (den ${app.restUntilDay})`;
            badgeColor = 'text-[#3498db] border-[#3498db]/20 bg-[#3498db]/5';
          } else if (app.status === 'foraging') {
            statusLabel = `Na výpravě (vrátí se d. ${app.task?.returnsOnDay})`;
            badgeColor = 'text-[#e67e22] border-[#e67e22]/20 bg-[#e67e22]/5';
          } else if (app.status === 'scavenging') {
            statusLabel = `Sbírá (vrátí se d. ${app.task?.returnsOnDay})`;
            badgeColor = 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5';
          }

          // Locations apprentice can forage in (unlocked by level / achievements)
          const activeLocations = FORAGE_LOCATIONS.filter(
            (loc) => questsCompleted + swampUnlockBonus >= loc.unlockAt
          );

          return (
            <div
              key={app.id}
              className={`border rounded-xl p-3 flex flex-col gap-2 transition-all ${
                isBusy
                  ? 'bg-yellow-950/10 border-[#e67e22]/30'
                  : isResting
                  ? 'bg-blue-950/10 border-blue-800/30'
                  : 'bg-[#1a1208] border-[#5c3d1a]'
              }`}
            >
              {/* Header profile */}
              <div className="flex items-start gap-2">
                <span className="text-2xl mt-0.5">{app.gender === 'f' ? '👩' : '🧑'}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-[#e8d5a3] text-xs font-bold truncate">
                    {app.name}
                  </h4>
                  <p className="text-[10px] text-[#7a5f35] font-serif italic">
                    {lvlData.title} · Úroveň {app.level}
                  </p>
                </div>
                <span
                  className={`text-[9px] px-2 py-0.5 border rounded-full font-serif shrink-0 ${badgeColor}`}
                >
                  {statusLabel}
                </span>
              </div>

              {/* XP progress bar */}
              <div className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[9px] text-[#7a5f35] font-serif">
                  <span>ZKUŠENOSTI (XP)</span>
                  <span>
                    {app.xp} / {xpNeeded}
                  </span>
                </div>
                <div className="w-full h-1 bg-[#0d0a06] border border-[#5c3d1a]/40 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#c8961e] to-[#ffe88a] rounded-full transition-all duration-300"
                    style={{ width: `${xpPct}%` }}
                  />
                </div>
              </div>

              {/* Apprentice Stats stars */}
              <div className="grid grid-cols-3 gap-1 bg-[#0d0a06]/40 p-2 rounded-lg text-[10px] text-[#7a5f35] border border-[#5c3d1a]/20">
                <div className="flex flex-col">
                  <span className="flex items-center gap-0.5 text-[#b5945a]">
                    <Eye className="w-3 h-3 text-[#f0c040]" /> Zvídavost
                  </span>
                  <span className="font-mono text-white text-[11px] mt-0.5">
                    {'★'.repeat(app.curiosity)}{'☆'.repeat(5 - app.curiosity)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="flex items-center gap-0.5 text-[#b5945a]">
                    <Heart className="w-3 h-3 text-red-500" /> Výdrž
                  </span>
                  <span className="font-mono text-white text-[11px] mt-0.5">
                    {'★'.repeat(app.endurance)}{'☆'.repeat(5 - app.endurance)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="flex items-center gap-0.5 text-[#b5945a]">
                    <Zap className="w-3 h-3 text-[#3498db]" /> Zručnost
                  </span>
                  <span className="font-mono text-white text-[11px] mt-0.5">
                    {'★'.repeat(app.dexterity)}{'☆'.repeat(5 - app.dexterity)}
                  </span>
                </div>
              </div>

              {/* Stats overview footer */}
              <div className="flex gap-4 text-[9px] text-[#7a5f35] px-1">
                <span>Mise: <strong className="text-[#b5945a]">{app.missionsCompleted}</strong></span>
                <span>Nalezeno: <strong className="text-[#f0c040]">{app.totalFinds}ks</strong></span>
              </div>

              {/* Dispatch Action Panel */}
              <div className="flex gap-1.5 flex-wrap mt-1">
                {/* Local search */}
                <button
                  disabled={!isIdle}
                  onClick={() => onSend(app.id, 'scavenge', null)}
                  className="flex-1 py-1.5 bg-[#0d0a06] hover:bg-[#c8961e]/10 border border-[#5c3d1a] hover:border-[#c8961e] text-[10px] text-[#e8d5a3] font-serif rounded-md cursor-pointer disabled:opacity-25 transition-all flex items-center justify-center gap-1"
                >
                  🏘️ Sběr (okolí)
                </button>

                {/* Specific unlocked forage runs */}
                {activeLocations.map((loc) => (
                  <button
                    key={loc.id}
                    disabled={!isIdle}
                    onClick={() => onSend(app.id, 'forage', loc.id)}
                    className="flex-1 py-1.5 bg-[#0d0a06] hover:bg-[#c8961e]/10 border border-[#5c3d1a] hover:border-[#c8961e] text-[10px] text-[#e8d5a3] font-serif rounded-md cursor-pointer disabled:opacity-25 transition-all flex items-center justify-center gap-1"
                  >
                    <span>{loc.icon}</span> {loc.name}
                  </button>
                ))}

                {/* Dismiss */}
                <button
                  disabled={isBusy}
                  onClick={() => onDismiss(app.id)}
                  className="py-1 px-2.5 border border-red-950 hover:border-red-600 bg-red-950/5 text-red-500 hover:text-red-400 text-[10px] font-serif rounded-md cursor-pointer disabled:opacity-25 transition-all shrink-0"
                >
                  Propustit
                </button>
              </div>
            </div>
          );
        })}

        {/* Hire Slots */}
        {Array.from({ length: slotsCount }).map((_, i) => {
          if (apprentices.length > i) return null; // Slot already taken

          const cost = HIRE_COSTS[i];
          const prereqOk =
            i === 0
              ? true
              : i === 1
              ? (apprentices[0]?.level || 0) >= 4
              : !!upgrades['UPG_GUILD'];

          const canAfford = gold >= cost;
          const locked = !prereqOk;

          let blockTitle = 'Najímat učedníka';
          let subNote = '';

          if (i === 1) {
            blockTitle = 'Druhý učedník';
            subNote = 'Vyžaduje: 1. učedník level 4+';
          } else if (i === 2) {
            blockTitle = 'Třetí učedník';
            subNote = 'Vyžaduje: upgrade "Velká dílna"';
          }

          return (
            <div
              key={i}
              onClick={() => {
                if (!locked && canAfford) onHire(i);
              }}
              className={`border-2 border-dashed p-4 rounded-xl text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                locked
                  ? 'border-[#5c3d1a]/20 opacity-40 cursor-not-allowed bg-black/5'
                  : canAfford
                  ? 'border-[#5c3d1a] hover:border-[#c8961e] bg-[#1a1208]/40 hover:bg-[#1a1208]/60 cursor-pointer text-[#e8d5a3]'
                  : 'border-[#5c3d1a] opacity-60 cursor-not-allowed bg-[#1a1208]/20'
              }`}
            >
              <Plus className="w-5 h-5 text-[#7a5f35]" />
              <div>
                <span className="font-serif font-bold text-xs block">{blockTitle}</span>
                {subNote && <span className="text-[9px] text-[#7a5f35]">{subNote}</span>}
              </div>
              <span className="text-xs text-[#f0c040] font-serif font-semibold">
                🪙 {cost} zlatých
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default GremiumTab;
