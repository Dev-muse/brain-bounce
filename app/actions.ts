"use server";

import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import { fetchMutation } from "convex/nextjs";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import { bounceSchema } from "./schemas/blog";

export const createBlogPost = async (values: z.infer<typeof bounceSchema>) => {
  try {
    // server side validation
    const parsedData = bounceSchema.safeParse(values);

    if (!parsedData.success || !parsedData.data.image) {
      throw new Error("something went wrong");
    }

    // convex mutation on server(needs jwt token) unlike in the client component useMutation hook(don't need jwt token)
    const token = await getToken();

    // step 1: generate image upload url
    const imageUrl = await fetchMutation(
      api.posts.generateImageUploadUrl,
      {},
      { token }
    );

    if (!imageUrl) {
      return {
        error: "Failed to generate image upload URL",
      };
    }

    // step 2: upload the file to the generated URL
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

    // step 3: save the file ID to the database
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

  // revalidatePath("/bounces");//don't use with cache components
  updateTag("posts"); // only use with cache components
  return redirect("/bounces");
};
