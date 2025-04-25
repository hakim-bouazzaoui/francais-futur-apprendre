
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { modules } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LearningModule from "@/components/LearningModule";

export default function Lessons() {
  const categories = [...new Set(modules.map(module => module.category))];
  
  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6">Parcours d'apprentissage</h2>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-4 bg-gray-100">
            <TabsTrigger value="all" className="data-[state=active]:bg-france-blue data-[state=active]:text-white">
              Tous
            </TabsTrigger>
            {categories.map(category => (
              <TabsTrigger 
                key={category} 
                value={category.toLowerCase()}
                className="data-[state=active]:bg-france-blue data-[state=active]:text-white"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map((module) => (
                <LearningModule key={module.id} {...module} />
              ))}
            </div>
          </TabsContent>
          
          {categories.map(category => (
            <TabsContent key={category} value={category.toLowerCase()} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modules
                  .filter(module => module.category === category)
                  .map((module) => (
                    <LearningModule key={module.id} {...module} />
                  ))
                }
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
      
      <Navbar />
    </div>
  );
}
