
import { useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import BadgeCard from "@/components/BadgeCard";
import { badges, streakData, userStats } from "@/lib/mock-data";
import { Fire, Trophy, Award, BookOpen, CheckCircle, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Profile() {
  const [activeDays] = useState<string[]>([
    "Lundi", "Mardi", "Mercredi" // Active days in the current week
  ]);
  
  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-france-blue text-white flex items-center justify-center text-4xl font-bold">
              U
            </div>
            
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl font-bold">Utilisateur</h2>
              <p className="text-gray-600 mb-4">Apprenant depuis 8 jours</p>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span className="text-sm">Niveau {userStats.level}</span>
                </div>
                
                <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                  <Fire className="h-4 w-4 text-amber-500" />
                  <span className="text-sm">{streakData.current} jours</span>
                </div>
                
                <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                  <Award className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">{badges.filter(b => b.achieved).length} badges</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-4">Mes statistiques</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-blue-100 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-france-blue" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{userStats.totalXP}</div>
              <div className="text-xs text-gray-500">XP Total</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-amber-100 flex items-center justify-center">
                <Fire className="h-5 w-5 text-amber-500" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{streakData.longest}</div>
              <div className="text-xs text-gray-500">Record de série</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{userStats.accuracy}%</div>
              <div className="text-xs text-gray-500">Précision</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-purple-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-purple-500" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{userStats.daysActive}</div>
              <div className="text-xs text-gray-500">Jours actifs</div>
            </div>
          </div>
        </section>
        
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-2">Suivi hebdomadaire</h3>
          <p className="text-sm text-gray-600 mb-4">Votre série actuelle : {streakData.current} jours</p>
          
          <div className="grid grid-cols-7 gap-2">
            {["L", "M", "M", "J", "V", "S", "D"].map((day, index) => {
              const dayName = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"][index];
              const isActive = activeDays.includes(dayName);
              
              return (
                <div key={day} className="text-center">
                  <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${
                    isActive ? "bg-france-blue text-white" : "bg-gray-100 text-gray-400"
                  }`}>
                    {isActive && <Fire className="h-4 w-4" />}
                  </div>
                  <div className="text-xs mt-1">{day}</div>
                </div>
              );
            })}
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-bold mb-4">Badges et réalisations</h3>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-4 bg-gray-100">
              <TabsTrigger 
                value="all"
                className="data-[state=active]:bg-france-blue data-[state=active]:text-white"
              >
                Tous ({badges.length})
              </TabsTrigger>
              <TabsTrigger 
                value="achieved"
                className="data-[state=active]:bg-france-blue data-[state=active]:text-white"
              >
                Obtenus ({badges.filter(b => b.achieved).length})
              </TabsTrigger>
              <TabsTrigger 
                value="inprogress"
                className="data-[state=active]:bg-france-blue data-[state=active]:text-white"
              >
                En cours ({badges.filter(b => !b.achieved).length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {badges.map((badge) => (
                  <BadgeCard key={badge.id} {...badge} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="achieved" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {badges
                  .filter(badge => badge.achieved)
                  .map((badge) => (
                    <BadgeCard key={badge.id} {...badge} />
                  ))
                }
              </div>
            </TabsContent>
            
            <TabsContent value="inprogress" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {badges
                  .filter(badge => !badge.achieved)
                  .map((badge) => (
                    <BadgeCard key={badge.id} {...badge} />
                  ))
                }
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      
      <Navbar />
    </div>
  );
}
