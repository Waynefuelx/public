import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for demo purposes
// In a real app, this would be stored in a database
let orders: any[] = []

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()
    
    // Validate required fields
    const requiredFields = [
      'orderType', 'customerName', 'customerEmail', 'customerPhone', 
      'containerType', 'containerId', 'quantity', 'deliveryOption', 
      'deliveryDate', 'total', 'paymentMethod'
    ]
    
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }
    
    // Create new order
    const newOrder = {
      id: `O${String(orders.length + 1).padStart(3, '0')}`,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      isNew: true
    }
    
    // Add to orders array
    orders.push(newOrder)
    
    // In a real app, you would:
    // 1. Save to database
    // 2. Send email notifications
    // 3. Update inventory
    // 4. Trigger workflow processes
    
    return NextResponse.json(
      { 
        success: true, 
        order: newOrder,
        message: 'Order submitted successfully!' 
      },
      { status: 201 }
    )
    
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    return NextResponse.json({ orders }, { status: 200 })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
