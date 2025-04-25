
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Book, BookOpen, ChevronLeft, CheckCircle, X, ArrowLeft } from "lucide-react";
import { modules, lessons, questions as allQuestions, QuizQuestion } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

export default function ModuleDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"lessons" | "quiz">("lessons");
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Find the module from mock data
  const module = modules.find(m => m.id === id);
  const moduleLessons = id ? lessons[id as keyof typeof lessons] || [] : [];
  
  // Get questions for this module
  const moduleQuestions = allQuestions.filter(q => q.moduleId === id);
  
  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Module introuvable</h2>
          <p className="mb-4">Le module que vous recherchez n'existe pas.</p>
          <Link to="/" className="text-france-blue hover:underline">
            Retourner à l'accueil
          </Link>
        </div>
      </div>
    );
  }
  
  const progress = Math.round((module.completedLessons / module.totalLessons) * 100);
  
  // Handle starting a lesson
  const startLesson = (lessonId: string) => {
    setActiveLesson(lessonId);
    toast({
      title: "Leçon commencée",
      description: "Bonne chance avec votre apprentissage !",
    });
  };
  
  // Handle returning from lesson to lessons list
  const returnToLessons = () => {
    setActiveLesson(null);
  };
  
  // Handle starting a quiz
  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizScore({ correct: 0, total: 0 });
    setQuizCompleted(false);
    toast({
      title: "Quiz démarré",
      description: "Testez vos connaissances !",
    });
  };

  // Handle selecting an answer
  const selectAnswer = (answer: string) => {
    if (showExplanation) return; // Prevent selecting after answer is shown
    
    setSelectedAnswer(answer);
    setShowExplanation(true);
    
    const currentQuestion = moduleQuestions[currentQuestionIndex];
    if (answer === currentQuestion.correctAnswer) {
      setQuizScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    }
    setQuizScore(prev => ({ ...prev, total: prev.total + 1 }));
  };

  // Handle moving to next question
  const nextQuestion = () => {
    if (currentQuestionIndex < moduleQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  // Handle returning from quiz to module
  const exitQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
  };

  // Find the current lesson if one is active
  const currentLesson = activeLesson 
    ? moduleLessons.find(lesson => lesson.id === activeLesson) 
    : null;
  
  // Get the current question if quiz is started
  const currentQuestion = moduleQuestions.length > 0 && currentQuestionIndex < moduleQuestions.length
    ? moduleQuestions[currentQuestionIndex]
    : null;
  
  return (
    <div className="min-h-screen">
      <header className="bg-france-blue text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto">
          <div className="flex items-center">
            {activeLesson || quizStarted ? (
              <button onClick={activeLesson ? returnToLessons : exitQuiz} className="mr-4 flex items-center">
                <ArrowLeft className="h-5 w-5 mr-1" />
                <span>Retour</span>
              </button>
            ) : (
              <Link to="/" className="mr-4">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            )}
            <h1 className="text-xl font-bold">
              {activeLesson && currentLesson ? currentLesson.title : quizStarted ? "Quiz" : module.title}
            </h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        {activeLesson && currentLesson ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">{currentLesson.title}</h2>
            <div className="prose max-w-none">
              <p className="text-lg">{currentLesson.content}</p>
              
              {/* Placeholder for more detailed lesson content */}
              <div className="mt-8">
                <p>Cette leçon fait partie du module {module.title}.</p>
                <p className="my-4">Le contenu complet de cette leçon sera enrichi ultérieurement avec des illustrations et des exercices pratiques.</p>
              </div>
              
              <div className="mt-10 flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={returnToLessons}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour aux leçons
                </Button>
                <Button>
                  Marquer comme terminé
                </Button>
              </div>
            </div>
          </div>
        ) : quizStarted ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            {quizCompleted ? (
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold mb-4">Quiz terminé</h2>
                <div className="text-5xl font-bold text-france-blue mb-6">
                  {quizScore.correct} / {quizScore.total}
                </div>
                <p className="mb-8">
                  {quizScore.correct === quizScore.total 
                    ? "Félicitations ! Score parfait !" 
                    : quizScore.correct >= quizScore.total / 2 
                      ? "Bon travail ! Continuez à vous améliorer." 
                      : "Continuez à étudier pour améliorer votre score."}
                </p>
                <Button onClick={exitQuiz}>Retour au module</Button>
              </div>
            ) : currentQuestion ? (
              <>
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Question {currentQuestionIndex + 1} sur {moduleQuestions.length}</span>
                    <span>{Math.round(((currentQuestionIndex + 1) / moduleQuestions.length) * 100)}%</span>
                  </div>
                  <Progress value={((currentQuestionIndex + 1) / moduleQuestions.length) * 100} className="h-2" />
                </div>
                
                <h2 className="text-xl font-bold mb-6">{currentQuestion.question}</h2>
                
                <div className="space-y-3 mb-8">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => selectAnswer(option)}
                      disabled={showExplanation}
                      className={`w-full text-left p-4 rounded-lg border transition-colors ${
                        selectedAnswer === option
                          ? option === currentQuestion.correctAnswer
                            ? "border-green-500 bg-green-50"
                            : "border-red-500 bg-red-50"
                          : showExplanation && option === currentQuestion.correctAnswer
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>{option}</span>
                        {showExplanation && (
                          option === currentQuestion.correctAnswer ? 
                            <CheckCircle className="ml-auto h-5 w-5 text-green-500" /> : 
                            selectedAnswer === option ? 
                              <X className="ml-auto h-5 w-5 text-red-500" /> : null
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                
                {showExplanation && (
                  <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                    <h3 className="font-bold mb-2">Explication</h3>
                    <p>{currentQuestion.explanation}</p>
                  </div>
                )}
                
                <div className="flex justify-end">
                  {showExplanation && (
                    <Button onClick={nextQuestion}>
                      {currentQuestionIndex < moduleQuestions.length - 1 ? "Question suivante" : "Voir les résultats"}
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">Aucune question disponible pour ce module.</p>
                <Button onClick={exitQuiz} className="mt-4">Retour au module</Button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h2 className="text-xl font-bold mb-2">{module.title}</h2>
              <p className="text-gray-600 mb-4">{module.description}</p>
              
              <div className="flex justify-between text-sm mb-1">
                <span>Progression</span>
                <span>{module.completedLessons}/{module.totalLessons} leçons</span>
              </div>
              <Progress value={progress} className="h-2 mb-2" />
            </div>
            
            <div className="flex border-b mb-6">
              <button
                className={`flex-1 py-3 text-center font-medium ${
                  activeTab === "lessons" ? "border-b-2 border-france-blue text-france-blue" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("lessons")}
              >
                <div className="flex items-center justify-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Leçons</span>
                </div>
              </button>
              
              <button
                className={`flex-1 py-3 text-center font-medium ${
                  activeTab === "quiz" ? "border-b-2 border-france-blue text-france-blue" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("quiz")}
              >
                <div className="flex items-center justify-center gap-2">
                  <Book className="h-4 w-4" />
                  <span>Quiz</span>
                </div>
              </button>
            </div>
            
            {activeTab === "lessons" && (
              <div className="space-y-4">
                {moduleLessons.length > 0 ? (
                  moduleLessons.map((lesson, index) => (
                    <div key={lesson.id} className="bg-white rounded-lg border border-gray-100 p-4 flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-france-blue text-white flex items-center justify-center text-sm">
                            {index + 1}
                          </span>
                          <h3 className="font-medium">{lesson.title}</h3>
                          {index < module.completedLessons && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {lesson.content.substring(0, 60)}...
                        </p>
                      </div>
                      
                      <Button 
                        variant={index < module.completedLessons ? "outline" : "default"} 
                        onClick={() => startLesson(lesson.id)}
                      >
                        {index < module.completedLessons ? "Réviser" : "Commencer"}
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500">Aucune leçon disponible pour ce module.</p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === "quiz" && (
              <div className="bg-white rounded-lg border border-gray-100 p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-france-blue rounded-full flex items-center justify-center text-white">
                  <Book className="h-8 w-8" />
                </div>
                
                <h3 className="text-lg font-bold mb-2">Testez vos connaissances</h3>
                <p className="text-gray-600 mb-6">
                  Ce quiz contient {moduleQuestions.length} questions couvrant les leçons de ce module.
                </p>
                
                <Button onClick={startQuiz} className="w-full sm:w-auto">
                  Démarrer le quiz
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
