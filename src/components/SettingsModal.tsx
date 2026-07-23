import React, { useState } from 'react';
import { X, Save, Upload, Download, RefreshCw, Palette, Info, Check, ShieldAlert } from 'lucide-react';
import { GameSaveData } from '../types';

export interface ThemeOption {
  id: string;
  name: string;
  description: string;
  bgMain: string;
  bgCard: string;
  borderColor: string;
  accentColor: string;
  textColor: string;
}

export const THEMES: ThemeOption[] = [
  {
    id: 'default',
    name: '🏰 Starobylá alchymie',
    description: 'Tradiční temná lékárenská atmosféra se zlatými detaily',
    bgMain: '#0a0704',
    bgCard: '#140e08',
    borderColor: '#5c3d1a',
    accentColor: '#c8961e',
    textColor: '#e8d5a3',
  },
  {
    id: 'black',
    name: '🖤 Temný Obsidián',
    description: 'Hluboká, nekompromisní černá pro moderní kontrast',
    bgMain: '#000000',
    bgCard: '#0a0a0a',
    borderColor: '#262626',
    accentColor: '#8c8c8c',
    textColor: '#e5e5e5',
  },
  {
    id: 'light',
    name: '📜 Světlý Pergamen',
    description: 'Čistý starodávný rukopis s jemným písmem a vyváženým kontrastem',
    bgMain: '#f6f1e5',
    bgCard: '#fdfbf7',
    borderColor: '#d4c2a8',
    accentColor: '#a36e1c',
    textColor: '#2e2318',
  },
  {
    id: 'blue',
    name: '🌌 Noční Hvězdárna',
    description: 'Sytý astrální modrý odstín podle noční oblohy',
    bgMain: '#060e24',
    bgCard: '#0e1c3e',
    borderColor: '#244280',
    accentColor: '#3b82f6',
    textColor: '#e0f2fe',
  },
  {
    id: 'spring',
    name: '🌿 Jarní Bylinářství',
    description: 'Čerstvé zelené tóny lesního herbáře a čerstvých bylin',
    bgMain: '#06180c',
    bgCard: '#0d2a16',
    borderColor: '#206038',
    accentColor: '#2ecc71',
    textColor: '#e8f8f0',
  },
  {
    id: 'summer',
    name: '☀️ Letní Slunovrat',
    description: 'Teplá zlatohnědá záře poledního slunce',
    bgMain: '#1e1103',
    bgCard: '#301c06',
    borderColor: '#784a14',
    accentColor: '#f59e0b',
    textColor: '#fef3c7',
  },
  {
    id: 'autumn',
    name: '🍂 Podzimní Hvozd',
    description: 'Syté oranžovo-hnědé odstíny padajícího listí a pryskyřic',
    bgMain: '#1c0d06',
    bgCard: '#30160b',
    borderColor: '#6e2d14',
    accentColor: '#ea580c',
    textColor: '#ffedd5',
  },
  {
    id: 'winter',
    name: '❄️ Zimní Mráz',
    description: 'Bohatý ledově modrý odstín se stříbrným a azurovým leskem',
    bgMain: '#0c1938',
    bgCard: '#152752',
    borderColor: '#335c9e',
    accentColor: '#38bdf8',
    textColor: '#f0f9ff',
  },
];

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: string;
  onSelectTheme: (themeId: string) => void;
  onQuickSave: () => void;
  onQuickLoad: () => void;
  onExportSave: () => void;
  onImportSave: (jsonText: string) => void;
  onResetGame: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
  onQuickSave,
  onQuickLoad,
  onExportSave,
  onImportSave,
  onResetGame,
}) => {
  const [activeTab, setActiveTab] = useState<'saveload' | 'theme' | 'info'>('saveload');
  const [importCode, setImportCode] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImportSubmit = () => {
    if (!importCode.trim()) {
      setImportError('Vlož kód uložené pozice.');
      return;
    }
    try {
      onImportSave(importCode.trim());
      setImportError(null);
      setShowImportBox(false);
      setImportCode('');
    } catch (err) {
      setImportError('Neplatný kód pozice!');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (text) {
          onImportSave(text);
          setImportError(null);
        }
      } catch (err) {
        setImportError('Chyba při čtení souboru.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-300 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#140e08] border-2 border-[#c8961e] rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto text-[#e8d5a3]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a1208] via-[#2a1b0c] to-[#1a1208] p-5 border-b border-[#5c3d1a] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#c8961e]/20 border border-[#c8961e] rounded-xl text-[#f0c040]">
              <Save className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#f0c040] tracking-wide">
                Nastavení hry & Ukládání
              </h2>
              <p className="text-xs text-[#b5945a] font-serif">
                Správa uložení, grafické motivy a informace o verzi
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

        {/* Tab switcher */}
        <div className="flex border-b border-[#5c3d1a] bg-[#1a1208]/80 px-4 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('saveload')}
            className={`px-4 py-2 text-xs font-serif font-bold uppercase tracking-wider rounded-t-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'saveload'
                ? 'bg-[#140e08] text-[#f0c040] border-t-2 border-x border-[#c8961e]'
                : 'text-[#7a5f35] hover:text-[#b5945a]'
            }`}
          >
            <Save className="w-3.5 h-3.5" /> 1. Uložit / Načíst
          </button>
          <button
            onClick={() => setActiveTab('theme')}
            className={`px-4 py-2 text-xs font-serif font-bold uppercase tracking-wider rounded-t-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'theme'
                ? 'bg-[#140e08] text-[#f0c040] border-t-2 border-x border-[#c8961e]'
                : 'text-[#7a5f35] hover:text-[#b5945a]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" /> 2. Grafické téma
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`px-4 py-2 text-xs font-serif font-bold uppercase tracking-wider rounded-t-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'info'
                ? 'bg-[#140e08] text-[#f0c040] border-t-2 border-x border-[#c8961e]'
                : 'text-[#7a5f35] hover:text-[#b5945a]'
            }`}
          >
            <Info className="w-3.5 h-3.5" /> 3. Verze & Info
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col gap-5 max-h-[65vh] overflow-y-auto">
          
          {/* TAB 1: SAVE / LOAD */}
          {activeTab === 'saveload' && (
            <div className="flex flex-col gap-4 font-serif">
              <div className="bg-black/30 p-4 rounded-xl border border-[#5c3d1a]/60">
                <h3 className="text-sm font-bold text-[#f0c040] mb-1 flex items-center gap-2">
                  <Save className="w-4 h-4" /> Rychlé ukládání do prohlížeče
                </h3>
                <p className="text-xs text-[#b5945a] leading-relaxed mb-3">
                  Tvá pozice se automaticky ukládá při každém vaření, ale zde můžeš okamžitě ručně uložit nebo načíst stávající stav.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={onQuickSave}
                    className="px-4 py-2 bg-gradient-to-r from-[#7a4a10] to-[#c8961e] hover:brightness-110 text-white text-xs font-bold rounded-lg cursor-pointer shadow transition-all flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" /> Uložit nyní
                  </button>
                  <button
                    onClick={onQuickLoad}
                    className="px-4 py-2 bg-[#2a1d0d] hover:bg-[#3d2a13] border border-[#5c3d1a] text-[#e8d5a3] text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" /> Načíst z paměti
                  </button>
                </div>
              </div>

              <div className="bg-black/30 p-4 rounded-xl border border-[#5c3d1a]/60">
                <h3 className="text-sm font-bold text-[#f0c040] mb-1 flex items-center gap-2">
                  <Download className="w-4 h-4" /> Export & Import pozice (Soubor / Kód)
                </h3>
                <p className="text-xs text-[#b5945a] leading-relaxed mb-3">
                  Ulož si soubor s pozicí do svého počítače nebo ho přenes na jiné zařízení.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <button
                    onClick={onExportSave}
                    className="px-4 py-2 bg-[#5c3d1a] hover:bg-[#7a4a10] text-white text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" /> Stáhnout JSON uložení
                  </button>

                  <label className="px-4 py-2 bg-[#2a1d0d] hover:bg-[#3d2a13] border border-[#5c3d1a] text-[#e8d5a3] text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-[#f0c040]" /> Nahrát ze souboru
                    <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                  </label>

                  <button
                    onClick={() => setShowImportBox(!showImportBox)}
                    className="px-3 py-2 bg-black/40 hover:bg-black/60 border border-[#5c3d1a] text-[#b5945a] text-xs rounded-lg cursor-pointer transition-all"
                  >
                    {showImportBox ? 'Skrýt textové pole' : 'Vložit kód textově'}
                  </button>
                </div>

                {showImportBox && (
                  <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-[#5c3d1a]/40">
                    <textarea
                      rows={3}
                      value={importCode}
                      onChange={(e) => setImportCode(e.target.value)}
                      placeholder="Vlož sem zkopírovaný JSON kód uložené pozice..."
                      className="w-full bg-[#120d07] border border-[#5c3d1a] rounded-lg p-2.5 text-xs text-[#e8d5a3] font-mono focus:outline-none focus:border-[#c8961e]"
                    />
                    {importError && (
                      <p className="text-xs text-red-400">{importError}</p>
                    )}
                    <button
                      onClick={handleImportSubmit}
                      className="self-start px-4 py-1.5 bg-[#c8961e] hover:bg-[#f0c040] text-black text-xs font-bold rounded-lg cursor-pointer transition-all"
                    >
                      Aplikovat vložený kód
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-red-950/20 p-4 rounded-xl border border-red-900/50">
                <h3 className="text-sm font-bold text-red-400 mb-1 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" /> Restartovat hru
                </h3>
                <p className="text-xs text-[#b5945a] leading-relaxed mb-3">
                  Smaže veškerý pokrok, zlato, objevené recepty a vrátí tě na začátek.
                </p>
                <button
                  onClick={onResetGame}
                  className="px-4 py-2 bg-red-900/80 hover:bg-red-800 text-white text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Smazat pozici a začít znovu
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: THEME SELECTOR */}
          {activeTab === 'theme' && (
            <div className="flex flex-col gap-4 font-serif">
              <p className="text-xs text-[#b5945a]">
                Vyber si grafický vzhled podle svého vkusu nebo ročního období:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {THEMES.map((t) => {
                  const isSelected = currentTheme === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => onSelectTheme(t.id)}
                      className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-2 relative ${
                        isSelected
                          ? 'border-[#f0c040] bg-[#1f160e] shadow-lg ring-2 ring-[#f0c040]/30'
                          : 'border-[#5c3d1a] bg-[#1a1208]/70 hover:border-[#c8961e]/60 hover:bg-[#22170b]'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                            {t.name}
                          </h4>
                          <p className="text-[10px] text-[#b5945a] mt-1 leading-normal">
                            {t.description}
                          </p>
                        </div>
                        {isSelected && (
                          <span className="p-1 bg-[#f0c040] text-black rounded-full shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </div>

                      {/* Color swatch preview */}
                      <div className="flex items-center gap-1.5 pt-2 border-t border-white/10">
                        <span className="text-[10px] text-[#7a5f35] mr-1">Paleta:</span>
                        <div className="w-4 h-4 rounded-full border border-white/20 shadow-inner" style={{ backgroundColor: t.bgMain }} title="Pozadí" />
                        <div className="w-4 h-4 rounded-full border border-white/20 shadow-inner" style={{ backgroundColor: t.bgCard }} title="Panel" />
                        <div className="w-4 h-4 rounded-full border border-white/20 shadow-inner" style={{ backgroundColor: t.borderColor }} title="Rámeček" />
                        <div className="w-4 h-4 rounded-full border border-white/20 shadow-inner" style={{ backgroundColor: t.accentColor }} title="Akcent" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: INFO & VERSION */}
          {activeTab === 'info' && (
            <div className="flex flex-col gap-4 font-serif">
              <div className="bg-black/40 p-5 rounded-xl border border-[#5c3d1a]/80 text-center flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-[#c8961e]/20 border border-[#c8961e] rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                  ⚗️
                </div>
                <h3 className="text-base font-bold text-[#f0c040]">
                  AlchemiX · Staročeská Alchymistická Laboratoř
                </h3>
                <span className="text-xs font-mono bg-[#c8961e]/20 text-[#f0c040] px-3 py-1 rounded-full border border-[#c8961e]/40 font-bold">
                  Verze v2.4.0 (GitHub Pages Build)
                </span>
                <p className="text-xs text-[#b5945a] max-w-md leading-relaxed mt-1">
                  Komplexní simulační hra středověké alchymie s procedurálním mícháním, humorální teorií čtyř živlů, historickými cechovními zakázkami a výzkumem.
                </p>
              </div>

              <div className="bg-[#1a1208] p-4 rounded-xl border border-[#5c3d1a] text-xs text-[#b5945a] flex flex-col gap-2">
                <div className="flex justify-between border-b border-[#5c3d1a]/40 pb-1.5">
                  <span>Autor & Design:</span>
                  <strong className="text-white">Ondrex / AlchemiX Team</strong>
                </div>
                <div className="flex justify-between border-b border-[#5c3d1a]/40 pb-1.5">
                  <span>Technologie:</span>
                  <strong className="text-white">React 18, Vite, Tailwind CSS</strong>
                </div>
                <div className="flex justify-between">
                  <span>Licence & Publikace:</span>
                  <strong className="text-white">GitHub Pages (Open Build)</strong>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#1a1208] border-t border-[#5c3d1a] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-[#7a4a10] to-[#c8961e] hover:brightness-110 text-white text-xs font-bold font-serif rounded-lg cursor-pointer transition-all"
          >
            Hotovo
          </button>
        </div>

      </div>
    </div>
  );
};
