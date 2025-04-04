import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"
import User from "@/models/user"
import { authMiddleware } from "@/middleware/auth"

// Remove connection
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

    // Remove connection for both users
    await User.findByIdAndUpdate(user._id, {
      $pull: { connections: id },
    })

    await User.findByIdAndUpdate(id, {
      $pull: { connections: user._id },
    })

    return NextResponse.json({
      success: true,
      message: "Connection removed",
    })
  } catch (error) {
    console.error("Remove connection error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

