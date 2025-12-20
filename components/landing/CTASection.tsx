import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:60px_60px] opacity-30" />
      <div className="absolute -top-[100px] -left-[100px] w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
        <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-8">
          Ready to Bounce Your Idea?
        </h2>
        <p className="text-primary-foreground/90 md:text-2xl max-w-[700px] mx-auto mb-12 leading-relaxed">
          Join thousands of product teams who are shipping faster with clear,
          collaborative idea management.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/auth/sign-up">
            <Button
              size="xl"
              variant="secondary"
              className="w-full sm:w-auto text-xl font-bold h-16 px-10 rounded-full shadow-2xl hover:scale-105 transition-transform"
            >
              Get Started Now
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="xl"
              variant="outline"
              className="w-full sm:w-auto text-xl h-16 px-10 rounded-full bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white hover:border-white/50 backdrop-blur-sm"
            >
              Contact Sales
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
