import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { MLPredictionForm } from '@/components/ml-prediction-form';
import { Thermometer, Brain, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 bg-background">
        <Navigation />

        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* India Dataset Banner */}
          <div className="mb-8 p-4 bg-gradient-to-r from-accent/20 to-secondary/20 border border-accent/40 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-foreground">Now Running: India Thermal Comfort Dataset</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Switched from ASHRAE to localized India dataset (769 observations). 78.3% accuracy on tropical climate conditions.
                </p>
                <a href="/dataset-comparison" className="text-sm text-accent hover:underline mt-2 inline-block">
                  View dataset differences →
                </a>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Brain className="w-6 h-6 text-accent" />
              </div>
              <h1 className="text-4xl font-bold text-foreground">Thermal Comfort Predictor</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Advanced AI-powered system optimized for Indian climate conditions. Predict thermal comfort levels based on environmental and personal factors.
              Powered by XGBoost models trained on 769 real thermal comfort observations from India.
            </p>
            <div className="flex items-center gap-4 mt-4 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-accent">
                <Zap className="w-4 h-4" />
                Hybrid deployment (client + server)
              </div>
              <div className="flex items-center gap-2 text-sm text-accent">
                <Brain className="w-4 h-4" />
                Real ML model predictions
              </div>
              <div className="flex items-center gap-2 text-sm text-accent">
                <span className="w-2 h-2 rounded-full bg-accent" />
                India-specific accuracy
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Prediction Form - Takes up 2 columns */}
            <div className="lg:col-span-2">
              <MLPredictionForm />
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="bg-accent/10 border border-accent/30 p-6 rounded-lg space-y-3">
                <h3 className="font-semibold text-foreground">India Dataset Active</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>
                    <span className="text-accent font-semibold">Observations:</span> 769
                  </div>
                  <div>
                    <span className="text-accent font-semibold">Accuracy:</span> 78.3%
                  </div>
                  <div>
                    <span className="text-accent font-semibold">Climate:</span> Tropical/Subtropical
                  </div>
                  <div>
                    <span className="text-accent font-semibold">Temp Range:</span> 25-30°C
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border p-6 rounded-lg space-y-3">
                <h3 className="font-semibold text-foreground">How it works</h3>
                <ol className="text-sm text-muted-foreground space-y-2">
                  <li>
                    <span className="text-accent font-semibold">1.</span> Enter thermal parameters
                  </li>
                  <li>
                    <span className="text-accent font-semibold">2.</span> ML models process data
                  </li>
                  <li>
                    <span className="text-accent font-semibold">3.</span> Get comfort prediction
                  </li>
                </ol>
              </div>

              <div className="bg-secondary border border-border p-6 rounded-lg space-y-3">
                <h3 className="font-semibold text-foreground">Parameters Explained</h3>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div>
                    <span className="text-accent font-semibold">Temperature:</span> Air temperature in Celsius
                  </div>
                  <div>
                    <span className="text-accent font-semibold">Humidity:</span> Relative humidity percentage
                  </div>
                  <div>
                    <span className="text-accent font-semibold">Velocity:</span> Air movement in m/s
                  </div>
                  <div>
                    <span className="text-accent font-semibold">Met Rate:</span> Metabolic activity level
                  </div>
                  <div>
                    <span className="text-accent font-semibold">Clothing:</span> Insulation level (clo units)
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 border border-accent/30 p-6 rounded-lg space-y-3">
                <h3 className="font-semibold text-accent">Model Info</h3>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div>
                    <span className="text-foreground font-semibold">Best Model:</span> XGBoost
                  </div>
                  <div>
                    <span className="text-foreground font-semibold">Accuracy:</span> 85%
                  </div>
                  <div>
                    <span className="text-foreground font-semibold">Training Data:</span> 501+ samples
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </main>
    <Footer />
    </div>
  );
}
