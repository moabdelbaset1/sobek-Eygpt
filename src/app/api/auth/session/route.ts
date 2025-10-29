import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("session")
    
    if (!session) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    // Verify session and get user data
    // This is a simplified version - you should verify the session token
    // and fetch actual user data from your database
    
    return NextResponse.json({ 
      user: {
        id: "user-id",
        email: "user@example.com",
        name: "User Name"
      }
    })
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 200 })
  }
}
