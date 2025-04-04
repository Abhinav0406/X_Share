import Link from "next/link"
import { Button } from "@/components/ui/button"
import LoginForm from "@/components/auth/login-form"
import Image from "next/image"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 flex flex-col">
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              X-Share
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">New to X-Share?</div>
            <Link href="/onboarding">
              <Button variant="outline">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-6xl py-12 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-center">
          <div className="hidden md:flex flex-col space-y-4">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground">
              Sign in to connect with your network, share ideas, and transform them into action.
            </p>
            <div className="relative h-[300px] w-full">
              <Image src="/network-image.svg" alt="X-Share Network" fill className="object-contain" />
            </div>
          </div>
          <div className="flex justify-center">
            <LoginForm />
          </div>
        </div>
      </main>
    </div>
  )
}

