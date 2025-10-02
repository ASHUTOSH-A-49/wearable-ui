import { Card } from "@/components/ui/card.tsx";
import { MapPin, Navigation } from "lucide-react";

interface LocationTrackerProps {
  latitude: number;
  longitude: number;
  accuracy?: number;
  lastUpdate: string;
}

export const LocationTracker = ({
  latitude,
  longitude,
  accuracy,
  lastUpdate,
}: LocationTrackerProps) => {
  return (
    <Card className="p-6 border-2 border-accent">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-accent" />
          <h3 className="text-lg font-semibold">Location Tracking</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Latitude</p>
            <p className="font-mono text-sm font-medium">{latitude.toFixed(6)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Longitude</p>
            <p className="font-mono text-sm font-medium">{longitude.toFixed(6)}</p>
          </div>
        </div>

        {accuracy && (
          <div className="flex items-center gap-2 text-sm">
            <Navigation className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">
              Accuracy: ±{accuracy}m
            </span>
          </div>
        )}

        <div className="pt-3 border-t">
          <p className="text-xs text-muted-foreground">
            Last updated: {lastUpdate}
          </p>
        </div>
      </div>
    </Card>
  );
};