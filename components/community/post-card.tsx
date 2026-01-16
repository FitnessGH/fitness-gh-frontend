"use client"

import { Card } from "@/components/ui/card"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { useState } from "react"

interface PostCardProps {
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

export function PostCard({ id, author, avatar, group, content, timestamp, likes, replies, image }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <Card className="p-4 border-border/50 hover:border-primary/50 transition-colors">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-primary">{avatar}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">{author}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{group}</span>
                <span>•</span>
                <span>{timestamp}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-foreground mb-3">{content}</p>

      {image && <div className="text-3xl mb-3 text-center">{image}</div>}

      <div className="flex items-center gap-4 pt-3 border-t border-border text-xs text-muted-foreground">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 hover:text-primary transition-colors ${isLiked ? "text-red-500" : ""}`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          <span>{likeCount}</span>
        </button>
        <button className="flex items-center gap-1 hover:text-primary transition-colors">
          <MessageCircle className="w-4 h-4" />
          <span>{replies}</span>
        </button>
        <button className="flex items-center gap-1 hover:text-primary transition-colors ml-auto">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </Card>
  )
}
