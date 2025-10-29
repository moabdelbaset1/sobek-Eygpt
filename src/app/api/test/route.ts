import { NextRequest, NextResponse } from 'next/server';

// Simple test endpoint to verify API functionality
export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Test endpoint called');
    
    return NextResponse.json({
      success: true,
      message: 'API is working correctly',
      timestamp: new Date().toISOString(),
      endpoint: 'test'
    });
  } catch (error) {
    console.error('❌ Test endpoint error:', error);
    return NextResponse.json(
      { error: 'Test endpoint failed' },
      { status: 500 }
    );
  }
}