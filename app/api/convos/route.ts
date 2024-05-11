import { fetchConvoByIdandPage } from '@/app/lib/data';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Parse the request body
    const { convo_id, page } = await request.json();

    // Validate input
    if (typeof convo_id !== 'string' || typeof page !== 'number' || page < 1) {
      return NextResponse.json(
        { error: 'Invalid input parameters' },
        { status: 400 },
      );
    }

    // Fetch messages
    const messages = await fetchConvoByIdandPage(convo_id, page);

    // Return messages as JSON response
    return NextResponse.json(messages);
  } catch (error) {
    // Log error and return an error response
    console.error('Error handling request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
