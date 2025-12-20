"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Apple-style text reveal (staggered fade up + slight scale)
      tl.from(".hero-text", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
      })
        .from(
          ".hero-btn",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .from(
          imageRef.current,
          {
            x: 100,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
          },
          "-=1"
        );

      // Continuous float for image
      gsap.to(imageRef.current, {
        y: -20,
        rotation: 2,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Background gradient subtle pulse
      gsap.to(".hero-glow", {
        opacity: 0.6,
        scale: 1.2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden pt-24 md:pt-32 lg:pt-48 pb-24 min-h-[90vh] flex items-center"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 hero-glow opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] -z-10 opacity-20 pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-8 z-10">
            <div className="space-y-6">
              <div className="hero-text inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium transition-colors text-primary backdrop-blur-sm w-fit">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
                Brain Bounce V1.0 is Live
              </div>
              <h1 className="hero-text text-5xl font-extrabold tracking-tight lg:text-7xl xl:text-8xl leading-[1.1] text-foreground">
                Where Ideas <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-indigo-500 animate-gradient-x">
                  Take Flight.
                </span>
              </h1>
              <p className="hero-text max-w-[640px] text-muted-foreground md:text-xl lg:text-2xl leading-relaxed">
                The collaborative workspace for innovators. Share early
                concepts, get rapid feedback, and ship faster—without the chaos.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/create" className="hero-btn">
                <Button
                  size={"lg"}
                  className="w-full sm:w-auto text-lg h-14 px-8 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
                >
                  Share Your Idea
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/bounces" className="hero-btn">
                <Button
                  variant="outline"
                  size={"lg"}
                  className="w-full sm:w-auto text-lg h-14 px-8 rounded-full border-2 hover:bg-muted/50 transition-all duration-300 backdrop-blur-sm bg-background/50"
                >
                  Explore Bounces
                </Button>
              </Link>
            </div>
            <div className="hero-text flex items-center gap-6 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-10 w-10 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold bg-muted`}
                      style={{
                        backgroundImage: `url(https://i.pravatar.cc/100?img=${
                          i + 10
                        })`,
                        backgroundSize: "cover",
                      }}
                    />
                  ))}
                </div>
                <span className="font-medium">Loved by 2,000+ creators</span>
              </div>
            </div>
          </div>

          <div
            ref={imageRef}
            className="mx-auto lg:mx-0 relative w-full aspect-square lg:aspect-[4/3] max-w-[700px] perspective-1000"
          >
            {/* Image Container with specific effects */}
            <div className="relative w-full h-full transition-transform transform-gpu">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-purple-500/30 rounded-[2rem] blur-3xl -z-10 scale-95" />
              <Image
                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200"
                alt="Brain Bounce Dashboard"
                fill
                className="object-contain drop-shadow-2xl rounded-2xl"
                priority
              />
              {/* Floating UI Elements for depth */}
              <div className="absolute -left-8 top-1/4 p-4 bg-background/80 backdrop-blur-md border rounded-2xl shadow-xl max-w-[200px] hidden lg:block animate-float-slow">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-xs font-semibold">Live Validated</span>
                </div>
                <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[80%] bg-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
