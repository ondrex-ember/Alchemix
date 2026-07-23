// Chronicon World State Snapshot Data structure matching github.com/ondrex-ember/chronicon
export interface ChroniconActor {
  id: string;
  label: string;
  profession: string;
  wealth: number;
  mood: number;
  stores: number;
  status: string;
}

export interface ChroniconAdvisoryEvent {
  id: string;
  icon: string;
  title_cs: string;
  title_en?: string;
  text_cs: string;
  text_en?: string;
  probost_only?: boolean;
  choices?: { id: string; label_cs: string; label_en?: string }[];
}

export interface ChroniconSnapshot {
  version: number;
  generated: string;
  valid_until: string;
  abbot: {
    name: string;
    mood: string;
    virtue: string;
    portrait: string;
    scrinium_open: boolean;
    message: string;
    message_en?: string;
  };
  unlockFlags: string[];
  feast: { name_cs: string; name_en?: string } | null;
  fast: { active: boolean; name_cs: string; name_en?: string } | null;
  weather: {
    key: string;
    name: string;
    icon: string;
    desc: string;
    season: number;
    modifier_grain: number;
    modifier_wood: number;
  };
  time: {
    year: number;
    season: number;
    season_name: string;
    season_icon: string;
    day: number;
    total_tick: number;
    date_string: string;
  };
  actors: ChroniconActor[];
  region: {
    tension: number;
    goldenAge: boolean;
    totalFuneralEvents: number;
  };
  advisory_events: ChroniconAdvisoryEvent[];
  chronicle: {
    id: string;
    text: string;
    time: string;
    source: string;
  }[];
}

export const initialChroniconSnapshot: ChroniconSnapshot = {
  version: 2,
  generated: new Date().toISOString(),
  valid_until: new Date(Date.now() + 7 * 86400000).toISOString(),
  abbot: {
    name: 'Opat Hieronymus z Athanoru',
    mood: 'Rozjímavá',
    virtue: 'Pobožnost & Štědrost',
    portrait: '⛪',
    scrinium_open: true,
    message: 'Náš klášter Athanor II stojí pevně v turbulentních časech. Alchymisto v dílně, tvé elixíry chrání bratry před morem a mrazem.',
    message_en: 'Our monastery Athanor II stands firm in turbulent times. Alchemist in the workshop, your elixirs protect the brothers from plague and chill.',
  },
  unlockFlags: ['ATHANOR_FOUNDATION', 'ALCHEMY_WORKSHOP_LEVEL_1', 'CHRONICON_PORTAL_SEED'],
  feast: null,
  fast: {
    active: true,
    name_cs: 'Postní pátková doba',
    name_en: 'Fasting Friday',
  },
  weather: {
    key: 'misty_rain',
    name: 'Mlžný déšť & Chlad',
    icon: '🌧️',
    desc: 'Hustá mlha se valí z močálů k hradbám kláštera Athanor. Bylinky schnou pomaleji, avšak vzácný mech vzkvétá.',
    season: 1,
    modifier_grain: 0.9,
    modifier_wood: 1.2,
  },
  time: {
    year: 1426,
    season: 1,
    season_name: 'Jaro',
    season_icon: '🌱',
    day: 14,
    total_tick: 4820,
    date_string: '14. Duben 1426, Anno Domini',
  },
  actors: [
    { id: 'monastery', label: 'Klášter Athanor II', profession: 'Duchovenstvo & Scriptorium', wealth: 1850, mood: 82, stores: 450, status: 'Vzkvétá' },
    { id: 'inkvizitor', label: 'Inkvizitor Kolda', profession: 'Církevní dohled', wealth: 1200, mood: 45, stores: 200, status: 'Slídící' },
    { id: 'valach', label: 'Valach Ondra z Hvozdu', profession: 'Kupec & Bylinář', wealth: 640, mood: 78, stores: 310, status: 'Obchoduje' },
    { id: 'vesnicane', label: 'Lid z podhradí', profession: 'Poddaní & Řemeslníci', wealth: 320, mood: 60, stores: 180, status: 'Obavy z moru' },
    { id: 'alchemix', label: 'Dílna Alchemix (Ty)', profession: 'Mistr Alchymie', wealth: 500, mood: 90, stores: 120, status: 'Vaří elixíry' },
  ],
  region: {
    tension: 38,
    goldenAge: false,
    totalFuneralEvents: 3,
  },
  advisory_events: [
    {
      id: 'chronicon_regional_plague',
      icon: '☣️',
      title_cs: 'Zprávy o moru v kraji pod Athanorem',
      text_cs: 'Z okolních vesnic přicházejí znepokojivé zprávy — vypukla morová nákaza. Poptávka po Léčivých lektvarech a Protijedu stoupla o +100%!',
      choices: [
        { id: 'bolster', label_cs: 'Darovat elixíry chudým (Zvýší reputaci)' },
        { id: 'ignore', label_cs: 'Prodávat za trojnásobnou cenu (Zisk)' },
      ],
    },
  ],
  chronicle: [
    { id: 'log-1', text: 'Inkvizice prohledávala západní hranici panství. Žádné kacířství nenalezeno.', time: 'před 2 hodinami', source: 'distant_events' },
    { id: 'log-2', text: 'Klášterní Scriptorium dokončilo novou kapitolu v Kronice Athanoru.', time: 'před 5 hodinami', source: 'monastery_internal' },
    { id: 'log-3', text: 'Valach Ondra přivezl čerstvý horský mech a vzácné pryskyřice.', time: 'před 8 hodinami', source: 'local_events' },
  ],
};
