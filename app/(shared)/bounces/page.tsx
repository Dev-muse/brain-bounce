import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

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
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const posts = await fetchQuery(api.posts.getPosts);
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts?.map((post) => (
        <Card key={post._id} className="pt-0">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={
                "https://images.unsplash.com/photo-1761839257961-4dce65b72d99"
              }
              alt="farm"
              fill
              className="rounded-t-lg"
            />
          </div>
          <CardContent className="h-24">
            <Link href={`/bounce/${post._id}`}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold hover:text-primary">
                  {post.title}
                </CardTitle>
              </CardHeader>
            </Link>
            <p className="text-muted-foreground line-clamp-3">{post.content}</p>
          </CardContent>
          <CardFooter className="h-16">
            <Link
              className={buttonVariants({
                className: "w-full",
              })}
              href={`/bounce/${post._id}`}
            >
              Read More
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default BouncesPage;

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
