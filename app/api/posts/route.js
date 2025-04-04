import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"
import Post from "@/models/post"
import { authMiddleware } from "@/middleware/auth"

// Get all posts
export async function GET(request) {
  try {
    // Connect to the database
    await connectToDatabase()

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 10
    const community = searchParams.get("community")
    const author = searchParams.get("author")

    // Build query
    const query = {}
    if (community) query.community = community
    if (author) query.author = author

    // Calculate pagination
    const skip = (page - 1) * limit

    // Get posts with pagination
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "name profileImage")
      .populate("community", "name")
      .lean()

    // Get total count
    const total = await Post.countDocuments(query)

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get posts error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

// Create a new post
export async function POST(request) {
  try {
    // Authenticate user
    const authRequest = await authMiddleware(request)

    if (authRequest instanceof NextResponse) {
      return authRequest // Return error response if authentication failed
    }

    const user = authRequest.user
    const { content, image, community, tags } = await request.json()

    // Connect to the database
    await connectToDatabase()

    // Create post
    const post = await Post.create({
      author: user._id,
      content,
      image,
      community,
      tags,
    })

    // Populate author details
    await post.populate("author", "name profileImage")

    return NextResponse.json(
      {
        success: true,
        data: post,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create post error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

