"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Bookmark, FileImage, Link2, MessageCircle, MoreHorizontal, Send, Share2, ThumbsUp, Users } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import Image from "next/image"

export default function CommunityDetailPage() {
  const params = useParams()
  const communityId = Number(params.id)

  const [activeTab, setActiveTab] = useState("posts")
  const [postContent, setPostContent] = useState("")
  const [showCommentInput, setShowCommentInput] = useState<number | null>(null)
  const [commentText, setCommentText] = useState("")
  const [isMember, setIsMember] = useState(true)
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: "Alex Johnson",
        avatar: "/avatars/alex.jpg",
        role: "UX Designer",
        company: "Design Co.",
      },
      content: "Just finished a new design system for a fintech client. Would love some feedback from the community!",
      image: "/post-images/design-system.jpg",
      likes: 24,
      comments: 8,
      shares: 3,
      time: "2 hours ago",
    },
    {
      id: 2,
      author: {
        name: "Sarah Williams",
        avatar: "/avatars/sarah.jpg",
        role: "Software Engineer",
        company: "Tech Solutions",
      },
      content: "Looking for collaborators on an open-source project focused on accessibility tools. Anyone interested?",
      likes: 18,
      comments: 12,
      shares: 5,
      time: "5 hours ago",
    },
  ])

  const communities = [
    {
      id: 1,
      name: "UX/UI Designers",
      members: 1250,
      description: "A community for UX/UI designers to share work, get feedback, and discuss design trends.",
      image: "/community-images/ux-ui.jpg",
      category: "Design",
    },
    {
      id: 2,
      name: "Tech Entrepreneurs",
      members: 3420,
      description: "Connect with fellow entrepreneurs to share experiences and grow your business.",
      image: "/community-images/entrepreneurs.jpg",
      category: "Business",
    },
    {
      id: 3,
      name: "Web Developers",
      members: 5680,
      description: "A space for web developers to discuss technologies, share code, and solve problems.",
      image: "/community-images/developers.jpg",
      category: "Development",
    },
  ]

  const community = communities.find((c) => c.id === communityId) || communities[0]

  const members = [
    {
      name: "Alex Johnson",
      role: "UX Designer at Design Co.",
      avatar: "/avatars/alex.jpg",
      isAdmin: true,
    },
    {
      name: "Sarah Williams",
      role: "Software Engineer at Tech Solutions",
      avatar: "/avatars/sarah.jpg",
      isAdmin: false,
    },
    {
      name: "Michael Chen",
      role: "Product Manager at Innovate Inc.",
      avatar: "/avatars/michael.jpg",
      isAdmin: false,
    },
    {
      name: "Emma Wilson",
      role: "Product Designer at Creative Labs",
      avatar: "/avatars/emma.jpg",
      isAdmin: false,
    },
  ]

  const handleCreatePost = () => {
    if (postContent.trim()) {
      // Create a new post object
      const newPost = {
        id: posts.length + 1,
        author: {
          name: "VASANT JEVENGEKAR",
          avatar: "/avatars/vasant.jpg",
          role: "Product Designer",
          company: "Design Innovation Labs",
        },
        content: postContent,
        likes: 0,
        comments: 0,
        shares: 0,
        time: "Just now",
      }

      // Add the new post to the posts array
      setPosts([newPost, ...posts])
      setPostContent("")

      // Close the dialog
      document.querySelector('[data-state="open"]')?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))

      alert("Post created successfully in the " + community.name + " community!")
    }
  }

  // Add functions to handle post interactions
  const handleLikePost = (postId: number) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.likes + 1,
        }
      }
      return post
    })

    setPosts(updatedPosts)
    alert("Post liked!")
  }

  const handleSharePost = (postId: number) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          shares: post.shares + 1,
        }
      }
      return post
    })

    setPosts(updatedPosts)
    alert("Post shared to your timeline!")
  }

  const handleSavePost = (postId: number) => {
    alert("Post saved to your bookmarks!")
  }

  // Add function to handle image upload
  const handleImageUpload = () => {
    // In a real app, this would open a file picker
    alert("Image upload feature activated!")
    // For demo purposes, we'll just add a predefined image
    setPostContent((prevContent) => prevContent + "\n\n[Image: " + community.name + " Collaboration Session]")
  }

  // Add function to handle link attachment
  const handleLinkAttachment = () => {
    const url = prompt("Enter the URL you want to share:")
    if (url) {
      setPostContent((prevContent) => prevContent + `\n\n${url}`)
      alert("Link added to your post!")
    }
  }

  const handlePostComment = (postId: number) => {
    if (commentText.trim()) {
      alert("Comment posted successfully!")
      setCommentText("")
      setShowCommentInput(null)
    }
  }

  const handleJoinLeave = () => {
    setIsMember(!isMember)
    if (!isMember) {
      alert(`You've joined the ${community.name} community!`)
    } else {
      alert(`You've left the ${community.name} community.`)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1">
          <div className="relative h-48 w-full overflow-hidden">
            <Image src={community.image || "/placeholder.svg"} alt={community.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 container">
              <div className="flex items-end justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white">{community.name}</h1>
                  <p className="text-white/80">{community.members} members</p>
                </div>
                <Button
                  variant={isMember ? "outline" : "default"}
                  className={isMember ? "bg-white hover:bg-white/90" : ""}
                  onClick={handleJoinLeave}
                >
                  {isMember ? "Leave Community" : "Join Community"}
                </Button>
              </div>
            </div>
          </div>

          <div className="container py-6">
            <Tabs defaultValue="posts" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start">
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
              </TabsList>

              <div className="mt-6">
                {activeTab === "posts" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                      {/* Create Post Card */}
                      {isMember && (
                        <Card>
                          <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src="/avatars/user.jpg" alt="Your profile" />
                                <AvatarFallback>VJ</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-full justify-start text-muted-foreground h-auto py-2 px-4"
                                    >
                                      Share your thoughts or ask a question...
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[525px]">
                                    <DialogHeader>
                                      <DialogTitle>Create Post</DialogTitle>
                                      <DialogDescription>
                                        Share your ideas, questions, or insights with the {community.name} community
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                      <Textarea
                                        placeholder="What's on your mind?"
                                        className="min-h-[120px]"
                                        value={postContent}
                                        onChange={(e) => setPostContent(e.target.value)}
                                      />
                                      <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="sm" className="gap-1" onClick={handleImageUpload}>
                                          <FileImage className="h-4 w-4" />
                                          Image
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="gap-1"
                                          onClick={handleLinkAttachment}
                                        >
                                          <Link2 className="h-4 w-4" />
                                          Link
                                        </Button>
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button onClick={handleCreatePost}>Post</Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          </CardHeader>
                          <CardFooter className="border-t pt-3">
                            <div className="flex justify-between w-full">
                              <Button variant="ghost" size="sm" className="gap-1" onClick={handleImageUpload}>
                                <FileImage className="h-4 w-4" />
                                Image
                              </Button>
                              <Button variant="ghost" size="sm" className="gap-1" onClick={handleLinkAttachment}>
                                <Link2 className="h-4 w-4" />
                                Link
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="gap-1"
                                onClick={() => {
                                  const taggedPerson = prompt("Enter the name of the person you want to tag:")
                                  if (taggedPerson) {
                                    setPostContent((prevContent) => prevContent + ` @${taggedPerson}`)
                                    alert(`You've tagged ${taggedPerson} in your post.`)
                                  }
                                }}
                              >
                                <Users className="h-4 w-4" />
                                Tag People
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      )}

                      {/* Posts Feed */}
                      <div className="space-y-6">
                        {posts.map((post) => (
                          <Card key={post.id} className="overflow-hidden">
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-semibold">{post.author.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {post.author.role} at {post.author.company} • {post.time}
                                    </div>
                                  </div>
                                </div>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="pb-3">
                              <p className="mb-3">{post.content}</p>
                              {post.image && (
                                <div className="relative h-[300px] w-full overflow-hidden rounded-md">
                                  <Image
                                    src={post.image || "/placeholder.svg"}
                                    alt="Post image"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                            </CardContent>
                            <CardFooter className="flex flex-col border-t pt-3">
                              <div className="flex justify-between w-full mb-3">
                                <div className="text-sm text-muted-foreground">
                                  {post.likes} likes • {post.comments} comments • {post.shares} shares
                                </div>
                              </div>
                              <div className="flex justify-between w-full border-t pt-3">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="gap-1"
                                  onClick={() => handleLikePost(post.id)}
                                >
                                  <ThumbsUp className="h-4 w-4" />
                                  Like
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="gap-1"
                                  onClick={() => setShowCommentInput(post.id)}
                                >
                                  <MessageCircle className="h-4 w-4" />
                                  Comment
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="gap-1"
                                  onClick={() => handleSharePost(post.id)}
                                >
                                  <Share2 className="h-4 w-4" />
                                  Share
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="gap-1"
                                  onClick={() => handleSavePost(post.id)}
                                >
                                  <Bookmark className="h-4 w-4" />
                                  Save
                                </Button>
                              </div>
                              {showCommentInput === post.id && (
                                <div className="flex items-center gap-2 w-full mt-3 pt-3 border-t">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src="/avatars/user.jpg" alt="Your profile" />
                                    <AvatarFallback>VJ</AvatarFallback>
                                  </Avatar>
                                  <Input
                                    placeholder="Write a comment..."
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    className="flex-1"
                                  />
                                  <Button size="icon" variant="ghost" onClick={() => handlePostComment(post.id)}>
                                    <Send className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <h3 className="text-lg font-semibold">About This Community</h3>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">{community.description}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{community.members} members</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <h3 className="text-lg font-semibold">Community Admins</h3>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {members
                              .filter((m) => m.isAdmin)
                              .map((admin, index) => (
                                <div key={index} className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage src={admin.avatar} alt={admin.name} />
                                    <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{admin.name}</div>
                                    <div className="text-xs text-muted-foreground">{admin.role}</div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {activeTab === "about" && (
                  <div className="max-w-3xl mx-auto">
                    <Card>
                      <CardHeader>
                        <h2 className="text-2xl font-bold">About {community.name}</h2>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h3 className="font-semibold mb-2">Description</h3>
                          <p className="text-muted-foreground">{community.description}</p>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-2">Community Guidelines</h3>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>Be respectful and considerate of others</li>
                            <li>Share knowledge and help others learn</li>
                            <li>No self-promotion or spam</li>
                            <li>Keep discussions relevant to the community topic</li>
                            <li>Respect intellectual property and give credit where it's due</li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-2">Join This Community</h3>
                          <p className="text-muted-foreground mb-4">
                            Connect with {community.members} members who share your interests
                          </p>
                          <Button onClick={handleJoinLeave}>{isMember ? "Leave Community" : "Join Community"}</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "members" && (
                  <div className="max-w-3xl mx-auto">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <h2 className="text-xl font-bold">Members ({members.length})</h2>
                        <Input placeholder="Search members..." className="max-w-xs" />
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {members.map((member, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={member.avatar} alt={member.name} />
                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium flex items-center gap-2">
                                    {member.name}
                                    {member.isAdmin && (
                                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                        Admin
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs text-muted-foreground">{member.role}</div>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                View Profile
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

