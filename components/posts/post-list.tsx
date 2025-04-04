"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { MessageSquare, Heart, Share2, Bookmark } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import CreatePost from "./create-post"

export default function PostList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/posts")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch posts")
      }

      setPosts(data.data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts])
  }

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: "PUT",
      })

      if (!response.ok) {
        throw new Error("Failed to like post")
      }

      // Update the posts state to reflect the like
      setPosts(
        posts.map((post) => {
          if (post._id === postId) {
            const isLiked = post.likes.includes(post.currentUserId)
            return {
              ...post,
              likes: isLiked
                ? post.likes.filter((id) => id !== post.currentUserId)
                : [...post.likes, post.currentUserId],
            }
          }
          return post
        }),
      )
    } catch (error) {
      console.error("Error liking post:", error)
    }
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error: {error}</p>
        <Button onClick={fetchPosts} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div>
      <CreatePost onPostCreated={handlePostCreated} />

      {loading ? (
        Array(3)
          .fill(0)
          .map((_, index) => (
            <Card key={index} className="mb-6">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-8 w-full" />
              </CardFooter>
            </Card>
          ))
      ) : posts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No posts yet. Be the first to share something!</p>
        </div>
      ) : (
        posts.map((post) => (
          <Card key={post._id} className="mb-6">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar>
                <AvatarImage src={post.author?.profileImage || "/avatars/user.jpg"} alt={post.author?.name || "User"} />
                <AvatarFallback>{post.author?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{post.author?.name || "Anonymous"}</h3>
                <p className="text-sm text-gray-500">
                  {post.createdAt ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) : "Just now"}
                </p>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="whitespace-pre-line">{post.content}</p>
              {post.image && (
                <img
                  src={post.image || "/placeholder.svg"}
                  alt="Post attachment"
                  className="mt-3 rounded-md max-h-96 object-cover"
                />
              )}
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => handleLike(post._id)}
                >
                  <Heart
                    className={`h-4 w-4 ${post.likes?.includes(post.currentUserId) ? "fill-red-500 text-red-500" : ""}`}
                  />
                  <span>{post.likes?.length || 0}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.comments?.length || 0}</span>
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="ghost" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  )
}

