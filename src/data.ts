import {
  Ingredient,
  Recipe,
  Food,
  Customer,
  ForageLocation,
  Upgrade,
  AilmentInfo,
  Season,
  BartexOffer,
  TechNode
} from './types';

export const INGREDIENTS: Ingredient[] = [
  {
    "id": "ING01",
    "name_lat": "Aqua",
    "name_cz": "Voda",
    "type": "Liquid",
    "thermal": -2,
    "moisture": 4,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "solvent",
      "base"
    ],
    "price": 1,
    "shelf_days": 0,
    "color": "#5dade2"
  },
  {
    "id": "ING02",
    "name_lat": "Vinum",
    "name_cz": "Víno",
    "type": "Liquid",
    "thermal": 2,
    "moisture": 2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "solvent",
      "warming",
      "base"
    ],
    "price": 3,
    "shelf_days": 180,
    "color": "#922b21"
  },
  {
    "id": "ING03",
    "name_lat": "Acetum",
    "name_cz": "Ocet",
    "type": "Liquid",
    "thermal": -2,
    "moisture": -2,
    "toxicity": 5,
    "potency": 1,
    "tags": [
      "astringent",
      "preservative"
    ],
    "price": 2,
    "shelf_days": 365,
    "color": "#f4d03f"
  },
  {
    "id": "ING04",
    "name_lat": "Mel",
    "name_cz": "Med",
    "type": "Liquid",
    "thermal": 2,
    "moisture": 2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "base",
      "sweet",
      "preservative"
    ],
    "price": 4,
    "shelf_days": 365,
    "color": "#d4a843"
  },
  {
    "id": "ING05",
    "name_lat": "Oleum Olivae",
    "name_cz": "Olivový olej",
    "type": "Liquid",
    "thermal": 1,
    "moisture": 2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "base",
      "ointment",
      "carrier"
    ],
    "price": 5,
    "shelf_days": 180,
    "color": "#a8b820"
  },
  {
    "id": "ING06",
    "name_lat": "Papaver somniferum",
    "name_cz": "Mák setý",
    "type": "Herb",
    "thermal": -4,
    "moisture": -2,
    "toxicity": 40,
    "potency": 3,
    "tags": [
      "sedative",
      "analgesic",
      "narcotic"
    ],
    "price": 15,
    "shelf_days": 365,
    "color": "#e8a0b4"
  },
  {
    "id": "ING07",
    "name_lat": "Mandragora officinarum",
    "name_cz": "Mandragora",
    "type": "Herb",
    "thermal": -4,
    "moisture": -3,
    "toxicity": 70,
    "potency": 4,
    "tags": [
      "narcotic",
      "sedative",
      "rare"
    ],
    "price": 40,
    "shelf_days": 180,
    "color": "#8b4513"
  },
  {
    "id": "ING08",
    "name_lat": "Hyoscyamus niger",
    "name_cz": "Blín černý",
    "type": "Herb",
    "thermal": -4,
    "moisture": -3,
    "toxicity": 60,
    "potency": 4,
    "tags": [
      "narcotic",
      "sedative"
    ],
    "price": 25,
    "shelf_days": 180,
    "color": "#5d6d7e"
  },
  {
    "id": "ING09",
    "name_lat": "Belladonna",
    "name_cz": "Rulík zlomocný",
    "type": "Herb",
    "thermal": -4,
    "moisture": -4,
    "toxicity": 85,
    "potency": 4,
    "tags": [
      "poison",
      "narcotic",
      "rare"
    ],
    "price": 50,
    "shelf_days": 90,
    "color": "#1a0033"
  },
  {
    "id": "ING10",
    "name_lat": "Salix alba",
    "name_cz": "Vrbová kůra",
    "type": "Herb",
    "thermal": -2,
    "moisture": -3,
    "toxicity": 5,
    "potency": 2,
    "tags": [
      "analgesic",
      "anti-fever"
    ],
    "price": 6,
    "shelf_days": 365,
    "color": "#a8c090"
  },
  {
    "id": "ING11",
    "name_lat": "Aloe vera",
    "name_cz": "Aloe",
    "type": "Herb",
    "thermal": -2,
    "moisture": 2,
    "toxicity": 10,
    "potency": 2,
    "tags": [
      "healing",
      "cooling",
      "purgative"
    ],
    "price": 8,
    "shelf_days": 60,
    "color": "#7dbd8a"
  },
  {
    "id": "ING12",
    "name_lat": "Chelidonium majus",
    "name_cz": "Vlaštovičník",
    "type": "Herb",
    "thermal": 3,
    "moisture": -3,
    "toxicity": 30,
    "potency": 3,
    "tags": [
      "liver",
      "bitter",
      "toxic"
    ],
    "price": 10,
    "shelf_days": 90,
    "color": "#f1c40f"
  },
  {
    "id": "ING13",
    "name_lat": "Valeriana officinalis",
    "name_cz": "Kozlík lékařský",
    "type": "Herb",
    "thermal": 2,
    "moisture": 1,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "sedative",
      "calming"
    ],
    "price": 8,
    "shelf_days": 180,
    "color": "#d7bde2"
  },
  {
    "id": "ING14",
    "name_lat": "Allium sativum",
    "name_cz": "Česnek",
    "type": "Herb",
    "thermal": 4,
    "moisture": -4,
    "toxicity": 0,
    "potency": 3,
    "tags": [
      "warming",
      "antiseptic",
      "anti-poison"
    ],
    "price": 3,
    "shelf_days": 90,
    "color": "#f8f9fa"
  },
  {
    "id": "ING15",
    "name_lat": "Euphrasia",
    "name_cz": "Světlík",
    "type": "Herb",
    "thermal": 1,
    "moisture": -2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "eye",
      "cooling"
    ],
    "price": 5,
    "shelf_days": 90,
    "color": "#a9cce3"
  },
  {
    "id": "ING16",
    "name_lat": "Rosmarinus",
    "name_cz": "Rozmarýn",
    "type": "Herb",
    "thermal": 3,
    "moisture": -2,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "memory",
      "warming",
      "aromatic"
    ],
    "price": 4,
    "shelf_days": 180,
    "color": "#6b8e23"
  },
  {
    "id": "ING17",
    "name_lat": "Salvia",
    "name_cz": "Šalvěj",
    "type": "Herb",
    "thermal": 2,
    "moisture": -2,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "healing",
      "aromatic",
      "astringent"
    ],
    "price": 4,
    "shelf_days": 180,
    "color": "#7d9e4e"
  },
  {
    "id": "ING18",
    "name_lat": "Hypericum",
    "name_cz": "Třezalka",
    "type": "Herb",
    "thermal": 2,
    "moisture": -2,
    "toxicity": 5,
    "potency": 2,
    "tags": [
      "wound",
      "mood",
      "anti-demon"
    ],
    "price": 6,
    "shelf_days": 120,
    "color": "#f39c12"
  },
  {
    "id": "ING19",
    "name_lat": "Rosa",
    "name_cz": "Růže",
    "type": "Herb",
    "thermal": -1,
    "moisture": 2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "cooling",
      "heart",
      "aromatic"
    ],
    "price": 7,
    "shelf_days": 14,
    "color": "#e8a0b4"
  },
  {
    "id": "ING20",
    "name_lat": "Borago",
    "name_cz": "Brutnák",
    "type": "Herb",
    "thermal": 1,
    "moisture": 2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "mood",
      "cooling",
      "heart"
    ],
    "price": 5,
    "shelf_days": 7,
    "color": "#5d86c0"
  },
  {
    "id": "ING21",
    "name_lat": "Melissa",
    "name_cz": "Meduňka",
    "type": "Herb",
    "thermal": 2,
    "moisture": 1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "calming",
      "mood",
      "aromatic"
    ],
    "price": 5,
    "shelf_days": 30,
    "color": "#a8d8a8"
  },
  {
    "id": "ING22",
    "name_lat": "Crocus sativus",
    "name_cz": "Šafrán",
    "type": "Herb",
    "thermal": 2,
    "moisture": -2,
    "toxicity": 10,
    "potency": 2,
    "tags": [
      "mood",
      "heart",
      "expensive"
    ],
    "price": 60,
    "shelf_days": 365,
    "color": "#f39c12"
  },
  {
    "id": "ING23",
    "name_lat": "Piper",
    "name_cz": "Pepř černý",
    "type": "Herb",
    "thermal": 4,
    "moisture": -4,
    "toxicity": 0,
    "potency": 3,
    "tags": [
      "warming",
      "digestive",
      "stimulant"
    ],
    "price": 10,
    "shelf_days": 365,
    "color": "#2c2c2c"
  },
  {
    "id": "ING24",
    "name_lat": "Zingiber",
    "name_cz": "Zázvor",
    "type": "Herb",
    "thermal": 3,
    "moisture": 1,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "warming",
      "digestive",
      "nausea"
    ],
    "price": 8,
    "shelf_days": 180,
    "color": "#c8a870"
  },
  {
    "id": "ING25",
    "name_lat": "Cinnamomum",
    "name_cz": "Skořice",
    "type": "Herb",
    "thermal": 3,
    "moisture": -2,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "warming",
      "aromatic",
      "digestive"
    ],
    "price": 12,
    "shelf_days": 365,
    "color": "#8b4513"
  },
  {
    "id": "ING26",
    "name_lat": "Myrrha",
    "name_cz": "Myrha",
    "type": "Resin",
    "thermal": 2,
    "moisture": -3,
    "toxicity": 5,
    "potency": 2,
    "tags": [
      "antiseptic",
      "wound",
      "aromatic"
    ],
    "price": 20,
    "shelf_days": 365,
    "color": "#c0932f"
  },
  {
    "id": "ING27",
    "name_lat": "Olibanum",
    "name_cz": "Kadidlo",
    "type": "Resin",
    "thermal": 2,
    "moisture": -3,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "aromatic",
      "anti-plague",
      "purifying"
    ],
    "price": 15,
    "shelf_days": 365,
    "color": "#e8d5a3"
  },
  {
    "id": "ING28",
    "name_lat": "Styrax",
    "name_cz": "Storax",
    "type": "Resin",
    "thermal": 1,
    "moisture": -2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "aromatic",
      "binder",
      "varnish"
    ],
    "price": 10,
    "shelf_days": 365,
    "color": "#c09060"
  },
  {
    "id": "ING29",
    "name_lat": "Mastix",
    "name_cz": "Masticha",
    "type": "Resin",
    "thermal": 2,
    "moisture": -2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "digestive",
      "binder",
      "dental"
    ],
    "price": 15,
    "shelf_days": 365,
    "color": "#ffe8c0"
  },
  {
    "id": "ING30",
    "name_lat": "Camphora",
    "name_cz": "Kafr",
    "type": "Resin",
    "thermal": -3,
    "moisture": -3,
    "toxicity": 20,
    "potency": 2,
    "tags": [
      "cooling",
      "antiseptic",
      "anesthetic"
    ],
    "price": 18,
    "shelf_days": 365,
    "color": "#ffffff"
  },
  {
    "id": "ING31",
    "name_lat": "Sanguis draconis",
    "name_cz": "Dračí krev",
    "type": "Resin",
    "thermal": -1,
    "moisture": -3,
    "toxicity": 5,
    "potency": 2,
    "tags": [
      "wound",
      "rare",
      "pigment",
      "binding"
    ],
    "price": 30,
    "shelf_days": 365,
    "color": "#8b0000"
  },
  {
    "id": "ING32",
    "name_lat": "Gummi arabicum",
    "name_cz": "Arabská guma",
    "type": "Resin",
    "thermal": 1,
    "moisture": 2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "binder",
      "base",
      "thickener"
    ],
    "price": 6,
    "shelf_days": 365,
    "color": "#d4a843"
  },
  {
    "id": "ING33",
    "name_lat": "Cera flava",
    "name_cz": "Včelí vosk",
    "type": "Animal",
    "thermal": 1,
    "moisture": 2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "base",
      "ointment",
      "binder"
    ],
    "price": 8,
    "shelf_days": 365,
    "color": "#f1c40f"
  },
  {
    "id": "ING34",
    "name_lat": "Albumen Ovi",
    "name_cz": "Vaječný bílek",
    "type": "Animal",
    "thermal": -2,
    "moisture": 3,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "binder",
      "cooling",
      "base"
    ],
    "price": 2,
    "shelf_days": 3,
    "color": "#f8f9fa"
  },
  {
    "id": "ING35",
    "name_lat": "Cantharides",
    "name_cz": "Španělské mušky",
    "type": "Animal",
    "thermal": 4,
    "moisture": -4,
    "toxicity": 90,
    "potency": 4,
    "tags": [
      "poison",
      "blister",
      "aphrodisiac",
      "rare"
    ],
    "price": 80,
    "shelf_days": 365,
    "color": "#27ae60"
  },
  {
    "id": "ING36",
    "name_lat": "Sepia",
    "name_cz": "Sépiová kost",
    "type": "Animal",
    "thermal": -1,
    "moisture": -3,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "astringent",
      "dental",
      "pigment"
    ],
    "price": 5,
    "shelf_days": 365,
    "color": "#d4a843"
  },
  {
    "id": "ING37",
    "name_lat": "Castoreum",
    "name_cz": "Bobrovina",
    "type": "Animal",
    "thermal": 3,
    "moisture": -2,
    "toxicity": 15,
    "potency": 2,
    "tags": [
      "stimulant",
      "spasm",
      "aromatic"
    ],
    "price": 35,
    "shelf_days": 365,
    "color": "#8b6040"
  },
  {
    "id": "ING38",
    "name_lat": "Cornus cervi",
    "name_cz": "Pálený jelení roh",
    "type": "Animal",
    "thermal": -1,
    "moisture": -4,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "cooling",
      "fever",
      "astringent"
    ],
    "price": 10,
    "shelf_days": 365,
    "color": "#e8d5a3"
  },
  {
    "id": "ING39",
    "name_lat": "Margaritae",
    "name_cz": "Perly (drcené)",
    "type": "Mineral",
    "thermal": -2,
    "moisture": -2,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "cooling",
      "heart",
      "precious"
    ],
    "price": 100,
    "shelf_days": 365,
    "color": "#f0f0f0"
  },
  {
    "id": "ING40",
    "name_lat": "Corallium rubrum",
    "name_cz": "Červený korál",
    "type": "Mineral",
    "thermal": -1,
    "moisture": -2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "heart",
      "cooling",
      "precious"
    ],
    "price": 45,
    "shelf_days": 365,
    "color": "#e74c3c"
  },
  {
    "id": "ING41",
    "name_lat": "Galla quercina",
    "name_cz": "Dubová hálka",
    "type": "Herb",
    "thermal": -2,
    "moisture": -4,
    "toxicity": 10,
    "potency": 2,
    "tags": [
      "astringent",
      "ink",
      "tannin"
    ],
    "price": 4,
    "shelf_days": 365,
    "color": "#7d5a3c"
  },
  {
    "id": "ING42",
    "name_lat": "Alumen",
    "name_cz": "Kamenec",
    "type": "Mineral",
    "thermal": -2,
    "moisture": -4,
    "toxicity": 15,
    "potency": 2,
    "tags": [
      "astringent",
      "mordant",
      "ink"
    ],
    "price": 5,
    "shelf_days": 365,
    "color": "#bdc3c7"
  },
  {
    "id": "ING43",
    "name_lat": "Cinnabaris",
    "name_cz": "Rumělka",
    "type": "Mineral",
    "thermal": 2,
    "moisture": -3,
    "toxicity": 80,
    "potency": 3,
    "tags": [
      "poison",
      "pigment",
      "rare"
    ],
    "price": 40,
    "shelf_days": 365,
    "color": "#ff4500"
  },
  {
    "id": "ING44",
    "name_lat": "Aerugo",
    "name_cz": "Měděnka",
    "type": "Mineral",
    "thermal": 3,
    "moisture": -3,
    "toxicity": 75,
    "potency": 3,
    "tags": [
      "poison",
      "pigment",
      "antiseptic"
    ],
    "price": 20,
    "shelf_days": 365,
    "color": "#1abc9c"
  },
  {
    "id": "ING45",
    "name_lat": "Lapis Lazuli",
    "name_cz": "Lazurit",
    "type": "Mineral",
    "thermal": -2,
    "moisture": -3,
    "toxicity": 5,
    "potency": 1,
    "tags": [
      "cooling",
      "pigment",
      "precious"
    ],
    "price": 80,
    "shelf_days": 365,
    "color": "#3498db"
  },
  {
    "id": "ING46",
    "name_lat": "Aurum foliatum",
    "name_cz": "Plátkové zlato",
    "type": "Mineral",
    "thermal": 2,
    "moisture": 1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "heart",
      "precious",
      "pigment"
    ],
    "price": 200,
    "shelf_days": 365,
    "color": "#ffd700"
  },
  {
    "id": "ING47",
    "name_lat": "Smaragdus",
    "name_cz": "Smaragd (drcený)",
    "type": "Mineral",
    "thermal": -3,
    "moisture": -2,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "cooling",
      "eye",
      "precious"
    ],
    "price": 150,
    "shelf_days": 365,
    "color": "#27ae60"
  },
  {
    "id": "ING48",
    "name_lat": "Bolus Armeniacus",
    "name_cz": "Arménský jíl",
    "type": "Mineral",
    "thermal": -2,
    "moisture": -4,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "cooling",
      "astringent",
      "anti-poison"
    ],
    "price": 8,
    "shelf_days": 365,
    "color": "#c0392b"
  },
  {
    "id": "ING49",
    "name_lat": "Lapis Haematites",
    "name_cz": "Krevhel",
    "type": "Mineral",
    "thermal": -1,
    "moisture": -3,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "blood",
      "wound",
      "pigment"
    ],
    "price": 12,
    "shelf_days": 365,
    "color": "#8e2020"
  },
  {
    "id": "ING50",
    "name_lat": "Spongia",
    "name_cz": "Mořská houba",
    "type": "Animal",
    "thermal": -1,
    "moisture": 2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "absorbing",
      "cooling",
      "surgical"
    ],
    "price": 10,
    "shelf_days": 30,
    "color": "#d4a843"
  },
  {
    "id": "ING51",
    "name_lat": "Minium",
    "name_cz": "Suřík (olovo)",
    "type": "Mineral",
    "thermal": 1,
    "moisture": -3,
    "toxicity": 85,
    "potency": 2,
    "tags": [
      "poison",
      "pigment"
    ],
    "price": 15,
    "shelf_days": 365,
    "color": "#e74c3c"
  },
  {
    "id": "ING52",
    "name_lat": "Auripigmentum",
    "name_cz": "Auripigment (arsen)",
    "type": "Mineral",
    "thermal": 3,
    "moisture": -3,
    "toxicity": 95,
    "potency": 4,
    "tags": [
      "poison",
      "pigment",
      "rare"
    ],
    "price": 50,
    "shelf_days": 365,
    "color": "#f39c12"
  },
  {
    "id": "ING53",
    "name_lat": "Plumbum album",
    "name_cz": "Olovnatá běloba",
    "type": "Mineral",
    "thermal": -2,
    "moisture": -3,
    "toxicity": 80,
    "potency": 2,
    "tags": [
      "poison",
      "pigment",
      "cooling"
    ],
    "price": 12,
    "shelf_days": 365,
    "color": "#ecf0f1"
  },
  {
    "id": "ING54",
    "name_lat": "Oleum lini",
    "name_cz": "Lněný olej",
    "type": "Liquid",
    "thermal": 2,
    "moisture": 2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "base",
      "varnish",
      "carrier"
    ],
    "price": 4,
    "shelf_days": 90,
    "color": "#a8b820"
  },
  {
    "id": "ING55",
    "name_lat": "Spiritus Vini",
    "name_cz": "Vinný destilát",
    "type": "Liquid",
    "thermal": 4,
    "moisture": -3,
    "toxicity": 10,
    "potency": 3,
    "tags": [
      "solvent",
      "tincture",
      "base",
      "warming"
    ],
    "price": 20,
    "shelf_days": 365,
    "color": "#e8d5a3"
  },
  {
    "id": "ING56",
    "name_lat": "Artemisia absinthium",
    "name_cz": "Pelyněk pravý",
    "type": "Herb",
    "thermal": 3,
    "moisture": -3,
    "toxicity": 15,
    "potency": 2,
    "tags": [
      "bitter",
      "digestive",
      "anti-worm"
    ],
    "price": 7,
    "shelf_days": 180,
    "color": "#6b8e23"
  },
  {
    "id": "ING57",
    "name_lat": "Chamomilla",
    "name_cz": "Heřmánek",
    "type": "Herb",
    "thermal": 1,
    "moisture": -1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "calming",
      "digestive",
      "anti-spasm"
    ],
    "price": 4,
    "shelf_days": 60,
    "color": "#f1c40f"
  },
  {
    "id": "ING58",
    "name_lat": "Mentha piperita",
    "name_cz": "Máta peprná",
    "type": "Herb",
    "thermal": 2,
    "moisture": -2,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "cooling",
      "digestive",
      "aromatic"
    ],
    "price": 4,
    "shelf_days": 30,
    "color": "#2ecc71"
  },
  {
    "id": "ING59",
    "name_lat": "Plantago",
    "name_cz": "Jitrocel",
    "type": "Herb",
    "thermal": -2,
    "moisture": -2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "wound",
      "cooling",
      "astringent"
    ],
    "price": 3,
    "shelf_days": 14,
    "color": "#a8c090"
  },
  {
    "id": "ING60",
    "name_lat": "Symphytum officinale",
    "name_cz": "Kostival",
    "type": "Herb",
    "thermal": -1,
    "moisture": 2,
    "toxicity": 5,
    "potency": 2,
    "tags": [
      "bone",
      "wound",
      "healing"
    ],
    "price": 6,
    "shelf_days": 30,
    "color": "#7d9e4e"
  },
  {
    "id": "ING61",
    "name_lat": "Argentum",
    "name_cz": "Stříbro",
    "type": "Mineral",
    "thermal": -2,
    "moisture": -2,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "cooling",
      "precious"
    ],
    "price": 50,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING62",
    "name_lat": "Hydrargyrum",
    "name_cz": "Rtuť",
    "type": "Mineral",
    "thermal": -4,
    "moisture": 4,
    "toxicity": 80,
    "potency": 4,
    "tags": [
      "poison",
      "fluid",
      "rare"
    ],
    "price": 30,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING63",
    "name_lat": "Plumbum",
    "name_cz": "Olovo",
    "type": "Mineral",
    "thermal": -3,
    "moisture": -3,
    "toxicity": 60,
    "potency": 3,
    "tags": [
      "poison",
      "heavy"
    ],
    "price": 5,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING64",
    "name_lat": "Stannum",
    "name_cz": "Cín",
    "type": "Mineral",
    "thermal": -1,
    "moisture": 0,
    "toxicity": 10,
    "potency": 1,
    "tags": [
      "base"
    ],
    "price": 8,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING65",
    "name_lat": "Ferrum",
    "name_cz": "Železo",
    "type": "Mineral",
    "thermal": 2,
    "moisture": -2,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "blood",
      "warming"
    ],
    "price": 3,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING66",
    "name_lat": "Cuprum",
    "name_cz": "Měď",
    "type": "Mineral",
    "thermal": 1,
    "moisture": -1,
    "toxicity": 30,
    "potency": 2,
    "tags": [
      "catalyst"
    ],
    "price": 6,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING67",
    "name_lat": "Sulphur",
    "name_cz": "Síra",
    "type": "Mineral",
    "thermal": 4,
    "moisture": -4,
    "toxicity": 20,
    "potency": 3,
    "tags": [
      "warming",
      "volatile"
    ],
    "price": 10,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING68",
    "name_lat": "Sal Gemmae",
    "name_cz": "Sůl kamenná",
    "type": "Mineral",
    "thermal": 1,
    "moisture": -4,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "preservative",
      "purifying"
    ],
    "price": 2,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING69",
    "name_lat": "Antimonium",
    "name_cz": "Antimon",
    "type": "Mineral",
    "thermal": 2,
    "moisture": -2,
    "toxicity": 50,
    "potency": 3,
    "tags": [
      "purgative",
      "toxic"
    ],
    "price": 15,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING70",
    "name_lat": "Arsenicum",
    "name_cz": "Arsen",
    "type": "Mineral",
    "thermal": 4,
    "moisture": -4,
    "toxicity": 100,
    "potency": 4,
    "tags": [
      "poison",
      "lethal"
    ],
    "price": 25,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING71",
    "name_lat": "Sal Armoniacum",
    "name_cz": "Salmiak",
    "type": "Mineral",
    "thermal": 3,
    "moisture": -3,
    "toxicity": 20,
    "potency": 3,
    "tags": [
      "volatile",
      "solvent"
    ],
    "price": 12,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING72",
    "name_lat": "Bismuthum",
    "name_cz": "Bismut",
    "type": "Mineral",
    "thermal": -1,
    "moisture": -1,
    "toxicity": 10,
    "potency": 1,
    "tags": [
      "base"
    ],
    "price": 18,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING73",
    "name_lat": "Cobaltum",
    "name_cz": "Kobalt",
    "type": "Mineral",
    "thermal": -2,
    "moisture": -2,
    "toxicity": 40,
    "potency": 2,
    "tags": [
      "toxic",
      "pigment"
    ],
    "price": 22,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING74",
    "name_lat": "Zincum",
    "name_cz": "Zinek",
    "type": "Mineral",
    "thermal": -1,
    "moisture": -1,
    "toxicity": 20,
    "potency": 1,
    "tags": [
      "base"
    ],
    "price": 7,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING75",
    "name_lat": "Calx viva",
    "name_cz": "Pálené vápno",
    "type": "Mineral",
    "thermal": 4,
    "moisture": -4,
    "toxicity": 40,
    "potency": 3,
    "tags": [
      "caustic",
      "warming"
    ],
    "price": 4,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING76",
    "name_lat": "Kalium carbonicum",
    "name_cz": "Potaš",
    "type": "Mineral",
    "thermal": 2,
    "moisture": -2,
    "toxicity": 30,
    "potency": 2,
    "tags": [
      "caustic",
      "cleansing"
    ],
    "price": 5,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING77",
    "name_lat": "Sal nitri",
    "name_cz": "Ledek",
    "type": "Mineral",
    "thermal": -2,
    "moisture": -2,
    "toxicity": 10,
    "potency": 3,
    "tags": [
      "volatile",
      "cooling",
      "explosive"
    ],
    "price": 14,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING78",
    "name_lat": "Tartarus",
    "name_cz": "Vinný kámen",
    "type": "Mineral",
    "thermal": 1,
    "moisture": -2,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "acidic",
      "purifying"
    ],
    "price": 6,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING79",
    "name_lat": "Vitriolum viride",
    "name_cz": "Zelená skalice",
    "type": "Mineral",
    "thermal": 2,
    "moisture": -2,
    "toxicity": 40,
    "potency": 3,
    "tags": [
      "corrosive",
      "acid"
    ],
    "price": 8,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING80",
    "name_lat": "Lapis Calaminaris",
    "name_cz": "Kalamín",
    "type": "Mineral",
    "thermal": -1,
    "moisture": -3,
    "toxicity": 10,
    "potency": 1,
    "tags": [
      "healing",
      "skin"
    ],
    "price": 9,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING81",
    "name_lat": "Talcum",
    "name_cz": "Mastek",
    "type": "Mineral",
    "thermal": -2,
    "moisture": -3,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "cosmetic",
      "drying"
    ],
    "price": 4,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING82",
    "name_lat": "Silex",
    "name_cz": "Pazourek",
    "type": "Mineral",
    "thermal": 0,
    "moisture": -4,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "base",
      "hard"
    ],
    "price": 1,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING83",
    "name_lat": "Fuligo",
    "name_cz": "Saze",
    "type": "Mineral",
    "thermal": 1,
    "moisture": -4,
    "toxicity": 10,
    "potency": 1,
    "tags": [
      "drying",
      "bitter"
    ],
    "price": 1,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING84",
    "name_lat": "Succinum",
    "name_cz": "Jantar",
    "type": "Resin",
    "thermal": 1,
    "moisture": -2,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "aromatic",
      "precious"
    ],
    "price": 35,
    "shelf_days": 365,
    "color": "#e67e22"
  },
  {
    "id": "ING85",
    "name_lat": "Citrus bergamia",
    "name_cz": "Bergamot",
    "type": "Herb",
    "thermal": 1,
    "moisture": 1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "aromatic",
      "mood"
    ],
    "price": 12,
    "shelf_days": 180,
    "color": "#2ecc71"
  },
  {
    "id": "ING86",
    "name_lat": "Carum carvi",
    "name_cz": "Kmín kořenný",
    "type": "Herb",
    "thermal": 2,
    "moisture": -1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "digestive",
      "warming"
    ],
    "price": 3,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING87",
    "name_lat": "Anethum graveolens",
    "name_cz": "Kopr vonný",
    "type": "Herb",
    "thermal": 1,
    "moisture": 1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "digestive",
      "calming"
    ],
    "price": 2,
    "shelf_days": 180,
    "color": "#2ecc71"
  },
  {
    "id": "ING88",
    "name_lat": "Ephedra",
    "name_cz": "Chvojník",
    "type": "Herb",
    "thermal": 3,
    "moisture": -2,
    "toxicity": 30,
    "potency": 3,
    "tags": [
      "stimulant",
      "warming"
    ],
    "price": 14,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING89",
    "name_lat": "Marrubium vulgare",
    "name_cz": "Jablečník obecný",
    "type": "Herb",
    "thermal": 1,
    "moisture": -1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "expectorant",
      "bitter"
    ],
    "price": 4,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING90",
    "name_lat": "Lavandula officinalis",
    "name_cz": "Levandule",
    "type": "Herb",
    "thermal": 1,
    "moisture": -1,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "calming",
      "aromatic"
    ],
    "price": 8,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING91",
    "name_lat": "Origanum majorana",
    "name_cz": "Majoránka",
    "type": "Herb",
    "thermal": 2,
    "moisture": -1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "warming",
      "calming"
    ],
    "price": 4,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING92",
    "name_lat": "Hieracium pilosella",
    "name_cz": "Chlupáček",
    "type": "Herb",
    "thermal": -1,
    "moisture": 1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "healing",
      "astringent"
    ],
    "price": 3,
    "shelf_days": 180,
    "color": "#2ecc71"
  },
  {
    "id": "ING93",
    "name_lat": "Verbascum thapsus",
    "name_cz": "Divizna",
    "type": "Herb",
    "thermal": 0,
    "moisture": 1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "expectorant",
      "lung"
    ],
    "price": 5,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING94",
    "name_lat": "Cyperus papyrus",
    "name_cz": "Papyrus",
    "type": "Herb",
    "thermal": 0,
    "moisture": 2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "base",
      "craft"
    ],
    "price": 10,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING95",
    "name_lat": "Illicium verum",
    "name_cz": "Badyán",
    "type": "Herb",
    "thermal": 2,
    "moisture": -1,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "aromatic",
      "digestive"
    ],
    "price": 15,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING96",
    "name_lat": "Satureja hortensis",
    "name_cz": "Saturejka",
    "type": "Herb",
    "thermal": 3,
    "moisture": -2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "warming",
      "spice"
    ],
    "price": 5,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING97",
    "name_lat": "Thymus vulgaris",
    "name_cz": "Tymián",
    "type": "Herb",
    "thermal": 3,
    "moisture": -2,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "antiseptic",
      "warming"
    ],
    "price": 6,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING98",
    "name_lat": "Galium odoratum",
    "name_cz": "Mařinka vonná",
    "type": "Herb",
    "thermal": 1,
    "moisture": 1,
    "toxicity": 10,
    "potency": 1,
    "tags": [
      "aromatic",
      "tonic"
    ],
    "price": 7,
    "shelf_days": 180,
    "color": "#2ecc71"
  },
  {
    "id": "ING99",
    "name_lat": "Nepeta cataria",
    "name_cz": "Šanta kočičí",
    "type": "Herb",
    "thermal": -1,
    "moisture": 1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "calming",
      "sedative"
    ],
    "price": 5,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING100",
    "name_lat": "Prunus avium",
    "name_cz": "Třešeň",
    "type": "Herb",
    "thermal": -1,
    "moisture": 2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "sweet",
      "cooling"
    ],
    "price": 4,
    "shelf_days": 60,
    "color": "#2ecc71"
  },
  {
    "id": "ING101",
    "name_lat": "Turnera diffusa",
    "name_cz": "Damiána",
    "type": "Herb",
    "thermal": 2,
    "moisture": 0,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "aphrodisiac",
      "mood"
    ],
    "price": 18,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING102",
    "name_lat": "Aloysia citrodora",
    "name_cz": "Aloisie citronová",
    "type": "Herb",
    "thermal": 1,
    "moisture": 0,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "aromatic",
      "calming"
    ],
    "price": 12,
    "shelf_days": 180,
    "color": "#2ecc71"
  },
  {
    "id": "ING103",
    "name_lat": "Syringa vulgaris",
    "name_cz": "Šeřík",
    "type": "Herb",
    "thermal": -1,
    "moisture": 1,
    "toxicity": 5,
    "potency": 1,
    "tags": [
      "aromatic",
      "cooling"
    ],
    "price": 6,
    "shelf_days": 120,
    "color": "#2ecc71"
  },
  {
    "id": "ING104",
    "name_lat": "Adiantum capillus-veneris",
    "name_cz": "Netík",
    "type": "Herb",
    "thermal": 0,
    "moisture": 2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "lung",
      "expectorant"
    ],
    "price": 9,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING105",
    "name_lat": "Myrtus communis",
    "name_cz": "Myrta",
    "type": "Herb",
    "thermal": 1,
    "moisture": -1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "astringent",
      "aromatic"
    ],
    "price": 10,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING106",
    "name_lat": "Passiflora incarnata",
    "name_cz": "Mučenka",
    "type": "Herb",
    "thermal": -2,
    "moisture": 1,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "sedative",
      "calming"
    ],
    "price": 15,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING107",
    "name_lat": "Prunus persica",
    "name_cz": "Broskev",
    "type": "Herb",
    "thermal": -1,
    "moisture": 3,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "sweet",
      "cooling"
    ],
    "price": 6,
    "shelf_days": 30,
    "color": "#2ecc71"
  },
  {
    "id": "ING108",
    "name_lat": "Plumeria rubra",
    "name_cz": "Plumerie",
    "type": "Herb",
    "thermal": 1,
    "moisture": 1,
    "toxicity": 5,
    "potency": 1,
    "tags": [
      "aromatic",
      "rare"
    ],
    "price": 25,
    "shelf_days": 180,
    "color": "#2ecc71"
  },
  {
    "id": "ING109",
    "name_lat": "Rheum rhabarbarum",
    "name_cz": "Reveň",
    "type": "Herb",
    "thermal": -2,
    "moisture": -1,
    "toxicity": 10,
    "potency": 2,
    "tags": [
      "purgative",
      "bitter"
    ],
    "price": 7,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING110",
    "name_lat": "Rubus idaeus",
    "name_cz": "Maliník",
    "type": "Herb",
    "thermal": -1,
    "moisture": 2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "astringent",
      "cooling"
    ],
    "price": 5,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING111",
    "name_lat": "Fragaria vesca",
    "name_cz": "Jahodník",
    "type": "Herb",
    "thermal": -1,
    "moisture": 2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "cooling",
      "sweet"
    ],
    "price": 4,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING112",
    "name_lat": "Tanacetum vulgare",
    "name_cz": "Vratič",
    "type": "Herb",
    "thermal": -2,
    "moisture": -2,
    "toxicity": 20,
    "potency": 2,
    "tags": [
      "anti-worm",
      "bitter"
    ],
    "price": 5,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING113",
    "name_lat": "Vanilla planifolia",
    "name_cz": "Vanilka",
    "type": "Herb",
    "thermal": 1,
    "moisture": 1,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "aromatic",
      "sweet",
      "rare"
    ],
    "price": 45,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING114",
    "name_lat": "Verbena officinalis",
    "name_cz": "Sporýš lékařský",
    "type": "Herb",
    "thermal": -1,
    "moisture": -1,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "magic",
      "calming"
    ],
    "price": 8,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING115",
    "name_lat": "Viola odorata",
    "name_cz": "Violka",
    "type": "Herb",
    "thermal": -2,
    "moisture": 2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "cooling",
      "aromatic"
    ],
    "price": 10,
    "shelf_days": 180,
    "color": "#2ecc71"
  },
  {
    "id": "ING116",
    "name_lat": "Santalum album",
    "name_cz": "Bílé santalové dřevo",
    "type": "Herb",
    "thermal": -1,
    "moisture": -2,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "aromatic",
      "purifying",
      "rare"
    ],
    "price": 55,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING117",
    "name_lat": "Pogostemon cablin",
    "name_cz": "Pačuli",
    "type": "Herb",
    "thermal": 1,
    "moisture": -1,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "aromatic",
      "earthy"
    ],
    "price": 18,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING118",
    "name_lat": "Agrimonia eupatoria",
    "name_cz": "Řepík",
    "type": "Herb",
    "thermal": 1,
    "moisture": -2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "astringent",
      "healing"
    ],
    "price": 5,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING119",
    "name_lat": "Citrus aurantium flos",
    "name_cz": "Pomerančový květ",
    "type": "Herb",
    "thermal": 0,
    "moisture": 1,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "aromatic",
      "calming"
    ],
    "price": 30,
    "shelf_days": 180,
    "color": "#2ecc71"
  },
  {
    "id": "ING120",
    "name_lat": "Nelumbo nucifera",
    "name_cz": "Lotos",
    "type": "Herb",
    "thermal": -2,
    "moisture": 3,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "sedative",
      "spiritual",
      "rare"
    ],
    "price": 60,
    "shelf_days": 180,
    "color": "#2ecc71"
  },
  {
    "id": "ING121",
    "name_lat": "Artemisia dracunculus",
    "name_cz": "Estragon",
    "type": "Herb",
    "thermal": 2,
    "moisture": -1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "digestive",
      "spice"
    ],
    "price": 7,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING122",
    "name_lat": "Pimpinella anisum",
    "name_cz": "Anýz",
    "type": "Herb",
    "thermal": 2,
    "moisture": 0,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "digestive",
      "aromatic"
    ],
    "price": 5,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING123",
    "name_lat": "Cupressus sempervirens",
    "name_cz": "Cypřiš",
    "type": "Herb",
    "thermal": -1,
    "moisture": -2,
    "toxicity": 5,
    "potency": 1,
    "tags": [
      "astringent",
      "aromatic"
    ],
    "price": 9,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING124",
    "name_lat": "Alpinia officinarum",
    "name_cz": "Galgán",
    "type": "Herb",
    "thermal": 3,
    "moisture": -2,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "warming",
      "stimulant"
    ],
    "price": 14,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING125",
    "name_lat": "Serenoa repens",
    "name_cz": "Serenoa plíživá",
    "type": "Herb",
    "thermal": 1,
    "moisture": 1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "tonic"
    ],
    "price": 16,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING126",
    "name_lat": "Pausinystalia johimbe",
    "name_cz": "Yohimbe",
    "type": "Herb",
    "thermal": 3,
    "moisture": -1,
    "toxicity": 30,
    "potency": 3,
    "tags": [
      "stimulant",
      "aphrodisiac"
    ],
    "price": 28,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING127",
    "name_lat": "Commiphora erythraea",
    "name_cz": "Opoponax",
    "type": "Resin",
    "thermal": 2,
    "moisture": -2,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "resin",
      "aromatic",
      "healing"
    ],
    "price": 30,
    "shelf_days": 365,
    "color": "#e67e22"
  },
  {
    "id": "ING128",
    "name_lat": "Coriandrum sativum",
    "name_cz": "Koriandr",
    "type": "Herb",
    "thermal": 1,
    "moisture": -1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "cooling",
      "digestive"
    ],
    "price": 4,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING129",
    "name_lat": "Pelargonium graveolens",
    "name_cz": "Pelargonie",
    "type": "Herb",
    "thermal": 1,
    "moisture": 1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "astringent",
      "aromatic"
    ],
    "price": 10,
    "shelf_days": 180,
    "color": "#2ecc71"
  },
  {
    "id": "ING130",
    "name_lat": "Myristica fragrans",
    "name_cz": "Muškátový oříšek",
    "type": "Herb",
    "thermal": 3,
    "moisture": -2,
    "toxicity": 15,
    "potency": 2,
    "tags": [
      "warming",
      "narcotic",
      "spice"
    ],
    "price": 25,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING131",
    "name_lat": "Berberis vulgaris",
    "name_cz": "Dřišťál obecný",
    "type": "Herb",
    "thermal": -2,
    "moisture": -2,
    "toxicity": 5,
    "potency": 1,
    "tags": [
      "liver",
      "cooling"
    ],
    "price": 8,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING132",
    "name_lat": "Elettaria cardamomum",
    "name_cz": "Kardamom",
    "type": "Herb",
    "thermal": 2,
    "moisture": -1,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "warming",
      "digestive"
    ],
    "price": 22,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING133",
    "name_lat": "Rhamnus purshiana",
    "name_cz": "Řešetlák Purshův",
    "type": "Herb",
    "thermal": -1,
    "moisture": -2,
    "toxicity": 15,
    "potency": 2,
    "tags": [
      "purgative",
      "bitter"
    ],
    "price": 12,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING134",
    "name_lat": "Evernia prunastri",
    "name_cz": "Větvičník slívový",
    "type": "Herb",
    "thermal": 0,
    "moisture": -2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "aromatic",
      "earthy"
    ],
    "price": 14,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING135",
    "name_lat": "Dianthus caryophyllus",
    "name_cz": "Karafiát",
    "type": "Herb",
    "thermal": 1,
    "moisture": 0,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "aromatic",
      "spice"
    ],
    "price": 15,
    "shelf_days": 180,
    "color": "#2ecc71"
  },
  {
    "id": "ING136",
    "name_lat": "Hyssopus officinalis",
    "name_cz": "Yzop",
    "type": "Herb",
    "thermal": 2,
    "moisture": -2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "purifying",
      "lung"
    ],
    "price": 7,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING137",
    "name_lat": "Fumaria officinalis",
    "name_cz": "Zemědým",
    "type": "Herb",
    "thermal": -1,
    "moisture": -1,
    "toxicity": 5,
    "potency": 1,
    "tags": [
      "liver",
      "purifying"
    ],
    "price": 6,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING138",
    "name_lat": "Bistorta officinalis",
    "name_cz": "Rdesno hadí kořen",
    "type": "Herb",
    "thermal": -2,
    "moisture": -2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "astringent",
      "wound"
    ],
    "price": 8,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING139",
    "name_lat": "Aconitum napellus",
    "name_cz": "Oměj šalamounek",
    "type": "Herb",
    "thermal": -4,
    "moisture": -3,
    "toxicity": 95,
    "potency": 4,
    "tags": [
      "poison",
      "lethal"
    ],
    "price": 40,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING140",
    "name_lat": "Euphorbia",
    "name_cz": "Pryšec",
    "type": "Herb",
    "thermal": 3,
    "moisture": -2,
    "toxicity": 60,
    "potency": 3,
    "tags": [
      "poison",
      "purgative"
    ],
    "price": 12,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING141",
    "name_lat": "Tamarindus indica",
    "name_cz": "Tamarind",
    "type": "Herb",
    "thermal": -2,
    "moisture": 1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "cooling",
      "digestive"
    ],
    "price": 10,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING142",
    "name_lat": "Chrysopogon zizanioides",
    "name_cz": "Vetiver",
    "type": "Herb",
    "thermal": -1,
    "moisture": 0,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "aromatic",
      "earthy"
    ],
    "price": 18,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING143",
    "name_lat": "Orchidaceae",
    "name_cz": "Orchidej",
    "type": "Herb",
    "thermal": 0,
    "moisture": 2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "rare",
      "tonic"
    ],
    "price": 50,
    "shelf_days": 180,
    "color": "#2ecc71"
  },
  {
    "id": "ING144",
    "name_lat": "Cannabis sativa",
    "name_cz": "Konopí",
    "type": "Herb",
    "thermal": -1,
    "moisture": -2,
    "toxicity": 20,
    "potency": 3,
    "tags": [
      "narcotic",
      "sedative",
      "analgesic"
    ],
    "price": 15,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING145",
    "name_lat": "Datura stramonium",
    "name_cz": "Durman",
    "type": "Herb",
    "thermal": -3,
    "moisture": -3,
    "toxicity": 85,
    "potency": 4,
    "tags": [
      "poison",
      "narcotic",
      "hallucinogen"
    ],
    "price": 20,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING146",
    "name_lat": "Piper methysticum",
    "name_cz": "Kava kava",
    "type": "Herb",
    "thermal": -1,
    "moisture": 1,
    "toxicity": 15,
    "potency": 2,
    "tags": [
      "sedative",
      "narcotic"
    ],
    "price": 25,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING147",
    "name_lat": "Lobelia inflata",
    "name_cz": "Lobelka",
    "type": "Herb",
    "thermal": 2,
    "moisture": -1,
    "toxicity": 40,
    "potency": 3,
    "tags": [
      "lung",
      "emetic",
      "toxic"
    ],
    "price": 22,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING148",
    "name_lat": "Scutellaria lateriflora",
    "name_cz": "Šišák",
    "type": "Herb",
    "thermal": -2,
    "moisture": 0,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "calming",
      "sedative"
    ],
    "price": 12,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING149",
    "name_lat": "Lactuca virosa",
    "name_cz": "Locika jedovatá",
    "type": "Herb",
    "thermal": -3,
    "moisture": 1,
    "toxicity": 20,
    "potency": 2,
    "tags": [
      "narcotic",
      "analgesic"
    ],
    "price": 14,
    "shelf_days": 180,
    "color": "#2ecc71"
  },
  {
    "id": "ING150",
    "name_lat": "Ulmus",
    "name_cz": "Jilm",
    "type": "Herb",
    "thermal": -1,
    "moisture": 2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "healing",
      "base"
    ],
    "price": 7,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING151",
    "name_lat": "Wisteria sinensis",
    "name_cz": "Vistárie",
    "type": "Herb",
    "thermal": -1,
    "moisture": 0,
    "toxicity": 25,
    "potency": 1,
    "tags": [
      "toxic",
      "vomitive"
    ],
    "price": 15,
    "shelf_days": 180,
    "color": "#2ecc71"
  },
  {
    "id": "ING152",
    "name_lat": "Syzygium aromaticum",
    "name_cz": "Hřebíček",
    "type": "Herb",
    "thermal": 3,
    "moisture": -2,
    "toxicity": 5,
    "potency": 2,
    "tags": [
      "warming",
      "analgesic",
      "spice"
    ],
    "price": 18,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING153",
    "name_lat": "Pimenta dioica",
    "name_cz": "Nové koření",
    "type": "Herb",
    "thermal": 2,
    "moisture": -2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "warming",
      "spice"
    ],
    "price": 12,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING154",
    "name_lat": "Canarium luzonicum",
    "name_cz": "Elemi",
    "type": "Resin",
    "thermal": 1,
    "moisture": -1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "resin",
      "wound",
      "aromatic"
    ],
    "price": 20,
    "shelf_days": 365,
    "color": "#e67e22"
  },
  {
    "id": "ING155",
    "name_lat": "Coffea arabica",
    "name_cz": "Káva",
    "type": "Herb",
    "thermal": 2,
    "moisture": -2,
    "toxicity": 5,
    "potency": 2,
    "tags": [
      "stimulant",
      "warming"
    ],
    "price": 15,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING156",
    "name_lat": "Paullinia cupana",
    "name_cz": "Guarana",
    "type": "Herb",
    "thermal": 3,
    "moisture": -1,
    "toxicity": 10,
    "potency": 2,
    "tags": [
      "stimulant",
      "tonic"
    ],
    "price": 22,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING157",
    "name_lat": "Acorus calamus",
    "name_cz": "Puškvorec",
    "type": "Herb",
    "thermal": 2,
    "moisture": 1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "digestive",
      "aromatic"
    ],
    "price": 8,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING158",
    "name_lat": "Polygonatum odoratum",
    "name_cz": "Kokořík",
    "type": "Herb",
    "thermal": -1,
    "moisture": 1,
    "toxicity": 5,
    "potency": 1,
    "tags": [
      "healing",
      "joint"
    ],
    "price": 10,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING159",
    "name_lat": "Nardostachys jatamansi",
    "name_cz": "Nard",
    "type": "Herb",
    "thermal": 1,
    "moisture": -2,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "aromatic",
      "calming"
    ],
    "price": 40,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING160",
    "name_lat": "Angelica archangelica",
    "name_cz": "Andělika",
    "type": "Herb",
    "thermal": 3,
    "moisture": -1,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "warming",
      "tonic"
    ],
    "price": 14,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING161",
    "name_lat": "Lithargyrum",
    "name_cz": "Glet (oxid olovnatý)",
    "type": "Mineral",
    "thermal": 0,
    "moisture": -4,
    "toxicity": 60,
    "potency": 2,
    "tags": [
      "poison",
      "base"
    ],
    "price": 10,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING162",
    "name_lat": "Realgar",
    "name_cz": "Červený arsen",
    "type": "Mineral",
    "thermal": 3,
    "moisture": -3,
    "toxicity": 90,
    "potency": 3,
    "tags": [
      "poison",
      "pigment"
    ],
    "price": 35,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING163",
    "name_lat": "Marcasita",
    "name_cz": "Markazit",
    "type": "Mineral",
    "thermal": 2,
    "moisture": -2,
    "toxicity": 15,
    "potency": 2,
    "tags": [
      "metal",
      "spark"
    ],
    "price": 12,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING164",
    "name_lat": "Smiris",
    "name_cz": "Smirek",
    "type": "Mineral",
    "thermal": 0,
    "moisture": -4,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "abrasive",
      "hard"
    ],
    "price": 5,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING165",
    "name_lat": "Granatus",
    "name_cz": "Granát",
    "type": "Mineral",
    "thermal": -1,
    "moisture": -3,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "precious",
      "abrasive"
    ],
    "price": 40,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING166",
    "name_lat": "Vitriolum coeruleum",
    "name_cz": "Modrá skalice",
    "type": "Mineral",
    "thermal": -2,
    "moisture": -2,
    "toxicity": 40,
    "potency": 3,
    "tags": [
      "corrosive",
      "pigment"
    ],
    "price": 18,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING167",
    "name_lat": "Vitriolum album",
    "name_cz": "Bílá skalice",
    "type": "Mineral",
    "thermal": -2,
    "moisture": -2,
    "toxicity": 30,
    "potency": 2,
    "tags": [
      "eye",
      "astringent"
    ],
    "price": 15,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING168",
    "name_lat": "Sal Marinum",
    "name_cz": "Mořská sůl",
    "type": "Mineral",
    "thermal": 1,
    "moisture": -2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "preservative",
      "base"
    ],
    "price": 2,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING169",
    "name_lat": "Cinis ligni",
    "name_cz": "Dřevěný popel",
    "type": "Mineral",
    "thermal": 2,
    "moisture": -4,
    "toxicity": 5,
    "potency": 1,
    "tags": [
      "caustic",
      "purifying"
    ],
    "price": 1,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING170",
    "name_lat": "Carbo ligni",
    "name_cz": "Dřevěné uhlí",
    "type": "Mineral",
    "thermal": 2,
    "moisture": -4,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "absorbent",
      "purifying"
    ],
    "price": 2,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING171",
    "name_lat": "Creta",
    "name_cz": "Křída",
    "type": "Mineral",
    "thermal": -1,
    "moisture": -4,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "base",
      "antacid"
    ],
    "price": 3,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING172",
    "name_lat": "Urina",
    "name_cz": "Moč",
    "type": "Animal",
    "thermal": 1,
    "moisture": 4,
    "toxicity": 5,
    "potency": 2,
    "tags": [
      "solvent",
      "volatile"
    ],
    "price": 1,
    "shelf_days": 14,
    "color": "#e74c3c"
  },
  {
    "id": "ING173",
    "name_lat": "Fimus",
    "name_cz": "Hnůj",
    "type": "Animal",
    "thermal": 3,
    "moisture": 2,
    "toxicity": 20,
    "potency": 2,
    "tags": [
      "volatile",
      "fertilizer"
    ],
    "price": 1,
    "shelf_days": 30,
    "color": "#e74c3c"
  },
  {
    "id": "ING174",
    "name_lat": "Sanguis animalis",
    "name_cz": "Zvířecí krev",
    "type": "Animal",
    "thermal": 2,
    "moisture": 3,
    "toxicity": 5,
    "potency": 2,
    "tags": [
      "binder",
      "base"
    ],
    "price": 4,
    "shelf_days": 7,
    "color": "#e74c3c"
  },
  {
    "id": "ING175",
    "name_lat": "Millepedes",
    "name_cz": "Stínky",
    "type": "Animal",
    "thermal": -1,
    "moisture": 1,
    "toxicity": 5,
    "potency": 1,
    "tags": [
      "diuretic",
      "bug"
    ],
    "price": 6,
    "shelf_days": 30,
    "color": "#e74c3c"
  },
  {
    "id": "ING176",
    "name_lat": "Caro viperae",
    "name_cz": "Zmijí maso",
    "type": "Animal",
    "thermal": 3,
    "moisture": 1,
    "toxicity": 10,
    "potency": 3,
    "tags": [
      "anti-poison",
      "rare"
    ],
    "price": 45,
    "shelf_days": 60,
    "color": "#e74c3c"
  },
  {
    "id": "ING177",
    "name_lat": "Bufo",
    "name_cz": "Ropucha",
    "type": "Animal",
    "thermal": -3,
    "moisture": 2,
    "toxicity": 50,
    "potency": 3,
    "tags": [
      "poison",
      "magic"
    ],
    "price": 20,
    "shelf_days": 14,
    "color": "#e74c3c"
  },
  {
    "id": "ING178",
    "name_lat": "Aranea",
    "name_cz": "Pavouk",
    "type": "Animal",
    "thermal": -2,
    "moisture": 0,
    "toxicity": 30,
    "potency": 2,
    "tags": [
      "poison",
      "magic"
    ],
    "price": 10,
    "shelf_days": 30,
    "color": "#e74c3c"
  },
  {
    "id": "ING179",
    "name_lat": "Lumbrici",
    "name_cz": "Žížaly",
    "type": "Animal",
    "thermal": -1,
    "moisture": 3,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "healing",
      "joint"
    ],
    "price": 3,
    "shelf_days": 14,
    "color": "#e74c3c"
  },
  {
    "id": "ING180",
    "name_lat": "Cinis ossium",
    "name_cz": "Kostní popel",
    "type": "Animal",
    "thermal": 0,
    "moisture": -4,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "base",
      "absorbing"
    ],
    "price": 5,
    "shelf_days": 365,
    "color": "#e74c3c"
  },
  {
    "id": "ING181",
    "name_lat": "Testae",
    "name_cz": "Lastury",
    "type": "Animal",
    "thermal": -2,
    "moisture": -3,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "antacid",
      "base"
    ],
    "price": 4,
    "shelf_days": 365,
    "color": "#e74c3c"
  },
  {
    "id": "ING182",
    "name_lat": "Pix",
    "name_cz": "Smola",
    "type": "Resin",
    "thermal": 2,
    "moisture": -2,
    "toxicity": 5,
    "potency": 2,
    "tags": [
      "binder",
      "wound"
    ],
    "price": 6,
    "shelf_days": 365,
    "color": "#e67e22"
  },
  {
    "id": "ING183",
    "name_lat": "Tutia",
    "name_cz": "Tutie",
    "type": "Mineral",
    "thermal": -1,
    "moisture": -3,
    "toxicity": 10,
    "potency": 2,
    "tags": [
      "eye",
      "astringent"
    ],
    "price": 15,
    "shelf_days": 365,
    "color": "#9b59b6"
  },
  {
    "id": "ING184",
    "name_lat": "Hordeum vulgare",
    "name_cz": "Ječmen",
    "type": "Herb",
    "thermal": -1,
    "moisture": 1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "base",
      "nutrition"
    ],
    "price": 2,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING185",
    "name_lat": "Zea mays",
    "name_cz": "Kukuřice",
    "type": "Herb",
    "thermal": 0,
    "moisture": 1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "base",
      "nutrition"
    ],
    "price": 2,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING186",
    "name_lat": "Cimicifuga racemosa",
    "name_cz": "Ploštičník",
    "type": "Herb",
    "thermal": -2,
    "moisture": -1,
    "toxicity": 15,
    "potency": 2,
    "tags": [
      "spasm",
      "calming"
    ],
    "price": 14,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING187",
    "name_lat": "Amanita muscaria",
    "name_cz": "Muchomůrka červená",
    "type": "Herb",
    "thermal": -3,
    "moisture": 2,
    "toxicity": 65,
    "potency": 3,
    "tags": [
      "hallucinogen",
      "poison"
    ],
    "price": 25,
    "shelf_days": 180,
    "color": "#2ecc71"
  },
  {
    "id": "ING188",
    "name_lat": "Ferula assa-foetida",
    "name_cz": "Čertovo lejno",
    "type": "Resin",
    "thermal": 3,
    "moisture": -2,
    "toxicity": 5,
    "potency": 3,
    "tags": [
      "pungent",
      "anti-spasm"
    ],
    "price": 30,
    "shelf_days": 365,
    "color": "#e67e22"
  },
  {
    "id": "ING189",
    "name_lat": "Ambrosia",
    "name_cz": "Ambrosie",
    "type": "Herb",
    "thermal": 1,
    "moisture": -1,
    "toxicity": 10,
    "potency": 1,
    "tags": [
      "astringent",
      "irritating"
    ],
    "price": 8,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING190",
    "name_lat": "Pinus",
    "name_cz": "Borovice",
    "type": "Herb",
    "thermal": 2,
    "moisture": -1,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "aromatic",
      "lung"
    ],
    "price": 5,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING191",
    "name_lat": "Potentilla",
    "name_cz": "Mochna",
    "type": "Herb",
    "thermal": -1,
    "moisture": -2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "astringent",
      "magic"
    ],
    "price": 6,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING192",
    "name_lat": "Cedrus",
    "name_cz": "Cedr",
    "type": "Herb",
    "thermal": 2,
    "moisture": -2,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "aromatic",
      "purifying"
    ],
    "price": 10,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING193",
    "name_lat": "Populus",
    "name_cz": "Topolové pupeny",
    "type": "Herb",
    "thermal": -1,
    "moisture": 1,
    "toxicity": 5,
    "potency": 2,
    "tags": [
      "ointment",
      "analgesic"
    ],
    "price": 8,
    "shelf_days": 180,
    "color": "#2ecc71"
  },
  {
    "id": "ING194",
    "name_lat": "Jasminum",
    "name_cz": "Jasmín",
    "type": "Herb",
    "thermal": 1,
    "moisture": 1,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "aromatic",
      "mood"
    ],
    "price": 20,
    "shelf_days": 180,
    "color": "#2ecc71"
  },
  {
    "id": "ING195",
    "name_lat": "Foeniculum vulgare",
    "name_cz": "Fenykl",
    "type": "Herb",
    "thermal": 2,
    "moisture": 1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "digestive",
      "aromatic"
    ],
    "price": 4,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING196",
    "name_lat": "Cucumis sativus",
    "name_cz": "Okurka",
    "type": "Herb",
    "thermal": -3,
    "moisture": 4,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "cooling",
      "skin"
    ],
    "price": 3,
    "shelf_days": 14,
    "color": "#2ecc71"
  },
  {
    "id": "ING197",
    "name_lat": "Hyacinthus",
    "name_cz": "Hyacint",
    "type": "Herb",
    "thermal": -1,
    "moisture": 2,
    "toxicity": 10,
    "potency": 1,
    "tags": [
      "aromatic",
      "toxic"
    ],
    "price": 12,
    "shelf_days": 60,
    "color": "#2ecc71"
  },
  {
    "id": "ING198",
    "name_lat": "Commiphora opobalsamum",
    "name_cz": "Balzám z Gileádu",
    "type": "Resin",
    "thermal": 2,
    "moisture": -1,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "aromatic",
      "healing"
    ],
    "price": 35,
    "shelf_days": 365,
    "color": "#e67e22"
  },
  {
    "id": "ING199",
    "name_lat": "Laurus nobilis",
    "name_cz": "Vavřín",
    "type": "Herb",
    "thermal": 2,
    "moisture": -1,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "aromatic",
      "victory"
    ],
    "price": 7,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING200",
    "name_lat": "Cytisus scoparius",
    "name_cz": "Janovec metlatý",
    "type": "Herb",
    "thermal": -1,
    "moisture": -2,
    "toxicity": 15,
    "potency": 2,
    "tags": [
      "diuretic",
      "toxic"
    ],
    "price": 6,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING201",
    "name_lat": "Rhamnus cathartica",
    "name_cz": "Řešetlák počistivý",
    "type": "Herb",
    "thermal": -2,
    "moisture": -2,
    "toxicity": 20,
    "potency": 2,
    "tags": [
      "purgative",
      "bitter"
    ],
    "price": 8,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING202",
    "name_lat": "Arctium lappa",
    "name_cz": "Lopuch",
    "type": "Herb",
    "thermal": -1,
    "moisture": 0,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "purifying",
      "root"
    ],
    "price": 5,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING203",
    "name_lat": "Uncaria tomentosa",
    "name_cz": "Řemdihák plstnatý",
    "type": "Herb",
    "thermal": 1,
    "moisture": -1,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "immune",
      "joint"
    ],
    "price": 18,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING204",
    "name_lat": "Cichorium intybus",
    "name_cz": "Čekanka",
    "type": "Herb",
    "thermal": -2,
    "moisture": 1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "liver",
      "bitter"
    ],
    "price": 4,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING205",
    "name_lat": "Viburnum alnifolium",
    "name_cz": "Viburnum",
    "type": "Herb",
    "thermal": -1,
    "moisture": -1,
    "toxicity": 5,
    "potency": 1,
    "tags": [
      "spasm",
      "magic"
    ],
    "price": 12,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING206",
    "name_lat": "Origanum dictamnus",
    "name_cz": "Dobromysl krétská",
    "type": "Herb",
    "thermal": 2,
    "moisture": -2,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "wound",
      "aromatic"
    ],
    "price": 15,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING207",
    "name_lat": "Echinacea purpurea",
    "name_cz": "Třapatka",
    "type": "Herb",
    "thermal": 1,
    "moisture": -1,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "immune",
      "wound"
    ],
    "price": 10,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING208",
    "name_lat": "Sambucus nigra",
    "name_cz": "Bez černý",
    "type": "Herb",
    "thermal": -1,
    "moisture": 1,
    "toxicity": 5,
    "potency": 2,
    "tags": [
      "anti-fever",
      "immune"
    ],
    "price": 5,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING209",
    "name_lat": "Inula helenium",
    "name_cz": "Oman pravý",
    "type": "Herb",
    "thermal": 2,
    "moisture": -1,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "lung",
      "digestive"
    ],
    "price": 9,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING210",
    "name_lat": "Eucalyptus",
    "name_cz": "Eukalyptus",
    "type": "Herb",
    "thermal": 3,
    "moisture": -2,
    "toxicity": 10,
    "potency": 2,
    "tags": [
      "aromatic",
      "lung"
    ],
    "price": 12,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING211",
    "name_lat": "Linum usitatissimum",
    "name_cz": "Lněné semínko",
    "type": "Herb",
    "thermal": 0,
    "moisture": 2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "demulcent",
      "base"
    ],
    "price": 3,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING212",
    "name_lat": "Tanacetum parthenium",
    "name_cz": "Řimbaba",
    "type": "Herb",
    "thermal": -2,
    "moisture": -1,
    "toxicity": 5,
    "potency": 2,
    "tags": [
      "anti-fever",
      "headache"
    ],
    "price": 8,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING213",
    "name_lat": "Aframomum melegueta",
    "name_cz": "Aframom",
    "type": "Herb",
    "thermal": 4,
    "moisture": -2,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "spice",
      "warming"
    ],
    "price": 25,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING214",
    "name_lat": "Lawsonia inermis",
    "name_cz": "Henna",
    "type": "Herb",
    "thermal": -1,
    "moisture": -2,
    "toxicity": 5,
    "potency": 2,
    "tags": [
      "pigment",
      "hair"
    ],
    "price": 15,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING215",
    "name_lat": "Ipomoea jalapa",
    "name_cz": "Jalapa",
    "type": "Herb",
    "thermal": 2,
    "moisture": -2,
    "toxicity": 20,
    "potency": 3,
    "tags": [
      "magic",
      "purgative"
    ],
    "price": 28,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING216",
    "name_lat": "Lonicera",
    "name_cz": "Zimolez",
    "type": "Herb",
    "thermal": -1,
    "moisture": 2,
    "toxicity": 5,
    "potency": 1,
    "tags": [
      "sweet",
      "cooling"
    ],
    "price": 10,
    "shelf_days": 180,
    "color": "#2ecc71"
  },
  {
    "id": "ING217",
    "name_lat": "Humulus lupulus",
    "name_cz": "Chmel",
    "type": "Herb",
    "thermal": -2,
    "moisture": 1,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "sedative",
      "bitter"
    ],
    "price": 6,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING218",
    "name_lat": "Hydrangea arborescens",
    "name_cz": "Hortenzie",
    "type": "Herb",
    "thermal": -1,
    "moisture": 2,
    "toxicity": 15,
    "potency": 1,
    "tags": [
      "toxic",
      "diuretic"
    ],
    "price": 14,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING219",
    "name_lat": "Equisetum",
    "name_cz": "Přeslička",
    "type": "Herb",
    "thermal": -2,
    "moisture": -2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "astringent",
      "bone"
    ],
    "price": 4,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING220",
    "name_lat": "Chondrus crispus",
    "name_cz": "Puchratka kadeřavá",
    "type": "Herb",
    "thermal": -1,
    "moisture": 4,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "demulcent",
      "lung"
    ],
    "price": 12,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING221",
    "name_lat": "Coix lacryma-jobi",
    "name_cz": "Slzovka",
    "type": "Herb",
    "thermal": 0,
    "moisture": 1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "nutrition",
      "magic"
    ],
    "price": 8,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING222",
    "name_lat": "Citrus limon",
    "name_cz": "Citron",
    "type": "Herb",
    "thermal": -2,
    "moisture": 2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "cooling",
      "acid"
    ],
    "price": 5,
    "shelf_days": 60,
    "color": "#2ecc71"
  },
  {
    "id": "ING223",
    "name_lat": "Iris germanica",
    "name_cz": "Kořen kosatce",
    "type": "Herb",
    "thermal": 1,
    "moisture": -2,
    "toxicity": 5,
    "potency": 2,
    "tags": [
      "aromatic",
      "root"
    ],
    "price": 18,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING224",
    "name_lat": "Filipendula ulmaria",
    "name_cz": "Tužebník",
    "type": "Herb",
    "thermal": -1,
    "moisture": 1,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "analgesic",
      "stomach"
    ],
    "price": 7,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING225",
    "name_lat": "Ruta graveolens",
    "name_cz": "Routa vonná",
    "type": "Herb",
    "thermal": 3,
    "moisture": -3,
    "toxicity": 20,
    "potency": 2,
    "tags": [
      "bitter",
      "magic",
      "spasm"
    ],
    "price": 6,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING226",
    "name_lat": "Sassafras albidum",
    "name_cz": "Sasafras",
    "type": "Herb",
    "thermal": 2,
    "moisture": -1,
    "toxicity": 15,
    "potency": 2,
    "tags": [
      "aromatic",
      "liver"
    ],
    "price": 15,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING227",
    "name_lat": "Mentha spicata",
    "name_cz": "Máta klasnatá",
    "type": "Herb",
    "thermal": 1,
    "moisture": 1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "aromatic",
      "digestive"
    ],
    "price": 5,
    "shelf_days": 180,
    "color": "#2ecc71"
  },
  {
    "id": "ING228",
    "name_lat": "Drimia maritima",
    "name_cz": "Urginea přímořská",
    "type": "Herb",
    "thermal": 2,
    "moisture": -1,
    "toxicity": 25,
    "potency": 3,
    "tags": [
      "lung",
      "heart",
      "toxic"
    ],
    "price": 22,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING229",
    "name_lat": "Hamamelis virginiana",
    "name_cz": "Vilín",
    "type": "Herb",
    "thermal": -1,
    "moisture": -2,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "astringent",
      "skin"
    ],
    "price": 10,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING230",
    "name_lat": "Gaultheria procumbens",
    "name_cz": "Libavka",
    "type": "Herb",
    "thermal": 2,
    "moisture": 0,
    "toxicity": 15,
    "potency": 2,
    "tags": [
      "analgesic",
      "aromatic"
    ],
    "price": 14,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING231",
    "name_lat": "Stachys officinalis",
    "name_cz": "Bukvice lékařská",
    "type": "Herb",
    "thermal": 1,
    "moisture": -1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "brain",
      "magic"
    ],
    "price": 6,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING232",
    "name_lat": "Aquilaria",
    "name_cz": "Orlářkové dřevo",
    "type": "Herb",
    "thermal": 2,
    "moisture": -2,
    "toxicity": 0,
    "potency": 3,
    "tags": [
      "precious",
      "aromatic"
    ],
    "price": 80,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING233",
    "name_lat": "Copal",
    "name_cz": "Kopal",
    "type": "Resin",
    "thermal": 1,
    "moisture": -2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "aromatic",
      "purifying"
    ],
    "price": 18,
    "shelf_days": 365,
    "color": "#e67e22"
  },
  {
    "id": "ING234",
    "name_lat": "Amaranthus",
    "name_cz": "Laskavec",
    "type": "Herb",
    "thermal": -1,
    "moisture": 0,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "astringent",
      "nutrition"
    ],
    "price": 4,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING235",
    "name_lat": "Lilium",
    "name_cz": "Lilie",
    "type": "Herb",
    "thermal": -1,
    "moisture": 2,
    "toxicity": 5,
    "potency": 1,
    "tags": [
      "cooling",
      "cosmetic"
    ],
    "price": 12,
    "shelf_days": 60,
    "color": "#2ecc71"
  },
  {
    "id": "ING236",
    "name_lat": "Digitalis",
    "name_cz": "Náprstník",
    "type": "Herb",
    "thermal": -2,
    "moisture": -1,
    "toxicity": 80,
    "potency": 4,
    "tags": [
      "heart",
      "poison",
      "lethal"
    ],
    "price": 30,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING237",
    "name_lat": "Ferula gummosa",
    "name_cz": "Galbanum",
    "type": "Resin",
    "thermal": 2,
    "moisture": -1,
    "toxicity": 5,
    "potency": 2,
    "tags": [
      "aromatic",
      "spasm"
    ],
    "price": 25,
    "shelf_days": 365,
    "color": "#e67e22"
  },
  {
    "id": "ING238",
    "name_lat": "Betula",
    "name_cz": "Bříza",
    "type": "Herb",
    "thermal": -1,
    "moisture": 1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "purifying",
      "joint"
    ],
    "price": 4,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING239",
    "name_lat": "Crataegus",
    "name_cz": "Hloh",
    "type": "Herb",
    "thermal": 1,
    "moisture": 0,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "heart",
      "magic"
    ],
    "price": 5,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING240",
    "name_lat": "Quercus",
    "name_cz": "Dub",
    "type": "Herb",
    "thermal": -2,
    "moisture": -3,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "astringent",
      "strong"
    ],
    "price": 3,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING241",
    "name_lat": "Sorbus aucuparia",
    "name_cz": "Jeřáb",
    "type": "Herb",
    "thermal": -1,
    "moisture": 1,
    "toxicity": 5,
    "potency": 1,
    "tags": [
      "magic",
      "astringent"
    ],
    "price": 5,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING242",
    "name_lat": "Malus domestica",
    "name_cz": "Jablko",
    "type": "Herb",
    "thermal": -1,
    "moisture": 3,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "sweet",
      "cooling"
    ],
    "price": 2,
    "shelf_days": 60,
    "color": "#2ecc71"
  },
  {
    "id": "ING243",
    "name_lat": "Pyrus",
    "name_cz": "Hruška",
    "type": "Herb",
    "thermal": -2,
    "moisture": 3,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "cooling",
      "sweet"
    ],
    "price": 2,
    "shelf_days": 60,
    "color": "#2ecc71"
  },
  {
    "id": "ING244",
    "name_lat": "Morus",
    "name_cz": "Moruše",
    "type": "Herb",
    "thermal": -1,
    "moisture": 2,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "sweet",
      "blood"
    ],
    "price": 6,
    "shelf_days": 30,
    "color": "#2ecc71"
  },
  {
    "id": "ING245",
    "name_lat": "Ficus",
    "name_cz": "Fík",
    "type": "Herb",
    "thermal": 1,
    "moisture": 3,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "nutrition",
      "sweet"
    ],
    "price": 8,
    "shelf_days": 180,
    "color": "#2ecc71"
  },
  {
    "id": "ING246",
    "name_lat": "Pterocarpus santalinus",
    "name_cz": "Červené santalové dřevo",
    "type": "Herb",
    "thermal": -1,
    "moisture": -2,
    "toxicity": 0,
    "potency": 2,
    "tags": [
      "aromatic",
      "pigment"
    ],
    "price": 45,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING247",
    "name_lat": "Helianthus",
    "name_cz": "Slunečnice",
    "type": "Herb",
    "thermal": 1,
    "moisture": 1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "nutrition",
      "oil"
    ],
    "price": 3,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING248",
    "name_lat": "Heliotropium",
    "name_cz": "Otočník",
    "type": "Herb",
    "thermal": -1,
    "moisture": 1,
    "toxicity": 15,
    "potency": 2,
    "tags": [
      "magic",
      "toxic"
    ],
    "price": 12,
    "shelf_days": 180,
    "color": "#2ecc71"
  },
  {
    "id": "ING249",
    "name_lat": "Prunus dulcis",
    "name_cz": "Mandle",
    "type": "Herb",
    "thermal": 1,
    "moisture": 1,
    "toxicity": 5,
    "potency": 2,
    "tags": [
      "nutrition",
      "base"
    ],
    "price": 10,
    "shelf_days": 180,
    "color": "#2ecc71"
  },
  {
    "id": "ING250",
    "name_lat": "Juglans regia",
    "name_cz": "Vlašský ořech",
    "type": "Herb",
    "thermal": 1,
    "moisture": -1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "brain",
      "astringent"
    ],
    "price": 6,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING251",
    "name_lat": "Buxus",
    "name_cz": "Zimostráz",
    "type": "Herb",
    "thermal": -2,
    "moisture": -2,
    "toxicity": 30,
    "potency": 2,
    "tags": [
      "toxic",
      "hard"
    ],
    "price": 8,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING252",
    "name_lat": "Guaiacum officinale",
    "name_cz": "Guajakové dřevo",
    "type": "Herb",
    "thermal": 3,
    "moisture": -3,
    "toxicity": 5,
    "potency": 3,
    "tags": [
      "blood",
      "purifying"
    ],
    "price": 35,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING253",
    "name_lat": "Paeonia",
    "name_cz": "Pivoňka",
    "type": "Herb",
    "thermal": -1,
    "moisture": -1,
    "toxicity": 10,
    "potency": 2,
    "tags": [
      "spasm",
      "magic"
    ],
    "price": 12,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING254",
    "name_lat": "Helleborus niger",
    "name_cz": "Čemeřice černá",
    "type": "Herb",
    "thermal": -4,
    "moisture": -3,
    "toxicity": 75,
    "potency": 4,
    "tags": [
      "poison",
      "purgative"
    ],
    "price": 28,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING255",
    "name_lat": "Convolvulus scammonia",
    "name_cz": "Skamonie",
    "type": "Herb",
    "thermal": 2,
    "moisture": -2,
    "toxicity": 40,
    "potency": 3,
    "tags": [
      "purgative",
      "toxic"
    ],
    "price": 25,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING256",
    "name_lat": "Garcinia hanburyi",
    "name_cz": "Gambodža",
    "type": "Resin",
    "thermal": 3,
    "moisture": -2,
    "toxicity": 45,
    "potency": 3,
    "tags": [
      "purgative",
      "pigment"
    ],
    "price": 30,
    "shelf_days": 365,
    "color": "#e67e22"
  },
  {
    "id": "ING257",
    "name_lat": "Secale cereale",
    "name_cz": "Žito",
    "type": "Herb",
    "thermal": 0,
    "moisture": 1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "base",
      "nutrition"
    ],
    "price": 2,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING258",
    "name_lat": "Triticum aestivum",
    "name_cz": "Pšenice",
    "type": "Herb",
    "thermal": 0,
    "moisture": 1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "base",
      "nutrition"
    ],
    "price": 2,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING259",
    "name_lat": "Avena sativa",
    "name_cz": "Oves",
    "type": "Herb",
    "thermal": -1,
    "moisture": 1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "calming",
      "nutrition"
    ],
    "price": 2,
    "shelf_days": 365,
    "color": "#2ecc71"
  },
  {
    "id": "ING260",
    "name_lat": "Tilia",
    "name_cz": "Lípa",
    "type": "Herb",
    "thermal": -1,
    "moisture": 1,
    "toxicity": 0,
    "potency": 1,
    "tags": [
      "calming",
      "anti-fever"
    ],
    "price": 5,
    "shelf_days": 365,
    "color": "#2ecc71"
  }
];

export const RECIPES: Recipe[] = [
  {
    "id": "POT_TOXIC_WINE",
    "name_lat": "Vinum Atropinum",
    "name_cz": "Jedovatý odvar z rulíku",
    "category": "Liquid",
    "tier": 1,
    "process": "Boil",
    "base": "ING02",
    "req_ing": [
      "ING07"
    ],
    "effect": "Smrtící toxický odvar vzniklý povařením rulíku zlomocného ve víně. Vysoce nebezpečný atropinový extrakt.",
    "tags": [
      "poison",
      "toxic",
      "shady",
      "dangerous"
    ],
    "value": 45,
    "color": "#6b1135"
  },
  {
    "id": "POT_BELLADONNA_POWDER",
    "name_lat": "Pulvis Atropae",
    "name_cz": "Jemný prach z rulíku",
    "category": "Powder",
    "tier": 1,
    "process": "Grind",
    "base": "ING07",
    "req_ing": [],
    "effect": "Jemně podrcený rulík zlomocný. Laboratorní mezi-surovina pro přípravu jedů a anestetik.",
    "tags": [
      "powder",
      "toxic",
      "intermediate"
    ],
    "value": 20,
    "color": "#4a1235"
  },
  {
    "id": "POT_HERBAL_POWDER",
    "name_lat": "Pulvis Chamomillae",
    "name_cz": "Zklidňující bylinný pudr",
    "category": "Powder",
    "tier": 1,
    "process": "Grind",
    "base": "ING11",
    "req_ing": [
      "ING15"
    ],
    "effect": "Drcená směs heřmánku a křídy pro ošetření podrážděné pokožky a popálenin.",
    "tags": [
      "powder",
      "soothing",
      "healing"
    ],
    "value": 22,
    "color": "#e8e0c8"
  },
  {
    "id": "POT_CORAL_POWDER",
    "name_lat": "Pulvis Corallii et Sulphuris",
    "name_cz": "Korálový a sírový prášek",
    "category": "Powder",
    "tier": 2,
    "process": "Grind",
    "base": "ING42",
    "req_ing": [
      "ING49"
    ],
    "effect": "Jemný minerální prášek ze síry a červeného korálu. Slouží k vysušování ran a jako přísada pro alchymistické baze.",
    "tags": [
      "powder",
      "mineral",
      "preservation"
    ],
    "value": 40,
    "color": "#d9534f"
  },
  {
    "id": "POT01",
    "name_lat": "Aqua Ardens",
    "name_cz": "Hořící voda",
    "category": "Liquid",
    "tier": 1,
    "process": "Distill",
    "base": "ING02",
    "req_ing": [],
    "effect": "Silný čistič ran, dezinfekce. Vysoce hořlavé.",
    "tags": [
      "antiseptic",
      "solvent"
    ],
    "value": 15,
    "color": "#f5a623"
  },
  {
    "id": "POT02",
    "name_lat": "Aqua Vitae",
    "name_cz": "Voda života",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING02",
    "req_ing": [
      "ING01"
    ],
    "effect": "Dvojitý destilát — základ pro tinktury, silné analgetikum.",
    "tags": [
      "tonic",
      "solvent",
      "base"
    ],
    "value": 35,
    "color": "#f8e05a"
  },
  {
    "id": "POT03",
    "name_lat": "Aqua Euphrasiae",
    "name_cz": "Světlíková voda",
    "category": "Liquid",
    "tier": 1,
    "process": "Boil",
    "base": "ING01",
    "req_ing": [
      "ING15"
    ],
    "effect": "Kapky na oči, odstraňuje zarudnutí a zákal.",
    "tags": [
      "eye",
      "cooling"
    ],
    "value": 12,
    "color": "#a8d8ea"
  },
  {
    "id": "POT04",
    "name_lat": "Aqua Rosarum",
    "name_cz": "Růžová voda",
    "category": "Liquid",
    "tier": 1,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING19"
    ],
    "effect": "Zklidňuje a chladí kůži, voňavá voda pro srdeční potíže.",
    "tags": [
      "cooling",
      "heart",
      "aromatic"
    ],
    "value": 18,
    "color": "#f4b8c1"
  },
  {
    "id": "POT05",
    "name_lat": "Oxymel",
    "name_cz": "Oxymel",
    "category": "Liquid",
    "tier": 1,
    "process": "Boil",
    "base": "ING04",
    "req_ing": [
      "ING03"
    ],
    "effect": "Základní nosič pro léky na kašel a hlen. Chutná kyselě-sladce.",
    "tags": [
      "base",
      "expectorant"
    ],
    "value": 8,
    "color": "#d4a843"
  },
  {
    "id": "POT06",
    "name_lat": "Syrupus Papaveris",
    "name_cz": "Mákový sirup",
    "category": "Liquid",
    "tier": 2,
    "process": "Boil",
    "base": "ING04",
    "req_ing": [
      "ING06",
      "ING03"
    ],
    "effect": "Silné analgetikum a lék na kašel. Návykové! Toxicita střední.",
    "tags": [
      "analgesic",
      "sedative",
      "narcotic"
    ],
    "value": 45,
    "color": "#8b4513"
  },
  {
    "id": "POT07",
    "name_lat": "Mellitum de Rosis",
    "name_cz": "Medová růže",
    "category": "Liquid",
    "tier": 1,
    "process": "Mix",
    "base": "ING04",
    "req_ing": [
      "ING19"
    ],
    "effect": "Jemný lék na bolest v krku a záněty úst. Bezpečné i pro děti.",
    "tags": [
      "cooling",
      "sweet",
      "throat"
    ],
    "value": 14,
    "color": "#e8a0b4"
  },
  {
    "id": "POT08",
    "name_lat": "Vinum Absinthiatum",
    "name_cz": "Pelyňkové víno",
    "category": "Liquid",
    "tier": 1,
    "process": "Mix",
    "base": "ING02",
    "req_ing": [
      "ING56"
    ],
    "effect": "Hořké tonikum pro žaludek, ničí střevní parazity.",
    "tags": [
      "digestive",
      "anti-worm",
      "bitter"
    ],
    "value": 20,
    "color": "#6b8e23"
  },
  {
    "id": "POT09",
    "name_lat": "Potio Vulneraria",
    "name_cz": "Hojivý lektvar",
    "category": "Liquid",
    "tier": 2,
    "process": "Boil",
    "base": "ING02",
    "req_ing": [
      "ING18",
      "ING10"
    ],
    "effect": "Čistí a hojí rány, snižuje horečku. Základní lék každého ranhojiče.",
    "tags": [
      "wound",
      "anti-fever",
      "analgesic"
    ],
    "value": 30,
    "color": "#7dbd8a"
  },
  {
    "id": "POT10",
    "name_lat": "Potio Memorativa",
    "name_cz": "Lektvar paměti",
    "category": "Liquid",
    "tier": 2,
    "process": "Boil",
    "base": "ING04",
    "req_ing": [
      "ING16",
      "ING17"
    ],
    "effect": "Ostří mysl a paměť. Oblíbený u studentů a starců.",
    "tags": [
      "memory",
      "tonic",
      "warming"
    ],
    "value": 35,
    "color": "#9b59b6"
  },
  {
    "id": "POT11",
    "name_lat": "Potio Anti-melancholica",
    "name_cz": "Lektvar proti melancholii",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING02",
    "req_ing": [
      "ING20",
      "ING21"
    ],
    "effect": "Pozvedá náladu, léčí smutek černé žluči. Středověký antidepresivum.",
    "tags": [
      "mood",
      "calming",
      "heart"
    ],
    "value": 28,
    "color": "#3498db"
  },
  {
    "id": "POT12",
    "name_lat": "Elixir Proprietatis",
    "name_cz": "Elixír vlastností",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING11",
      "ING26",
      "ING22"
    ],
    "effect": "Slavný Paracelsův elixír. Pročišťuje krev, léčí chronické nemoci.",
    "tags": [
      "tonic",
      "healing",
      "blood",
      "rare"
    ],
    "value": 120,
    "color": "#e74c3c"
  },
  {
    "id": "POT13",
    "name_lat": "Acetum Destillatum",
    "name_cz": "Destilovaný ocet",
    "category": "Liquid",
    "tier": 1,
    "process": "Distill",
    "base": "ING03",
    "req_ing": [],
    "effect": "Čistý kyselý destilát. Konzervant a rozpouštědlo.",
    "tags": [
      "preservative",
      "astringent",
      "base"
    ],
    "value": 10,
    "color": "#ecf0f1"
  },
  {
    "id": "POT14",
    "name_lat": "Tinctura Myrrhae",
    "name_cz": "Myrhová tinktura",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING26"
    ],
    "effect": "Dezinfekce ran, bolesti zubů, záněty dásní.",
    "tags": [
      "antiseptic",
      "wound",
      "dental"
    ],
    "value": 40,
    "color": "#c0932f"
  },
  {
    "id": "POT15",
    "name_lat": "Laudanum",
    "name_cz": "Laudanum (Tinkt. Opia)",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING06",
      "ING22"
    ],
    "effect": "Silné analgetikum a sedativum. NEBEZPEČNÉ — snadno předávkování.",
    "tags": [
      "analgesic",
      "narcotic",
      "sedative",
      "dangerous"
    ],
    "value": 80,
    "color": "#2c1810"
  },
  {
    "id": "POT16",
    "name_lat": "Spiritus Camphorae",
    "name_cz": "Kafr v liehu",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING30"
    ],
    "effect": "Inhalace při záchvatech mdloby, vnější analgetikum.",
    "tags": [
      "cooling",
      "analgesic",
      "stimulant"
    ],
    "value": 35,
    "color": "#ffffff"
  },
  {
    "id": "POT17",
    "name_lat": "Venenum Tofana",
    "name_cz": "Jed Tofany",
    "category": "Liquid",
    "tier": 4,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING09",
      "ING52"
    ],
    "effect": "Legendární bezbarvý jed. Historicky skutečný. Smrtelné!",
    "tags": [
      "poison",
      "rare",
      "dangerous"
    ],
    "value": 300,
    "color": "#2c3e50"
  },
  {
    "id": "POT18",
    "name_lat": "Spongia Somnifera",
    "name_cz": "Spavá houba",
    "category": "Material",
    "tier": 3,
    "process": "Boil",
    "base": "ING01",
    "req_ing": [
      "ING50",
      "ING06",
      "ING07"
    ],
    "effect": "Středověká anestezie — houba namočená v narkotikách, přiložit na nos.",
    "tags": [
      "narcotic",
      "surgical",
      "sedative"
    ],
    "value": 90,
    "color": "#8b7355"
  },
  {
    "id": "POT19",
    "name_lat": "Unguentum Aureum",
    "name_cz": "Zlatá mast",
    "category": "Ointment",
    "tier": 2,
    "process": "Boil",
    "base": "ING33",
    "req_ing": [
      "ING22",
      "ING05"
    ],
    "effect": "Hojí rány a záněty kůže, zlatavá barva od šafránu.",
    "tags": [
      "wound",
      "healing",
      "anti-inflammatory"
    ],
    "value": 50,
    "color": "#f1c40f"
  },
  {
    "id": "POT20",
    "name_lat": "Unguentum Populeum",
    "name_cz": "Topol mast",
    "category": "Ointment",
    "tier": 2,
    "process": "Mix",
    "base": "ING33",
    "req_ing": [
      "ING08",
      "ING07"
    ],
    "effect": "Silně narkotická mast — utišuje bolest, navozuje spánek. Toxická!",
    "tags": [
      "analgesic",
      "narcotic",
      "dangerous"
    ],
    "value": 70,
    "color": "#2d5016"
  },
  {
    "id": "POT21",
    "name_lat": "Unguentum Aegiptiacum",
    "name_cz": "Egyptská mast",
    "category": "Ointment",
    "tier": 2,
    "process": "Mix",
    "base": "ING04",
    "req_ing": [
      "ING03",
      "ING44"
    ],
    "effect": "Silné antiseptikum na hnisavé rány. Zelené zbarvení od měděnky.",
    "tags": [
      "antiseptic",
      "wound"
    ],
    "value": 40,
    "color": "#27ae60"
  },
  {
    "id": "POT22",
    "name_lat": "Unguentum Album",
    "name_cz": "Bílá mast",
    "category": "Ointment",
    "tier": 2,
    "process": "Mix",
    "base": "ING33",
    "req_ing": [
      "ING19",
      "ING53"
    ],
    "effect": "Kosmetická mast na zánět kůže. POZOR: olovo je toxické!",
    "tags": [
      "cooling",
      "skin",
      "cosmetic"
    ],
    "value": 30,
    "color": "#f8f9fa"
  },
  {
    "id": "POT23",
    "name_lat": "Oleum Hyperici",
    "name_cz": "Třezalkový olej",
    "category": "Ointment",
    "tier": 1,
    "process": "Mix",
    "base": "ING05",
    "req_ing": [
      "ING18"
    ],
    "effect": "Hojení ran, popálenin a nervových bolestí. Červený olej.",
    "tags": [
      "wound",
      "analgesic",
      "mood"
    ],
    "value": 22,
    "color": "#e74c3c"
  },
  {
    "id": "POT24",
    "name_lat": "Oleum Rosatum",
    "name_cz": "Růžový olej",
    "category": "Ointment",
    "tier": 1,
    "process": "Mix",
    "base": "ING05",
    "req_ing": [
      "ING19"
    ],
    "effect": "Zklidňující masážní olej, chladí horečku přiložením na čelo.",
    "tags": [
      "cooling",
      "calming",
      "aromatic"
    ],
    "value": 20,
    "color": "#ffb3c6"
  },
  {
    "id": "POT25",
    "name_lat": "Emplastrum Meliloti",
    "name_cz": "Vojtěškový obklad",
    "category": "Ointment",
    "tier": 1,
    "process": "Mix",
    "base": "ING33",
    "req_ing": [
      "ING32"
    ],
    "effect": "Změkčující obklad na otoky a záněty kloubů.",
    "tags": [
      "anti-inflammatory",
      "joint",
      "base"
    ],
    "value": 15,
    "color": "#a8c090"
  },
  {
    "id": "POT26",
    "name_lat": "Electuarium de Gemmis",
    "name_cz": "Drahokamový elektuarium",
    "category": "Electuary",
    "tier": 4,
    "process": "Mix",
    "base": "ING04",
    "req_ing": [
      "ING45",
      "ING39",
      "ING46",
      "ING19"
    ],
    "effect": "Legendární kardiotonikum z drahokamů. Extrémně drahé.",
    "tags": [
      "heart",
      "tonic",
      "precious",
      "rare"
    ],
    "value": 500,
    "color": "#1abc9c"
  },
  {
    "id": "POT27",
    "name_lat": "Theriaca Andromachi",
    "name_cz": "Theriak Andromacha",
    "category": "Electuary",
    "tier": 4,
    "process": "Mix",
    "base": "ING04",
    "req_ing": [
      "ING06",
      "ING31",
      "ING26"
    ],
    "effect": "Protijedový lektvar z 64 ingrediencí. Zjednodušená verze — léčí otravy.",
    "tags": [
      "anti-poison",
      "rare",
      "analgesic"
    ],
    "value": 200,
    "color": "#8e44ad"
  },
  {
    "id": "POT28",
    "name_lat": "Mithridatium",
    "name_cz": "Mithridatum",
    "category": "Electuary",
    "tier": 3,
    "process": "Mix",
    "base": "ING04",
    "req_ing": [
      "ING14",
      "ING26",
      "ING22"
    ],
    "effect": "Universální protijed krále Mithridata. Buduje odolnost vůči jedům.",
    "tags": [
      "anti-poison",
      "tonic",
      "rare"
    ],
    "value": 150,
    "color": "#d35400"
  },
  {
    "id": "POT29",
    "name_lat": "Pulvis Contra Pestem",
    "name_cz": "Prach proti moru",
    "category": "Powder",
    "tier": 3,
    "process": "Grind",
    "base": "ING38",
    "req_ing": [
      "ING27",
      "ING11"
    ],
    "effect": "Ochranný prach nositelný v amuletu. Historicky věřili v jeho sílu.",
    "tags": [
      "anti-plague",
      "aromatic",
      "purifying"
    ],
    "value": 60,
    "color": "#bdc3c7"
  },
  {
    "id": "POT30",
    "name_lat": "Pulvis Stomachicus",
    "name_cz": "Žaludeční prach",
    "category": "Powder",
    "tier": 2,
    "process": "Grind",
    "base": "ING24",
    "req_ing": [
      "ING25",
      "ING23"
    ],
    "effect": "Koření na trávení, zahřívá žaludek, léčí nevolnost.",
    "tags": [
      "digestive",
      "warming",
      "spice"
    ],
    "value": 25,
    "color": "#e67e22"
  },
  {
    "id": "POT31",
    "name_lat": "Electuarium Sennae",
    "name_cz": "Sennové elektuarium",
    "category": "Electuary",
    "tier": 2,
    "process": "Mix",
    "base": "ING04",
    "req_ing": [
      "ING11",
      "ING24"
    ],
    "effect": "Projímadlo a purgativum — čistí humory a střeva.",
    "tags": [
      "purgative",
      "digestive",
      "cooling"
    ],
    "value": 20,
    "color": "#f0e68c"
  },
  {
    "id": "POT32",
    "name_lat": "Confectio Alkermes",
    "name_cz": "Konfekce Alkermes",
    "category": "Electuary",
    "tier": 3,
    "process": "Mix",
    "base": "ING04",
    "req_ing": [
      "ING46",
      "ING39",
      "ING25",
      "ING19"
    ],
    "effect": "Luxusní kardiotonikum s rubínovou barvou. Pro bohaté pacienty.",
    "tags": [
      "heart",
      "tonic",
      "precious",
      "aromatic"
    ],
    "value": 250,
    "color": "#c0392b"
  },
  {
    "id": "POT33",
    "name_lat": "Diamargariton",
    "name_cz": "Diamargariton",
    "category": "Powder",
    "tier": 3,
    "process": "Grind",
    "base": "ING39",
    "req_ing": [
      "ING38",
      "ING24"
    ],
    "effect": "Perlový prach — léčí srdeční slabost a stavy mdloby.",
    "tags": [
      "heart",
      "tonic",
      "precious"
    ],
    "value": 180,
    "color": "#f0f0f0"
  },
  {
    "id": "POT34",
    "name_lat": "Diarrhodon",
    "name_cz": "Diarrhodon",
    "category": "Powder",
    "tier": 2,
    "process": "Grind",
    "base": "ING19",
    "req_ing": [
      "ING25",
      "ING28"
    ],
    "effect": "Aromatický prach na bolest v hrudi a kašel.",
    "tags": [
      "aromatic",
      "cooling",
      "expectorant"
    ],
    "value": 35,
    "color": "#e8b4b8"
  },
  {
    "id": "POT35",
    "name_lat": "Atramentum",
    "name_cz": "Středověký inkoust",
    "category": "Liquid",
    "tier": 1,
    "process": "Boil",
    "base": "ING01",
    "req_ing": [
      "ING41",
      "ING42",
      "ING02"
    ],
    "effect": "Trvanlivý železo-duběnkový inkoust pro písaře.",
    "tags": [
      "pigment",
      "ink",
      "craft"
    ],
    "value": 10,
    "color": "#1a1a2e"
  },
  {
    "id": "POT36",
    "name_lat": "Chrysographia",
    "name_cz": "Zlaté písmo",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING34",
    "req_ing": [
      "ING46",
      "ING32"
    ],
    "effect": "Zlatá barva na iluminace rukopisů.",
    "tags": [
      "pigment",
      "craft",
      "precious"
    ],
    "value": 80,
    "color": "#ffd700"
  },
  {
    "id": "POT37",
    "name_lat": "Encaustum",
    "name_cz": "Černo-rudý inkoust",
    "category": "Liquid",
    "tier": 2,
    "process": "Boil",
    "base": "ING01",
    "req_ing": [
      "ING41",
      "ING44"
    ],
    "effect": "Trvanlivý modrý/zelený inkoust, pevný na pergamenu.",
    "tags": [
      "pigment",
      "ink",
      "craft"
    ],
    "value": 18,
    "color": "#2ecc71"
  },
  {
    "id": "POT38",
    "name_lat": "Vernix",
    "name_cz": "Lak na dřevo",
    "category": "Liquid",
    "tier": 2,
    "process": "Boil",
    "base": "ING54",
    "req_ing": [
      "ING29",
      "ING28"
    ],
    "effect": "Průhledný lak pro ochranu dřeva, nástrojů a desek obrazů.",
    "tags": [
      "varnish",
      "craft",
      "binder"
    ],
    "value": 22,
    "color": "#d4a843"
  },
  {
    "id": "POT39",
    "name_lat": "Pellicula Purificata",
    "name_cz": "Čistící roztok",
    "category": "Liquid",
    "tier": 1,
    "process": "Mix",
    "base": "ING01",
    "req_ing": [
      "ING42",
      "ING36"
    ],
    "effect": "Čistí a zpevňuje pergamen, odstraňuje skvrny.",
    "tags": [
      "astringent",
      "craft",
      "purifying"
    ],
    "value": 8,
    "color": "#ecf0f1"
  },
  {
    "id": "POT40",
    "name_lat": "Viride Aes",
    "name_cz": "Měděná zeleň",
    "category": "Material",
    "tier": 1,
    "process": "Mix",
    "base": "ING03",
    "req_ing": [
      "ING44",
      "ING04"
    ],
    "effect": "Zelenomodrý pigment pro iluminátory a malíře.",
    "tags": [
      "pigment",
      "craft"
    ],
    "value": 15,
    "color": "#1abc9c"
  },
  {
    "id": "POT41",
    "name_lat": "Minium Pigmentum",
    "name_cz": "Červený pigment",
    "category": "Material",
    "tier": 1,
    "process": "Grind",
    "base": "ING34",
    "req_ing": [
      "ING51",
      "ING32"
    ],
    "effect": "Sytě červený pigment — JEDOVATÉ olovo! Pouze pro zkušené iluminátory.",
    "tags": [
      "pigment",
      "craft",
      "dangerous"
    ],
    "value": 20,
    "color": "#e74c3c"
  },
  {
    "id": "POT42",
    "name_lat": "Azuritum Pigmentum",
    "name_cz": "Azurový pigment",
    "category": "Material",
    "tier": 1,
    "process": "Grind",
    "base": "ING34",
    "req_ing": [
      "ING45",
      "ING32"
    ],
    "effect": "Nádherný modrý pigment z lazuritu pro iluminace.",
    "tags": [
      "pigment",
      "craft",
      "precious"
    ],
    "value": 50,
    "color": "#3498db"
  },
  {
    "id": "POT43",
    "name_lat": "Aurum Musivum",
    "name_cz": "Zlatý pigment",
    "category": "Material",
    "tier": 2,
    "process": "Mix",
    "base": "ING34",
    "req_ing": [
      "ING52",
      "ING42"
    ],
    "effect": "Imitace zlata z arzenu. Nebezpečné při výrobě, krásné v knize.",
    "tags": [
      "pigment",
      "craft",
      "dangerous"
    ],
    "value": 35,
    "color": "#f39c12"
  },
  {
    "id": "POT44",
    "name_lat": "Glair",
    "name_cz": "Glair (pojivo pro zlato)",
    "category": "Liquid",
    "tier": 1,
    "process": "Mix",
    "base": "ING01",
    "req_ing": [
      "ING34",
      "ING03"
    ],
    "effect": "Průhledné pojivo — lepí plátkové zlato na pergamen.",
    "tags": [
      "binder",
      "craft",
      "base"
    ],
    "value": 6,
    "color": "#ffffcc"
  },
  {
    "id": "POT45",
    "name_lat": "Rubrica",
    "name_cz": "Červená rubrika",
    "category": "Material",
    "tier": 1,
    "process": "Grind",
    "base": "ING34",
    "req_ing": [
      "ING49",
      "ING32"
    ],
    "effect": "Temně červená barva pro nadpisy a rubriky v rukopisech.",
    "tags": [
      "pigment",
      "craft"
    ],
    "value": 12,
    "color": "#922b21"
  },
  {
    "id": "POT46",
    "name_lat": "Cinnabaris Pigmentum",
    "name_cz": "Rumělkový pigment",
    "category": "Material",
    "tier": 2,
    "process": "Grind",
    "base": "ING34",
    "req_ing": [
      "ING43",
      "ING32"
    ],
    "effect": "Jasně červený rumělkový pigment. Toxické rtuťnaté sloučeniny!",
    "tags": [
      "pigment",
      "craft",
      "dangerous"
    ],
    "value": 45,
    "color": "#ff4500"
  },
  {
    "id": "POT47",
    "name_lat": "Sanguis Draconis Pigmentum",
    "name_cz": "Dračí krev (barva)",
    "category": "Material",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING31",
      "ING32"
    ],
    "effect": "Tmavě červená pryskyřičná barva — pro rukopisy i alchymické pečetě.",
    "tags": [
      "pigment",
      "craft",
      "aromatic"
    ],
    "value": 55,
    "color": "#8b0000"
  },
  {
    "id": "POT48",
    "name_lat": "Aqua Fortis",
    "name_cz": "Leptací voda",
    "category": "Liquid",
    "tier": 3,
    "process": "Distill",
    "base": "ING03",
    "req_ing": [
      "ING42",
      "ING44"
    ],
    "effect": "Silná kyselina — leptá kovy, testuje ryzost zlata. NEBEZPEČNÉ!",
    "tags": [
      "acid",
      "craft",
      "dangerous"
    ],
    "value": 60,
    "color": "#f4d03f"
  },
  {
    "id": "POT49",
    "name_lat": "Oleum Camphoratum",
    "name_cz": "Kafr v oleji",
    "category": "Ointment",
    "tier": 1,
    "process": "Mix",
    "base": "ING05",
    "req_ing": [
      "ING30"
    ],
    "effect": "Chladivá mast na bolesti svalů, revma a dýchání.",
    "tags": [
      "cooling",
      "analgesic",
      "anti-spasm"
    ],
    "value": 20,
    "color": "#d5f5e3"
  },
  {
    "id": "POT50",
    "name_lat": "Pulvis Dentifricius",
    "name_cz": "Zubní prach",
    "category": "Powder",
    "tier": 1,
    "process": "Grind",
    "base": "ING36",
    "req_ing": [
      "ING29",
      "ING26"
    ],
    "effect": "Středověká zubní pasta. Čistí zuby a desinfikuje dásně.",
    "tags": [
      "dental",
      "antiseptic",
      "aromatic"
    ],
    "value": 12,
    "color": "#ecf0f1"
  },
  {
    "id": "POT51",
    "name_lat": "Aqua Boraginis",
    "name_cz": "Brutnáková voda",
    "category": "Liquid",
    "tier": 1,
    "process": "Boil",
    "base": "ING01",
    "req_ing": [
      "ING20"
    ],
    "effect": "Chladivý nápoj zahánějící horkost a melankolii.",
    "tags": [
      "cooling",
      "heart",
      "mood"
    ],
    "value": 14,
    "color": "#5d86c0"
  },
  {
    "id": "POT52",
    "name_lat": "Aqua Melissae",
    "name_cz": "Meduňková voda",
    "category": "Liquid",
    "tier": 1,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING21"
    ],
    "effect": "Srdeční kapky zklidňující křeče a bušení srdce.",
    "tags": [
      "calming",
      "heart",
      "aromatic"
    ],
    "value": 16,
    "color": "#a8d8a8"
  },
  {
    "id": "POT53",
    "name_lat": "Aqua Salviae",
    "name_cz": "Šalvějová voda",
    "category": "Liquid",
    "tier": 1,
    "process": "Boil",
    "base": "ING01",
    "req_ing": [
      "ING17"
    ],
    "effect": "Kloktadlo při zánětech v krku a krvácení dásní.",
    "tags": [
      "astringent",
      "throat",
      "healing"
    ],
    "value": 12,
    "color": "#7d9e4e"
  },
  {
    "id": "POT54",
    "name_lat": "Aqua Menthae",
    "name_cz": "Mátová voda",
    "category": "Liquid",
    "tier": 1,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING58"
    ],
    "effect": "Osvěžující nápoj proti žaludeční nevolnosti a kolice.",
    "tags": [
      "cooling",
      "digestive",
      "aromatic"
    ],
    "value": 15,
    "color": "#2ecc71"
  },
  {
    "id": "POT55",
    "name_lat": "Aqua Chamomillae",
    "name_cz": "Heřmánková voda",
    "category": "Liquid",
    "tier": 1,
    "process": "Boil",
    "base": "ING01",
    "req_ing": [
      "ING57"
    ],
    "effect": "Jemný obklad na zapálené oči a citlivou kůži.",
    "tags": [
      "calming",
      "anti-spasm",
      "cooling"
    ],
    "value": 10,
    "color": "#f1c40f"
  },
  {
    "id": "POT56",
    "name_lat": "Aqua Valerianae",
    "name_cz": "Kozlíková voda",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING13"
    ],
    "effect": "Silný prostředek proti nespavosti a nočním děsům.",
    "tags": [
      "sedative",
      "calming"
    ],
    "value": 25,
    "color": "#d7bde2"
  },
  {
    "id": "POT57",
    "name_lat": "Aqua Foeniculi",
    "name_cz": "Fenyklová voda",
    "category": "Liquid",
    "tier": 1,
    "process": "Boil",
    "base": "ING01",
    "req_ing": [
      "ING195"
    ],
    "effect": "Tiší nadýmání u nemluvňat a vyjasňuje zrak.",
    "tags": [
      "digestive",
      "eye",
      "calming"
    ],
    "value": 11,
    "color": "#d4efdf"
  },
  {
    "id": "POT58",
    "name_lat": "Vinum Scilliticum",
    "name_cz": "Mořskocibulové víno",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING02",
    "req_ing": [
      "ING228"
    ],
    "effect": "Silné močopudné víno při vodnatelnosti a srdeční slabosti.",
    "tags": [
      "diuretic",
      "heart",
      "dangerous"
    ],
    "value": 38,
    "color": "#e67e22"
  },
  {
    "id": "POT59",
    "name_lat": "Vinum Rosatum",
    "name_cz": "Růžové víno",
    "category": "Liquid",
    "tier": 1,
    "process": "Mix",
    "base": "ING02",
    "req_ing": [
      "ING19"
    ],
    "effect": "Posiluje žaludek a játra, příjemně chladí horkost.",
    "tags": [
      "cooling",
      "aromatic",
      "heart"
    ],
    "value": 18,
    "color": "#f5b7b1"
  },
  {
    "id": "POT60",
    "name_lat": "Vinum Salviatum",
    "name_cz": "Šalvějové víno",
    "category": "Liquid",
    "tier": 1,
    "process": "Mix",
    "base": "ING02",
    "req_ing": [
      "ING17"
    ],
    "effect": "Nervové tonikum prodlužující život a posilující smysly.",
    "tags": [
      "tonic",
      "warming",
      "memory"
    ],
    "value": 20,
    "color": "#82e0aa"
  },
  {
    "id": "POT61",
    "name_lat": "Vinum Aromatizatum",
    "name_cz": "Kořeněné víno",
    "category": "Liquid",
    "tier": 2,
    "process": "Boil",
    "base": "ING02",
    "req_ing": [
      "ING25",
      "ING152"
    ],
    "effect": "Zahřívá chladný žaludek, podporuje trávení těžkých jídel.",
    "tags": [
      "warming",
      "digestive",
      "spice"
    ],
    "value": 32,
    "color": "#78281f"
  },
  {
    "id": "POT62",
    "name_lat": "Oxymel Scilliticum",
    "name_cz": "Mořskocibulový oxymel",
    "category": "Liquid",
    "tier": 2,
    "process": "Boil",
    "base": "ING04",
    "req_ing": [
      "ING228",
      "ING03"
    ],
    "effect": "Otměšuje hustý hlen z plic, vyvolává zvracení při otravách.",
    "tags": [
      "expectorant",
      "emetic",
      "lung"
    ],
    "value": 40,
    "color": "#d68910"
  },
  {
    "id": "POT63",
    "name_lat": "Oxymel Simplex",
    "name_cz": "Jnoduchý oxymel",
    "category": "Liquid",
    "tier": 1,
    "process": "Boil",
    "base": "ING04",
    "req_ing": [
      "ING01",
      "ING03"
    ],
    "effect": "Kyselomedový sirup na hašení žízně při horečkách.",
    "tags": [
      "cooling",
      "base",
      "throat"
    ],
    "value": 9,
    "color": "#f8c471"
  },
  {
    "id": "POT64",
    "name_lat": "Syrupus Althaeae",
    "name_cz": "Proskurníkový sirup",
    "category": "Liquid",
    "tier": 1,
    "process": "Boil",
    "base": "ING04",
    "req_ing": [
      "ING211"
    ],
    "effect": "Obaluje krk, zklidňuje dráždivý suchý kašel.",
    "tags": [
      "demulcent",
      "lung",
      "sweet"
    ],
    "value": 15,
    "color": "#f9e79f"
  },
  {
    "id": "POT65",
    "name_lat": "Syrupus C Violaceum",
    "name_cz": "Fialkový sirup",
    "category": "Liquid",
    "tier": 1,
    "process": "Boil",
    "base": "ING04",
    "req_ing": [
      "ING115"
    ],
    "effect": "Jemné projímadlo pro děti, sráží dětské horečky.",
    "tags": [
      "cooling",
      "sweet",
      "child-safe"
    ],
    "value": 22,
    "color": "#bb8fce"
  },
  {
    "id": "POT66",
    "name_lat": "Syrupus Myrtinus",
    "name_cz": "Myrtový sirup",
    "category": "Liquid",
    "tier": 2,
    "process": "Boil",
    "base": "ING04",
    "req_ing": [
      "ING105"
    ],
    "effect": "Staví průjmy a zastavuje vnitřní krvácení.",
    "tags": [
      "astringent",
      "digestive"
    ],
    "value": 28,
    "color": "#52be80"
  },
  {
    "id": "POT67",
    "name_lat": "Syrupus Granatorum",
    "name_cz": "Granátový sirup",
    "category": "Liquid",
    "tier": 2,
    "process": "Boil",
    "base": "ING04",
    "req_ing": [
      "ING242"
    ],
    "effect": "Kyselý sirup posilující oslabený žaludek a srdce.",
    "tags": [
      "cooling",
      "astringent",
      "heart"
    ],
    "value": 30,
    "color": "#cd6155"
  },
  {
    "id": "POT68",
    "name_lat": "Tinctura Absinthii",
    "name_cz": "Pelyňková tinktura",
    "category": "Liquid",
    "tier": 1,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING56"
    ],
    "effect": "Extrémně hořké kapky na probuzení chuti k jídlu.",
    "tags": [
      "bitter",
      "digestive",
      "tonic"
    ],
    "value": 22,
    "color": "#1e8449"
  },
  {
    "id": "POT69",
    "name_lat": "Tinctura Castorei",
    "name_cz": "Bobrová tinktura",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING37"
    ],
    "effect": "Mocný prostředek proti hysterii, křečím a mdlobám.",
    "tags": [
      "spasm",
      "stimulant",
      "rare"
    ],
    "value": 75,
    "color": "#6e2c00"
  },
  {
    "id": "POT70",
    "name_lat": "Tinctura Hyperici",
    "name_cz": "Třezalková tinktura",
    "category": "Liquid",
    "tier": 1,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING18"
    ],
    "effect": "Léčí melancholii a stavy temnoty mysli.",
    "tags": [
      "mood",
      "healing",
      "warming"
    ],
    "value": 24,
    "color": "#b03a2e"
  },
  {
    "id": "POT71",
    "name_lat": "Tinctura Valerianae",
    "name_cz": "Kozlíková tinktura",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING13"
    ],
    "effect": "Rychle tiší srdeční neurózu a úzkostné záchvaty.",
    "tags": [
      "sedative",
      "calming",
      "heart"
    ],
    "value": 32,
    "color": "#76448a"
  },
  {
    "id": "POT72",
    "name_lat": "Tinctura Aloes",
    "name_cz": "Aloová tinktura",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING11"
    ],
    "effect": "Hořké purgativum, čistí játra a stimuluje žluč.",
    "tags": [
      "purgative",
      "liver",
      "bitter"
    ],
    "value": 28,
    "color": "#196f3d"
  },
  {
    "id": "POT73",
    "name_lat": "Tinctura Gallarum",
    "name_cz": "Hálková tinktura",
    "category": "Liquid",
    "tier": 1,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING41"
    ],
    "effect": "Mocně svíravý roztok na omrzliny a krvácení.",
    "tags": [
      "astringent",
      "wound"
    ],
    "value": 18,
    "color": "#4a235a"
  },
  {
    "id": "POT74",
    "name_lat": "Tinctura Guaiaci",
    "name_cz": "Guajaková tinktura",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING252"
    ],
    "effect": "Lék na francouzskou nemoc (syfilis) a bolest kloubů.",
    "tags": [
      "blood",
      "purifying",
      "rare"
    ],
    "value": 90,
    "color": "#7e5109"
  },
  {
    "id": "POT75",
    "name_lat": "Tinctura Rhei",
    "name_cz": "Reveňová tinktura",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING109"
    ],
    "effect": "V malých dávkách staví průjem, ve velkých projímá.",
    "tags": [
      "purgative",
      "digestive"
    ],
    "value": 35,
    "color": "#a04000"
  },
  {
    "id": "POT76",
    "name_lat": "Tinctura Croci",
    "name_cz": "Šafránová tinktura",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING22"
    ],
    "effect": "Zlaté kapky rozveselující srdce a posilující rodidlo.",
    "tags": [
      "mood",
      "heart",
      "precious"
    ],
    "value": 110,
    "color": "#f39c12"
  },
  {
    "id": "POT77",
    "name_lat": "Tinctura Olibani",
    "name_cz": "Kadidlová tinktura",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING27"
    ],
    "effect": "Dezinfekce dýchacích cest a hojení starých vředů.",
    "tags": [
      "aromatic",
      "purifying",
      "wound"
    ],
    "value": 42,
    "color": "#f7dc6f"
  },
  {
    "id": "POT78",
    "name_lat": "Tinctura Cinnamonii",
    "name_cz": "Skořicová tinktura",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING25"
    ],
    "effect": "Prohřívá vnitřnosti, zastavuje děložní krvácení.",
    "tags": [
      "warming",
      "spice",
      "astringent"
    ],
    "value": 38,
    "color": "#6e2c00"
  },
  {
    "id": "POT79",
    "name_lat": "Elixir Paralyticum",
    "name_cz": "Elixír proti ochrnutí",
    "category": "Liquid",
    "tier": 3,
    "process": "Boil",
    "base": "ING55",
    "req_ing": [
      "ING16",
      "ING30"
    ],
    "effect": "Prokrvuje znecitlivělé údy a stimuluje nervy.",
    "tags": [
      "stimulant",
      "warming",
      "spasm"
    ],
    "value": 85,
    "color": "#f1c40f"
  },
  {
    "id": "POT80",
    "name_lat": "Elixir Pectorale",
    "name_cz": "Prsní elixír",
    "category": "Liquid",
    "tier": 2,
    "process": "Boil",
    "base": "ING04",
    "req_ing": [
      "ING209",
      "ING03"
    ],
    "effect": "Usnadňuje vykašlávání TBC a černého kašle.",
    "tags": [
      "lung",
      "expectorant"
    ],
    "value": 45,
    "color": "#d4ac0d"
  },
  {
    "id": "POT81",
    "name_lat": "Elixir Stomachicum",
    "name_cz": "Žaludeční elixír",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING24",
      "ING124"
    ],
    "effect": "Pálivý elixír pálící studenou nevolnost a koliky.",
    "tags": [
      "warming",
      "digestive"
    ],
    "value": 40,
    "color": "#b9770e"
  },
  {
    "id": "POT82",
    "name_lat": "Elixir Uterinum",
    "name_cz": "Děložní elixír",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING225",
      "ING186"
    ],
    "effect": "Urovnává ženské periody a mírní těžké porody.",
    "tags": [
      "spasm",
      "blood"
    ],
    "value": 70,
    "color": "#7d3c98"
  },
  {
    "id": "POT83",
    "name_lat": "Elixir Nephriticum",
    "name_cz": "Ledvinový elixír",
    "category": "Liquid",
    "tier": 2,
    "process": "Boil",
    "base": "ING01",
    "req_ing": [
      "ING219",
      "ING238"
    ],
    "effect": "Rozpouští ledvinové kamínky a pstruží písek.",
    "tags": [
      "diuretic",
      "purifying"
    ],
    "value": 50,
    "color": "#27ae60"
  },
  {
    "id": "POT84",
    "name_lat": "Elixir Anti-pestilentiale",
    "name_cz": "Protimorový elixír",
    "category": "Liquid",
    "tier": 4,
    "process": "Distill",
    "base": "ING55",
    "req_ing": [
      "ING27",
      "ING14",
      "ING26"
    ],
    "effect": "Předchází nákaze černé smrti, čistí krev.",
    "tags": [
      "anti-plague",
      "purifying",
      "rare"
    ],
    "value": 220,
    "color": "#117a65"
  },
  {
    "id": "POT85",
    "name_lat": "Unguentum Basilicum",
    "name_cz": "Královská mast",
    "category": "Ointment",
    "tier": 2,
    "process": "Boil",
    "base": "ING33",
    "req_ing": [
      "ING182",
      "ING05"
    ],
    "effect": "Zrající mast — vytahuje hnis z hlubokých vředů.",
    "tags": [
      "wound",
      "healing"
    ],
    "value": 35,
    "color": "#d35400"
  },
  {
    "id": "POT86",
    "name_lat": "Unguentum Resinae",
    "name_cz": "Pryskyřičná mast",
    "category": "Ointment",
    "tier": 1,
    "process": "Mix",
    "base": "ING33",
    "req_ing": [
      "ING190"
    ],
    "effect": "Hojí popraskané paty, dlaně a tržné rány.",
    "tags": [
      "wound",
      "skin"
    ],
    "value": 18,
    "color": "#e59866"
  },
  {
    "id": "POT87",
    "name_lat": "Unguentum Citrinum",
    "name_cz": "Citronová mast",
    "category": "Ointment",
    "tier": 2,
    "process": "Mix",
    "base": "ING33",
    "req_ing": [
      "ING222"
    ],
    "effect": "Bělí pihy, čisťuje pleť od svrabu a lišejů.",
    "tags": [
      "cosmetic",
      "skin",
      "cooling"
    ],
    "value": 28,
    "color": "#f9e79f"
  },
  {
    "id": "POT88",
    "name_lat": "Unguentum Tartari",
    "name_cz": "Vinná mast",
    "category": "Ointment",
    "tier": 2,
    "process": "Mix",
    "base": "ING33",
    "req_ing": [
      "ING78"
    ],
    "effect": "Silně leptá bradavice a ztvrdlou kůži.",
    "tags": [
      "caustic",
      "skin"
    ],
    "value": 24,
    "color": "#a04000"
  },
  {
    "id": "POT89",
    "name_lat": "Unguentum Sambuci",
    "name_cz": "Bezová mast",
    "category": "Ointment",
    "tier": 1,
    "process": "Boil",
    "base": "ING33",
    "req_ing": [
      "ING208"
    ],
    "effect": "Chladí popáleniny od ohně a slunce.",
    "tags": [
      "cooling",
      "wound"
    ],
    "value": 16,
    "color": "#abebc6"
  },
  {
    "id": "POT90",
    "name_lat": "Unguentum Hydrargyri",
    "name_cz": "Rtuťová mast",
    "category": "Ointment",
    "tier": 3,
    "process": "Mix",
    "base": "ING33",
    "req_ing": [
      "ING62"
    ],
    "effect": "Hubí vešničky, svrab a morbus gallicus. Toxická!",
    "tags": [
      "poison",
      "skin",
      "dangerous"
    ],
    "value": 80,
    "color": "#7f8c8d"
  },
  {
    "id": "POT91",
    "name_lat": "Unguentum Althaeae",
    "name_cz": "Proskurníková mast",
    "category": "Ointment",
    "tier": 1,
    "process": "Boil",
    "base": "ING33",
    "req_ing": [
      "ING211"
    ],
    "effect": "Změkčuje tvrdé otoky a zatvrdlé prsní žlázy.",
    "tags": [
      "demulcent",
      "anti-inflammatory"
    ],
    "value": 20,
    "color": "#fcf3cf"
  },
  {
    "id": "POT92",
    "name_lat": "Unguentum Rosaceum",
    "name_cz": "Růžová mast",
    "category": "Ointment",
    "tier": 1,
    "process": "Mix",
    "base": "ING33",
    "req_ing": [
      "ING19"
    ],
    "effect": "Vonný balzám na rty a jemnou kůži obličeje.",
    "tags": [
      "cosmetic",
      "aromatic",
      "cooling"
    ],
    "value": 22,
    "color": "#f48fb1"
  },
  {
    "id": "POT93",
    "name_lat": "Unguentum Castorei",
    "name_cz": "Bobrová mast",
    "category": "Ointment",
    "tier": 3,
    "process": "Boil",
    "base": "ING33",
    "req_ing": [
      "ING37"
    ],
    "effect": "Maza na křeče v údech a studené paralýzy.",
    "tags": [
      "spasm",
      "warming"
    ],
    "value": 70,
    "color": "#5d4037"
  },
  {
    "id": "POT94",
    "name_lat": "Unguentum Vermium",
    "name_cz": "Žížalová mast",
    "category": "Ointment",
    "tier": 2,
    "process": "Boil",
    "base": "ING33",
    "req_ing": [
      "ING179"
    ],
    "effect": "Léčí polámané kosti, šlachy a vymknuté klouby.",
    "tags": [
      "bone",
      "joint"
    ],
    "value": 35,
    "color": "#8d6e63"
  },
  {
    "id": "POT95",
    "name_lat": "Oleum Absinthii",
    "name_cz": "Pelyňkový olej",
    "category": "Ointment",
    "tier": 1,
    "process": "Mix",
    "base": "ING05",
    "req_ing": [
      "ING56"
    ],
    "effect": "Masážní olej na bolestivý, nafouklý žaludek.",
    "tags": [
      "digestive",
      "warming"
    ],
    "value": 18,
    "color": "#558b2f"
  },
  {
    "id": "POT96",
    "name_lat": "Oleum Chamomillae",
    "name_cz": "Heřmánkový olej",
    "category": "Ointment",
    "tier": 1,
    "process": "Boil",
    "base": "ING05",
    "req_ing": [
      "ING57"
    ],
    "effect": "Mírní uší bolení a kojenecké koliky.",
    "tags": [
      "calming",
      "anti-spasm"
    ],
    "value": 16,
    "color": "#fbc02d"
  },
  {
    "id": "POT97",
    "name_lat": "Oleum Menthae",
    "name_cz": "Mátový olej",
    "category": "Ointment",
    "tier": 1,
    "process": "Mix",
    "base": "ING05",
    "req_ing": [
      "ING58"
    ],
    "effect": "Chladí spánky při spouštění migrény.",
    "tags": [
      "cooling",
      "analgesic"
    ],
    "value": 19,
    "color": "#00bfa5"
  },
  {
    "id": "POT98",
    "name_lat": "Oleum Liliorum",
    "name_cz": "Liliový olej",
    "category": "Ointment",
    "tier": 2,
    "process": "Mix",
    "base": "ING05",
    "req_ing": [
      "ING235"
    ],
    "effect": "Změkčuje jizvy, čistí mateřská znaménka.",
    "tags": [
      "cosmetic",
      "healing"
    ],
    "value": 30,
    "color": "#e0f2f1"
  },
  {
    "id": "POT99",
    "name_lat": "Oleum Laurinum",
    "name_cz": "Vavřínový olej",
    "category": "Ointment",
    "tier": 1,
    "process": "Boil",
    "base": "ING05",
    "req_ing": [
      "ING199"
    ],
    "effect": "Prohřívá revmatické klouby a ztuhlé svaly.",
    "tags": [
      "warming",
      "joint"
    ],
    "value": 22,
    "color": "#2e7d32"
  },
  {
    "id": "POT100",
    "name_lat": "Oleum Scorpione",
    "name_cz": "Štíří olej",
    "category": "Ointment",
    "tier": 3,
    "process": "Boil",
    "base": "ING05",
    "req_ing": [
      "ING178"
    ],
    "effect": "Mocný olej vytahující jedy z uštknutí a bodnutí.",
    "tags": [
      "anti-poison",
      "rare"
    ],
    "value": 90,
    "color": "#37474f"
  },
  {
    "id": "POT101",
    "name_lat": "Oleum Sabinae",
    "name_cz": "Chvojkový olej",
    "category": "Ointment",
    "tier": 2,
    "process": "Boil",
    "base": "ING05",
    "req_ing": [
      "ING200"
    ],
    "effect": "Vyvolává silné prokrvení, užívá se na bradavice. Toxické!",
    "tags": [
      "caustic",
      "poison"
    ],
    "value": 32,
    "color": "#1b5e20"
  },
  {
    "id": "POT102",
    "name_lat": "Oleum Nardinum",
    "name_cz": "Nardový olej",
    "category": "Ointment",
    "tier": 3,
    "process": "Mix",
    "base": "ING05",
    "req_ing": [
      "ING159"
    ],
    "effect": "Drahý biblický olej na pomazání, tiší nervové šílenství.",
    "tags": [
      "aromatic",
      "precious",
      "calming"
    ],
    "value": 120,
    "color": "#4e342e"
  },
  {
    "id": "POT103",
    "name_lat": "Oleum Mastichinum",
    "name_cz": "Masticový olej",
    "category": "Ointment",
    "tier": 2,
    "process": "Mix",
    "base": "ING05",
    "req_ing": [
      "ING29"
    ],
    "effect": "Posiluje uvolněný žaludek a zpevňuje kýlu.",
    "tags": [
      "digestive",
      "astringent"
    ],
    "value": 35,
    "color": "#fff8e1"
  },
  {
    "id": "POT104",
    "name_lat": "Oleum Lumbricorum",
    "name_cz": "Žížalový olej",
    "category": "Ointment",
    "tier": 2,
    "process": "Boil",
    "base": "ING05",
    "req_ing": [
      "ING179"
    ],
    "effect": "Uvolňuje ztuhlé klouby a zhojuje přetržené šlachy.",
    "tags": [
      "bone",
      "joint"
    ],
    "value": 28,
    "color": "#795548"
  },
  {
    "id": "POT105",
    "name_lat": "Oleum Anisi",
    "name_cz": "Anýzový olej",
    "category": "Ointment",
    "tier": 1,
    "process": "Distill",
    "base": "ING05",
    "req_ing": [
      "ING122"
    ],
    "effect": "Vnitřně na větry a křeče střev.",
    "tags": [
      "digestive",
      "aromatic"
    ],
    "value": 20,
    "color": "#e8f5e9"
  },
  {
    "id": "POT106",
    "name_lat": "Pulvis Digestivus",
    "name_cz": "Trávicí prach",
    "category": "Powder",
    "tier": 1,
    "process": "Grind",
    "base": "ING86",
    "req_ing": [
      "ING195"
    ],
    "effect": "Obyčejný prach po jídle k odstranění těžkosti v břiše.",
    "tags": [
      "digestive",
      "spice"
    ],
    "value": 10,
    "color": "#d7ccc8"
  },
  {
    "id": "POT107",
    "name_lat": "Pulvis Diambrae",
    "name_cz": "Ambrový prach",
    "category": "Powder",
    "tier": 3,
    "process": "Grind",
    "base": "ING130",
    "req_ing": [
      "ING25",
      "ING152"
    ],
    "effect": "Posiluje mozek, srdce a zahání zápach z úst.",
    "tags": [
      "heart",
      "aromatic",
      "brain"
    ],
    "value": 80,
    "color": "#5d4037"
  },
  {
    "id": "POT108",
    "name_lat": "Pulvis Diacinnamomi",
    "name_cz": "Skořicový prach",
    "category": "Powder",
    "tier": 2,
    "process": "Grind",
    "base": "ING25",
    "req_ing": [
      "ING24"
    ],
    "effect": "Prohřívá vnitřní orgány studených lidí.",
    "tags": [
      "warming",
      "spice"
    ],
    "value": 28,
    "color": "#8d6e63"
  },
  {
    "id": "POT109",
    "name_lat": "Pulvis Diagridii",
    "name_cz": "Skamoniový prach",
    "category": "Powder",
    "tier": 3,
    "process": "Grind",
    "base": "ING255",
    "req_ing": [
      "ING78"
    ],
    "effect": "Drastické purgativum na žluč a hleny. Pozor na dávku!",
    "tags": [
      "purgative",
      "poison"
    ],
    "value": 65,
    "color": "#f57f17"
  },
  {
    "id": "POT110",
    "name_lat": "Pulvis Epilepticus",
    "name_cz": "Padoucnicový prach",
    "category": "Powder",
    "tier": 3,
    "process": "Grind",
    "base": "ING38",
    "req_ing": [
      "ING253"
    ],
    "effect": "Lék na padoucí nemoc (epilepsii) a noční záchvaty.",
    "tags": [
      "brain",
      "spasm"
    ],
    "value": 90,
    "color": "#cfd8dc"
  },
  {
    "id": "POT111",
    "name_lat": "Pulvis Sternutatorius",
    "name_cz": "Kýchací prach",
    "category": "Powder",
    "tier": 1,
    "process": "Grind",
    "base": "ING23",
    "req_ing": [
      "ING188"
    ],
    "effect": "Vyvolává mocné kýchání, vyčišťuje hlavy od rýmy.",
    "tags": [
      "pungent",
      "brain"
    ],
    "value": 15,
    "color": "#3e2723"
  },
  {
    "id": "POT112",
    "name_lat": "Pulvis Bezoardicus",
    "name_cz": "Bezoárový prach",
    "category": "Powder",
    "tier": 4,
    "process": "Grind",
    "base": "ING39",
    "req_ing": [
      "ING40",
      "ING46"
    ],
    "effect": "Protijed ze vzácných kamenů a korálů. Ruší účinek jedů.",
    "tags": [
      "anti-poison",
      "precious",
      "rare"
    ],
    "value": 300,
    "color": "#b2dfdb"
  },
  {
    "id": "POT113",
    "name_lat": "Pulvis Aromaticus",
    "name_cz": "Aromatický prach",
    "category": "Powder",
    "tier": 1,
    "process": "Grind",
    "base": "ING16",
    "req_ing": [
      "ING17"
    ],
    "effect": "Sypání do vína pro radostnou mysl a zdravý žaludek.",
    "tags": [
      "aromatic",
      "mood"
    ],
    "value": 12,
    "color": "#c8e6c9"
  },
  {
    "id": "POT114",
    "name_lat": "Electuarium Theriaca",
    "name_cz": "Theriaková kaše",
    "category": "Electuary",
    "tier": 3,
    "process": "Mix",
    "base": "ING04",
    "req_ing": [
      "ING01",
      "ING06",
      "ING26",
      "ING31"
    ],
    "effect": "Slazený theriak pro děti a paní snášející hořkost.",
    "tags": [
      "anti-poison",
      "sweet"
    ],
    "value": 180,
    "color": "#4a148c"
  },
  {
    "id": "POT115",
    "name_lat": "Electuarium Lenitivum",
    "name_cz": "Projimavá kaše",
    "category": "Electuary",
    "tier": 1,
    "process": "Mix",
    "base": "ING04",
    "req_ing": [
      "ING141"
    ],
    "effect": "Mírné laxativum na zácpu bez bolení břicha.",
    "tags": [
      "purgative",
      "sweet"
    ],
    "value": 16,
    "color": "#827717"
  },
  {
    "id": "POT116",
    "name_lat": "Electuarium Diascordium",
    "name_cz": "Oškrabková kaše",
    "category": "Electuary",
    "tier": 2,
    "process": "Mix",
    "base": "ING04",
    "req_ing": [
      "ING206"
    ],
    "effect": "Předchází nákazám a zastavuje těžké průjmy.",
    "tags": [
      "anti-plague",
      "astringent"
    ],
    "value": 45,
    "color": "#33691e"
  },
  {
    "id": "POT117",
    "name_lat": "Electuarium Rosatum",
    "name_cz": "Růžová kaše",
    "category": "Electuary",
    "tier": 1,
    "process": "Mix",
    "base": "ING04",
    "req_ing": [
      "ING01",
      "ING19"
    ],
    "effect": "Chladí zapálená játra a posiluje žaludek.",
    "tags": [
      "cooling",
      "liver",
      "sweet"
    ],
    "value": 20,
    "color": "#f8bbd0"
  },
  {
    "id": "POT118",
    "name_lat": "Electuarium Juniperinum",
    "name_cz": "Jalovcová kaše",
    "category": "Electuary",
    "tier": 1,
    "process": "Boil",
    "base": "ING04",
    "req_ing": [
      "ING190"
    ],
    "effect": "Prohřívá ledviny, močopudný prostředek.",
    "tags": [
      "diuretic",
      "warming"
    ],
    "value": 18,
    "color": "#1b5e20"
  },
  {
    "id": "POT119",
    "name_lat": "Pilulae de Aloe",
    "name_cz": "Aloové pilulky",
    "category": "Pill",
    "tier": 1,
    "process": "Mix",
    "base": "ING11",
    "req_ing": [
      "ING32"
    ],
    "effect": "Čistící pilulky na zácpu a těžkou hlavu.",
    "tags": [
      "purgative",
      "bitter"
    ],
    "value": 14,
    "color": "#33691e"
  },
  {
    "id": "POT120",
    "name_lat": "Pilulae de Cynoglosso",
    "name_cz": "Užankové pilulky",
    "category": "Pill",
    "tier": 2,
    "process": "Mix",
    "base": "ING06",
    "req_ing": [
      "ING32"
    ],
    "effect": "Pilulky proti nocnímu kašli a bolestem. Narkotické!",
    "tags": [
      "analgesic",
      "narcotic",
      "sedative"
    ],
    "value": 40,
    "color": "#3e2723"
  },
  {
    "id": "POT121",
    "name_lat": "Pilulae Cochiae",
    "name_cz": "Cochia pilulky",
    "category": "Pill",
    "tier": 2,
    "process": "Mix",
    "base": "ING11",
    "req_ing": [
      "ING255",
      "ING32"
    ],
    "effect": "Silné čistidlo hlavy od městnání hlenů.",
    "tags": [
      "purgative",
      "brain"
    ],
    "value": 35,
    "color": "#e65100"
  },
  {
    "id": "POT122",
    "name_lat": "Pilulae Pestilentiales",
    "name_cz": "Morové pilulky",
    "category": "Pill",
    "tier": 3,
    "process": "Mix",
    "base": "ING11",
    "req_ing": [
      "ING26",
      "ING22"
    ],
    "effect": "Užívají se ráno na lačno jako ochrana před morovým vzduchem.",
    "tags": [
      "anti-plague",
      "tonic"
    ],
    "value": 85,
    "color": "#f57f17"
  },
  {
    "id": "POT123",
    "name_lat": "Pilulae Foetidae",
    "name_cz": "Smrduté pilulky",
    "category": "Pill",
    "tier": 2,
    "process": "Mix",
    "base": "ING188",
    "req_ing": [
      "ING32"
    ],
    "effect": "Na hysterii, ženské křeče a vnitřní ucpání.",
    "tags": [
      "spasm",
      "pungent"
    ],
    "value": 30,
    "color": "#212121"
  },
  {
    "id": "POT124",
    "name_lat": "Trochisci de Myrrha",
    "name_cz": "Myrhové pokroutky",
    "category": "Pill",
    "tier": 2,
    "process": "Mix",
    "base": "ING26",
    "req_ing": [
      "ING32"
    ],
    "effect": "Vyvolávají zadržanou menstruaci a čistí dělohu.",
    "tags": [
      "blood",
      "spasm"
    ],
    "value": 32,
    "color": "#8d6e63"
  },
  {
    "id": "POT125",
    "name_lat": "Trochisci Alhandal",
    "name_cz": "Kolokvintové pokroutky",
    "category": "Pill",
    "tier": 3,
    "process": "Mix",
    "base": "ING254",
    "req_ing": [
      "ING32"
    ],
    "effect": "Extrémně jedovaté drastické laxativum. Může zabít!",
    "tags": [
      "poison",
      "purgative",
      "dangerous"
    ],
    "value": 70,
    "color": "#bf360c"
  },
  {
    "id": "POT126",
    "name_lat": "Trochisci de Absinthio",
    "name_cz": "Pelyňkové pokroutky",
    "category": "Pill",
    "tier": 1,
    "process": "Mix",
    "base": "ING56",
    "req_ing": [
      "ING32"
    ],
    "effect": "Posilují slabý žaludek, hubí škrkavky.",
    "tags": [
      "digestive",
      "anti-worm"
    ],
    "value": 15,
    "color": "#33691e"
  },
  {
    "id": "POT127",
    "name_lat": "Trochisci Cypheos",
    "name_cz": "Kyfi pokroutky",
    "category": "Pill",
    "tier": 3,
    "process": "Mix",
    "base": "ING27",
    "req_ing": [
      "ING26",
      "ING04"
    ],
    "effect": "Staroegyptské vykuřovadlo a tabletky pro zdravé plíce.",
    "tags": [
      "aromatic",
      "lung",
      "precious"
    ],
    "value": 95,
    "color": "#ffb300"
  },
  {
    "id": "POT128",
    "name_lat": "Trochisci de Viperis",
    "name_cz": "Zmijí pokroutky",
    "category": "Pill",
    "tier": 3,
    "process": "Mix",
    "base": "ING176",
    "req_ing": [
      "ING32"
    ],
    "effect": "Základní složka do Theriaku. Čistí krev od malomocenství.",
    "tags": [
      "anti-poison",
      "blood",
      "rare"
    ],
    "value": 110,
    "color": "#424242"
  },
  {
    "id": "POT129",
    "name_lat": "Emplastrum Diachylon",
    "name_cz": "Olověná náplast",
    "category": "Ointment",
    "tier": 2,
    "process": "Boil",
    "base": "ING161",
    "req_ing": [
      "ING05"
    ],
    "effect": "Změkčuje tvrdošíjné otoky, dořešuje vředy.",
    "tags": [
      "wound",
      "anti-inflammatory"
    ],
    "value": 25,
    "color": "#b0bec5"
  },
  {
    "id": "POT130",
    "name_lat": "Emplastrum de Magnete",
    "name_cz": "Magnetická náplast",
    "category": "Ointment",
    "tier": 2,
    "process": "Mix",
    "base": "ING33",
    "req_ing": [
      "ING65"
    ],
    "effect": "Vytahuje železné hroty šípů a střepiny z ran.",
    "tags": [
      "wound",
      "surgical"
    ],
    "value": 40,
    "color": "#37474f"
  },
  {
    "id": "POT131",
    "name_lat": "Emplastrum Oxycroceum",
    "name_cz": "Kyselá šafránová náplast",
    "category": "Ointment",
    "tier": 3,
    "process": "Boil",
    "base": "ING33",
    "req_ing": [
      "ING22",
      "ING03"
    ],
    "effect": "Posiluje vykloubené údy, tiší kruté bolesti zlomenin.",
    "tags": [
      "bone",
      "joint",
      "analgesic"
    ],
    "value": 75,
    "color": "#ff6f00"
  },
  {
    "id": "POT132",
    "name_lat": "Emplastrum Vesicatorium",
    "name_cz": "Puchýřová náplast",
    "category": "Ointment",
    "tier": 3,
    "process": "Mix",
    "base": "ING33",
    "req_ing": [
      "ING35"
    ],
    "effect": "Nalepená na kůži táhne puchýře, odvádí špatné humory.",
    "tags": [
      "blister",
      "poison",
      "caustic"
    ],
    "value": 65,
    "color": "#2e7d32"
  },
  {
    "id": "POT133",
    "name_lat": "Emplastrum de Pice",
    "name_cz": "Smolná náplast",
    "category": "Ointment",
    "tier": 1,
    "process": "Boil",
    "base": "ING182",
    "req_ing": [
      "ING33"
    ],
    "effect": "Drží prasklé kosti v klidu, prohřívá záda.",
    "tags": [
      "bone",
      "warming"
    ],
    "value": 15,
    "color": "#3e2723"
  },
  {
    "id": "POT134",
    "name_lat": "Emplastrum de Mastiche",
    "name_cz": "Masticová náplast",
    "category": "Ointment",
    "tier": 2,
    "process": "Mix",
    "base": "ING33",
    "req_ing": [
      "ING29"
    ],
    "effect": "Přikládá se na žaludek proti neustálému zvracení.",
    "tags": [
      "digestive",
      "nausea"
    ],
    "value": 30,
    "color": "#fff3e0"
  },
  {
    "id": "POT135",
    "name_lat": "Emplastrum Gratia Dei",
    "name_cz": "Náplast Milost Boží",
    "category": "Ointment",
    "tier": 2,
    "process": "Boil",
    "base": "ING33",
    "req_ing": [
      "ING18"
    ],
    "effect": "Zázračně hojí tržné rány bez vytvoření hnisu.",
    "tags": [
      "wound",
      "healing"
    ],
    "value": 35,
    "color": "#fbc02d"
  },
  {
    "id": "POT136",
    "name_lat": "Acetum Rosatum",
    "name_cz": "Růžový ocet",
    "category": "Liquid",
    "tier": 1,
    "process": "Mix",
    "base": "ING03",
    "req_ing": [
      "ING19"
    ],
    "effect": "Obklady na čelo při třeštění hlavy v horkých horečkách.",
    "tags": [
      "cooling",
      "headache",
      "aromatic"
    ],
    "value": 14,
    "color": "#f8bbd0"
  },
  {
    "id": "POT137",
    "name_lat": "Acetum Rutaceum",
    "name_cz": "Routový ocet",
    "category": "Liquid",
    "tier": 1,
    "process": "Mix",
    "base": "ING03",
    "req_ing": [
      "ING225"
    ],
    "effect": "Čichání k tomuto octu chránilo před morovým nákazám.",
    "tags": [
      "anti-plague",
      "purifying"
    ],
    "value": 16,
    "color": "#afb42b"
  },
  {
    "id": "POT138",
    "name_lat": "Acetum Sambucinum",
    "name_cz": "Bezový ocet",
    "category": "Liquid",
    "tier": 1,
    "process": "Mix",
    "base": "ING03",
    "req_ing": [
      "ING208"
    ],
    "effect": "Sráží potivou horečku a čistí lepkavé hrdlo.",
    "tags": [
      "anti-fever",
      "cooling"
    ],
    "value": 12,
    "color": "#c8e6c9"
  },
  {
    "id": "POT139",
    "name_lat": "Acetum Scilliticum",
    "name_cz": "Mořskocibulový ocet",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING03",
    "req_ing": [
      "ING228"
    ],
    "effect": "Pročisťuje zacpanou slezinu a játra.",
    "tags": [
      "purgative",
      "liver"
    ],
    "value": 28,
    "color": "#f57f17"
  },
  {
    "id": "POT140",
    "name_lat": "Spiritus Salis",
    "name_cz": "Duch soli (kyselina solná)",
    "category": "Liquid",
    "tier": 3,
    "process": "Distill",
    "base": "ING68",
    "req_ing": [
      "ING79"
    ],
    "effect": "Dýmavá kyselina, rozpouští kovy a vápenné usazeniny.",
    "tags": [
      "acid",
      "corrosive",
      "dangerous"
    ],
    "value": 80,
    "color": "#fff59d"
  },
  {
    "id": "POT141",
    "name_lat": "Spiritus Nitri",
    "name_cz": "Duch ledku (kyselina dusičná)",
    "category": "Liquid",
    "tier": 3,
    "process": "Distill",
    "base": "ING77",
    "req_ing": [
      "ING79"
    ],
    "effect": "Silná kyselina rozpouštějící stříbro.",
    "tags": [
      "acid",
      "corrosive",
      "dangerous"
    ],
    "value": 90,
    "color": "#ffe082"
  },
  {
    "id": "POT142",
    "name_lat": "Aqua Regia",
    "name_cz": "Lučavka královská",
    "category": "Liquid",
    "tier": 4,
    "process": "Mix",
    "base": "ING68",
    "req_ing": [
      "ING77",
      "ING79"
    ],
    "effect": "Jediná kyselina, která rozpustí krále kovů — Zlato!",
    "tags": [
      "acid",
      "rare",
      "corrosive"
    ],
    "value": 200,
    "color": "#ffb300"
  },
  {
    "id": "POT143",
    "name_lat": "Spiritus Vitrioli",
    "name_cz": "Duch skalice (kys. sírová)",
    "category": "Liquid",
    "tier": 3,
    "process": "Distill",
    "base": "ING79",
    "req_ing": [],
    "effect": "Olejnátá strašlivá kyselina pálící tělo na uhel.",
    "tags": [
      "acid",
      "corrosive",
      "dangerous"
    ],
    "value": 85,
    "color": "#81c784"
  },
  {
    "id": "POT144",
    "name_lat": "Spiritus Cornu Cervi",
    "name_cz": "Jelení duch (Amoniak)",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING38",
    "req_ing": [],
    "effect": "Ostrý štiplavý plyn probouzející z nejhlubších mdlob.",
    "tags": [
      "pungent",
      "stimulant"
    ],
    "value": 40,
    "color": "#e0e0e0"
  },
  {
    "id": "POT145",
    "name_lat": "Spiritus Tartari",
    "name_cz": "Vinný duch",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING78",
    "req_ing": [],
    "effect": "Očistný destilát rozpouštějící hlenité usazeniny.",
    "tags": [
      "purifying",
      "solvent"
    ],
    "value": 35,
    "color": "#d7ccc8"
  },
  {
    "id": "POT146",
    "name_lat": "Liquor Anodynus",
    "name_cz": "Hoffmannovy kapky",
    "category": "Liquid",
    "tier": 3,
    "process": "Distill",
    "base": "ING55",
    "req_ing": [
      "ING79"
    ],
    "effect": "Éterické kapky na náhlou srdeční slabost a křeče.",
    "tags": [
      "heart",
      "spasm",
      "stimulant"
    ],
    "value": 110,
    "color": "#e0f7fa"
  },
  {
    "id": "POT147",
    "name_lat": "Oleum Vitrioli Dulce",
    "name_cz": "Sladký olej skalice (Éter)",
    "category": "Liquid",
    "tier": 3,
    "process": "Distill",
    "base": "ING55",
    "req_ing": [
      "ING01",
      "ING79"
    ],
    "effect": "Prchavá tekutina — uspává lid do hlubokého spánku bez bolesti.",
    "tags": [
      "narcotic",
      "sedative",
      "surgical"
    ],
    "value": 120,
    "color": "#b2ebf2"
  },
  {
    "id": "POT148",
    "name_lat": "Balsamum Traumaticum",
    "name_cz": "Ránový balzám",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING26",
      "ING28"
    ],
    "effect": "Zalepuje sečné rány a brání sněti.",
    "tags": [
      "wound",
      "antiseptic"
    ],
    "value": 50,
    "color": "#6d4c41"
  },
  {
    "id": "POT149",
    "name_lat": "Balsamum Vitae",
    "name_cz": "Balzám života",
    "category": "Liquid",
    "tier": 3,
    "process": "Distill",
    "base": "ING55",
    "req_ing": [
      "ING152",
      "ING25",
      "ING85"
    ],
    "effect": "Omlazuje vyschlé starce a vrací životní sílu.",
    "tags": [
      "tonic",
      "aromatic",
      "rare"
    ],
    "value": 150,
    "color": "#ffb74d"
  },
  {
    "id": "POT150",
    "name_lat": "Balsamum Sulphuris",
    "name_cz": "Sírný balzám",
    "category": "Liquid",
    "tier": 2,
    "process": "Boil",
    "base": "ING05",
    "req_ing": [
      "ING67"
    ],
    "effect": "Červený olej léčí zákeřné pádce plic a tuberkulózu.",
    "tags": [
      "lung",
      "purifying"
    ],
    "value": 45,
    "color": "#f57c00"
  },
  {
    "id": "POT151",
    "name_lat": "Balsamum Apoplecticum",
    "name_cz": "Mrtvicový balzám",
    "category": "Ointment",
    "tier": 3,
    "process": "Mix",
    "base": "ING33",
    "req_ing": [
      "ING159",
      "ING37"
    ],
    "effect": "Tře se pod nos při mrtvici a těžkých záchvatech hlavy.",
    "tags": [
      "brain",
      "stimulant",
      "rare"
    ],
    "value": 110,
    "color": "#4a148c"
  },
  {
    "id": "POT152",
    "name_lat": "Magisterium Bismuthi",
    "name_cz": "Bismutový magistr",
    "category": "Powder",
    "tier": 2,
    "process": "Grind",
    "base": "ING72",
    "req_ing": [
      "ING77",
      "ING79"
    ],
    "effect": "Sněhobílý prášek na záhadné žaludeční vředy a kosmetiku.",
    "tags": [
      "digestive",
      "cosmetic"
    ],
    "value": 45,
    "color": "#ffffff"
  },
  {
    "id": "POT153",
    "name_lat": "Magisterium Jovis",
    "name_cz": "Cínový magistr",
    "category": "Powder",
    "tier": 2,
    "process": "Grind",
    "base": "ING64",
    "req_ing": [
      "ING68",
      "ING79"
    ],
    "effect": "Prášek ničí děložní vředy a výtoky.",
    "tags": [
      "blood",
      "astringent"
    ],
    "value": 38,
    "color": "#cfd8dc"
  },
  {
    "id": "POT154",
    "name_lat": "Magisterium Saturni",
    "name_cz": "Olověný magistr (Cukr olova)",
    "category": "Powder",
    "tier": 2,
    "process": "Boil",
    "base": "ING63",
    "req_ing": [
      "ING03"
    ],
    "effect": "Sladký prášek mírní záněty. POZOR: Extrémně toxický!",
    "tags": [
      "poison",
      "cooling",
      "dangerous"
    ],
    "value": 30,
    "color": "#f5f5f5"
  },
  {
    "id": "POT155",
    "name_lat": "Magisterium Coralliorum",
    "name_cz": "Korálový magistr",
    "category": "Powder",
    "tier": 3,
    "process": "Grind",
    "base": "ING40",
    "req_ing": [
      "ING222"
    ],
    "effect": "Šumivý prášek stavící chrlění krve z plic.",
    "tags": [
      "blood",
      "heart",
      "precious"
    ],
    "value": 85,
    "color": "#ef5350"
  },
  {
    "id": "POT156",
    "name_lat": "Magisterium Margaritarum",
    "name_cz": "Perlový magistr",
    "category": "Powder",
    "tier": 3,
    "process": "Grind",
    "base": "ING39",
    "req_ing": [
      "ING222"
    ],
    "effect": "Rozpustný nápoj z perel navracející omládnutí srdce.",
    "tags": [
      "heart",
      "precious",
      "tonic"
    ],
    "value": 140,
    "color": "#f5f5f5"
  },
  {
    "id": "POT157",
    "name_lat": "Magisterium Sulphuris",
    "name_cz": "Sírné mléko",
    "category": "Liquid",
    "tier": 2,
    "process": "Boil",
    "base": "ING67",
    "req_ing": [
      "ING75"
    ],
    "effect": "Jemný bílý prášek na čištění pleti od beďarů a lišejů.",
    "tags": [
      "skin",
      "purifying"
    ],
    "value": 35,
    "color": "#fffde7"
  },
  {
    "id": "POT158",
    "name_lat": "Arcanum Corallinum",
    "name_cz": "Červený arkánum (Rtuť. nitrát)",
    "category": "Powder",
    "tier": 3,
    "process": "Boil",
    "base": "ING62",
    "req_ing": [
      "ING77",
      "ING79"
    ],
    "effect": "Jedovaté laxativum vytahující z těla starý syfilis.",
    "tags": [
      "poison",
      "purgative",
      "dangerous"
    ],
    "value": 95,
    "color": "#e53935"
  },
  {
    "id": "POT159",
    "name_lat": "Crocus Martis",
    "name_cz": "Železný šafrán",
    "category": "Powder",
    "tier": 2,
    "process": "Grind",
    "base": "ING65",
    "req_ing": [
      "ING67"
    ],
    "effect": "Červený železitý prach na bledničku (chudokrevnost).",
    "tags": [
      "blood",
      "tonic"
    ],
    "value": 25,
    "color": "#d84315"
  },
  {
    "id": "POT160",
    "name_lat": "Crocus Metallorum",
    "name_cz": "Kovový šafrán (Antimon)",
    "category": "Powder",
    "tier": 3,
    "process": "Boil",
    "base": "ING69",
    "req_ing": [
      "ING77"
    ],
    "effect": "Vyvolává prudké zvracení, čistí žaludek od otrávenin.",
    "tags": [
      "emetic",
      "purgative",
      "poison"
    ],
    "value": 60,
    "color": "#ff8f00"
  },
  {
    "id": "POT161",
    "name_lat": "Flores Sulphuris",
    "name_cz": "Sírný květ",
    "category": "Powder",
    "tier": 1,
    "process": "Distill",
    "base": "ING67",
    "req_ing": [],
    "effect": "Žlutý sublimovaný prach na astma a svrab.",
    "tags": [
      "lung",
      "skin",
      "purifying"
    ],
    "value": 15,
    "color": "#ffee58"
  },
  {
    "id": "POT162",
    "name_lat": "Flores Salis Ammoniaci",
    "name_cz": "Salmiakové květy",
    "category": "Powder",
    "tier": 2,
    "process": "Distill",
    "base": "ING71",
    "req_ing": [],
    "effect": "Bílý ostrý prášek rozpouštějící hleny a horké otoky.",
    "tags": [
      "solvent",
      "pungent"
    ],
    "value": 25,
    "color": "#eceff1"
  },
  {
    "id": "POT163",
    "name_lat": "Flores Benzoes",
    "name_cz": "Benzoinové květy (Kys. benzoová)",
    "category": "Powder",
    "tier": 2,
    "process": "Distill",
    "base": "ING28",
    "req_ing": [],
    "effect": "Voňavá jehličková sůl na průdušky a kašel.",
    "tags": [
      "aromatic",
      "lung"
    ],
    "value": 40,
    "color": "#fff8e1"
  },
  {
    "id": "POT164",
    "name_lat": "Calx Viva Purificata",
    "name_cz": "Čisté vápno",
    "category": "Powder",
    "tier": 1,
    "process": "Boil",
    "base": "ING75",
    "req_ing": [
      "ING01"
    ],
    "effect": "Kyselé vápno na rozežírání planého masa v ranách.",
    "tags": [
      "caustic",
      "wound"
    ],
    "value": 8,
    "color": "#fafafa"
  },
  {
    "id": "POT165",
    "name_lat": "Cinnabaris Factitia",
    "name_cz": "Umelá rumělka",
    "category": "Material",
    "tier": 2,
    "process": "Distill",
    "base": "ING62",
    "req_ing": [
      "ING67"
    ],
    "effect": "Syntetický jasně červený pigment ze rtuti a síry.",
    "tags": [
      "pigment",
      "craft",
      "dangerous"
    ],
    "value": 50,
    "color": "#d50000"
  },
  {
    "id": "POT166",
    "name_lat": "Turpethum Minerale",
    "name_cz": "Žlutý sirnan rtuťný",
    "category": "Powder",
    "tier": 3,
    "process": "Boil",
    "base": "ING62",
    "req_ing": [
      "ING79"
    ],
    "effect": "Žluté dávidlo na francouzskou nemoc.",
    "tags": [
      "emetic",
      "poison",
      "dangerous"
    ],
    "value": 80,
    "color": "#ffd600"
  },
  {
    "id": "POT167",
    "name_lat": "Butter of Antimony",
    "name_cz": "Antimonové máslo",
    "category": "Liquid",
    "tier": 3,
    "process": "Distill",
    "base": "ING69",
    "req_ing": [
      "ING68",
      "ING79"
    ],
    "effect": "Hustá leptavá tekutina vyžírající vzteklá kousnutí.",
    "tags": [
      "caustic",
      "acid",
      "dangerous"
    ],
    "value": 85,
    "color": "#4e342e"
  },
  {
    "id": "POT168",
    "name_lat": "Regulus Antimonii",
    "name_cz": "Antimonový král",
    "category": "Material",
    "tier": 3,
    "process": "Boil",
    "base": "ING69",
    "req_ing": [
      "ING65"
    ],
    "effect": "Čistý lesklý kov z antimonu, lije se z něj věčný dávivý kalíšek.",
    "tags": [
      "catalyst",
      "craft"
    ],
    "value": 70,
    "color": "#78909c"
  },
  {
    "id": "POT169",
    "name_lat": "Pulvis Algaroth",
    "name_cz": "Algarothův prášek",
    "category": "Powder",
    "tier": 3,
    "process": "Boil",
    "base": "ING69",
    "req_ing": [
      "ING01",
      "ING68",
      "ING79"
    ],
    "effect": "Bílý dávivý prach šetřící žaludek od pálení.",
    "tags": [
      "emetic",
      "purgative"
    ],
    "value": 75,
    "color": "#ffffff"
  },
  {
    "id": "POT170",
    "name_lat": "Glass of Antimony",
    "name_cz": "Antimonové sklo",
    "category": "Material",
    "tier": 3,
    "process": "Boil",
    "base": "ING69",
    "req_ing": [
      "ING67"
    ],
    "effect": "Žlutohnědé průhledné sklo dávající víno na zvracení.",
    "tags": [
      "emetic",
      "craft"
    ],
    "value": 65,
    "color": "#ff6f00"
  },
  {
    "id": "POT171",
    "name_lat": "Kermes Minerale",
    "name_cz": "Minerální kermes",
    "category": "Powder",
    "tier": 2,
    "process": "Boil",
    "base": "ING69",
    "req_ing": [
      "ING76"
    ],
    "effect": "Červenohnědý prášek na hrudní zápal a kašel.",
    "tags": [
      "lung",
      "expectorant"
    ],
    "value": 45,
    "color": "#bf360c"
  },
  {
    "id": "POT172",
    "name_lat": "Tartarus Emeticus",
    "name_cz": "Dávivý vinný kámen",
    "category": "Powder",
    "tier": 2,
    "process": "Boil",
    "base": "ING78",
    "req_ing": [
      "ING69"
    ],
    "effect": "Nejznámější středomořské dávidlo na přežranost.",
    "tags": [
      "emetic",
      "purgative"
    ],
    "value": 35,
    "color": "#f5f5f5"
  },
  {
    "id": "POT173",
    "name_lat": "Tartarus Solubilis",
    "name_cz": "Rozpustný vinný kámen",
    "category": "Powder",
    "tier": 2,
    "process": "Boil",
    "base": "ING78",
    "req_ing": [
      "ING76"
    ],
    "effect": "Mírné prohánědlo rozpouštějící jaterní městnání.",
    "tags": [
      "purgative",
      "liver"
    ],
    "value": 25,
    "color": "#fff3e0"
  },
  {
    "id": "POT174",
    "name_lat": "Tartarus Vitriolatus",
    "name_cz": "Síran draselný",
    "category": "Powder",
    "tier": 2,
    "process": "Boil",
    "base": "ING76",
    "req_ing": [
      "ING79"
    ],
    "effect": "Prochlazující sůl na žlučové horečky.",
    "tags": [
      "cooling",
      "purgative"
    ],
    "value": 30,
    "color": "#e0f2f1"
  },
  {
    "id": "POT175",
    "name_lat": "Sal Tartari",
    "name_cz": "Sůl vinného kamene",
    "category": "Powder",
    "tier": 1,
    "process": "Distill",
    "base": "ING78",
    "req_ing": [
      "ING01"
    ],
    "effect": "Silná alkali na čištění olejů a neutralizaci kyselin.",
    "tags": [
      "caustic",
      "purifying"
    ],
    "value": 15,
    "color": "#fafafa"
  },
  {
    "id": "POT176",
    "name_lat": "Sal Volatile Oleosum",
    "name_cz": "Aromatická prchavá sůl",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING71",
    "req_ing": [
      "ING76"
    ],
    "effect": "Lihové křísicí kapky při zástavě dechu a srdce.",
    "tags": [
      "stimulant",
      "aromatic",
      "heart"
    ],
    "value": 40,
    "color": "#e0f7fa"
  },
  {
    "id": "POT177",
    "name_lat": "Sal Prunellae",
    "name_cz": "Biskupská sůl",
    "category": "Powder",
    "tier": 2,
    "process": "Boil",
    "base": "ING77",
    "req_ing": [
      "ING67"
    ],
    "effect": "Chladivé kuličky na pálení v krku a horké močení.",
    "tags": [
      "cooling",
      "throat",
      "diuretic"
    ],
    "value": 22,
    "color": "#f1f8e9"
  },
  {
    "id": "POT178",
    "name_lat": "Sal Polychrestum",
    "name_cz": "Sůl mnoha užitků",
    "category": "Powder",
    "tier": 2,
    "process": "Boil",
    "base": "ING77",
    "req_ing": [
      "ING79"
    ],
    "effect": "Univerzální proháněcí a močopudná sůl.",
    "tags": [
      "purgative",
      "diuretic"
    ],
    "value": 28,
    "color": "#e8f5e9"
  },
  {
    "id": "POT179",
    "name_lat": "Sal Mirabile Glauberi",
    "name_cz": "Glauberova zázračná sůl",
    "category": "Powder",
    "tier": 2,
    "process": "Boil",
    "base": "ING68",
    "req_ing": [
      "ING79"
    ],
    "effect": "Slavné projímadlo čistící celou zažívací trubici.",
    "tags": [
      "purgative",
      "purifying"
    ],
    "value": 35,
    "color": "#e1f5fe"
  },
  {
    "id": "POT180",
    "name_lat": "Sal Ammoniacum Purificatum",
    "name_cz": "Čištěný salmiak",
    "category": "Powder",
    "tier": 1,
    "process": "Boil",
    "base": "ING71",
    "req_ing": [
      "ING01"
    ],
    "effect": "Chladí těžké záněty a odhání uhnilost.",
    "tags": [
      "cooling",
      "antiseptic"
    ],
    "value": 18,
    "color": "#eceff1"
  },
  {
    "id": "POT181",
    "name_lat": "Lapis Infernalis",
    "name_cz": "Pekelný kamínek (Dusičnan stříbrný)",
    "category": "Material",
    "tier": 3,
    "process": "Boil",
    "base": "ING61",
    "req_ing": [
      "ING77",
      "ING79"
    ],
    "effect": "Tyčinky na vypalování bradavic a planého masa. Černá na kůži!",
    "tags": [
      "caustic",
      "wound",
      "precious"
    ],
    "value": 95,
    "color": "#212121"
  },
  {
    "id": "POT182",
    "name_lat": "Luna Caustica",
    "name_cz": "Lunární leptadlo",
    "category": "Material",
    "tier": 3,
    "process": "Mix",
    "base": "ING61",
    "req_ing": [
      "ING79"
    ],
    "effect": "Mírnější stříbrné leptadlo na vředy.",
    "tags": [
      "caustic",
      "precious"
    ],
    "value": 85,
    "color": "#424242"
  },
  {
    "id": "POT183",
    "name_lat": "Aqua Divina",
    "name_cz": "Božská voda",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING79",
    "req_ing": [
      "ING30"
    ],
    "effect": "Oční voda na šedý zákal a těžké záněty očí.",
    "tags": [
      "eye",
      "cooling"
    ],
    "value": 40,
    "color": "#b3e5fc"
  },
  {
    "id": "POT184",
    "name_lat": "Aqua Ophthalmica",
    "name_cz": "Oční voda",
    "category": "Liquid",
    "tier": 1,
    "process": "Boil",
    "base": "ING01",
    "req_ing": [
      "ING167"
    ],
    "effect": "Chladivá voda při pálení očí od prachu a kouře.",
    "tags": [
      "eye",
      "cooling"
    ],
    "value": 15,
    "color": "#e0f7fa"
  },
  {
    "id": "POT185",
    "name_lat": "Aqua Phagedaenica",
    "name_cz": "Žravá voda",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING75",
    "req_ing": [
      "ING62"
    ],
    "effect": "Žlutá voda vyžírající sněť a staré nehojící se vředy.",
    "tags": [
      "caustic",
      "wound"
    ],
    "value": 35,
    "color": "#ffee58"
  },
  {
    "id": "POT186",
    "name_lat": "Aqua Stygia",
    "name_cz": "Styžská voda",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING68",
    "req_ing": [
      "ING62",
      "ING79"
    ],
    "effect": "Rozpustí vše kromě skla. Jedovaté dýmy!",
    "tags": [
      "acid",
      "poison",
      "dangerous"
    ],
    "value": 110,
    "color": "#37474f"
  },
  {
    "id": "POT187",
    "name_lat": "Ens Veneris",
    "name_cz": "Jsoucno Venuše (Železo-salmiak)",
    "category": "Powder",
    "tier": 3,
    "process": "Distill",
    "base": "ING65",
    "req_ing": [
      "ING71"
    ],
    "effect": "Purpurový prášek na křeče, červené krvinky a rickets.",
    "tags": [
      "blood",
      "tonic",
      "spasm"
    ],
    "value": 75,
    "color": "#8e24aa"
  },
  {
    "id": "POT188",
    "name_lat": "Aurum Potabile",
    "name_cz": "Pitné zlato",
    "category": "Liquid",
    "tier": 4,
    "process": "Distill",
    "base": "ING68",
    "req_ing": [
      "ING46",
      "ING79",
      "ING77"
    ],
    "effect": "Nejvyšší všelék rozpuštěného zlata. Ruší stáří a nemoci.",
    "tags": [
      "rare",
      "precious",
      "tonic",
      "legendary"
    ],
    "value": 1000,
    "color": "#ffd700"
  },
  {
    "id": "POT189",
    "name_lat": "Liquor Silicum",
    "name_cz": "Křemičitý luh (Vodní sklo)",
    "category": "Liquid",
    "tier": 2,
    "process": "Boil",
    "base": "ING82",
    "req_ing": [
      "ING76"
    ],
    "effect": "Hustý roztok tuhnoucí na kamen. Konzervuje vejce a dřevo.",
    "tags": [
      "craft",
      "binder"
    ],
    "value": 25,
    "color": "#eceff1"
  },
  {
    "id": "POT190",
    "name_lat": "Oleum Tartari per Deliquium",
    "name_cz": "Olej z vinného kamene",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING78",
    "req_ing": [
      "ING01"
    ],
    "effect": "Hustý alkalický olej na čištění skvrn a zjemnění pleti.",
    "tags": [
      "cosmetic",
      "purifying"
    ],
    "value": 20,
    "color": "#fff3e0"
  },
  {
    "id": "POT191",
    "name_lat": "Stibium Praeparatum",
    "name_cz": "Upravený antimon",
    "category": "Powder",
    "tier": 2,
    "process": "Grind",
    "base": "ING69",
    "req_ing": [
      "ING68"
    ],
    "effect": "Jemný prach na líčení očí a čistění krve.",
    "tags": [
      "cosmetic",
      "eye"
    ],
    "value": 22,
    "color": "#212121"
  },
  {
    "id": "POT192",
    "name_lat": "Ethiops Mineralis",
    "name_cz": "Černý minerál",
    "category": "Powder",
    "tier": 2,
    "process": "Grind",
    "base": "ING62",
    "req_ing": [
      "ING67"
    ],
    "effect": "Černý prášek hubící střevní červy a tasemnice.",
    "tags": [
      "anti-worm",
      "poison"
    ],
    "value": 30,
    "color": "#000000"
  },
  {
    "id": "POT193",
    "name_lat": "Cinnabaris Nativum",
    "name_cz": "Přírodní rumělka",
    "category": "Powder",
    "tier": 2,
    "process": "Grind",
    "base": "ING43",
    "req_ing": [],
    "effect": "Drcená ruda na červené barvivo a zklidnění šílenství.",
    "tags": [
      "pigment",
      "sedative"
    ],
    "value": 35,
    "color": "#c62828"
  },
  {
    "id": "POT194",
    "name_lat": "Lapis Medicamentosus",
    "name_cz": "Lékařský kámen",
    "category": "Material",
    "tier": 2,
    "process": "Boil",
    "base": "ING42",
    "req_ing": [
      "ING79",
      "ING75"
    ],
    "effect": "Tvrdý kámen, jehož roztok vysušuje hnisavé rány.",
    "tags": [
      "astringent",
      "wound"
    ],
    "value": 40,
    "color": "#d7ccc8"
  },
  {
    "id": "POT195",
    "name_lat": "Pulvis Catharticus",
    "name_cz": "Projímací prášek",
    "category": "Powder",
    "tier": 1,
    "process": "Grind",
    "base": "ING109",
    "req_ing": [
      "ING78"
    ],
    "effect": "Běžný prach na vyprázdnění střev před operací.",
    "tags": [
      "purgative"
    ],
    "value": 12,
    "color": "#8d6e63"
  },
  {
    "id": "POT196",
    "name_lat": "Pulvis Anodynus",
    "name_cz": "Prášek proti bolesti",
    "category": "Powder",
    "tier": 2,
    "process": "Grind",
    "base": "ING06",
    "req_ing": [
      "ING152"
    ],
    "effect": "Mírní kruté bolesti zubů a kloubů.",
    "tags": [
      "analgesic",
      "narcotic"
    ],
    "value": 35,
    "color": "#4e342e"
  },
  {
    "id": "POT197",
    "name_lat": "Pulvis Febrifugus",
    "name_cz": "Protihoroučkový prášek",
    "category": "Powder",
    "tier": 2,
    "process": "Grind",
    "base": "ING10",
    "req_ing": [
      "ING212"
    ],
    "effect": "Sráží zimničné třesavky a střídavé horečky.",
    "tags": [
      "anti-fever",
      "analgesic"
    ],
    "value": 25,
    "color": "#aed581"
  },
  {
    "id": "POT198",
    "name_lat": "Pulvis Diureticus",
    "name_cz": "Močopudný prášek",
    "category": "Powder",
    "tier": 1,
    "process": "Grind",
    "base": "ING77",
    "req_ing": [
      "ING195"
    ],
    "effect": "Vyhání přebytečnou vodu z břicha a nohou.",
    "tags": [
      "diuretic"
    ],
    "value": 15,
    "color": "#dcedc8"
  },
  {
    "id": "POT199",
    "name_lat": "Pulvis Vermifugus",
    "name_cz": "Prášek proti červům",
    "category": "Powder",
    "tier": 1,
    "process": "Grind",
    "base": "ING112",
    "req_ing": [
      "ING86"
    ],
    "effect": "Vyhání hlisty u dětí.",
    "tags": [
      "anti-worm"
    ],
    "value": 10,
    "color": "#558b2f"
  },
  {
    "id": "POT200",
    "name_lat": "Pulvis Hemostaticus",
    "name_cz": "Stavěcí prášek",
    "category": "Powder",
    "tier": 1,
    "process": "Grind",
    "base": "ING49",
    "req_ing": [
      "ING41"
    ],
    "effect": "Sypaný do rány okamžitě sráží krev.",
    "tags": [
      "blood",
      "wound"
    ],
    "value": 18,
    "color": "#b71c1c"
  },
  {
    "id": "POT201",
    "name_lat": "Pulvis Cephalicus",
    "name_cz": "Hlavový prášek",
    "category": "Powder",
    "tier": 2,
    "process": "Grind",
    "base": "ING16",
    "req_ing": [
      "ING90"
    ],
    "effect": "Šňupací prach na čištění hlavy od těžkých par.",
    "tags": [
      "brain",
      "aromatic"
    ],
    "value": 22,
    "color": "#7e57c2"
  },
  {
    "id": "POT202",
    "name_lat": "Pulvis Sanguinis",
    "name_cz": "Krevní prach",
    "category": "Powder",
    "tier": 1,
    "process": "Grind",
    "base": "ING49",
    "req_ing": [],
    "effect": "Rychlé zastavení krvácení z nosu.",
    "tags": [
      "blood",
      "astringent"
    ],
    "value": 12,
    "color": "#c62828"
  },
  {
    "id": "POT203",
    "name_lat": "Pulvis Lithontripticus",
    "name_cz": "Kamenodrtič",
    "category": "Powder",
    "tier": 3,
    "process": "Grind",
    "base": "ING181",
    "req_ing": [
      "ING175"
    ],
    "effect": "Drtí mechýřové kameny na jemný písek.",
    "tags": [
      "diuretic",
      "purifying"
    ],
    "value": 65,
    "color": "#b0bec5"
  },
  {
    "id": "POT204",
    "name_lat": "Pulvis Anti-asthmaticus",
    "name_cz": "Zádušní prášek",
    "category": "Powder",
    "tier": 2,
    "process": "Grind",
    "base": "ING88",
    "req_ing": [
      "ING209"
    ],
    "effect": "Uvolňuje stažené průdušky při záduše.",
    "tags": [
      "lung",
      "stimulant"
    ],
    "value": 38,
    "color": "#81c784"
  },
  {
    "id": "POT205",
    "name_lat": "Pulvis Alexipharmacus",
    "name_cz": "Protijedový prášek",
    "category": "Powder",
    "tier": 2,
    "process": "Grind",
    "base": "ING48",
    "req_ing": [
      "ING14"
    ],
    "effect": "Mírní účinky snědených jedovatých hub a trav.",
    "tags": [
      "anti-poison"
    ],
    "value": 30,
    "color": "#a1887f"
  },
  {
    "id": "POT206",
    "name_lat": "Pulvis Spleneticus",
    "name_cz": "Slezinový prášek",
    "category": "Powder",
    "tier": 2,
    "process": "Grind",
    "base": "ING131",
    "req_ing": [
      "ING204"
    ],
    "effect": "Odstraňuje tvrdost a bolest pod levým žebrem.",
    "tags": [
      "liver",
      "cooling"
    ],
    "value": 24,
    "color": "#9e9d24"
  },
  {
    "id": "POT207",
    "name_lat": "Pulvis Hepatica",
    "name_cz": "Jaterní prášek",
    "category": "Powder",
    "tier": 2,
    "process": "Grind",
    "base": "ING12",
    "req_ing": [
      "ING137"
    ],
    "effect": "Čistí žloutenkovou játru a otvírá průchody.",
    "tags": [
      "liver",
      "purifying"
    ],
    "value": 28,
    "color": "#fbc02d"
  },
  {
    "id": "POT208",
    "name_lat": "Pulvis Hystericus",
    "name_cz": "Hysterický prášek",
    "category": "Powder",
    "tier": 2,
    "process": "Grind",
    "base": "ING188",
    "req_ing": [
      "ING13"
    ],
    "effect": "Vypuzuje zbloudilou dělohu zpět na její místo.",
    "tags": [
      "spasm",
      "pungent"
    ],
    "value": 32,
    "color": "#3e2723"
  },
  {
    "id": "POT209",
    "name_lat": "Pulvis Arthriticus",
    "name_cz": "Pakostní prášek",
    "category": "Powder",
    "tier": 2,
    "process": "Grind",
    "base": "ING238",
    "req_ing": [
      "ING60"
    ],
    "effect": "Vyhání usazenou kyselinu z oteklých palců u nohou.",
    "tags": [
      "joint",
      "diuretic"
    ],
    "value": 30,
    "color": "#dce775"
  },
  {
    "id": "POT210",
    "name_lat": "Pulvis Ophtalmicus",
    "name_cz": "Oční prach",
    "category": "Powder",
    "tier": 2,
    "process": "Grind",
    "base": "ING80",
    "req_ing": [
      "ING15"
    ],
    "effect": "Fouká se trubičkou do oka k odstranění bělma.",
    "tags": [
      "eye",
      "cooling"
    ],
    "value": 25,
    "color": "#e0f7fa"
  },
  {
    "id": "POT211",
    "name_lat": "Pulvis Cosmeticus",
    "name_cz": "Krášlicí prach",
    "category": "Powder",
    "tier": 1,
    "process": "Grind",
    "base": "ING81",
    "req_ing": [
      "ING235"
    ],
    "effect": "Bělí tváře a pohlcuje noční pot.",
    "tags": [
      "cosmetic",
      "skin"
    ],
    "value": 15,
    "color": "#ffffff"
  },
  {
    "id": "POT212",
    "name_lat": "Pulvis Fumalis",
    "name_cz": "Vykuřovací prach",
    "category": "Powder",
    "tier": 1,
    "process": "Grind",
    "base": "ING27",
    "req_ing": [
      "ING28"
    ],
    "effect": "Sypaný na řeřavé uhlíky voňavě čistí vzduch od nemocí.",
    "tags": [
      "aromatic",
      "purifying"
    ],
    "value": 14,
    "color": "#d7ccc8"
  },
  {
    "id": "POT213",
    "name_lat": "Pulvis Pyrius",
    "name_cz": "Střelný prach",
    "category": "Powder",
    "tier": 2,
    "process": "Grind",
    "base": "ING77",
    "req_ing": [
      "ING67",
      "ING170"
    ],
    "effect": "Černý prach do hmoždířů a mušket. Výbušné!",
    "tags": [
      "explosive",
      "craft",
      "dangerous"
    ],
    "value": 40,
    "color": "#212121"
  },
  {
    "id": "POT214",
    "name_lat": "Sapo Medicatus",
    "name_cz": "Lékařské mýdlo",
    "category": "Ointment",
    "tier": 1,
    "process": "Boil",
    "base": "ING05",
    "req_ing": [
      "ING76"
    ],
    "effect": "Smyje špínu z vředů a změkčuje ztvrdlé strupy.",
    "tags": [
      "purifying",
      "skin"
    ],
    "value": 12,
    "color": "#f5f5f5"
  },
  {
    "id": "POT215",
    "name_lat": "Sapo Hispanica",
    "name_cz": "Španělské mýdlo",
    "category": "Ointment",
    "tier": 2,
    "process": "Boil",
    "base": "ING05",
    "req_ing": [
      "ING75",
      "ING76"
    ],
    "effect": "Luxusní bílé mýdlo k mytí pánů a kousavých vředů.",
    "tags": [
      "cosmetic",
      "purifying"
    ],
    "value": 25,
    "color": "#ffffff"
  },
  {
    "id": "POT216",
    "name_lat": "Sapo Tartareus",
    "name_cz": "Vinné mýdlo",
    "category": "Ointment",
    "tier": 2,
    "process": "Boil",
    "base": "ING78",
    "req_ing": [
      "ING05"
    ],
    "effect": "Mýdlo rozpouštějící zatvrdliny v kloubech.",
    "tags": [
      "joint",
      "purifying"
    ],
    "value": 22,
    "color": "#f5f5f5"
  },
  {
    "id": "POT217",
    "name_lat": "Sapo Sulphuratus",
    "name_cz": "Sírné mýdlo",
    "category": "Ointment",
    "tier": 1,
    "process": "Boil",
    "base": "ING67",
    "req_ing": [
      "ING05"
    ],
    "effect": "Nemilosrdně ničí svrab a kožní parazity.",
    "tags": [
      "skin",
      "purifying"
    ],
    "value": 18,
    "color": "#fff59d"
  },
  {
    "id": "POT218",
    "name_lat": "Rotulae Menthae",
    "name_cz": "Mátové čočky",
    "category": "Pill",
    "tier": 1,
    "process": "Mix",
    "base": "ING04",
    "req_ing": [
      "ING58"
    ],
    "effect": "Cukrové placičky chladící hrdlo a oslažující dech.",
    "tags": [
      "aromatic",
      "sweet"
    ],
    "value": 8,
    "color": "#b2dfdb"
  },
  {
    "id": "POT219",
    "name_lat": "Rotulae Cinnamonii",
    "name_cz": "Skořicové čočky",
    "category": "Pill",
    "tier": 1,
    "process": "Mix",
    "base": "ING04",
    "req_ing": [
      "ING25"
    ],
    "effect": "Hřejivé sladkosti pro slabé srdce a studený žaludek.",
    "tags": [
      "warming",
      "sweet",
      "spice"
    ],
    "value": 10,
    "color": "#d7ccc8"
  },
  {
    "id": "POT220",
    "name_lat": "Rotulae Berberum",
    "name_cz": "Dřišťálové čočky",
    "category": "Pill",
    "tier": 1,
    "process": "Mix",
    "base": "ING04",
    "req_ing": [
      "ING131"
    ],
    "effect": "Kyselé bonbóny na hašení žízně v horké horečce.",
    "tags": [
      "cooling",
      "sweet"
    ],
    "value": 9,
    "color": "#ff8a80"
  },
  {
    "id": "POT221",
    "name_lat": "Morsuli Stomachici",
    "name_cz": "Žaludeční kousky",
    "category": "Electuary",
    "tier": 1,
    "process": "Mix",
    "base": "ING04",
    "req_ing": [
      "ING24"
    ],
    "effect": "Kořeněný marcipán po hostině na dobré strávení.",
    "tags": [
      "digestive",
      "sweet",
      "spice"
    ],
    "value": 12,
    "color": "#ffe0b2"
  },
  {
    "id": "POT222",
    "name_lat": "Morsuli Imperatoris",
    "name_cz": "Císařské kousky",
    "category": "Electuary",
    "tier": 3,
    "process": "Mix",
    "base": "ING04",
    "req_ing": [
      "ING22",
      "ING130"
    ],
    "effect": "Drahocenná konfekce posilující mozkové komory.",
    "tags": [
      "brain",
      "precious",
      "sweet"
    ],
    "value": 65,
    "color": "#ffd54f"
  },
  {
    "id": "POT223",
    "name_lat": "Confectio de Hyacintho",
    "name_cz": "Hyacintová konfekce",
    "category": "Electuary",
    "tier": 3,
    "process": "Mix",
    "base": "ING04",
    "req_ing": [
      "ING197",
      "ING40",
      "ING19"
    ],
    "effect": "Lék proti strachu, srdečnímu bušení a melancholii.",
    "tags": [
      "heart",
      "calming",
      "precious"
    ],
    "value": 85,
    "color": "#e1bee7"
  },
  {
    "id": "POT224",
    "name_lat": "Pastilli de Fumaria",
    "name_cz": "Zemědýmové pastilky",
    "category": "Pill",
    "tier": 1,
    "process": "Mix",
    "base": "ING137",
    "req_ing": [
      "ING04"
    ],
    "effect": "Čistí pleť od svrabu a pálivé vyrážky.",
    "tags": [
      "skin",
      "purifying"
    ],
    "value": 11,
    "color": "#c8e6c9"
  },
  {
    "id": "POT225",
    "name_lat": "Gelatina C cervi",
    "name_cz": "Jelení rosol",
    "category": "Liquid",
    "tier": 2,
    "process": "Boil",
    "base": "ING38",
    "req_ing": [
      "ING01"
    ],
    "effect": "Výživný Rosol pro těžce nemocné, staví průjmy.",
    "tags": [
      "tonic",
      "astringent"
    ],
    "value": 25,
    "color": "#fff8e1"
  },
  {
    "id": "POT226",
    "name_lat": "Cydoniatum",
    "name_cz": "Kdoulový rosol",
    "category": "Electuary",
    "tier": 1,
    "process": "Boil",
    "base": "ING04",
    "req_ing": [
      "ING243"
    ],
    "effect": "Svíravá sladkost posilující ochablý žaludek.",
    "tags": [
      "astringent",
      "sweet",
      "digestive"
    ],
    "value": 15,
    "color": "#ffe082"
  },
  {
    "id": "POT227",
    "name_lat": "Rob de Sambuco",
    "name_cz": "Bezový povidla",
    "category": "Liquid",
    "tier": 1,
    "process": "Boil",
    "base": "ING208",
    "req_ing": [
      "ING04"
    ],
    "effect": "Hustá šťáva vyhánějící pot při těžkém nachlazení.",
    "tags": [
      "anti-fever",
      "sweet"
    ],
    "value": 14,
    "color": "#4a148c"
  },
  {
    "id": "POT228",
    "name_lat": "Rob Juniperinum",
    "name_cz": "Jalovcová povidla",
    "category": "Liquid",
    "tier": 1,
    "process": "Boil",
    "base": "ING190",
    "req_ing": [
      "ING04"
    ],
    "effect": "Čistí ledviny od písku a prohřívá tělo.",
    "tags": [
      "diuretic",
      "warming"
    ],
    "value": 16,
    "color": "#1b5e20"
  },
  {
    "id": "POT229",
    "name_lat": "Rob Ribium",
    "name_cz": "Rybízová povidla",
    "category": "Liquid",
    "tier": 1,
    "process": "Boil",
    "base": "ING110",
    "req_ing": [
      "ING04"
    ],
    "effect": "Osvěžuje v palčivých letních horečkách.",
    "tags": [
      "cooling",
      "sweet"
    ],
    "value": 10,
    "color": "#b71c1c"
  },
  {
    "id": "POT230",
    "name_lat": "Succus Glycyrrhizae",
    "name_cz": "Lékořicový obušek (Pendrek)",
    "category": "Material",
    "tier": 1,
    "process": "Boil",
    "base": "ING01",
    "req_ing": [
      "ING211"
    ],
    "effect": "Černá sladká hmota na obalení kašlajícího krku.",
    "tags": [
      "lung",
      "demulcent",
      "sweet"
    ],
    "value": 8,
    "color": "#212121"
  },
  {
    "id": "POT231",
    "name_lat": "Acanthium Extractum",
    "name_cz": "Ostropestřcový výtažek",
    "category": "Liquid",
    "tier": 2,
    "process": "Boil",
    "base": "ING01",
    "req_ing": [
      "ING204"
    ],
    "effect": "Hojí otrávená játra a žlučník.",
    "tags": [
      "liver",
      "purifying"
    ],
    "value": 28,
    "color": "#33691e"
  },
  {
    "id": "POT232",
    "name_lat": "Extractum Absinthii",
    "name_cz": "Pelyňkový výtažek",
    "category": "Liquid",
    "tier": 2,
    "process": "Boil",
    "base": "ING01",
    "req_ing": [
      "ING56"
    ],
    "effect": "Hustý hořký extrakt probouzející mrtvý žaludek.",
    "tags": [
      "bitter",
      "digestive"
    ],
    "value": 22,
    "color": "#2e7d32"
  },
  {
    "id": "POT233",
    "name_lat": "Extractum Cardui Benedicti",
    "name_cz": "Benediktový výtažek",
    "category": "Liquid",
    "tier": 2,
    "process": "Boil",
    "base": "ING01",
    "req_ing": [
      "ING225"
    ],
    "effect": "Mocné hořké tonikum proti moru a žluči.",
    "tags": [
      "bitter",
      "anti-plague"
    ],
    "value": 25,
    "color": "#558b2f"
  },
  {
    "id": "POT234",
    "name_lat": "Extractum Gentianae",
    "name_cz": "Enciánový výtažek",
    "category": "Liquid",
    "tier": 2,
    "process": "Boil",
    "base": "ING01",
    "req_ing": [
      "ING109"
    ],
    "effect": "Nejhořčejší výtažek na světě — ničí střevní červy.",
    "tags": [
      "bitter",
      "anti-worm"
    ],
    "value": 30,
    "color": "#3e2723"
  },
  {
    "id": "POT235",
    "name_lat": "Extractum Hellebori",
    "name_cz": "Čemeřicový výtažek",
    "category": "Liquid",
    "tier": 3,
    "process": "Boil",
    "base": "ING01",
    "req_ing": [
      "ING254"
    ],
    "effect": "Vypuzuje černou žluč a šílenství. Smrtelně nebezpečné!",
    "tags": [
      "poison",
      "purgative",
      "dangerous"
    ],
    "value": 75,
    "color": "#000000"
  },
  {
    "id": "POT236",
    "name_lat": "Extractum Hypocistidis",
    "name_cz": "Ozorníkový výtažek",
    "category": "Liquid",
    "tier": 2,
    "process": "Boil",
    "base": "ING01",
    "req_ing": [
      "ING41"
    ],
    "effect": "Mocně svírá uvolněná střeva a zastavuje úplavici.",
    "tags": [
      "astringent",
      "digestive"
    ],
    "value": 32,
    "color": "#4e342e"
  },
  {
    "id": "POT237",
    "name_lat": "Extractum Liquiritiae",
    "name_cz": "Lékořicový výtažek",
    "category": "Liquid",
    "tier": 1,
    "process": "Boil",
    "base": "ING01",
    "req_ing": [
      "ING02",
      "ING211"
    ],
    "effect": "Sladká šťáva na plíce a hojení žaludečních vředů.",
    "tags": [
      "lung",
      "sweet",
      "healing"
    ],
    "value": 12,
    "color": "#3e2723"
  },
  {
    "id": "POT238",
    "name_lat": "Extractum Rhei",
    "name_cz": "Reveňový výtažek",
    "category": "Liquid",
    "tier": 2,
    "process": "Boil",
    "base": "ING01",
    "req_ing": [
      "ING02",
      "ING109"
    ],
    "effect": "Čisté projímadlo bez pálivých přísad.",
    "tags": [
      "purgative",
      "liver"
    ],
    "value": 35,
    "color": "#bf360c"
  },
  {
    "id": "POT239",
    "name_lat": "Extractum Scillae",
    "name_cz": "Mořskocibulový výtažek",
    "category": "Liquid",
    "tier": 3,
    "process": "Boil",
    "base": "ING01",
    "req_ing": [
      "ING228"
    ],
    "effect": "Srdeční léčení a vyhánění vody z těla.",
    "tags": [
      "heart",
      "diuretic",
      "dangerous"
    ],
    "value": 65,
    "color": "#e65100"
  },
  {
    "id": "POT240",
    "name_lat": "Extractum Taraxaci",
    "name_cz": "Pampeliškový výtažek",
    "category": "Liquid",
    "tier": 1,
    "process": "Boil",
    "base": "ING01",
    "req_ing": [
      "ING02",
      "ING204"
    ],
    "effect": "Jarní očista krve a žlučníku.",
    "tags": [
      "purifying",
      "liver"
    ],
    "value": 10,
    "color": "#fbc02d"
  },
  {
    "id": "POT241",
    "name_lat": "Oleum Aetherium Lavandulae",
    "name_cz": "Levandulová esence",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING90"
    ],
    "effect": "Vnitřně na úzkost, zevně zahání moly a vši.",
    "tags": [
      "aromatic",
      "calming",
      "purifying"
    ],
    "value": 35,
    "color": "#7e57c2"
  },
  {
    "id": "POT242",
    "name_lat": "Oleum Aetherium Rosmarini",
    "name_cz": "Rozmarýnová esence",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING16"
    ],
    "effect": "Prokrvuje mozkové cesty, navrací paměť.",
    "tags": [
      "aromatic",
      "brain",
      "tonic"
    ],
    "value": 38,
    "color": "#388e3c"
  },
  {
    "id": "POT243",
    "name_lat": "Oleum Aetherium Salviae",
    "name_cz": "Šalvějová esence",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING17"
    ],
    "effect": "Mocně vysušuje noční poty tuberkulózních.",
    "tags": [
      "aromatic",
      "astringent"
    ],
    "value": 32,
    "color": "#689f38"
  },
  {
    "id": "POT244",
    "name_lat": "Oleum Aetherium Thymi",
    "name_cz": "Tymiánová esence",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING97"
    ],
    "effect": "Silné antiseptikum, hubí červy v ranách.",
    "tags": [
      "antiseptic",
      "aromatic",
      "wound"
    ],
    "value": 40,
    "color": "#558b2f"
  },
  {
    "id": "POT245",
    "name_lat": "Oleum Aetherium Cinnamonii",
    "name_cz": "Skořicová esence",
    "category": "Liquid",
    "tier": 3,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING25"
    ],
    "effect": "Sžíravý sladký olej křísící umírající.",
    "tags": [
      "warming",
      "stimulant",
      "spice"
    ],
    "value": 90,
    "color": "#6d4c41"
  },
  {
    "id": "POT246",
    "name_lat": "Oleum Aetherium Caryophyllorum",
    "name_cz": "Hřebíčková esence",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING152"
    ],
    "effect": "Okamžitě umrtvuje bolest zubního červa.",
    "tags": [
      "analgesic",
      "aromatic",
      "dental"
    ],
    "value": 50,
    "color": "#4e342e"
  },
  {
    "id": "POT247",
    "name_lat": "Oleum Aetherium Rutae",
    "name_cz": "Routová esence",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING225"
    ],
    "effect": "Ostrá esence na očerstvení zraku a zahánění zlých duchů.",
    "tags": [
      "aromatic",
      "eye",
      "magic"
    ],
    "value": 30,
    "color": "#afb42b"
  },
  {
    "id": "POT248",
    "name_lat": "Oleum Aetherium Sabinae",
    "name_cz": "Chvojková esence",
    "category": "Liquid",
    "tier": 3,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING200"
    ],
    "effect": "Nebezpečný olej vyvolávající potrat. Toxický!",
    "tags": [
      "poison",
      "caustic",
      "dangerous"
    ],
    "value": 85,
    "color": "#1b5e20"
  },
  {
    "id": "POT249",
    "name_lat": "Oleum Aetherium Cumi",
    "name_cz": "Kmínová esence",
    "category": "Liquid",
    "tier": 1,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING86"
    ],
    "effect": "Rychle rozpouští studené větry v břiše.",
    "tags": [
      "digestive",
      "aromatic"
    ],
    "value": 18,
    "color": "#8d6e63"
  },
  {
    "id": "POT250",
    "name_lat": "Oleum Aetherium Foeniculi",
    "name_cz": "Fenyklová esence",
    "category": "Liquid",
    "tier": 1,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING195"
    ],
    "effect": "Množí matkám mléko v prsech a čistí oči.",
    "tags": [
      "digestive",
      "eye",
      "aromatic"
    ],
    "value": 20,
    "color": "#c8e6c9"
  },
  {
    "id": "POT251",
    "name_lat": "Oleum Aetherium Anisi",
    "name_cz": "Anýzová esence",
    "category": "Liquid",
    "tier": 1,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING122"
    ],
    "effect": "Sladce vonící esence na průdušky a kašel.",
    "tags": [
      "lung",
      "aromatic",
      "sweet"
    ],
    "value": 22,
    "color": "#e8f5e9"
  },
  {
    "id": "POT252",
    "name_lat": "Oleum Aetherium Juniperi",
    "name_cz": "Jalovcová esence",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING190"
    ],
    "effect": "Silný močopudný prostředek, desinfikuje močové cesty.",
    "tags": [
      "diuretic",
      "antiseptic"
    ],
    "value": 30,
    "color": "#2e7d32"
  },
  {
    "id": "POT253",
    "name_lat": "Oleum Aetherium Citri",
    "name_cz": "Citronová esence",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING222"
    ],
    "effect": "Veselí srdce, bělí skvrny na tváři.",
    "tags": [
      "aromatic",
      "mood",
      "cosmetic"
    ],
    "value": 35,
    "color": "#ffeb3b"
  },
  {
    "id": "POT254",
    "name_lat": "Oleum Aetherium Aurantii",
    "name_cz": "Pomerančová esence",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING119"
    ],
    "effect": "Tiší bušení srdce a přivádí sladký spánek.",
    "tags": [
      "aromatic",
      "calming",
      "heart"
    ],
    "value": 40,
    "color": "#ff9800"
  },
  {
    "id": "POT255",
    "name_lat": "Oleum Aetherium Neroli",
    "name_cz": "Neroli esence",
    "category": "Liquid",
    "tier": 3,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING02",
      "ING119"
    ],
    "effect": "Nejvznosnější voňavka králů proti hluboké smutnosti.",
    "tags": [
      "aromatic",
      "precious",
      "mood"
    ],
    "value": 110,
    "color": "#fff3e0"
  },
  {
    "id": "POT256",
    "name_lat": "Oleum Aetherium Sassafras",
    "name_cz": "Sasafrasová esence",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING226"
    ],
    "effect": "Čistí krev od syfilidy a otevírá potní pory.",
    "tags": [
      "blood",
      "purifying"
    ],
    "value": 45,
    "color": "#8d6e63"
  },
  {
    "id": "POT257",
    "name_lat": "Oleum Aetherium Succini",
    "name_cz": "Jantarový olej",
    "category": "Liquid",
    "tier": 3,
    "process": "Distill",
    "base": "ING84",
    "req_ing": [],
    "effect": "Smrdutý mocný olej rozhánějící křeče a padoucnici.",
    "tags": [
      "spasm",
      "brain",
      "rare"
    ],
    "value": 80,
    "color": "#ff6f00"
  },
  {
    "id": "POT258",
    "name_lat": "Oleum Aetherium Terbinthinae",
    "name_cz": "Rektifikovaný terpentýn",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING190",
    "req_ing": [],
    "effect": "Čisté rozpouštědlo na pryskyřice, léčí plicní hnilobu.",
    "tags": [
      "solvent",
      "lung",
      "antiseptic"
    ],
    "value": 25,
    "color": "#fffde7"
  },
  {
    "id": "POT259",
    "name_lat": "Oleum Aetherium Camphorae",
    "name_cz": "Gáfrová esence",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING30",
    "req_ing": [],
    "effect": "Chladivý duch zahušťující horké záněty.",
    "tags": [
      "cooling",
      "analgesic"
    ],
    "value": 30,
    "color": "#ffffff"
  },
  {
    "id": "POT260",
    "name_lat": "Oleum Aetherium Valerianae",
    "name_cz": "Kozlíková esence",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING02",
      "ING13"
    ],
    "effect": "Těžká kořeněná vůně na uklidnění zuřivosti.",
    "tags": [
      "sedative",
      "calming"
    ],
    "value": 32,
    "color": "#5d4037"
  },
  {
    "id": "POT261",
    "name_lat": "Oleum Aetherium Valerianae Coeruleum",
    "name_cz": "Modrá kozlíková esence",
    "category": "Liquid",
    "tier": 3,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING13",
      "ING66"
    ],
    "effect": "Modrá esence okamžitě uspávající neklidné mysli.",
    "tags": [
      "sedative",
      "rare"
    ],
    "value": 75,
    "color": "#1976d2"
  },
  {
    "id": "POT262",
    "name_lat": "Oleum Aetherium Chamomillae Coeruleum",
    "name_cz": "Modrý heřmánkový olej",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING57"
    ],
    "effect": "Nádherně modrý olej zázračně hojící popálené tělo.",
    "tags": [
      "healing",
      "cooling",
      "anti-inflammatory"
    ],
    "value": 45,
    "color": "#0288d1"
  },
  {
    "id": "POT263",
    "name_lat": "Oleum Aetherium Pini",
    "name_cz": "Borovicová esence",
    "category": "Liquid",
    "tier": 1,
    "process": "Distill",
    "base": "ING01",
    "req_ing": [
      "ING02",
      "ING190"
    ],
    "effect": "Inhalace na pročištění zahleněného hrudníku.",
    "tags": [
      "lung",
      "aromatic"
    ],
    "value": 15,
    "color": "#2e7d32"
  },
  {
    "id": "POT264",
    "name_lat": "Oleum Aetherium Betulae",
    "name_cz": "Březový dehet (Juchta)",
    "category": "Liquid",
    "tier": 1,
    "process": "Distill",
    "base": "ING238",
    "req_ing": [],
    "effect": "Černý zápachavý olej na impregnaci kůže a kožní lišeje.",
    "tags": [
      "skin",
      "craft",
      "antiseptic"
    ],
    "value": 12,
    "color": "#212121"
  },
  {
    "id": "POT265",
    "name_lat": "Oleum Aetherium Fagi",
    "name_cz": "Bukový dehet",
    "category": "Liquid",
    "tier": 1,
    "process": "Distill",
    "base": "ING240",
    "req_ing": [],
    "effect": "Ničí kopytní hnilobu u koní a svrab u lidí.",
    "tags": [
      "antiseptic",
      "craft"
    ],
    "value": 10,
    "color": "#3e2723"
  },
  {
    "id": "POT266",
    "name_lat": "Tinctura Opii Camphorata",
    "name_cz": "Paregorik (Opium s kafrem)",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING30",
      "ING06",
      "ING22"
    ],
    "effect": "Uklidňuje urputný dráždivý kašel a tiší střevní křeče.",
    "tags": [
      "analgesic",
      "sedative",
      "lung"
    ],
    "value": 85,
    "color": "#4e342e"
  },
  {
    "id": "POT267",
    "name_lat": "Tinctura Opii Crocata",
    "name_cz": "Sydenhamovo laudanum",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING01",
      "ING06",
      "ING22"
    ],
    "effect": "Slavné šafránové opium na tišení nejkrutějších bolestí.",
    "tags": [
      "analgesic",
      "narcotic",
      "precious"
    ],
    "value": 120,
    "color": "#e65100"
  },
  {
    "id": "POT268",
    "name_lat": "Tinctura Benzoes Composita",
    "name_cz": "Amienský balzám",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING28",
      "ING11"
    ],
    "effect": "Inhalace na ztrátu hlasu a obklad na čerstvá seknutí.",
    "tags": [
      "throat",
      "wound",
      "aromatic"
    ],
    "value": 45,
    "color": "#ffb74d"
  },
  {
    "id": "POT269",
    "name_lat": "Tinctura Aloes et Myrrhae",
    "name_cz": "Elixír dlouhého života",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING11",
      "ING26"
    ],
    "effect": "Denní kapky na čistotu žaludku a uchování mládí.",
    "tags": [
      "tonic",
      "purgative"
    ],
    "value": 50,
    "color": "#33691e"
  },
  {
    "id": "POT270",
    "name_lat": "Tinctura Rhei et Gentianae",
    "name_cz": "Hořká reveňová tinktura",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING109",
      "ING112"
    ],
    "effect": "Lék na zkažený žaludek po shnilém mase.",
    "tags": [
      "digestive",
      "bitter"
    ],
    "value": 35,
    "color": "#bf360c"
  },
  {
    "id": "POT271",
    "name_lat": "Tinctura Lobeliae",
    "name_cz": "Lobelková tinktura",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING147"
    ],
    "effect": "Vyvolává zvracení a uvolňuje zástavu dechu.",
    "tags": [
      "emetic",
      "lung",
      "dangerous"
    ],
    "value": 60,
    "color": "#2e7d32"
  },
  {
    "id": "POT272",
    "name_lat": "Tinctura Cannabis",
    "name_cz": "Konopná tinktura",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING144"
    ],
    "effect": "Utišuje těžké křeče, přivádí veselé sny.",
    "tags": [
      "narcotic",
      "spasm",
      "sedative"
    ],
    "value": 40,
    "color": "#1b5e20"
  },
  {
    "id": "POT273",
    "name_lat": "Tinctura Stramonii",
    "name_cz": "Durmanová tinktura",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING145"
    ],
    "effect": "Mírní záchvaty astmatu. POZOR: Vyvolává bláznění!",
    "tags": [
      "poison",
      "narcotic",
      "lung",
      "dangerous"
    ],
    "value": 70,
    "color": "#212121"
  },
  {
    "id": "POT274",
    "name_lat": "Tinctura Belladonnae",
    "name_cz": "Rulíková tinktura",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING09"
    ],
    "effect": "Rozšiřuje oční zorničky paní, tiší ledvinové koliky.",
    "tags": [
      "poison",
      "eye",
      "spasm",
      "dangerous"
    ],
    "value": 75,
    "color": "#311b92"
  },
  {
    "id": "POT275",
    "name_lat": "Tinctura Hyoscyami",
    "name_cz": "Blínová tinktura",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING08"
    ],
    "effect": "Silné sedativum při šílenství a divokém kašli.",
    "tags": [
      "poison",
      "sedative",
      "dangerous"
    ],
    "value": 65,
    "color": "#1b5e20"
  },
  {
    "id": "POT276",
    "name_lat": "Tinctura Aconiti",
    "name_cz": "Omějová tinktura",
    "category": "Liquid",
    "tier": 4,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING139"
    ],
    "effect": "Kapky umrtvující trojklanný nerv. Smrtelný jed!",
    "tags": [
      "poison",
      "analgesic",
      "dangerous",
      "rare"
    ],
    "value": 150,
    "color": "#0d47a1"
  },
  {
    "id": "POT277",
    "name_lat": "Tinctura Colchici",
    "name_cz": "Obrutová tinktura",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING254",
    "req_ing": [],
    "effect": "Zázračně tiší záchvaty dny v palci.",
    "tags": [
      "joint",
      "poison",
      "dangerous"
    ],
    "value": 80,
    "color": "#4a148c"
  },
  {
    "id": "POT278",
    "name_lat": "Tinctura Digitalis",
    "name_cz": "Náprstníková tinktura",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING236"
    ],
    "effect": "Zpomaluje a posiluje zbrklé bušení srdce.",
    "tags": [
      "heart",
      "poison",
      "dangerous"
    ],
    "value": 85,
    "color": "#c2185b"
  },
  {
    "id": "POT279",
    "name_lat": "Tinctura Veratri",
    "name_cz": "Kýchavičná tinktura",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING254",
    "req_ing": [
      "ING01"
    ],
    "effect": "Prudké projímadlo a srážedlo krevního tlaku.",
    "tags": [
      "poison",
      "purgative",
      "dangerous"
    ],
    "value": 70,
    "color": "#000000"
  },
  {
    "id": "POT280",
    "name_lat": "Tinctura Cantharidis",
    "name_cz": "Tinktura ze španělských mušek",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING35"
    ],
    "effect": "Prudké dráždidlo močových cest a libosti. Nebezpečné!",
    "tags": [
      "aphrodisiac",
      "poison",
      "dangerous"
    ],
    "value": 110,
    "color": "#2e7d32"
  },
  {
    "id": "POT281",
    "name_lat": "Tinctura Scillae",
    "name_cz": "Mořskocibulová tinktura",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING228"
    ],
    "effect": "Plicní a srdeční kapky vyhánějící vodu.",
    "tags": [
      "heart",
      "diuretic"
    ],
    "value": 45,
    "color": "#f57c00"
  },
  {
    "id": "POT282",
    "name_lat": "Tinctura Capsici",
    "name_cz": "Papriková tinktura",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING23"
    ],
    "effect": "Pálivé mazání na zamrzlé údy a omrzliny.",
    "tags": [
      "warming",
      "stimulant"
    ],
    "value": 30,
    "color": "#d32f2f"
  },
  {
    "id": "POT283",
    "name_lat": "Tinctura Zingiberis",
    "name_cz": "Zázvorová tinktura",
    "category": "Liquid",
    "tier": 1,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING24"
    ],
    "effect": "Hřejivé kapky na nevolnost v kočáře.",
    "tags": [
      "digestive",
      "warming"
    ],
    "value": 22,
    "color": "#fbc02d"
  },
  {
    "id": "POT284",
    "name_lat": "Tinctura Cardamomi",
    "name_cz": "Kardamomová tinktura",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING132"
    ],
    "effect": "Aromatické kapky na posílení žaludku.",
    "tags": [
      "digestive",
      "aromatic"
    ],
    "value": 35,
    "color": "#388e3c"
  },
  {
    "id": "POT285",
    "name_lat": "Tinctura Vanillae",
    "name_cz": "Vanilková tinktura",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING113"
    ],
    "effect": "Sladká esence posilující nervy a chuť k lásce.",
    "tags": [
      "aromatic",
      "sweet",
      "precious"
    ],
    "value": 90,
    "color": "#4e342e"
  },
  {
    "id": "POT286",
    "name_lat": "Tinctura Serpylli",
    "name_cz": "Mateřídoušková tinktura",
    "category": "Liquid",
    "tier": 1,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING97"
    ],
    "effect": "Lék na křečovitý kašel a dětské psotníky.",
    "tags": [
      "lung",
      "calming"
    ],
    "value": 18,
    "color": "#7b1fa2"
  },
  {
    "id": "POT287",
    "name_lat": "Tinctura Arnicae",
    "name_cz": "Prachové kapky (Arnika)",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING01",
      "ING18"
    ],
    "effect": "Vnější obklady na krevní podlitiny a zhmožděniny.",
    "tags": [
      "wound",
      "blood"
    ],
    "value": 32,
    "color": "#fbc02d"
  },
  {
    "id": "POT288",
    "name_lat": "Tinctura Calendulae",
    "name_cz": "Měsíčková tinktura",
    "category": "Liquid",
    "tier": 1,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING01",
      "ING02",
      "ING18"
    ],
    "effect": "Hojí vředy, popáleniny a křečové žíly.",
    "tags": [
      "wound",
      "healing"
    ],
    "value": 20,
    "color": "#ffa000"
  },
  {
    "id": "POT289",
    "name_lat": "Tinctura Eucalypti",
    "name_cz": "Eukalyptová tinktura",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING210"
    ],
    "effect": "Otevírá ucpané nosní dutiny.",
    "tags": [
      "lung",
      "aromatic"
    ],
    "value": 28,
    "color": "#00796b"
  },
  {
    "id": "POT290",
    "name_lat": "Tinctura Echinaceae",
    "name_cz": "Třapatková tinktura",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING207"
    ],
    "effect": "Chrání tělo před hniložravou horečkou.",
    "tags": [
      "purifying",
      "wound"
    ],
    "value": 30,
    "color": "#c2185b"
  },
  {
    "id": "POT291",
    "name_lat": "Tinctura Sabal",
    "name_cz": "Serenoová tinktura",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING125"
    ],
    "effect": "Lék pro staré muže na obtížné močení.",
    "tags": [
      "diuretic",
      "tonic"
    ],
    "value": 35,
    "color": "#388e3c"
  },
  {
    "id": "POT292",
    "name_lat": "Tinctura Yohimbe",
    "name_cz": "Yohimbe tinktura",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING126"
    ],
    "effect": "Silný nápoj probouzející mužství.",
    "tags": [
      "aphrodisiac",
      "stimulant"
    ],
    "value": 80,
    "color": "#b71c1c"
  },
  {
    "id": "POT293",
    "name_lat": "Tinctura Passiflorae",
    "name_cz": "Mučenková tinktura",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING106"
    ],
    "effect": "Navrací spánek bez těžkých snů.",
    "tags": [
      "sedative",
      "calming"
    ],
    "value": 32,
    "color": "#7b1fa2"
  },
  {
    "id": "POT294",
    "name_lat": "Tinctura Valerianae et Hops",
    "name_cz": "Kozlík s chmelem",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING13",
      "ING217"
    ],
    "effect": "Uspávací kapky pro starce.",
    "tags": [
      "sedative",
      "bitter"
    ],
    "value": 28,
    "color": "#33691e"
  },
  {
    "id": "POT295",
    "name_lat": "Tinctura Crataegi",
    "name_cz": "Hlohomé kapky",
    "category": "Liquid",
    "tier": 1,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING239"
    ],
    "effect": "Posiluje unavené staré srdce.",
    "tags": [
      "heart",
      "tonic"
    ],
    "value": 22,
    "color": "#c62828"
  },
  {
    "id": "POT296",
    "name_lat": "Tinctura Ginkgo",
    "name_cz": "Jinanské kapky",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING16"
    ],
    "effect": "Prokrvuje studené nohy a uši.",
    "tags": [
      "brain",
      "tonic"
    ],
    "value": 30,
    "color": "#fbc02d"
  },
  {
    "id": "POT297",
    "name_lat": "Tinctura Ginseng",
    "name_cz": "Všehojové kapky (Ženšen)",
    "category": "Liquid",
    "tier": 4,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING160"
    ],
    "effect": "Čínský kořen vracící sílu po těžké nemoci.",
    "tags": [
      "tonic",
      "rare"
    ],
    "value": 150,
    "color": "#f57c00"
  },
  {
    "id": "POT298",
    "name_lat": "Tinctura Eleutherococci",
    "name_cz": "Sibiřský ženšen",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING01",
      "ING160"
    ],
    "effect": "Otočuje únavu na mocnou práci.",
    "tags": [
      "tonic",
      "stimulant"
    ],
    "value": 90,
    "color": "#e65100"
  },
  {
    "id": "POT299",
    "name_lat": "Tinctura Schisandrae",
    "name_cz": "Klanopraška",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING242"
    ],
    "effect": "Plod pěti chutí na ostření zraku v noci.",
    "tags": [
      "eye",
      "tonic"
    ],
    "value": 85,
    "color": "#b71c1c"
  },
  {
    "id": "POT300",
    "name_lat": "Tinctura Rhodiolae",
    "name_cz": "Zlatý kořen",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING01",
      "ING22"
    ],
    "effect": "Zahání tělesné vyčerpání horských nosičů.",
    "tags": [
      "tonic",
      "precious"
    ],
    "value": 95,
    "color": "#fbc02d"
  },
  {
    "id": "POT301",
    "name_lat": "Tinctura Cordis",
    "name_cz": "Srdeční tinktura",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING19",
      "ING21"
    ],
    "effect": "Tiší úzkostné bušení srdce.",
    "tags": [
      "heart",
      "calming"
    ],
    "value": 35,
    "color": "#e91e63"
  },
  {
    "id": "POT302",
    "name_lat": "Tinctura Neurotica",
    "name_cz": "Nervové kapky",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING13",
      "ING90"
    ],
    "effect": "Uklidňuje roztřesené tělo a úzkost.",
    "tags": [
      "calming",
      "sedative"
    ],
    "value": 32,
    "color": "#9c27b0"
  },
  {
    "id": "POT303",
    "name_lat": "Tinctura Digestiva",
    "name_cz": "Trávicí tinktura",
    "category": "Liquid",
    "tier": 1,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING86",
      "ING195"
    ],
    "effect": "Pomáhá vstřebat těžké mastné krmě.",
    "tags": [
      "digestive",
      "spice"
    ],
    "value": 18,
    "color": "#795548"
  },
  {
    "id": "POT304",
    "name_lat": "Tinctura Carminativa",
    "name_cz": "Kapky proti větrům",
    "category": "Liquid",
    "tier": 1,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING122",
      "ING195"
    ],
    "effect": "Léčí nadýmání a střevní křeče.",
    "tags": [
      "digestive",
      "aromatic"
    ],
    "value": 20,
    "color": "#4caf50"
  },
  {
    "id": "POT305",
    "name_lat": "Tinctura Pectoralis",
    "name_cz": "Prsní tinktura",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING93",
      "ING209"
    ],
    "effect": "Uvolňuje hleny v hrudi.",
    "tags": [
      "lung",
      "expectorant"
    ],
    "value": 28,
    "color": "#ffeb3b"
  },
  {
    "id": "POT306",
    "name_lat": "Tinctura Pulmonaria",
    "name_cz": "Plicní kapky",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING93"
    ],
    "effect": "Hojí pálivé bronchiální trubice.",
    "tags": [
      "lung",
      "healing"
    ],
    "value": 25,
    "color": "#8bc34a"
  },
  {
    "id": "POT307",
    "name_lat": "Tinctura Anti-diarrhoica",
    "name_cz": "Protiprůjmové kapky",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING41",
      "ING105"
    ],
    "effect": "Staví vodnatou stolici.",
    "tags": [
      "astringent",
      "digestive"
    ],
    "value": 30,
    "color": "#5d4037"
  },
  {
    "id": "POT308",
    "name_lat": "Tinctura Laxativa",
    "name_cz": "Projímavé kapky",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING109",
      "ING201"
    ],
    "effect": "Uvolňuje starou tvrdou zácpu.",
    "tags": [
      "purgative"
    ],
    "value": 28,
    "color": "#e65100"
  },
  {
    "id": "POT309",
    "name_lat": "Tinctura Anti-emetica",
    "name_cz": "Kapky proti zvracení",
    "category": "Liquid",
    "tier": 1,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING58",
      "ING24"
    ],
    "effect": "Tiší těhotenskou a mořskou nevolnost.",
    "tags": [
      "digestive",
      "calming"
    ],
    "value": 22,
    "color": "#009688"
  },
  {
    "id": "POT310",
    "name_lat": "Tinctura Nephritica",
    "name_cz": "Ledvinové kapky",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING219",
      "ING238"
    ],
    "effect": "Vyplavuje písek z močového měchýře.",
    "tags": [
      "diuretic",
      "purifying"
    ],
    "value": 32,
    "color": "#00bcd4"
  },
  {
    "id": "POT311",
    "name_lat": "Tinctura Rheumatica",
    "name_cz": "Revmatické kapky",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING60",
      "ING238"
    ],
    "effect": "Prohřívá bolestivé oteklé klouby.",
    "tags": [
      "joint",
      "warming"
    ],
    "value": 35,
    "color": "#ff5722"
  },
  {
    "id": "POT312",
    "name_lat": "Tinctura Anti-pyretica",
    "name_cz": "Protihoroučkové kapky",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING10",
      "ING208"
    ],
    "effect": "Sráží potivou zimnici.",
    "tags": [
      "anti-fever",
      "cooling"
    ],
    "value": 26,
    "color": "#03a9f4"
  },
  {
    "id": "POT313",
    "name_lat": "Tinctura Immunis",
    "name_cz": "Ochranné kapky",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING14",
      "ING207"
    ],
    "effect": "Chrání před studenými zimními chřipkami.",
    "tags": [
      "purifying",
      "warming"
    ],
    "value": 30,
    "color": "#cddc39"
  },
  {
    "id": "POT314",
    "name_lat": "Tinctura Aphrodisiaca",
    "name_cz": "Kapky lásky",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING101",
      "ING130"
    ],
    "effect": "Zahřívá krev a probouzí žádostivost.",
    "tags": [
      "aphrodisiac",
      "warming"
    ],
    "value": 75,
    "color": "#e91e63"
  },
  {
    "id": "POT315",
    "name_lat": "Tinctura Anxiolytica",
    "name_cz": "Kapky proti strachu",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING106",
      "ING21"
    ],
    "effect": "Rozhání paniku a noční můry.",
    "tags": [
      "calming",
      "sedative"
    ],
    "value": 38,
    "color": "#673ab7"
  },
  {
    "id": "POT316",
    "name_lat": "Tinctura Energica",
    "name_cz": "Kapky síly",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING155",
      "ING156"
    ],
    "effect": "Otočí spavost na čilou pracovitost.",
    "tags": [
      "stimulant",
      "tonic"
    ],
    "value": 45,
    "color": "#ff9800"
  },
  {
    "id": "POT317",
    "name_lat": "Tinctura Soporifera",
    "name_cz": "Spací kapky",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING06",
      "ING217"
    ],
    "effect": "Rychlé usnutí bez buzení.",
    "tags": [
      "sedative",
      "narcotic"
    ],
    "value": 40,
    "color": "#3f51b5"
  },
  {
    "id": "POT318",
    "name_lat": "Tinctura Analgetica",
    "name_cz": "Kapky proti bolesti",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING10",
      "ING224"
    ],
    "effect": "Mírní bolesti hlavy a zubů.",
    "tags": [
      "analgesic"
    ],
    "value": 28,
    "color": "#607d8b"
  },
  {
    "id": "POT319",
    "name_lat": "Tinctura Anti-spasmodica",
    "name_cz": "Protikřečové kapky",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING57",
      "ING186"
    ],
    "effect": "Tiší křeče v břiše a v údech.",
    "tags": [
      "spasm",
      "calming"
    ],
    "value": 30,
    "color": "#00bcd4"
  },
  {
    "id": "POT320",
    "name_lat": "Tinctura Dermica",
    "name_cz": "Kožní kapky",
    "category": "Liquid",
    "tier": 1,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING229"
    ],
    "effect": "Staví červené vyrážky na tváři.",
    "tags": [
      "skin",
      "astringent"
    ],
    "value": 20,
    "color": "#ff4081"
  },
  {
    "id": "POT321",
    "name_lat": "Aether Sulphuricus",
    "name_cz": "Sírný éter",
    "category": "Liquid",
    "tier": 3,
    "process": "Distill",
    "base": "ING55",
    "req_ing": [
      "ING01",
      "ING02",
      "ING79"
    ],
    "effect": "Uspávadlo při odřezávání nohou chirurgem.",
    "tags": [
      "narcotic",
      "sedative",
      "dangerous"
    ],
    "value": 110,
    "color": "#e0f7fa"
  },
  {
    "id": "POT322",
    "name_lat": "Aether Nitricus",
    "name_cz": "Ledkový éter (Sladký duch ledku)",
    "category": "Liquid",
    "tier": 3,
    "process": "Distill",
    "base": "ING55",
    "req_ing": [
      "ING77",
      "ING79"
    ],
    "effect": "Chladivé močopudné kapky s jablečnou vůní.",
    "tags": [
      "diuretic",
      "cooling",
      "aromatic"
    ],
    "value": 90,
    "color": "#fff9c4"
  },
  {
    "id": "POT323",
    "name_lat": "Aether Aceticus",
    "name_cz": "Octový éter",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING55",
    "req_ing": [
      "ING03"
    ],
    "effect": "Voňavé rozpouštědlo na pryskyřice a kříšení z mdlob.",
    "tags": [
      "solvent",
      "aromatic",
      "stimulant"
    ],
    "value": 45,
    "color": "#f5f5f5"
  },
  {
    "id": "POT324",
    "name_lat": "Collodium",
    "name_cz": "Kolodium (Tekutý obvaz)",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING258",
      "ING79"
    ],
    "effect": "Zalepuje po zaschnutí řezné rány průhlednou kožkou.",
    "tags": [
      "wound",
      "craft",
      "binder"
    ],
    "value": 80,
    "color": "#fff8e1"
  },
  {
    "id": "POT325",
    "name_lat": "Chloroformium",
    "name_cz": "Chloroform",
    "category": "Liquid",
    "tier": 4,
    "process": "Distill",
    "base": "ING55",
    "req_ing": [
      "ING75"
    ],
    "effect": "Těžká sladká tekutina k uvržení do hlubokého spánku bez vědomí.",
    "tags": [
      "narcotic",
      "sedative",
      "dangerous",
      "rare"
    ],
    "value": 250,
    "color": "#b2ebf2"
  },
  {
    "id": "POT326",
    "name_lat": "Chloralum Hydratum",
    "name_cz": "Chloralhydrát",
    "category": "Material",
    "tier": 4,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING01",
      "ING75"
    ],
    "effect": "První syntetické uspávadlo ve formě krystalů.",
    "tags": [
      "sedative",
      "narcotic",
      "dangerous"
    ],
    "value": 200,
    "color": "#ffffff"
  },
  {
    "id": "POT327",
    "name_lat": "Glycerinum",
    "name_cz": "Glycerin",
    "category": "Liquid",
    "tier": 2,
    "process": "Boil",
    "base": "ING05",
    "req_ing": [
      "ING01",
      "ING76"
    ],
    "effect": "Sladký sirupatý olej zvlhčující suchou popraskanou kůži.",
    "tags": [
      "demulcent",
      "skin",
      "sweet"
    ],
    "value": 30,
    "color": "#fafafa"
  },
  {
    "id": "POT328",
    "name_lat": "Nitro-Glycerinum",
    "name_cz": "Nitroglycerin",
    "category": "Liquid",
    "tier": 4,
    "process": "Mix",
    "base": "ING05",
    "req_ing": [
      "ING77",
      "ING79",
      "ING76"
    ],
    "effect": "Extrémně nebezpečná výbušnina! V kapce tiší srdeční křeče.",
    "tags": [
      "explosive",
      "heart",
      "dangerous",
      "rare"
    ],
    "value": 500,
    "color": "#ff8f00"
  },
  {
    "id": "POT329",
    "name_lat": "Acidum Salicylicum",
    "name_cz": "Kyselina salicylová",
    "category": "Powder",
    "tier": 2,
    "process": "Boil",
    "base": "ING10",
    "req_ing": [
      "ING68",
      "ING79"
    ],
    "effect": "Bílé jehličky hojící revmatismus a rozpouštějící kuří oka.",
    "tags": [
      "analgesic",
      "anti-fever",
      "skin"
    ],
    "value": 50,
    "color": "#ffffff"
  },
  {
    "id": "POT330",
    "name_lat": "Acidum Acetylsalicylicum",
    "name_cz": "Aspirinový prach",
    "category": "Powder",
    "tier": 3,
    "process": "Boil",
    "base": "ING10",
    "req_ing": [
      "ING03",
      "ING68",
      "ING79"
    ],
    "effect": "Zázračný lék na horečku, bolest a zánět bez pálení žaludku.",
    "tags": [
      "analgesic",
      "anti-fever",
      "rare"
    ],
    "value": 120,
    "color": "#ffffff"
  },
  {
    "id": "POT331",
    "name_lat": "Acidum Benzoicum",
    "name_cz": "Kyselina benzoová",
    "category": "Powder",
    "tier": 2,
    "process": "Distill",
    "base": "ING28",
    "req_ing": [
      "ING01"
    ],
    "effect": "Konzervant potravin a lék na plicní hnilobu.",
    "tags": [
      "preservative",
      "lung"
    ],
    "value": 40,
    "color": "#ffffff"
  },
  {
    "id": "POT332",
    "name_lat": "Acidum Citricum",
    "name_cz": "Kyselina citronová",
    "category": "Powder",
    "tier": 2,
    "process": "Boil",
    "base": "ING222",
    "req_ing": [
      "ING171"
    ],
    "effect": "Kyselé krystaly k hašení žízně a konzervaci.",
    "tags": [
      "cooling",
      "preservative"
    ],
    "value": 35,
    "color": "#ffffff"
  },
  {
    "id": "POT333",
    "name_lat": "Acidum Tartaricum",
    "name_cz": "Kyselina vinná",
    "category": "Powder",
    "tier": 2,
    "process": "Boil",
    "base": "ING78",
    "req_ing": [
      "ING171"
    ],
    "effect": "Kyselé krystaly do šumivých nápojů.",
    "tags": [
      "cooling",
      "digestive"
    ],
    "value": 30,
    "color": "#ffffff"
  },
  {
    "id": "POT334",
    "name_lat": "Acidum Tannicum",
    "name_cz": "Tanin (Kyselina tříslová)",
    "category": "Powder",
    "tier": 2,
    "process": "Boil",
    "base": "ING41",
    "req_ing": [],
    "effect": "Mocné svíradlo na stavění krvácení a otravy kovy.",
    "tags": [
      "astringent",
      "anti-poison",
      "blood"
    ],
    "value": 45,
    "color": "#d7ccc8"
  },
  {
    "id": "POT335",
    "name_lat": "Acidum Lacticum",
    "name_cz": "Kyselina mléčná",
    "category": "Liquid",
    "tier": 1,
    "process": "Boil",
    "base": "ING01",
    "req_ing": [
      "ING184"
    ],
    "effect": "Kyselá tekutina z kysaného mléka na čištění pleti.",
    "tags": [
      "skin",
      "cooling"
    ],
    "value": 15,
    "color": "#fffde7"
  },
  {
    "id": "POT336",
    "name_lat": "Acidum Oxalicum",
    "name_cz": "Kyselina šťavelová",
    "category": "Powder",
    "tier": 2,
    "process": "Boil",
    "base": "ING04",
    "req_ing": [
      "ING77",
      "ING79"
    ],
    "effect": "Jedovatá kyselina čistící rzi a skvrny od inkoustu.",
    "tags": [
      "poison",
      "craft",
      "dangerous"
    ],
    "value": 40,
    "color": "#ffffff"
  },
  {
    "id": "POT337",
    "name_lat": "Acidum Formicum",
    "name_cz": "Kyselina mravenčí",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING178",
    "req_ing": [
      "ING01"
    ],
    "effect": "Pálivá tekutina dráždící krev v revmatických údech.",
    "tags": [
      "joint",
      "caustic",
      "warming"
    ],
    "value": 35,
    "color": "#e0f7fa"
  },
  {
    "id": "POT338",
    "name_lat": "Acidum Gallicum",
    "name_cz": "Kyselina hálková",
    "category": "Powder",
    "tier": 2,
    "process": "Boil",
    "base": "ING41",
    "req_ing": [
      "ING01"
    ],
    "effect": "Základ pro trvanlivý černý inkoust a barvení vlasů.",
    "tags": [
      "craft",
      "astringent"
    ],
    "value": 30,
    "color": "#a1887f"
  },
  {
    "id": "POT399",
    "name_lat": "Lapis Philosophorum Pseudo",
    "name_cz": "Falešný kámen šalby",
    "category": "Material",
    "tier": 3,
    "process": "Boil",
    "base": "ING43",
    "req_ing": [
      "ING52",
      "ING62"
    ],
    "effect": "Svití červeně, vypadá jako Kamen moudrosti, ale šíří morové dýmy.",
    "tags": [
      "poison",
      "craft",
      "dangerous"
    ],
    "value": 150,
    "color": "#ff1744"
  },
  {
    "id": "POT400",
    "name_lat": "Magisterium Solis",
    "name_cz": "Sluneční magistr",
    "category": "Powder",
    "tier": 4,
    "process": "Distill",
    "base": "ING46",
    "req_ing": [
      "ING67",
      "ING71"
    ],
    "effect": "Zlatý prášek zářící v temnotách, zahání všechny stíny těla.",
    "tags": [
      "rare",
      "precious",
      "tonic",
      "legendary"
    ],
    "value": 800,
    "color": "#ffd700"
  },
  {
    "id": "POT401",
    "name_lat": "Magisterium Lunae",
    "name_cz": "Měsíční magistr",
    "category": "Powder",
    "tier": 4,
    "process": "Distill",
    "base": "ING61",
    "req_ing": [
      "ING77",
      "ING39"
    ],
    "effect": "Stříbřitý prášek ochlazující nejdivočejší blouznění hlavy.",
    "tags": [
      "rare",
      "precious",
      "cooling",
      "legendary"
    ],
    "value": 750,
    "color": "#e0e0e0"
  },
  {
    "id": "POT402",
    "name_lat": "Quintessentia Vitae",
    "name_cz": "Pátá podstata života",
    "category": "Liquid",
    "tier": 4,
    "process": "Distill",
    "base": "ING55",
    "req_ing": [
      "ING46",
      "ING159"
    ],
    "effect": "Průzračná kapka, jež zastavuje stárnutí a křísí umírající.",
    "tags": [
      "rare",
      "precious",
      "tonic",
      "legendary"
    ],
    "value": 1200,
    "color": "#ffffff"
  },
  {
    "id": "POT403",
    "name_lat": "Elixir Maledictum",
    "name_cz": "Zlořečený elixír",
    "category": "Liquid",
    "tier": 4,
    "process": "Distill",
    "base": "ING03",
    "req_ing": [
      "ING139",
      "ING254",
      "ING09"
    ],
    "effect": "Smrtelný jed tří nejjedovatějších rostlin sveta.",
    "tags": [
      "poison",
      "dangerous",
      "rare"
    ],
    "value": 400,
    "color": "#1a237e"
  },
  {
    "id": "POT404",
    "name_lat": "Oleum Antimonii Mysticum",
    "name_cz": "Mystický antimonový olej",
    "category": "Liquid",
    "tier": 4,
    "process": "Distill",
    "base": "ING69",
    "req_ing": [
      "ING79",
      "ING67"
    ],
    "effect": "Krvavě červený olej čistící krev od všech lidských neřestí.",
    "tags": [
      "purifying",
      "rare",
      "precious"
    ],
    "value": 500,
    "color": "#b71c1c"
  },
  {
    "id": "POT405",
    "name_lat": "Tinctura Metallorum",
    "name_cz": "Kovová tinktura",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING68",
    "req_ing": [
      "ING65",
      "ING63",
      "ING79",
      "ING77"
    ],
    "effect": "Tekutá směs rozpouštějící obecné kovy.",
    "tags": [
      "acid",
      "craft"
    ],
    "value": 180,
    "color": "#ffb74d"
  },
  {
    "id": "POT406",
    "name_lat": "Pulvis Alcahest",
    "name_cz": "Alkahestový prach",
    "category": "Powder",
    "tier": 4,
    "process": "Distill",
    "base": "ING71",
    "req_ing": [
      "ING76",
      "ING77"
    ],
    "effect": "Univerzální rozpouštědlo alchymistů ve formě soli.",
    "tags": [
      "solvent",
      "rare",
      "legendary"
    ],
    "value": 900,
    "color": "#f5f5f5"
  },
  {
    "id": "POT407",
    "name_lat": "Aqua Reginae Hungariae",
    "name_cz": "Voda uherské královny",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING55",
    "req_ing": [
      "ING16",
      "ING90"
    ],
    "effect": "Slavný omlazovací líh navracející krásu a zdraví kloubům.",
    "tags": [
      "aromatic",
      "tonic",
      "joint"
    ],
    "value": 60,
    "color": "#e8f5e9"
  },
  {
    "id": "POT408",
    "name_lat": "Aqua Carmelitarum",
    "name_cz": "Karmelitánské kapky",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING55",
    "req_ing": [
      "ING221",
      "ING222",
      "ING152"
    ],
    "effect": "Klášterní líh na náhlou slabost, křeče a nevolnost.",
    "tags": [
      "digestive",
      "calming",
      "aromatic"
    ],
    "value": 55,
    "color": "#fff3e0"
  },
  {
    "id": "POT409",
    "name_lat": "Spiritus Vulnerarius",
    "name_cz": "Pistolová voda (Arquebusade)",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING55",
    "req_ing": [
      "ING17",
      "ING225",
      "ING97"
    ],
    "effect": "Vojenský líh na promývání střelných a řezných ran.",
    "tags": [
      "antiseptic",
      "wound"
    ],
    "value": 45,
    "color": "#dce775"
  },
  {
    "id": "POT410",
    "name_lat": "Balsamum Samaritani",
    "name_cz": "Samaritánský balzám",
    "category": "Liquid",
    "tier": 2,
    "process": "Boil",
    "base": "ING05",
    "req_ing": [
      "ING02",
      "ING26"
    ],
    "effect": "Olej a víno vařené spolu k ošetření pocestných po přepadení.",
    "tags": [
      "wound",
      "healing"
    ],
    "value": 40,
    "color": "#8d6e63"
  },
  {
    "id": "POT411",
    "name_lat": "Acetum Quatuor Latronum",
    "name_cz": "Ocet čtyř zlodějů",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING03",
    "req_ing": [
      "ING17",
      "ING16",
      "ING97",
      "ING152"
    ],
    "effect": "Lupiči se jím potírali a vyklízeli domy morovatých bez nákazy.",
    "tags": [
      "anti-plague",
      "purifying"
    ],
    "value": 50,
    "color": "#afb42b"
  },
  {
    "id": "POT412",
    "name_lat": "Pulvis Contra Morsum Canis",
    "name_cz": "Prášek proti vzteklině",
    "category": "Powder",
    "tier": 3,
    "process": "Grind",
    "base": "ING35",
    "req_ing": [
      "ING225"
    ],
    "effect": "Vypaluje jed z kousnutí šíleným psem.",
    "tags": [
      "anti-poison",
      "caustic"
    ],
    "value": 70,
    "color": "#81c784"
  },
  {
    "id": "POT413",
    "name_lat": "Electuarium Antidotum Hadrianis",
    "name_cz": "Hadriánův protijed",
    "category": "Electuary",
    "tier": 3,
    "process": "Mix",
    "base": "ING04",
    "req_ing": [
      "ING27",
      "ING26"
    ],
    "effect": "Starořímská kaše chránící císaře před traviči.",
    "tags": [
      "anti-poison",
      "sweet"
    ],
    "value": 110,
    "color": "#ffb300"
  },
  {
    "id": "POT414",
    "name_lat": "Pilulae Mastichinae",
    "name_cz": "Masticové pilulky",
    "category": "Pill",
    "tier": 1,
    "process": "Mix",
    "base": "ING29",
    "req_ing": [
      "ING11"
    ],
    "effect": "Mírné večerní pilulky na posílení trávení.",
    "tags": [
      "digestive",
      "purgative"
    ],
    "value": 16,
    "color": "#fff8e1"
  },
  {
    "id": "POT415",
    "name_lat": "Trochisci de Carabe",
    "name_cz": "Jantarové pokroutky",
    "category": "Pill",
    "tier": 2,
    "process": "Mix",
    "base": "ING84",
    "req_ing": [
      "ING41"
    ],
    "effect": "Zastavují krvácení z měchýře a střev.",
    "tags": [
      "blood",
      "astringent"
    ],
    "value": 45,
    "color": "#ff6f00"
  },
  {
    "id": "POT416",
    "name_lat": "Emplastrum Meliloti",
    "name_cz": "Komonicová náplast",
    "category": "Ointment",
    "tier": 1,
    "process": "Boil",
    "base": "ING33",
    "req_ing": [
      "ING218"
    ],
    "effect": "Měkčí tvrdé vředy a mírní záněty usší.",
    "tags": [
      "healing",
      "anti-inflammatory"
    ],
    "value": 18,
    "color": "#c8e6c9"
  },
  {
    "id": "POT417",
    "name_lat": "Unguentum Basilicum",
    "name_cz": "Královská mast (Basilikon)",
    "category": "Ointment",
    "tier": 2,
    "process": "Boil",
    "base": "ING33",
    "req_ing": [
      "ING01",
      "ING05",
      "ING182"
    ],
    "effect": "Zlatohnědá mast čištící vředy a podporující zrání hnisu.",
    "tags": [
      "wound",
      "healing"
    ],
    "value": 30,
    "color": "#fbc02d"
  },
  {
    "id": "POT418",
    "name_lat": "Unguentum Apostolorum",
    "name_cz": "Apoštolská mast",
    "category": "Ointment",
    "tier": 3,
    "process": "Boil",
    "base": "ING33",
    "req_ing": [
      "ING29",
      "ING26",
      "ING70"
    ],
    "effect": "Složená ze 12 přísad jako 12 apoštolů, vyžírá nečisté vředy.",
    "tags": [
      "wound",
      "caustic",
      "healing"
    ],
    "value": 75,
    "color": "#8d6e63"
  },
  {
    "id": "POT419",
    "name_lat": "Unguentum Aegyptiacum",
    "name_cz": "Egyptská mast",
    "category": "Ointment",
    "tier": 2,
    "process": "Boil",
    "base": "ING04",
    "req_ing": [
      "ING70",
      "ING03"
    ],
    "effect": "Měděno-medová mast hojící sněť v ústech a krku.",
    "tags": [
      "caustic",
      "throat",
      "antiseptic"
    ],
    "value": 35,
    "color": "#00897b"
  },
  {
    "id": "POT420",
    "name_lat": "Unguentum Nutritum",
    "name_cz": "Krejčovská mast",
    "category": "Ointment",
    "tier": 1,
    "process": "Mix",
    "base": "ING05",
    "req_ing": [
      "ING03",
      "ING161"
    ],
    "effect": "Bílá chladivá mast na opruzeniny a odřeniny.",
    "tags": [
      "cooling",
      "skin"
    ],
    "value": 15,
    "color": "#fafafa"
  },
  {
    "id": "POT421",
    "name_lat": "Oleum Hyperici",
    "name_cz": "Jánský olej (Královský olej)",
    "category": "Ointment",
    "tier": 1,
    "process": "Mix",
    "base": "ING05",
    "req_ing": [
      "ING212"
    ],
    "effect": "Rudý olej na spáleniny od slunce a bolesti nervů.",
    "tags": [
      "healing",
      "analgesic",
      "red"
    ],
    "value": 20,
    "color": "#d32f2f"
  },
  {
    "id": "POT422",
    "name_lat": "Oleum Liliorum",
    "name_cz": "Liliový olej",
    "category": "Ointment",
    "tier": 1,
    "process": "Mix",
    "base": "ING05",
    "req_ing": [
      "ING21"
    ],
    "effect": "Změkčuje tvrdošíjné zatvrdliny prsů a matěří.",
    "tags": [
      "healing",
      "demulcent"
    ],
    "value": 18,
    "color": "#ffffff"
  },
  {
    "id": "POT423",
    "name_lat": "Oleum Scorpiorum",
    "name_cz": "Škorpiónový olej",
    "category": "Ointment",
    "tier": 3,
    "process": "Boil",
    "base": "ING05",
    "req_ing": [
      "ING35",
      "ING176"
    ],
    "effect": "Mocné mazání proti uštknutí a ledvinovým kamenům.",
    "tags": [
      "anti-poison",
      "diuretic",
      "rare"
    ],
    "value": 90,
    "color": "#3e2723"
  },
  {
    "id": "POT424",
    "name_lat": "Pulvis Vermifugus Puerorum",
    "name_cz": "Dětský prášek proti červům",
    "category": "Powder",
    "tier": 1,
    "process": "Grind",
    "base": "ING86",
    "req_ing": [
      "ING04"
    ],
    "effect": "Sladký prášek bezpečně vyhánějící hlísty z dětských bříšek.",
    "tags": [
      "anti-worm",
      "sweet"
    ],
    "value": 12,
    "color": "#d7ccc8"
  },
  {
    "id": "POT425",
    "name_lat": "Pulvis Dentrificus",
    "name_cz": "Zubní prášek",
    "category": "Powder",
    "tier": 1,
    "process": "Grind",
    "base": "ING81",
    "req_ing": [
      "ING152"
    ],
    "effect": "Bělí zčernalé zuby a upevňuje krvácení dásní.",
    "tags": [
      "dental",
      "cosmetic"
    ],
    "value": 10,
    "color": "#ffffff"
  },
  {
    "id": "POT426",
    "name_lat": "Pilulae Stomachicae",
    "name_cz": "Žaludeční pilulky",
    "category": "Pill",
    "tier": 1,
    "process": "Mix",
    "base": "ING11",
    "req_ing": [
      "ING58"
    ],
    "effect": "Povzbuzují chuť k jídlu a staví zvracení.",
    "tags": [
      "digestive",
      "bitter"
    ],
    "value": 14,
    "color": "#33691e"
  },
  {
    "id": "POT427",
    "name_lat": "Pilulae Purgantes",
    "name_cz": "Čistící pilulky",
    "category": "Pill",
    "tier": 2,
    "process": "Mix",
    "base": "ING109",
    "req_ing": [
      "ING255"
    ],
    "effect": "Mocně vymítají staré usazeniny ze střev.",
    "tags": [
      "purgative"
    ],
    "value": 28,
    "color": "#e65100"
  },
  {
    "id": "POT428",
    "name_lat": "Trochisci de Spodio",
    "name_cz": "Slonovinové pokroutky",
    "category": "Pill",
    "tier": 2,
    "process": "Mix",
    "base": "ING38",
    "req_ing": [
      "ING41"
    ],
    "effect": "Chladí horké záněty žaludku a zastavují chrlění.",
    "tags": [
      "cooling",
      "astringent"
    ],
    "value": 35,
    "color": "#f5f5f5"
  },
  {
    "id": "POT429",
    "name_lat": "Emplastrum Sticticum",
    "name_cz": "Ránová náplast (Paracelsus)",
    "category": "Ointment",
    "tier": 2,
    "process": "Boil",
    "base": "ING33",
    "req_ing": [
      "ING28",
      "ING70"
    ],
    "effect": "Paracelsova slavná náplast stahující rozšklebené rány.",
    "tags": [
      "wound",
      "healing"
    ],
    "value": 45,
    "color": "#00695c"
  },
  {
    "id": "POT430",
    "name_lat": "Emplastrum Defensevum",
    "name_cz": "Ochranná náplast",
    "category": "Ointment",
    "tier": 1,
    "process": "Boil",
    "base": "ING33",
    "req_ing": [
      "ING41"
    ],
    "effect": "Zabraňuje stékání špatných štáv do zraněného kloubu.",
    "tags": [
      "astringent",
      "joint"
    ],
    "value": 18,
    "color": "#8d6e63"
  },
  {
    "id": "POT431",
    "name_lat": "Acetum Destillatum",
    "name_cz": "Kondenzovaný ocet",
    "category": "Liquid",
    "tier": 1,
    "process": "Distill",
    "base": "ING03",
    "req_ing": [
      "ING01"
    ],
    "effect": "Ostrý čistý ocet na rozpouštění perel a vápna.",
    "tags": [
      "acid",
      "solvent"
    ],
    "value": 15,
    "color": "#ffffff"
  },
  {
    "id": "POT432",
    "name_lat": "Spiritus Vini Rectificatissimus",
    "name_cz": "Čistý líh 96%",
    "category": "Liquid",
    "tier": 2,
    "process": "Distill",
    "base": "ING55",
    "req_ing": [],
    "effect": "Nejčistší duch vína bez vody, hoří jasným plamenem.",
    "tags": [
      "solvent",
      "antiseptic"
    ],
    "value": 30,
    "color": "#ffffff"
  },
  {
    "id": "POT433",
    "name_lat": "Magisterium Plumbi",
    "name_cz": "Bělidlo olověné",
    "category": "Powder",
    "tier": 2,
    "process": "Boil",
    "base": "ING63",
    "req_ing": [
      "ING77",
      "ING79"
    ],
    "effect": "Bílý pigment do barev a nebezpečné kosmetiky paní.",
    "tags": [
      "pigment",
      "cosmetic",
      "dangerous"
    ],
    "value": 35,
    "color": "#ffffff"
  },
  {
    "id": "POT434",
    "name_lat": "Crocus Cupri",
    "name_cz": "Měděný šafrán",
    "category": "Powder",
    "tier": 2,
    "process": "Boil",
    "base": "ING70",
    "req_ing": [
      "ING67"
    ],
    "effect": "Červený prášek na čištění starých vředů.",
    "tags": [
      "caustic",
      "wound"
    ],
    "value": 32,
    "color": "#bf360c"
  },
  {
    "id": "POT435",
    "name_lat": "Flores Zinci",
    "name_cz": "Zinkový květ (Filosofická vlna)",
    "category": "Powder",
    "tier": 2,
    "process": "Distill",
    "base": "ING73",
    "req_ing": [],
    "effect": "Bílé lehoučké vločky na hojivé zásypy a oční masti.",
    "tags": [
      "healing",
      "eye",
      "skin"
    ],
    "value": 40,
    "color": "#ffffff"
  },
  {
    "id": "POT436",
    "name_lat": "Sal Jovis",
    "name_cz": "Cínová sůl",
    "category": "Powder",
    "tier": 2,
    "process": "Boil",
    "base": "ING64",
    "req_ing": [
      "ING68",
      "ING79"
    ],
    "effect": "Svíravá sůl na mořidlo barev a zastavení vředů.",
    "tags": [
      "astringent",
      "craft"
    ],
    "value": 38,
    "color": "#eceff1"
  },
  {
    "id": "POT437",
    "name_lat": "Oleum Martis",
    "name_cz": "Železný olej",
    "category": "Liquid",
    "tier": 2,
    "process": "Boil",
    "base": "ING65",
    "req_ing": [
      "ING68",
      "ING79"
    ],
    "effect": "Hustá hnědá tekutina silně posilující krev.",
    "tags": [
      "blood",
      "tonic"
    ],
    "value": 35,
    "color": "#4e342e"
  },
  {
    "id": "POT438",
    "name_lat": "Aqua Fortis Duplata",
    "name_cz": "Dvojitá lučavka",
    "category": "Liquid",
    "tier": 3,
    "process": "Distill",
    "base": "ING77",
    "req_ing": [
      "ING01",
      "ING79"
    ],
    "effect": "Nejostřejší kyselina dusičná vyžrávající měď i stříbro.",
    "tags": [
      "acid",
      "corrosive",
      "dangerous"
    ],
    "value": 110,
    "color": "#ff8f00"
  },
  {
    "id": "POT439",
    "name_lat": "Spiritus Odontalgicus",
    "name_cz": "Zubní duch",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING152",
      "ING30"
    ],
    "effect": "Kapky na vatě umrtvující bolavý zub.",
    "tags": [
      "dental",
      "analgesic"
    ],
    "value": 35,
    "color": "#4e342e"
  },
  {
    "id": "POT440",
    "name_lat": "Tinctura Antispasmodica Fortis",
    "name_cz": "Silné křečové kapky",
    "category": "Liquid",
    "tier": 3,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING08",
      "ING30"
    ],
    "effect": "Tiší těžké záchvaty tetanu a křečí.",
    "tags": [
      "spasm",
      "sedative",
      "dangerous"
    ],
    "value": 80,
    "color": "#1b5e20"
  },
  {
    "id": "POT441",
    "name_lat": "Elixir Pectorale",
    "name_cz": "Vratislavský prsní elixír",
    "category": "Liquid",
    "tier": 2,
    "process": "Mix",
    "base": "ING04",
    "req_ing": [
      "ING211",
      "ING122"
    ],
    "effect": "Sladký sirup na vykašlávání černé usazeniny.",
    "tags": [
      "lung",
      "sweet",
      "expectorant"
    ],
    "value": 30,
    "color": "#3e2723"
  },
  {
    "id": "POT442",
    "name_lat": "Pulvis Stipticus Helvetii",
    "name_cz": "Švýcarský krevní prášek",
    "category": "Powder",
    "tier": 2,
    "process": "Grind",
    "base": "ING79",
    "req_ing": [
      "ING84"
    ],
    "effect": "Slavný prášek zastavující vnitřní krvácení žaludku.",
    "tags": [
      "blood",
      "astringent"
    ],
    "value": 45,
    "color": "#8d6e63"
  },
  {
    "id": "POT443",
    "name_lat": "Pilulae Contra Hydropem",
    "name_cz": "Vodnatelnostní pilulky",
    "category": "Pill",
    "tier": 2,
    "process": "Mix",
    "base": "ING228",
    "req_ing": [
      "ING255"
    ],
    "effect": "Silně odvodňují oteklé nohy a břicho.",
    "tags": [
      "diuretic",
      "purgative"
    ],
    "value": 40,
    "color": "#e65100"
  },
  {
    "id": "POT444",
    "name_lat": "Trochisci de Minio",
    "name_cz": "Sušinkové pokroutky",
    "category": "Pill",
    "tier": 2,
    "process": "Mix",
    "base": "ING161",
    "req_ing": [
      "ING32"
    ],
    "effect": "Vypalují hnilobné vředy a bradavice.",
    "tags": [
      "caustic",
      "wound"
    ],
    "value": 30,
    "color": "#d84315"
  },
  {
    "id": "POT445",
    "name_lat": "Emplastrum de Belladonna",
    "name_cz": "Rulíková náplast",
    "category": "Ointment",
    "tier": 2,
    "process": "Boil",
    "base": "ING33",
    "req_ing": [
      "ING09"
    ],
    "effect": "Tiší kruté bolesti zad a ledvin.",
    "tags": [
      "analgesic",
      "poison"
    ],
    "value": 40,
    "color": "#311b92"
  },
  {
    "id": "POT446",
    "name_lat": "Unguentum Opthalmicum Rubrum",
    "name_cz": "Červená oční mast",
    "category": "Ointment",
    "tier": 2,
    "process": "Mix",
    "base": "ING33",
    "req_ing": [
      "ING01",
      "ING62"
    ],
    "effect": "Rtuťová mast na oční víčka proti vředům.",
    "tags": [
      "eye",
      "healing",
      "dangerous"
    ],
    "value": 50,
    "color": "#c62828"
  },
  {
    "id": "POT447",
    "name_lat": "Acetum Aromaticum",
    "name_cz": "Aromatický ocet",
    "category": "Liquid",
    "tier": 1,
    "process": "Mix",
    "base": "ING03",
    "req_ing": [
      "ING90",
      "ING16"
    ],
    "effect": "Toaletní ocet na osvěžení v horku a zahnání mdlob.",
    "tags": [
      "aromatic",
      "cooling"
    ],
    "value": 18,
    "color": "#f8bbd0"
  },
  {
    "id": "POT448",
    "name_lat": "Spiritus Camphoratus",
    "name_cz": "Gáfrový líh",
    "category": "Liquid",
    "tier": 1,
    "process": "Mix",
    "base": "ING55",
    "req_ing": [
      "ING01",
      "ING30"
    ],
    "effect": "Mazu na proleženiny a bolestivé klouby starců.",
    "tags": [
      "analgesic",
      "joint"
    ],
    "value": 20,
    "color": "#ffffff"
  },
  {
    "id": "POT449",
    "name_lat": "Magisterium Tartari",
    "name_cz": "Čistý vinný magistr",
    "category": "Powder",
    "tier": 2,
    "process": "Distill",
    "base": "ING78",
    "req_ing": [
      "ING01",
      "ING02"
    ],
    "effect": "Bělounká sůl na čištění krve a močového písku.",
    "tags": [
      "purifying",
      "diuretic"
    ],
    "value": 30,
    "color": "#ffffff"
  },
  {
    "id": "POT450",
    "name_lat": "Ultramarinum Verum",
    "name_cz": "Pravý ultramarín",
    "category": "Material",
    "tier": 4,
    "process": "Grind",
    "base": "ING83",
    "req_ing": [
      "ING33",
      "ING82"
    ],
    "effect": "Nejdražší nebesky modrý pigment z drceného Lapis Lazuli pro malování svatých.",
    "tags": [
      "pigment",
      "precious",
      "rare",
      "legendary"
    ],
    "value": 1000,
    "color": "#0d47a1"
  }
];

export const FOODS: Food[] = [
  { id: "FOOD_BREAD", name: "Chléb s česnekem", icon: "🍞", price: 5, vigorGain: 20, hungerReduce: 25, desc: "Sprostý chléb s česnekovým mazáním k zahnání hladu." },
  { id: "FOOD_MEAT", name: "Pečená zvěřina", icon: "🍖", price: 15, vigorGain: 45, hungerReduce: 50, desc: "Šťavnatý kus pečené zvěřiny z panského lesa." },
  { id: "FOOD_WINE", name: "Svařené kořeněné víno", icon: "🍷", price: 10, vigorGain: 30, hungerReduce: 15, desc: "Teplé víno s hřebíčkem a skořicí. Zahřeje duši." },
  { id: "FOOD_MEAD", name: "Staročeská medovina", icon: "🍺", price: 12, vigorGain: 35, hungerReduce: 20, desc: "Sladký medový nápoj vracející veselí a sílu." }
];

export const CUSTOMER_TEMPLATES: Customer[] = [
  { id: "CUST_TOWN", name: "Měšťan", icon: "👔", priceMult: 1.0, questTypes: ["exact", "parametric"], suspicion: 0 },
  { id: "CUST_MONK", name: "Bratr Bernard", icon: "⛪", priceMult: 1.1, questTypes: ["exact", "parametric"], suspicion: -2 },
  { id: "CUST_NOBLE", name: "Pán z Hradce", icon: "👑", priceMult: 2.0, questTypes: ["exact", "parametric"], suspicion: 5 },
  { id: "CUST_SHADOW", name: "Zahalený cizinec", icon: "🗡️", priceMult: 2.5, questTypes: ["shady"], suspicion: 15 },
  { id: "CUST_HERBAL", name: "Bába kořenářka", icon: "👵", priceMult: 0.9, questTypes: ["exact"], suspicion: -5 }
];

export const PARAMETRIC_TEMPLATES = [
  {
    name: "Chladivý obklad na horkost",
    req: { thermal_max: -1, tox_max: 20 },
    text: "Zákazníka trápí vysoká horečka a blouznění. Žádá chladivý odvar.",
    mult: 1.1,
    shady: false
  },
  {
    name: "Zahřívací odvar na zimnici",
    req: { thermal_min: 2, tox_max: 20 },
    text: "Prokřehlý pocestný žádá silně prohřívací nápoj bez jedu.",
    mult: 1.2,
    shady: false
  },
  {
    name: "Slabý jed bez zápachu",
    req: { tox_min: 50, tox_max: 85 },
    text: "Tajemný pán žádá odvar s vysokou toxicitou pro zvláštní účely...",
    mult: 2.0,
    shady: true
  },
  {
    name: "Svíravá mast na krev",
    req: { moisture_max: -2, tox_max: 15 },
    text: "Raničář potřebuje mocně vysušující a stavěcí mast na rány.",
    mult: 1.3,
    shady: false
  }
];

export const FORAGE_LOCATIONS: ForageLocation[] = [
  {
    id: "FORAGE_MEADOW",
    name: "Slunečná luka",
    icon: "🌱",
    vigorCost: 15,
    hungerCost: 10,
    possibleFinds: [
      { id: "ING01", w: 30 }, { id: "ING11", w: 20 }, { id: "ING17", w: 15 },
      { id: "ING18", w: 15 }, { id: "ING19", w: 10 }, { id: "ING57", w: 25 },
      { id: "ING58", w: 20 }, { id: "ING59", w: 25 }
    ],
    minFinds: 2,
    maxFinds: 4,
    risks: [{ chance: 0.05, name: "Včelí žihadlo", icon: "🐝", effectText: "-10 Vigor" }],
    unlockAt: 1
  },
  {
    id: "FORAGE_FOREST",
    name: "Hluboký hvozd",
    icon: "🌲",
    vigorCost: 25,
    hungerCost: 15,
    possibleFinds: [
      { id: "ING06", w: 15 }, { id: "ING08", w: 10 }, { id: "ING10", w: 20 },
      { id: "ING13", w: 15 }, { id: "ING16", w: 20 }, { id: "ING27", w: 8 },
      { id: "ING60", w: 15 }, { id: "ING190", w: 20 }
    ],
    minFinds: 2,
    maxFinds: 5,
    risks: [{ chance: 0.15, name: "Divoký kanec", icon: "🐗", effectText: "-25 Vigor" }],
    unlockAt: 1
  },
  {
    id: "FORAGE_MOUNTAIN",
    name: "Skalnatý vrch",
    icon: "⛰️",
    vigorCost: 35,
    hungerCost: 25,
    possibleFinds: [
      { id: "ING42", w: 20 }, { id: "ING49", w: 15 }, { id: "ING65", w: 20 },
      { id: "ING67", w: 15 }, { id: "ING68", w: 25 }, { id: "ING78", w: 15 },
      { id: "ING82", w: 20 }, { id: "ING84", w: 8 }
    ],
    minFinds: 2,
    maxFinds: 4,
    risks: [{ chance: 0.20, name: "Horský pád", icon: "🧗", effectText: "-35 Vigor" }],
    unlockAt: 3
  },
  {
    id: "FORAGE_SWAMP",
    name: "Zrádné močály",
    icon: "🐸",
    vigorCost: 40,
    hungerCost: 30,
    possibleFinds: [
      { id: "ING07", w: 15 }, { id: "ING09", w: 12 }, { id: "ING12", w: 15 },
      { id: "ING62", w: 12 }, { id: "ING177", w: 20 }, { id: "ING178", w: 20 },
      { id: "ING179", w: 25 }
    ],
    minFinds: 1,
    maxFinds: 4,
    risks: [{ chance: 0.25, name: "Močálová zimnice", icon: "🤒", effectText: "-40 Vigor" }],
    unlockAt: 4
  },
  {
    id: "FORAGE_CAVE",
    name: "Měsíční sluj & Jeskyně",
    icon: "🌙",
    vigorCost: 45,
    hungerCost: 35,
    possibleFinds: [
      { id: "ING65", w: 25 }, { id: "ING67", w: 20 }, { id: "ING68", w: 20 },
      { id: "ING49", w: 15 }, { id: "ING42", w: 20 }, { id: "ING84", w: 10 }
    ],
    minFinds: 2,
    maxFinds: 5,
    risks: [{ chance: 0.22, name: "Zával v jeskyni", icon: "🦇", effectText: "-45 Vigor" }],
    unlockAt: 6
  },
  {
    id: "FORAGE_GRAVEYARD",
    name: "Stará krypta a Pohřebiště",
    icon: "🪦",
    vigorCost: 50,
    hungerCost: 40,
    possibleFinds: [
      { id: "ING07", w: 25 }, { id: "ING50", w: 20 }, { id: "ING22", w: 15 },
      { id: "ING27", w: 15 }, { id: "ING08", w: 20 }
    ],
    minFinds: 2,
    maxFinds: 5,
    risks: [{ chance: 0.28, name: "Miasma a přízrak", icon: "👻", effectText: "-50 Vigor" }],
    unlockAt: 8
  },
  {
    id: "FORAGE_VOLCANO",
    name: "Sopečné vřídlo a Gejzír",
    icon: "🌋",
    vigorCost: 55,
    hungerCost: 45,
    possibleFinds: [
      { id: "ING42", w: 35 }, { id: "ING68", w: 25 }, { id: "ING82", w: 20 },
      { id: "ING84", w: 20 }
    ],
    minFinds: 2,
    maxFinds: 6,
    risks: [{ chance: 0.30, name: "Sopečný popálenina", icon: "🔥", effectText: "-55 Vigor" }],
    unlockAt: 10
  },
  {
    id: "FORAGE_GARDEN",
    name: "Královská botanická zahrada",
    icon: "🌺",
    vigorCost: 60,
    hungerCost: 30,
    possibleFinds: [
      { id: "ING33", w: 15 }, { id: "ING15", w: 25 }, { id: "ING11", w: 25 },
      { id: "ING01", w: 25 }, { id: "ING05", w: 10 }
    ],
    minFinds: 3,
    maxFinds: 7,
    risks: [{ chance: 0.15, name: "Zadržen strážemi", icon: "⚔️", effectText: "-30 Vigor" }],
    unlockAt: 12
  }
];

export const UPGRADES: Upgrade[] = [
  { id: "UPG_CAULDRON", name: "Královský kotel", icon: "🥣", cost: 120, desc: "Zvětší kapacitu pracovního stolu na 8 ingrediencí." },
  { id: "UPG_MORTAR", name: "Achatový hmoždíř", icon: "🍸", cost: 80, desc: "Zvýší účinnost tření ingrediencí." },
  { id: "UPG_CELLAR", name: "Ledový sklep", icon: "❄️", cost: 100, desc: "Zdvojnásobí trvanlivost podléhajících bylin." },
  { id: "UPG_SILVER", name: "Stříbrné vyložení", icon: "✨", cost: 150, desc: "Sníží nepříznivý vliv sedimentu v kotli o 50%." },
  { id: "UPG_CALENDAR", name: "Almanach hvězd", icon: "📅", cost: 60, desc: "Opatří informace o sezónních poptávkách a svátcích." }
];

export const AILMENTS: Record<string, AilmentInfo> = {
  FEVER: { icon: "🔥", name: "Horká horečka", color: "#e74c3c", desc: "Tělo hoří, spotřeba sil při práci je o 50% vyšší." },
  POISON: { icon: "☠️", name: "Otravná usazenina", color: "#8e44ad", desc: "Znečištěná krev snižuje prodejní cenu elixírů." },
  INSPIRED: { icon: "💡", name: "Múza alchymie", color: "#f1c40f", desc: "Další vařený elixír přinese dvojnásobnou hodnotu!", positive: true }
};

export const SEASONS: Season[] = [
  { id: "spring", name: "Jaro", icon: "🌸", days: 10, foragingBonus: 1.2, priceMultiplier: 1.0, vigorBonus: 10, riskMult: 0.8, spoilMult: 1.0, mountainLocked: false, desc: "Čas rašení a jarní mízy." },
  { id: "summer", name: "Léto", icon: "☀️", days: 10, foragingBonus: 1.0, priceMultiplier: 1.1, vigorBonus: 0, riskMult: 1.0, spoilMult: 1.5, mountainLocked: false, desc: "Teplé horké dny. Byliny rychleji tlejí." },
  { id: "autumn", name: "Podzim", icon: "🍂", days: 10, foragingBonus: 0.9, priceMultiplier: 1.2, vigorBonus: -5, riskMult: 1.2, spoilMult: 1.0, mountainLocked: false, desc: "Čas sběru kořenů a plodů." },
  { id: "winter", name: "Zima", icon: "❄️", days: 10, foragingBonus: 0.5, priceMultiplier: 1.5, vigorBonus: -15, riskMult: 1.5, spoilMult: 0.5, mountainLocked: true, desc: "Mrazivá zima. Hory jsou neprůchodné." }
];

export const CANONICAL_HOURS = [
  { name: "Matutina (Jitřní)", icon: "🌅" },
  { name: "Prima (První)", icon: "🌄" },
  { name: "Tertia (Třetí)", icon: "☀️" },
  { name: "Sexta (Polední)", icon: "🌕" },
  { name: "Nona (Devátá)", icon: "🌤️" },
  { name: "Vespera (Večerní)", icon: "<ctrl42>" },
  { name: "Completorium (Noční)", icon: "🌙" }
];

export const BARTEX_OFFERS: BartexOffer[] = [
  { id: "BO_01", offerIngIds: ["ING06", "ING09"], forTag: "precious", desc: "Potulný kupec nabízí vzácné minerály za uspávací byliny.", addedDay: 1 }
];

export const LOYAL_NAMES = ["Bratr Jan", "Apotekář Jakub", "Rychtář Šebestián", "Paní Kateřina"];

export const LOYAL_CHAIN_QUESTS: Record<string, any> = {
  "Bratr Jan": {
    chainName: "Klášterní herbář",
    steps: [
      { reqRecipeId: "POT01", dialog: "Mír s tebou. Klášter potřebuje čistou vodu na omyvatelné relikvie." },
      { reqRecipeId: "POT05", dialog: "Medový oxymel nám pomůže přestát bratrské nachlazení v refektáři." }
    ]
  }
};

export const TECH_NODES: TechNode[] = [
  { id: "TECH_DISTILL", name: "Destilační křivda", icon: "🧪", req: { "_process_Distill": 3 }, desc: "Otevírá pokročilé destilační aparáty." },
  { id: "TECH_HERBALISM", name: "Herbální mistrovství", icon: "🌿", req: { "ING11": 5, "ING17": 5 }, desc: "Umožňuje hlubší porozumění rostlinným humorům." },
  { id: "TECH_MINERALS", name: "Kovová transmutace", icon: "💎", req: { "ING65": 5, "ING68": 5 }, desc: "Otevírá práci s těžkými kovy a vitrioly." }
];
