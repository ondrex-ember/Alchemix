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
        <svg viewBox="0 0 180 140" className="w-full h-full">
          {/* Legs */}
          <line
            x1="55"
            y1="110"
            x2="45"
            y2="135"
            stroke="#5c3d1a"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <line
            x1="90"
            y1="115"
            x2="90"
            y2="138"
            stroke="#5c3d1a"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <line
            x1="125"
            y1="110"
            x2="135"
            y2="135"
            stroke="#5c3d1a"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Fire glow */}
          <ellipse cx="90" cy="128" rx="30" ry="6" fill="rgba(200,80,20,0.3)" />

          {/* Flickering flames */}
          <g id="fireGroup">
            {/* Flame 1 */}
            <motion.ellipse
              cx="80"
              cy="120"
              rx="8"
              ry="14"
              fill="#e74c3c"
              opacity="0.6"
              animate={{
                scaleY: [1, 1.3, 0.8, 1.1, 1],
                y: [0, -3, 2, -1, 0],
              }}
              transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
            />
            {/* Flame 2 (Center) */}
            <motion.ellipse
              cx="90"
              cy="115"
              rx="10"
              ry="18"
              fill="#f39c12"
              opacity="0.75"
              animate={{
                scaleY: [1, 1.4, 0.9, 1.2, 1],
                y: [0, -5, 1, -2, 0],
              }}
              transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
            />
            {/* Flame 3 */}
            <motion.ellipse
              cx="100"
              cy="120"
              rx="8"
              ry="14"
              fill="#e74c3c"
              opacity="0.6"
              animate={{
                scaleY: [1, 1.2, 0.7, 1.3, 1],
                y: [0, -4, 3, -1, 0],
              }}
              transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut' }}
            />
            {/* Flame 4 (Inner core) */}
            <motion.ellipse
              cx="90"
              cy="110"
              rx="6"
              ry="12"
              fill="#f1c40f"
              opacity="0.9"
              animate={{
                scaleY: [1, 1.5, 0.8, 1.3, 1],
                y: [0, -6, 2, -3, 0],
              }}
              transition={{ repeat: Infinity, duration: 0.7, ease: 'easeInOut' }}
            />
          </g>

          {/* Cauldron Body */}
          <path
            d="M45 75 Q40 105 55 110 Q90 120 125 110 Q140 105 135 75 Z"
            fill="#2c1a08"
            stroke="#5c3d1a"
            strokeWidth="2.5"
          />
          <ellipse
            cx="90"
            cy="75"
            rx="48"
            ry="18"
            fill="#241208"
            stroke="#5c3d1a"
            strokeWidth="2.5"
          />

          {/* Liquid surface with smooth color transition */}
          <motion.ellipse
            cx="90"
            cy="75"
            rx="44"
            ry="15"
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
