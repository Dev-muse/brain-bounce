"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, Send } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContactForm } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </>
      )}
    </Button>
  );
}

const initialState = {
  message: "",
  errors: {},
  success: false,
};

export default function ContactPage() {
  const [state, formAction] = useActionState(submitContactForm, initialState);

  if (state?.success) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-muted/30">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mb-4 flex justify-center">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Send className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Message Sent!</CardTitle>
            <CardDescription>
              Thanks for reaching out. We've sent your inquiry to{" "}
              <strong>a.muse@rapidmuse.com</strong> and will get back to you
              shortly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-muted/30">
      <div className="w-full max-w-md space-y-4">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Contact Sales</CardTitle>
            <CardDescription>
              Ready to scale your ideation process? Send us a message to get
              started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Jane Doe"
                  required
                />
                {state?.errors?.name && (
                  <p className="text-xs text-destructive">
                    {state.errors.name}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  required
                />
                {state?.errors?.email && (
                  <p className="text-xs text-destructive">
                    {state.errors.email}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your team and needs..."
                  className="min-h-[120px]"
                  required
                />
                {state?.errors?.message && (
                  <p className="text-xs text-destructive">
                    {state.errors.message}
                  </p>
                )}
              </div>
              <SubmitButton />
              {state?.message && !state?.success && (
                <p className="text-sm text-center text-destructive">
                  {state.message}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
