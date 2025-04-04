"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { FileText, Globe, Linkedin, Mail, MapPin, MessageSquare, Twitter } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const profile = {
    name: "VASANT JEVENGEKAR",
    role: "Product Designer",
    company: "Design Innovation Labs",
    location: "Mumbai, India",
    bio: "Passionate product designer with 8+ years of experience creating user-centered digital experiences. Specializing in UI/UX design for enterprise software and mobile applications.",
    skills: ["UI/UX Design", "Product Strategy", "User Research", "Prototyping", "Design Systems", "Figma", "Adobe XD"],
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
  }

  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/users/me")
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch user data")
        }

        setUserData(data.data)
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

    fetchUserData()
  }, [toast])

  // Add functions to handle profile interactions
  const [isConnected, setIsConnected] = useState(false)
  const [showMessageForm, setShowMessageForm] = useState(false)
  const [messageText, setMessageText] = useState("")

  const handleConnect = () => {
    setIsConnected(!isConnected)
    if (!isConnected) {
      alert("Connection request sent to " + profile.name)
    } else {
      alert("You have disconnected from " + profile.name)
    }
  }

  const handleSendMessage = () => {
    if (messageText.trim()) {
      alert("Message sent to " + profile.name + ": " + messageText)
      setMessageText("")
      setShowMessageForm(false)
    } else {
      alert("Please enter a message")
    }
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
                      <AvatarImage src="/avatars/vasant.jpg" alt={profile.name} />
                      <AvatarFallback>VJ</AvatarFallback>
                    </Avatar>
                    <h2 className="mt-2 text-xl font-bold">{userData?.name || "Loading..."}</h2>
                    <p className="text-sm text-muted-foreground">
                      {profile.role} at {profile.company}
                    </p>
                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {profile.location}
                    </div>
                    {/* Update the JSX for the connect and message buttons */}
                    <div className="flex gap-2 mt-4">
                      <Button onClick={handleConnect}>{isConnected ? "Connected" : "Connect"}</Button>
                      <Button variant="outline" onClick={() => setShowMessageForm(true)}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>

                    {showMessageForm && (
                      <div className="mt-4 p-3 border rounded-md">
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
                    <span>vasant.j@example.com</span>
                  </div>
                  <div className="flex items-center">
                    <Linkedin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Link href="#" className="hover:underline">
                      linkedin.com/in/vasantj
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <Twitter className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Link href="#" className="hover:underline">
                      @vasant_designs
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Link href="#" className="hover:underline">
                      vasantdesigns.com
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
                    {profile.skills.map((skill, index) => (
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
                  <p>{userData?.bio || "No bio available"}</p>
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
                        {profile.experience.map((exp, index) => (
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
                        {profile.education.map((edu, index) => (
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
                        <AvatarImage src="/avatars/vasant.jpg" alt={profile.name} />
                        <AvatarFallback>VJ</AvatarFallback>
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
                        <AvatarImage src="/avatars/vasant.jpg" alt={profile.name} />
                        <AvatarFallback>VJ</AvatarFallback>
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
                        <AvatarImage src="/avatars/vasant.jpg" alt={profile.name} />
                        <AvatarFallback>VJ</AvatarFallback>
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

