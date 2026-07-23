import React from 'react';
import { motion } from 'motion/react';
import { CauldronResidue } from '../types';

interface CauldronVisualProps {
  brewing: boolean;
  liquidColor: string;
  residue: CauldronResidue | null;
  dirtiness?: number;
  onClearResidue?: () => void;
  vigor: number;
}

export const CauldronVisual: React.FC<CauldronVisualProps> = ({
  brewing,
  liquidColor,
  residue,
  dirtiness,
  onClearResidue,
  vigor,
}) => {
  // Compute effective dirtiness level (0 to 100)
  const effectiveDirtiness = Math.min(
    100,
    Math.max(0, dirtiness ?? (residue ? 45 : 0))
  );

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm mx-auto">
      {/* Cauldron Dirtiness & Residue Meter Dashboard */}
      <div className="w-full bg-[#120d06]/90 border border-[#5c3d1a] rounded-xl p-3 shadow-lg flex flex-col gap-2">
        {/* Header line with status */}
        <div className="flex items-center justify-between text-xs font-serif">
          <span className="text-[#e8d5a3] font-bold flex items-center gap-1.5">
            <span>🧹</span>
            <span>Míra usazenin v kotli</span>
          </span>
          <span
            className={`font-semibold text-[11px] px-2 py-0.5 rounded border ${
              effectiveDirtiness < 30
                ? 'bg-emerald-950/40 border-emerald-600/50 text-[#2ecc71]'
                : effectiveDirtiness < 65
                ? 'bg-amber-950/40 border-amber-600/50 text-[#f0c040]'
                : 'bg-red-950/60 border-red-500 text-[#e74c3c] animate-pulse'
            }`}
          >
            {effectiveDirtiness}% {effectiveDirtiness >= 75 ? '⚠️ Silně zanesen' : effectiveDirtiness >= 35 ? '⚠️ Usazeniny' : '✨ Čistý'}
          </span>
        </div>

        {/* Progress Bar Gauge */}
        <div className="w-full h-2.5 bg-[#0a0704] rounded-full overflow-hidden border border-[#5c3d1a]/80 relative shadow-inner">
          <motion.div
            className={`h-full rounded-full transition-all duration-500 ${
              effectiveDirtiness < 30
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_8px_rgba(46,204,113,0.5)]'
                : effectiveDirtiness < 65
                ? 'bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-400 shadow-[0_0_8px_rgba(240,192,64,0.5)]'
                : 'bg-gradient-to-r from-orange-600 via-red-600 to-red-800 shadow-[0_0_12px_rgba(231,76,60,0.8)]'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${effectiveDirtiness}%` }}
          />
        </div>

        {/* Active Residue Detail & Cleaning Action */}
        <div className="flex items-center justify-between gap-2 mt-0.5 pt-1.5 border-t border-[#5c3d1a]/40 text-[11px] font-serif">
          {residue ? (
            <div className="flex items-center gap-1.5 text-[#e67e22] truncate">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0 border border-[#e67e22]/50"
                style={{ backgroundColor: residue.color }}
              />
              <span className="truncate">
                Reziduum: <strong>{residue.name}</strong>
                {residue.thermal !== 0 && ` (🌡️${residue.thermal > 0 ? '+' : ''}${residue.thermal})`}
                {residue.toxicity !== 0 && ` (☠️+${residue.toxicity})`}
              </span>
            </div>
          ) : (
            <span className="text-[#7a5f35] italic">
              {effectiveDirtiness === 0
                ? 'Kotel je dokonale čistý. Recepty dosáhnou ryzí čistoty.'
                : 'Předchozí odvary zanechaly saze na stěnách kotle.'}
            </span>
          )}

          {onClearResidue && (
            <button
              onClick={onClearResidue}
              disabled={vigor < 5 || effectiveDirtiness === 0}
              className={`ml-auto px-2.5 py-1 border rounded text-[10px] font-serif font-bold shrink-0 transition-all cursor-pointer ${
                effectiveDirtiness >= 65
                  ? 'border-amber-400 bg-amber-500/20 text-[#f0c040] hover:bg-amber-500/30 animate-bounce shadow-[0_0_10px_rgba(240,192,64,0.4)]'
                  : effectiveDirtiness > 0
                  ? 'border-[#e67e22]/60 bg-[#e67e22]/10 text-[#e67e22] hover:bg-[#e67e22]/25'
                  : 'border-[#5c3d1a]/40 bg-[#120d06] text-[#5c3d1a] cursor-not-allowed'
              }`}
              title="Vyčistit kotel stojí 5⚡ Vigoru"
            >
              🧹 Vyčistit (5⚡)
            </button>
          )}
        </div>

        {/* High Dirtiness Warning Alert */}
        {effectiveDirtiness >= 60 && (
          <div className="text-[10px] font-serif text-[#e74c3c] bg-red-950/40 border border-red-800/60 p-1.5 rounded text-center flex items-center justify-center gap-1 animate-pulse">
            <span>☠️</span>
            <span>Usazené saze způsobí vyšší toxicitu a znečištění dalších odvarů!</span>
          </div>
        )}
      </div>

      {/* Cauldron SVG Container */}
      <motion.div
        className="relative w-48 h-38 cursor-default"
        animate={
          brewing
            ? {
                scale: [1, 1.05, 0.98, 1.05, 1],
                rotate: [0, -2, 2, -2, 2, 0],
              }
            : effectiveDirtiness >= 75
            ? {
                rotate: [0, -0.5, 0.5, 0],
              }
            : {}
        }
        transition={
          brewing
            ? { repeat: Infinity, duration: 0.6 }
            : effectiveDirtiness >= 75
            ? { repeat: Infinity, duration: 1.5, ease: 'easeInOut' }
            : undefined
        }
      >
        <svg viewBox="0 0 180 145" className="w-full h-full drop-shadow-md">
          <defs>
            {/* Metallic Cast Iron / Bronze Gradients */}
            <radialGradient id="cauldronBodyGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#4a331e" />
              <stop offset="50%" stopColor="#2b1a0a" />
              <stop offset="100%" stopColor="#140b03" />
            </radialGradient>
            <linearGradient id="metalRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3d2712" />
              <stop offset="30%" stopColor="#6e4a23" />
              <stop offset="70%" stopColor="#4a3014" />
              <stop offset="100%" stopColor="#231407" />
            </linearGradient>
            <linearGradient id="ironLegGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5c3d1a" />
              <stop offset="50%" stopColor="#3d2712" />
              <stop offset="100%" stopColor="#1c1005" />
            </linearGradient>
            <radialGradient id="fireGlowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255, 140, 20, 0.6)" />
              <stop offset="60%" stopColor="rgba(220, 60, 10, 0.3)" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
            </radialGradient>
          </defs>

          {/* 1. Floor shadow beneath hearth & tripod */}
          <ellipse cx="90" cy="138" rx="55" ry="6" fill="rgba(15, 9, 3, 0.5)" />

          {/* 2. Rear Tripod Leg (behind the fire) */}
          <line
            x1="90"
            y1="98"
            x2="90"
            y2="132"
            stroke="#241508"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* 3. Wood Logs & Fire Hearth (Charcoal bed) */}
          <g id="hearthLogs">
            {/* Crossed firewood logs */}
            <path d="M 64 135 L 116 127" stroke="#211306" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 116 135 L 64 127" stroke="#1c0f04" strokeWidth="5.5" strokeLinecap="round" />
            <ellipse cx="90" cy="132" rx="28" ry="6" fill="url(#fireGlowGrad)" />
            <ellipse cx="90" cy="131" rx="16" ry="3.5" fill="rgba(255, 180, 40, 0.7)" />
          </g>

          {/* Sparks & Embers leaping from fire */}
          <g id="sparksGroup">
            <motion.circle
              cx="84"
              cy="126"
              r="1.2"
              fill="#ffaa00"
              animate={{ y: [-2, -26], x: [-6, 6], opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeOut' }}
            />
            <motion.circle
              cx="96"
              cy="124"
              r="1"
              fill="#ffdd44"
              animate={{ y: [-2, -30], x: [6, -4], opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeOut', delay: 0.5 }}
            />
          </g>

          {/* 4. Fire glow and flickering flames */}
          <g id="fireGroup">
            {/* Outer Flame Glow */}
            <motion.ellipse
              cx="90"
              cy="124"
              rx="22"
              ry="12"
              fill="#d35400"
              opacity="0.65"
              animate={{
                scaleY: [1, 1.25, 0.85, 1.15, 1],
                y: [0, -2, 1, -1, 0],
              }}
              transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
            />
            {/* Left Flame */}
            <motion.ellipse
              cx="78"
              cy="120"
              rx="6.5"
              ry="13"
              fill="#e67e22"
              opacity="0.8"
              animate={{
                scaleY: [1, 1.3, 0.8, 1.2, 1],
                y: [0, -4, 2, -1, 0],
              }}
              transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
            />
            {/* Right Flame */}
            <motion.ellipse
              cx="102"
              cy="120"
              rx="6.5"
              ry="13"
              fill="#e67e22"
              opacity="0.8"
              animate={{
                scaleY: [1, 1.2, 0.7, 1.3, 1],
                y: [0, -4, 3, -1, 0],
              }}
              transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut' }}
            />
            {/* Main Center Flame */}
            <motion.ellipse
              cx="90"
              cy="115"
              rx="9.5"
              ry="17"
              fill="#f39c12"
              opacity="0.9"
              animate={{
                scaleY: [1, 1.35, 0.85, 1.2, 1],
                y: [0, -5, 1, -2, 0],
              }}
              transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
            />
            {/* Inner Hot Core */}
            <motion.ellipse
              cx="90"
              cy="112"
              rx="5.5"
              ry="11"
              fill="#f1c40f"
              opacity="0.95"
              animate={{
                scaleY: [1, 1.4, 0.8, 1.25, 1],
                y: [0, -6, 2, -3, 0],
              }}
              transition={{ repeat: Infinity, duration: 0.65, ease: 'easeInOut' }}
            />
          </g>

          {/* 5. Cauldron Main Belly (Cast Iron / Bronze Body) */}
          <path
            d="M 42 70 C 34 100, 52 114, 90 114 C 128 114, 146 100, 138 70 Z"
            fill="url(#cauldronBodyGrad)"
            stroke="#5c3d1a"
            strokeWidth="2"
          />

          {/* DIRTINESS & SOOT VISUAL OVERLAYS ON CAULDRON BODY */}
          {effectiveDirtiness > 0 && (
            <g id="cauldronSootStains">
              {/* Left soot stain */}
              <path
                d="M 44 80 C 38 95, 52 110, 78 112 C 58 108, 46 95, 44 80 Z"
                fill="#120903"
                opacity={Math.min(0.85, (effectiveDirtiness / 100) * 0.9)}
              />
              {/* Right soot stain */}
              <path
                d="M 136 80 C 142 95, 128 110, 102 112 C 122 108, 134 95, 136 80 Z"
                fill="#120903"
                opacity={Math.min(0.85, (effectiveDirtiness / 100) * 0.9)}
              />
              {/* Center belly char mark */}
              <ellipse
                cx="90"
                cy="98"
                rx="34"
                ry="11"
                fill="#0d0502"
                opacity={Math.min(0.8, (effectiveDirtiness / 100) * 0.85)}
              />
              {/* Rim grime crust */}
              <ellipse
                cx="90"
                cy="70"
                rx="46"
                ry="16"
                fill="none"
                stroke="#1a0e05"
                strokeWidth="2.5"
                strokeDasharray="6,4"
                opacity={Math.min(0.9, (effectiveDirtiness / 100) * 0.95)}
              />
            </g>
          )}

          {/* 6. Front Tripod Legs (Drawn over fire, attached to cauldron body) */}
          {/* Left Leg Shadow & Body */}
          <line
            x1="56"
            y1="104"
            x2="42"
            y2="136"
            stroke="#1c1005"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <line
            x1="56"
            y1="104"
            x2="42"
            y2="136"
            stroke="url(#ironLegGrad)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* Right Leg Shadow & Body */}
          <line
            x1="124"
            y1="104"
            x2="138"
            y2="136"
            stroke="#1c1005"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <line
            x1="124"
            y1="104"
            x2="138"
            y2="136"
            stroke="url(#ironLegGrad)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* 7. Reinforced Iron Collar / Rim with Rivets */}
          <ellipse
            cx="90"
            cy="70"
            rx="48"
            ry="17"
            fill="url(#metalRimGrad)"
            stroke="#5c3d1a"
            strokeWidth="2.5"
          />

          {/* Decorative Medieval Rivets along collar */}
          <circle cx="48" cy="72" r="1.5" fill="#f0c040" opacity="0.8" />
          <circle cx="68" cy="80" r="1.5" fill="#f0c040" opacity="0.8" />
          <circle cx="90" cy="83" r="1.5" fill="#f0c040" opacity="0.8" />
          <circle cx="112" cy="80" r="1.5" fill="#f0c040" opacity="0.8" />
          <circle cx="132" cy="72" r="1.5" fill="#f0c040" opacity="0.8" />

          {/* Inner Cauldron Well */}
          <ellipse
            cx="90"
            cy="70"
            rx="44"
            ry="14.5"
            fill="#120a04"
          />

          {/* 8. Liquid Surface */}
          <motion.ellipse
            cx="90"
            cy="71"
            rx="42"
            ry="13.5"
            animate={{ fill: liquidColor }}
            transition={{ duration: 0.5 }}
          />

          {/* Stirring liquid ripples */}
          <motion.ellipse
            cx="90"
            cy="71"
            rx="24"
            ry="7.5"
            fill="none"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1"
            animate={{ rx: [16, 35, 16], ry: [4, 11, 4], opacity: [0.5, 0.1, 0.5] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          />

          {/* Floating dirty soot specs / scum on liquid surface when dirty */}
          {effectiveDirtiness >= 20 && (
            <g id="liquidSootFlakes" opacity={Math.min(0.9, effectiveDirtiness / 70)}>
              <motion.circle
                cx="82"
                cy="71"
                r="1.8"
                fill="#1a0c03"
                animate={{ x: [-2, 2, -2], y: [-1, 1, -1] }}
                transition={{ repeat: Infinity, duration: 2.8 }}
              />
              <motion.circle
                cx="98"
                cy="73"
                r="2.2"
                fill="#120701"
                animate={{ x: [2, -2, 2], y: [1, -1, 1] }}
                transition={{ repeat: Infinity, duration: 3.2 }}
              />
              <motion.circle
                cx="90"
                cy="68"
                r="1.5"
                fill="#241205"
                animate={{ x: [1, -2, 1], y: [-1, 1, -1] }}
                transition={{ repeat: Infinity, duration: 2.4 }}
              />
            </g>
          )}

          {/* Rising Soot & Dirt Smoke Wisps when Cauldron is Dirty */}
          {effectiveDirtiness >= 30 && (
            <g id="dirtySmokeGroup" opacity={Math.min(0.85, (effectiveDirtiness - 15) / 85)}>
              <motion.circle
                cx="72"
                cy="64"
                r="2.5"
                fill="#1c0e04"
                animate={{ y: [-4, -30], x: [-4, 6], opacity: [0.8, 0], scale: [1, 2.2] }}
                transition={{ repeat: Infinity, duration: 2.1, ease: 'easeOut' }}
              />
              <motion.circle
                cx="108"
                cy="64"
                r="3"
                fill="#120802"
                animate={{ y: [-4, -34], x: [4, -6], opacity: [0.85, 0], scale: [1, 2.4] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut', delay: 0.5 }}
              />
            </g>
          )}

          {/* Steam / Fog rising during brewing */}
          {brewing && (
            <g opacity="0.6">
              <motion.path
                d="M 65 65 Q 60 40 70 30"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                animate={{ pathLength: [0, 1], opacity: [0, 1, 0], y: [10, -20] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut' }}
              />
              <motion.path
                d="M 90 65 Q 95 45 85 25"
                fill="none"
                stroke="#ffe88a"
                strokeWidth="2"
                strokeLinecap="round"
                animate={{ pathLength: [0, 1], opacity: [0, 1, 0], y: [8, -25] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              />
              <motion.path
                d="M 115 65 Q 110 40 120 30"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                animate={{ pathLength: [0, 1], opacity: [0, 1, 0], y: [10, -20] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeOut', delay: 0.6 }}
              />
            </g>
          )}

          {/* Potion Bubbles oscillating */}
          <motion.circle
            cx="78"
            cy="73"
            r="3"
            fill="rgba(255,255,255,0.4)"
            animate={{
              y: [0, -3, 0],
              scale: [1, 1.2, 0.7, 1],
            }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="95"
            cy="71"
            r="2"
            fill="rgba(255,255,255,0.35)"
            animate={{
              y: [0, -4, 0],
              scale: [1, 1.3, 0.8, 1],
            }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut', delay: 0.4 }}
          />
          <motion.circle
            cx="105"
            cy="74"
            r="2.5"
            fill="rgba(255,255,255,0.45)"
            animate={{
              y: [0, -2, 0],
              scale: [1, 1.1, 0.6, 1],
            }}
            transition={{ repeat: Infinity, duration: 2.1, ease: 'easeInOut', delay: 0.8 }}
          />

          {/* 9. Wrought-Iron Side Handles */}
          {/* Left Handle Shadow & Iron Loop */}
          <path
            d="M 49 64 C 28 61, 22 75, 38 77"
            fill="none"
            stroke="#1c1005"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          <path
            d="M 49 64 C 28 61, 22 75, 38 77"
            fill="none"
            stroke="url(#ironLegGrad)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* Left Handle Mounting Brackets / Plates */}
          <circle cx="49" cy="64" r="2.5" fill="#241508" stroke="#5c3d1a" strokeWidth="1" />
          <circle cx="38" cy="77" r="3" fill="#241508" stroke="#5c3d1a" strokeWidth="1" />

          {/* Right Handle Shadow & Iron Loop */}
          <path
            d="M 131 64 C 152 61, 158 75, 142 77"
            fill="none"
            stroke="#1c1005"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          <path
            d="M 131 64 C 152 61, 158 75, 142 77"
            fill="none"
            stroke="url(#ironLegGrad)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* Right Handle Mounting Brackets / Plates */}
          <circle cx="131" cy="64" r="2.5" fill="#241508" stroke="#5c3d1a" strokeWidth="1" />
          <circle cx="142" cy="77" r="3" fill="#241508" stroke="#5c3d1a" strokeWidth="1" />

          {/* Shine highlight */}
          <ellipse
            cx="75"
            cy="68"
            rx="12"
            ry="5"
            fill="rgba(255,255,255,0.06)"
            transform="rotate(-20 75 68)"
          />
        </svg>
      </motion.div>
    </div>
  );
};

