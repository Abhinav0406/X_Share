"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { FileText, Globe, Linkedin, Mail, MapPin, MessageSquare, Twitter } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const params = useParams()
  const username = params.username
  const { toast } = useToast()

  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [showMessageForm, setShowMessageForm] = useState(false)
  const [messageText, setMessageText] = useState("")

  useEffect(() => {
    // In a real app, fetch the profile data from the API
    // For now, we'll simulate it with a timeout
    const fetchProfile = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Mock profile data based on username
        const mockProfiles = {
          "alex-johnson": {
            name: "Alex Johnson",
            role: "UX Designer",
            company: "Design Co.",
            location: "San Francisco, USA",
            avatar: "/avatars/alex.jpg",
            bio: "Passionate UX designer with 5+ years of experience creating user-centered digital experiences. Specializing in mobile app design and design systems.",
            skills: ["UI Design", "UX Research", "Prototyping", "Figma", "Sketch", "Design Systems"],
            experience: [
              {
                title: "Senior UX Designer",
                company: "Design Co.",
                period: "2021 - Present",
                description: "Leading design initiatives for enterprise clients and establishing design systems.",
              },
              {
                title: "UX Designer",
                company: "Creative Agency",
                period: "2018 - 2021",
                description: "Designed user interfaces for mobile applications and conducted user research.",
              },
            ],
            education: [
              {
                degree: "Master of Design",
                institution: "California Design Institute",
                year: "2018",
              },
              {
                degree: "Bachelor of Arts in Visual Communication",
                institution: "University of California",
                year: "2016",
              },
            ],
            connections: 186,
            posts: 24,
            projects: 8,
          },
          "sarah-williams": {
            name: "Sarah Williams",
            role: "Software Engineer",
            company: "Tech Solutions",
            location: "Boston, USA",
            avatar: "/avatars/sarah.jpg",
            bio: "Full-stack software engineer with expertise in React, Node.js, and cloud architecture. Passionate about building scalable web applications and mentoring junior developers.",
            skills: ["JavaScript", "React", "Node.js", "TypeScript", "AWS", "GraphQL"],
            experience: [
              {
                title: "Senior Software Engineer",
                company: "Tech Solutions",
                period: "2020 - Present",
                description: "Leading development of enterprise SaaS products and mentoring junior developers.",
              },
              {
                title: "Software Engineer",
                company: "WebTech Inc.",
                period: "2017 - 2020",
                description: "Developed and maintained React-based web applications and RESTful APIs.",
              },
            ],
            education: [
              {
                degree: "Master of Computer Science",
                institution: "MIT",
                year: "2017",
              },
              {
                degree: "Bachelor of Science in Computer Science",
                institution: "Boston University",
                year: "2015",
              },
            ],
            connections: 210,
            posts: 32,
            projects: 15,
          },
          "michael-chen": {
            name: "Michael Chen",
            role: "Product Manager",
            company: "Innovate Inc.",
            location: "Seattle, USA",
            avatar: "/avatars/michael.jpg",
            bio: "Product manager with a background in engineering. Focused on building products that solve real user problems and drive business growth.",
            skills: ["Product Strategy", "User Research", "Agile", "Data Analysis", "Roadmapping", "A/B Testing"],
            experience: [
              {
                title: "Senior Product Manager",
                company: "Innovate Inc.",
                period: "2019 - Present",
                description: "Leading product strategy and roadmap for B2B SaaS platform with 50k+ users.",
              },
              {
                title: "Product Manager",
                company: "TechStart",
                period: "2016 - 2019",
                description: "Managed the development of mobile applications from concept to launch.",
              },
            ],
            education: [
              {
                degree: "MBA",
                institution: "University of Washington",
                year: "2016",
              },
              {
                degree: "Bachelor of Engineering",
                institution: "Stanford University",
                year: "2012",
              },
            ],
            connections: 278,
            posts: 45,
            projects: 12,
          },
          "vasant-jevengekar": {
            name: "VASANT JEVENGEKAR",
            role: "Product Designer",
            company: "Design Innovation Labs",
            location: "Mumbai, India",
            avatar: "/avatars/vasant.jpg",
            bio: "Passionate product designer with 8+ years of experience creating user-centered digital experiences. Specializing in UI/UX design for enterprise software and mobile applications.",
            skills: [
              "UI/UX Design",
              "Product Strategy",
              "User Research",
              "Prototyping",
              "Design Systems",
              "Figma",
              "Adobe XD",
            ],
            experience: [
              {
                title: "Senior Product Designer",
                company: "Design Innovation Labs",
                period: "2020 - Present",
                description:
                  "Leading design initiatives for enterprise clients, managing a team of 4 designers, and establishing design systems.",
              },
              {
                title: "UX Designer",
                company: "Creative Solutions Inc.",
                period: "2017 - 2020",
                description:
                  "Designed user interfaces for mobile applications and conducted user research to inform design decisions.",
              },
            ],
            education: [
              {
                degree: "Master of Design",
                institution: "National Institute of Design",
                year: "2017",
              },
              {
                degree: "Bachelor of Engineering",
                institution: "Mumbai University",
                year: "2015",
              },
            ],
            connections: 248,
            posts: 36,
            projects: 12,
          },
        }

        // Get profile data or use default
        const profileData = mockProfiles[username as string] || mockProfiles["vasant-jevengekar"]
        setProfile(profileData)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [username, toast])

  const handleConnect = () => {
    setIsConnected(!isConnected)
    if (!isConnected) {
      toast({
        title: "Connection Request Sent",
        description: `Your connection request has been sent to ${profile?.name}`,
      })
    } else {
      toast({
        title: "Disconnected",
        description: `You have disconnected from ${profile?.name}`,
      })
    }
  }

  const handleSendMessage = () => {
    if (messageText.trim()) {
      toast({
        title: "Message Sent",
        description: `Your message has been sent to ${profile?.name}`,
      })
      setMessageText("")
      setShowMessageForm(false)
    } else {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      })
    }
  }

  const handleScheduleMeeting = () => {
    // Redirect to meeting options page
    window.location.href = "/meeting-options"
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 container py-6">
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 container py-6">
            <div className="flex justify-center items-center h-full flex-col">
              <h2 className="text-2xl font-bold mb-2">Profile Not Found</h2>
              <p className="text-muted-foreground mb-4">
                The profile you're looking for doesn't exist or has been removed.
              </p>
              <Button asChild>
                <Link href="/community">Return to Community</Link>
              </Button>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 container py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-8">
              {/* Profile Card */}
              <Card className="overflow-hidden">
                <div className="relative h-32 w-full bg-gradient-to-r from-purple-500 to-blue-500">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-background/20 hover:bg-background/40 text-white"
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="pt-0 pb-3">
                  <div className="flex flex-col items-center -mt-12">
                    <Avatar className="h-24 w-24 border-4 border-background">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h2 className="mt-2 text-xl font-bold">{profile.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {profile.role} at {profile.company}
                    </p>
                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {profile.location}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button onClick={handleConnect}>{isConnected ? "Connected" : "Connect"}</Button>
                      {isConnected && (
                        <Button variant="outline" onClick={handleScheduleMeeting}>
                          Schedule Meeting
                        </Button>
                      )}
                      <Button variant="outline" onClick={() => setShowMessageForm(true)}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>

                    {showMessageForm && (
                      <div className="mt-4 p-3 border rounded-md w-full">
                        <h3 className="font-medium mb-2">Send Message to {profile.name}</h3>
                        <Textarea
                          placeholder="Type your message here..."
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          className="mb-2"
                          rows={3}
                        />
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => setShowMessageForm(false)}>
                            Cancel
                          </Button>
                          <Button size="sm" onClick={handleSendMessage}>
                            Send
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t flex justify-between py-3">
                  <div className="text-center">
                    <div className="font-medium">{profile.connections}</div>
                    <div className="text-xs text-muted-foreground">Connections</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{profile.posts}</div>
                    <div className="text-xs text-muted-foreground">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{profile.projects}</div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                </CardFooter>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{profile.name.toLowerCase().replace(" ", ".")}@example.com</span>
                  </div>
                  <div className="flex items-center">
                    <Linkedin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Link href="#" className="hover:underline">
                      linkedin.com/in/{profile.name.toLowerCase().replace(" ", "")}
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <Twitter className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Link href="#" className="hover:underline">
                      @{profile.name.toLowerCase().replace(" ", "_")}
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Link href="#" className="hover:underline">
                      {profile.name.toLowerCase().replace(" ", "")}portfolio.com
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2 space-y-6">
              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{profile.bio}</p>
                </CardContent>
              </Card>

              {/* Experience & Education */}
              <Tabs defaultValue="experience">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                </TabsList>
                <TabsContent value="experience" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        {profile.experience.map((exp: any, index: number) => (
                          <div key={index} className="border-l-2 border-muted pl-4 pb-2">
                            <h3 className="font-semibold">{exp.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {exp.company} • {exp.period}
                            </p>
                            <p className="mt-2 text-sm">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="education" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        {profile.education.map((edu: any, index: number) => (
                          <div key={index} className="border-l-2 border-muted pl-4 pb-2">
                            <h3 className="font-semibold">{edu.degree}</h3>
                            <p className="text-sm text-muted-foreground">
                              {edu.institution} • {edu.year}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile.avatar} alt={profile.name} />
                        <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p>
                          <span className="font-medium">{profile.name}</span> shared a post about design systems
                        </p>
                        <p className="text-sm text-muted-foreground">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile.avatar} alt={profile.name} />
                        <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p>
                          <span className="font-medium">{profile.name}</span> connected with{" "}
                          <span className="font-medium">Sarah Williams</span>
                        </p>
                        <p className="text-sm text-muted-foreground">1 week ago</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile.avatar} alt={profile.name} />
                        <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p>
                          <span className="font-medium">{profile.name}</span> joined the UX/UI Designers community
                        </p>
                        <p className="text-sm text-muted-foreground">2 weeks ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

