import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ModeToggle } from "../ui/ThemeToggle";

const Navbar = () => {
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
        <Link
          href="/auth/sign-up"
          className={buttonVariants({ variant: "default" })}
        >
          Sign Up
        </Link>
        <Link
          href="/auth/sign-in"
          className={buttonVariants({ variant: "secondary" })}
        >
          Log In
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
