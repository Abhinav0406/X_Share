"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bookmark, Search, Filter, FileText, Users, Lightbulb, MoreHorizontal, ExternalLink } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import Image from "next/image"

export default function SavedPage() {
  const savedPosts = [
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
      time: "2 days ago",
      savedAt: "Yesterday",
    },
    {
      id: 2,
      author: {
        name: "Michael Chen",
        avatar: "/avatars/michael.jpg",
        role: "Product Manager",
        company: "Innovate Inc.",
      },
      content:
        "Just published an article on product-led growth strategies that worked for our startup. Check it out and let me know your thoughts!",
      image: "/post-images/article.jpg",
      likes: 42,
      comments: 15,
      shares: 20,
      time: "1 week ago",
      savedAt: "3 days ago",
    },
  ]

  const savedArticles = [
    {
      id: 1,
      title: "10 UX Principles Every Designer Should Know",
      source: "UX Magazine",
      image: "/article-images/ux-principles.jpg",
      excerpt:
        "A comprehensive guide to the fundamental principles of user experience design that can transform your digital products.",
      url: "https://example.com/ux-principles",
      savedAt: "2 days ago",
    },
    {
      id: 2,
      title: "The Future of Remote Work: Trends and Predictions",
      source: "Work Insights Blog",
      image: "/article-images/remote-work.jpg",
      excerpt: "Exploring how remote work is evolving and what organizations can expect in the coming years.",
      url: "https://example.com/remote-work-future",
      savedAt: "1 week ago",
    },
    {
      id: 3,
      title: "Building Scalable Web Applications with Modern Architecture",
      source: "Tech Frontiers",
      image: "/article-images/web-architecture.jpg",
      excerpt: "Learn how to design and implement web applications that can scale to millions of users.",
      url: "https://example.com/scalable-web-apps",
      savedAt: "2 weeks ago",
    },
  ]

  const savedCommunities = [
    {
      id: 1,
      name: "UX/UI Designers",
      members: 1250,
      description: "A community for UX/UI designers to share work, get feedback, and discuss design trends.",
      image: "/community-images/ux-ui.jpg",
      savedAt: "3 days ago",
    },
    {
      id: 2,
      name: "Tech Entrepreneurs",
      members: 3420,
      description: "Connect with fellow entrepreneurs to share experiences and grow your business.",
      image: "/community-images/entrepreneurs.jpg",
      savedAt: "1 week ago",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 container py-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Saved Items</h1>
              <p className="text-muted-foreground">Access your bookmarked posts, articles, and communities</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search saved items" className="pl-10" />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>

            <div className="space-y-1">
              <Tabs defaultValue="posts" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="posts" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Posts
                  </TabsTrigger>
                  <TabsTrigger value="articles" className="gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Articles
                  </TabsTrigger>
                  <TabsTrigger value="communities" className="gap-2">
                    <Users className="h-4 w-4" />
                    Communities
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="posts" className="mt-6">
                  <div className="space-y-6">
                    {savedPosts.map((post) => (
                      <Card key={post.id}>
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
                            <div className="flex items-center gap-2">
                              <div className="text-xs text-muted-foreground">Saved {post.savedAt}</div>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
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
                            <Button variant="ghost" size="sm" className="gap-1 text-primary">
                              <Bookmark className="h-4 w-4 fill-primary" />
                              Saved
                            </Button>
                          </div>
                          <div className="flex justify-end w-full">
                            <Button variant="outline" size="sm" onClick={() => (window.location.href = "/community")}>
                              View Post
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="articles" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {savedArticles.map((article) => (
                      <Card key={article.id} className="overflow-hidden">
                        <div className="relative h-40 w-full">
                          <Image
                            src={article.image || "/placeholder.svg?height=160&width=320"}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute top-2 right-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full bg-background/20 hover:bg-background/40 text-white"
                            >
                              <Bookmark className="h-4 w-4 fill-white" />
                            </Button>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="text-sm font-medium text-muted-foreground">{article.source}</div>
                            <div className="text-xs text-muted-foreground">Saved {article.savedAt}</div>
                          </div>
                          <h3 className="font-bold mb-2 line-clamp-2">{article.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{article.excerpt}</p>
                          <Button variant="outline" size="sm" className="w-full gap-1" asChild>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                              Read Article <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="communities" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {savedCommunities.map((community) => (
                      <Card key={community.id} className="overflow-hidden">
                        <div className="relative h-32 w-full">
                          <Image
                            src={community.image || "/placeholder.svg?height=128&width=384"}
                            alt={community.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-2 left-3 right-3">
                            <h3 className="text-lg font-bold text-white">{community.name}</h3>
                            <p className="text-xs text-white/80">{community.members} members</p>
                          </div>
                          <div className="absolute top-2 right-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full bg-background/20 hover:bg-background/40 text-white"
                            >
                              <Bookmark className="h-4 w-4 fill-white" />
                            </Button>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="text-xs text-muted-foreground">Saved {community.savedAt}</div>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{community.description}</p>
                          <Button className="w-full" onClick={() => (window.location.href = "/community")}>
                            Visit Community
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

