import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Radio, Sparkles, Send, CheckCircle2, Clock, ShieldAlert, Award } from 'lucide-react';
import { CraftedPotionItem } from '../types';

export interface ChroniconMessage {
  id: string;
  sender: string;
  title: string;
  timestamp: string;
  body: string;
  requiredItemKey?: string;
  requiredItemName?: string;
  rewardGold?: number;
  rewardVigor?: number;
  rewardLoreNote?: string;
  isRead: boolean;
  isCompleted?: boolean;
  type: 'lore' | 'quest' | 'transmission' | 'paradox';
}

interface ChroniconPortalProps {
  messages: ChroniconMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChroniconMessage[]>>;
  potionInventory: Record<string, CraftedPotionItem>;
  setPotionInventory: React.Dispatch<React.SetStateAction<Record<string, CraftedPotionItem>>>;
  gold: number;
  setGold: React.Dispatch<React.SetStateAction<number>>;
  vigor: number;
  setVigor: React.Dispatch<React.SetStateAction<number>>;
  addNotification: (msg: string, type?: 'info' | 'success' | 'warn' | 'error') => void;
  temporalResonance: number; // 0-100%
  setTemporalResonance: React.Dispatch<React.SetStateAction<number>>;
}

export const ChroniconPortal: React.FC<ChroniconPortalProps> = ({
  messages,
  setMessages,
  potionInventory,
  setPotionInventory,
  gold,
  setGold,
  vigor,
  setVigor,
  addNotification,
  temporalResonance,
  setTemporalResonance,
}) => {
  const [activeMessageId, setActiveMessageId] = useState<string | null>(
    messages.length > 0 ? messages[0].id : null
  );
  const [transmitting, setTransmitting] = useState<boolean>(false);

  const activeMsg = messages.find((m) => m.id === activeMessageId) || messages[0];

  const handleMarkAsRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isRead: true } : m))
    );
  };

  const handleCompleteQuest = (msg: ChroniconMessage) => {
    if (!msg.requiredItemKey) return;

    // Find if potion exists in inventory
    const pEntry = (Object.entries(potionInventory) as [string, CraftedPotionItem][]).find(
      ([key, p]) => (key === msg.requiredItemKey || p.id === msg.requiredItemKey) && p.count > 0
    );

    if (!pEntry) {
      addNotification(`Nemáš v zásobení požadovaný odvar "${msg.requiredItemName || 'Požadovaný odvar'}"!`, 'warn');
      return;
    }

    setTransmitting(true);

    setTimeout(() => {
      // Consume item
      setPotionInventory((prev) => {
        const next = { ...prev };
        const [key, item] = pEntry;
        if (item.count <= 1) delete next[key];
        else next[key] = { ...item, count: item.count - 1 };
        return next;
      });

      // Grant rewards
      if (msg.rewardGold) setGold((g) => g + msg.rewardGold!);
      if (msg.rewardVigor) setVigor((v) => Math.min(100, v + msg.rewardVigor!));
      setTemporalResonance((r) => Math.min(100, r + 15));

      // Mark completed
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, isCompleted: true, isRead: true } : m))
      );

      setTransmitting(false);
      addNotification(`🌌 TRANSMISE USPĚLA! Vnější entita "${msg.sender}" přijala tvou esenci.`, 'success');
    }, 1500);
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="bg-[#0f0c08]/95 border border-[#5c3d1a] rounded-2xl p-5 flex flex-col gap-5 shadow-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-[#5c3d1a]/80 pb-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-950/60 border border-cyan-500/50 flex items-center justify-center text-2xl text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-pulse">
            🔮
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-['Cinzel'] text-base font-bold text-cyan-300 tracking-wider">
                Sféra Chronicon · Astrální Portál
              </h3>
              {unreadCount > 0 && (
                <span className="bg-cyan-500 text-black font-bold text-[10px] px-2 py-0.5 rounded-full animate-bounce">
                  {unreadCount} Nová transmise
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#b5945a] font-serif">
              Komunikační kanál s Vnějšími Bytostmi, Archony Času a Astrálními Tkálci.
            </p>
          </div>
        </div>

        {/* Temporal Resonance Gauge & GitHub Link */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end bg-[#181109] border border-[#5c3d1a] px-3 py-1.5 rounded-xl">
            <span className="text-[9px] text-[#7a5f35] font-serif uppercase tracking-wider flex items-center gap-1">
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" /> Astrální Rezonance
            </span>
            <span className="font-mono text-xs font-bold text-cyan-400">
              {temporalResonance}%
            </span>
          </div>

          <a
            href="https://github.com/ondrex-ember/chronicon"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white font-serif text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            title="Otevřít oficiální repozitář Projektu Chronicon na GitHubu"
          >
            <span>📜 Projekt Chronicon</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Grid: Messages Inbox + Message Viewer */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 min-h-[380px]">
        {/* Inbox List Column */}
        <div className="md:col-span-5 bg-[#140e08] border border-[#5c3d1a] rounded-xl p-3 flex flex-col gap-2 max-h-[420px] overflow-y-auto">
          <div className="text-[10px] text-[#7a5f35] font-serif uppercase tracking-widest px-1 pb-1 border-b border-[#5c3d1a]/50 flex justify-between">
            <span>Příchozí Transmise ({messages.length})</span>
            <span>Časové Razítko</span>
          </div>

          {messages.map((msg) => {
            const isSelected = activeMsg?.id === msg.id;

            return (
              <div
                key={msg.id}
                onClick={() => {
                  setActiveMessageId(msg.id);
                  handleMarkAsRead(msg.id);
                }}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col gap-1.5 relative overflow-hidden ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-500/80 text-white shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                    : msg.isRead
                    ? 'bg-[#1a1208] border-[#5c3d1a]/60 text-[#b5945a] hover:bg-[#22170b]'
                    : 'bg-[#21160a] border-cyan-500/40 text-cyan-200 hover:border-cyan-400 shadow-sm'
                }`}
              >
                {!msg.isRead && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                )}

                <div className="flex justify-between items-center text-[10px] font-mono text-[#7a5f35]">
                  <span className="font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                    {msg.type === 'quest' ? '🔮 Požadavek' : msg.type === 'paradox' ? '⚠️ Paradox' : '📜 Poselství'}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>

                <h4 className="font-serif text-xs font-bold text-white truncate">
                  {msg.title}
                </h4>

                <div className="flex justify-between items-center text-[10px] font-serif text-[#8a6f45]">
                  <span className="italic">Od: {msg.sender}</span>
                  {msg.isCompleted && (
                    <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3" /> Vyřízeno
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Viewer Column */}
        <div className="md:col-span-7 bg-[#140e08] border border-[#5c3d1a] rounded-xl p-4 flex flex-col justify-between gap-4 relative">
          {activeMsg ? (
            <div className="flex flex-col gap-4">
              {/* Message Header */}
              <div className="border-b border-[#5c3d1a]/80 pb-3 flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-widest block mb-0.5">
                    Transmise #{activeMsg.id} · Sender: {activeMsg.sender}
                  </span>
                  <h3 className="font-['Cinzel'] text-sm font-bold text-[#f0c040]">
                    {activeMsg.title}
                  </h3>
                </div>
                <span className="text-[10px] text-[#7a5f35] font-mono bg-[#0a0704] px-2 py-1 rounded border border-[#5c3d1a]">
                  {activeMsg.timestamp}
                </span>
              </div>

              {/* Message Body */}
              <div className="font-serif text-xs text-[#e8d5a3] leading-relaxed bg-[#0c0905] p-3.5 rounded-xl border border-[#5c3d1a]/50 whitespace-pre-line max-h-56 overflow-y-auto">
                {activeMsg.body}
              </div>

              {/* Quest Item Requirement & Transmission Panel */}
              {activeMsg.requiredItemKey && (
                <div className="bg-[#1c130a] border border-cyan-500/40 p-3.5 rounded-xl flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-[#7a5f35] uppercase font-bold tracking-wider block">
                        Požadovaná Astrální Esence:
                      </span>
                      <h5 className="font-serif text-xs font-bold text-cyan-300">
                        {activeMsg.requiredItemName}
                      </h5>
                    </div>
                    <div className="text-right text-[10px] font-mono text-[#f0c040]">
                      {activeMsg.rewardGold && <div>+ {activeMsg.rewardGold} Zlaťáků</div>}
                      {activeMsg.rewardVigor && <div>+ {activeMsg.rewardVigor} Vigor</div>}
                    </div>
                  </div>

                  {activeMsg.isCompleted ? (
                    <div className="bg-emerald-950/60 border border-emerald-500/80 text-emerald-300 p-2.5 rounded-lg text-xs font-serif text-center font-bold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Transmise byla úspěšně odeslána a odměna připsána!</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleCompleteQuest(activeMsg)}
                      disabled={transmitting}
                      className={`w-full py-2.5 rounded-xl font-serif text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        transmitting
                          ? 'bg-cyan-900/50 text-cyan-200 border border-cyan-500'
                          : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:brightness-110 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      }`}
                    >
                      {transmitting ? (
                        <span>📡 Vysílání esence do Sféry Chronicon...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Odeslat {activeMsg.requiredItemName} do Astrální Sféry</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-xs text-[#7a5f35] font-serif italic">
              Vyber transmisi z přehledu vlevo.
            </div>
          )}

          {/* Chronicon Repository Lore Callout Footer */}
          <div className="bg-[#090704] border border-[#5c3d1a]/80 p-3 rounded-xl flex items-center justify-between text-[11px] font-serif text-[#b5945a]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>
                Více o mystériích Vnější Sféry nalezneš v oficiálním manuscriptu{' '}
                <strong className="text-cyan-300">Chronicon Project</strong>.
              </span>
            </div>
            <a
              href="https://github.com/ondrex-ember/chronicon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 underline hover:text-cyan-200 font-bold ml-2 whitespace-nowrap"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
