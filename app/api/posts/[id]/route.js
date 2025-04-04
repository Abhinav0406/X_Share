import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"
import Post from "@/models/post"
import { authMiddleware } from "@/middleware/auth"

// Get a single post
export async function GET(request, { params }) {
  try {
    const { id } = params

    // Connect to the database
    await connectToDatabase()

    // Find post
    const post = await Post.findById(id)
      .populate("author", "name profileImage")
      .populate("community", "name")
      .populate({
        path: "comments.user",
        select: "name profileImage",
      })

    if (!post) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: post,
    })
  } catch (error) {
    console.error("Get post error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

// Update a post
export async function PUT(request, { params }) {
  try {
    // Authenticate user
    const authRequest = await authMiddleware(request)

    if (authRequest instanceof NextResponse) {
      return authRequest // Return error response if authentication failed
    }

    const user = authRequest.user
    const { id } = params
    const { content, image, tags } = await request.json()

    // Connect to the database
    await connectToDatabase()

    // Find post
    let post = await Post.findById(id)

    if (!post) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 })
    }

    // Check if user is the author of the post
    if (post.author.toString() !== user._id.toString()) {
      return NextResponse.json({ success: false, message: "Not authorized to update this post" }, { status: 401 })
    }

    // Update post
    post = await Post.findByIdAndUpdate(
      id,
      { content, image, tags, updatedAt: Date.now() },
      { new: true, runValidators: true },
    ).populate("author", "name profileImage")

    return NextResponse.json({
      success: true,
      data: post,
    })
  } catch (error) {
    console.error("Update post error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

// Delete a post
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

    // Find post
    const post = await Post.findById(id)

    if (!post) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 })
    }

    // Check if user is the author of the post or an admin
    if (post.author.toString() !== user._id.toString() && user.role !== "admin") {
      return NextResponse.json({ success: false, message: "Not authorized to delete this post" }, { status: 401 })
    }

    // Delete post
    await post.deleteOne()

    return NextResponse.json({
      success: true,
      data: {},
    })
  } catch (error) {
    console.error("Delete post error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

