import PostList from "@/components/posts/post-list"

export default function FeedPage() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-2xl font-bold mb-6">Your Feed</h1>
      <PostList />
    </div>
  )
}

