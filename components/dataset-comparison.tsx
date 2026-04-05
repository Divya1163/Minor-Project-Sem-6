'use client';

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { Globe, Database, TrendingUp, Users } from 'lucide-react';

const datasetComparison = [
  {
    metric: 'Sample Size',
    ashrae: '20,000+',
    india: '769',
    unit: 'observations',
  },
  {
    metric: 'Geographic Coverage',
    ashrae: '60+ countries',
    india: 'India only',
    unit: 'regions',
  },
  {
    metric: 'Temperature Range',
    ashrae: '15-35°C',
    india: '25-30°C',
    unit: '°C',
  },
  {
    metric: 'Humidity Range',
    ashrae: '20-90%',
    india: '50-65%',
    unit: '%',
  },
  {
    metric: 'Air Velocity Range',
    ashrae: '0-2.0 m/s',
    india: '0-0.6 m/s',
    unit: 'm/s',
  },
  {
    metric: 'Climate Type',
    ashrae: 'Mixed',
    india: 'Tropical/Subtropical',
    unit: 'focus',
  },
];

const temperatureDistribution = [
  { temp: '25-25.5', ashrae: 8, india: 12 },
  { temp: '25.5-26', ashrae: 12, india: 18 },
  { temp: '26-26.5', ashrae: 15, india: 22 },
  { temp: '26.5-27', ashrae: 18, india: 25 },
  { temp: '27-27.5', ashrae: 22, india: 28 },
  { temp: '27.5-28', ashrae: 20, india: 24 },
  { temp: '28-28.5', ashrae: 18, india: 20 },
  { temp: '28.5-29', ashrae: 15, india: 15 },
  { temp: '29-29.5', ashrae: 12, india: 10 },
  { temp: '29.5-30', ashrae: 8, india: 6 },
];

const tsvDistribution = [
  { category: 'Cold\n(-3 to -1)', ashrae: 15, india: 5 },
  { category: 'Cool\n(-1 to 0)', ashrae: 25, india: 12 },
  { category: 'Neutral\n(0)', ashrae: 35, india: 45 },
  { category: 'Warm\n(0 to 1)', ashrae: 18, india: 28 },
  { category: 'Hot\n(1 to 3)', ashrae: 7, india: 10 },
];

export function DatasetComparison() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Database className="w-5 h-5 text-accent" />
          <h2 className="text-2xl font-bold text-foreground">Dataset Comparison</h2>
        </div>
        <p className="text-muted-foreground">
          See how the India thermal comfort dataset differs from the global ASHRAE database
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4 border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Model</p>
              <p className="text-2xl font-bold text-accent mt-1">India Dataset</p>
            </div>
            <Badge className="bg-accent/20 text-accent border-accent">Current</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-3">769 thermal comfort observations</p>
        </Card>

        <Card className="p-4 border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Previous Model</p>
              <p className="text-2xl font-bold text-muted-foreground mt-1">ASHRAE Database</p>
            </div>
            <Badge variant="outline">Legacy</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-3">20,000+ global observations</p>
        </Card>

        <Card className="p-4 border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Focus Area</p>
              <p className="text-2xl font-bold text-foreground mt-1">Tropical</p>
            </div>
            <Globe className="w-5 h-5 text-accent opacity-50" />
          </div>
          <p className="text-xs text-muted-foreground mt-3">India-specific climate data</p>
        </Card>
      </div>

      {/* Detailed Comparison Table */}
      <Card className="border-border p-6">
        <h3 className="font-semibold text-foreground mb-4">Detailed Metrics</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Metric</th>
                <th className="text-center py-2 px-3 text-muted-foreground font-medium">India Dataset</th>
                <th className="text-center py-2 px-3 text-muted-foreground font-medium">ASHRAE Database</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Difference</th>
              </tr>
            </thead>
            <tbody>
              {datasetComparison.map((row, idx) => (
                <tr key={idx} className="border-b border-border/50 hover:bg-secondary/30 transition">
                  <td className="py-3 px-3 text-foreground font-medium">{row.metric}</td>
                  <td className="py-3 px-3 text-center text-accent font-semibold">{row.india}</td>
                  <td className="py-3 px-3 text-center text-muted-foreground">{row.ashrae}</td>
                  <td className="py-3 px-3 text-sm text-muted-foreground">
                    {row.metric === 'Sample Size' && '95% smaller but more focused'}
                    {row.metric === 'Geographic Coverage' && 'Localized vs global'}
                    {row.metric === 'Climate Type' && 'Specialized for tropics'}
                    {row.metric === 'Temperature Range' && 'Warmer focus zone'}
                    {row.metric === 'Humidity Range' && 'Tropical humidity'}
                    {row.metric === 'Air Velocity Range' && 'Lower wind speeds'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Visualization Tabs */}
      <Tabs defaultValue="temperature" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="temperature">Temperature Distribution</TabsTrigger>
          <TabsTrigger value="comfort">Thermal Sensation Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="temperature" className="space-y-4">
          <Card className="border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Temperature Distribution Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={temperatureDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="temp" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1a1a2e',
                    border: '1px solid #444',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="india" fill="#00d9ff" name="India Dataset" />
                <Bar dataKey="ashrae" fill="#888" name="ASHRAE (Reference)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-secondary/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <span className="text-accent font-semibold">India Dataset:</span> Concentrated in warmer range (26-28°C), typical of Indian climate
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="comfort" className="space-y-4">
          <Card className="border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Thermal Sensation Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tsvDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="category" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1a1a2e',
                    border: '1px solid #444',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="india" fill="#00d9ff" name="India Dataset" />
                <Bar dataKey="ashrae" fill="#888" name="ASHRAE (Reference)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-secondary/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <span className="text-accent font-semibold">Key Insight:</span> India dataset shows higher neutral comfort preferences (45% vs 35%), suggesting cultural adaptation to warm climates
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Key Differences */}
      <Card className="border-border p-6 bg-secondary/20">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Why India Dataset Matters</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-accent font-bold">•</span>
                <span><strong>Localized Accuracy:</strong> 78.3% accuracy on India-specific climate conditions</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold">•</span>
                <span><strong>Tropical Focus:</strong> Optimized for warm, humid conditions typical of Indian regions</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold">•</span>
                <span><strong>Cultural Context:</strong> Reflects thermal comfort preferences of Indian population</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold">•</span>
                <span><strong>Building Design:</strong> Better for designing Indian buildings and HVAC systems</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold">•</span>
                <span><strong>Practical Range:</strong> Covers 25-30°C range, excluding unrealistic extremes</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Model Information */}
      <Card className="border-border p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Database className="w-4 h-4 text-accent" />
          Current Model Details
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Algorithm</p>
            <p className="font-semibold text-foreground">XGBoost</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Accuracy</p>
            <p className="font-semibold text-accent">78.3%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Test Samples</p>
            <p className="font-semibold text-foreground">154</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Dataset</p>
            <p className="font-semibold text-foreground">India</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
