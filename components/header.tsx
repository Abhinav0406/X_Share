"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Bell, ChevronDown, LogOut, Search, Settings, User } from "lucide-react"
import Image from "next/image"

export function Header() {
  const [showSearch, setShowSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const notifications = [
    {
      id: 1,
      avatar: "/avatars/alex.jpg",
      name: "Alex Johnson",
      action: "liked your post",
      time: "2 hours ago",
      profileUrl: "/profile/alex-johnson",
    },
    {
      id: 2,
      avatar: "/avatars/sarah.jpg",
      name: "Sarah Williams",
      action: "sent you a connection request",
      time: "5 hours ago",
      profileUrl: "/profile/sarah-williams",
    },
    {
      id: 3,
      avatar: "/avatars/michael.jpg",
      name: "Michael Chen",
      action: "commented on your post",
      time: "1 day ago",
      profileUrl: "/profile/michael-chen",
    },
  ]

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <div className="hidden items-center md:flex">
        <Link href="/community" className="flex items-center gap-2 font-semibold">
          <Image src="/logo.svg" alt="X-Share Logo" width={24} height={24} />
          <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">X-Share</span>
        </Link>
      </div>

      {showSearch ? (
        <div className="flex flex-1 items-center gap-2">
          <Input placeholder="Search X-Share..." className="h-9" />
          <Button variant="ghost" size="icon" onClick={() => setShowSearch(false)}>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-1 items-center gap-4">
          <Button variant="ghost" size="icon" className="shrink-0" onClick={() => setShowSearch(true)}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <div className="flex-1" />
        </div>
      )}

      <div className="flex items-center gap-2">
        <Popover open={showNotifications} onOpenChange={setShowNotifications}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary" />
              <span className="sr-only">Notifications</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Notifications</h4>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-sm">
                  Mark all as read
                </Button>
              </div>
            </div>
            <div className="max-h-80 overflow-auto">
              {notifications.map((notification) => (
                <Link
                  key={notification.id}
                  href={notification.profileUrl}
                  className="flex items-start gap-3 p-4 hover:bg-muted"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={notification.avatar} alt={notification.name} />
                    <AvatarFallback>{notification.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{notification.name}</span> {notification.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="border-t p-2">
              <Link href="/notifications">
                <Button variant="ghost" className="w-full justify-center">
                  View all notifications
                </Button>
              </Link>
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/vasant.jpg" alt="VASANT JEVENGEKAR" />
                <AvatarFallback>VJ</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center cursor-pointer w-full">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center cursor-pointer w-full">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center cursor-pointer" onClick={() => (window.location.href = "/")}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

