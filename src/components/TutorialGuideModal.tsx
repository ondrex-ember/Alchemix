import React from 'react';
import { Sparkles, CheckCircle2, Play, PackagePlus, BookOpen, X, ChevronRight, Beaker, Flame, Droplets } from 'lucide-react';
import { Ingredient, Recipe } from '../types';

interface TutorialGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  inventory: Record<string, number>;
  ingMap: Record<string, Ingredient>;
  onSetupSlots: (baseId: string, reqIds: string[], process: 'Mix' | 'Grind' | 'Boil' | 'Distill') => void;
  onRefillStartingIngredients: () => void;
  tutRecipesCompleted: Record<string, boolean>;
  discoveredRecipes: Record<string, boolean>;
}

export const TUTORIAL_RECIPES = [
  {
    step: 1,
    id: "POT07",
    name: "Medová růže",
    process: "Mix" as const,
    processLabel: "Míchání za studena",
    processIcon: Beaker,
    processColor: "text-[#e67e22]",
    baseId: "ING04", // Med
    reqIds: ["ING19"], // Růže
    lore: "Sladký sirup ze včelího medu a květů růže. Základní výukový recept prověří tvůj odhad správného míchání.",
    learningGoal: "Naučíš se vkládat suroviny do slotů a připravovat sirupy mícháním.",
    rewardGold: 20,
    rewardVigor: 15
  },
  {
    step: 2,
    id: "POT05",
    name: "Oxymel",
    process: "Boil" as const,
    processLabel: "Tepelné vaření v kotli",
    processIcon: Flame,
    processColor: "text-[#e74c3c]",
    baseId: "ING04", // Med
    reqIds: ["ING03"], // Ocet
    lore: "Kyselomedový odvar, tradiční staročeský lék na horečku a zažívání. Teplo mění humorální složky.",
    learningGoal: "Osvojíš si proces Vaření (Boil) k úpravě teploty a vlhkosti alchymistických humorů.",
    rewardGold: 30,
    rewardVigor: 20
  },
  {
    step: 3,
    id: "POT04",
    name: "Růžová voda",
    process: "Distill" as const,
    processLabel: "Destilace v křivdě",
    processIcon: Droplets,
    processColor: "text-[#3498db]",
    baseId: "ING01", // Voda
    reqIds: ["ING19"], // Růže
    lore: "Vysokoce ceněný destilát vyžadující přesné řízení teploty páry v alembiku.",
    learningGoal: "Vyzkoušíš si pokročilou destilační minihru a regulaci tlaku chlazení.",
    rewardGold: 50,
    rewardVigor: 30
  }
];

export const TutorialGuideModal: React.FC<TutorialGuideModalProps> = ({
  isOpen,
  onClose,
  inventory,
  ingMap,
  onSetupSlots,
  onRefillStartingIngredients,
  tutRecipesCompleted,
  discoveredRecipes
}) => {
  if (!isOpen) return null;

  const completedCount = TUTORIAL_RECIPES.filter(r => tutRecipesCompleted[r.id] || discoveredRecipes[r.id]).length;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-300 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#140e08] border-2 border-[#c8961e] rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto border-shadow">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a1208] via-[#2a1b0c] to-[#1a1208] p-5 border-b border-[#5c3d1a] flex justify-between items-center relative">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#c8961e]/20 border border-[#c8961e] rounded-xl text-[#f0c040]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#f0c040] tracking-wide flex items-center gap-2">
                Škola alchymie · 3 výukové recepty
              </h2>
              <p className="text-xs text-[#b5945a] font-serif">
                Postupný praktický průvodce pro zvládnutí míchání, vaření a destilace
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#7a5f35] hover:text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-[#1c140a] px-6 py-3 border-b border-[#5c3d1a]/50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-serif text-[#e8d5a3]">
            <span>Postup výukou:</span>
            <strong className="text-[#f0c040]">{completedCount} / 3 receptů uvařeno</strong>
          </div>
          <div className="flex-1 max-w-xs h-2.5 bg-black/50 rounded-full overflow-hidden border border-[#5c3d1a]">
            <div
              className="h-full bg-gradient-to-r from-[#c8961e] to-[#f0c040] transition-all duration-500"
              style={{ width: `${(completedCount / 3) * 100}%` }}
            />
          </div>
          <button
            onClick={onRefillStartingIngredients}
            className="px-2.5 py-1 bg-[#5c3d1a]/60 hover:bg-[#7a4a10] border border-[#c8961e]/40 rounded-lg text-[11px] text-[#f0c040] font-serif cursor-pointer transition-colors flex items-center gap-1"
            title="Doplní Med, Růži, Ocet a Vodu do skladu, pokud ti došly"
          >
            <PackagePlus className="w-3.5 h-3.5" />
            Doplnit suroviny
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 flex flex-col gap-4 max-h-[65vh] overflow-y-auto">
          {TUTORIAL_RECIPES.map((item) => {
            const isDone = tutRecipesCompleted[item.id] || discoveredRecipes[item.id];
            const baseIng = ingMap[item.baseId];
            const reqIngs = item.reqIds.map(id => ingMap[id]).filter(Boolean);

            const hasBase = (inventory[item.baseId] || 0) > 0;
            const hasReqs = item.reqIds.every(id => (inventory[id] || 0) > 0);
            const canPrepare = hasBase && hasReqs;

            const ProcessIcon = item.processIcon;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition-all ${
                  isDone
                    ? 'bg-[#121c12]/80 border-green-700/60'
                    : 'bg-[#181109] border-[#5c3d1a] hover:border-[#c8961e]/60'
                }`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3 border-b border-[#5c3d1a]/40 pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-serif font-bold text-sm ${
                      isDone ? 'bg-green-900/80 text-green-300 border border-green-500' : 'bg-[#c8961e]/20 text-[#f0c040] border border-[#c8961e]/50'
                    }`}>
                      {isDone ? <CheckCircle2 className="w-5 h-5" /> : item.step}
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                        {item.name}
                        {isDone && <span className="text-[10px] bg-green-900/60 text-green-300 px-2 py-0.5 rounded border border-green-700 uppercase font-serif">Splněno</span>}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#b5945a] font-serif">
                        <ProcessIcon className={`w-3.5 h-3.5 ${item.processColor}`} />
                        <span>Metoda: <strong>{item.processLabel}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Prepare Button */}
                  <button
                    onClick={() => {
                      onSetupSlots(item.baseId, item.reqIds, item.process);
                      onClose();
                    }}
                    disabled={!canPrepare}
                    className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                      canPrepare
                        ? 'bg-gradient-to-r from-[#c8961e] to-[#f0c040] text-black hover:brightness-110 shadow-md'
                        : 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    {canPrepare ? 'Připravit na stůl' : 'Chybí suroviny'}
                  </button>
                </div>

                <p className="text-xs text-[#e8d5a3]/90 font-serif mb-3 italic">
                  "{item.lore}"
                </p>

                {/* Required Ingredients */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 bg-black/40 p-2.5 rounded-lg border border-[#5c3d1a]/50">
                  <div className="flex items-center justify-between text-xs font-serif">
                    <span className="text-[#b5945a]">Základ (Báze):</span>
                    <span className={`font-bold ${hasBase ? 'text-green-400' : 'text-red-400'}`}>
                      {baseIng?.name_cz || item.baseId} ({inventory[item.baseId] || 0}×)
                    </span>
                  </div>
                  {reqIngs.map((ing, idx) => {
                    const reqId = item.reqIds[idx];
                    const hasIt = (inventory[reqId] || 0) > 0;
                    return (
                      <div key={reqId} className="flex items-center justify-between text-xs font-serif">
                        <span className="text-[#b5945a]">Přísada:</span>
                        <span className={`font-bold ${hasIt ? 'text-green-400' : 'text-red-400'}`}>
                          {ing?.name_cz || reqId} ({inventory[reqId] || 0}×)
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Educational Goal & Reward */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[11px] font-serif text-[#b5945a] pt-1">
                  <div className="flex items-center gap-1 text-[#e8d5a3]">
                    <Sparkles className="w-3.5 h-3.5 text-[#f0c040]" />
                    <span><strong>Výukový cíl:</strong> {item.learningGoal}</span>
                  </div>
                  <div className="text-[#f0c040] font-bold whitespace-nowrap">
                    Odměna: +{item.rewardGold} Zlata | +{item.rewardVigor} Vigor
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#1a1208] border-t border-[#5c3d1a] flex justify-between items-center text-xs font-serif text-[#b5945a]">
          <span>Tip: Po stisknutí "Připravit na stůl" stačí na pracovní ploše stisknout <strong>UVAŘ!</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#5c3d1a] hover:bg-[#7a4a10] text-white rounded-lg cursor-pointer transition-colors font-bold"
          >
            Zavřít
          </button>
        </div>

      </div>
    </div>
  );
};
