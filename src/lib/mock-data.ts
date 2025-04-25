import { LearningModuleProps } from "@/components/LearningModule";

export const modules: LearningModuleProps[] = [
  {
    id: "history",
    title: "Histoire Française",
    description: "Les événements clés qui ont façonné la France moderne",
    completedLessons: 2,
    totalLessons: 8,
    category: "Histoire",
    isLocked: false
  },
  {
    id: "institutions",
    title: "Institutions Républicaines",
    description: "Comprendre la structure et le fonctionnement du gouvernement français",
    completedLessons: 1,
    totalLessons: 6,
    category: "Politique",
    isLocked: false
  },
  {
    id: "geography",
    title: "Géographie Française",
    description: "Les régions, départements et territoires français",
    completedLessons: 0,
    totalLessons: 7,
    category: "Géographie",
    isLocked: false
  },
  {
    id: "culture",
    title: "Culture et Société",
    description: "Traditions, arts et mode de vie à la française",
    completedLessons: 0,
    totalLessons: 10,
    category: "Culture",
    isLocked: true
  }
];

export const badges = [
  {
    id: "first-lesson",
    name: "Premier Pas",
    description: "Terminer votre première leçon",
    icon: "🎯",
    achieved: true
  },
  {
    id: "three-days",
    name: "Persévérance",
    description: "3 jours consécutifs d'apprentissage",
    icon: "🔥",
    achieved: true
  },
  {
    id: "first-quiz",
    name: "Érudit",
    description: "Réussir un quiz avec un score parfait",
    icon: "🏆",
    achieved: false,
    progress: 8,
    maxProgress: 10
  },
  {
    id: "history-master",
    name: "Historien",
    description: "Compléter tous les modules d'Histoire",
    icon: "📚",
    achieved: false,
    progress: 2,
    maxProgress: 8
  },
  {
    id: "all-regions",
    name: "Géographe",
    description: "Identifier toutes les régions françaises",
    icon: "🗺️",
    achieved: false,
    progress: 3,
    maxProgress: 13
  }
];

export interface QuizQuestion {
  id: string;
  moduleId: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const questions: QuizQuestion[] = [
  // Histoire
  {
    id: "h1",
    moduleId: "history",
    question: "En quelle année a eu lieu la Révolution française ?",
    options: ["1789", "1792", "1804", "1848"],
    correctAnswer: "1789",
    explanation: "La Révolution française a débuté en 1789 avec la prise de la Bastille le 14 juillet."
  },
  {
    id: "h2",
    moduleId: "history",
    question: "Qui était Charles de Gaulle ?",
    options: [
      "Un militaire et président de la 5ème République",
      "Un roi de France",
      "Un philosophe des Lumières",
      "Un écrivain célèbre"
    ],
    correctAnswer: "Un militaire et président de la 5ème République",
    explanation: "Charles de Gaulle était un militaire, résistant et homme politique français qui a fondé la 5ème République."
  },
  // Institutions
  {
    id: "i1",
    moduleId: "institutions",
    question: "Quelle est la devise de la République française ?",
    options: [
      "Liberté, Égalité, Fraternité",
      "Travail, Famille, Patrie",
      "Unité, Progrès, Justice",
      "Ordre et Justice"
    ],
    correctAnswer: "Liberté, Égalité, Fraternité",
    explanation: "Liberté, Égalité, Fraternité est la devise de la République française depuis 1848."
  },
  {
    id: "i2",
    moduleId: "institutions",
    question: "Quel est le rôle du Parlement français ?",
    options: [
      "Voter les lois et contrôler l'action du gouvernement",
      "Diriger la police et l'armée",
      "Représenter la France à l'étranger",
      "Gérer les collectivités locales"
    ],
    correctAnswer: "Voter les lois et contrôler l'action du gouvernement",
    explanation: "Le Parlement, composé de l'Assemblée nationale et du Sénat, vote les lois et contrôle l'action du gouvernement."
  },
  // Culture
  {
    id: "c1",
    moduleId: "culture",
    question: "Qui a écrit Les Trois Mousquetaires ?",
    options: [
      "Alexandre Dumas",
      "Victor Hugo",
      "Émile Zola",
      "Voltaire"
    ],
    correctAnswer: "Alexandre Dumas",
    explanation: "Les Trois Mousquetaires est un roman d'Alexandre Dumas écrit en collaboration avec Auguste Maquet."
  },
  // Géographie
  {
    id: "g1",
    moduleId: "geography",
    question: "Quels sont les pays frontaliers de la France ?",
    options: [
      "Belgique, Luxembourg, Allemagne, Suisse, Italie, Andorre, Espagne, Monaco",
      "Belgique, Pays-Bas, Allemagne, Suisse, Italie, Espagne",
      "Belgique, Luxembourg, Allemagne, Autriche, Italie, Espagne",
      "Belgique, Royaume-Uni, Allemagne, Suisse, Italie, Espagne"
    ],
    correctAnswer: "Belgique, Luxembourg, Allemagne, Suisse, Italie, Andorre, Espagne, Monaco",
    explanation: "La France métropolitaine partage ses frontières avec huit pays."
  }
];

export const lessons = {
  "history": [
    {
      id: "h1",
      title: "La Révolution française",
      content: "La Révolution française est une période majeure de changements politiques et sociaux en France..."
    },
    {
      id: "h2",
      title: "Napoléon et l'Empire",
      content: "Après la Révolution, la France connaît une période impériale sous Napoléon Bonaparte..."
    }
  ],
  "institutions": [
    {
      id: "i1",
      title: "La Cinquième République",
      content: "La Constitution de la Cinquième République, adoptée le 4 octobre 1958, définit l'organisation actuelle de l'État français..."
    }
  ]
};

export const streakData = {
  current: 3,
  longest: 7,
  thisWeek: [true, true, true, false, false, false, false], // Sun to Sat
};

export const userStats = {
  totalXP: 142,
  level: 3,
  daysActive: 8,
  questionsAnswered: 24,
  correctAnswers: 19,
  accuracy: 79,
};
