import { useState, useEffect } from "react";
import { VitalCard } from "@/components/VitalCard";
import { EnvironmentalCard } from "@/components/EnvironmentalCard";
import { FatigueRiskScore } from "@/components/FatigueRiskScore";
import { AlertPanel } from "@/components/AlertPanel";
import { LocationTracker } from "@/components/LocationTracker";
import { StatusBar } from "@/components/StatusBar";
import {
  Heart,
  Droplets,
  Wind,
  Activity,
  Gauge,
  Thermometer,
  CloudRain,
  Zap,
  FlaskConical,
  Flame,
  AlertTriangle,
} from "lucide-react";

const Index = () => {
  // Simulate real-time data updates
  const [vitalData, setVitalData] = useState({
    heartRate: 72,
    spo2: 98,
    respiration: 16,
    ecg: "Normal Sinus Rhythm",
    temperature: 36.8,
  });

  const [environmentalData, setEnvironmentalData] = useState({
    co: 2,
    no2: 0.05,
    nh3: 0.8,
    voc: 120,
    o2: 20.9,
    temp: 24,
    humidity: 65,
    pressure: 1013,
  });

  const [fatigueScore, setFatigueScore] = useState(35);
  const [alerts, setAlerts] = useState([
    {
      id: "1",
      type: "warning" as const,
      message: "Elevated heart rate detected - 92 BPM",
      timestamp: "2 min ago",
      source: "Vital Monitor",
    },
    {
      id: "2",
      type: "info" as const,
      message: "Environmental conditions stable",
      timestamp: "5 min ago",
      source: "Gas Sensors",
    },
  ]);

  // Simulate data updates every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setVitalData((prev) => ({
        ...prev,
        heartRate: Math.max(60, Math.min(100, prev.heartRate + (Math.random() - 0.5) * 4)),
        spo2: Math.max(95, Math.min(100, prev.spo2 + (Math.random() - 0.5) * 2)),
      }));
      
      setFatigueScore((prev) => 
        Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 5))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Status Bar */}
      <StatusBar
        deviceConnected={true}
        cloudConnected={true}
        batteryLevel={87}
        lastSync="Just now"
      />

      {/* Header */}
      <div className="border-b bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold mb-2">
            Responder Health Monitor
          </h1>
          <p className="text-muted-foreground">
            Real-time vital signs, environmental monitoring, and fatigue assessment
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Vitals & Environmental */}
          <div className="xl:col-span-2 space-y-6">
            {/* Fatigue Risk Score */}
            <div className="animate-slide-up">
              <FatigueRiskScore
                score={Math.round(fatigueScore)}
                prediction={
                  fatigueScore < 30
                    ? "low"
                    : fatigueScore < 60
                    ? "moderate"
                    : fatigueScore < 80
                    ? "high"
                    : "critical"
                }
              />
            </div>

            {/* Vital Signs Section */}
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Activity className="h-6 w-6 text-primary" />
                Vital Parameters
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <VitalCard
                  title="Heart Rate"
                  value={Math.round(vitalData.heartRate)}
                  unit="BPM"
                  icon={Heart}
                  status={
                    vitalData.heartRate > 90
                      ? "warning"
                      : vitalData.heartRate > 100
                      ? "critical"
                      : "normal"
                  }
                  trend="stable"
                />
                <VitalCard
                  title="SpO₂"
                  value={Math.round(vitalData.spo2)}
                  unit="%"
                  icon={Droplets}
                  status={vitalData.spo2 < 95 ? "warning" : "normal"}
                  trend="stable"
                />
                <VitalCard
                  title="Respiration"
                  value={vitalData.respiration}
                  unit="BPM"
                  icon={Wind}
                  status="normal"
                  trend="stable"
                />
                <VitalCard
                  title="ECG Status"
                  value="Normal"
                  unit="SR"
                  icon={Activity}
                  status="normal"
                />
              </div>
            </div>

            {/* Environmental Monitoring Section */}
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <FlaskConical className="h-6 w-6 text-accent" />
                Environmental Sensors
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <EnvironmentalCard
                  title="Carbon Monoxide"
                  value={environmentalData.co}
                  unit="ppm"
                  icon={Flame}
                  status={
                    environmentalData.co > 9
                      ? "danger"
                      : environmentalData.co > 4
                      ? "caution"
                      : "safe"
                  }
                  threshold="< 9 ppm"
                />
                <EnvironmentalCard
                  title="Nitrogen Dioxide"
                  value={environmentalData.no2}
                  unit="ppm"
                  icon={Zap}
                  status="safe"
                  threshold="< 1 ppm"
                />
                <EnvironmentalCard
                  title="Ammonia"
                  value={environmentalData.nh3}
                  unit="ppm"
                  icon={AlertTriangle}
                  status="safe"
                  threshold="< 25 ppm"
                />
                <EnvironmentalCard
                  title="VOC"
                  value={environmentalData.voc}
                  unit="ppb"
                  icon={FlaskConical}
                  status="safe"
                  threshold="< 500 ppb"
                />
                <EnvironmentalCard
                  title="Oxygen"
                  value={environmentalData.o2}
                  unit="%"
                  icon={Wind}
                  status={environmentalData.o2 < 19.5 ? "danger" : "safe"}
                  threshold="> 19.5%"
                />
                <EnvironmentalCard
                  title="Temperature"
                  value={environmentalData.temp}
                  unit="°C"
                  icon={Thermometer}
                  status="safe"
                />
                <EnvironmentalCard
                  title="Humidity"
                  value={environmentalData.humidity}
                  unit="%"
                  icon={CloudRain}
                  status="safe"
                />
                <EnvironmentalCard
                  title="Pressure"
                  value={environmentalData.pressure}
                  unit="hPa"
                  icon={Gauge}
                  status="safe"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Alerts & Location */}
          <div className="space-y-6">
            <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <AlertPanel alerts={alerts} />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <LocationTracker
                latitude={28.6139}
                longitude={77.209}
                accuracy={5}
                lastUpdate="Just now"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
