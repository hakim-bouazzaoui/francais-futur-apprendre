
import { cn } from "@/lib/utils";
import { CheckCircle, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export interface LearningModuleProps {
  id: string;
  title: string;
  description: string;
  completedLessons: number;
  totalLessons: number;
  image?: string;
  isLocked?: boolean;
  category: string;
}

export default function LearningModule({
  id,
  title,
  description,
  completedLessons,
  totalLessons,
  image,
  isLocked = false,
  category,
}: LearningModuleProps) {
  const progress = Math.round((completedLessons / totalLessons) * 100);
  const isComplete = completedLessons === totalLessons && totalLessons > 0;

  return (
    <Link
      to={isLocked ? "#" : `/module/${id}`}
      className={cn(
        "module-card flex flex-col h-full",
        isLocked && "opacity-80 grayscale"
      )}
    >
      <div 
        className="h-32 bg-gradient-to-r from-france-blue to-blue-500 relative"
        style={image ? { backgroundImage: `url(${image})`, backgroundSize: 'cover' } : {}}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
          <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
        
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Lock className="w-8 h-8 text-white" />
          </div>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg mb-1">
          {title}
          {isComplete && (
            <CheckCircle className="w-5 h-5 text-green-500 ml-1 inline" />
          )}
        </h3>
        <p className="text-sm text-gray-600 mb-4 flex-1">{description}</p>
        
        <div className="mt-auto">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{isComplete ? "Complété" : `${completedLessons}/${totalLessons} leçons`}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full transition-all duration-700",
                isComplete ? "bg-green-500" : "bg-france-blue"
              )}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}
