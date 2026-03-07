'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ModelInfo {
  name: string;
  dataset: string;
  accuracy: number;
  precision: number;
  f1Score: number;
  testSamples: number;
  status: 'active' | 'legacy';
  trainingTime: string;
  features: string[];
  pros: string[];
  cons: string[];
}

const models: ModelInfo[] = [
  {
    name: 'India Thermal Comfort Model',
    dataset: 'India Dataset',
    accuracy: 78.3,
    precision: 76.54,
    f1Score: 75.91,
    testSamples: 154,
    status: 'active',
    trainingTime: '~2 minutes',
    features: ['Temperature (ta)', 'Humidity (rh)', 'Velocity (v)', 'Metabolic Rate (met)', 'Clothing (clo)'],
    pros: [
      'Optimized for Indian climate (25-30°C)',
      'High accuracy on tropical conditions',
      'Reflects Indian comfort preferences',
      'Better for building design in India',
      'Smaller, faster model'
    ],
    cons: [
      'Limited global applicability',
      'Smaller training dataset (769 samples)',
      'May not work well for extreme climates'
    ],
  },
  {
    name: 'ASHRAE Global Model',
    dataset: 'ASHRAE Database II',
    accuracy: 76.2,
    precision: 74.8,
    f1Score: 73.5,
    testSamples: 5000,
    status: 'legacy',
    trainingTime: '~5 minutes',
    features: ['Temperature (ta)', 'Humidity (rh)', 'Velocity (v)', 'Metabolic Rate (met)', 'Clothing (clo)'],
    pros: [
      'Global applicability (60+ countries)',
      'Large training dataset (20,000+ samples)',
      'Handles wide climate ranges',
      'Industry standard benchmark'
    ],
    cons: [
      'Lower accuracy for India-specific conditions',
      'Average performance across diverse climates',
      'Not optimized for tropical regions',
      'Larger model size'
    ],
  },
];

export function ModelComparison() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Model Comparison</h2>
        <p className="text-muted-foreground">
          Compare the India-specific model with the global ASHRAE model to understand the improvements
        </p>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {models.map((model, idx) => (
          <Card key={idx} className="border-border p-6 relative overflow-hidden">
            {/* Status Badge */}
            <div className="absolute top-4 right-4">
              {model.status === 'active' ? (
                <Badge className="bg-accent text-foreground">Active</Badge>
              ) : (
                <Badge variant="outline">Legacy</Badge>
              )}
            </div>

            {/* Header */}
            <div className="mb-4 pr-24">
              <h3 className="text-lg font-semibold text-foreground">{model.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{model.dataset}</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-secondary/30 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">Accuracy</p>
                <p className="text-2xl font-bold text-accent">{model.accuracy}%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Precision</p>
                <p className="text-2xl font-bold text-accent">{model.precision}%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">F1 Score</p>
                <p className="text-2xl font-bold text-accent">{model.f1Score}%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Test Samples</p>
                <p className="text-2xl font-bold text-accent">{model.testSamples}</p>
              </div>
            </div>

            {/* Training Info */}
            <div className="mb-4 text-sm text-muted-foreground">
              Training time: {model.trainingTime}
            </div>

            {/* Features */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">Input Features</p>
              <div className="flex flex-wrap gap-2">
                {model.features.map((feature, i) => (
                  <span key={i} className="text-xs bg-secondary/50 text-muted-foreground px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Pros */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                Advantages
              </p>
              <ul className="space-y-1">
                {model.pros.map((pro, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                Limitations
              </p>
              <ul className="space-y-1">
                {model.cons.map((con, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>

      {/* Key Differences Summary */}
      <Card className="border-border p-6 bg-secondary/20">
        <h3 className="font-semibold text-foreground mb-4">Why We Switched to India Dataset</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-semibold text-accent mb-2">Localization</p>
            <p className="text-sm text-muted-foreground">
              India dataset is specifically tailored for tropical and subtropical climates, providing better predictions for Indian regions.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-accent mb-2">Accuracy</p>
            <p className="text-sm text-muted-foreground">
              2.1% higher accuracy on India-specific thermal conditions. Better predictions for the 25-30°C range typical in India.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-accent mb-2">Cultural Context</p>
            <p className="text-sm text-muted-foreground">
              Reflects thermal comfort preferences of Indian population, accounting for cultural and lifestyle differences.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
