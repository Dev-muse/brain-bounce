"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { ThumbsUp, ThumbsDown, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface VoteButtonsProps {
  postId: Id<"posts">;
  initialUpvotes?: number;
  initialDownvotes?: number;
  className?: string;
  layout?: "horizontal" | "vertical";
}

export function VoteButtons({
  postId,
  initialUpvotes = 0,
  initialDownvotes = 0,
  className,
  layout = "horizontal",
}: VoteButtonsProps) {
  const [isVoting, setIsVoting] = useState(false);

  const voteMutation = useMutation(api.votes.vote);
  const userVote = useQuery(api.votes.getUserVote, { postId });
  const voteCounts = useQuery(api.votes.getVoteCounts, { postId });

  const upvotes = voteCounts?.upvotes ?? initialUpvotes;
  const downvotes = voteCounts?.downvotes ?? initialDownvotes;
  const score = upvotes - downvotes;

  const handleVote = (voteType: "up" | "down") => {
    setIsVoting(true);
    toast.promise(voteMutation({ postId, voteType }), {
      loading: "Updating your vote...",
      success: (data) => {
        setIsVoting(false);
        if (data.action === "removed") return "Vote removed";
        if (data.action === "changed") return `Changed to ${voteType}vote`;
        return `${voteType === "up" ? "Upvoted" : "Downvoted"}!`;
      },
      error: (err) => {
        setIsVoting(false);
        return err instanceof Error
          ? err.message
          : "Failed to vote. Are you logged in?";
      },
    });
  };

  const containerClass =
    layout === "vertical"
      ? "flex-col items-center"
      : "flex-row items-center gap-1";

  return (
    <div
      className={cn("flex", containerClass, className)}
      onClick={(e) => e.stopPropagation()}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVote("up")}
        disabled={isVoting}
        className={cn(
          "h-8 px-2 transition-all duration-200",
          userVote === "up"
            ? "text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20 hover:text-emerald-600"
            : "text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/5"
        )}
      >
        <ThumbsUp
          className={cn("size-4 mr-1.5", userVote === "up" && "fill-current")}
        />
        <span className="text-xs font-bold">{upvotes}</span>
      </Button>

      {layout === "vertical" && (
        <span
          className={cn(
            "text-xs font-black py-0.5",
            score > 0 && "text-emerald-500",
            score < 0 && "text-rose-500",
            score === 0 && "text-muted-foreground"
          )}
        >
          {score > 0 ? `+${score}` : score}
        </span>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVote("down")}
        disabled={isVoting}
        className={cn(
          "h-8 px-2 transition-all duration-200",
          userVote === "down"
            ? "text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 hover:text-rose-600"
            : "text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5"
        )}
      >
        <ThumbsDown
          className={cn("size-4 mr-1.5", userVote === "down" && "fill-current")}
        />
        <span className="text-xs font-bold">{downvotes}</span>
      </Button>

      {layout === "horizontal" && score !== 0 && (
        <span
          className={cn(
            "text-[10px] font-bold ml-1 px-1.5 py-0.5 rounded-md uppercase tracking-tighter",
            score > 0 &&
              "text-emerald-600 bg-emerald-100 dark:bg-emerald-500/20",
            score < 0 && "text-rose-600 bg-rose-100 dark:bg-rose-500/20"
          )}
        >
          {score > 0 ? `+${score}` : score}
        </span>
      )}
    </div>
  );
}
