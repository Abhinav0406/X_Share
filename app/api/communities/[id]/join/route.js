import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"
import Community from "@/models/community"
import User from "@/models/user"
import { authMiddleware } from "@/middleware/auth"

// Join or leave a community
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

    // Find community
    const community = await Community.findById(id)

    if (!community) {
      return NextResponse.json({ success: false, message: "Community not found" }, { status: 404 })
    }

    // Check if the user is already a member
    const isMember = community.members.some((member) => member.toString() === user._id.toString())

    // If already a member, leave; otherwise, join
    if (isMember) {
      // Remove user from members
      community.members = community.members.filter((member) => member.toString() !== user._id.toString())

      // If user is an admin, remove from admins as well
      if (community.admins.some((admin) => admin.toString() === user._id.toString())) {
        community.admins = community.admins.filter((admin) => admin.toString() !== user._id.toString())
      }

      // Remove community from user's communities
      await User.findByIdAndUpdate(user._id, {
        $pull: { communities: community._id },
      })
    } else {
      // Add user to members
      community.members.push(user._id)

      // Add community to user's communities
      await User.findByIdAndUpdate(user._id, {
        $addToSet: { communities: community._id },
      })
    }

    await community.save()

    return NextResponse.json({
      success: true,
      data: {
        isMember: !isMember,
        memberCount: community.members.length,
      },
    })
  } catch (error) {
    console.error("Join/leave community error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

