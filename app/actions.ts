"use server";

import z from "zod";
import { bounceSchema } from "./schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";

export const createBlogPost = async ({
  title,
  content,
}: z.infer<typeof bounceSchema>) => {
  // server side validation
  const parsedData = bounceSchema.safeParse({ title, content });

  if (!parsedData.success) {
    throw new Error(parsedData.error.message);
  }

  const token = await getToken();

  // convex mutation on server(needs jwt token) unlike in the client component useMutation hook(don't need jwt token)
  await fetchMutation(
    api.posts.createPost,
    {
      title: parsedData.data.title,
      content: parsedData.data.content,
    },
    { token } //token is needed for authentication
  );

  return redirect("/");
};
