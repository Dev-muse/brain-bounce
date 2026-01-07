"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, ThumbsUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function TrendingBounces() {
  const trendingPosts = useQuery(api.votes.getTrendingPosts, { limit: 5 });

  if (trendingPosts === undefined) {
    return (
      <Card className="border-primary/10 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-md font-bold uppercase tracking-wider text-muted-foreground/80">
            <TrendingUp className="size-4" />
            Trending
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="size-12 rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (trendingPosts.length === 0) {
    return null;
  }

  return (
    <Card className="border-primary/20 shadow-lg bg-linear-to-br from-background via-background to-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-md font-bold uppercase tracking-wider text-primary">
          <TrendingUp className="size-4 animate-pulse" />
          Trending Now
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {trendingPosts.map((post, index) => (
          <Link
            key={post._id}
            href={`/bounces/${post._id}`}
            className="flex gap-3 group hover:bg-primary/5 -mx-2 px-2 py-2 rounded-xl transition-all duration-300 ease-out"
          >
            <div className="relative size-12 rounded-lg overflow-hidden shrink-0 shadow-sm transition-transform group-hover:scale-105">
              <Image
                src={
                  post.imageUrl ??
                  "https://images.unsplash.com/photo-1761839257961-4dce65b72d99"
                }
                alt={post.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="size-4 text-white" />
              </div>
              <div className="absolute top-0 left-0 bg-primary text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-br-lg">
                {index + 1}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm truncate group-hover:text-primary transition-colors">
                {post.title}
              </h4>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground mt-1 font-medium">
                <span className="flex items-center gap-1 group-hover:text-emerald-500 transition-colors">
                  <ThumbsUp className="size-3" />
                  {post.score > 0 ? `+${post.score}` : post.score}
                </span>
                <span className="uppercase tracking-widest opacity-50">
                  Score
                </span>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
