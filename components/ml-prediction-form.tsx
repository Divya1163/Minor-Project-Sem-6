'use client';

import React from "react"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, Zap, Brain, Cloud, AlertCircle, CheckCircle } from 'lucide-react';
import { SampleScenarios } from './sample-scenarios';
import { predictThermalComfort, validateInput, getTSVLabel, PredictionResult as ClientPredictionResult } from '@/lib/ml-model';

interface ServerPrediction {
  tsv: number;
  comfort_category: string;
  confidence: number;
  explanation: string;
}

interface HybridPredictionResult {
  clientPrediction: ClientPredictionResult;
  serverPrediction?: ServerPrediction;
  agreement: boolean;
  predictionMode: 'client' | 'server' | 'hybrid';
  timestamp: number;
}

export function MLPredictionForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<HybridPredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [useServer, setUseServer] = useState(true);

  const [formData, setFormData] = useState({
    ta: 22 as number,
    tr: 22 as number,
    rh: 50 as number,
    v: 0.1 as number,
    met: 1.0 as number,
    clo: 0.5 as number,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
    setError(null);
  };

  const handleScenarioSelect = (scenario: any) => {
    setFormData(scenario.values);
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate input
      const validation = validateInput(formData);
      if (!validation.valid) {
        setError(validation.errors.join(', '));
        setLoading(false);
        return;
      }

      // Get client-side prediction (always available)
      const clientPrediction = predictThermalComfort(formData);

      let serverPrediction: ServerPrediction | undefined;
      let predictionMode: 'client' | 'server' | 'hybrid' = 'client';

      // Try to get server-side prediction if enabled (using real trained model)
      if (useServer) {
        try {
          const response = await fetch('/api/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ta: formData.ta,
              tr: formData.tr,
              rh: formData.rh,
              v: formData.v,
              met: formData.met,
              clo: formData.clo,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success && data.prediction) {
              serverPrediction = {
                tsv: data.prediction.tsv,
                comfort_category: data.prediction.category,
                confidence: data.prediction.confidence,
                explanation: `Predicted using trained XGBoost model on India thermal comfort dataset. Accuracy: ${(data.modelInfo?.accuracy * 100).toFixed(1)}%`,
              };
              predictionMode = 'hybrid';
            }
          }
        } catch (err) {
          console.warn('Server prediction failed, using client-side only:', err);
          predictionMode = 'client';
        }
      }

      // Check agreement between predictions
      const agreement =
        !serverPrediction ||
        Math.abs(clientPrediction.tsv - serverPrediction.tsv) <= 1;

      const hybridResult: HybridPredictionResult = {
        clientPrediction,
        serverPrediction,
        agreement,
        predictionMode,
        timestamp: Date.now(),
      };

      setResult(hybridResult);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Prediction failed';
      setError(errorMsg);
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTSVColor = (tsv: number) => {
    if (tsv <= -2) return 'bg-blue-500/20 text-blue-300';
    if (tsv === -1) return 'bg-cyan-500/20 text-cyan-300';
    if (tsv === 0) return 'bg-green-500/20 text-green-300';
    if (tsv === 1) return 'bg-yellow-500/20 text-yellow-300';
    if (tsv === 2) return 'bg-orange-500/20 text-orange-300';
    return 'bg-red-500/20 text-red-300';
  };

  return (
    <div className="space-y-6">
      <SampleScenarios onScenarioSelect={handleScenarioSelect} />

      {/* Prediction Mode Selector */}
      <Card className="p-4 border-border bg-card/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Prediction Mode</span>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={!useServer ? 'default' : 'outline'}
              size="sm"
              onClick={() => setUseServer(false)}
            >
              Client-Side
            </Button>
            <Button
              type="button"
              variant={useServer ? 'default' : 'outline'}
              size="sm"
              onClick={() => setUseServer(true)}
            >
              <Cloud className="w-3 h-3 mr-1" />
              Server-Side
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {useServer
            ? 'Uses server-side ML model for accurate predictions'
            : 'Uses lightweight client-side model (offline capable)'}
        </p>
      </Card>

      {/* Main Form Card */}
      <Card className="p-6 border-border">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-accent" />
          Thermal Parameters
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Temperature Section */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-foreground">Temperature Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ta" className="text-sm">
                  Air Temperature (°C)
                </Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    id="ta"
                    name="ta"
                    type="number"
                    step="0.1"
                    min="-50"
                    max="50"
                    value={formData.ta}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                  />
                  <span className="text-xs text-muted-foreground w-16">{typeof formData.ta === 'number' ? formData.ta.toFixed(1) : '0.0'}°C</span>
                </div>
              </div>

              <div>
                <Label htmlFor="tr" className="text-sm">
                  Mean Radiant Temp (°C)
                </Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    id="tr"
                    name="tr"
                    type="number"
                    step="0.1"
                    min="-50"
                    max="80"
                    value={formData.tr}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                  />
                  <span className="text-xs text-muted-foreground w-16">{typeof formData.tr === 'number' ? formData.tr.toFixed(1) : '0.0'}°C</span>
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Section */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-foreground">Environmental Conditions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rh" className="text-sm">
                  Relative Humidity (%)
                </Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    id="rh"
                    name="rh"
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    value={formData.rh}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                  />
                  <span className="text-xs text-muted-foreground w-16">{typeof formData.rh === 'number' ? formData.rh.toFixed(0) : '0'}%</span>
                </div>
              </div>

              <div>
                <Label htmlFor="v" className="text-sm">
                  Air Velocity (m/s)
                </Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    id="v"
                    name="v"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.v}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                  />
                  <span className="text-xs text-muted-foreground w-16">{typeof formData.v === 'number' ? formData.v.toFixed(2) : '0.00'} m/s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Parameters Section */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-foreground">Personal Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="met" className="text-sm">
                  Metabolic Rate (met)
                </Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    id="met"
                    name="met"
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="5"
                    value={formData.met}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                  />
                  <span className="text-xs text-muted-foreground w-16">{typeof formData.met === 'number' ? formData.met.toFixed(1) : '0.0'} met</span>
                </div>
              </div>

              <div>
                <Label htmlFor="clo" className="text-sm">
                  Clothing Insulation (clo)
                </Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    id="clo"
                    name="clo"
                    type="number"
                    step="0.1"
                    min="0"
                    max="3"
                    value={formData.clo}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                  />
                  <span className="text-xs text-muted-foreground w-16">{typeof formData.clo === 'number' ? formData.clo.toFixed(1) : '0.0'} clo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Predicting...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Predict Comfort
              </>
            )}
          </Button>
        </form>
      </Card>

      {/* Results Display */}
      {result && (
        <Card className="p-6 border-border bg-card/50">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Prediction Results
          </h3>

          <div className="space-y-4">
            {/* Prediction Mode Indicator */}
            <div className="text-xs text-muted-foreground">
              Mode: {result.predictionMode === 'hybrid' ? 'Hybrid (Client + Server)' : 'Client-Side Only'}
              {result.agreement === false && (
                <span className="ml-2 text-yellow-400">⚠ Predictions differ</span>
              )}
            </div>

            {/* Main TSV Result */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Thermal Sensation Vote (TSV)</p>
                <div className={`p-4 rounded-lg ${getTSVColor(result.clientPrediction.tsv)} border border-current`}>
                  <div className="text-4xl font-bold">{result.clientPrediction.tsv}</div>
                  <div className="text-sm font-medium">{getTSVLabel(result.clientPrediction.tsv)}</div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Comfort Status</p>
                <div className={`p-4 rounded-lg ${getTSVColor(result.clientPrediction.tsv)} border border-current`}>
                  <div className="font-semibold">{result.clientPrediction.comfortCategory || 'Unknown'}</div>
                  <div className="text-sm mt-2">
                    Confidence: {result.clientPrediction.confidence !== undefined ? (result.clientPrediction.confidence * 100).toFixed(1) : 'N/A'}%
                  </div>
                </div>
              </div>
            </div>

            {/* Prediction Details */}
            <div className="bg-secondary/30 p-4 rounded-lg space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Explanation</p>
                <p className="text-sm text-foreground">{result.clientPrediction.explanation}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-muted-foreground">PMV Index</p>
                  <p className="font-medium">{result.clientPrediction.phdIndex !== undefined ? result.clientPrediction.phdIndex.toFixed(2) : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Acceptability Index (PPD)</p>
                  <p className="font-medium">{result.clientPrediction.acceptabilityIndex !== undefined ? result.clientPrediction.acceptabilityIndex.toFixed(0) : 'N/A'}%</p>
                </div>
              </div>
            </div>

            {/* Server Prediction Comparison (if available) */}
            {result.serverPrediction && (
              <div className="border-t border-border pt-4">
                <p className="text-sm font-semibold mb-2">Server Prediction Comparison</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">TSV</p>
                    <p className="font-medium">{result.serverPrediction.tsv !== undefined ? result.serverPrediction.tsv : 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Confidence</p>
                    <p className="font-medium">{result.serverPrediction.confidence !== undefined ? (result.serverPrediction.confidence * 100).toFixed(1) : 'N/A'}%</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{result.serverPrediction.explanation || 'No explanation available'}</p>
              </div>
            )}

            {/* Recommendations */}
            <div className="border-t border-border pt-4">
              <p className="text-sm font-semibold mb-2">Recommendations</p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                {result.clientPrediction.tsv < 0 && (
                  <>
                    <li>• Increase room temperature or add insulation</li>
                    <li>• Reduce air velocity</li>
                    <li>• Wear warmer clothing</li>
                  </>
                )}
                {result.clientPrediction.tsv > 0 && (
                  <>
                    <li>• Decrease room temperature</li>
                    <li>• Increase air circulation</li>
                    <li>• Reduce clothing insulation</li>
                  </>
                )}
                {result.clientPrediction.tsv === 0 && (
                  <>
                    <li>• Current conditions are optimal</li>
                    <li>• Maintain current settings</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
