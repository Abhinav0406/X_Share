import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"
import Post from "@/models/post"
import { authMiddleware } from "@/middleware/auth"

// Like or unlike a post
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

    // Find post
    const post = await Post.findById(id)

    if (!post) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 })
    }

    // Check if the post has already been liked by the user
    const isLiked = post.likes.some((like) => like.toString() === user._id.toString())

    // If already liked, remove like; otherwise, add like
    if (isLiked) {
      post.likes = post.likes.filter((like) => like.toString() !== user._id.toString())
    } else {
      post.likes.push(user._id)
    }

    await post.save()

    return NextResponse.json({
      success: true,
      data: {
        likes: post.likes,
        isLiked: !isLiked,
      },
    })
  } catch (error) {
    console.error("Like post error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

