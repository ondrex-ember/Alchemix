import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Star, Save, Folder, Trash2 } from 'lucide-react';
import { Recipe } from '../types';
import { RECIPES } from '../data';
import { ingMap } from '../utils/gameUtils';

interface GrimoireTabProps {
  discovered: Record<string, boolean>;
  hinted: Record<string, boolean>;
  favorites: Record<string, boolean>;
  notes: Record<string, string>;
  onToggleFavorite: (id: string) => void;
  onSaveNote: (id: string, note: string) => void;
  onSaveGame: () => void;
  onLoadGame: () => void;
  onResetGame: () => void;
}

export const GrimoireTab: React.FC<GrimoireTabProps> = ({
  discovered,
  hinted,
  favorites,
  notes,
  onToggleFavorite,
  onSaveNote,
  onSaveGame,
  onLoadGame,
  onResetGame,
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  // Filters: 'all', 'discovered', 'hinted', 'favorites', and categories
  const categories = ['Liquid', 'Ointment', 'Powder', 'Electuary'];

  let filteredRecipes = RECIPES.filter((r) => {
    const isDisc = !!discovered[r.id || ''];
    const isHint = !!hinted[r.id || ''];
    const isFav = !!favorites[r.id || ''];

    if (filter === 'discovered') return isDisc;
    if (filter === 'hinted') return isHint && !isDisc;
    if (filter === 'favorites') return isFav;
    if (categories.includes(filter)) return (isDisc || isHint) && r.category === filter;

    // 'all' shows unlocked recipes plus a few silhouettes of locked items
    return true;
  });

  // Sort
  filteredRecipes = [...filteredRecipes].sort((a, b) => {
    if (sortBy === 'value') return (b.value || 0) - (a.value || 0);
    if (sortBy === 'tier') return b.tier - a.tier;
    return a.name_cz.localeCompare(b.name_cz);
  });

  // Limit unknown recipes to avoid cluttering UI with silhouettes
  let silhouettesShown = 0;
  const processedRecipes = filteredRecipes.filter((r) => {
    const isDisc = !!discovered[r.id || ''];
    const isHint = !!hinted[r.id || ''];
    if (!isDisc && !isHint) {
      if (filter !== 'all') return false;
      if (silhouettesShown >= 5) return false;
      silhouettesShown++;
    }
    return true;
  });

  const selectedRecipe = RECIPES.find((r) => r.id === selectedRecipeId);
  const isSelectedDiscovered = selectedRecipe ? !!discovered[selectedRecipe.id || ''] : false;
  const isSelectedHinted = selectedRecipe ? !!hinted[selectedRecipe.id || ''] : false;
  const isSelectedFav = selectedRecipe ? !!favorites[selectedRecipe.id || ''] : false;

  const baseName = selectedRecipe ? (ingMap[selectedRecipe.base]?.name_cz || selectedRecipe.base) : '';
  const ingredientNames = selectedRecipe
    ? [baseName, ...selectedRecipe.req_ing.map((id) => ingMap[id]?.name_cz || id)].filter(Boolean).join(' + ')
    : '';

  return (
    <div className="flex flex-col gap-4">
      {/* Save, Load, Reset row */}
      <div className="flex gap-2">
        <button
          onClick={onSaveGame}
          className="flex-1 py-1.5 bg-[#1a1208] hover:bg-[#c8961e]/15 border border-[#5c3d1a] hover:border-[#c8961e] text-xs text-[#b5945a] hover:text-[#f0c040] font-serif rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
        >
          <Save className="w-3.5 h-3.5" /> Uložit
        </button>
        <button
          onClick={onLoadGame}
          className="flex-1 py-1.5 bg-[#1a1208] hover:bg-[#c8961e]/15 border border-[#5c3d1a] hover:border-[#c8961e] text-xs text-[#b5945a] hover:text-[#f0c040] font-serif rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
        >
          <Folder className="w-3.5 h-3.5" /> Načíst
        </button>
        <button
          onClick={onResetGame}
          className="flex-1 py-1.5 bg-[#1a1208] hover:bg-red-950/20 border border-[#5c3d1a] hover:border-red-800 text-xs text-[#7a5f35] hover:text-red-400 font-serif rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Grimoire Filters */}
      <div className="flex flex-col gap-2">
        {/* Row 1: Status */}
        <div className="flex gap-1 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs border rounded-full font-serif cursor-pointer transition-all ${
              filter === 'all'
                ? 'bg-[#5c3d1a] border-[#c8961e] text-[#f0c040]'
                : 'bg-[#1a1208] border-[#5c3d1a] text-[#b5945a] hover:border-[#7a5128]'
            }`}
          >
            Vše
          </button>
          <button
            onClick={() => setFilter('discovered')}
            className={`px-3 py-1 text-xs border rounded-full font-serif cursor-pointer transition-all ${
              filter === 'discovered'
                ? 'bg-[#5c3d1a] border-[#c8961e] text-[#f0c040]'
                : 'bg-[#1a1208] border-[#5c3d1a] text-[#b5945a] hover:border-[#7a5128]'
            }`}
          >
            ✅ Objevené
          </button>
          <button
            onClick={() => setFilter('hinted')}
            className={`px-3 py-1 text-xs border rounded-full font-serif cursor-pointer transition-all ${
              filter === 'hinted'
                ? 'bg-[#5c3d1a] border-[#c8961e] text-[#f0c040]'
                : 'bg-[#1a1208] border-[#5c3d1a] text-[#b5945a] hover:border-[#7a5128]'
            }`}
          >
            🌫️ Tušené
          </button>
          <button
            onClick={() => setFilter('favorites')}
            className={`px-3 py-1 text-xs border rounded-full font-serif cursor-pointer transition-all ${
              filter === 'favorites'
                ? 'bg-[#5c3d1a] border-[#c8961e] text-[#f0c040]'
                : 'bg-[#1a1208] border-[#5c3d1a] text-[#b5945a] hover:border-[#7a5128]'
            }`}
          >
            ⭐ Oblíbené
          </button>
        </div>

        {/* Row 2: Type Categories */}
        <div className="flex gap-1 flex-wrap">
          <button
            onClick={() => setFilter('Liquid')}
            className={`px-2.5 py-1 text-[11px] border rounded-full font-serif cursor-pointer transition-all ${
              filter === 'Liquid'
                ? 'bg-[#5c3d1a] border-[#c8961e] text-[#f0c040]'
                : 'bg-[#1a1208] border-[#5c3d1a] text-[#b5945a]'
            }`}
          >
            Lektvary
          </button>
          <button
            onClick={() => setFilter('Ointment')}
            className={`px-2.5 py-1 text-[11px] border rounded-full font-serif cursor-pointer transition-all ${
              filter === 'Ointment'
                ? 'bg-[#5c3d1a] border-[#c8961e] text-[#f0c040]'
                : 'bg-[#1a1208] border-[#5c3d1a] text-[#b5945a]'
            }`}
          >
            Masti
          </button>
          <button
            onClick={() => setFilter('Powder')}
            className={`px-2.5 py-1 text-[11px] border rounded-full font-serif cursor-pointer transition-all ${
              filter === 'Powder'
                ? 'bg-[#5c3d1a] border-[#c8961e] text-[#f0c040]'
                : 'bg-[#1a1208] border-[#5c3d1a] text-[#b5945a]'
            }`}
          >
            Prášky
          </button>
          <button
            onClick={() => setFilter('Electuary')}
            className={`px-2.5 py-1 text-[11px] border rounded-full font-serif cursor-pointer transition-all ${
              filter === 'Electuary'
                ? 'bg-[#5c3d1a] border-[#c8961e] text-[#f0c040]'
                : 'bg-[#1a1208] border-[#5c3d1a] text-[#b5945a]'
            }`}
          >
            Elektuaria
          </button>
        </div>

        {/* Sort select */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-[#1a1208] border border-[#5c3d1a] hover:border-[#7a5128] text-[#b5945a] font-serif text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#c8961e] transition-colors"
        >
          <option value="name">Řadit podle: Název</option>
          <option value="value">Řadit podle: Hodnota 🪙</option>
          <option value="tier">Řadit podle: Úroveň (Tier)</option>
        </select>
      </div>

      {/* Recipe list container */}
      <div className="flex flex-col gap-1.5 max-h-[340px] overflow-y-auto pr-1">
        {processedRecipes.length === 0 ? (
          <div className="text-center italic text-[#7a5f35] py-8 text-xs font-serif">
            Žádné recepty neodpovídají filtrům.<br />Uvař něco nebo získej nápovědy!
          </div>
        ) : (
          processedRecipes.map((r) => {
            const isDisc = !!discovered[r.id || ''];
            const isHint = !!hinted[r.id || ''];
            const isFav = !!favorites[r.id || ''];

            if (!isDisc && !isHint) {
              // Silhouette of unknown
              return (
                <div
                  key={r.id}
                  className="p-2 border border-[#5c3d1a]/40 bg-[#1a1208]/40 rounded-lg text-left select-none opacity-25 filter blur-[1px]"
                >
                  <div className="font-serif text-[11px] text-[#7a5f35]">
                    ??? <span className="float-right text-[10px] text-[#7a5f35]/50">Tier {r.tier}</span>
                  </div>
                  <div className="text-[10px] text-[#7a5f35]/60 mt-0.5">{r.category} · ???</div>
                </div>
              );
            }

            const activeSel = selectedRecipeId === r.id;

            return (
              <button
                key={r.id}
                onClick={() => setSelectedRecipeId(r.id)}
                className={`p-2 border.5 rounded-lg text-left transition-all cursor-pointer ${
                  activeSel
                    ? 'bg-[#c8961e]/10 border-[#c8961e]'
                    : isHint && !isDisc
                    ? 'border-[#5c3d1a] border-dashed bg-[#1a1208]/70 hover:bg-[#1a1208]'
                    : 'border-[#5c3d1a] bg-[#1a1208] hover:bg-[#241a0e] hover:border-[#7a5128]'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="font-serif text-[12px] font-bold text-[#e8d5a3] flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                      style={{ backgroundColor: r.color }}
                    />
                    {isDisc ? r.name_cz : `??? (${r.category})`}
                    {isFav && <Star className="w-3 h-3 text-[#f1c40f] fill-[#f1c40f]" />}
                  </div>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded shrink-0 ${
                      r.tier === 1
                        ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                        : r.tier === 2
                        ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                        : r.tier === 3
                        ? 'bg-purple-500/10 border border-purple-500/20 text-purple-400'
                        : 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    Tier {r.tier}
                  </span>
                </div>
                <div className="text-[10px] text-[#7a5f35] mt-1 flex justify-between">
                  <span>{isDisc ? r.category : 'Postup: ' + r.process}</span>
                  {isDisc && <span>💰 {r.value} zl.</span>}
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Selected Recipe Detail Card */}
      {selectedRecipe && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-[#c8961e] bg-[#1a1208] p-4 rounded-xl relative flex flex-col gap-2 shadow-inner"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-serif text-[#f0c040] text-sm font-semibold">
                {isSelectedDiscovered ? selectedRecipe.name_cz : '??? (' + selectedRecipe.category + ')'}
              </h3>
              <p className="text-[10px] text-[#7a5f35] italic font-serif mt-0.5">
                {isSelectedDiscovered ? selectedRecipe.name_lat : 'Compositum Ignotum'}
              </p>
            </div>
            <button
              onClick={() => onToggleFavorite(selectedRecipe.id!)}
              className="p-1 hover:bg-gray-800 rounded transition"
            >
              {isSelectedFav ? '⭐' : '☆'}
            </button>
          </div>

          {isSelectedDiscovered && (
            <p className="text-xs text-[#b5945a] leading-relaxed">
              {selectedRecipe.effect}
            </p>
          )}

          <div className="text-[11px] text-[#7a5f35] mt-1 flex flex-col gap-1">
            <div>
              <strong className="text-[#b5945a] font-serif uppercase tracking-wider text-[9px] mr-1">
                Ingredience:
              </strong>
              {isSelectedDiscovered ? (
                <span className="text-[#e8d5a3]">{ingredientNames}</span>
              ) : (
                <span className="italic text-[#7a5f35]">Ingredience neznámé</span>
              )}
            </div>
            <div>
              <strong className="text-[#b5945a] font-serif uppercase tracking-wider text-[9px] mr-1">
                Technika:
              </strong>
              <span className="text-[#e8d5a3]">{selectedRecipe.process}</span>
            </div>
            {isSelectedDiscovered && (
              <div>
                <strong className="text-[#b5945a] font-serif uppercase tracking-wider text-[9px] mr-1">
                  Tržní hodnota:
                </strong>
                <span className="text-[#f0c040] font-bold">💰 {selectedRecipe.value} zlatých</span>
              </div>
            )}
          </div>

          {/* Personal notes area */}
          <div className="mt-2 border-t border-[#5c3d1a]/50 pt-2 flex flex-col gap-1">
            <span className="text-[9px] text-[#7a5f35] font-serif uppercase tracking-wider">
              Osobní poznámky alchymisty:
            </span>
            <textarea
              value={notes[selectedRecipe.id || ''] || ''}
              onChange={(e) => onSaveNote(selectedRecipe.id!, e.target.value)}
              placeholder="Zapiš si vlastní postřehy a objevy k tomuto lektvaru..."
              className="w-full bg-[#0d0a06] border border-[#5c3d1a] rounded p-2 text-xs text-[#e8d5a3] placeholder-[#7a5f35]/50 focus:outline-none focus:border-[#c8961e] resize-none h-14 transition-colors"
            />
          </div>

          <button
            onClick={() => setSelectedRecipeId(null)}
            className="w-full mt-1.5 py-1 border border-[#5c3d1a] hover:border-[#c8961e] text-[#7a5f35] hover:text-[#f0c040] text-[10px] font-serif rounded transition-colors cursor-pointer"
          >
            Skrýt detail
          </button>
        </motion.div>
      )}
    </div>
  );
};

// Simple discovery utility helper
function isSelectedDiscovered(
  checkFn: (id: string) => boolean,
  id: string | null
): boolean {
  return !!id && checkFn(id);
}

// Local references mapping
const recMap = {} as Record<string, Recipe>;
RECIPES.forEach((r) => {
  recMap[r.id || ''] = r;
});
