import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db"

export async function GET() {
  try {
    // Attempt to connect to the database
    await connectToDatabase()

    return NextResponse.json({
      success: true,
      message: "Successfully connected to MongoDB",
    })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

