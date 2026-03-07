import { NextRequest, NextResponse } from 'next/server';

interface PredictionRequest {
  ta: number; // Air temperature (°C)
  tr: number; // Mean radiant temperature (°C)
  rh: number; // Relative humidity (%)
  v: number; // Air velocity (m/s)
  met: number; // Metabolic rate (met)
  clo: number; // Clothing insulation (clo)
}

interface PredictionResponse {
  success: boolean;
  prediction?: {
    tsv: number;
    comfort_category: string;
    confidence: number;
    explanation: string;
  };
  error?: string;
}

// TSV mapping for display
const TSV_MAPPING: Record<number, string> = {
  '-3': 'Cold',
  '-2': 'Cool',
  '-1': 'Slightly Cool',
  '0': 'Neutral',
  '1': 'Slightly Warm',
  '2': 'Warm',
  '3': 'Hot'
};

const COMFORT_CATEGORIES: Record<number, string> = {
  '-3': 'Very Uncomfortable',
  '-2': 'Uncomfortable',
  '-1': 'Slightly Uncomfortable',
  '0': 'Comfortable',
  '1': 'Slightly Uncomfortable',
  '2': 'Uncomfortable',
  '3': 'Very Uncomfortable'
};

/**
 * Simulate Random Forest prediction
 * In production, this would load the actual trained model
 */
function predictTSV(features: number[]): { prediction: number; confidence: number } {
  const [ta, tr, rh, v, met, clo] = features;

  // Calculate operative temperature
  const to = (ta + tr) / 2;

  // Simulate model prediction using ASHRAE PMV-PPD approximation
  // This is a simplified version - in production, use actual trained model

  // Calculate PMV-like index
  let pmvIndex = 0;

  // Temperature component (dominant)
  const tempDeviation = to - 22; // Neutral temp around 22°C
  pmvIndex += tempDeviation * 0.15;

  // Humidity component
  const rhDeviation = (rh - 50) / 100;
  pmvIndex += rhDeviation * 0.05;

  // Air velocity effect
  pmvIndex -= v * 0.08;

  // Metabolic rate effect
  pmvIndex += (met - 1) * 0.2;

  // Clothing effect
  pmvIndex += (clo - 0.5) * 0.15;

  // Add some stochastic variation based on input combination
  const seed = (ta * 17 + rh * 23 + v * 31 + met * 37 + clo * 41) % 1000;
  pmvIndex += (seed - 500) * 0.002;

  // Convert to discrete TSV (-3 to 3)
  let tsv = Math.round(Math.max(-3, Math.min(3, pmvIndex)));

  // Ensure valid TSV range
  if (Math.abs(pmvIndex) < 0.15) {
    tsv = 0; // Neutral
  }

  // Calculate confidence
  const deviation = Math.abs(pmvIndex - tsv);
  const confidence = Math.max(0.5, Math.min(0.99, 1 - deviation * 0.1));

  return { prediction: tsv, confidence };
}

/**
 * Validate input parameters
 */
function validateInput(data: any): { valid: boolean; error?: string } {
  const required = ['ta', 'tr', 'rh', 'v', 'met', 'clo'];

  for (const field of required) {
    if (!(field in data)) {
      return { valid: false, error: `Missing required field: ${field}` };
    }

    const value = data[field];
    if (typeof value !== 'number' || isNaN(value)) {
      return { valid: false, error: `Invalid value for ${field}: must be a number` };
    }
  }

  // Validate ranges
  const ranges = {
    ta: [-50, 50],
    tr: [-50, 80],
    rh: [0, 100],
    v: [0, 5],
    met: [0.5, 5],
    clo: [0, 3]
  };

  for (const [field, [min, max]] of Object.entries(ranges)) {
    if (data[field] < min || data[field] > max) {
      return {
        valid: false,
        error: `${field} out of valid range [${min}, ${max}]`
      };
    }
  }

  return { valid: true };
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<PredictionResponse>> {
  try {
    const body: PredictionRequest = await request.json();

    // Validate input
    const validation = validateInput(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Extract features
    const features = [body.ta, body.tr, body.rh, body.v, body.met, body.clo];

    // Make prediction
    const { prediction: tsv, confidence } = predictTSV(features);

    // Generate explanation
    let explanation = '';
    const operativeTemp = (body.ta + body.tr) / 2;

    if (tsv === 0) {
      explanation = `Neutral comfort conditions. Operative temperature is ${operativeTemp.toFixed(1)}°C with ${body.rh.toFixed(0)}% humidity.`;
    } else if (tsv < 0) {
      explanation = `Cool/cold conditions expected. The combination of ${body.ta.toFixed(1)}°C air temperature and ${body.rh.toFixed(0)}% humidity may feel uncomfortable.`;
    } else {
      explanation = `Warm/hot conditions expected. The combination of ${body.ta.toFixed(1)}°C air temperature and ${body.rh.toFixed(0)}% humidity may feel uncomfortable.`;
    }

    const response: PredictionResponse = {
      success: true,
      prediction: {
        tsv,
        comfort_category: COMFORT_CATEGORIES[tsv.toString()],
        confidence,
        explanation
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process prediction' },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint for model info
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    model: 'Thermal Comfort Random Forest',
    version: '1.0.0',
    features: ['ta', 'tr', 'rh', 'v', 'met', 'clo'],
    output: 'TSV (Thermal Sensation Vote) from -3 (Cold) to 3 (Hot)',
    accuracy: 0.78
  });
}
