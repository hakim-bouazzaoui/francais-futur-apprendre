import AsyncStorage from '@react-native-async-storage/async-storage';

export interface QuizResult {
  moduleId: string;
  lessonTitle: string;
  date: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  answers: {
    questionId: string;
    correct: boolean;
  }[];
}

export interface QuizStats {
  totalQuizzes: number;
  averageScore: number;
  totalTimeSpent: number;
  streakDays: number;
}

const STORAGE_KEYS = {
  QUIZ_RESULTS: 'quiz_results',
  QUIZ_STATS: 'quiz_stats',
};

export const saveQuizResult = async (result: QuizResult): Promise<void> => {
  try {
    // Get existing results
    const existingResults = await getQuizResults();
    const newResults = [...existingResults, result];
    
    // Save updated results
    await AsyncStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(newResults));

    // Update stats
    await updateQuizStats(result);
  } catch (error) {
    console.error('Error saving quiz result:', error);
    throw error;
  }
};

export const getQuizResults = async (): Promise<QuizResult[]> => {
  try {
    const results = await AsyncStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS);
    return results ? JSON.parse(results) : [];
  } catch (error) {
    console.error('Error getting quiz results:', error);
    return [];
  }
};

export const getQuizStats = async (): Promise<QuizStats> => {
  try {
    const stats = await AsyncStorage.getItem(STORAGE_KEYS.QUIZ_STATS);
    return stats ? JSON.parse(stats) : getInitialStats();
  } catch (error) {
    console.error('Error getting quiz stats:', error);
    return getInitialStats();
  }
};

const getInitialStats = (): QuizStats => ({
  totalQuizzes: 0,
  averageScore: 0,
  totalTimeSpent: 0,
  streakDays: 0,
});

const updateQuizStats = async (newResult: QuizResult): Promise<void> => {
  try {
    const currentStats = await getQuizStats();
    
    const newTotalQuizzes = currentStats.totalQuizzes + 1;
    const newTotalTimeSpent = currentStats.totalTimeSpent + newResult.timeSpent;
    
    // Calculate new average score
    const currentTotalScore = currentStats.averageScore * currentStats.totalQuizzes;
    const newAverageScore = (currentTotalScore + newResult.score) / newTotalQuizzes;

    // Update streak (simple implementation - can be enhanced)
    const today = new Date().toDateString();
    const lastQuizDate = new Date(newResult.date).toDateString();
    const isToday = today === lastQuizDate;
    
    const newStats: QuizStats = {
      totalQuizzes: newTotalQuizzes,
      averageScore: Math.round(newAverageScore * 100) / 100,
      totalTimeSpent: newTotalTimeSpent,
      streakDays: isToday ? currentStats.streakDays + 1 : 1,
    };

    await AsyncStorage.setItem(STORAGE_KEYS.QUIZ_STATS, JSON.stringify(newStats));
  } catch (error) {
    console.error('Error updating quiz stats:', error);
    throw error;
  }
};

// Helper to get results for a specific module
export const getModuleResults = async (moduleId: string): Promise<QuizResult[]> => {
  const allResults = await getQuizResults();
  return allResults.filter(result => result.moduleId === moduleId);
};

// Helper to clear all quiz data (useful for testing)
export const clearQuizData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([STORAGE_KEYS.QUIZ_RESULTS, STORAGE_KEYS.QUIZ_STATS]);
  } catch (error) {
    console.error('Error clearing quiz data:', error);
    throw error;
  }
};