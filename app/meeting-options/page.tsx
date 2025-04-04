"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPin, Video } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function MeetingOptionsPage() {
  const [connection, setConnection] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // In a real app, fetch the connection data from the API
    // For now, we'll simulate it with a timeout
    const fetchConnection = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Mock connection data
        setConnection({
          name: "Sarah Williams",
          role: "Software Engineer",
          company: "Tech Solutions",
          avatar: "/avatars/sarah.jpg",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load connection data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchConnection()
  }, [toast])

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

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 container py-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Meeting Options</h1>
              <p className="text-muted-foreground">Choose how you'd like to connect with {connection?.name}</p>
            </div>

            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <Avatar className="h-12 w-12">
                <AvatarImage src={connection?.avatar} alt={connection?.name} />
                <AvatarFallback>{connection?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{connection?.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {connection?.role} at {connection?.company}
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="overflow-hidden">
                <div className="relative h-40 w-full">
                  <Image src="/virtual-meeting.jpg" alt="Virtual Meeting" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">Virtual Meeting</h3>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Video className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Video Conference</h4>
                        <p className="text-sm text-muted-foreground">
                          Connect via video call from anywhere in the world. Perfect for remote collaboration.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Flexible Scheduling</h4>
                        <p className="text-sm text-muted-foreground">
                          Choose a time that works for both of you. No travel time required.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Link href="/scheduling?type=virtual" className="w-full">
                    <Button className="w-full">Schedule Virtual Meeting</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-40 w-full">
                  <Image src="/in-person-meeting.jpg" alt="In-Person Meeting" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">In-Person Meeting</h3>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Face-to-Face Interaction</h4>
                        <p className="text-sm text-muted-foreground">
                          Meet in person for a more personal connection. Great for detailed discussions.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Location & Time</h4>
                        <p className="text-sm text-muted-foreground">
                          Choose a convenient location and time for your meeting.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Link href="/scheduling?type=in-person" className="w-full">
                    <Button className="w-full">Schedule In-Person Meeting</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            <div className="flex justify-center">
              <Button variant="outline" asChild>
                <Link href="/community">Back to Community</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

