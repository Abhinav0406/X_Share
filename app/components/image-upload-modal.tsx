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
import { Upload } from "lucide-react"

interface ImageUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onImageSelect: (imageUrl: string) => void
}

export default function ImageUploadModal({ isOpen, onClose, onImageSelect }: ImageUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Sample images for quick selection
  const sampleImages = [
    "/post-images/design-system.jpg",
    "/post-images/article.jpg",
    "/community-images/ux-ui.jpg",
    "/community-images/entrepreneurs.jpg",
    "/community-images/developers.jpg",
    "/community-images/product.jpg",
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)

      // Create a preview URL
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = () => {
    if (previewUrl) {
      onImageSelect(previewUrl)
      handleClose()
    }
  }

  const handleSampleImageSelect = (imageUrl: string) => {
    setPreviewUrl(imageUrl)
    setSelectedFile(null)
  }

  const handleClose = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>Select an image to add to your post</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="image-upload" className="cursor-pointer">
              <div className="flex flex-col items-center gap-1.5 p-4 border-2 border-dashed rounded-lg hover:bg-muted">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Upload Image</span>
              </div>
              <Input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </Label>

            <div className="flex-1">
              <p className="text-sm font-medium mb-2">Or select from samples:</p>
              <div className="grid grid-cols-3 gap-2">
                {sampleImages.map((image, index) => (
                  <div
                    key={index}
                    className={`relative h-16 w-16 rounded-md overflow-hidden cursor-pointer border-2 ${previewUrl === image ? "border-primary" : "border-transparent"}`}
                    onClick={() => handleSampleImageSelect(image)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Sample ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {previewUrl && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Preview:</p>
              <div className="relative h-[200px] w-full rounded-md overflow-hidden border">
                <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="h-full w-full object-contain" />
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!previewUrl}>
            Add to Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

