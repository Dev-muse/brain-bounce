import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // define a table for posts
  posts: defineTable({
    title: v.string(),
    content: v.string(),
    authorId: v.string(),
    imageStorageId: v.optional(v.id("_storage")),
  }),

  // COMMENTS TABLE
  comments: defineTable({
    authorId: v.string(),
    authorName: v.string(),
    postId: v.id("posts"),
    body: v.string(),
  }),
});
