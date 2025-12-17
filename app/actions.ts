"use server";

import z from "zod";
import { bounceSchema } from "./schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
import { revalidate } from "./(shared)/bounces/page";
import { revalidatePath } from "next/cache";

export const createBlogPost = async (values: z.infer<typeof bounceSchema>) => {
  try {
    // server side validation
    const parsedData = bounceSchema.safeParse(values);

    if (!parsedData.success || !parsedData.data.image) {
      throw new Error("something went wrong");
    }

    const token = await getToken();

    // generate image upload url
    const imageUrl = await fetchMutation(
      api.posts.generateImageUploadUrl,
      {},
      { token } //token is needed for authentication for any server side convex mutation
    );

    if (!imageUrl) {
      return {
        error: "Failed to generate image upload URL",
      };
    }

    const uploadResult = await fetch(imageUrl, {
      method: "POST",
      headers: {
        "Content-Type": parsedData.data.image.type,
      },
      body: parsedData.data.image,
    });

    if (!uploadResult.ok) {
      return {
        error: "Failed to upload image",
      };
    }

    const { storageId } = await uploadResult.json();

    if (!storageId) {
      return {
        error: "Failed to upload image",
      };
    }

    // convex mutation on server(needs jwt token) unlike in the client component useMutation hook(don't need jwt token)
    await fetchMutation(
      api.posts.createPost,
      {
        title: parsedData.data.title,
        content: parsedData.data.content,
        imageStorageId: storageId,
      },

      { token } //token is needed for authentication
    );

    // steps on file upload:
    // 1. Generate an upload URL from convex
    // 2. Upload the file to the generated URL
    // 3. Save the file ID to the database
    // 4. Return the file ID to the client
    // 5. Use the file ID to display the file in the UI
  } catch (error) {
    return {
      error: "Failed to create post",
    };
  }
  revalidatePath("/bounces");
  return redirect("/bounces");
};
