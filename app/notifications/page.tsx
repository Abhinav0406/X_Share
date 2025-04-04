"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // In a real app, fetch notifications from the API
    // For now, we'll simulate it with a timeout
    const fetchNotifications = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Mock notifications data
        setNotifications([
          {
            id: 1,
            type: "like",
            avatar: "/avatars/alex.jpg",
            name: "Alex Johnson",
            action: "liked your post",
            time: "2 hours ago",
            read: false,
            profileUrl: "/profile/alex-johnson",
          },
          {
            id: 2,
            type: "connection",
            avatar: "/avatars/sarah.jpg",
            name: "Sarah Williams",
            action: "sent you a connection request",
            time: "5 hours ago",
            read: false,
            profileUrl: "/profile/sarah-williams",
          },
          {
            id: 3,
            type: "comment",
            avatar: "/avatars/michael.jpg",
            name: "Michael Chen",
            action: "commented on your post",
            time: "1 day ago",
            read: true,
            profileUrl: "/profile/michael-chen",
          },
          {
            id: 4,
            type: "meeting",
            avatar: "/avatars/emma.jpg",
            name: "Emma Wilson",
            action: "accepted your meeting request",
            time: "2 days ago",
            read: true,
            profileUrl: "/profile/emma-wilson",
          },
          {
            id: 5,
            type: "mention",
            avatar: "/avatars/david.jpg",
            name: "David Kim",
            action: "mentioned you in a comment",
            time: "3 days ago",
            read: true,
            profileUrl: "/profile/david-kim",
          },
        ])
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load notifications",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [toast])

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )

    toast({
      title: "Success",
      description: "All notifications marked as read",
    })
  }

  const unreadCount = notifications.filter((notification) => !notification.read).length

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
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
                <p className="text-muted-foreground">
                  {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : "No new notifications"}
                </p>
              </div>
              {unreadCount > 0 && (
                <Button variant="outline" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              )}
            </div>

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="connections">Connections</TabsTrigger>
                <TabsTrigger value="mentions">Mentions</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>All Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <Link
                            key={notification.id}
                            href={notification.profileUrl}
                            className={`flex items-start gap-4 p-3 rounded-lg hover:bg-muted ${!notification.read ? "bg-muted/50" : ""}`}
                          >
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={notification.avatar} alt={notification.name} />
                              <AvatarFallback>{notification.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className={`text-sm ${!notification.read ? "font-medium" : ""}`}>
                                <span className="font-medium">{notification.name}</span> {notification.action}
                              </p>
                              <p className="text-xs text-muted-foreground">{notification.time}</p>
                            </div>
                            {!notification.read && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                          </Link>
                        ))
                      ) : (
                        <p className="text-center py-4 text-muted-foreground">No notifications</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="unread" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Unread Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {notifications.filter((n) => !n.read).length > 0 ? (
                        notifications
                          .filter((n) => !n.read)
                          .map((notification) => (
                            <Link
                              key={notification.id}
                              href={notification.profileUrl}
                              className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted bg-muted/50"
                            >
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={notification.avatar} alt={notification.name} />
                                <AvatarFallback>{notification.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="text-sm font-medium">
                                  <span className="font-medium">{notification.name}</span> {notification.action}
                                </p>
                                <p className="text-xs text-muted-foreground">{notification.time}</p>
                              </div>
                              <div className="h-2 w-2 rounded-full bg-primary"></div>
                            </Link>
                          ))
                      ) : (
                        <p className="text-center py-4 text-muted-foreground">No unread notifications</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="connections" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Connection Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {notifications.filter((n) => n.type === "connection").length > 0 ? (
                        notifications
                          .filter((n) => n.type === "connection")
                          .map((notification) => (
                            <Link
                              key={notification.id}
                              href={notification.profileUrl}
                              className={`flex items-start gap-4 p-3 rounded-lg hover:bg-muted ${!notification.read ? "bg-muted/50" : ""}`}
                            >
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={notification.avatar} alt={notification.name} />
                                <AvatarFallback>{notification.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className={`text-sm ${!notification.read ? "font-medium" : ""}`}>
                                  <span className="font-medium">{notification.name}</span> {notification.action}
                                </p>
                                <p className="text-xs text-muted-foreground">{notification.time}</p>
                              </div>
                              {!notification.read && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                            </Link>
                          ))
                      ) : (
                        <p className="text-center py-4 text-muted-foreground">No connection notifications</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mentions" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Mention Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {notifications.filter((n) => n.type === "mention").length > 0 ? (
                        notifications
                          .filter((n) => n.type === "mention")
                          .map((notification) => (
                            <Link
                              key={notification.id}
                              href={notification.profileUrl}
                              className={`flex items-start gap-4 p-3 rounded-lg hover:bg-muted ${!notification.read ? "bg-muted/50" : ""}`}
                            >
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={notification.avatar} alt={notification.name} />
                                <AvatarFallback>{notification.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className={`text-sm ${!notification.read ? "font-medium" : ""}`}>
                                  <span className="font-medium">{notification.name}</span> {notification.action}
                                </p>
                                <p className="text-xs text-muted-foreground">{notification.time}</p>
                              </div>
                              {!notification.read && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                            </Link>
                          ))
                      ) : (
                        <p className="text-center py-4 text-muted-foreground">No mention notifications</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

