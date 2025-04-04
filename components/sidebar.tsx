"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bookmark, Home, Menu, MessageSquare, PlusCircle, Search, Settings, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      label: "Home",
      icon: Home,
      href: "/community",
      active: pathname === "/community",
    },
    {
      label: "Explore",
      icon: Search,
      href: "/explore",
      active: pathname === "/explore",
    },
    {
      label: "Connections",
      icon: Users,
      href: "/connections",
      active: pathname === "/connections",
    },
    {
      label: "Messages",
      icon: MessageSquare,
      href: "/messages",
      active: pathname === "/messages",
    },
    {
      label: "Saved",
      icon: Bookmark,
      href: "/saved",
      active: pathname === "/saved",
    },
  ]

  const communities = [
    { id: 1, name: "UX/UI Designers", members: 1250 },
    { id: 2, name: "Tech Entrepreneurs", members: 3420 },
    { id: 3, name: "Web Developers", members: 5680 },
  ]

  const SidebarContent = (
    <div className="flex h-full flex-col gap-4">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/community" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image src="/logo.svg" alt="X-Share Logo" width={24} height={24} />
          <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            X-Share
          </span>
        </Link>
      </div>
      <ScrollArea className="flex-1 overflow-auto">
        <div className="flex flex-col gap-2 p-4">
          {routes.map((route) => (
            <Link key={route.href} href={route.href} onClick={() => setOpen(false)}>
              <Button
                variant={route.active ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  route.active ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                )}
              >
                <route.icon className="h-5 w-5" />
                {route.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="px-4 py-2">
          <h3 className="mb-2 px-4 text-sm font-semibold">My Communities</h3>
          <div className="space-y-1">
            {communities.map((community) => (
              <Link
                key={community.id}
                href={`/community/${community.id}`}
                onClick={() => {
                  setOpen(false)
                }}
              >
                <Button variant="ghost" className="w-full justify-start pl-8 font-normal">
                  {community.name}
                </Button>
              </Link>
            ))}
            <Link href="/join-community">
              <Button variant="ghost" className="w-full justify-start gap-2 text-primary">
                <PlusCircle className="h-4 w-4" />
                Join New Community
              </Button>
            </Link>
          </div>
        </div>
      </ScrollArea>
      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/avatars/vasant.jpg" alt="VASANT JEVENGEKAR" />
            <AvatarFallback>VJ</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium leading-none">VASANT JEVENGEKAR</p>
            <p className="text-xs text-muted-foreground">Product Designer</p>
          </div>
          <Link href="/settings" onClick={() => setOpen(false)}>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <aside className="hidden w-64 border-r md:flex md:flex-col">{SidebarContent}</aside>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          {SidebarContent}
        </SheetContent>
      </Sheet>
    </>
  )
}

