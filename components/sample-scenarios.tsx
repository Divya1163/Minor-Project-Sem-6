'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface Scenario {
  name: string;
  description: string;
  values: {
    ta: number;
    rh: number;
    v: number;
    met: number;
    clo: number;
  };
  comfort: boolean;
}

const scenarios: Scenario[] = [
  {
    name: 'Ideal Office',
    description: 'Comfortable office environment with perfect settings',
    values: { ta: 22, rh: 50, v: 0.1, met: 1.1, clo: 0.5 },
    comfort: true,
  },
  {
    name: 'Hot Summer',
    description: 'Warm day with high humidity and minimal clothing',
    values: { ta: 28, rh: 70, v: 0.3, met: 1.2, clo: 0.3 },
    comfort: false,
  },
  {
    name: 'Cold Winter',
    description: 'Cold temperature with warm clothing',
    values: { ta: 18, rh: 40, v: 0.05, met: 1.0, clo: 1.0 },
    comfort: true,
  },
  {
    name: 'Active Workout',
    description: 'High metabolic activity in cool environment',
    values: { ta: 20, rh: 45, v: 0.5, met: 2.5, clo: 0.2 },
    comfort: false,
  },
];

interface SampleScenariosProps {
  onScenarioSelect: (scenario: Scenario) => void;
}

export function SampleScenarios({ onScenarioSelect }: SampleScenariosProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-accent" />
        <h3 className="font-semibold text-foreground">Try Sample Scenarios</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {scenarios.map((scenario) => (
          <Card
            key={scenario.name}
            className="p-4 border-border bg-secondary hover:bg-secondary/80 cursor-pointer transition-colors"
            onClick={() => onScenarioSelect(scenario)}
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1 flex-1">
                  <h4 className="font-medium text-foreground text-sm">{scenario.name}</h4>
                  <p className="text-xs text-muted-foreground">{scenario.description}</p>
                </div>
                <div
                  className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${
                    scenario.comfort
                      ? 'bg-accent/20 text-accent'
                      : 'bg-destructive/20 text-destructive'
                  }`}
                >
                  {scenario.comfort ? 'Comfortable' : 'Uncomfortable'}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
