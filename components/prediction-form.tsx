'use client';

import React from "react"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Zap } from 'lucide-react';
import { SampleScenarios } from './sample-scenarios';

interface PredictionResult {
  comfortable: boolean;
  confidence: number;
  thi: number;
}

export function PredictionForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const [formData, setFormData] = useState({
    ta: 22,
    rh: 50,
    v: 0.1,
    met: 1.0,
    clo: 0.5,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleScenarioSelect = (scenario: any) => {
    setFormData(scenario.values);
    setResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Calculate THI (Thermal Humidity Index)
      const thi = formData.ta - (0.55 - 0.0055 * formData.rh) * (formData.ta - 14.5);

      // Simulate ML model prediction
      // In production, this would call your ML model endpoint
      const comfortable = thi > 15 && thi < 28 && formData.met < 1.5 && formData.clo >= 0.3;
      const confidence = 0.82 + Math.random() * 0.12;

      setResult({
        comfortable,
        confidence,
        thi,
      });
    } catch (error) {
      console.error('Prediction failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <SampleScenarios onScenarioSelect={handleScenarioSelect} />
      
      <Card className="p-6 border-border">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-accent" />
          Thermal Parameters
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Temperature */}
            <div className="space-y-2">
              <Label htmlFor="ta" className="text-foreground">
                Temperature (°C)
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="ta"
                  name="ta"
                  type="number"
                  step="0.1"
                  value={formData.ta}
                  onChange={handleChange}
                  className="flex-1 bg-secondary border-border text-foreground"
                />
                <span className="text-sm text-muted-foreground w-12 text-right">{formData.ta.toFixed(1)}</span>
              </div>
            </div>

            {/* Relative Humidity */}
            <div className="space-y-2">
              <Label htmlFor="rh" className="text-foreground">
                Relative Humidity (%)
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="rh"
                  name="rh"
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                  value={formData.rh}
                  onChange={handleChange}
                  className="flex-1 bg-secondary border-border text-foreground"
                />
                <span className="text-sm text-muted-foreground w-12 text-right">{formData.rh}</span>
              </div>
            </div>

            {/* Air Velocity */}
            <div className="space-y-2">
              <Label htmlFor="v" className="text-foreground">
                Air Velocity (m/s)
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="v"
                  name="v"
                  type="number"
                  step="0.01"
                  value={formData.v}
                  onChange={handleChange}
                  className="flex-1 bg-secondary border-border text-foreground"
                />
                <span className="text-sm text-muted-foreground w-12 text-right">{formData.v.toFixed(2)}</span>
              </div>
            </div>

            {/* Metabolic Rate */}
            <div className="space-y-2">
              <Label htmlFor="met" className="text-foreground">
                Metabolic Rate (met)
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="met"
                  name="met"
                  type="number"
                  step="0.1"
                  value={formData.met}
                  onChange={handleChange}
                  className="flex-1 bg-secondary border-border text-foreground"
                />
                <span className="text-sm text-muted-foreground w-12 text-right">{formData.met.toFixed(1)}</span>
              </div>
            </div>

            {/* Clothing Insulation */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="clo" className="text-foreground">
                Clothing Insulation (clo)
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="clo"
                  name="clo"
                  type="number"
                  step="0.1"
                  value={formData.clo}
                  onChange={handleChange}
                  className="flex-1 bg-secondary border-border text-foreground"
                />
                <span className="text-sm text-muted-foreground w-12 text-right">{formData.clo.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Predicting...
              </>
            ) : (
              'Predict Comfort Level'
            )}
          </Button>
        </form>
      </Card>

      {result && (
        <Card className={`p-6 border-2 ${result.comfortable ? 'border-accent bg-accent/5' : 'border-destructive bg-destructive/5'}`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Prediction Result</h3>
              <div
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  result.comfortable
                    ? 'bg-accent/20 text-accent'
                    : 'bg-destructive/20 text-destructive'
                }`}
              >
                {result.comfortable ? 'Comfortable ✓' : 'Uncomfortable ✗'}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Thermal Humidity Index</p>
                <p className="text-2xl font-bold text-foreground">{result.thi.toFixed(1)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Confidence Score</p>
                <p className="text-2xl font-bold text-accent">{(result.confidence * 100).toFixed(1)}%</p>
              </div>
            </div>

            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full transition-all duration-500"
                style={{ width: `${result.confidence * 100}%` }}
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
