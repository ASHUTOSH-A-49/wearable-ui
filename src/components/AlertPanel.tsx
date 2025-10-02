import { Card } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Bell, AlertTriangle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils.ts";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  message: string;
  timestamp: string;
  source: string;
}

interface AlertPanelProps {
  alerts: Alert[];
}

export const AlertPanel = ({ alerts }: AlertPanelProps) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      default:
        return <Info className="h-5 w-5 text-primary" />;
    }
  };

  const getAlertStyles = (type: string) => {
    switch (type) {
      case "critical":
        return "border-l-4 border-l-destructive bg-destructive/5";
      case "warning":
        return "border-l-4 border-l-warning bg-warning/5";
      default:
        return "border-l-4 border-l-primary bg-primary/5";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Active Alerts</h3>
        <Badge variant="secondary" className="ml-auto">
          {alerts.length}
        </Badge>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No active alerts</p>
            <p className="text-sm">All systems operating normally</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={cn(
                "p-4 rounded-lg transition-all hover:shadow-md",
                getAlertStyles(alert.type)
              )}
            >
              <div className="flex items-start gap-3">
                {getAlertIcon(alert.type)}
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">{alert.message}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{alert.source}</span>
                    <span>•</span>
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};