"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Check, Clock, MapPin, Video } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function SchedulingPage() {
  const searchParams = useSearchParams()
  const meetingType = searchParams.get("type") || "virtual"
  const { toast } = useToast()

  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string | undefined>(undefined)
  const [location, setLocation] = useState("")
  const [agenda, setAgenda] = useState("")
  const [connection, setConnection] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [googleMeetLink, setGoogleMeetLink] = useState("")

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

  // Generate Google Meet link when date and time are selected for virtual meetings
  useEffect(() => {
    if (meetingType === "virtual" && date && time) {
      // In a real app, this would be generated via the Google Meet API
      // For now, we'll create a mock link
      const formattedDate = format(date, "yyyyMMdd")
      const formattedTime = time?.replace(/[^0-9]/g, "")
      setGoogleMeetLink(`https://meet.google.com/abc-defg-hij?date=${formattedDate}&time=${formattedTime}`)
    }
  }, [date, time, meetingType])

  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
  ]

  const handleSubmit = () => {
    // Validate form
    if (!date || !time || (meetingType === "in-person" && !location)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would submit the meeting request to your backend here
    toast({
      title: "Meeting Request Sent",
      description: `Your ${meetingType} meeting request has been sent to ${connection?.name}`,
    })

    // Redirect to feedback page
    window.location.href = "/feedback"
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

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 container py-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Schedule a Meeting</h1>
              <p className="text-muted-foreground">
                {meetingType === "virtual" ? "Virtual Meeting" : "In-Person Meeting"} with {connection?.name}
              </p>
            </div>

            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <Avatar className="h-12 w-12">
                <AvatarImage src={connection?.avatar} alt={connection?.name} />
                <AvatarFallback>SW</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{connection?.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {connection?.role} at {connection?.company}
                </p>
              </div>
              <div className="ml-auto flex items-center gap-2 bg-background rounded-full px-3 py-1">
                {meetingType === "virtual" ? (
                  <>
                    <Video className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Virtual Meeting</span>
                  </>
                ) : (
                  <>
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">In-Person Meeting</span>
                  </>
                )}
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Meeting Details</CardTitle>
                <CardDescription>Select a date and time for your meeting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Select onValueChange={setTime}>
                      <SelectTrigger className={cn(!time && "text-muted-foreground")}>
                        <SelectValue placeholder="Select a time">
                          {time ? (
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4" />
                              {time}
                            </div>
                          ) : (
                            "Select a time"
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {meetingType === "in-person" && (
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Enter meeting location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                )}

                {meetingType === "virtual" && date && time && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-medium mb-2 flex items-center">
                      <Video className="h-4 w-4 mr-2 text-primary" />
                      Google Meet Link
                    </h3>
                    <p className="text-sm mb-2">A Google Meet link will be generated for your virtual meeting:</p>
                    <div className="bg-background p-2 rounded border text-sm font-mono break-all">{googleMeetLink}</div>
                    <p className="text-xs text-muted-foreground mt-2">
                      This link will be shared with {connection?.name} when you send the meeting request.
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="agenda">Meeting Agenda</Label>
                  <Textarea
                    id="agenda"
                    placeholder="What would you like to discuss?"
                    rows={4}
                    value={agenda}
                    onChange={(e) => setAgenda(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/meeting-options">Back</Link>
                </Button>
                <Button onClick={handleSubmit} disabled={!date || !time || (meetingType === "in-person" && !location)}>
                  Send Meeting Request
                </Button>
              </CardFooter>
            </Card>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2">What happens next?</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span>Your meeting request will be sent to {connection?.name}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span>Once accepted, you'll receive a confirmation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span>The meeting will be added to your calendar</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span>You'll be prompted to share feedback after the meeting</span>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

