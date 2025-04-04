import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"
import User from "@/models/user"

// Protect routes
export async function authMiddleware(request) {
  let token

  // Get token from the Authorization header
  if (
    request.headers &&
    request.headers.get("Authorization") &&
    request.headers.get("Authorization").startsWith("Bearer")
  ) {
    token = request.headers.get("Authorization").split(" ")[1]
  }
  // Get token from cookies as fallback
  else if (request.cookies && request.cookies.get("token")) {
    token = request.cookies.get("token").value
  }

  // Check if token exists
  if (!token) {
    return NextResponse.json({ success: false, message: "Not authorized to access this route" }, { status: 401 })
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret")

    // Connect to the database
    await connectToDatabase()

    // Get user from the database
    const user = await User.findById(decoded.id)

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Add user to request
    request.user = user

    return request
  } catch (error) {
    return NextResponse.json({ success: false, message: "Not authorized to access this route" }, { status: 401 })
  }
}

