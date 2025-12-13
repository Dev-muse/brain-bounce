"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const BouncePage = () => {
  const posts = useQuery(api.posts.getPosts);
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
          <Card key={post._id}>
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={
                  "https://images.unsplash.com/photo-1761839257961-4dce65b72d99"
                }
                alt="farm"
                fill
              />
            </div>
            <CardContent>
              <Link href={`/bounce/${post._id}`}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold hover:text-primary">
                    {post.title}
                  </CardTitle>
                </CardHeader>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BouncePage;
