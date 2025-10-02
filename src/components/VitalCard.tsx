import { Card } from "@/components/ui/card.tsx";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils.ts";

interface VitalCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  status: "normal" | "warning" | "critical";
  trend?: "up" | "down" | "stable";
}

export const VitalCard = ({
  title,
  value,
  unit,
  icon: Icon,
  status,
  trend,
}: VitalCardProps) => {
  const statusColors = {
    normal: "border-success bg-success/5",
    warning: "border-warning bg-warning/5",
    critical: "border-destructive bg-destructive/5 animate-pulse-glow",
  };

  const statusTextColors = {
    normal: "text-success",
    warning: "text-warning",
    critical: "text-destructive",
  };

  return (
    <Card
      className={cn(
        "p-4 border-2 transition-all duration-300 hover:shadow-lg",
        statusColors[status]
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div
          className={cn(
            "p-2 rounded-lg",
            status === "normal" && "bg-success/10",
            status === "warning" && "bg-warning/10",
            status === "critical" && "bg-destructive/10"
          )}
        >
          <Icon className={cn("h-5 w-5", statusTextColors[status])} />
        </div>
        {trend && (
          <div className="text-xs text-muted-foreground">
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold">{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
      </div>
    </Card>
  );
};