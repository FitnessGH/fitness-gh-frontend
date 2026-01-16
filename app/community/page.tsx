"use client"

import { Suspense, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PostCard } from "@/components/community/post-card"
import { Plus, Search, Users, Lock } from "lucide-react"

interface CommunityGroup {
  id: string
  name: string
  description: string
  members: number
  posts: number
  icon: string
  isPrivate: boolean
  isMember: boolean
}

interface Post {
  id: string
  author: string
  avatar: string
  group: string
  content: string
  timestamp: string
  likes: number
  replies: number
  image?: string
}

const mockGroups: CommunityGroup[] = [
  {
    id: "1",
    name: "General Discussion",
    description: "Share thoughts, ideas, and general fitness discussion",
    members: 234,
    posts: 456,
    icon: "💬",
    isPrivate: false,
    isMember: true,
  },
  {
    id: "2",
    name: "Workout Tips",
    description: "Share workout routines, exercises, and training advice",
    members: 189,
    posts: 234,
    icon: "💪",
    isPrivate: false,
    isMember: true,
  },
  {
    id: "3",
    name: "Nutrition & Diet",
    description: "Discuss nutrition, meal plans, and healthy eating",
    members: 156,
    posts: 178,
    icon: "🥗",
    isPrivate: false,
    isMember: false,
  },
  {
    id: "4",
    name: "Accountability Partners",
    description: "Find your fitness buddy and stay motivated together",
    members: 98,
    posts: 145,
    icon: "🤝",
    isPrivate: true,
    isMember: true,
  },
]

const mockPosts: Post[] = [
  {
    id: "1",
    author: "Sarah M.",
    avatar: "SM",
    group: "Workout Tips",
    content: "Just completed my first 5K run without stopping! 7 months of consistent training paid off!",
    timestamp: "2h ago",
    likes: 24,
    replies: 5,
    image: "🏃",
  },
  {
    id: "2",
    author: "Mike K.",
    avatar: "MK",
    group: "General Discussion",
    content: "New spinning class starting next Monday at 6 PM! Who's interested?",
    timestamp: "4h ago",
    likes: 18,
    replies: 3,
  },
  {
    id: "3",
    author: "Emma W.",
    avatar: "EW",
    group: "Nutrition & Diet",
    content: "Share your favorite post-workout meal ideas! I need some inspiration.",
    timestamp: "6h ago",
    likes: 42,
    replies: 12,
    image: "🍽️",
  },
  {
    id: "4",
    author: "Alex C.",
    avatar: "AC",
    group: "Accountability Partners",
    content: "Looking for someone to do morning gym sessions with starting Feb 1st!",
    timestamp: "1d ago",
    likes: 15,
    replies: 7,
  },
]

function CommunityContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [newPostContent, setNewPostContent] = useState("")

  const filteredGroups = mockGroups.filter((group) => group.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredPosts = selectedGroup ? mockPosts.filter((post) => post.group === selectedGroup) : mockPosts

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      setNewPostContent("")
      setShowNewPostForm(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Community</h1>
            <p className="text-muted-foreground">Connect with gym members and share your fitness journey</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <Plus className="w-4 h-4" />
            New Post
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Groups */}
          <div className="lg:col-span-1">
            <Card className="p-4 border-border/50 sticky top-6 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Groups</h2>

              {/* Search Groups */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search groups..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm"
                />
              </div>

              {/* Groups List */}
              <div className="space-y-2">
                {filteredGroups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => setSelectedGroup(group.name)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedGroup === group.name
                        ? "bg-primary/10 border border-primary text-primary"
                        : "bg-muted/30 border border-border hover:border-primary/50 text-foreground"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{group.icon}</span>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm line-clamp-1">{group.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          {group.isPrivate && <Lock className="w-3 h-3" />}
                          <Users className="w-3 h-3" />
                          {group.members}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Group Stats */}
              {selectedGroup && (
                <Card className="p-3 bg-muted/30 border-border/50">
                  <div className="space-y-2 text-xs">
                    {mockGroups.map((group) => {
                      if (group.name === selectedGroup) {
                        return (
                          <div key={group.id}>
                            <p className="text-muted-foreground mb-2">{group.description}</p>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Members</span>
                              <span className="font-semibold text-foreground">{group.members}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Posts</span>
                              <span className="font-semibold text-foreground">{group.posts}</span>
                            </div>
                          </div>
                        )
                      }
                    })}
                  </div>
                </Card>
              )}
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-4">
            {/* New Post Form */}
            {showNewPostForm && (
              <Card className="p-4 border-border/50">
                <div className="space-y-4">
                  <textarea
                    placeholder="What's on your mind?"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground resize-none focus:outline-none focus:border-primary"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setShowNewPostForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreatePost} className="flex-1 bg-primary hover:bg-primary/90">
                      Post
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Posts Feed */}
            <div className="space-y-4">
              {filteredPosts.length === 0 ? (
                <Card className="p-8 border-border/50 text-center">
                  <p className="text-muted-foreground">No posts yet in this group.</p>
                  <Button onClick={() => setShowNewPostForm(true)} className="mt-4 bg-primary hover:bg-primary/90">
                    Be the first to post!
                  </Button>
                </Card>
              ) : (
                filteredPosts.map((post) => <PostCard key={post.id} {...post} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CommunityPage() {
  return (
    <Suspense fallback={null}>
      <CommunityContent />
    </Suspense>
  )
}
