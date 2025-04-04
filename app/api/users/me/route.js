import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"
import User from "@/models/user"
import { authMiddleware } from "@/middleware/auth"

export async function GET(request) {
  try {
    // Authenticate user
    const authRequest = await authMiddleware(request)

    if (authRequest instanceof NextResponse) {
      return authRequest // Return error response if authentication failed
    }

    const user = authRequest.user

    // Return user data
    return NextResponse.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        nationality: user.nationality,
        gender: user.gender,
        industry: user.industry,
        experience: user.experience,
        bio: user.bio,
        profileImage: user.profileImage,
        location: user.location,
        skills: user.skills,
        socialProfiles: user.socialProfiles,
        education: user.education,
        career: user.career,
        connections: user.connections,
        communities: user.communities,
      },
    })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    // Authenticate user
    const authRequest = await authMiddleware(request)

    if (authRequest instanceof NextResponse) {
      return authRequest // Return error response if authentication failed
    }

    const user = authRequest.user
    const updateData = await request.json()

    // Fields that are not allowed to be updated
    const restrictedFields = ["password", "email", "role"]

    // Remove restricted fields from update data
    restrictedFields.forEach((field) => {
      if (updateData[field]) {
        delete updateData[field]
      }
    })

    // Connect to the database
    await connectToDatabase()

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { ...updateData, updatedAt: Date.now() },
      { new: true, runValidators: true },
    )

    return NextResponse.json({
      success: true,
      data: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        nationality: updatedUser.nationality,
        gender: updatedUser.gender,
        industry: updatedUser.industry,
        experience: updatedUser.experience,
        bio: updatedUser.bio,
        profileImage: updatedUser.profileImage,
        location: updatedUser.location,
        skills: updatedUser.skills,
        socialProfiles: updatedUser.socialProfiles,
        education: updatedUser.education,
        career: updatedUser.career,
      },
    })
  } catch (error) {
    console.error("Update user error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

