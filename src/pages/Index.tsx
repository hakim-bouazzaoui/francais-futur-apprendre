import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import LearningModule from "@/components/LearningModule";
import { modules, streakData, userStats } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Flame, Trophy } from "lucide-react";

export default function Index() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Bonjour");
    else if (hour < 18) setGreeting("Bon après-midi");
    else setGreeting("Bonsoir");
  }, []);

  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <section className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold">{greeting} 👋</h2>
              <p className="text-gray-600">Continuez votre apprentissage</p>
            </div>
            
            <div className="flex items-center gap-1">
              <div className="bg-amber-100 rounded-full px-3 py-1 text-sm flex items-center gap-1">
                <Trophy className="h-4 w-4 text-amber-500" />
                <span className="text-amber-700 font-medium">{userStats.level}</span>
              </div>
              
              <div className="streak-indicator px-3 py-1 bg-amber-100 rounded-full">
                <Flame className="h-4 w-4 text-amber-500" />
                <span className="text-amber-700 font-medium ml-1">{streakData.current}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-france-blue rounded-xl p-4 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full -mr-16 -mt-16 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400 rounded-full -ml-12 -mb-12 opacity-20"></div>
            
            <h3 className="text-lg font-bold mb-2">Continuez votre progression</h3>
            <p className="text-sm text-blue-100 mb-4">Encore 58 XP pour atteindre le niveau 4 !</p>
            
            <div className="h-2 bg-blue-400 bg-opacity-40 rounded-full mb-3">
              <div 
                className="h-full bg-white rounded-full transition-all duration-700"
                style={{ width: '65%' }}
              ></div>
            </div>
            
            <Button variant="secondary" size="sm" className="bg-white text-france-blue hover:bg-blue-50">
              Continuer
            </Button>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Modules d'apprentissage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module) => (
              <LearningModule key={module.id} {...module} />
            ))}
          </div>
        </section>
        
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Quiz quotidien</h2>
            <span className="text-sm text-france-red font-medium">Nouveau !</span>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-bold">Testez vos connaissances</h3>
              <p className="text-sm text-gray-600">5 questions • 3 minutes</p>
            </div>
            <Button className="bg-france-red hover:bg-red-600">Commencer</Button>
          </div>
        </section>
      </main>
      
      <Navbar />
    </div>
  );
}
