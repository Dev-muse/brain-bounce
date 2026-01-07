import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

export const vote = mutation({
  args: {
    postId: v.id("posts"),
    voteType: v.union(v.literal("up"), v.literal("down")),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("You must be logged in to vote");
    }

    const existingVote = await ctx.db
      .query("votes")
      .withIndex("by_user_and_post", (q) =>
        q.eq("userId", user._id).eq("postId", args.postId)
      )
      .first();

    const post = await ctx.db.get(args.postId);
    if (!post) {
      throw new ConvexError("Post not found");
    }

    if (existingVote) {
      // If same vote type, remove the vote (toggle off)
      if (existingVote.voteType === args.voteType) {
        await ctx.db.delete(existingVote._id);

        // Update post vote counts
        const updateField = args.voteType === "up" ? "upvotes" : "downvotes";
        const currentValue = post[updateField as "upvotes" | "downvotes"] ?? 0;
        await ctx.db.patch(args.postId, {
          [updateField]: Math.max(0, currentValue - 1),
        });

        return { action: "removed", voteType: null };
      }

      // Change vote type
      await ctx.db.patch(existingVote._id, { voteType: args.voteType });

      // Update both counts
      const increment = args.voteType === "up" ? "upvotes" : "downvotes";
      const decrement = args.voteType === "up" ? "downvotes" : "upvotes";

      await ctx.db.patch(args.postId, {
        [increment]: (post[increment as "upvotes" | "downvotes"] ?? 0) + 1,
        [decrement]: Math.max(
          0,
          (post[decrement as "upvotes" | "downvotes"] ?? 0) - 1
        ),
      });

      return { action: "changed", voteType: args.voteType };
    }

    // Create new vote
    await ctx.db.insert("votes", {
      userId: user._id,
      postId: args.postId,
      voteType: args.voteType,
    });

    // Update post vote count
    const updateField = args.voteType === "up" ? "upvotes" : "downvotes";
    await ctx.db.patch(args.postId, {
      [updateField]: (post[updateField as "upvotes" | "downvotes"] ?? 0) + 1,
    });

    return { action: "created", voteType: args.voteType };
  },
});

export const getUserVote = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      return null;
    }

    const vote = await ctx.db
      .query("votes")
      .withIndex("by_user_and_post", (q) =>
        q.eq("userId", user._id).eq("postId", args.postId)
      )
      .first();

    return vote?.voteType ?? null;
  },
});

export const getVoteCounts = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);

    if (!post) {
      return { upvotes: 0, downvotes: 0, score: 0 };
    }

    const upvotes = post.upvotes ?? 0;
    const downvotes = post.downvotes ?? 0;

    return {
      upvotes,
      downvotes,
      score: upvotes - downvotes,
    };
  },
});

export const getTrendingPosts = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 5;

    const posts = await ctx.db.query("posts").collect();

    // Calculate score and sort
    const scoredPosts = posts.map((post) => ({
      ...post,
      score: (post.upvotes ?? 0) - (post.downvotes ?? 0),
    }));

    scoredPosts.sort((a, b) => b.score - a.score);

    const topPosts = scoredPosts.slice(0, limit);

    // Resolve image URLs
    return Promise.all(
      topPosts.map(async (post) => ({
        ...post,
        imageUrl: post.imageStorageId
          ? await ctx.storage.getUrl(post.imageStorageId)
          : null,
      }))
    );
  },
});
