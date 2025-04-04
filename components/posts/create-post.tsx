"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageIcon, Link2Icon, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Post content cannot be empty",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          image: image || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to create post")
      }

      toast({
        title: "Success",
        description: "Post created successfully",
      })

      setContent("")
      setImage("")

      if (onPostCreated) {
        onPostCreated(data.data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mb-6">
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="/avatars/user.jpg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Share your thoughts..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              {image && (
                <div className="mt-2 relative">
                  <img
                    src={image || "/placeholder.svg"}
                    alt="Post attachment"
                    className="max-h-40 rounded-md object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 h-6 w-6"
                    onClick={() => setImage("")}
                  >
                    ×
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => document.getElementById("image-upload").click()}
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Image
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) {
                    // In a real app, you'd upload this to a storage service
                    // For now, we'll just create a local URL
                    const url = URL.createObjectURL(file)
                    setImage(url)
                  }
                }}
              />
            </Button>
            <Button type="button" variant="ghost" size="sm">
              <Link2Icon className="h-4 w-4 mr-2" />
              Link
            </Button>
          </div>
          <Button type="submit" disabled={loading || !content.trim()}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting...
              </>
            ) : (
              "Post"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

