"use client"

import { useState } from "react"

export const useConnections = () => {
  const [connections, setConnections] = useState([])
  const [pendingConnections, setPendingConnections] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Get user connections
  const getConnections = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/connections")
      const data = await res.json()

      if (data.success) {
        setConnections(data.data.connections)
        setPendingConnections(data.data.pendingConnections)
        return { success: true, data: data.data }
      } else {
        setError(data.message)
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error("Get connections error:", error)
      setError("Failed to fetch connections")
      return { success: false, message: "Failed to fetch connections" }
    } finally {
      setLoading(false)
    }
  }

  // Send connection request
  const sendConnectionRequest = async (userId) => {
    try {
      const res = await fetch("/api/connections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      })

      const data = await res.json()

      if (data.success) {
        return { success: true, message: data.message }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error("Send connection request error:", error)
      return { success: false, message: "Failed to send connection request" }
    }
  }

  // Accept connection request
  const acceptConnectionRequest = async (userId) => {
    try {
      const res = await fetch(`/api/connections/${userId}/accept`, {
        method: "PUT",
      })

      const data = await res.json()

      if (data.success) {
        // Update connections and pending connections
        const user = pendingConnections.find((conn) => conn._id === userId)
        if (user) {
          setConnections([...connections, user])
          setPendingConnections(pendingConnections.filter((conn) => conn._id !== userId))
        }
        return { success: true, message: data.message }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error("Accept connection request error:", error)
      return { success: false, message: "Failed to accept connection request" }
    }
  }

  // Decline connection request
  const declineConnectionRequest = async (userId) => {
    try {
      const res = await fetch(`/api/connections/${userId}/decline`, {
        method: "PUT",
      })

      const data = await res.json()

      if (data.success) {
        // Update pending connections
        setPendingConnections(pendingConnections.filter((conn) => conn._id !== userId))
        return { success: true, message: data.message }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error("Decline connection request error:", error)
      return { success: false, message: "Failed to decline connection request" }
    }
  }

  // Remove connection
  const removeConnection = async (userId) => {
    try {
      const res = await fetch(`/api/connections/${userId}/remove`, {
        method: "PUT",
      })

      const data = await res.json()

      if (data.success) {
        // Update connections
        setConnections(connections.filter((conn) => conn._id !== userId))
        return { success: true, message: data.message }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error("Remove connection error:", error)
      return { success: false, message: "Failed to remove connection" }
    }
  }

  return {
    connections,
    pendingConnections,
    loading,
    error,
    getConnections,
    sendConnectionRequest,
    acceptConnectionRequest,
    declineConnectionRequest,
    removeConnection,
  }
}

