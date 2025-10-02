import { Card } from "@/components/ui/card.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import { AlertTriangle, Activity } from "lucide-react";
import { cn } from "@/lib/utils.ts";

interface FatigueRiskScoreProps {
  score: number; // 0-100
  prediction: "low" | "moderate" | "high" | "critical";
}

export const FatigueRiskScore = ({
  score,
  prediction,
}: FatigueRiskScoreProps) => {
  const getRiskColor = () => {
    if (score < 30) return "text-success";
    if (score < 60) return "text-warning";
    return "text-destructive";
  };

  const getRiskBg = () => {
    if (score < 30) return "bg-success";
    if (score < 60) return "bg-warning";
    return "bg-destructive";
  };

  const getRiskLabel = () => {
    if (score < 30) return "Low Risk";
    if (score < 60) return "Moderate Risk";
    if (score < 80) return "High Risk";
    return "Critical Risk";
  };

  return (
    <Card className="p-6 border-2 border-primary bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">Fatigue Risk Assessment</h3>
          </div>
          {score >= 60 && (
            <AlertTriangle className="h-5 w-5 text-warning animate-pulse" />
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Risk Score</span>
            <span className={cn("text-3xl font-bold", getRiskColor())}>
              {score}%
            </span>
          </div>
          <Progress value={score} className="h-3" />
          <div className="flex items-center justify-between">
            <span
              className={cn(
                "text-sm font-medium px-3 py-1 rounded-full",
                getRiskColor(),
                score < 30 && "bg-success/10",
                score >= 30 && score < 60 && "bg-warning/10",
                score >= 60 && "bg-destructive/10"
              )}
            >
              {getRiskLabel()}
            </span>
            <span className="text-xs text-muted-foreground">
              AI Prediction: {prediction.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="pt-3 border-t space-y-2">
          <p className="text-xs text-muted-foreground">
            Based on: ECG patterns, PPG analysis, activity levels, and environmental exposure
          </p>
        </div>
      </div>
    </Card>
  );
};