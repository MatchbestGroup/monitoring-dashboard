import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const response = await fetch('http://prometheus:9090/api/v1/query?query=up');
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 });
  }
}
