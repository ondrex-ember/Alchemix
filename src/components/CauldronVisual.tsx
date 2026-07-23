import React from 'react';
import { motion } from 'motion/react';
import { CauldronResidue } from '../types';

interface CauldronVisualProps {
  brewing: boolean;
  liquidColor: string;
  residue: CauldronResidue | null;
  onClearResidue?: () => void;
  vigor: number;
}

export const CauldronVisual: React.FC<CauldronVisualProps> = ({
  brewing,
  liquidColor,
  residue,
  onClearResidue,
  vigor,
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Residue Box */}
      {residue && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-2 border border-[#e67e22] rounded-lg bg-[#e67e22]/10 text-xs text-[#e67e22] font-serif max-w-full text-center"
          id="residueBox"
        >
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: residue.color }}
          />
          <span>
            Reziduum v kotlíku: <strong>{residue.name}</strong>
            {residue.thermal !== 0 && ` (🌡️${residue.thermal > 0 ? '+' : ''}${residue.thermal})`}
            {residue.moisture !== 0 && ` (💧${residue.moisture > 0 ? '+' : ''}${residue.moisture})`}
            {residue.toxicity !== 0 && ` (☠️+${residue.toxicity})`}
          </span>
          {onClearResidue && (
            <button
              onClick={onClearResidue}
              className="ml-auto px-2 py-0.5 border border-[#e67e22]/60 hover:bg-[#e67e22]/20 text-[#e67e22] rounded font-serif text-[10px] cursor-pointer transition-colors"
              disabled={vigor < 5}
              title="Vyčistit kotel stojí 5⚡ Vigoru"
            >
              Vyčistit (5⚡)
            </button>
          )}
        </motion.div>
      )}

      {/* Cauldron SVG Container */}
      <motion.div
        className="relative w-44 h-36 cursor-default"
        animate={
          brewing
            ? {
                scale: [1, 1.05, 0.98, 1.05, 1],
                rotate: [0, -2, 2, -2, 2, 0],
              }
            : {}
        }
        transition={brewing ? { repeat: Infinity, duration: 0.6 } : undefined}
      >
        <svg viewBox="0 0 180 145" className="w-full h-full">
          {/* 1. Floor shadow beneath hearth */}
          <ellipse cx="90" cy="136" rx="52" ry="7" fill="rgba(20, 12, 5, 0.4)" />

          {/* 2. Back Leg (Center-Back of Tripod) - situated behind fire */}
          <path
            d="M 90 106 L 90 124"
            stroke="#3d2712"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* 3. Wood Logs & Charcoal Hearth */}
          <g id="hearthLogs">
            <path d="M 66 135 L 114 128" stroke="#2b1a0a" strokeWidth="5" strokeLinecap="round" />
            <path d="M 114 135 L 66 128" stroke="#231407" strokeWidth="5" strokeLinecap="round" />
            <ellipse cx="90" cy="131" rx="24" ry="5" fill="rgba(230, 90, 20, 0.4)" />
            <ellipse cx="90" cy="131" rx="14" ry="3" fill="rgba(245, 170, 30, 0.6)" />
          </g>

          {/* 4. Fire glow and flickering flames */}
          <ellipse cx="90" cy="126" rx="28" ry="7" fill="rgba(220,70,15,0.35)" />

          <g id="fireGroup">
            {/* Flame Left */}
            <motion.ellipse
              cx="78"
              cy="120"
              rx="7"
              ry="13"
              fill="#d35400"
              opacity="0.7"
              animate={{
                scaleY: [1, 1.3, 0.8, 1.2, 1],
                y: [0, -3, 2, -1, 0],
              }}
              transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
            />
            {/* Flame Right */}
            <motion.ellipse
              cx="102"
              cy="120"
              rx="7"
              ry="13"
              fill="#d35400"
              opacity="0.7"
              animate={{
                scaleY: [1, 1.2, 0.7, 1.3, 1],
                y: [0, -4, 3, -1, 0],
              }}
              transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut' }}
            />
            {/* Center Main Flame */}
            <motion.ellipse
              cx="90"
              cy="116"
              rx="10"
              ry="17"
              fill="#e67e22"
              opacity="0.85"
              animate={{
                scaleY: [1, 1.35, 0.85, 1.2, 1],
                y: [0, -5, 1, -2, 0],
              }}
              transition={{ repeat: Infinity, duration: 0.85, ease: 'easeInOut' }}
            />
            {/* Inner Hot Flame Core */}
            <motion.ellipse
              cx="90"
              cy="112"
              rx="6"
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

          {/* 5. Cauldron Body */}
          <path
            d="M 42 72 Q 36 102 56 112 Q 90 120 124 112 Q 144 102 138 72 Z"
            fill="#29190b"
            stroke="#5c3d1a"
            strokeWidth="2.5"
          />

          {/* 6. Front Tripod Legs (Attached to cauldron bottom, drawn IN FRONT of fire!) */}
          <path
            d="M 58 108 L 45 135"
            stroke="#5c3d1a"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          <path
            d="M 58 108 L 45 135"
            stroke="#3d2712"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 122 108 L 135 135"
            stroke="#5c3d1a"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          <path
            d="M 122 108 L 135 135"
            stroke="#3d2712"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Cauldron Top Rim */}
          <ellipse
            cx="90"
            cy="72"
            rx="48"
            ry="17"
            fill="#1d1106"
            stroke="#5c3d1a"
            strokeWidth="2.5"
          />

          {/* Liquid surface */}
          <motion.ellipse
            cx="90"
            cy="72"
            rx="44"
            ry="14"
            animate={{ fill: liquidColor }}
            transition={{ duration: 0.5 }}
          />

          {/* Steam / Fog rising during brewing */}
          {brewing && (
            <g opacity="0.45">
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
                stroke="#fff"
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

          {/* Handles */}
          <path
            d="M42 80 Q30 75 35 62 Q40 50 52 58"
            fill="none"
            stroke="#5c3d1a"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M138 80 Q150 75 145 62 Q140 50 128 58"
            fill="none"
            stroke="#5c3d1a"
            strokeWidth="5"
            strokeLinecap="round"
          />

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
