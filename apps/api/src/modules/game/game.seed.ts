import type { TranslatedText } from '../../common/dto/translated-text.dto';

const text = (pl: string, en: string, de: string): TranslatedText => ({
  pl,
  en,
  de,
});

export const GAME_BOSS_SEEDS = [
  {
    slug: 'fundamenty',
    name: text(
      'Straznik podstaw',
      'Guardian of basics',
      'Wachter der Grundlagen',
    ),
    description: text(
      'Podstawowa wiedza, objawy i profilaktyka cukrzycy.',
      'Core knowledge, symptoms and diabetes prevention.',
      'Grundwissen, Symptome und Diabetespravention.',
    ),
  },
  {
    slug: 'mechanizmy',
    name: text(
      'Wladca mechanizmow',
      'Master of mechanisms',
      'Meister der Mechanismen',
    ),
    description: text(
      'Typy cukrzycy, czynniki ryzyka i rola insuliny.',
      'Diabetes types, risk factors and the role of insulin.',
      'Diabetestypen, Risikofaktoren und die Rolle von Insulin.',
    ),
  },
  {
    slug: 'pierwsza-pomoc',
    name: text('Alarm glikemiczny', 'Glycemic alarm', 'Glykamischer Alarm'),
    description: text(
      'Bezpieczne reakcje na hipoglikemie i stany nagle.',
      'Safe responses to hypoglycemia and emergencies.',
      'Sichere Reaktionen auf Hypoglykamie und Notfalle.',
    ),
  },
] as const;

export const GAME_QUESTION_SEEDS = [
  {
    boss: 'fundamenty',
    content: text(
      'Czy regularna aktywnosc i zdrowa dieta moga zmniejszac ryzyko cukrzycy typu 2?',
      'Can regular activity and a healthy diet reduce the risk of type 2 diabetes?',
      'Konnen Bewegung und gesunde Ernahrung das Risiko fur Typ-2-Diabetes senken?',
    ),
    explanation: text(
      'WHO wskazuje zdrowa diete, aktywnosc i prawidlowa mase ciala jako wazne elementy profilaktyki typu 2.',
      'WHO identifies a healthy diet, activity and healthy body weight as important type 2 prevention measures.',
      'Die WHO nennt gesunde Ernahrung, Bewegung und gesundes Gewicht als wichtige Pravention.',
    ),
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/diabetes',
    correct: true,
  },
  {
    boss: 'mechanizmy',
    content: text(
      'W cukrzycy typu 1 uklad odpornosciowy niszczy komorki produkujace insuline.',
      'In type 1 diabetes, the immune system destroys insulin-producing cells.',
      'Bei Typ-1-Diabetes zerstort das Immunsystem insulinproduzierende Zellen.',
    ),
    explanation: text(
      'Typ 1 jest choroba autoimmunologiczna prowadzaca do niedoboru insuliny.',
      'Type 1 is an autoimmune disease that leads to insulin deficiency.',
      'Typ 1 ist eine Autoimmunerkrankung, die zu Insulinmangel fuhrt.',
    ),
    sourceUrl: 'https://www.cdc.gov/diabetes/about/about-type-1-diabetes.html',
    correct: true,
  },
  {
    boss: 'pierwsza-pomoc',
    content: text(
      'Czy nieprzytomnej osobie nalezy podawac jedzenie lub napoj doustnie?',
      'Should food or drink be given by mouth to an unconscious person?',
      'Soll einer bewusstlosen Person Essen oder Trinken gegeben werden?',
    ),
    explanation: text(
      'Nie. Grozi to zadlawieniem. Nalezy wezwac pomoc i postepowac zgodnie z zasadami pierwszej pomocy.',
      'No. This creates a choking risk. Call emergency services and follow first-aid guidance.',
      'Nein. Es besteht Erstickungsgefahr. Notruf wahlen und Erste Hilfe leisten.',
    ),
    sourceUrl:
      'https://www.cdc.gov/diabetes/basics/low-blood-sugar-treatment.html',
    correct: false,
  },
] as const;

export const YES = text('Tak', 'Yes', 'Ja');
export const NO = text('Nie', 'No', 'Nein');
