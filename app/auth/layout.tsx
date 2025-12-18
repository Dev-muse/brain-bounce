import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Auth | Brainbounce",
  description: "Login or register to get started",
  category: "Ideation",
  authors: [{ name: "Rahman Muse" }],
  keywords: ["Brainbounce", "Ideation", "Brainstorming", "Innovation"],
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="absolute top-5 left-5">
        <Link href="/" className={buttonVariants({ variant: "ghost" })}>
          <ArrowLeft className="size-4" /> Back to Home
        </Link>
      </div>
      <div className="w-full max-w-md mx-auto">{children}</div>
    </div>
  );
};

export default AuthLayout;
