"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bookmark,
  FileImage,
  Link2,
  MessageCircle,
  MoreHorizontal,
  PlusCircle,
  Send,
  Share2,
  ThumbsUp,
  Users,
} from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import Image from "next/image"
import Link from "next/link"

// Add imports for the new components
import ImageUploadModal from "@/app/components/image-upload-modal"
import LinkAttachmentModal from "@/app/components/link-attachment-modal"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [postContent, setPostContent] = useState("")
  const [showCommentInput, setShowCommentInput] = useState<number | null>(null)
  const [commentText, setCommentText] = useState("")
  const [connections, setConnections] = useState<number[]>([])
  // Add state for posts and trending topics courses
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: "Alex Johnson",
        avatar: "/avatars/alex.jpg",
        role: "UX Designer",
        company: "Design Co.",
        profileUrl: "/profile/alex-johnson",
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
        profileUrl: "/profile/sarah-williams",
      },
      content: "Looking for collaborators on an open-source project focused on accessibility tools. Anyone interested?",
      likes: 18,
      comments: 12,
      shares: 5,
      time: "5 hours ago",
    },
    {
      id: 3,
      author: {
        name: "Michael Chen",
        avatar: "/avatars/michael.jpg",
        role: "Product Manager",
        company: "Innovate Inc.",
        profileUrl: "/profile/michael-chen",
      },
      content:
        "Just published an article on product-led growth strategies that worked for our startup. Check it out and let me know your thoughts!",
      image: "/post-images/article.jpg",
      likes: 42,
      comments: 15,
      shares: 20,
      time: "1 day ago",
    },
  ])

  const [showTopicCourses, setShowTopicCourses] = useState<string | null>(null)
  const [topicCourses, setTopicCourses] = useState<any[]>([])

  const communities = [
    { id: 1, name: "UX/UI Designers", members: 1250 },
    { id: 2, name: "Tech Entrepreneurs", members: 3420 },
    { id: 3, name: "Web Developers", members: 5680 },
  ]

  // Add state for modals
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)

  // Update the handleCreatePost function to properly handle post creation
  const handleCreatePost = () => {
    if (postContent.trim()) {
      // In a real app, you would submit the post to your backend here
      const newPost = {
        id: posts.length + 1,
        author: {
          name: "VASANT JEVENGEKAR",
          avatar: "/avatars/vasant.jpg",
          role: "Product Designer",
          company: "Design Innovation Labs",
          profileUrl: "/profile/vasant-jevengekar",
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

      // Show success message
      alert("Post created successfully!")
    }
  }

  // Update the handlePostComment function to properly handle comments
  const handlePostComment = (postId: number) => {
    if (commentText.trim()) {
      // In a real app, you would submit the comment to your backend here
      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments + 1,
          }
        }
        return post
      })

      setPosts(updatedPosts)
      setCommentText("")
      setShowCommentInput(null)

      // Show success message
      alert("Comment posted successfully!")
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

  // Update the handleImageUpload function to open the modal
  const handleImageUpload = () => {
    setIsImageModalOpen(true)
  }

  // Add function to handle image selection from modal
  const handleImageSelect = (imageUrl: string) => {
    setPostContent((prevContent) => prevContent + `\n\n[Image: ${imageUrl}]`)
    alert("Image added to your post!")
  }

  // Update the handleLinkAttachment function to open the modal
  const handleLinkAttachment = () => {
    setIsLinkModalOpen(true)
  }

  // Add function to handle link attachment from modal
  const handleLinkAttach = (url: string, title?: string) => {
    const linkText = title ? `[${title}](${url})` : url
    setPostContent((prevContent) => prevContent + `\n\n${linkText}`)
    alert("Link added to your post!")
  }

  // Add function to handle community navigation
  const handleCommunityView = (communityId: number) => {
    window.location.href = `/community/${communityId}`
  }

  const handleConnect = (personId: number) => {
    setConnections((prevConnections) => {
      if (prevConnections.includes(personId)) {
        // Already connected, so disconnect
        return prevConnections.filter((id) => id !== personId)
      } else {
        // Not connected, so connect
        return [...prevConnections, personId]
      }
    })
  }

  // Add function to handle trending topic clicks
  const handleTopicClick = (topic: string) => {
    setShowTopicCourses(topic)

    // Simulate fetching courses for the selected topic
    const coursesByTopic = {
      ProductDesign: [
        {
          title: "UI/UX Fundamentals",
          instructor: "Emma Wilson",
          duration: "8 weeks",
          url: "/courses/uiux-fundamentals",
        },
        {
          title: "Design Systems Masterclass",
          instructor: "Alex Johnson",
          duration: "6 weeks",
          url: "/courses/design-systems",
        },
        {
          title: "User Research Methods",
          instructor: "Sarah Williams",
          duration: "4 weeks",
          url: "/courses/user-research",
        },
      ],
      AIInnovation: [
        { title: "AI for Designers", instructor: "Michael Chen", duration: "10 weeks", url: "/courses/ai-design" },
        { title: "Machine Learning Basics", instructor: "David Kim", duration: "12 weeks", url: "/courses/ml-basics" },
        { title: "Ethical AI Design", instructor: "Priya Sharma", duration: "6 weeks", url: "/courses/ethical-ai" },
      ],
      StartupGrowth: [
        {
          title: "Startup Marketing Strategies",
          instructor: "James Wilson",
          duration: "8 weeks",
          url: "/courses/startup-marketing",
        },
        {
          title: "Product-Led Growth",
          instructor: "Michael Chen",
          duration: "6 weeks",
          url: "/courses/product-led-growth",
        },
        {
          title: "Fundraising for Startups",
          instructor: "Priya Sharma",
          duration: "4 weeks",
          url: "/courses/fundraising",
        },
      ],
      RemoteWork: [
        { title: "Managing Remote Teams", instructor: "Lisa Chen", duration: "6 weeks", url: "/courses/remote-teams" },
        {
          title: "Remote Collaboration Tools",
          instructor: "David Kim",
          duration: "4 weeks",
          url: "/courses/remote-tools",
        },
        {
          title: "Building Remote Culture",
          instructor: "Emma Wilson",
          duration: "8 weeks",
          url: "/courses/remote-culture",
        },
      ],
      TechTrends: [
        {
          title: "Emerging Technologies 2023",
          instructor: "Robert Taylor",
          duration: "10 weeks",
          url: "/courses/emerging-tech",
        },
        {
          title: "Blockchain Fundamentals",
          instructor: "Michael Chen",
          duration: "8 weeks",
          url: "/courses/blockchain",
        },
        { title: "Web3 Development", instructor: "David Kim", duration: "12 weeks", url: "/courses/web3" },
      ],
    }

    setTopicCourses(coursesByTopic[topic as keyof typeof coursesByTopic] || [])
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        {/* Update the community page layout for better mobile responsiveness */}
        <main className="flex-1 container py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Create Post Card */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/avatars/vasant.jpg" alt="Your profile" />
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
                              Share your ideas, questions, or insights with the community
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
                              <Button variant="outline" size="sm" className="gap-1" onClick={handleImageUpload}>
                                <FileImage className="h-4 w-4" />
                                Image
                              </Button>
                              <Button variant="outline" size="sm" className="gap-1" onClick={handleLinkAttachment}>
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
                      Tag
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              {/* Posts Feed */}
              <div className="space-y-1">
                <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="w-full justify-start overflow-x-auto">
                    <TabsTrigger value="all">All Posts</TabsTrigger>
                    <TabsTrigger value="following">Following</TabsTrigger>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-6">
                {posts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <Link href={post.author.profileUrl} className="flex items-center gap-3">
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
                        </Link>
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
                            src={post.image || "/placeholder.svg?height=300&width=600"}
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
                        <Button variant="ghost" size="sm" className="gap-1" onClick={() => handleLikePost(post.id)}>
                          <ThumbsUp className="h-4 w-4" />
                          <span className="hidden sm:inline">Like</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1"
                          onClick={() => setShowCommentInput(post.id)}
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span className="hidden sm:inline">Comment</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1" onClick={() => handleSharePost(post.id)}>
                          <Share2 className="h-4 w-4" />
                          <span className="hidden sm:inline">Share</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1" onClick={() => handleSavePost(post.id)}>
                          <Bookmark className="h-4 w-4" />
                          <span className="hidden sm:inline">Save</span>
                        </Button>
                      </div>
                      {showCommentInput === post.id && (
                        <div className="flex items-center gap-2 w-full mt-3 pt-3 border-t">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/avatars/vasant.jpg" alt="Your profile" />
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

            <div className="space-y-6 order-first md:order-last">
              {/* Communities Section */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">My Communities</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {communities.map((community) => (
                      <div key={community.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{community.name}</div>
                          <div className="text-xs text-muted-foreground">{community.members} members</div>
                        </div>
                        <Link href={`/community/${community.id}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                      </div>
                    ))}
                    <Link href="/join-community">
                      <Button variant="outline" className="w-full gap-1">
                        <PlusCircle className="h-4 w-4" />
                        Join New Community
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Suggested Connections */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">People You May Know</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/avatars/emma.jpg" alt="Emma Wilson" />
                        <AvatarFallback>EW</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">Emma Wilson</div>
                        <div className="text-xs text-muted-foreground">Product Designer at Creative Labs</div>
                      </div>
                      <Button size="sm" onClick={() => handleConnect(1)}>
                        {connections.includes(1) ? "Connected" : "Connect"}
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/avatars/david.jpg" alt="David Kim" />
                        <AvatarFallback>DK</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">David Kim</div>
                        <div className="text-xs text-muted-foreground">Frontend Developer at TechCorp</div>
                      </div>
                      <Button size="sm" onClick={() => handleConnect(2)}>
                        {connections.includes(2) ? "Connected" : "Connect"}
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/avatars/priya.jpg" alt="Priya Sharma" />
                        <AvatarFallback>PS</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">Priya Sharma</div>
                        <div className="text-xs text-muted-foreground">Startup Founder at InnovateTech</div>
                      </div>
                      <Button size="sm" onClick={() => handleConnect(3)}>
                        {connections.includes(3) ? "Connected" : "Connect"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trending Topics */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Trending Topics</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div
                      className="text-sm font-medium hover:underline cursor-pointer"
                      onClick={() => handleTopicClick("ProductDesign")}
                    >
                      #ProductDesign
                    </div>
                    <div
                      className="text-sm font-medium hover:underline cursor-pointer"
                      onClick={() => handleTopicClick("AIInnovation")}
                    >
                      #AIInnovation
                    </div>
                    <div
                      className="text-sm font-medium hover:underline cursor-pointer"
                      onClick={() => handleTopicClick("StartupGrowth")}
                    >
                      #StartupGrowth
                    </div>
                    <div
                      className="text-sm font-medium hover:underline cursor-pointer"
                      onClick={() => handleTopicClick("RemoteWork")}
                    >
                      #RemoteWork
                    </div>
                    <div
                      className="text-sm font-medium hover:underline cursor-pointer"
                      onClick={() => handleTopicClick("TechTrends")}
                    >
                      #TechTrends
                    </div>
                  </div>

                  {showTopicCourses && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium mb-2">Courses on #{showTopicCourses}</h4>
                      <div className="space-y-3">
                        {topicCourses.map((course, index) => (
                          <div key={index} className="bg-muted p-3 rounded-md">
                            <div className="font-medium">{course.title}</div>
                            <div className="text-xs text-muted-foreground">
                              Instructor: {course.instructor} • Duration: {course.duration}
                            </div>
                            <Link href={course.url}>
                              <Button size="sm" variant="outline" className="mt-2 w-full">
                                Enroll Now
                              </Button>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        {/* Add the modals */}
        <ImageUploadModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          onImageSelect={handleImageSelect}
        />

        <LinkAttachmentModal
          isOpen={isLinkModalOpen}
          onClose={() => setIsLinkModalOpen(false)}
          onLinkAttach={handleLinkAttach}
        />
      </div>
    </div>
  )
}

