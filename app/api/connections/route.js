import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"
import User from "@/models/user"
import { authMiddleware } from "@/middleware/auth"

// Get user connections
export async function GET(request) {
  try {
    // Authenticate user
    const authRequest = await authMiddleware(request)

    if (authRequest instanceof NextResponse) {
      return authRequest // Return error response if authentication failed
    }

    const user = authRequest.user

    // Connect to the database
    await connectToDatabase()

    // Get user with populated connections
    const userData = await User.findById(user._id)
      .populate("connections", "name profileImage location role")
      .populate("pendingConnections", "name profileImage location role")

    return NextResponse.json({
      success: true,
      data: {
        connections: userData.connections,
        pendingConnections: userData.pendingConnections,
      },
    })
  } catch (error) {
    console.error("Get connections error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

// Send connection request
export async function POST(request) {
  try {
    // Authenticate user
    const authRequest = await authMiddleware(request)

    if (authRequest instanceof NextResponse) {
      return authRequest // Return error response if authentication failed
    }

    const user = authRequest.user
    const { userId } = await request.json()

    // Connect to the database
    await connectToDatabase()

    // Check if user exists
    const targetUser = await User.findById(userId)

    if (!targetUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Check if already connected
    if (user.connections.includes(userId)) {
      return NextResponse.json({ success: false, message: "Already connected with this user" }, { status: 400 })
    }

    // Check if connection request already sent
    if (targetUser.pendingConnections.includes(user._id)) {
      return NextResponse.json({ success: false, message: "Connection request already sent" }, { status: 400 })
    }

    // Add to pending connections
    await User.findByIdAndUpdate(userId, {
      $addToSet: { pendingConnections: user._id },
    })

    return NextResponse.json({
      success: true,
      message: "Connection request sent",
    })
  } catch (error) {
    console.error("Send connection request error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

