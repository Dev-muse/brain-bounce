"use client";

import { useState, useTransition } from "react";
import { getAIFeedback, AIFeedback } from "@/app/actions/ai-feedback";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sparkles,
  Loader2,
  Lightbulb,
  AlertTriangle,
  Rocket,
  Search,
} from "lucide-react";

interface AIFeedbackProps {
  title: string;
  content: string;
}

export function AIFeedbackSection({ title, content }: AIFeedbackProps) {
  const [feedback, setFeedback] = useState<AIFeedback | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleGetFeedback = () => {
    setError(null);
    startTransition(async () => {
      try {
        const result = await getAIFeedback(title, content);
        setFeedback(result);
      } catch (err) {
        setError(
          "Failed to get AI feedback. Please ensure GOOGLE_AI_API_KEY is set."
        );
        console.error(err);
      }
    });
  };

  const ratingColors = {
    innovative: "bg-linear-to-r from-purple-500 to-pink-500",
    promising: "bg-linear-to-r from-green-500 to-emerald-500",
    "needs-work": "bg-linear-to-r from-amber-500 to-orange-500",
  };

  if (!feedback) {
    return (
      <Card className="border-dashed border-2 border-primary/20 bg-linear-to-br from-primary/5 to-transparent">
        <CardContent className="flex flex-col items-center justify-center py-8 gap-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Sparkles className="size-8 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg">Get AI-Powered Feedback</h3>
            <p className="text-muted-foreground text-sm mt-1">
              Get instant analysis of strengths, considerations, and suggestions
            </p>
          </div>
          <Button
            onClick={handleGetFeedback}
            disabled={isPending}
            className="mt-2"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 size-4" />
                Analyze with AI
              </>
            )}
          </Button>
          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader className="bg-linear-to-r from-primary/10 to-primary/5 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            <CardTitle className="text-lg">AI Feedback</CardTitle>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider ${
              ratingColors[feedback.overallRating]
            }`}
          >
            {feedback.overallRating.replace("-", " ")}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Strengths */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <Lightbulb className="size-4" />
            <h4 className="font-semibold text-sm">Strengths</h4>
          </div>
          <ul className="space-y-2">
            {feedback.strengths.map((strength, i) => (
              <li key={i} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-green-500 mt-1">•</span>
                {strength}
              </li>
            ))}
          </ul>
        </div>

        {/* Considerations */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="size-4" />
            <h4 className="font-semibold text-sm">Considerations</h4>
          </div>
          <ul className="space-y-2">
            {feedback.considerations.map((consideration, i) => (
              <li key={i} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-amber-500 mt-1">•</span>
                {consideration}
              </li>
            ))}
          </ul>
        </div>

        {/* Suggestions */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <Rocket className="size-4" />
            <h4 className="font-semibold text-sm">Suggestions</h4>
          </div>
          <ul className="space-y-2">
            {feedback.suggestions.map((suggestion, i) => (
              <li key={i} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-blue-500 mt-1">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>

        {/* Similar Concepts */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
            <Search className="size-4" />
            <h4 className="font-semibold text-sm">
              Similar Concepts to Research
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {feedback.similarConcepts.map((concept, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-muted rounded-full text-[10px] font-medium border border-border/50"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleGetFeedback}
          disabled={isPending}
          className="w-full mt-4"
        >
          {isPending ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 size-4" />
          )}
          Regenerate Feedback
        </Button>
      </CardContent>
    </Card>
  );
}
