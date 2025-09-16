import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for demo purposes
// In a real app, this would be stored in a database
let conversionQuotes: any[] = []

export async function POST(request: NextRequest) {
  try {
    const quoteData = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'conversionType']
    
    for (const field of requiredFields) {
      if (!quoteData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }
    
    // Create new conversion quote request
    const newQuote = {
      id: `CQ${String(conversionQuotes.length + 1).padStart(3, '0')}`,
      ...quoteData,
      status: 'new',
      createdAt: new Date().toISOString(),
      type: 'conversion_quote_request'
    }
    
    // Add to conversion quotes array
    conversionQuotes.push(newQuote)
    
    // In a real app, you would:
    // 1. Save to database
    // 2. Send email notifications to sales team
    // 3. Send auto-reply to customer
    // 4. Add to CRM system
    // 5. Generate initial quote estimate
    
    return NextResponse.json(
      { 
        success: true, 
        quote: newQuote,
        message: 'Conversion quote request submitted successfully! Our team will contact you within 24 hours with a detailed quote.' 
      },
      { status: 201 }
    )
    
  } catch (error) {
    console.error('Error creating conversion quote request:', error)
    return NextResponse.json(
      { error: 'Failed to submit conversion quote request' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    return NextResponse.json(
      { 
        success: true, 
        quotes: conversionQuotes,
        count: conversionQuotes.length 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching conversion quotes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch conversion quotes' },
      { status: 500 }
    )
  }
}