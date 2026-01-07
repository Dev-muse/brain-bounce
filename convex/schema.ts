import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // define a table for posts
  posts: defineTable({
    title: v.string(),
    content: v.string(),
    authorId: v.string(),
    imageStorageId: v.optional(v.id("_storage")),
    upvotes: v.optional(v.number()),
    downvotes: v.optional(v.number()),
  })
    .searchIndex("search_title", { searchField: "title" })
    .searchIndex("search_content", { searchField: "content" }),

  // COMMENTS TABLE
  comments: defineTable({
    authorId: v.string(),
    authorName: v.string(),
    postId: v.id("posts"),
    body: v.string(),
  }),

  // VOTES TABLE
  votes: defineTable({
    userId: v.string(),
    postId: v.id("posts"),
    voteType: v.union(v.literal("up"), v.literal("down")),
  })
    .index("by_user_and_post", ["userId", "postId"])
    .index("by_post", ["postId"]),
});
