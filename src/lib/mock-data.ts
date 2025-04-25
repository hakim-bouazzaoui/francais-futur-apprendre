
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

export const questions = [
  {
    id: "q1",
    moduleId: "history",
    question: "En quelle année la République française a-t-elle été proclamée pour la première fois ?",
    options: ["1789", "1792", "1804", "1848"],
    correctAnswer: "1792",
    explanation: "La Première République française a été proclamée le 22 septembre 1792, après la chute de la monarchie pendant la Révolution française."
  },
  {
    id: "q2",
    moduleId: "history",
    question: "Quel symbole n'est PAS un emblème officiel de la République française ?",
    options: ["Marianne", "La devise 'Liberté, Égalité, Fraternité'", "Le drapeau tricolore", "La fleur de lys"],
    correctAnswer: "La fleur de lys",
    explanation: "La fleur de lys était un symbole de la monarchie française, pas de la République."
  },
  {
    id: "q3",
    moduleId: "geography",
    question: "Combien de régions la France métropolitaine compte-t-elle actuellement ?",
    options: ["13", "18", "22", "27"],
    correctAnswer: "13",
    explanation: "Depuis la réforme territoriale de 2016, la France métropolitaine compte 13 régions, contre 22 auparavant."
  },
  {
    id: "q4",
    moduleId: "institutions",
    question: "Qui élit le président de la République française ?",
    options: ["L'Assemblée nationale", "Le Sénat", "Les citoyens français par suffrage universel direct", "Le Conseil constitutionnel"],
    correctAnswer: "Les citoyens français par suffrage universel direct",
    explanation: "Depuis la réforme constitutionnelle de 1962, le président est élu au suffrage universel direct par les citoyens français."
  },
  {
    id: "q5",
    moduleId: "institutions",
    question: "Quelle est la durée du mandat présidentiel en France actuellement ?",
    options: ["4 ans", "5 ans", "6 ans", "7 ans"],
    correctAnswer: "5 ans",
    explanation: "Depuis la réforme constitutionnelle de 2000, le mandat présidentiel est de 5 ans (quinquennat)."
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
