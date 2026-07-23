import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CraftedPotionItem } from '../types';

interface AlembicSynthesisProps {
  potionInventory: Record<string, CraftedPotionItem>;
  setPotionInventory: React.Dispatch<React.SetStateAction<Record<string, CraftedPotionItem>>>;
  vigor: number;
  setVigor: React.Dispatch<React.SetStateAction<number>>;
  dirtiness: number;
  setDirtiness: React.Dispatch<React.SetStateAction<number>>;
  brewed: number;
  upgrades: Record<string, boolean>;
  setUpgrades: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  gold: number;
  setGold: React.Dispatch<React.SetStateAction<number>>;
  addNotification: (msg: string, type?: 'info' | 'success' | 'warn' | 'error') => void;
}

export const AlembicSynthesis: React.FC<AlembicSynthesisProps> = ({
  potionInventory,
  setPotionInventory,
  vigor,
  setVigor,
  dirtiness,
  setDirtiness,
  brewed,
  upgrades,
  setUpgrades,
  gold,
  setGold,
  addNotification,
}) => {
  const [slotAKey, setSlotAKey] = useState<string | null>(null);
  const [slotBKey, setSlotBKey] = useState<string | null>(null);
  const [synthesizing, setSynthesizing] = useState<boolean>(false);
  const [synthesisStep, setSynthesisStep] = useState<string>('');
  const [lastResult, setLastResult] = useState<{ success: boolean; item?: CraftedPotionItem; msg: string } | null>(null);

  const isUnlocked = upgrades.alembic_master || brewed >= 10;
  const unlockCost = 150;

  // Filter available potion stack keys with count > 0
  const availablePotions = (Object.entries(potionInventory) as [string, CraftedPotionItem][]).filter(
    ([_, item]) => item && item.count > 0
  );

  const potionA = slotAKey ? potionInventory[slotAKey] : null;
  const potionB = slotBKey ? potionInventory[slotBKey] : null;

  // Calculate success probability
  let baseSuccess = 62; // base 62%
  const masteryBonus = Math.min(18, Math.floor(brewed / 2)); // up to +18%
  const cleanlinessModifier = Math.round((100 - dirtiness) * 0.12); // +0 to +12%
  const upgradeBonus = upgrades.alembic_focus ? 10 : 0; // +10% if focused condenser upgrade bought

  const totalSuccessChance = Math.min(
    95,
    Math.max(20, baseSuccess + masteryBonus + cleanlinessModifier + upgradeBonus)
  );

  const handleUnlock = () => {
    if (gold < unlockCost) {
      addNotification(`Chybí ti zlaté mince! Kde odemčení Alembiku potřeba ${unlockCost} Zlaťáků.`, 'warn');
      return;
    }
    setGold((g) => g - unlockCost);
    setUpgrades((prev) => ({ ...prev, alembic_master: true }));
    addNotification('⚗️ Mistrovský Alembik byl zakoupen! Syntéza Elixírů+ je odemčena.', 'success');
  };

  const handleSynthesize = () => {
    if (!potionA || !potionB) {
      addNotification('K syntéze musíš do alembiku vložit dva odvary!', 'warn');
      return;
    }
    if (vigor < 15) {
      addNotification('Nemáš dostatek Síly (vyžaduje 15⚡ Vigor)! Odpočiň si.', 'warn');
      return;
    }

    // Check if player uses same stack key and count is < 2
    if (slotAKey === slotBKey && potionA.count < 2) {
      addNotification('Pro vložení stejného odvaru do obou slotů potřebuješ alespoň 2 ks v zásobě!', 'warn');
      return;
    }

    setSynthesizing(true);
    setLastResult(null);
    setVigor((v) => Math.max(0, v - 15));

    // Synthesis Step Animation Sequence
    setSynthesisStep('Zahušťování a předehřev alembiku...');
    
    setTimeout(() => {
      setSynthesisStep('Hermetické proplétání par obou odvarů...');
    }, 1200);

    setTimeout(() => {
      setSynthesisStep('Krystalizace Dvojité Esence...');
    }, 2400);

    setTimeout(() => {
      const roll = Math.random() * 100;
      const success = roll <= totalSuccessChance;

      // Consume source potions
      setPotionInventory((prev) => {
        const next = { ...prev };
        if (slotAKey) {
          const itemA = next[slotAKey];
          if (itemA) {
            if (itemA.count <= 1) delete next[slotAKey];
            else next[slotAKey] = { ...itemA, count: itemA.count - 1 };
          }
        }
        if (slotBKey) {
          const itemB = next[slotBKey];
          if (itemB) {
            if (itemB.count <= 1) delete next[slotBKey];
            else next[slotBKey] = { ...itemB, count: itemB.count - 1 };
          }
        }

        if (success) {
          // Success: create Elixir+
          const combinedName = `Elixír+ ${potionA.name_cz} & ${potionB.name_cz}`;
          const combinedValue = Math.round((potionA.value + potionB.value) * 2.45);
          const elixirKey = `elixir_plus_${potionA.id}_${potionB.id}`;

          const existingElixir = next[elixirKey];
          const newElixirItem: CraftedPotionItem = {
            id: elixirKey,
            name_cz: combinedName,
            category: 'ElixirPlus',
            value: combinedValue,
            isExact: true,
            count: (existingElixir?.count || 0) + 1,
            icon: '🧪✨',
            isElixirPlus: true,
            description: `Mistrovský fúzovaný Elixír+ vytvořený v alembiku z odvarů "${potionA.name_cz}" a "${potionB.name_cz}". Má mimořádnou tržní hodnotu (${combinedValue} zl.) a koncentrované účinky.`,
          };

          next[elixirKey] = newElixirItem;

          setLastResult({
            success: true,
            item: newElixirItem,
            msg: `Úspěch! Vznikl ${combinedName} v hodnotě ${combinedValue} Zlaťáků!`,
          });
          addNotification(`✨ MISTROVSKÁ SYNTÉZA! Vytvořen ${combinedName}!`, 'success');
          // Add slight soot from intense synthesis
          setDirtiness((d) => Math.min(100, d + 12));
        } else {
          // Failure: Explosion & Soot
          const failureKey = 'alchemy_sludge';
          const existingSludge = next[failureKey];
          const sludgeItem: CraftedPotionItem = {
            id: failureKey,
            name_cz: 'Alchymistická hořká břečka',
            category: 'Sludge',
            value: 3,
            isExact: false,
            count: (existingSludge?.count || 0) + 1,
            icon: '🧪⬛',
            description: 'Znehodnocená spálená sedlina z neúspěšné destilace v alembiku.',
          };
          next[failureKey] = sludgeItem;

          setDirtiness((d) => Math.min(100, d + 35));
          setLastResult({
            success: false,
            msg: `Destilace se nezdařila! Vřící odvar v alembiku explodoval, vznikla hořká břečka a kotel pokryly husté saze (+35% usazenin).`,
          });
          addNotification(`💥 SYNTÉZA SELHALA! Odvary spáleny na saze a břečku.`, 'error');
        }

        return next;
      });

      // Clear slots
      setSlotAKey(null);
      setSlotBKey(null);
      setSynthesizing(false);
      setSynthesisStep('');
    }, 3600);
  };

  if (!isUnlocked) {
    return (
      <div className="bg-[#120d06]/95 border border-[#5c3d1a] rounded-2xl p-6 text-center flex flex-col items-center gap-4 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#f0c040]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="w-16 h-16 rounded-2xl bg-[#c8961e]/20 border border-[#c8961e] flex items-center justify-center text-3xl text-[#f0c040] shadow-inner">
          ⚗️
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold text-[#f0c040]">
            Stůl Velmistra · Mistrovský Alembik
          </h3>
          <p className="text-xs text-[#b5945a] font-serif max-w-md mt-1 leading-relaxed">
            Pokročilá alchymistická destilace umožňuje sloučit dva odvary do jediného mocného{' '}
            <strong className="text-[#f0c040]">Elixíru+</strong> s násobnou hodnotou a synergickým účinkem.
          </p>
        </div>

        <div className="bg-[#1a1208] border border-[#5c3d1a]/80 p-4 rounded-xl text-left w-full max-w-md font-serif text-xs text-[#e8d5a3] space-y-2">
          <div className="flex justify-between items-center text-[11px] text-[#7a5f35] font-bold uppercase border-b border-[#5c3d1a]/50 pb-1">
            <span>Požadavky k odemčení</span>
            <span>Stav</span>
          </div>
          <div className="flex justify-between items-center">
            <span>📜 Celkem uvařených odvarů:</span>
            <span className={brewed >= 10 ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
              {brewed} / 10
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>💰 Nebo zakoupení v Laboratoři:</span>
            <span className="text-[#f0c040] font-bold">{unlockCost} Zlaťáků</span>
          </div>
        </div>

        <button
          onClick={handleUnlock}
          disabled={gold < unlockCost}
          className={`px-6 py-2.5 rounded-xl font-serif text-xs font-bold transition-all shadow-lg cursor-pointer flex items-center gap-2 ${
            gold >= unlockCost
              ? 'bg-gradient-to-r from-[#c8961e] to-[#e67e22] text-black hover:brightness-110 shadow-[0_0_15px_rgba(200,150,30,0.4)]'
              : 'bg-[#24170c] border border-[#5c3d1a] text-[#7a5f35] cursor-not-allowed'
          }`}
        >
          <span>⚗️ Odemknout Alembik Velmistra ({unlockCost} Zl.)</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#120d06]/95 border border-[#5c3d1a] rounded-2xl p-5 flex flex-col gap-5 shadow-2xl relative">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-[#5c3d1a]/80 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#c8961e]/20 border border-[#c8961e] flex items-center justify-center text-xl text-[#f0c040] shadow-inner">
            ⚗️
          </div>
          <div>
            <h3 className="font-serif text-sm font-bold text-[#f0c040] flex items-center gap-2">
              <span>Syntéza Elixírů+</span>
              <span className="text-[10px] bg-[#c8961e]/20 border border-[#c8961e]/50 text-[#f0c040] px-2 py-0.5 rounded-full font-sans">
                Alembik Velmistra
              </span>
            </h3>
            <p className="text-[11px] text-[#7a5f35] font-serif">
              Sloučení dvou odvarů v parách alembiku za vysoké teploty a tlaku.
            </p>
          </div>
        </div>

        {/* Success Probability Gauge Badge */}
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-[#7a5f35] font-serif uppercase tracking-wider">
            Šance na úspěch
          </span>
          <span
            className={`font-mono text-sm font-bold px-2.5 py-0.5 rounded-lg border ${
              totalSuccessChance >= 75
                ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.3)]'
                : totalSuccessChance >= 50
                ? 'bg-amber-950/60 border-amber-500/80 text-amber-400'
                : 'bg-red-950/60 border-red-500/80 text-red-400'
            }`}
          >
            {totalSuccessChance}%
          </span>
        </div>
      </div>

      {/* Synthesis Slots Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        {/* Slot A */}
        <div className="bg-[#1a1208] border border-[#5c3d1a] rounded-xl p-3.5 flex flex-col gap-2 relative">
          <div className="flex justify-between items-center text-xs font-serif text-[#e8d5a3]">
            <span className="font-bold text-[#f0c040] flex items-center gap-1.5">
              <span>🧪</span>
              <span>1. Primární Odvar</span>
            </span>
            {potionA && (
              <button
                onClick={() => setSlotAKey(null)}
                className="text-[10px] text-red-400 hover:underline cursor-pointer"
              >
                Odebrat
              </button>
            )}
          </div>

          {potionA ? (
            <div className="p-3 bg-[#24170c] border border-[#c8961e]/60 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{potionA.icon || '🧪'}</span>
                <div>
                  <h4 className="font-serif text-xs font-bold text-white">{potionA.name_cz}</h4>
                  <p className="text-[10px] text-[#7a5f35] font-mono">
                    Hodnota: <strong className="text-[#f0c040]">{potionA.value} Zl.</strong> · Skladem: {potionA.count}×
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 border-2 border-dashed border-[#5c3d1a]/60 rounded-lg text-center text-[11px] text-[#7a5f35] font-serif italic">
              Vyber první odvar ze zásoby níže
            </div>
          )}
        </div>

        {/* Distillation Tube Connector Icon */}
        <div className="hidden md:flex absolute inset-0 m-auto w-8 h-8 rounded-full bg-[#120d06] border border-[#c8961e] items-center justify-center text-sm text-[#f0c040] z-10 shadow-lg pointer-events-none">
          ⚡
        </div>

        {/* Slot B */}
        <div className="bg-[#1a1208] border border-[#5c3d1a] rounded-xl p-3.5 flex flex-col gap-2 relative">
          <div className="flex justify-between items-center text-xs font-serif text-[#e8d5a3]">
            <span className="font-bold text-[#f0c040] flex items-center gap-1.5">
              <span>🏺</span>
              <span>2. Katalyzační Odvar</span>
            </span>
            {potionB && (
              <button
                onClick={() => setSlotBKey(null)}
                className="text-[10px] text-red-400 hover:underline cursor-pointer"
              >
                Odebrat
              </button>
            )}
          </div>

          {potionB ? (
            <div className="p-3 bg-[#24170c] border border-[#c8961e]/60 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{potionB.icon || '🏺'}</span>
                <div>
                  <h4 className="font-serif text-xs font-bold text-white">{potionB.name_cz}</h4>
                  <p className="text-[10px] text-[#7a5f35] font-mono">
                    Hodnota: <strong className="text-[#f0c040]">{potionB.value} Zl.</strong> · Skladem: {potionB.count}×
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 border-2 border-dashed border-[#5c3d1a]/60 rounded-lg text-center text-[11px] text-[#7a5f35] font-serif italic">
              Vyber druhý odvar ze zásoby níže
            </div>
          )}
        </div>
      </div>

      {/* Synergic Fusion Preview Card */}
      {potionA && potionB && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-950/40 via-[#1f1509] to-amber-950/40 border border-[#f0c040]/50 p-3 rounded-xl flex items-center justify-between gap-4 font-serif text-xs"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-pulse">🧪✨</span>
            <div>
              <span className="text-[10px] text-[#7a5f35] uppercase font-bold tracking-wider">
                Předpokládaný výsledek:
              </span>
              <h4 className="font-bold text-[#f0c040] text-xs">
                Elixír+ {potionA.name_cz} & {potionB.name_cz}
              </h4>
            </div>
          </div>
          <div className="text-right font-mono">
            <span className="text-[10px] text-[#7a5f35] block">Odhadovaná cena:</span>
            <span className="text-sm font-bold text-emerald-400">
              ~{Math.round((potionA.value + potionB.value) * 2.45)} Zláťáků
            </span>
          </div>
        </motion.div>
      )}

      {/* Synthesis Action Button & Animation State */}
      <div className="flex flex-col items-center gap-3">
        {synthesizing ? (
          <div className="w-full bg-[#1a1208] border border-[#f0c040] rounded-xl p-4 flex flex-col items-center gap-3 shadow-[0_0_20px_rgba(240,192,64,0.3)]">
            <div className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                className="text-2xl"
              >
                ⚙️
              </motion.span>
              <span className="font-serif text-xs font-bold text-[#f0c040] animate-pulse">
                {synthesisStep}
              </span>
            </div>
            <div className="w-full h-2 bg-[#0a0704] rounded-full overflow-hidden border border-[#5c3d1a]">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-500 shadow-[0_0_10px_rgba(240,192,64,0.8)]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 3.6, ease: 'easeInOut' }}
              />
            </div>
          </div>
        ) : (
          <button
            onClick={handleSynthesize}
            disabled={!potionA || !potionB || vigor < 15}
            className={`w-full py-3 rounded-xl font-serif text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
              potionA && potionB && vigor >= 15
                ? 'bg-gradient-to-r from-[#c8961e] via-[#e67e22] to-[#c8961e] text-black hover:brightness-110 shadow-[0_0_18px_rgba(200,150,30,0.5)] active:scale-[0.99]'
                : 'bg-[#24170c] border border-[#5c3d1a] text-[#7a5f35] cursor-not-allowed opacity-60'
            }`}
          >
            <span>⚗️ Započít Syntézu v Alembiku (Vyžaduje 15⚡ Vigor)</span>
          </button>
        )}

        {/* Last Synthesis Result Display */}
        <AnimatePresence>
          {lastResult && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`w-full p-3 rounded-xl border text-xs font-serif text-center flex items-center justify-center gap-2 ${
                lastResult.success
                  ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                  : 'bg-red-950/60 border-red-500/80 text-red-300'
              }`}
            >
              <span>{lastResult.success ? '✨' : '💥'}</span>
              <span>{lastResult.msg}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Crafted Potions Inventory Picker */}
      <div className="border-t border-[#5c3d1a]/80 pt-3 flex flex-col gap-2">
        <h4 className="font-serif text-xs font-bold text-[#e8d5a3] flex items-center justify-between">
          <span>📦 Sklad odvarů k syntéze ({availablePotions.length})</span>
          <span className="text-[10px] text-[#7a5f35] font-normal italic">
            Kliknutím vložíš do volného slotu
          </span>
        </h4>

        {availablePotions.length === 0 ? (
          <div className="p-4 bg-[#1a1208] border border-[#5c3d1a]/50 rounded-xl text-center text-xs text-[#7a5f35] font-serif italic">
            Zatím nemáš v zásobení žádné uvařené odvary! Nejprve uvař odvary na Stole.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
            {availablePotions.map(([key, item]) => {
              const isSelectedA = slotAKey === key;
              const isSelectedB = slotBKey === key;

              return (
                <div
                  key={key}
                  onClick={() => {
                    if (!slotAKey) setSlotAKey(key);
                    else if (!slotBKey && (slotAKey !== key || item.count > 1)) setSlotBKey(key);
                  }}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all select-none ${
                    isSelectedA || isSelectedB
                      ? 'bg-[#c8961e]/20 border-[#f0c040] shadow-[0_0_10px_rgba(240,192,64,0.3)]'
                      : 'bg-[#1a1208] border-[#5c3d1a] hover:bg-[#24170c] hover:border-[#7a5128]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{item.icon || '🧪'}</span>
                    <div>
                      <h5 className="font-serif text-xs font-bold text-white flex items-center gap-1">
                        <span>{item.name_cz}</span>
                        {item.isElixirPlus && (
                          <span className="text-[9px] bg-amber-500/20 text-[#f0c040] px-1.5 py-0.2 rounded border border-amber-500/40">
                            Elixír+
                          </span>
                        )}
                      </h5>
                      <span className="text-[10px] text-[#7a5f35] font-mono">
                        Hodnota: <strong className="text-[#f0c040]">{item.value} Zl.</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#f0c040] bg-[#0a0704] px-2 py-0.5 rounded border border-[#5c3d1a]">
                      {item.count}×
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lore Card Footer */}
      <div className="bg-[#0e0a05] border border-[#5c3d1a]/60 p-3 rounded-xl text-[11px] font-serif text-[#b5945a] italic flex items-start gap-2.5">
        <span className="text-base text-[#f0c040]">📜</span>
        <div>
          <strong className="text-[#e8d5a3] not-italic block font-bold mb-0.5">
            Rukojeť Hermetické Syntézy (Paracelsus):
          </strong>
          „Sloučíš-li dvě ryzí esence, zrodí se Elixír vyššího řádu. Věnuj však péči čistotě kotle — usazené saze způsobují vysoké riziko výbuchu a znehodnocení surovin!“
        </div>
      </div>
    </div>
  );
};
