"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, UserPlus, Users, UserCheck, Clock, Filter } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ConnectionsPage() {
  const [connections, setConnections] = useState([])
  const [pendingConnections, setPendingConnections] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const [acceptedConnections, setAcceptedConnections] = useState<number[]>([])

  const handleConnect = (personId: number) => {
    if (!pendingConnections.includes(personId)) {
      setPendingConnections([...pendingConnections, personId])
      alert("Connection request sent!")
    } else {
      alert("Connection request already sent.")
    }
  }

  const handleAccept = (personId: number) => {
    setPendingConnections(pendingConnections.filter((id) => id !== personId))
    setAcceptedConnections([...acceptedConnections, personId])
    alert("Connection request accepted!")
  }

  const handleDecline = (personId: number) => {
    setPendingConnections(pendingConnections.filter((id) => id !== personId))
    alert("Connection request declined.")
  }

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await fetch("/api/connections")
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch connections")
        }

        setConnections(data.data.connections)
        setPendingConnections(data.data.pendingConnections)
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

    fetchConnections()
  }, [toast])

  const hardcodedSuggestions = [
    {
      name: "Priya Sharma",
      role: "Startup Founder at InnovateTech",
      avatar: "/avatars/priya.jpg",
      mutualConnections: 23,
    },
    {
      name: "James Wilson",
      role: "Marketing Director at GrowthCo",
      avatar: "/avatars/user.jpg",
      mutualConnections: 9,
    },
    {
      name: "Lisa Chen",
      role: "Data Scientist at AnalyticsPro",
      avatar: "/avatars/user.jpg",
      mutualConnections: 11,
    },
    {
      name: "Robert Taylor",
      role: "CTO at TechStart",
      avatar: "/avatars/user.jpg",
      mutualConnections: 6,
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
              <h1 className="text-2xl font-bold tracking-tight">Connections</h1>
              <p className="text-muted-foreground">Manage your network and grow your connections</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search connections" className="pl-10" />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>

            <div className="space-y-1">
              <Tabs defaultValue="connections" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="connections" className="gap-2">
                    <UserCheck className="h-4 w-4" />
                    My Connections
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="gap-2">
                    <Clock className="h-4 w-4" />
                    Pending
                  </TabsTrigger>
                  <TabsTrigger value="suggestions" className="gap-2">
                    <UserPlus className="h-4 w-4" />
                    Suggestions
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="connections" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        My Connections ({connections.length})
                      </CardTitle>
                      <CardDescription>People you've connected with on X-Share</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {connections.map((connection, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Avatar>
                                <AvatarImage src={connection.avatar} alt={connection.name} />
                                <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{connection.name}</h3>
                                <p className="text-sm text-muted-foreground">{connection.role}</p>
                                <p className="text-xs text-muted-foreground">
                                  {connection.mutualConnections} mutual connections
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => (window.location.href = "/meeting-options")}
                              >
                                Meet
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/profile")}>
                                View
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="pending" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        Pending Requests ({pendingConnections.length})
                      </CardTitle>
                      <CardDescription>Connection requests waiting for your response</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {pendingConnections.map((request, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Avatar>
                                <AvatarImage src={request.avatar} alt={request.name} />
                                <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{request.name}</h3>
                                <p className="text-sm text-muted-foreground">{request.role}</p>
                                <p className="text-xs text-muted-foreground">
                                  {request.mutualConnections} mutual connections • Sent {request.sentAt}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleAccept(index)}>
                                Accept
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDecline(index)}>
                                Decline
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="suggestions" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <UserPlus className="h-5 w-5 text-primary" />
                        People You May Know
                      </CardTitle>
                      <CardDescription>Connect with people in your industry or with similar interests</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {hardcodedSuggestions.map((suggestion, index) => (
                          <div key={index} className="flex flex-col items-center text-center p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={suggestion.avatar} alt={suggestion.name} />
                                <AvatarFallback>{suggestion.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="font-medium">{suggestion.name}</div>
                                <div className="text-sm text-muted-foreground">{suggestion.role}</div>
                                <div className="text-xs text-muted-foreground">
                                  {suggestion.mutualConnections} mutual connections
                                </div>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => handleConnect(index)}
                                disabled={pendingConnections.includes(index)}
                              >
                                {pendingConnections.includes(index) ? "Pending" : "Connect"}
                              </Button>
                            </div>
                          </div>
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

