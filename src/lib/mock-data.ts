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
    isLocked: false
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
  {
    id: "c2",
    moduleId: "culture",
    question: "Qu'est-ce que la philosophie des Lumières ?",
    options: [
      "Un mouvement culturel et intellectuel contre l'obscurantisme",
      "Une école de peinture du XIXe siècle",
      "Une technique d'éclairage des monuments",
      "Une théorie scientifique sur la lumière"
    ],
    correctAnswer: "Un mouvement culturel et intellectuel contre l'obscurantisme",
    explanation: "La philosophie des Lumières est un mouvement culturel, philosophique et intellectuel qui a œuvré contre les oppressions et pour le progrès des connaissances."
  },
  {
    id: "c3",
    moduleId: "culture",
    question: "En quelle année a été aboli l'esclavage en France ?",
    options: [
      "1848",
      "1789",
      "1905",
      "1830"
    ],
    correctAnswer: "1848",
    explanation: "L'esclavage a été définitivement aboli en France le 27 avril 1848."
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
  },
  {
    id: "g2",
    moduleId: "geography",
    question: "Quel est le point culminant de la France ?",
    options: [
      "Le Mont-Blanc",
      "Le Pic du Midi",
      "Le Puy de Dôme",
      "Le Mont Ventoux"
    ],
    correctAnswer: "Le Mont-Blanc",
    explanation: "Le Mont-Blanc, situé entre la France et l'Italie, est le point culminant de la France avec une altitude d'environ 4809 mètres."
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
  ],
  "culture": [
    {
      id: "c1",
      title: "Arts et Littérature",
      content: "La France possède un riche patrimoine littéraire et artistique avec des figures emblématiques comme Victor Hugo, Alexandre Dumas et bien d'autres..."
    },
    {
      id: "c2",
      title: "Traditions et Mode de vie",
      content: "Les traditions françaises sont variées et reflètent la diversité des régions, de la gastronomie aux fêtes populaires..."
    }
  ],
  "geography": [
    {
      id: "g1",
      title: "Les régions françaises",
      content: "La France métropolitaine est divisée en 13 régions, chacune avec ses particularités géographiques et culturelles..."
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
