import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"
import User from "@/models/user"
import Post from "@/models/post"
import { authMiddleware } from "@/middleware/auth"

// Get saved posts
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

    // Get user with populated saved posts
    const userData = await User.findById(user._id).populate({
      path: "savedPosts",
      populate: {
        path: "author",
        select: "name profileImage",
      },
    })

    return NextResponse.json({
      success: true,
      data: userData.savedPosts,
    })
  } catch (error) {
    console.error("Get saved posts error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

// Save a post
export async function POST(request) {
  try {
    // Authenticate user
    const authRequest = await authMiddleware(request)

    if (authRequest instanceof NextResponse) {
      return authRequest // Return error response if authentication failed
    }

    const user = authRequest.user
    const { postId } = await request.json()

    // Connect to the database
    await connectToDatabase()

    // Check if post exists
    const post = await Post.findById(postId)

    if (!post) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 })
    }

    // Check if already saved
    const isSaved = user.savedPosts.includes(postId)

    // If already saved, remove; otherwise, add
    if (isSaved) {
      await User.findByIdAndUpdate(user._id, {
        $pull: { savedPosts: postId },
      })
    } else {
      await User.findByIdAndUpdate(user._id, {
        $addToSet: { savedPosts: postId },
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        isSaved: !isSaved,
      },
    })
  } catch (error) {
    console.error("Save post error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

