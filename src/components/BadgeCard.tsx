
import { cn } from "@/lib/utils";

interface BadgeCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  achieved: boolean;
  progress?: number;
  maxProgress?: number;
}

export default function BadgeCard({
  id,
  name,
  description,
  icon,
  achieved,
  progress = 0,
  maxProgress = 0,
}: BadgeCardProps) {
  const progressPercentage = maxProgress > 0 ? (progress / maxProgress) * 100 : 0;
  
  return (
    <div className={cn(
      "bg-white border rounded-lg p-4 text-center flex flex-col items-center",
      achieved ? "border-amber-300" : "border-gray-200"
    )}>
      <div className={cn(
        "w-16 h-16 mb-3 rounded-full flex items-center justify-center text-2xl",
        achieved 
          ? "bg-amber-100 text-amber-600 animate-pulse-gentle" 
          : "bg-gray-100 text-gray-400"
      )}>
        {icon}
      </div>
      
      <h4 className="font-bold">{name}</h4>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
      
      {!achieved && maxProgress > 0 && (
        <div className="w-full mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{progress}/{maxProgress}</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-france-blue"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
