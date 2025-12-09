"use client";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ModeToggle } from "../ui/ThemeToggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const Navbar = () => {
  // useConvexAuth is a hook that provides authentication state and functions for user session to be in sync with db
  //for other cases use the betterauth hooks to register and login
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  return (
    <nav className="flex p-5 justify-between items-center w-full">
      <div className="flex items-center gap-8 ">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Brain <span className=" text-blue-600">Bounce</span>{" "}
          </h1>
        </Link>

        <div className="flex items-center gap-2 ">
          <Link className={buttonVariants({ variant: "ghost" })} href="/">
            Home
          </Link>
          <Link href="/blog" className={buttonVariants({ variant: "ghost" })}>
            Blog{" "}
          </Link>
          <Link href="/create" className={buttonVariants({ variant: "ghost" })}>
            Create{" "}
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isLoading ? null : isAuthenticated ? (
          <Button
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    toast.success("Logged out successfully");
                    router.push("/");
                  },
                  onError: (error) => {
                    toast.error(error.error.message);
                  },
                },
              })
            }
          >
            Logout
          </Button>
        ) : (
          <>
            <Link
              href="/auth/sign-up"
              className={buttonVariants({ variant: "default" })}
            >
              Sign Up
            </Link>
            <Link
              href="/auth/login"
              className={buttonVariants({ variant: "secondary" })}
            >
              Log In
            </Link>
          </>
        )}

        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
