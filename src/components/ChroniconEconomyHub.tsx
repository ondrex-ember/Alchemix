import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Scroll, Users, ShieldAlert, ShoppingBag, TrendingUp, Sun, CloudRain, CheckCircle2, Coins, ArrowRight, RefreshCw, Award } from 'lucide-react';
import { ChroniconSnapshot, ChroniconActor } from '../data/chroniconSnapshot';
import { CraftedPotionItem } from '../types';

interface ChroniconEconomyHubProps {
  snapshot: ChroniconSnapshot;
  setSnapshot: React.Dispatch<React.SetStateAction<ChroniconSnapshot>>;
  gold: number;
  setGold: React.Dispatch<React.SetStateAction<number>>;
  vigor: number;
  setVigor: React.Dispatch<React.SetStateAction<number>>;
  potionInventory: Record<string, CraftedPotionItem>;
  setPotionInventory: React.Dispatch<React.SetStateAction<Record<string, CraftedPotionItem>>>;
  addNotification: (msg: string, type?: 'info' | 'success' | 'warn' | 'error') => void;
}

export const ChroniconEconomyHub: React.FC<ChroniconEconomyHubProps> = ({
  snapshot,
  setSnapshot,
  gold,
  setGold,
  vigor,
  setVigor,
  potionInventory,
  setPotionInventory,
  addNotification,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'actors' | 'region' | 'abbot'>('orders');
  const [fulfilledOrders, setFulfilledOrders] = useState<Record<string, boolean>>({});

  const socioOrders = [
    {
      id: 'ord-abbot-1',
      actorId: 'monastery',
      actorName: snapshot.actors.find(a => a.id === 'monastery')?.label || 'Klášter Athanor',
      title: 'Zásoba Léčivých Odvarů pro Scriptorium',
      description: 'Opat Hieronymus vyžaduje 2x Léčivý lektvar k ošetření nemocných bratří po celodenním opisování starých rukopisů.',
      requiredItemKey: 'REC01',
      requiredItemName: 'Léčivý lektvar',
      requiredCount: 2,
      rewardGold: 180,
      rewardMood: +5,
    },
    {
      id: 'ord-valach-2',
      actorId: 'valach',
      actorName: snapshot.actors.find(a => a.id === 'valach')?.label || 'Valach Ondra',
      title: 'Elixír Vigorizátu pro Horské Cesty',
      description: 'Valach Ondra chystá karavanu přes hvozdy a potřebuje 1x Vigorizující extrakt proti vyčerpání.',
      requiredItemKey: 'REC02',
      requiredItemName: 'Vigorizující extrakt',
      requiredCount: 1,
      rewardGold: 140,
      rewardMood: +8,
    },
    {
      id: 'ord-inkv-3',
      actorId: 'inkvizitor',
      actorName: snapshot.actors.find(a => a.id === 'inkvizitor')?.label || 'Inkvizitor Kolda',
      title: 'Test Pravdy a Očisty (Protijed)',
      description: 'Inkvizitor podezírá poddané z kacířství a žádá 1x Protijed/Antidotum k ověření čistoty krevního oběhu.',
      requiredItemKey: 'REC03',
      requiredItemName: 'Očistný protijed',
      requiredCount: 1,
      rewardGold: 260,
      rewardMood: -5,
    },
    {
      id: 'ord-vesnicane-4',
      actorId: 'vesnicane',
      actorName: snapshot.actors.find(a => a.id === 'vesnicane')?.label || 'Lid z podhradí',
      title: 'Mělká Epidemická Podpora',
      description: `Vesničané sužovaní chladným počasím (${snapshot.weather.name}) poptávají 3x Slabší posilující kapky.`,
      requiredItemKey: 'REC04',
      requiredItemName: 'Posilující kapky',
      requiredCount: 3,
      rewardGold: 210,
      rewardMood: +12,
    },
  ];

  const handleFulfillOrder = (ord: typeof socioOrders[0]) => {
    const pEntry = (Object.entries(potionInventory) as [string, CraftedPotionItem][]).find(
      ([key, p]) => (key === ord.requiredItemKey || p.id === ord.requiredItemKey) && p.count >= ord.requiredCount
    );

    if (!pEntry) {
      addNotification(`Nemáš dostatek (${ord.requiredCount}x) předmětu "${ord.requiredItemName}" v inventáři!`, 'warn');
      return;
    }

    const [key, item] = pEntry;

    setPotionInventory((prev) => {
      const next = { ...prev };
      if (item.count <= ord.requiredCount) delete next[key];
      else next[key] = { ...item, count: item.count - ord.requiredCount };
      return next;
    });

    const weatherMult = snapshot.weather.modifier_grain || 1.0;
    const finalReward = Math.round(ord.rewardGold * weatherMult);

    setGold((g) => g + finalReward);
    setVigor((v) => Math.min(100, v + 10));
    setFulfilledOrders((prev) => ({ ...prev, [ord.id]: true }));

    setSnapshot((prev) => ({
      ...prev,
      actors: prev.actors.map((a) => {
        if (a.id === ord.actorId) {
          return {
            ...a,
            wealth: a.wealth + Math.round(finalReward * 0.5),
            mood: Math.min(100, Math.max(0, a.mood + ord.rewardMood)),
            status: 'Zásoben alchymistou',
          };
        }
        return a;
      }),
    }));

    addNotification(`📜 Zakázka splněna pro "${ord.actorName}"! Získal jsi +${finalReward} Zlaťáků.`, 'success');
  };

  return (
    <div className="bg-[#0f0b07]/95 border border-[#5c3d1a] rounded-2xl p-5 flex flex-col gap-5 shadow-2xl relative overflow-hidden text-[#e8d5a3]">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-[#5c3d1a]/80 pb-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#1c130a] border border-[#f0c040]/50 flex items-center justify-center text-2xl text-[#f0c040] shadow-[0_0_15px_rgba(240,192,64,0.2)]">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-['Cinzel'] text-base font-bold text-[#f0c040] tracking-wider">
                Chronicon Socioekonomický Systém & Zakázky
              </h3>
              <span className="bg-[#2a1a0a] border border-[#5c3d1a] text-[#b5945a] font-mono text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Živý Trh Athanor II
              </span>
            </div>
            <p className="text-[11px] text-[#b5945a] font-serif">
              Ekonomické zakázky, poptávka panství, aktuální počasí ({snapshot.weather.name}) a vztahy s aktéry.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#140e08] border border-[#5c3d1a] px-3 py-2 rounded-xl text-xs font-serif">
          <span className="text-xl">{snapshot.weather.icon}</span>
          <div>
            <div className="text-[9px] text-[#7a5f35] font-mono uppercase">Vliv Počasí na Trh</div>
            <div className="font-bold text-amber-200">
              Obilí: {snapshot.weather.modifier_grain}x | Dřevo: {snapshot.weather.modifier_wood}x
            </div>
          </div>
        </div>
      </div>

      <div className="flex border-b border-[#5c3d1a]/60 text-xs font-serif">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 uppercase tracking-wider cursor-pointer border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'orders'
              ? 'border-[#f0c040] text-[#f0c040] font-bold'
              : 'border-transparent text-[#7a5f35] hover:text-[#b5945a]'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Panství & Poptávka Zakázek ({socioOrders.length})</span>
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
          <span>Demografie Aktérů ({snapshot.actors.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('region')}
          className={`px-4 py-2 uppercase tracking-wider cursor-pointer border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'region'
              ? 'border-[#f0c040] text-[#f0c040] font-bold'
              : 'border-transparent text-[#7a5f35] hover:text-[#b5945a]'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
          <span>Regionální Stav & Církev</span>
        </button>

        <button
          onClick={() => setActiveTab('abbot')}
          className={`px-4 py-2 uppercase tracking-wider cursor-pointer border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'abbot'
              ? 'border-[#f0c040] text-[#f0c040] font-bold'
              : 'border-transparent text-[#7a5f35] hover:text-[#b5945a]'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>Poselství Opata</span>
        </button>
      </div>

      {activeTab === 'orders' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socioOrders.map((ord) => {
            const isFulfilled = fulfilledOrders[ord.id];

            return (
              <div
                key={ord.id}
                className={`border rounded-xl p-4 flex flex-col justify-between gap-3 transition-all ${
                  isFulfilled
                    ? 'bg-emerald-950/20 border-emerald-500/40 opacity-80'
                    : 'bg-[#140e08] border-[#5c3d1a] hover:border-[#f0c040]/60'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-[#7a5f35] font-mono uppercase tracking-wider block mb-0.5">
                      Zadavatel: {ord.actorName}
                    </span>
                    <h4 className="font-['Cinzel'] text-xs font-bold text-[#f0c040]">
                      {ord.title}
                    </h4>
                  </div>
                  <span className="bg-[#24170a] text-amber-300 border border-[#5c3d1a] text-xs font-mono px-2 py-1 rounded font-bold flex items-center gap-1">
                    <Coins className="w-3 h-3 text-amber-400" />
                    +{Math.round(ord.rewardGold * (snapshot.weather.modifier_grain || 1))}g
                  </span>
                </div>

                <p className="font-serif text-xs text-[#e8d5a3] leading-relaxed bg-[#0c0804] p-2.5 rounded-lg border border-[#5c3d1a]/50">
                  {ord.description}
                </p>

                <div className="flex justify-between items-center pt-2 border-t border-[#5c3d1a]/60">
                  <div className="text-[11px] font-serif text-amber-300 flex items-center gap-1">
                    <span>Požadováno:</span>
                    <strong className="text-white">
                      {ord.requiredCount}x {ord.requiredItemName}
                    </strong>
                  </div>

                  {isFulfilled ? (
                    <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Splněno
                    </span>
                  ) : (
                    <button
                      onClick={() => handleFulfillOrder(ord)}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-[#c8961e] to-[#7a4a10] hover:brightness-110 text-white rounded-lg font-serif text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Dodat Zakázku</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

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

              <div className="grid grid-cols-3 gap-2 text-[10px] font-mono bg-[#0c0804] p-2 rounded-lg border border-[#5c3d1a]/50 text-center">
                <div>
                  <div className="text-[#7a5f35]">Zlato</div>
                  <div className="text-amber-400 font-bold">{actor.wealth}g</div>
                </div>
                <div>
                  <div className="text-[#7a5f35]">Nálada</div>
                  <div className="text-emerald-400 font-bold">{actor.mood}%</div>
                </div>
                <div>
                  <div className="text-[#7a5f35]">Zásoby</div>
                  <div className="text-cyan-300 font-bold">{actor.stores}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'region' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#140e08] border border-[#5c3d1a] rounded-xl p-4 flex flex-col gap-3">
            <h4 className="font-['Cinzel'] text-xs font-bold text-[#f0c040] border-b border-[#5c3d1a] pb-2">
              Regionální Ukazatele Panství
            </h4>
            <div className="flex flex-col gap-2 text-xs font-serif">
              <div className="flex justify-between bg-[#0c0804] p-2 rounded border border-[#5c3d1a]/50">
                <span className="text-[#7a5f35]">Celkové napětí v kraji:</span>
                <span className="font-mono font-bold text-red-400">{snapshot.region.tension}%</span>
              </div>
              <div className="flex justify-between bg-[#0c0804] p-2 rounded border border-[#5c3d1a]/50">
                <span className="text-[#7a5f35]">Zlatý věk panství:</span>
                <span className="font-mono font-bold text-amber-400">{snapshot.region.goldenAge ? 'Aktivní 🌟' : 'Neaktivní'}</span>
              </div>
              <div className="flex justify-between bg-[#0c0804] p-2 rounded border border-[#5c3d1a]/50">
                <span className="text-[#7a5f35]">Pohřební obřady (Hřbitov):</span>
                <span className="font-mono font-bold text-cyan-300">{snapshot.region.totalFuneralEvents}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#140e08] border border-[#5c3d1a] rounded-xl p-4 flex flex-col gap-3">
            <h4 className="font-['Cinzel'] text-xs font-bold text-[#f0c040] border-b border-[#5c3d1a] pb-2">
              Církevní Kalendář & Půst
            </h4>
            <div className="flex flex-col gap-2 text-xs font-serif">
              <div className="flex justify-between bg-[#0c0804] p-2 rounded border border-[#5c3d1a]/50">
                <span className="text-[#7a5f35]">Aktuální den:</span>
                <span className="font-mono font-bold text-white">{snapshot.time.date_string}</span>
              </div>
              <div className="flex justify-between bg-[#0c0804] p-2 rounded border border-[#5c3d1a]/50">
                <span className="text-[#7a5f35]">Postní řád:</span>
                <span className="font-mono font-bold text-amber-300">
                  {snapshot.fast ? snapshot.fast.name_cs : 'Běžný liturgický den'}
                </span>
              </div>
              <div className="flex justify-between bg-[#0c0804] p-2 rounded border border-[#5c3d1a]/50">
                <span className="text-[#7a5f35]">Svátek (Feast):</span>
                <span className="font-mono font-bold text-emerald-300">
                  {snapshot.feast ? snapshot.feast.name_cs : 'Žádný hlavní svátek'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'abbot' && (
        <div className="bg-[#181109] border border-[#5c3d1a] rounded-xl p-5 flex flex-col md:flex-row items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#0d0905] border border-[#f0c040]/50 flex items-center justify-center text-4xl shadow-inner shrink-0">
            {snapshot.abbot.portrait}
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex justify-between items-center">
              <h4 className="font-['Cinzel'] text-sm font-bold text-[#f0c040]">
                {snapshot.abbot.name}
              </h4>
              <span className="text-[10px] font-mono bg-[#281c0f] text-[#b5945a] px-2.5 py-1 rounded border border-[#5c3d1a]">
                Nálada: {snapshot.abbot.mood} · Cnost: {snapshot.abbot.virtue}
              </span>
            </div>
            <p className="font-serif text-xs text-[#e8d5a3] leading-relaxed italic bg-[#0c0804] p-4 rounded-xl border border-[#5c3d1a]/60">
              "{snapshot.abbot.message}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
