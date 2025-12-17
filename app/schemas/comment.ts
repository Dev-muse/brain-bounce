import { Id } from "@/convex/_generated/dataModel";
import z from "zod";

export const commentSchema = z.object({
  body: z.string().min(3, "Comment cannot be empty"),
  postId: z.custom<Id<"posts">>(),
});
