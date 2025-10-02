import { Badge } from "@/components/ui/badge.tsx";
import { Wifi, WifiOff, Bluetooth, Battery } from "lucide-react";
import { cn } from "@/lib/utils.ts";

interface StatusBarProps {
  deviceConnected: boolean;
  cloudConnected: boolean;
  batteryLevel: number;
  lastSync: string;
}

export const StatusBar = ({
  deviceConnected,
  cloudConnected,
  batteryLevel,
  lastSync,
}: StatusBarProps) => {
  const getBatteryColor = () => {
    if (batteryLevel > 50) return "text-success";
    if (batteryLevel > 20) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="flex items-center justify-between p-4 bg-card border-b">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {deviceConnected ? (
            <Bluetooth className="h-5 w-5 text-primary" />
          ) : (
            <Bluetooth className="h-5 w-5 text-muted-foreground" />
          )}
          <Badge variant={deviceConnected ? "default" : "secondary"}>
            {deviceConnected ? "Device Connected" : "Device Offline"}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          {cloudConnected ? (
            <Wifi className="h-5 w-5 text-primary" />
          ) : (
            <WifiOff className="h-5 w-5 text-muted-foreground" />
          )}
          <Badge variant={cloudConnected ? "default" : "secondary"}>
            {cloudConnected ? "Cloud Synced" : "Offline Mode"}
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Battery className={cn("h-5 w-5", getBatteryColor())} />
          <span className={cn("text-sm font-medium", getBatteryColor())}>
            {batteryLevel}%
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          Last sync: {lastSync}
        </span>
      </div>
    </div>
  );
};
