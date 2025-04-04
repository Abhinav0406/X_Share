"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Users, Briefcase, Lightbulb, TrendingUp } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function ExplorePage() {
  const trendingTopics = [
    "Product Design",
    "AI Innovation",
    "Remote Work",
    "Startup Growth",
    "UX Research",
    "Web Development",
    "Digital Marketing",
    "Data Science",
    "Leadership",
  ]

  const communities = [
    {
      id: 1,
      name: "UX/UI Designers",
      members: 1250,
      description: "A community for UX/UI designers to share work, get feedback, and discuss design trends.",
      image: "/community-images/ux-ui.jpg",
    },
    {
      id: 2,
      name: "Tech Entrepreneurs",
      members: 3420,
      description: "Connect with fellow entrepreneurs to share experiences and grow your business.",
      image: "/community-images/entrepreneurs.jpg",
    },
    {
      id: 3,
      name: "Web Developers",
      members: 5680,
      description: "A space for web developers to discuss technologies, share code, and solve problems.",
      image: "/community-images/developers.jpg",
    },
    {
      id: 4,
      name: "Product Managers",
      members: 2150,
      description: "Discuss product strategy, roadmaps, and best practices with other product managers.",
      image: "/community-images/product.jpg",
    },
  ]

  const people = [
    {
      name: "Emma Wilson",
      role: "Product Designer at Creative Labs",
      avatar: "/avatars/emma.jpg",
      connections: 248,
      skills: ["UI/UX", "Product Design", "Figma"],
    },
    {
      name: "David Kim",
      role: "Frontend Developer at TechCorp",
      avatar: "/avatars/david.jpg",
      connections: 187,
      skills: ["React", "TypeScript", "CSS"],
    },
    {
      name: "Priya Sharma",
      role: "Startup Founder at InnovateTech",
      avatar: "/avatars/priya.jpg",
      connections: 312,
      skills: ["Leadership", "Product Strategy", "Growth"],
    },
    {
      name: "Alex Johnson",
      role: "UX Designer at Design Co.",
      avatar: "/avatars/alex.jpg",
      connections: 156,
      skills: ["User Research", "Wireframing", "Prototyping"],
    },
  ]

  // Update the search functionality to be more interactive
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Add state and functions for community courses
  const [selectedCommunity, setSelectedCommunity] = useState<number | null>(null)
  const [communityCourses, setCommunityCourses] = useState<any[]>([])

  // Function to handle community selection and show courses
  const handleCommunitySelect = (communityId: number) => {
    setSelectedCommunity(communityId)

    // Get the community name
    const community = communities.find((c) => c.id === communityId)

    if (!community) return

    // Generate courses based on community type
    let courses = []

    if (community.name.includes("UX/UI")) {
      courses = [
        { title: "UI/UX Fundamentals", instructor: "Emma Wilson", duration: "8 weeks" },
        { title: "Design Systems Masterclass", instructor: "Alex Johnson", duration: "6 weeks" },
        { title: "User Research Methods", instructor: "Sarah Williams", duration: "4 weeks" },
      ]
    } else if (community.name.includes("Entrepreneur")) {
      courses = [
        { title: "Startup Marketing Strategies", instructor: "James Wilson", duration: "8 weeks" },
        { title: "Product-Led Growth", instructor: "Michael Chen", duration: "6 weeks" },
        { title: "Fundraising for Startups", instructor: "Priya Sharma", duration: "4 weeks" },
      ]
    } else if (community.name.includes("Developer")) {
      courses = [
        { title: "Modern JavaScript Frameworks", instructor: "David Kim", duration: "10 weeks" },
        { title: "Full-Stack Development", instructor: "Sarah Williams", duration: "12 weeks" },
        { title: "Web Performance Optimization", instructor: "Michael Chen", duration: "6 weeks" },
      ]
    } else if (community.name.includes("Product")) {
      courses = [
        { title: "Product Management Fundamentals", instructor: "Michael Chen", duration: "8 weeks" },
        { title: "Agile Product Development", instructor: "Emma Wilson", duration: "6 weeks" },
        { title: "Product Analytics", instructor: "David Kim", duration: "4 weeks" },
      ]
    }

    setCommunityCourses(courses)
  }

  // Add this function to handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query)

    if (query.trim() === "") {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)

    // Simulate search results based on the query
    setTimeout(() => {
      const results = [
        {
          type: "community",
          name: `${query} Community`,
          description: `A community focused on ${query} topics and discussions.`,
          members: Math.floor(Math.random() * 5000) + 500,
        },
        {
          type: "person",
          name: `${query.charAt(0).toUpperCase() + query.slice(1)} Expert`,
          role: `${query} Specialist at Tech Company`,
          connections: Math.floor(Math.random() * 300) + 100,
        },
        {
          type: "topic",
          name: `#${query.replace(/\s+/g, "")}`,
          posts: Math.floor(Math.random() * 1000) + 200,
        },
        {
          type: "course",
          name: `Introduction to ${query.charAt(0).toUpperCase() + query.slice(1)}`,
          provider: "X-Share Learning",
          students: Math.floor(Math.random() * 2000) + 300,
        },
        {
          type: "article",
          title: `The Future of ${query.charAt(0).toUpperCase() + query.slice(1)}`,
          author: "Industry Expert",
          readTime: `${Math.floor(Math.random() * 15) + 5} min read`,
        },
      ]

      setSearchResults(results)
      setIsSearching(false)
    }, 500)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 container py-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Explore</h1>
              <p className="text-muted-foreground">Discover communities, people, and ideas</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Update the search input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search for people, communities, or topics"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>

            {/* Add search results display */}
            {searchQuery.trim() !== "" && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Search Results for "{searchQuery}"</CardTitle>
                  <CardDescription>
                    {isSearching ? "Searching..." : `Found ${searchResults.length} results`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSearching ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {searchResults.map((result, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          {result.type === "community" && (
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="font-medium">{result.name}</h3>
                                <p className="text-sm text-muted-foreground">{result.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">{result.members} members</p>
                              </div>
                              <Button onClick={() => (window.location.href = "/join-community")}>Join</Button>
                            </div>
                          )}

                          {result.type === "person" && (
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="font-medium">{result.name}</h3>
                                <p className="text-sm text-muted-foreground">{result.role}</p>
                                <p className="text-xs text-muted-foreground mt-1">{result.connections} connections</p>
                              </div>
                              <Button onClick={() => alert(`Connection request sent to ${result.name}`)}>
                                Connect
                              </Button>
                            </div>
                          )}

                          {result.type === "topic" && (
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="font-medium">{result.name}</h3>
                                <p className="text-sm text-muted-foreground">{result.posts} posts</p>
                              </div>
                              <Button variant="outline" onClick={() => (window.location.href = "/community")}>
                                View Posts
                              </Button>
                            </div>
                          )}

                          {result.type === "course" && (
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="font-medium">{result.name}</h3>
                                <p className="text-sm text-muted-foreground">By {result.provider}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {result.students} students enrolled
                                </p>
                              </div>
                              <Button variant="outline" onClick={() => alert(`Enrolled in ${result.name}`)}>
                                Enroll
                              </Button>
                            </div>
                          )}

                          {result.type === "article" && (
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="font-medium">{result.title}</h3>
                                <p className="text-sm text-muted-foreground">By {result.author}</p>
                                <p className="text-xs text-muted-foreground mt-1">{result.readTime}</p>
                              </div>
                              <Button variant="outline" onClick={() => alert(`Reading ${result.title}`)}>
                                Read
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <div className="space-y-1">
              <Tabs defaultValue="communities" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="communities" className="gap-2">
                    <Users className="h-4 w-4" />
                    Communities
                  </TabsTrigger>
                  <TabsTrigger value="people" className="gap-2">
                    <Briefcase className="h-4 w-4" />
                    People
                  </TabsTrigger>
                  <TabsTrigger value="topics" className="gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Topics
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="communities" className="mt-6">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {communities.map((community) => (
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
                        </div>
                        <CardContent className="p-4">
                          <p className="text-sm text-muted-foreground line-clamp-2">{community.description}</p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button className="w-full" onClick={() => handleCommunitySelect(community.id)}>
                            Join Community
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>

                  {selectedCommunity && (
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>
                          Recommended Courses for {communities.find((c) => c.id === selectedCommunity)?.name}
                        </CardTitle>
                        <CardDescription>Enhance your skills with these specialized courses</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {communityCourses.map((course, index) => (
                            <div key={index} className="border rounded-lg p-4">
                              <h3 className="font-medium">{course.title}</h3>
                              <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                              <p className="text-sm text-muted-foreground">Duration: {course.duration}</p>
                              <Button className="w-full mt-3" variant="outline">
                                Enroll Now
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="people" className="mt-6">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {people.map((person, index) => (
                      <Card key={index}>
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center text-center">
                            <Avatar className="h-20 w-20 mb-4">
                              <AvatarImage src={person.avatar} alt={person.name} />
                              <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <h3 className="font-semibold">{person.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{person.role}</p>
                            <div className="flex flex-wrap justify-center gap-1 mb-4">
                              {person.skills.map((skill, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-xs text-muted-foreground mb-4">{person.connections} connections</p>
                            <Button className="w-full" onClick={() => (window.location.href = "/profile")}>
                              View Profile
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="topics" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Trending Topics
                      </CardTitle>
                      <CardDescription>Explore popular topics and join the conversation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {trendingTopics.map((topic, index) => (
                          <Link
                            key={index}
                            href="/community"
                            className="px-4 py-2 bg-muted rounded-full text-sm font-medium hover:bg-primary/10 transition-colors"
                          >
                            #{topic.replace(/\s+/g, "")}
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

