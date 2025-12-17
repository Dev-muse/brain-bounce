import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Separator } from "@/components/ui/separator";
import CommentSection from "@/components/web/CommentSection";

interface BouncePostIdProps {
  params: Promise<{ bounceId: Id<"posts"> }>;
}

const BouncePostId = async ({ params }: BouncePostIdProps) => {
  const { bounceId } = await params;

  const post = await fetchQuery(api.posts.getPostById, { postId: bounceId });

  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 relative animate-in fade-in duration-300 ease-in-out">
      <Link
        className={buttonVariants({
          variant: "ghost",
          className: "hover:bg-transparent mb-4",
        })}
        href="/bounces"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Bounces{" "}
      </Link>
      <div className="relative w-full h-[800px] mb-8 rounded-xl overflow-hidden shadow-sm">
        <Image
          src={
            post.imageUrl ??
            "https://images.unsplash.com/photo-1761839257961-4dce65b72d99"
          }
          alt={post.title || "Bounce title"}
          className="object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
          fill
        />
      </div>

      <div className="space-y-4 flex flex-col">
        <h1 className="text-4xl tracking-tight font-extrabold text-foreground capitalize">
          {post.title}
        </h1>
        <p className="text-muted-foreground">
          Posted on:{" "}
          {new Date(post._creationTime).toLocaleDateString("en-UK", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
      <Separator className="my-8" />
      <p className="text-lg text-foreground/90 leading-relaxed whitespace-pre-wrap ">
        {post.content}
      </p>

      <Separator className="my-8" />
      <CommentSection />
    </div>
  );
};

export default BouncePostId;
