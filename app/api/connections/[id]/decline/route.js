import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"
import User from "@/models/user"
import { authMiddleware } from "@/middleware/auth"

// Decline connection request
export async function PUT(request, { params }) {
  try {
    // Authenticate user
    const authRequest = await authMiddleware(request)

    if (authRequest instanceof NextResponse) {
      return authRequest // Return error response if authentication failed
    }

    const user = authRequest.user
    const { id } = params

    // Connect to the database
    await connectToDatabase()

    // Remove from pending connections
    await User.findByIdAndUpdate(user._id, {
      $pull: { pendingConnections: id },
    })

    return NextResponse.json({
      success: true,
      message: "Connection request declined",
    })
  } catch (error) {
    console.error("Decline connection request error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

