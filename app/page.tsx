"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Lightbulb, Share2 } from "lucide-react"
import Image from "next/image"
import Footer from "@/components/footer"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, Text, Float, PerspectiveCamera } from "@react-three/drei"

function NetworkNode({ position, size = 1, color = "#8B5CF6", label, labelColor = "white" }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
      </mesh>
      {label && (
        <Text position={[0, size + 0.5, 0]} fontSize={0.5} color={labelColor} anchorX="center" anchorY="middle">
          {label}
        </Text>
      )}
    </group>
  )
}

function Connection({ start, end, thickness = 0.1, color = "#3B82F6" }) {
  // Calculate the midpoint and direction
  const midX = (start[0] + end[0]) / 2
  const midY = (start[1] + end[1]) / 2
  const midZ = (start[2] + end[2]) / 2

  const dirX = end[0] - start[0]
  const dirY = end[1] - start[1]
  const dirZ = end[2] - start[2]

  // Calculate length
  const length = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ)

  // Calculate rotation
  const rotationY = Math.atan2(dirX, dirZ)
  const rotationZ = Math.atan2(dirY, Math.sqrt(dirX * dirX + dirZ * dirZ))

  return (
    <mesh position={[midX, midY, midZ]} rotation={[0, rotationY, rotationZ]}>
      <cylinderGeometry args={[thickness, thickness, length, 8]} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.5} />
    </mesh>
  )
}

function NetworkGraph() {
  const nodes = [
    { position: [0, 0, 0], size: 1.2, label: "X", color: "#8B5CF6" },
    { position: [-4, 2, -2], size: 0.8, label: "Design" },
    { position: [4, 1, -3], size: 0.9, label: "Tech" },
    { position: [-3, -2, -1], size: 0.7, label: "Business" },
    { position: [3, -1, -2], size: 0.8, label: "Marketing" },
    { position: [0, 3, -4], size: 0.9, label: "Product" },
    { position: [-2, -3, -3], size: 0.7 },
    { position: [5, -2, -1], size: 0.6 },
  ]

  const connections = [
    { start: [0, 0, 0], end: [-4, 2, -2] },
    { start: [0, 0, 0], end: [4, 1, -3] },
    { start: [0, 0, 0], end: [-3, -2, -1] },
    { start: [0, 0, 0], end: [3, -1, -2] },
    { start: [0, 0, 0], end: [0, 3, -4] },
    { start: [0, 0, 0], end: [-2, -3, -3] },
    { start: [0, 0, 0], end: [5, -2, -1] },
    { start: [-4, 2, -2], end: [0, 3, -4] },
    { start: [4, 1, -3], end: [5, -2, -1] },
    { start: [-3, -2, -1], end: [-2, -3, -3] },
  ]

  return (
    <>
      {nodes.map((node, i) => (
        <NetworkNode key={i} {...node} />
      ))}
      {connections.map((conn, i) => (
        <Connection key={i} {...conn} />
      ))}
    </>
  )
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <NetworkGraph />
      </Float>
      <Environment preset="city" />
    </>
  )
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="X-Share Logo" width={32} height={32} />
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              X-Share
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/signin">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/onboarding">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                  Transform Ideas into{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    Action
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  X-Share bridges visionary thinkers with proven solvers, enabling seamless interactions and rapid
                  problem resolution.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/onboarding">
                    <Button size="lg" className="gap-2">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/community">
                    <Button size="lg" variant="outline" className="gap-2">
                      Explore Community
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                <Canvas>
                  <Scene />
                </Canvas>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How X-Share Works</h2>
              <p className="mt-4 text-xl text-muted-foreground">
                A revolutionary approach to collaborative problem-solving
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Connect</h3>
                <p className="text-muted-foreground mt-2">
                  Find and connect with experts and visionaries in your field
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Collaborate</h3>
                <p className="text-muted-foreground mt-2">
                  Share ideas, solve problems, and create innovative solutions together
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Share2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Execute</h3>
                <p className="text-muted-foreground mt-2">
                  Transform ideas into measurable results and real-world impact
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="relative h-[400px] w-full overflow-hidden rounded-lg order-2 lg:order-1">
                <Canvas>
                  <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                  <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
                    <mesh>
                      <torusKnotGeometry args={[2, 0.5, 128, 32]} />
                      <meshStandardMaterial color="#8B5CF6" roughness={0.3} metalness={0.7} />
                    </mesh>
                  </Float>
                  <Environment preset="sunset" />
                </Canvas>
              </div>
              <div className="space-y-4 order-1 lg:order-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join Our Global Network</h2>
                <p className="text-xl text-muted-foreground">
                  X-Share connects you with a diverse community of innovators, mentors, and problem-solvers from around
                  the world.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Access to industry experts and mentors</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Real-time problem-solving and feedback</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Personalized matching based on your expertise</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Secure communication for sharing ideas</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <Link href="/onboarding">
                    <Button size="lg">Join Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

