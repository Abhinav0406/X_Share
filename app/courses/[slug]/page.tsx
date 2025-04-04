"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { useToast } from "@/hooks/use-toast"
import { BookOpen, CheckCircle, Clock, PlayCircle, Star, Users } from "lucide-react"
import Link from "next/link"

export default function CoursePage() {
  const params = useParams()
  const slug = params.slug
  const { toast } = useToast()

  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState<any>(null)
  const [enrolled, setEnrolled] = useState(false)

  useEffect(() => {
    // In a real app, fetch the course data from the API
    // For now, we'll simulate it with a timeout
    const fetchCourse = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Mock course data based on slug
        const mockCourses = {
          "uiux-fundamentals": {
            title: "UI/UX Fundamentals",
            instructor: "Emma Wilson",
            instructorRole: "Product Designer at Creative Labs",
            instructorAvatar: "/avatars/emma.jpg",
            duration: "8 weeks",
            level: "Beginner",
            students: 1245,
            rating: 4.8,
            reviews: 128,
            price: "$99",
            description:
              "Learn the fundamentals of UI/UX design and create beautiful, user-friendly interfaces. This course covers design principles, user research, wireframing, prototyping, and more.",
            topics: [
              "Introduction to UI/UX Design",
              "Design Principles and Elements",
              "User Research Methods",
              "Information Architecture",
              "Wireframing and Prototyping",
              "Visual Design Fundamentals",
              "Usability Testing",
              "Design Systems",
            ],
            modules: [
              {
                title: "Introduction to UI/UX Design",
                lessons: [
                  { title: "What is UI/UX Design?", duration: "15 min", completed: true },
                  { title: "The Design Process", duration: "20 min", completed: true },
                  { title: "Tools of the Trade", duration: "25 min", completed: false },
                  { title: "Assignment: Design Analysis", duration: "45 min", completed: false },
                ],
              },
              {
                title: "Design Principles and Elements",
                lessons: [
                  { title: "Core Design Principles", duration: "30 min", completed: false },
                  { title: "Color Theory", duration: "25 min", completed: false },
                  { title: "Typography Fundamentals", duration: "20 min", completed: false },
                  { title: "Assignment: Design Principles in Action", duration: "60 min", completed: false },
                ],
              },
              {
                title: "User Research Methods",
                lessons: [
                  { title: "Understanding Your Users", duration: "20 min", completed: false },
                  { title: "User Interviews", duration: "25 min", completed: false },
                  { title: "Surveys and Questionnaires", duration: "15 min", completed: false },
                  { title: "Assignment: Conduct User Research", duration: "90 min", completed: false },
                ],
              },
            ],
            progress: 12,
          },
          "design-systems": {
            title: "Design Systems Masterclass",
            instructor: "Alex Johnson",
            instructorRole: "UX Designer at Design Co.",
            instructorAvatar: "/avatars/alex.jpg",
            duration: "6 weeks",
            level: "Intermediate",
            students: 876,
            rating: 4.7,
            reviews: 92,
            price: "$129",
            description:
              "Learn how to create and maintain scalable design systems that improve design consistency and development efficiency. This course covers component libraries, documentation, governance, and implementation strategies.",
            topics: [
              "Introduction to Design Systems",
              "Component Libraries",
              "Design Tokens",
              "Documentation",
              "Governance and Maintenance",
              "Implementation Strategies",
              "Measuring Success",
              "Future of Design Systems",
            ],
            modules: [
              {
                title: "Introduction to Design Systems",
                lessons: [
                  { title: "What is a Design System?", duration: "20 min", completed: false },
                  { title: "Benefits of Design Systems", duration: "15 min", completed: false },
                  { title: "Case Studies: Successful Design Systems", duration: "30 min", completed: false },
                  { title: "Assignment: Analyze a Design System", duration: "60 min", completed: false },
                ],
              },
              {
                title: "Component Libraries",
                lessons: [
                  { title: "Atomic Design Methodology", duration: "25 min", completed: false },
                  { title: "Creating Reusable Components", duration: "35 min", completed: false },
                  { title: "Component States and Variants", duration: "30 min", completed: false },
                  { title: "Assignment: Build a Component Library", duration: "90 min", completed: false },
                ],
              },
            ],
            progress: 0,
          },
        }

        // Get course data or use default
        const courseData = mockCourses[slug as string]
        if (!courseData) {
          throw new Error("Course not found")
        }

        setCourse(courseData)
        // Check if user is already enrolled
        setEnrolled(courseData.progress > 0)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load course data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [slug, toast])

  const handleEnroll = () => {
    setEnrolled(true)
    toast({
      title: "Success",
      description: `You've successfully enrolled in ${course.title}`,
    })
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

  if (!course) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 container py-6">
            <div className="flex justify-center items-center h-full flex-col">
              <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
              <p className="text-muted-foreground mb-4">
                The course you're looking for doesn't exist or has been removed.
              </p>
              <Button asChild>
                <Link href="/community">Return to Community</Link>
              </Button>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
                <p className="text-muted-foreground mt-1">{course.description}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course.level}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course.students} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm">
                    {course.rating} ({course.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                  <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{course.instructor}</h3>
                  <p className="text-sm text-muted-foreground">{course.instructorRole}</p>
                </div>
              </div>

              {enrolled && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Progress</CardTitle>
                    <CardDescription>Track your course completion</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{course.progress}% complete</span>
                        <span>
                          {Math.round(
                            (course.progress / 100) *
                              course.modules.reduce((acc, module) => acc + module.lessons.length, 0),
                          )}{" "}
                          / {course.modules.reduce((acc, module) => acc + module.lessons.length, 0)} lessons
                        </span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Continue Learning
                    </Button>
                  </CardFooter>
                </Card>
              )}

              <Tabs defaultValue="curriculum">
                <TabsList>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="curriculum" className="mt-4 space-y-4">
                  {course.modules.map((module, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <CardDescription>{module.lessons.length} lessons</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lessonIndex}
                              className={`flex items-center justify-between p-3 rounded-lg ${lesson.completed ? "bg-primary/10" : "hover:bg-muted"}`}
                            >
                              <div className="flex items-center gap-3">
                                {lesson.completed ? (
                                  <CheckCircle className="h-5 w-5 text-primary" />
                                ) : (
                                  <PlayCircle className="h-5 w-5 text-muted-foreground" />
                                )}
                                <span className={lesson.completed ? "font-medium" : ""}>{lesson.title}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="overview" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p>{course.description}</p>

                        <div>
                          <h3 className="font-medium mb-2">What You'll Learn</h3>
                          <ul className="space-y-1">
                            {course.topics.map((topic, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Course Details</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Duration</p>
                              <p className="font-medium">{course.duration}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Level</p>
                              <p className="font-medium">{course.level}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Students</p>
                              <p className="font-medium">{course.students}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Last Updated</p>
                              <p className="font-medium">June 2023</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Student Reviews</CardTitle>
                      <CardDescription>
                        {course.reviews} reviews • {course.rating} average rating
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-2xl font-bold">
                            {course.rating}
                            <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                          </div>
                          <div className="flex-1">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <div className="text-sm">5 stars</div>
                                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                  <div className="bg-yellow-400 h-full rounded-full" style={{ width: "70%" }}></div>
                                </div>
                                <div className="text-sm">70%</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="text-sm">4 stars</div>
                                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                  <div className="bg-yellow-400 h-full rounded-full" style={{ width: "20%" }}></div>
                                </div>
                                <div className="text-sm">20%</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="text-sm">3 stars</div>
                                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                  <div className="bg-yellow-400 h-full rounded-full" style={{ width: "7%" }}></div>
                                </div>
                                <div className="text-sm">7%</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="text-sm">2 stars</div>
                                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                  <div className="bg-yellow-400 h-full rounded-full" style={{ width: "2%" }}></div>
                                </div>
                                <div className="text-sm">2%</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="text-sm">1 star</div>
                                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                  <div className="bg-yellow-400 h-full rounded-full" style={{ width: "1%" }}></div>
                                </div>
                                <div className="text-sm">1%</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4 pt-4">
                          <div className="border-t pt-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/avatars/michael.jpg" alt="Michael Chen" />
                                <AvatarFallback>MC</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">Michael Chen</div>
                                <div className="text-xs text-muted-foreground">2 weeks ago</div>
                              </div>
                              <div className="ml-auto flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm">
                              This course is amazing! The instructor explains complex concepts in a simple way, and the
                              exercises are very practical. I've already started applying what I learned to my projects.
                            </p>
                          </div>

                          <div className="border-t pt-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/avatars/emma.jpg" alt="Emma Wilson" />
                                <AvatarFallback>EW</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">Emma Wilson</div>
                                <div className="text-xs text-muted-foreground">1 month ago</div>
                              </div>
                              <div className="ml-auto flex">
                                {[1, 2, 3, 4].map((star) => (
                                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                ))}
                                <Star className="h-4 w-4 text-yellow-400" />
                              </div>
                            </div>
                            <p className="text-sm">
                              Great content and well-structured course. I would have liked more advanced examples, but
                              overall it's a solid introduction to the topic.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="text-3xl font-bold">{course.price}</div>
                    {!enrolled ? (
                      <Button className="w-full" onClick={handleEnroll}>
                        Enroll Now
                      </Button>
                    ) : (
                      <Button className="w-full">
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Continue Learning
                      </Button>
                    )}
                    <div className="text-sm text-muted-foreground text-center">30-day money-back guarantee</div>

                    <div className="space-y-2 pt-4">
                      <h3 className="font-medium">This course includes:</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>
                            {course.modules.reduce((acc, module) => acc + module.lessons.length, 0)} on-demand video
                            lessons
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>Downloadable resources</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>Practical assignments</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>Certificate of completion</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>Lifetime access</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Share This Course</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center gap-4">
                    <Button variant="outline" size="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-blue-600"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-blue-400"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-blue-700"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

