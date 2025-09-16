import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for demo purposes
// In a real app, this would be stored in a database
let contacts: any[] = []

export async function POST(request: NextRequest) {
  try {
    const contactData = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'message']
    
    for (const field of requiredFields) {
      if (!contactData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }
    
    // Create new contact inquiry
    const newContact = {
      id: `C${String(contacts.length + 1).padStart(3, '0')}`,
      ...contactData,
      status: 'new',
      createdAt: new Date().toISOString(),
      type: 'quote_request'
    }
    
    // Add to contacts array
    contacts.push(newContact)
    
    // In a real app, you would:
    // 1. Save to database
    // 2. Send email notifications to sales team
    // 3. Send auto-reply to customer
    // 4. Add to CRM system
    
    return NextResponse.json(
      { 
        success: true, 
        contact: newContact,
        message: 'Quote request submitted successfully! We will contact you soon.' 
      },
      { status: 201 }
    )
    
  } catch (error) {
    console.error('Error creating contact inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to submit quote request' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    return NextResponse.json(
      { 
        success: true, 
        contacts: contacts,
        count: contacts.length 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}
