import { NextRequest, NextResponse } from 'next/server';

// Flask backend URL
const FLASK_API_URL =
  process.env.FLASK_API_URL || "http://127.0.0.1:5000";

interface PredictionRequest {
  ta: number;  // Air temperature (°C)
  tr: number;  // Mean radiant temperature (°C)
  rh: number;  // Relative humidity (%)
  v: number;   // Air velocity (m/s)
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

  const ranges: Record<string, [number, number]> = {
    ta:  [-10, 55],
    tr:  [-10, 80],
    rh:  [0, 100],
    v:   [0, 5],
    met: [0.5, 5],
    clo: [0, 3],
  };

  for (const [field, [min, max]] of Object.entries(ranges)) {
    if (data[field] < min || data[field] > max) {
      return {
        valid: false,
        error: `${field} out of valid range [${min}, ${max}]`,
      };
    }
  }

  return { valid: true };
}

/**
 * POST /api/predict
 * Forwards request to Flask backend and returns the prediction
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<PredictionResponse>> {
  try {
    const body: PredictionRequest = await request.json();

    // Validate inputs
    const validation = validateInput(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Forward request to Flask backend
    let flaskResponse;
    try {
      flaskResponse = await fetch(`${FLASK_API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ta:  body.ta,
          tr:  body.tr,
          rh:  body.rh,
          v:   body.v,
          met: body.met,
          clo: body.clo,
        }),
      });
    } catch (fetchError) {
      // Flask server is not running
      return NextResponse.json(
        {
          success: false,
          error:
            'ML backend is not running. Please start the Flask server: cd backend && python app.py',
        },
        { status: 503 }
      );
    }

    if (!flaskResponse.ok) {
      const errorData = await flaskResponse.json();
      return NextResponse.json(
        { success: false, error: errorData.error || 'Flask backend error' },
        { status: flaskResponse.status }
      );
    }

    // Parse Flask response
    const flaskData = await flaskResponse.json();
    const p = flaskData.prediction;

    // Return in the format the frontend expects
    return NextResponse.json({
      success: true,
      prediction: {
        tsv:              p.tsv,
        comfort_category: p.comfort_category,
        confidence:       p.confidence,
        explanation:      p.recommendation,
      },
    });

  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process prediction request' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/predict
 * Returns model info from Flask backend
 */
export async function GET(): Promise<NextResponse> {
  try {
    const res = await fetch(`${FLASK_API_URL}/health`);
    const health = await res.json();
    return NextResponse.json({
      model:    'XGBoost Thermal Comfort Classifier',
      version:  '1.0.0',
      features: ['ta', 'tr', 'rh', 'v', 'met', 'clo'],
      output:   'TSV (Thermal Sensation Vote) from -3 (Cold) to +3 (Hot)',
      backend:  health,
    });
  } catch {
    return NextResponse.json({
      model:   'XGBoost Thermal Comfort Classifier',
      version: '1.0.0',
      backend: 'Flask server not reachable',
    });
  }
}
