import { NextResponse } from "next/server"

export async function GET() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" }, { status: 200 })

  // Clear the token cookie
  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  })

  return response
}

