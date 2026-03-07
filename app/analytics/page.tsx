import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { AnalyticsDashboard } from '@/components/analytics-dashboard';
import { BarChart3 } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 bg-background">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-foreground">Analytics Dashboard</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Comprehensive analysis of thermal comfort predictions, model performance, and key environmental patterns.
            </p>
          </div>

        {/* Dashboard */}
        <AnalyticsDashboard />
      </div>
    </main>
    <Footer />
    </div>
  );
}
