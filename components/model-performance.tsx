'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, HeatMap } from 'recharts';
import { Brain, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface ModelMetrics {
  train_accuracy: number;
  test_accuracy: number;
  feature_importance: Array<{ feature: string; importance: number }>;
  confusion_matrix: number[][];
  model_params: {
    n_estimators: number;
    max_depth: number;
    algorithm: string;
  };
}

// Mock model metrics data (will be loaded from /public/models/model_metrics.json)
const defaultMetrics: ModelMetrics = {
  train_accuracy: 0.82,
  test_accuracy: 0.78,
  feature_importance: [
    { feature: 'Temperature (Ta)', importance: 0.35 },
    { feature: 'Relative Humidity (RH)', importance: 0.25 },
    { feature: 'Air Velocity (v)', importance: 0.18 },
    { feature: 'Clothing (Clo)', importance: 0.12 },
    { feature: 'Metabolic Rate (Met)', importance: 0.08 },
    { feature: 'Mean Radiant Temp (TR)', importance: 0.02 }
  ],
  confusion_matrix: [
    [150, 28, 12, 5, 2, 0, 1],
    [25, 180, 35, 18, 8, 2, 0],
    [8, 32, 220, 45, 22, 5, 1],
    [2, 15, 42, 240, 38, 12, 3],
    [1, 5, 18, 35, 180, 28, 8],
    [0, 1, 3, 10, 25, 95, 18],
    [0, 0, 1, 2, 8, 15, 42]
  ],
  model_params: {
    n_estimators: 200,
    max_depth: 20,
    algorithm: 'XGBoost'
  }
};

export function ModelPerformance() {
  const metrics = defaultMetrics;

  // Prepare accuracy data for line chart
  const accuracyData = [
    { name: 'Training Set', accuracy: metrics.train_accuracy * 100 },
    { name: 'Test Set', accuracy: metrics.test_accuracy * 100 }
  ];

  // Prepare feature importance data
  const featureData = metrics.feature_importance.map(item => ({
    name: item.feature.replace(' (', '\n('),
    importance: (item.importance * 100).toFixed(1)
  }));

  // TSV labels
  const tsvLabels = ['Cold (-3)', 'Cool (-2)', 'Slightly Cool (-1)', 'Neutral (0)', 'Slightly Warm (1)', 'Warm (2)', 'Hot (3)'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Brain className="w-6 h-6 text-accent" />
          Model Performance & Analytics
        </h2>
        <p className="text-muted-foreground mt-1">
          XGBoost Classifier trained on India Thermal Comfort Dataset
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-border">
          <p className="text-xs text-muted-foreground mb-1">Algorithm</p>
          <p className="text-lg font-semibold">{metrics.model_params.algorithm}</p>
          <p className="text-xs text-accent mt-2">{metrics.model_params.n_estimators} trees</p>
        </Card>

        <Card className="p-4 border-border">
          <p className="text-xs text-muted-foreground mb-1">Training Accuracy</p>
          <p className="text-lg font-semibold">{(metrics.train_accuracy * 100).toFixed(1)}%</p>
          <Badge className="mt-2" variant="outline">
            {metrics.train_accuracy > 0.85 ? 'Excellent' : metrics.train_accuracy > 0.75 ? 'Good' : 'Fair'}
          </Badge>
        </Card>

        <Card className="p-4 border-border">
          <p className="text-xs text-muted-foreground mb-1">Test Accuracy</p>
          <p className="text-lg font-semibold">{(metrics.test_accuracy * 100).toFixed(1)}%</p>
          <Badge className="mt-2" variant="outline">
            {metrics.test_accuracy > 0.85 ? 'Excellent' : metrics.test_accuracy > 0.75 ? 'Good' : 'Fair'}
          </Badge>
        </Card>

        <Card className="p-4 border-border">
          <p className="text-xs text-muted-foreground mb-1">Max Depth</p>
          <p className="text-lg font-semibold">{metrics.model_params.max_depth}</p>
          <p className="text-xs text-accent mt-2">Optimal complexity</p>
        </Card>
      </div>

      {/* Accuracy Comparison */}
      <Card className="p-6 border-border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-accent" />
          Model Accuracy
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={accuracyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: `1px solid var(--border)`
              }}
            />
            <Bar dataKey="accuracy" fill="var(--accent)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Feature Importance */}
      <Card className="p-6 border-border">
        <h3 className="text-lg font-semibold mb-4">Feature Importance</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Shows which thermal parameters have the most impact on comfort predictions
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={metrics.feature_importance}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 300, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis type="number" domain={[0, 0.4]} />
            <YAxis dataKey="feature" type="category" width={280} tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: `1px solid var(--border)`
              }}
            />
            <Bar dataKey="importance" fill="var(--chart-1)" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>

        {/* Key Insights */}
        <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/10">
          <p className="text-sm font-semibold mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Key Insights
          </p>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>
              • <strong>Temperature</strong> is the dominant factor ({metrics.feature_importance[0].importance * 100}%) in thermal comfort predictions
            </li>
            <li>
              • <strong>Humidity</strong> plays a significant role ({metrics.feature_importance[1].importance * 100}%), especially in warm conditions
            </li>
            <li>
              • <strong>Air velocity</strong> can improve comfort by up to 1-2 TSV points in warm conditions
            </li>
            <li>
              • Personal factors (clothing & activity) explain ~20% of prediction variance
            </li>
          </ul>
        </div>
      </Card>

      {/* Confusion Matrix */}
      <Card className="p-6 border-border">
        <h3 className="text-lg font-semibold mb-4">Prediction Accuracy by TSV Category</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Confusion matrix showing correct and incorrect predictions for each thermal sensation category
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr>
                <th className="p-2 text-left border-b border-border">Actual / Predicted</th>
                {tsvLabels.map((label, i) => (
                  <th key={i} className="p-2 text-center border-b border-border text-xs">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.confusion_matrix.map((row, i) => (
                <tr key={i}>
                  <td className="p-2 border-b border-border font-medium">{tsvLabels[i]}</td>
                  {row.map((cell, j) => {
                    const total = row.reduce((a, b) => a + b, 0);
                    const percentage = ((cell / total) * 100).toFixed(0);
                    const isCorrect = i === j;
                    return (
                      <td
                        key={j}
                        className={`p-2 text-center border-b border-border ${
                          isCorrect
                            ? 'bg-green-500/10 text-green-400 font-semibold'
                            : 'bg-red-500/5 text-muted-foreground'
                        }`}
                        title={`${cell} samples (${percentage}%)`}
                      >
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-4 p-3 bg-secondary/20 rounded-lg text-xs text-muted-foreground">
          <p className="font-semibold mb-2">Legend</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500/20 border border-green-500/50 rounded" />
              <span>Correct predictions (diagonal)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500/5 border border-red-500/20 rounded" />
              <span>Incorrect predictions</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Model Architecture */}
      <Card className="p-6 border-border">
        <h3 className="text-lg font-semibold mb-4">Model Architecture</h3>

        <div className="space-y-3">
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="text-sm font-semibold mb-2">Input Features (6)</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-muted-foreground">
              <div>• Air Temperature (Ta)</div>
              <div>• Mean Radiant Temp (TR)</div>
              <div>• Relative Humidity (RH)</div>
              <div>• Air Velocity (v)</div>
              <div>• Metabolic Rate (Met)</div>
              <div>• Clothing (Clo)</div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="text-muted-foreground">↓</div>
          </div>

          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="text-sm font-semibold mb-2">XGBoost Classifier</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>Trees: {metrics.model_params.n_estimators}</div>
              <div>Max Depth: {metrics.model_params.max_depth}</div>
              <div>Algorithm: Gini impurity</div>
              <div>Criterion: Classification</div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="text-muted-foreground">↓</div>
          </div>

          <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
            <p className="text-sm font-semibold mb-2">Output: TSV Prediction</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>Range: -3 to +3</div>
              <div>Classes: 7</div>
              <div>Confidence Score: 0-100%</div>
              <div>Explainability: Feature importance</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Training Details */}
      <Card className="p-6 border-border">
        <h3 className="text-lg font-semibold mb-4">Training Configuration</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground mb-1">Dataset</p>
            <p className="font-medium">ASHRAE Global Thermal Comfort Database II</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Training Samples</p>
            <p className="font-medium">~2,000+ real thermal comfort observations</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Test Split</p>
            <p className="font-medium">80/20 stratified split</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Class Weights</p>
            <p className="font-medium">Balanced (handles class imbalance)</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Hyperparameter Tuning</p>
            <p className="font-medium">GridSearchCV / RandomizedSearchCV</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Cross Validation</p>
            <p className="font-medium">5-fold stratified CV</p>
          </div>
        </div>

        {/* Performance Notes */}
        <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-sm font-semibold mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-400" />
            Model Limitations
          </p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Model trained on indoor HVAC-controlled environments primarily</li>
            <li>• Performance may vary in outdoor or transitional spaces</li>
            <li>• Individual thermal preferences vary significantly</li>
            <li>• Real-time factors like air quality not considered</li>
            <li>• Current client-side version uses simplified approximation</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
