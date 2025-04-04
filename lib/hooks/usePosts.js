"use client"

import { useState } from "react"

export const usePosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Get all posts
  const getPosts = async (page = 1, limit = 10, community = null) => {
    setLoading(true)
    setError(null)

    try {
      let url = `/api/posts?page=${page}&limit=${limit}`
      if (community) {
        url += `&community=${community}`
      }

      const res = await fetch(url)
      const data = await res.json()

      if (data.success) {
        setPosts(data.data)
        return { success: true, data: data.data, pagination: data.pagination }
      } else {
        setError(data.message)
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error("Get posts error:", error)
      setError("Failed to fetch posts")
      return { success: false, message: "Failed to fetch posts" }
    } finally {
      setLoading(false)
    }
  }

  // Create a post
  const createPost = async (postData) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })

      const data = await res.json()

      if (data.success) {
        setPosts([data.data, ...posts])
        return { success: true, post: data.data }
      } else {
        setError(data.message)
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error("Create post error:", error)
      setError("Failed to create post")
      return { success: false, message: "Failed to create post" }
    } finally {
      setLoading(false)
    }
  }

  // Like a post
  const likePost = async (postId) => {
    try {
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: "PUT",
      })

      const data = await res.json()

      if (data.success) {
        // Update the post in the posts array
        setPosts(
          posts.map((post) => {
            if (post._id === postId) {
              return {
                ...post,
                likes: data.data.likes,
                likesCount: data.data.likes.length,
              }
            }
            return post
          }),
        )
        return { success: true, isLiked: data.data.isLiked }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error("Like post error:", error)
      return { success: false, message: "Failed to like post" }
    }
  }

  // Add a comment to a post
  const addComment = async (postId, text) => {
    try {
      const res = await fetch(`/api/posts/${postId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })

      const data = await res.json()

      if (data.success) {
        // Update the post in the posts array
        setPosts(
          posts.map((post) => {
            if (post._id === postId) {
              return {
                ...post,
                comments: [...post.comments, data.data],
                commentsCount: post.commentsCount + 1,
              }
            }
            return post
          }),
        )
        return { success: true, comment: data.data }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error("Add comment error:", error)
      return { success: false, message: "Failed to add comment" }
    }
  }

  // Delete a post
  const deletePost = async (postId) => {
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      })

      const data = await res.json()

      if (data.success) {
        // Remove the post from the posts array
        setPosts(posts.filter((post) => post._id !== postId))
        return { success: true }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error("Delete post error:", error)
      return { success: false, message: "Failed to delete post" }
    }
  }

  // Save a post
  const savePost = async (postId) => {
    try {
      const res = await fetch("/api/saved/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      })

      const data = await res.json()

      if (data.success) {
        return { success: true, isSaved: data.data.isSaved }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error("Save post error:", error)
      return { success: false, message: "Failed to save post" }
    }
  }

  return {
    posts,
    loading,
    error,
    getPosts,
    createPost,
    likePost,
    addComment,
    deletePost,
    savePost,
  }
}

