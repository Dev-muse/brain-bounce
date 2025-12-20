"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lightbulb, MessageSquare, Rocket } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Title Reveal
      gsap.from(".feature-title", {
        scrollTrigger: {
          trigger: ".feature-title-container",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // Bouncy Steps Animation
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 75%", // Triggers when the top of the grid hits 75% down the viewport
        },
        y: 100, // Start from further down
        scale: 0.8, // Start slightly smaller
        opacity: 0,
        duration: 1.2, // Longer duration for the elastic effect to play out
        stagger: 0.3, // Visible delay between steps
        ease: "elastic.out(1, 0.5)", // The "Bounce" effect
      });
    },
    { scope: containerRef }
  );

  const steps = [
    {
      step: "01",
      title: "Bounce It",
      desc: "Don't overthink. Drop your raw idea into the workspace instantly.",
      icon: Lightbulb,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      step: "02",
      title: "Discuss It",
      desc: "Invite your team. Threaded comments and real-time cursors make feedback clearer.",
      icon: MessageSquare,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      step: "03",
      title: "Ship It",
      desc: "Turn validated chaos into concrete specs. Move forward with confidence.",
      icon: Rocket,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="py-24 bg-muted/30 border-y relative overflow-hidden"
    >
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="feature-title-container text-center mb-16 space-y-4">
          <h2 className="feature-title text-3xl font-bold tracking-tighter md:text-5xl">
            How It Works
          </h2>
          <p className="feature-title text-muted-foreground md:text-xl max-w-[800px] mx-auto text-balance">
            From spark to shipment in three simple steps.
          </p>
        </div>

        <div className="features-grid grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((item, index) => (
            <Card
              key={index}
              className="feature-card relative overflow-hidden border-border/50 hover:border-primary/50 transition-colors bg-background"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="text-9xl font-black font-sans -mr-4 -mt-4 block">
                  {item.step}
                </span>
              </div>
              <CardHeader className="relative z-10">
                <div
                  className={`h-14 w-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6`}
                >
                  <item.icon className={`h-7 w-7 ${item.color}`} />
                </div>
                <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">
                  Step {item.step}
                </div>
                <CardTitle className="text-2xl">{item.title}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {item.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
