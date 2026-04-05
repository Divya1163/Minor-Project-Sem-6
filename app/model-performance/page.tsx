import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ModelPerformance } from '@/components/model-performance';
import { ModelComparison } from '@/components/model-comparison';

export const metadata = {
  title: 'Model Performance - Thermal Comfort Predictor',
  description: 'XGBoost ML model performance metrics, accuracy analysis, and comparison with ASHRAE'
};

export default function ModelPerformancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
          <ModelPerformance />
          <div className="border-t border-border pt-12">
            <ModelComparison />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
