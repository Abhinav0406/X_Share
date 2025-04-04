import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"
import Community from "@/models/community"
import { authMiddleware } from "@/middleware/auth"

// Get a single community
export async function GET(request, { params }) {
  try {
    const { id } = params

    // Connect to the database
    await connectToDatabase()

    // Find community
    const community = await Community.findById(id)
      .populate("admins", "name profileImage")
      .populate({
        path: "members",
        select: "name profileImage",
        options: { limit: 10 },
      })

    if (!community) {
      return NextResponse.json({ success: false, message: "Community not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: community,
    })
  } catch (error) {
    console.error("Get community error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

// Update a community
export async function PUT(request, { params }) {
  try {
    // Authenticate user
    const authRequest = await authMiddleware(request)

    if (authRequest instanceof NextResponse) {
      return authRequest // Return error response if authentication failed
    }

    const user = authRequest.user
    const { id } = params
    const { name, description, image, category, guidelines } = await request.json()

    // Connect to the database
    await connectToDatabase()

    // Find community
    let community = await Community.findById(id)

    if (!community) {
      return NextResponse.json({ success: false, message: "Community not found" }, { status: 404 })
    }

    // Check if user is an admin of the community
    if (!community.admins.some((admin) => admin.toString() === user._id.toString())) {
      return NextResponse.json({ success: false, message: "Not authorized to update this community" }, { status: 401 })
    }

    // Update community
    community = await Community.findByIdAndUpdate(
      id,
      { name, description, image, category, guidelines, updatedAt: Date.now() },
      { new: true, runValidators: true },
    )

    return NextResponse.json({
      success: true,
      data: community,
    })
  } catch (error) {
    console.error("Update community error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

// Delete a community
export async function DELETE(request, { params }) {
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

    // Check if user is an admin of the community
    if (!community.admins.some((admin) => admin.toString() === user._id.toString()) && user.role !== "admin") {
      return NextResponse.json({ success: false, message: "Not authorized to delete this community" }, { status: 401 })
    }

    // Delete community
    await community.deleteOne()

    return NextResponse.json({
      success: true,
      data: {},
    })
  } catch (error) {
    console.error("Delete community error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

