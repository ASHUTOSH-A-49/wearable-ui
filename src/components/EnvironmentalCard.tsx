import { Card } from "@/components/ui/card.tsx";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils.ts";

interface EnvironmentalCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  status: "safe" | "caution" | "danger";
  threshold?: string;
}

export const EnvironmentalCard = ({
  title,
  value,
  unit,
  icon: Icon,
  status,
  threshold,
}: EnvironmentalCardProps) => {
  const statusColors = {
    safe: "border-success bg-success/5",
    caution: "border-warning bg-warning/5",
    danger: "border-destructive bg-destructive/5 animate-pulse-glow",
  };

  const statusTextColors = {
    safe: "text-success",
    caution: "text-warning",
    danger: "text-destructive",
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
            status === "safe" && "bg-success/10",
            status === "caution" && "bg-warning/10",
            status === "danger" && "bg-destructive/10"
          )}
        >
          <Icon className={cn("h-5 w-5", statusTextColors[status])} />
        </div>
        <div
          className={cn(
            "px-2 py-0.5 rounded-full text-xs font-medium",
            statusTextColors[status]
          )}
        >
          {status.toUpperCase()}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold">{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        {threshold && (
          <p className="text-xs text-muted-foreground">
            Threshold: {threshold}
          </p>
        )}
      </div>
    </Card>
  );
};