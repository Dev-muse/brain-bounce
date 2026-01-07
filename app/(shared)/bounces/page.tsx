import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import { VoteButtons } from "@/components/web/VoteButtons";
import { TrendingBounces } from "@/components/web/TrendingBounces";

// force-static | force-dynamic | auto | error

// export const revalidate = 3600; //current in seconds:  revalidation time based or on demand
// 0 | false | number

export const metadata: Metadata = {
  title: "Bounces | Brainbounce",
  description: "Check out our latest bounces",
  category: "Ideation",
  authors: [{ name: "Rahman Muse" }],
  keywords: ["Bounces", "Ideation", "Brainstorming", "Innovation"],
};

const BouncesPage = async () => {
  return (
    <section className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Bounces
        </h1>
        <p className="text-gray-600 text-xl pt-4 mx-auto max-w-2xl">
          Check out our latest bounces
        </p>
      </div>
      <Suspense fallback={<SkeletonPosts />}>
        <LoadPosts />
      </Suspense>
    </section>
  );
};

async function LoadPosts() {
  "use cache";
  cacheLife("hours");
  cacheTag("posts");

  const posts = await fetchQuery(api.posts.getPosts);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <div className="grid gap-6 md:grid-cols-2">
          {posts?.map((post) => (
            <Card
              key={post._id}
              className="pt-0 group hover:shadow-xl transition-all duration-500 border-primary/5 hover:border-primary/20 bg-card overflow-hidden"
            >
              <Link href={`/bounces/${post._id}`}>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={
                      post.imageUrl ??
                      "https://images.unsplash.com/photo-1761839257961-4dce65b72d99"
                    }
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
              <CardHeader className="pb-2">
                <Link href={`/bounces/${post._id}`}>
                  <CardTitle className="text-xl font-bold hover:text-primary transition-colors line-clamp-1">
                    {post.title}
                  </CardTitle>
                </Link>
                <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                  {post.content}
                </p>
              </CardHeader>
              <CardFooter className="flex items-center justify-between border-t bg-muted/30 pt-4">
                <VoteButtons
                  postId={post._id}
                  initialUpvotes={post.upvotes}
                  initialDownvotes={post.downvotes}
                />
                <Link
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                    className: "group/btn",
                  })}
                  href={`/bounces/${post._id}`}
                >
                  Details
                  <ArrowRight className="ml-1 size-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <aside className="w-full lg:w-80 shrink-0 space-y-6">
        <TrendingBounces />
      </aside>
    </div>
  );
}

const SkeletonPosts = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton key={index} className="h-48 w-full rounded-t-lg" />
            <div className="space-y-2 flex flex-col">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
    </div>
  );
};
export default BouncesPage;
