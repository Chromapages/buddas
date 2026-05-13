import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * On-demand ISR revalidation webhook endpoint for Sanity CMS.
 *
 * Configure in Sanity dashboard:
 * 1. Go to your Sanity project -> Settings -> Webhooks
 * 2. Create a new webhook with:
 *    - URL: `https://yourdomain.com/api/revalidate?secret=YOUR_SECRET`
 *    - Trigger on: document publish/update events
 *    - Filter: _type == "landingPage" (or your relevant document types)
 * 3. Set REVALIDATE_SECRET in your environment variables
 *
 * @example
 * # .env.local
 * REVALIDATE_SECRET=your-secret-value-here
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { error: 'Invalid or missing secret' },
      { status: 401 }
    )
  }

  revalidatePath('/buddas')

  return NextResponse.json({ revalidated: true })
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}