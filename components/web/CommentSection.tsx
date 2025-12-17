"use client";

import { Loader2, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/app/schemas/comment";
import { Field, FieldLabel, FieldError } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useTransition } from "react";

const CommentSection = () => {
  const params = useParams<{ bounceId: Id<"posts"> }>();

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
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 border-b">
        <MessageSquare className="size-5" />
        <h2 className="text-xl font-semibold">4 Comments</h2>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default CommentSection;
