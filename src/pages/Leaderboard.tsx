
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock leaderboard data
const weeklyData = [
  { id: 1, name: "Sophie", xp: 458, rank: 1, avatar: "S", isCurrentUser: false },
  { id: 2, name: "Thomas", xp: 412, rank: 2, avatar: "T", isCurrentUser: false },
  { id: 3, name: "Utilisateur", xp: 387, rank: 3, avatar: "U", isCurrentUser: true },
  { id: 4, name: "Marie", xp: 356, rank: 4, avatar: "M", isCurrentUser: false },
  { id: 5, name: "Pierre", xp: 325, rank: 5, avatar: "P", isCurrentUser: false },
  { id: 6, name: "Julie", xp: 298, rank: 6, avatar: "J", isCurrentUser: false },
  { id: 7, name: "Antoine", xp: 276, rank: 7, avatar: "A", isCurrentUser: false },
  { id: 8, name: "Clara", xp: 251, rank: 8, avatar: "C", isCurrentUser: false },
  { id: 9, name: "Lucas", xp: 237, rank: 9, avatar: "L", isCurrentUser: false },
  { id: 10, name: "Emma", xp: 212, rank: 10, avatar: "E", isCurrentUser: false },
];

const allTimeData = [
  { id: 1, name: "Thomas", xp: 12548, rank: 1, avatar: "T", isCurrentUser: false },
  { id: 2, name: "Sophie", xp: 11235, rank: 2, avatar: "S", isCurrentUser: false },
  { id: 3, name: "Pierre", xp: 10987, rank: 3, avatar: "P", isCurrentUser: false },
  { id: 4, name: "Marie", xp: 9856, rank: 4, avatar: "M", isCurrentUser: false },
  { id: 5, name: "Antoine", xp: 8975, rank: 5, avatar: "A", isCurrentUser: false },
  { id: 6, name: "Emma", xp: 8124, rank: 6, avatar: "E", isCurrentUser: false },
  { id: 7, name: "Lucas", xp: 7654, rank: 7, avatar: "L", isCurrentUser: false },
  { id: 8, name: "Utilisateur", xp: 7123, rank: 8, avatar: "U", isCurrentUser: true },
  { id: 9, name: "Julie", xp: 6987, rank: 9, avatar: "J", isCurrentUser: false },
  { id: 10, name: "Clara", xp: 6543, rank: 10, avatar: "C", isCurrentUser: false },
];

export default function Leaderboard() {
  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6">Classement</h2>
        
        <Tabs defaultValue="weekly">
          <TabsList className="mb-4 bg-gray-100 w-full">
            <TabsTrigger 
              value="weekly"
              className="flex-1 data-[state=active]:bg-france-blue data-[state=active]:text-white"
            >
              Cette semaine
            </TabsTrigger>
            <TabsTrigger 
              value="alltime"
              className="flex-1 data-[state=active]:bg-france-blue data-[state=active]:text-white"
            >
              Tous les temps
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="mt-0">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="p-4 bg-france-blue text-white">
                <h3 className="font-semibold">Votre position</h3>
                <p className="text-sm">Félicitations, vous êtes dans le top 3 !</p>
              </div>
              
              {weeklyData.map((user, index) => (
                <div 
                  key={user.id}
                  className={`p-4 flex items-center ${
                    user.isCurrentUser ? "bg-blue-50" : index % 2 === 0 ? "bg-gray-50" : ""
                  } ${index < 3 ? "border-l-4 border-france-blue" : ""}`}
                >
                  <div className="w-8 text-center font-bold text-gray-500">{user.rank}</div>
                  
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ml-2 ${
                    index === 0 ? "bg-amber-400" : 
                    index === 1 ? "bg-gray-400" : 
                    index === 2 ? "bg-amber-700" : 
                    user.isCurrentUser ? "bg-france-blue" : "bg-gray-300"
                  }`}>
                    {user.avatar}
                  </div>
                  
                  <div className="ml-3 flex-1">
                    <div className="font-medium flex items-center gap-2">
                      {user.name}
                      {user.isCurrentUser && (
                        <Badge variant="outline" className="text-xs border-france-blue text-france-blue">Vous</Badge>
                      )}
                    </div>
                    {index < 3 && (
                      <div className="text-xs text-gray-500">
                        {index === 0 ? "🥇 Champion de la semaine" : 
                         index === 1 ? "🥈 Argent" : "🥉 Bronze"}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold">{user.xp} XP</div>
                    {index === 0 && <div className="text-xs text-amber-500">Leader</div>}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="alltime" className="mt-0">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="p-4 bg-france-blue text-white">
                <h3 className="font-semibold">Votre position</h3>
                <p className="text-sm">Continuez à apprendre pour monter dans le classement !</p>
              </div>
              
              {allTimeData.map((user, index) => (
                <div 
                  key={user.id}
                  className={`p-4 flex items-center ${
                    user.isCurrentUser ? "bg-blue-50" : index % 2 === 0 ? "bg-gray-50" : ""
                  } ${index < 3 ? "border-l-4 border-france-blue" : ""}`}
                >
                  <div className="w-8 text-center font-bold text-gray-500">{user.rank}</div>
                  
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ml-2 ${
                    index === 0 ? "bg-amber-400" : 
                    index === 1 ? "bg-gray-400" : 
                    index === 2 ? "bg-amber-700" : 
                    user.isCurrentUser ? "bg-france-blue" : "bg-gray-300"
                  }`}>
                    {user.avatar}
                  </div>
                  
                  <div className="ml-3 flex-1">
                    <div className="font-medium flex items-center gap-2">
                      {user.name}
                      {user.isCurrentUser && (
                        <Badge variant="outline" className="text-xs border-france-blue text-france-blue">Vous</Badge>
                      )}
                    </div>
                    {index < 3 && (
                      <div className="text-xs text-gray-500">
                        {index === 0 ? "🏆 Grand maître" : 
                         index === 1 ? "🥈 Expert" : "🥉 Érudit"}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold">{user.xp.toLocaleString()} XP</div>
                    {index === 0 && <div className="text-xs text-amber-500">Champion</div>}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Navbar />
    </div>
  );
}
