"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Globe, Link2 } from "lucide-react"

interface LinkAttachmentModalProps {
  isOpen: boolean
  onClose: () => void
  onLinkAttach: (url: string, title?: string) => void
}

export default function LinkAttachmentModal({ isOpen, onClose, onLinkAttach }: LinkAttachmentModalProps) {
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [isValidUrl, setIsValidUrl] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validateUrl = (input: string) => {
    try {
      // Simple URL validation
      new URL(input)
      setIsValidUrl(true)
      return true
    } catch (e) {
      setIsValidUrl(false)
      return false
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setUrl(input)
    validateUrl(input)
  }

  const handleAttach = () => {
    if (validateUrl(url)) {
      setIsLoading(true)

      // Simulate fetching metadata
      setTimeout(() => {
        setIsLoading(false)
        onLinkAttach(url, title || undefined)
        handleClose()
      }, 1000)
    }
  }

  const handleClose = () => {
    setUrl("")
    setTitle("")
    setIsValidUrl(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Link</DialogTitle>
          <DialogDescription>Share a link with your post</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="url"
                placeholder="https://example.com"
                className="pl-10"
                value={url}
                onChange={handleUrlChange}
              />
            </div>
            {url && !isValidUrl && <p className="text-sm text-destructive">Please enter a valid URL</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title (optional)</Label>
            <Input id="title" placeholder="Link title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          {isValidUrl && (
            <div className="p-3 border rounded-md bg-muted/50">
              <div className="flex items-center gap-2">
                <Link2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{url}</span>
              </div>
              {title && <p className="text-sm mt-1">{title}</p>}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAttach} disabled={!isValidUrl || isLoading}>
            {isLoading ? "Processing..." : "Add Link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

