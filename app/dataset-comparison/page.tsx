import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { DatasetComparison } from '@/components/dataset-comparison';
import { Database } from 'lucide-react';

export const metadata = {
  title: 'Dataset Comparison | Thermal Comfort Predictor',
  description: 'Compare India thermal comfort dataset with ASHRAE global database',
};

export default function DatasetComparisonPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Page Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Database className="w-6 h-6 text-accent" />
              </div>
              <h1 className="text-4xl font-bold text-foreground">Dataset Comparison</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Understanding the differences between the India thermal comfort dataset and the global ASHRAE database. 
              Learn why localized models provide better predictions for specific regions.
            </p>
          </div>

          {/* Content */}
          <DatasetComparison />
        </div>
      </main>

      <Footer />
    </div>
  );
}
