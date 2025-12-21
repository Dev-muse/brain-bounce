import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, Globe, Eye } from "lucide-react";

export default function DiscoverSection() {
  return (
    <section className="py-24 bg-background border-b">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-muted text-muted-foreground w-fit">
                Community First
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Discover & Explore
              </h2>
              <p className="text-muted-foreground md:text-xl leading-relaxed">
                Don't work in a silo. Search and browse a growing library of
                innovative concepts from other creators. Find inspiration and
                potential collaborators.
              </p>
            </div>

            <ul className="space-y-5">
              <li className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <span className="text-lg">
                  Global Search across all bounces
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <span className="text-lg">
                  Connect with like-minded innovators
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <span className="text-lg">
                  Beautiful, distraction-free reading
                </span>
              </li>
            </ul>

            <div className="pt-4">
              <Link href="/bounces">
                <Button size="lg" className="rounded-full px-8">
                  Browse All Ideas
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative h-[400px] w-full bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl border border-indigo-500/10 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800/50" />
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <Globe className="h-64 w-64 text-primary/20" />
            </div>
            {/* Decorative floating cards could go here */}
          </div>
        </div>
      </div>
    </section>
  );
}
