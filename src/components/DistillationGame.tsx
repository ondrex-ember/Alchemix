import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Flame, Wind, AlertTriangle, CheckCircle } from 'lucide-react';

interface DistillationGameProps {
  onComplete: (qualityPct: number) => void;
  onCancel: () => void;
}

export const DistillationGame: React.FC<DistillationGameProps> = ({
  onComplete,
  onCancel,
}) => {
  const [temperature, setTemperature] = useState(25); // Starts at room temp (25°C)
  const [heatPower, setHeatPower] = useState(0); // Passive heat power (-1 to +2)
  const [secondsLeft, setSecondsLeft] = useState(6.0); // 6 second distillation
  const [idealSeconds, setIdealSeconds] = useState(0); // How long kept in range
  const [status, setStatus] = useState<'idle' | 'active' | 'done'>('active');

  const idealMin = 45;
  const idealMax = 65;

  useEffect(() => {
    if (status !== 'active') return;

    const interval = setInterval(() => {
      // Natural temperature behavior
      setTemperature((prev) => {
        // Natural heat dissipation to room temp, plus active heating
        const heatDelta = heatPower * 2.5;
        const ambientDelta = (25 - prev) * 0.05; // natural decay
        const nextTemp = prev + heatDelta + ambientDelta;
        return Math.max(0, Math.min(100, nextTemp));
      });

      // Track time remaining and ideal status
      setSecondsLeft((prev) => {
        const nextSec = Math.max(0, prev - 0.1);
        if (nextSec <= 0) {
          clearInterval(interval);
          setStatus('done');
        }
        return nextSec;
      });

      // Update safety purity tracker if temp in green zone
      setTemperature((curr) => {
        if (curr >= idealMin && curr <= idealMax) {
          setIdealSeconds((prev) => prev + 0.1);
        }
        return curr;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [status, heatPower]);

  const addHeat = () => {
    setHeatPower((prev) => Math.min(3, prev + 1.2));
  };

  const removeHeat = () => {
    setHeatPower((prev) => Math.max(-2, prev - 1.2));
  };

  const finish = () => {
    const qualityPct = (idealSeconds / 6.0) * 100;
    onComplete(qualityPct);
  };

  const tempInIdeal = temperature >= idealMin && temperature <= idealMax;

  return (
    <div className="fixed inset-0 bg-[#0d0a06]/90 backdrop-blur-md z-300 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-[#1a1208] border-2 border-[#c8961e] rounded-xl p-6 text-center shadow-2xl relative"
      >
        <h2 className="font-serif text-xl text-[#f0c040] tracking-wide mb-2">
          💧 Mini-hra: Destilace
        </h2>
        <p className="text-xs text-[#b5945a] italic mb-6">
          Udržuj teplotu v zeleném ideálním pásmu po dobu 6 sekund!
        </p>

        {/* Thermometer Display */}
        <div className="flex justify-center gap-8 items-center mb-6">
          {/* Temperature Value */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-[#7a5f35] font-serif uppercase tracking-wider mb-1">
              TEPLOTA
            </span>
            <motion.span
              animate={{ color: tempInIdeal ? '#2ecc71' : temperature > idealMax ? '#e74c3c' : '#3498db' }}
              className="text-3xl font-mono font-bold"
            >
              {Math.round(temperature)}°C
            </motion.span>
            <span className="text-[10px] text-[#7a5f35] mt-1">
              {tempInIdeal ? '🟢 IDEÁLNÍ' : temperature > idealMax ? '🔴 PŘÍLIŠ HORKÉ' : '🔵 STUDENÉ'}
            </span>
          </div>

          {/* Graphical gauge */}
          <div className="w-10 h-44 bg-[#0d0a06] border border-[#5c3d1a] rounded-full relative p-1 flex flex-col justify-end">
            {/* Ideal zone visual container */}
            <div
              className="absolute left-1 right-1 bg-green-500/25 border-y border-green-500/50"
              style={{
                bottom: `${idealMin}%`,
                height: `${idealMax - idealMin}%`,
              }}
            />

            {/* Moving temperature node */}
            <motion.div
              className="absolute left-1.5 right-1.5 rounded-full"
              style={{
                bottom: `${temperatureToPct(temperature)}%`,
                height: '8px',
                background: temperatureColor(temperature),
                boxShadow: '0 0 10px currentColor',
              }}
              animate={{ bottom: `${(temperature / 100) * 100}%` }}
              transition={{ type: 'spring', stiffness: 100, damping: 10 }}
            />
          </div>
        </div>

        {/* Info row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text3)' }} className="mb-4">
          <span>Čas: <strong className="font-mono text-[#e8d5a3]">{secondsLeft.toFixed(1)}s</strong></span>
          <span>Čistota destilátu: <strong className="font-mono text-[#f0c040]">{Math.round((idealSeconds / 6.0) * 100)}%</strong></span>
        </div>

        {status === 'active' ? (
          <div className="flex gap-4">
            <button
              onClick={removeHeat}
              className="flex-1 py-3 bg-[#0d0a06] hover:bg-[#3498db]/10 border border-[#3498db] text-[#3498db] hover:text-[#5adeee] font-serif rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Wind className="w-4 h-4" /> Ubrat žár
            </button>
            <button
              onClick={addHeat}
              className="flex-1 py-3 bg-[#e67e22]/10 hover:bg-[#e67e22]/20 border border-[#e67e22] text-[#e8d5a3] hover:text-white font-serif rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Flame className="w-4 h-4 text-[#e67e22]" /> Přidat žár
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="bg-[#0d0a06] border border-[#5c3d1a] p-3 rounded-lg text-sm text-[#e8d5a3]">
              {idealSeconds >= 5.0 ? (
                <div className="flex items-center gap-2 text-[#2ecc71] justify-center">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <strong>Perfektní destilát! 🌟</strong>
                </div>
              ) : idealSeconds >= 3.0 ? (
                <div className="text-[#f0c040]">
                  <strong>Standardní destilát</strong>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[#e74c3c] justify-center">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <strong>Znečištěný destilát</strong>
                </div>
              )}
              <p className="text-[11px] text-[#7a5f35] mt-1 font-serif">
                {idealSeconds >= 5.0
                  ? 'Nízká toxicita lektvaru, zvýšená hodnota o 25%.'
                  : idealSeconds >= 3.0
                  ? 'Běžné alchemické vlastnosti zachovány.'
                  : 'Zvýšená toxicita (+15) a snížená hodnota o 20%.'}
              </p>
            </div>
            <button
              onClick={finish}
              className="w-full py-3 bg-gradient-to-r from-[#7a4a10] to-[#c8961e] border-2 border-[#f0c040] text-white font-serif font-bold rounded-lg cursor-pointer"
            >
              DOKONČIT VAŘENÍ
            </button>
          </div>
        )}

        <button
          onClick={onCancel}
          className="mt-4 text-xs text-[#7a5f35] hover:text-[#e74c3c] cursor-pointer underline block mx-auto"
        >
          Zrušit destilaci
        </button>
      </motion.div>
    </div>
  );
};

// Helper thermometer percentage converter
function temperatureToPct(t: number): number {
  return Math.max(0, Math.min(100, t));
}

// Helper color selector
function temperatureColor(t: number): string {
  if (t < 45) return '#3498db'; // blue
  if (t <= 65) return '#2ecc71'; // green
  return '#e74c3c'; // red
}

// Stub for local safety compilation
const temperature = 25;
