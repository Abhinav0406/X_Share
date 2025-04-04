import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"
import Community from "@/models/community"
import { authMiddleware } from "@/middleware/auth"

// Get all communities
export async function GET(request) {
  try {
    // Connect to the database
    await connectToDatabase()

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 10
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    // Build query
    const query = {}
    if (category && category !== "All") query.category = category
    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
    }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Get communities with pagination
    const communities = await Community.find(query).sort({ memberCount: -1 }).skip(skip).limit(limit).lean()

    // Get total count
    const total = await Community.countDocuments(query)

    return NextResponse.json({
      success: true,
      data: communities,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get communities error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

// Create a new community
export async function POST(request) {
  try {
    // Authenticate user
    const authRequest = await authMiddleware(request)

    if (authRequest instanceof NextResponse) {
      return authRequest // Return error response if authentication failed
    }

    const user = authRequest.user
    const { name, description, image, category, guidelines } = await request.json()

    // Connect to the database
    await connectToDatabase()

    // Create community
    const community = await Community.create({
      name,
      description,
      image,
      category,
      guidelines,
      members: [user._id],
      admins: [user._id],
    })

    return NextResponse.json(
      {
        success: true,
        data: community,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create community error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

