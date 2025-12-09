"use client";
import { bounceSchema } from "@/app/schemas/blog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const CreatePage = () => {
  const form = useForm({
    resolver: zodResolver(bounceSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (data: z.infer<typeof bounceSchema>) => {
    console.log(data);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Create Bounce
          </h1>
          <p className="text-muted-foreground pt-2 text-xl">
            Share an early idea and get clear feedback.{" "}
          </p>
        </header>

        <Card className="w-full max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Start a Bounce</CardTitle>
            <CardDescription>
              {" "}
              Write your idea and set the context for contributors.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className="space-y-4">
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Title</FieldLabel>
                      <Input
                        placeholder="Create a title "
                        {...field}
                        aria-invalid={!!fieldState.error}
                      />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="content"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Content</FieldLabel>
                      <Textarea
                        placeholder="Write your idea and set the context for contributors."
                        {...field}
                        aria-invalid={!!fieldState.error}
                      />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Button type="submit">Create Bounce</Button>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CreatePage;
