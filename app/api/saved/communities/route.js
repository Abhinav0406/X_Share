import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"
import User from "@/models/user"
import Community from "@/models/community"
import { authMiddleware } from "@/middleware/auth"

// Get saved communities
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

    // Get user with populated saved communities
    const userData = await User.findById(user._id).populate("savedCommunities")

    return NextResponse.json({
      success: true,
      data: userData.savedCommunities,
    })
  } catch (error) {
    console.error("Get saved communities error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

// Save a community
export async function POST(request) {
  try {
    // Authenticate user
    const authRequest = await authMiddleware(request)

    if (authRequest instanceof NextResponse) {
      return authRequest // Return error response if authentication failed
    }

    const user = authRequest.user
    const { communityId } = await request.json()

    // Connect to the database
    await connectToDatabase()

    // Check if community exists
    const community = await Community.findById(communityId)

    if (!community) {
      return NextResponse.json({ success: false, message: "Community not found" }, { status: 404 })
    }

    // Check if already saved
    const isSaved = user.savedCommunities.includes(communityId)

    // If already saved, remove; otherwise, add
    if (isSaved) {
      await User.findByIdAndUpdate(user._id, {
        $pull: { savedCommunities: communityId },
      })
    } else {
      await User.findByIdAndUpdate(user._id, {
        $addToSet: { savedCommunities: communityId },
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        isSaved: !isSaved,
      },
    })
  } catch (error) {
    console.error("Save community error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

