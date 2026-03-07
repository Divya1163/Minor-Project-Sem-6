'use client';

import { Card } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const temperatureData = [
  { temp: 15, comfortable: 15, uncomfortable: 25 },
  { temp: 18, comfortable: 35, uncomfortable: 18 },
  { temp: 21, comfortable: 65, uncomfortable: 8 },
  { temp: 24, comfortable: 78, uncomfortable: 5 },
  { temp: 27, comfortable: 72, uncomfortable: 12 },
  { temp: 30, comfortable: 45, uncomfortable: 35 },
];

const humidityData = [
  { rh: 30, count: 28 },
  { rh: 40, count: 45 },
  { rh: 50, count: 78 },
  { rh: 60, count: 65 },
  { rh: 70, count: 48 },
  { rh: 80, count: 32 },
];

const comfortDistribution = [
  { name: 'Comfortable', value: 358, color: '#b0e0e6' },
  { name: 'Uncomfortable', value: 143, color: '#ff6b6b' },
];

const featureImportance = [
  { feature: 'Temperature', importance: 0.28 },
  { feature: 'Humidity', importance: 0.22 },
  { feature: 'Air Velocity', importance: 0.18 },
  { feature: 'Met. Rate', importance: 0.16 },
  { feature: 'Clothing', importance: 0.16 },
];

const modelPerformance = [
  { model: 'Logistic Regression', accuracy: 0.78 },
  { model: 'Random Forest', accuracy: 0.85 },
  { model: 'XGBoost', accuracy: 0.82 },
];

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 border-border bg-card">
          <p className="text-sm text-muted-foreground mb-2">Total Predictions</p>
          <p className="text-3xl font-bold text-foreground">501</p>
          <p className="text-xs text-accent mt-2">+12 this week</p>
        </Card>
        <Card className="p-6 border-border bg-card">
          <p className="text-sm text-muted-foreground mb-2">Comfort Rate</p>
          <p className="text-3xl font-bold text-accent">71.5%</p>
          <p className="text-xs text-muted-foreground mt-2">358 comfortable</p>
        </Card>
        <Card className="p-6 border-border bg-card">
          <p className="text-sm text-muted-foreground mb-2">Avg Accuracy</p>
          <p className="text-3xl font-bold text-accent">82.2%</p>
          <p className="text-xs text-muted-foreground mt-2">Across all models</p>
        </Card>
        <Card className="p-6 border-border bg-card">
          <p className="text-sm text-muted-foreground mb-2">Optimal Temp</p>
          <p className="text-3xl font-bold text-foreground">22-24°C</p>
          <p className="text-xs text-muted-foreground mt-2">Comfort zone</p>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature vs Comfort */}
        <Card className="p-6 border-border bg-card">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Temperature vs Comfort</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(34, 34, 34)" />
              <XAxis dataKey="temp" stroke="rgb(150, 150, 150)" />
              <YAxis stroke="rgb(150, 150, 150)" />
              <Tooltip contentStyle={{ backgroundColor: 'rgb(30, 30, 30)', border: '1px solid rgb(50, 50, 50)' }} />
              <Legend />
              <Bar dataKey="comfortable" stackId="a" fill="#b0e0e6" />
              <Bar dataKey="uncomfortable" stackId="a" fill="#ff6b6b" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Comfort Distribution */}
        <Card className="p-6 border-border bg-card">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Comfort Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={comfortDistribution} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.name}: ${entry.value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                {comfortDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'rgb(30, 30, 30)', border: '1px solid rgb(50, 50, 50)' }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Humidity Distribution */}
        <Card className="p-6 border-border bg-card">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Humidity Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={humidityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(34, 34, 34)" />
              <XAxis dataKey="rh" stroke="rgb(150, 150, 150)" />
              <YAxis stroke="rgb(150, 150, 150)" />
              <Tooltip contentStyle={{ backgroundColor: 'rgb(30, 30, 30)', border: '1px solid rgb(50, 50, 50)' }} />
              <Line type="monotone" dataKey="count" stroke="#b0e0e6" dot={{ fill: '#b0e0e6' }} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Feature Importance */}
        <Card className="p-6 border-border bg-card">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Feature Importance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={featureImportance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(34, 34, 34)" />
              <XAxis type="number" stroke="rgb(150, 150, 150)" />
              <YAxis dataKey="feature" type="category" width={100} stroke="rgb(150, 150, 150)" />
              <Tooltip contentStyle={{ backgroundColor: 'rgb(30, 30, 30)', border: '1px solid rgb(50, 50, 50)' }} />
              <Bar dataKey="importance" fill="#a78bfa" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Model Performance Comparison */}
      <Card className="p-6 border-border bg-card">
        <h3 className="text-lg font-semibold mb-6 text-foreground">Model Performance Comparison</h3>
        <div className="space-y-4">
          {modelPerformance.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">{item.model}</span>
                <span className="text-sm font-semibold text-accent">{(item.accuracy * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full transition-all duration-500"
                  style={{ width: `${item.accuracy * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Key Insights */}
      <Card className="p-6 border-border bg-secondary">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Key Insights</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span>The optimal temperature range for comfort is 22-24°C with moderate humidity (45-55%)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span>Temperature is the most important predictor (28% importance) in thermal comfort</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span>Random Forest model achieves the highest accuracy at 85% on test data</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span>71.5% of all predictions indicate comfortable conditions</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
