import { NextRequest, NextResponse } from 'next/server';
import { getBusiness } from '@/lib/data';

const biz = getBusiness();
const API_KEY = process.env.GOOGLE_PLACES_API_KEY || '';

export async function POST(request: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const { input } = await request.json();

    if (!input || input.length < 3) {
      return NextResponse.json({ suggestions: [] });
    }

    // Call Places API (New) Autocomplete
    const res = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'Referer': biz.url,
      },
      body: JSON.stringify({
        input,
        includedRegionCodes: ['us'],
        ...(biz.geo.latitude && biz.geo.longitude ? {
          locationBias: {
            circle: {
              center: { latitude: biz.geo.latitude, longitude: biz.geo.longitude },
              radius: 80000,
            },
          },
        } : {}),
      }),
    });

    const data = await res.json();

    if (!data.suggestions) {
      return NextResponse.json({ suggestions: [] });
    }

    const suggestions = data.suggestions
      .filter((s: { placePrediction?: unknown }) => s.placePrediction)
      .slice(0, 5)
      .map((s: { placePrediction: { placeId: string; text: { text: string } } }) => ({
        placeId: s.placePrediction.placeId,
        description: s.placePrediction.text.text,
      }));

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Places autocomplete error:', error);
    return NextResponse.json({ suggestions: [] });
  }
}

// Get place details (address components) by place ID
export async function GET(request: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json({ error: 'No API key' }, { status: 500 });
  }

  const placeId = request.nextUrl.searchParams.get('placeId');
  if (!placeId) {
    return NextResponse.json({ error: 'Missing placeId' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          'X-Goog-Api-Key': API_KEY,
          'X-Goog-FieldMask': 'addressComponents,formattedAddress',
          'Referer': biz.url,
        },
      }
    );

    const data = await res.json();

    let street = '';
    let city = '';
    let zip = '';

    if (data.addressComponents) {
      for (const comp of data.addressComponents) {
        const types = comp.types || [];
        if (types.includes('street_number')) {
          street = comp.longText + ' ';
        } else if (types.includes('route')) {
          street += comp.longText;
        } else if (types.includes('locality')) {
          city = comp.longText;
        } else if (types.includes('postal_code')) {
          zip = comp.longText;
        }
      }
    }

    return NextResponse.json({
      serviceAddress: street.trim() || data.formattedAddress || '',
      city,
      postalCode: zip,
    });
  } catch (error) {
    console.error('Place details error:', error);
    return NextResponse.json({ error: 'Failed to fetch details' }, { status: 500 });
  }
}
