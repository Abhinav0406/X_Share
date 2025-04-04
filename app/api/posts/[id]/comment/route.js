import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"
import Post from "@/models/post"
import { authMiddleware } from "@/middleware/auth"

// Add a comment to a post
export async function POST(request, { params }) {
  try {
    // Authenticate user
    const authRequest = await authMiddleware(request)

    if (authRequest instanceof NextResponse) {
      return authRequest // Return error response if authentication failed
    }

    const user = authRequest.user
    const { id } = params
    const { text } = await request.json()

    // Connect to the database
    await connectToDatabase()

    // Find post
    const post = await Post.findById(id)

    if (!post) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 })
    }

    // Add comment
    post.comments.push({
      user: user._id,
      text,
    })

    await post.save()

    // Get the newly added comment
    const newComment = post.comments[post.comments.length - 1]

    // Populate user details for the new comment
    await post.populate({
      path: "comments.user",
      select: "name profileImage",
      match: { _id: newComment.user },
    })

    return NextResponse.json(
      {
        success: true,
        data: post.comments[post.comments.length - 1],
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Add comment error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

