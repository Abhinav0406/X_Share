"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Users, Globe, Briefcase, Lightbulb, Code, PaintBucket, TrendingUp, Zap } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

export default function JoinCommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [joinedCommunities, setJoinedCommunities] = useState<number[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [selectedCommunity, setSelectedCommunity] = useState<number | null>(null)
  const [communityCourses, setCommunityCourses] = useState<any[]>([])

  // Define sample communities for each category
  const allCommunities = [
    // Design Communities
    {
      id: 1,
      name: "UX/UI Designers",
      description: "A community for UX/UI designers to share work, get feedback, and discuss design trends.",
      members: 1250,
      category: "Design",
      image: "/community-images/ux-ui.jpg",
    },
    {
      id: 2,
      name: "Visual Design Masters",
      description: "For graphic designers, illustrators, and visual artists to showcase their work and techniques.",
      members: 875,
      category: "Design",
      image: "/placeholder.svg?height=128&width=384",
    },
    {
      id: 3,
      name: "Design Systems Hub",
      description: "Focused on creating and maintaining scalable design systems for products and brands.",
      members: 620,
      category: "Design",
      image: "/placeholder.svg?height=128&width=384",
    },

    // Development Communities
    {
      id: 4,
      name: "Web Developers",
      description: "A community for frontend and backend web developers to share knowledge and best practices.",
      members: 5680,
      category: "Development",
      image: "/community-images/developers.jpg",
    },
    {
      id: 5,
      name: "Mobile App Creators",
      description: "For iOS, Android, and cross-platform mobile app developers to discuss development challenges.",
      members: 3240,
      category: "Development",
      image: "/placeholder.svg?height=128&width=384",
    },
    {
      id: 6,
      name: "DevOps Professionals",
      description: "Focused on CI/CD, infrastructure as code, and modern deployment practices.",
      members: 1890,
      category: "Development",
      image: "/placeholder.svg?height=128&width=384",
    },

    // Business Communities
    {
      id: 7,
      name: "Tech Entrepreneurs",
      description: "For founders, co-founders, and aspiring entrepreneurs in the tech industry.",
      members: 3420,
      category: "Business",
      image: "/community-images/entrepreneurs.jpg",
    },
    {
      id: 8,
      name: "Digital Marketing Experts",
      description: "Sharing strategies for growth, customer acquisition, and brand building in digital spaces.",
      members: 2150,
      category: "Business",
      image: "/placeholder.svg?height=128&width=384",
    },
    {
      id: 9,
      name: "Business Analytics",
      description: "For professionals focused on data-driven business decisions and analytics.",
      members: 1680,
      category: "Business",
      image: "/placeholder.svg?height=128&width=384",
    },

    // Technology Communities
    {
      id: 10,
      name: "AI & Machine Learning",
      description:
        "Discussing the latest in artificial intelligence, machine learning, and deep learning technologies.",
      members: 4250,
      category: "Technology",
      image: "/placeholder.svg?height=128&width=384",
    },
    {
      id: 11,
      name: "Blockchain Innovators",
      description: "For developers and enthusiasts exploring blockchain technology and its applications.",
      members: 2870,
      category: "Technology",
      image: "/placeholder.svg?height=128&width=384",
    },
    {
      id: 12,
      name: "Cloud Computing",
      description: "Focused on AWS, Azure, GCP, and modern cloud infrastructure practices.",
      members: 3560,
      category: "Technology",
      image: "/placeholder.svg?height=128&width=384",
    },

    // Marketing Communities
    {
      id: 13,
      name: "Content Marketers",
      description: "For professionals specializing in content creation, strategy, and distribution.",
      members: 1950,
      category: "Marketing",
      image: "/placeholder.svg?height=128&width=384",
    },
    {
      id: 14,
      name: "Growth Hackers",
      description: "Sharing innovative strategies for rapid business and product growth.",
      members: 2340,
      category: "Marketing",
      image: "/placeholder.svg?height=128&width=384",
    },
    {
      id: 15,
      name: "Social Media Strategists",
      description: "For marketers focused on building brand presence across social platforms.",
      members: 2780,
      category: "Marketing",
      image: "/placeholder.svg?height=128&width=384",
    },

    // Product Communities
    {
      id: 16,
      name: "Product Managers",
      description: "A community for product managers to discuss roadmaps, feature prioritization, and user feedback.",
      members: 3120,
      category: "Product",
      image: "/community-images/product.jpg",
    },
    {
      id: 17,
      name: "Product Design Thinkers",
      description: "Focused on user-centered design processes and product innovation.",
      members: 1840,
      category: "Product",
      image: "/placeholder.svg?height=128&width=384",
    },
    {
      id: 18,
      name: "Agile Practitioners",
      description: "For professionals implementing agile methodologies in product development.",
      members: 2560,
      category: "Product",
      image: "/placeholder.svg?height=128&width=384",
    },
  ]

  // Update the categories array to include proper icons and ensure they match the filter functionality
  const categories = [
    { name: "All", icon: Globe },
    { name: "Design", icon: PaintBucket },
    { name: "Development", icon: Code },
    { name: "Business", icon: Briefcase },
    { name: "Technology", icon: Zap },
    { name: "Marketing", icon: TrendingUp },
    { name: "Product", icon: Lightbulb },
  ]

  const [activeCategory, setActiveCategory] = useState("All")

  // Update the filteredCommunities logic to properly filter by category
  const filteredCommunities = allCommunities.filter((community: any) => {
    const matchesSearch =
      searchQuery === "" ||
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "All" || community.category === activeCategory

    return matchesSearch && matchesCategory
  })

  const handleJoinCommunity = (communityId: number) => {
    if (joinedCommunities.includes(communityId)) {
      setJoinedCommunities(joinedCommunities.filter((id) => id !== communityId))
      toast({
        title: "Left community",
        description: "You have successfully left the community.",
      })
    } else {
      setJoinedCommunities([...joinedCommunities, communityId])

      // Get the community
      const community = allCommunities.find((c) => c.id === communityId)
      if (!community) return

      // Generate courses based on community category
      let courses = []

      switch (community.category) {
        case "Design":
          courses = [
            { title: "UI/UX Fundamentals", instructor: "Emma Wilson", duration: "8 weeks" },
            { title: "Design Systems Masterclass", instructor: "Alex Johnson", duration: "6 weeks" },
            { title: "User Research Methods", instructor: "Sarah Williams", duration: "4 weeks" },
          ]
          break
        case "Development":
          courses = [
            { title: "Modern JavaScript Frameworks", instructor: "David Kim", duration: "10 weeks" },
            { title: "Full-Stack Development", instructor: "Sarah Williams", duration: "12 weeks" },
            { title: "Web Performance Optimization", instructor: "Michael Chen", duration: "6 weeks" },
          ]
          break
        case "Business":
          courses = [
            { title: "Startup Marketing Strategies", instructor: "James Wilson", duration: "8 weeks" },
            { title: "Product-Led Growth", instructor: "Michael Chen", duration: "6 weeks" },
            { title: "Fundraising for Startups", instructor: "Priya Sharma", duration: "4 weeks" },
          ]
          break
        case "Technology":
          courses = [
            { title: "AI and Machine Learning Basics", instructor: "David Kim", duration: "10 weeks" },
            { title: "Cloud Computing Fundamentals", instructor: "Michael Chen", duration: "8 weeks" },
            { title: "Cybersecurity Essentials", instructor: "Sarah Williams", duration: "6 weeks" },
          ]
          break
        case "Marketing":
          courses = [
            { title: "Digital Marketing Strategy", instructor: "James Wilson", duration: "8 weeks" },
            { title: "Social Media Marketing", instructor: "Emma Wilson", duration: "6 weeks" },
            { title: "Content Marketing Mastery", instructor: "Priya Sharma", duration: "4 weeks" },
          ]
          break
        case "Product":
          courses = [
            { title: "Product Management Fundamentals", instructor: "Michael Chen", duration: "8 weeks" },
            { title: "Agile Product Development", instructor: "Emma Wilson", duration: "6 weeks" },
            { title: "Product Analytics", instructor: "David Kim", duration: "4 weeks" },
          ]
          break
        default:
          courses = [
            { title: "Introduction to " + community.name, instructor: "Expert Instructor", duration: "8 weeks" },
            {
              title: "Advanced " + community.name + " Techniques",
              instructor: "Senior Instructor",
              duration: "10 weeks",
            },
          ]
      }

      // Show toast with success message
      toast({
        title: "Joined community",
        description: `You have successfully joined ${community.name}. Check out the recommended courses!`,
      })

      // Set the selected community and courses
      setSelectedCommunity(communityId)
      setCommunityCourses(courses)
    }
  }

  // Update the handleCommunitySelect function to show courses based on community type
  const handleCommunitySelect = (communityId: number) => {
    setSelectedCommunity(communityId)

    // Get the community name and category
    const community = allCommunities.find((c) => c.id === communityId)

    if (!community) return

    // Generate courses based on community category
    let courses = []

    switch (community.category) {
      case "Design":
        courses = [
          { title: "UI/UX Fundamentals", instructor: "Emma Wilson", duration: "8 weeks" },
          { title: "Design Systems Masterclass", instructor: "Alex Johnson", duration: "6 weeks" },
          { title: "User Research Methods", instructor: "Sarah Williams", duration: "4 weeks" },
        ]
        break
      case "Development":
        courses = [
          { title: "Modern JavaScript Frameworks", instructor: "David Kim", duration: "10 weeks" },
          { title: "Full-Stack Development", instructor: "Sarah Williams", duration: "12 weeks" },
          { title: "Web Performance Optimization", instructor: "Michael Chen", duration: "6 weeks" },
        ]
        break
      case "Business":
        courses = [
          { title: "Startup Marketing Strategies", instructor: "James Wilson", duration: "8 weeks" },
          { title: "Product-Led Growth", instructor: "Michael Chen", duration: "6 weeks" },
          { title: "Fundraising for Startups", instructor: "Priya Sharma", duration: "4 weeks" },
        ]
        break
      case "Technology":
        courses = [
          { title: "AI and Machine Learning Basics", instructor: "David Kim", duration: "10 weeks" },
          { title: "Cloud Computing Fundamentals", instructor: "Michael Chen", duration: "8 weeks" },
          { title: "Cybersecurity Essentials", instructor: "Sarah Williams", duration: "6 weeks" },
        ]
        break
      case "Marketing":
        courses = [
          { title: "Digital Marketing Strategy", instructor: "James Wilson", duration: "8 weeks" },
          { title: "Social Media Marketing", instructor: "Emma Wilson", duration: "6 weeks" },
          { title: "Content Marketing Mastery", instructor: "Priya Sharma", duration: "4 weeks" },
        ]
        break
      case "Product":
        courses = [
          { title: "Product Management Fundamentals", instructor: "Michael Chen", duration: "8 weeks" },
          { title: "Agile Product Development", instructor: "Emma Wilson", duration: "6 weeks" },
          { title: "Product Analytics", instructor: "David Kim", duration: "4 weeks" },
        ]
        break
      default:
        courses = [
          { title: "Introduction to " + community.name, instructor: "Expert Instructor", duration: "8 weeks" },
          {
            title: "Advanced " + community.name + " Techniques",
            instructor: "Senior Instructor",
            duration: "10 weeks",
          },
        ]
    }

    setCommunityCourses(courses)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        {/* Update the main container and grid layout for better mobile responsiveness */}
        <main className="flex-1 container py-6 px-4 md:px-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Join Communities</h1>
              <p className="text-muted-foreground">Discover and join communities that match your interests</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search for communities..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue="discover" className="w-full">
              <TabsList className="w-full justify-start mb-4">
                <TabsTrigger value="discover" className="gap-2">
                  <Globe className="h-4 w-4" />
                  Discover
                </TabsTrigger>
                <TabsTrigger value="joined" className="gap-2">
                  <Users className="h-4 w-4" />
                  Joined ({joinedCommunities.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="discover">
                {/* Category filters - scrollable on mobile */}
                <div className="mb-6">
                  <div className="flex overflow-x-auto pb-2 md:flex-wrap md:overflow-visible gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category.name}
                        variant={activeCategory === category.name ? "default" : "outline"}
                        className="flex items-center gap-2 whitespace-nowrap flex-shrink-0"
                        onClick={() => setActiveCategory(category.name)}
                      >
                        <category.icon className="h-4 w-4" />
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium">Loading communities...</h3>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredCommunities.map((community) => (
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
                            <Badge className="absolute top-2 right-2">{community.category}</Badge>
                          </div>
                          <CardContent className="p-4">
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{community.description}</p>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button
                                className="flex-1"
                                variant={joinedCommunities.includes(community.id) ? "outline" : "default"}
                                onClick={() => handleJoinCommunity(community.id)}
                              >
                                {joinedCommunities.includes(community.id) ? "Leave Community" : "Join Community"}
                              </Button>
                              <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => handleCommunitySelect(community.id)}
                              >
                                View Courses
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {filteredCommunities.length === 0 && (
                      <div className="text-center py-12">
                        <h3 className="text-lg font-medium">No communities found</h3>
                        <p className="text-muted-foreground">Try adjusting your search or category filter</p>
                      </div>
                    )}
                  </>
                )}

                {selectedCommunity && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>
                        Recommended Courses for {allCommunities.find((c) => c.id === selectedCommunity)?.name}
                      </CardTitle>
                      <CardDescription>Enhance your skills with these specialized courses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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

              <TabsContent value="joined">
                {joinedCommunities.length > 0 ? (
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {allCommunities
                      .filter((community) => joinedCommunities.includes(community.id))
                      .map((community) => (
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
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button
                                className="flex-1"
                                onClick={() => (window.location.href = `/community/${community.id}`)}
                              >
                                Visit
                              </Button>
                              <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => handleJoinCommunity(community.id)}
                              >
                                Leave
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium">You haven't joined any communities yet</h3>
                    <p className="text-muted-foreground mb-6">Join communities to connect with like-minded people</p>
                    <Button onClick={() => document.querySelector('[data-value="discover"]')?.click()}>
                      Discover Communities
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

