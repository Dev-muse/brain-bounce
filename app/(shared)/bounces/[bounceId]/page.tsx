import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CommentSection from "@/components/web/CommentSection";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface BouncePostIdProps {
  params: Promise<{ bounceId: Id<"posts"> }>;
}

export const generateMetadata = async ({
  params,
}: BouncePostIdProps): Promise<Metadata> => {
  const { bounceId } = await params;

  const post = await fetchQuery(api.posts.getPostById, { postId: bounceId });

  if (!post) {
    return { title: "Post not found", description: "Post not found" };
  }

  return { title: post.title, description: post.content };
};

const BouncePostId = async ({ params }: BouncePostIdProps) => {
  const { bounceId } = await params;

  // performance optimisation: run requests in parrallel instead of sequentially because they don't depend on each other
  const [post, preloadedComments] = await Promise.all([
    fetchQuery(api.posts.getPostById, { postId: bounceId }),
    preloadQuery(api.comments.getCommentsByPostId, { postId: bounceId }),
  ]);

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
      <CommentSection preloadedComments={preloadedComments} />
    </div>
  );
};

export default BouncePostId;
