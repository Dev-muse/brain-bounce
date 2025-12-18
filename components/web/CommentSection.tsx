"use client";

import { commentSchema } from "@/app/schemas/comment";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import { Loader2, MessageSquare } from "lucide-react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";

const CommentSection = (props: {
  preloadedComments: Preloaded<typeof api.comments.getCommentsByPostId>;
}) => {
  const params = useParams<{ bounceId: Id<"posts"> }>();

  /*option 1: real time updates, convex will update the comments when a new comment is added
  only get reactivity in client components if you use fetchQuery the server analog of useQuery no reactivity
  const comments = useQuery(api.comments.getCommentsByPostId, {
    postId: params.bounceId,
  });
*/

  //option 2: preloaded comments
  const comments = usePreloadedQuery(props.preloadedComments);

  const [isPending, startTransition] = useTransition();

  // convex mutation on client
  const createComment = useMutation(api.comments.createComment);

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
      postId: params.bounceId,
    },
  });

  const onSubmit = async (data: z.infer<typeof commentSchema>) => {
    startTransition(async () => {
      try {
        await createComment(data);
        toast.success("Comment created successfully");
        form.reset();
      } catch (error) {
        console.log(error);
        toast.error("Failed to create comment");
      }
    });
  };

  if (comments === undefined) {
    return (
      <div className="flex gap-2 items-center">
        <Loader2 className="animate-spin" />
        <p>Loading comments...</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 border-b">
        <MessageSquare className="size-5" />
        <h2 className="text-xl font-semibold">{comments.length} Comments</h2>
      </CardHeader>
      <CardContent className="space-y-6">
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Body</FieldLabel>
                <Textarea
                  aria-invalid={!!fieldState.error}
                  placeholder="Share your thoughts..."
                  {...field}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Button disabled={isPending} type="submit">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Posting...</span>
              </>
            ) : (
              "Post comment"
            )}
          </Button>
        </form>

        {comments?.length > 0 && <Separator />}
        <section className="space-y-6">
          {comments?.map((comment) => (
            <div key={comment._id} className="flex gap-4 ">
              <Avatar className="size-10 shrink-0 ">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${comment.authorName}`}
                  alt={comment.authorName}
                />
                <AvatarFallback>
                  {comment.authorName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex gap-4 items-center justify-between">
                  <p className="font-semibold text-sm">{comment.authorName}</p>
                  <p className="text-muted-foreground text-xs">
                    {new Date(comment._creationTime).toLocaleDateString(
                      "en-UK",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
                <p className="text-foreground/90 text-sm whitespace-pre-wrap leading-relaxed ">
                  {comment.body}
                </p>
              </div>
            </div>
          ))}
        </section>
      </CardContent>
    </Card>
  );
};

export default CommentSection;
