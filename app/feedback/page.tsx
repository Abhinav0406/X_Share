"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Check, Share2, Star } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import Link from "next/link"

export default function FeedbackPage() {
  const [rating, setRating] = useState<string | undefined>(undefined)
  const [feedback, setFeedback] = useState("")
  const [takeaways, setTakeaways] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [shareContent, setShareContent] = useState("")

  const connection = {
    name: "Sarah Williams",
    role: "Software Engineer",
    company: "Tech Solutions",
    avatar: "/avatars/sarah.jpg",
  }

  const handleSubmit = () => {
    // In a real app, you would submit the feedback to your backend here
    setIsSubmitted(true)
  }

  const handleShare = () => {
    // In a real app, you would share the experience to the community feed
    setIsDialogOpen(false)
    // Redirect to community page after sharing
    window.location.href = "/community"
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 container py-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Meeting Feedback</h1>
              <p className="text-muted-foreground">Share your experience and feedback from your meeting</p>
            </div>

            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <Avatar className="h-12 w-12">
                <AvatarImage src={connection.avatar} alt={connection.name} />
                <AvatarFallback>SW</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">Meeting with {connection.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {connection.role} at {connection.company}
                </p>
              </div>
            </div>

            {!isSubmitted ? (
              <Card>
                <CardHeader>
                  <CardTitle>Meeting Feedback</CardTitle>
                  <CardDescription>Your feedback helps improve the X-Share community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>How would you rate your meeting?</Label>
                    <RadioGroup value={rating} onValueChange={setRating} className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <Label
                          key={value}
                          htmlFor={`rating-${value}`}
                          className={cn(
                            "flex h-16 w-16 flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                            rating === value.toString() && "border-primary",
                          )}
                        >
                          <RadioGroupItem value={value.toString()} id={`rating-${value}`} className="sr-only" />
                          <Star
                            className={cn(
                              "h-6 w-6",
                              rating === value.toString() ? "fill-primary text-primary" : "fill-none",
                            )}
                          />
                          <span className="mt-1 text-xs">{value}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feedback">What went well? What could be improved?</Label>
                    <Textarea
                      id="feedback"
                      placeholder="Share your thoughts about the meeting"
                      rows={4}
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="takeaways">Key takeaways from the meeting</Label>
                    <Textarea
                      id="takeaways"
                      placeholder="What were your main learnings or action items?"
                      rows={3}
                      value={takeaways}
                      onChange={(e) => setTakeaways(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href="/community">Skip</Link>
                  </Button>
                  <Button onClick={handleSubmit} disabled={!rating}>
                    Submit Feedback
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card className="border-green-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <CardTitle>Feedback Submitted</CardTitle>
                  </div>
                  <CardDescription>Thank you for sharing your feedback!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Your feedback has been recorded and will help improve the X-Share community.</p>

                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Would you like to share your experience?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Sharing your experience helps others in the community learn and grow.
                    </p>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="gap-2">
                          <Share2 className="h-4 w-4" />
                          Share Experience
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                          <DialogTitle>Share Your Experience</DialogTitle>
                          <DialogDescription>
                            Post about your meeting with {connection.name} to the community feed
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <Textarea
                            placeholder="What would you like to share about your meeting?"
                            className="min-h-[120px]"
                            value={shareContent}
                            onChange={(e) => setShareContent(e.target.value)}
                          />
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleShare}>Post to Community</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/community">Return to Community</Link>
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

