"use client"

import { useState } from "react"

export const useCommunities = () => {
  const [communities, setCommunities] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Get all communities
  const getCommunities = async (page = 1, limit = 10, category = null, search = null) => {
    setLoading(true)
    setError(null)

    try {
      let url = `/api/communities?page=${page}&limit=${limit}`
      if (category) {
        url += `&category=${category}`
      }
      if (search) {
        url += `&search=${search}`
      }

      const res = await fetch(url)
      const data = await res.json()

      if (data.success) {
        setCommunities(data.data)
        return { success: true, data: data.data, pagination: data.pagination }
      } else {
        setError(data.message)
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error("Get communities error:", error)
      setError("Failed to fetch communities")
      return { success: false, message: "Failed to fetch communities" }
    } finally {
      setLoading(false)
    }
  }

  // Get a single community
  const getCommunity = async (id) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/communities/${id}`)
      const data = await res.json()

      if (data.success) {
        return { success: true, data: data.data }
      } else {
        setError(data.message)
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error("Get community error:", error)
      setError("Failed to fetch community")
      return { success: false, message: "Failed to fetch community" }
    } finally {
      setLoading(false)
    }
  }

  // Create a community
  const createCommunity = async (communityData) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/communities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(communityData),
      })

      const data = await res.json()

      if (data.success) {
        setCommunities([data.data, ...communities])
        return { success: true, community: data.data }
      } else {
        setError(data.message)
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error("Create community error:", error)
      setError("Failed to create community")
      return { success: false, message: "Failed to create community" }
    } finally {
      setLoading(false)
    }
  }

  // Join or leave a community
  const joinCommunity = async (id) => {
    try {
      const res = await fetch(`/api/communities/${id}/join`, {
        method: "PUT",
      })

      const data = await res.json()

      if (data.success) {
        // Update the community in the communities array
        setCommunities(
          communities.map((community) => {
            if (community._id === id) {
              return {
                ...community,
                memberCount: data.data.memberCount,
                isMember: data.data.isMember,
              }
            }
            return community
          }),
        )
        return { success: true, isMember: data.data.isMember }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error("Join community error:", error)
      return { success: false, message: "Failed to join community" }
    }
  }

  // Save a community
  const saveCommunity = async (communityId) => {
    try {
      const res = await fetch("/api/saved/communities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ communityId }),
      })

      const data = await res.json()

      if (data.success) {
        return { success: true, isSaved: data.data.isSaved }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error("Save community error:", error)
      return { success: false, message: "Failed to save community" }
    }
  }

  return {
    communities,
    loading,
    error,
    getCommunities,
    getCommunity,
    createCommunity,
    joinCommunity,
    saveCommunity,
  }
}

