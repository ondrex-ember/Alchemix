import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Radio, ShieldAlert, Sparkles, RefreshCw, AlertTriangle, Scroll, Users, Sun, CloudRain, Lock, Award, HeartHandshake } from 'lucide-react';
import { ChroniconSnapshot, ChroniconActor } from '../data/chroniconSnapshot';
import { CraftedPotionItem } from '../types';

interface ChroniconWorldFeedProps {
  snapshot: ChroniconSnapshot;
  onRefreshSnapshot?: () => void;
  gold: number;
  setGold: React.Dispatch<React.SetStateAction<number>>;
  vigor: number;
  setVigor: React.Dispatch<React.SetStateAction<number>>;
  potionInventory: Record<string, CraftedPotionItem>;
  setPotionInventory: React.Dispatch<React.SetStateAction<Record<string, CraftedPotionItem>>>;
  addNotification: (msg: string, type?: 'info' | 'success' | 'warn' | 'error') => void;
  isPortalUnlocked: boolean;
  brewedCount: number;
  questsCompletedCount: number;
  onOpenPortal: () => void;
}

export const ChroniconWorldFeed: React.FC<ChroniconWorldFeedProps> = ({
  snapshot,
  onRefreshSnapshot,
  gold,
  setGold,
  vigor,
  setVigor,
  potionInventory,
  setPotionInventory,
  addNotification,
  isPortalUnlocked,
  brewedCount,
  questsCompletedCount,
  onOpenPortal,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'actors' | 'advisory' | 'chronicle'>('overview');
  const [resolvedAdvisories, setResolvedAdvisories] = useState<Record<string, string>>({});

  const handleAdvisoryChoice = (eventId: string, choiceId: string) => {
    setResolvedAdvisories((prev) => ({ ...prev, [eventId]: choiceId }));

    if (choiceId === 'bolster') {
      // Find a healing or antidote potion to donate
      const pEntry = (Object.entries(potionInventory) as [string, CraftedPotionItem][]).find(
        ([_, p]) => (p.id === 'REC01' || p.id === 'REC03' || p.category === 'Léčivé') && p.count > 0
      );

      if (pEntry) {
        const [key, item] = pEntry;
        setPotionInventory((prev) => {
          const next = { ...prev };
          if (item.count <= 1) delete next[key];
          else next[key] = { ...item, count: item.count - 1 };
          return next;
        });
        setVigor((v) => Math.min(100, v + 25));
        addNotification(`✝️ Daroval jsi ${item.name_cz} nemocným. Klášter Athanor tě žehná! (+25 Vigor)`, 'success');
      } else {
        setGold((g) => g + 100);
        addNotification(`✝️ Zapojil jsi se do pomoci v kraji! Opat ti udělil odměnu +100 Zlaťáků.`, 'success');
      }
    } else if (choiceId === 'ignore') {
      setGold((g) => g + 180);
      addNotification(`💰 Prodával jsi odvary se ziskem během morové krize. Získal jsi +180 Zlaťáků!`, 'info');
    }
  };

  return (
    <div className="bg-[#0e0a06]/95 border border-[#5c3d1a] rounded-2xl p-5 flex flex-col gap-5 shadow-2xl relative overflow-hidden text-[#e8d5a3]">
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-[#5c3d1a]/80 pb-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#1c130a] border border-[#f0c040]/50 flex items-center justify-center text-2xl text-[#f0c040] shadow-[0_0_15px_rgba(240,192,64,0.2)]">
            📜
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-['Cinzel'] text-base font-bold text-[#f0c040] tracking-wider">
                Živý Svět Chronicon · Klášter Athanor II
              </h3>
              <span className="bg-[#2a1a0a] border border-[#5c3d1a] text-[#b5945a] font-mono text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Telemetrie
              </span>
            </div>
            <p className="text-[11px] text-[#b5945a] font-serif">
              Reálný čas světa Athanoru, zprávy Opata, stav počasí a regionální události.
            </p>
          </div>
        </div>

        {/* Outer Links & Refresh */}
        <div className="flex items-center gap-2.5">
          {onRefreshSnapshot && (
            <button
              onClick={onRefreshSnapshot}
              className="p-2 rounded-xl bg-[#1a1208] border border-[#5c3d1a] hover:border-[#f0c040] text-[#b5945a] hover:text-[#f0c040] transition-all cursor-pointer"
              title="Aktualizovat stav světa Chronicon"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}

          <a
            href="https://github.com/ondrex-ember/chronicon"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl bg-[#1c130a] hover:bg-[#281a0e] border border-[#5c3d1a] hover:border-[#f0c040] text-[#f0c040] font-serif text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            title="Otevřít oficiální repozitář Projektu Chronicon na GitHubu"
          >
            <span>📜 Chronicon Repo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* World Status Ticker Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-[#140e08] p-3 rounded-xl border border-[#5c3d1a]/80 text-xs font-serif">
        <div className="flex items-center gap-2 bg-[#0a0704] p-2 rounded-lg border border-[#5c3d1a]/50">
          <span className="text-lg">{snapshot.time.season_icon}</span>
          <div>
            <div className="text-[9px] text-[#7a5f35] font-mono uppercase">Rok & Sezóna</div>
            <div className="font-bold text-[#f0c040] truncate">{snapshot.time.date_string}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#0a0704] p-2 rounded-lg border border-[#5c3d1a]/50">
          <span className="text-lg">{snapshot.weather.icon}</span>
          <div>
            <div className="text-[9px] text-[#7a5f35] font-mono uppercase">Počasí v Kraji</div>
            <div className="font-bold text-amber-200 truncate">{snapshot.weather.name}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#0a0704] p-2 rounded-lg border border-[#5c3d1a]/50">
          <span className="text-lg">🐟</span>
          <div>
            <div className="text-[9px] text-[#7a5f35] font-mono uppercase">Církevní Řád</div>
            <div className="font-bold text-cyan-300 truncate">
              {snapshot.fast ? snapshot.fast.name_cs : 'Běžný den'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#0a0704] p-2 rounded-lg border border-[#5c3d1a]/50">
          <span className="text-lg">⚖️</span>
          <div>
            <div className="text-[9px] text-[#7a5f35] font-mono uppercase">Napětí v Kraji</div>
            <div className="font-bold text-red-400 font-mono">{snapshot.region.tension}%</div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-[#5c3d1a]/60 text-xs font-serif">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 uppercase tracking-wider cursor-pointer border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'overview'
              ? 'border-[#f0c040] text-[#f0c040] font-bold'
              : 'border-transparent text-[#7a5f35] hover:text-[#b5945a]'
          }`}
        >
          <Scroll className="w-3.5 h-3.5" />
          <span>Přehled & Poselství</span>
        </button>

        <button
          onClick={() => setActiveTab('actors')}
          className={`px-4 py-2 uppercase tracking-wider cursor-pointer border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'actors'
              ? 'border-[#f0c040] text-[#f0c040] font-bold'
              : 'border-transparent text-[#7a5f35] hover:text-[#b5945a]'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Aktéři Světa ({snapshot.actors.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('advisory')}
          className={`px-4 py-2 uppercase tracking-wider cursor-pointer border-b-2 transition-all flex items-center gap-1.5 relative ${
            activeTab === 'advisory'
              ? 'border-[#f0c040] text-[#f0c040] font-bold'
              : 'border-transparent text-[#7a5f35] hover:text-[#b5945a]'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>Krizové Události ({snapshot.advisory_events.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('chronicle')}
          className={`px-4 py-2 uppercase tracking-wider cursor-pointer border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'chronicle'
              ? 'border-[#f0c040] text-[#f0c040] font-bold'
              : 'border-transparent text-[#7a5f35] hover:text-[#b5945a]'
          }`}
        >
          <Radio className="w-3.5 h-3.5 text-emerald-400" />
          <span>Kronika Děje</span>
        </button>
      </div>

      {/* Tab Content Views */}
      {activeTab === 'overview' && (
        <div className="flex flex-col gap-4">
          {/* Abbot's Message */}
          <div className="bg-[#181109] border border-[#5c3d1a] rounded-xl p-4 flex flex-col md:flex-row items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0d0905] border border-[#f0c040]/40 flex items-center justify-center text-3xl shadow-inner shrink-0">
              {snapshot.abbot.portrait}
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="flex justify-between items-center">
                <h4 className="font-['Cinzel'] text-sm font-bold text-[#f0c040]">
                  {snapshot.abbot.name}
                </h4>
                <span className="text-[10px] font-mono bg-[#281c0f] text-[#b5945a] px-2 py-0.5 rounded border border-[#5c3d1a]">
                  Nálada: {snapshot.abbot.mood} · {snapshot.abbot.virtue}
                </span>
              </div>
              <p className="font-serif text-xs text-[#e8d5a3] leading-relaxed italic bg-[#0c0804] p-3 rounded-lg border border-[#5c3d1a]/50">
                "{snapshot.abbot.message}"
              </p>
            </div>
          </div>

          {/* Unlockable Sféra Chronicon Easter Egg Callout Banner */}
          <div className="bg-gradient-to-r from-cyan-950/60 via-[#161009] to-blue-950/60 border border-cyan-500/40 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-900/40 border border-cyan-400/50 flex items-center justify-center text-xl text-cyan-300">
                {isPortalUnlocked ? '🔮' : '🔒'}
              </div>
              <div>
                <h4 className="font-['Cinzel'] text-xs font-bold text-cyan-300">
                  {isPortalUnlocked ? 'Sféra Chronicon · Astrální Portál Odemčen!' : 'Sféra Chronicon · Skrytý Astrální Portál'}
                </h4>
                <p className="text-[11px] text-[#b5945a] font-serif">
                  {isPortalUnlocked
                    ? 'Máš přístup k dálnopisným transmisím Vnějších Bytostí a Archonů Času.'
                    : `Odemkni Tajnou Sféru uvařením 8 lektvarů (${brewedCount}/8) nebo splněním 3 úkolů (${questsCompletedCount}/3).`}
                </p>
              </div>
            </div>

            {isPortalUnlocked ? (
              <button
                onClick={onOpenPortal}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-serif text-xs font-bold transition-all shadow-[0_0_12px_rgba(6,182,212,0.4)] flex items-center gap-2 cursor-pointer shrink-0"
              >
                <span>Vstoupit do Sféry</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="flex items-center gap-2 text-xs font-mono text-[#7a5f35] bg-[#0c0905] px-3 py-1.5 rounded-lg border border-[#5c3d1a]">
                <Lock className="w-3.5 h-3.5 text-amber-500" />
                <span>Vyžaduje dosažení úroveň Alchymisty</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* World Actors Tab */}
      {activeTab === 'actors' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {snapshot.actors.map((actor) => (
            <div
              key={actor.id}
              className="bg-[#140e08] border border-[#5c3d1a] rounded-xl p-3.5 flex flex-col gap-2 hover:border-[#f0c040]/60 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-serif text-xs font-bold text-[#f0c040]">{actor.label}</h5>
                  <span className="text-[10px] text-[#7a5f35] font-serif">{actor.profession}</span>
                </div>
                <span className="bg-[#24170a] text-amber-300 border border-[#5c3d1a] text-[9px] font-mono px-2 py-0.5 rounded">
                  {actor.status}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-[#0c0804] p-2 rounded-lg border border-[#5c3d1a]/50">
                <div>
                  <span className="text-[#7a5f35]">Bohatství:</span>{' '}
                  <span className="text-amber-400 font-bold">{actor.wealth}g</span>
                </div>
                <div>
                  <span className="text-[#7a5f35]">Nálada:</span>{' '}
                  <span className="text-emerald-400 font-bold">{actor.mood}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Advisory Events Tab */}
      {activeTab === 'advisory' && (
        <div className="flex flex-col gap-3">
          {snapshot.advisory_events.map((ev) => {
            const isResolved = resolvedAdvisories[ev.id];

            return (
              <div
                key={ev.id}
                className="bg-[#181109] border border-amber-500/40 rounded-xl p-4 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{ev.icon}</span>
                  <div>
                    <h4 className="font-['Cinzel'] text-xs font-bold text-amber-300">{ev.title_cs}</h4>
                    <p className="text-xs font-serif text-[#e8d5a3] mt-1">{ev.text_cs}</p>
                  </div>
                </div>

                {ev.choices && !isResolved && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[#5c3d1a]/50">
                    {ev.choices.map((ch) => (
                      <button
                        key={ch.id}
                        onClick={() => handleAdvisoryChoice(ev.id, ch.id)}
                        className="px-3 py-1.5 bg-[#261a0c] hover:bg-[#382612] text-[#f0c040] border border-[#f0c040]/40 rounded-lg text-xs font-serif transition-all cursor-pointer"
                      >
                        {ch.label_cs}
                      </button>
                    ))}
                  </div>
                )}

                {isResolved && (
                  <div className="bg-emerald-950/40 border border-emerald-500/60 text-emerald-300 text-xs font-serif p-2 rounded-lg">
                    ✓ Rozhodnutí zaznamenáno v kronice kraje.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Chronicle Stream Tab */}
      {activeTab === 'chronicle' && (
        <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
          {snapshot.chronicle.map((item) => (
            <div
              key={item.id}
              className="bg-[#100b06] border border-[#5c3d1a]/60 rounded-lg p-2.5 flex justify-between items-center text-xs font-serif"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs">📜</span>
                <span className="text-[#e8d5a3]">{item.text}</span>
              </div>
              <span className="text-[10px] font-mono text-[#7a5f35] shrink-0 ml-2">{item.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
