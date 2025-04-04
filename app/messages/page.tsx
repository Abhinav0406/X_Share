"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Edit, Search, Send, Smile, Paperclip } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(0)
  const [messageText, setMessageText] = useState("")

  const contacts = [
    {
      id: 0,
      name: "Sarah Williams",
      avatar: "/avatars/sarah.jpg",
      status: "online",
      lastMessage: "That sounds great! When would you like to meet?",
      time: "10:42 AM",
      unread: 2,
    },
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "/avatars/alex.jpg",
      status: "offline",
      lastMessage: "Thanks for sharing that article. Very insightful!",
      time: "Yesterday",
      unread: 0,
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/avatars/michael.jpg",
      status: "online",
      lastMessage: "I'll send you the project details tomorrow.",
      time: "Yesterday",
      unread: 0,
    },
    {
      id: 3,
      name: "Emma Wilson",
      avatar: "/avatars/emma.jpg",
      status: "offline",
      lastMessage: "Let's catch up next week!",
      time: "Monday",
      unread: 0,
    },
  ]

  // Add real-time messaging functionality
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Sarah Williams",
      content: "Hi there! I saw your post about UX design principles. I'm working on a similar project.",
      time: "10:30 AM",
      isMe: false,
    },
    {
      id: 2,
      sender: "Me",
      content: "Hey Sarah! Thanks for reaching out. What kind of project are you working on?",
      time: "10:32 AM",
      isMe: true,
    },
    {
      id: 3,
      sender: "Sarah Williams",
      content: "I'm redesigning a financial app's dashboard. Trying to make complex data more accessible to users.",
      time: "10:35 AM",
      isMe: false,
    },
    {
      id: 4,
      sender: "Me",
      content:
        "That sounds interesting! I've worked on similar projects before. Would you like to discuss it in more detail?",
      time: "10:38 AM",
      isMe: true,
    },
    {
      id: 5,
      sender: "Sarah Williams",
      content: "That would be great! I'd love to get your insights and maybe even collaborate.",
      time: "10:40 AM",
      isMe: false,
    },
    {
      id: 6,
      sender: "Me",
      content: "I'm definitely open to collaboration. We could set up a meeting to discuss ideas.",
      time: "10:41 AM",
      isMe: true,
    },
    {
      id: 7,
      sender: "Sarah Williams",
      content: "That sounds great! When would you like to meet?",
      time: "10:42 AM",
      isMe: false,
    },
  ])

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const now = new Date()
      const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

      const newMessage = {
        id: messages.length + 1,
        sender: "Me",
        content: messageText,
        time: timeString,
        isMe: true,
      }

      setMessages([...messages, newMessage])
      setMessageText("")

      // Simulate a response after a short delay
      setTimeout(() => {
        const responses = [
          "That sounds interesting! Tell me more.",
          "I agree with your point. What do you think about...",
          "Thanks for sharing that information!",
          "I'll look into that and get back to you soon.",
          "Great idea! Let's discuss it further.",
        ]

        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        const responseMessage = {
          id: messages.length + 2,
          sender: contacts[activeChat].name,
          content: randomResponse,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isMe: false,
        }

        setMessages((prev) => [...prev, responseMessage])
      }, 2000)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 container py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-10rem)]">
            {/* Contacts List */}
            <Card className="md:col-span-1 overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold">Messages</h2>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search messages" className="pl-10" />
                </div>
              </div>
              <ScrollArea className="h-[calc(100vh-14rem)]">
                <div className="p-2">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted transition-colors ${
                        activeChat === contact.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setActiveChat(contact.id)}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={contact.avatar} alt={contact.name} />
                          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {contact.status === "online" && (
                          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-background"></span>
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium truncate">{contact.name}</h3>
                          <span className="text-xs text-muted-foreground">{contact.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                      </div>
                      {contact.unread > 0 && (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          {contact.unread}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            {/* Chat Area */}
            <Card className="md:col-span-2 flex flex-col overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={contacts[activeChat].avatar} alt={contacts[activeChat].name} />
                    <AvatarFallback>{contacts[activeChat].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{contacts[activeChat].name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {contacts[activeChat].status === "online" ? (
                        <span className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span> Online
                        </span>
                      ) : (
                        "Offline"
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.isMe ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p>{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${message.isMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button variant="ghost" size="icon">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

