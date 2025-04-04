import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"
import User from "@/models/user"
import { authMiddleware } from "@/middleware/auth"

// Accept connection request
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

    // Check if user exists
    const requestingUser = await User.findById(id)

    if (!requestingUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Check if connection request exists
    if (!user.pendingConnections.includes(id)) {
      return NextResponse.json(
        { success: false, message: "No pending connection request from this user" },
        { status: 400 },
      )
    }

    // Add to connections for both users
    await User.findByIdAndUpdate(user._id, {
      $addToSet: { connections: id },
      $pull: { pendingConnections: id },
    })

    await User.findByIdAndUpdate(id, {
      $addToSet: { connections: user._id },
    })

    return NextResponse.json({
      success: true,
      message: "Connection request accepted",
    })
  } catch (error) {
    console.error("Accept connection request error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

