import React from 'react';
import { motion } from 'motion/react';

interface VectorDisplayProps {
  thermal: number; // -8 to +8
  moisture: number; // -8 to +8
  toxicity: number; // 0 to 100
}

export const VectorDisplay: React.FC<VectorDisplayProps> = ({
  thermal,
  moisture,
  toxicity,
}) => {
  const bars = [
    {
      key: 'thermal',
      label: 'TEPLO / CHLAD',
      min: -8,
      max: 8,
      posColor: '#e67e22', // orange
      negColor: '#3498db', // blue
      val: thermal,
    },
    {
      key: 'moisture',
      label: 'VLHKOST / SUCHO',
      min: -8,
      max: 8,
      posColor: '#2ecc71', // green
      negColor: '#c8a870', // brown
      val: moisture,
    },
    {
      key: 'toxicity',
      label: 'TOXICITA',
      min: 0,
      max: 100,
      posColor: '#e74c3c', // red
      negColor: '#e74c3c', // red
      val: toxicity,
    },
  ];

  return (
    <div className="flex justify-center gap-6 mt-4 flex-wrap bg-[#1a1208] border border-[#5c3d1a] rounded-xl p-4">
      {bars.map((b) => {
        const pct =
          b.key === 'toxicity'
            ? (b.val / 100) * 100
            : ((b.val - b.min) / (b.max - b.min)) * 100;

        const color = b.val >= 0 ? b.posColor : b.negColor;
        const midPct = ((0 - b.min) / (b.max - b.min)) * 100;

        // Calculate fill size and bottom position
        let heightPct = 0;
        let bottomPct = 0;

        if (b.key === 'toxicity') {
          heightPct = pct;
          bottomPct = 0;
        } else if (b.val >= 0) {
          bottomPct = midPct;
          heightPct = pct - midPct;
        } else {
          bottomPct = pct;
          heightPct = midPct - pct;
        }

        return (
          <div key={b.key} className="flex flex-col items-center gap-2 w-20">
            <span className="text-[10px] text-[#7a5f35] font-serif font-bold tracking-wider text-center h-8 flex items-center">
              {b.label}
            </span>
            <div className="w-2 h-20 bg-[#0d0a06] border border-[#5c3d1a] rounded-full relative overflow-hidden">
              <motion.div
                className="absolute left-0 right-0 rounded-full"
                style={{ backgroundColor: color }}
                animate={{
                  bottom: `${bottomPct}%`,
                  height: `${heightPct}%`,
                }}
                transition={{ type: 'spring', stiffness: 80, damping: 15 }}
              />
            </div>
            <motion.span
              className="font-mono text-xs font-semibold"
              style={{ color }}
              animate={{ opacity: 1 }}
            >
              {b.val > 0 && b.key !== 'toxicity' ? '+' : ''}
              {b.val.toFixed(1)}
            </motion.span>
          </div>
        );
      })}
    </div>
  );
};
export default VectorDisplay;
