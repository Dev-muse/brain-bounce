"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export interface AIFeedback {
  strengths: string[];
  considerations: string[];
  suggestions: string[];
  similarConcepts: string[];
  overallRating: "promising" | "needs-work" | "innovative";
}

export async function getAIFeedback(
  title: string,
  content: string
): Promise<AIFeedback> {
  if (!process.env.GOOGLE_AI_API_KEY) {
    throw new Error("GOOGLE_AI_API_KEY is not set");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `You are an expert innovation consultant. Analyze this early-stage idea and provide constructive feedback.

IDEA TITLE: ${title}

IDEA DESCRIPTION: ${content}

Respond ONLY with valid JSON in this exact format:
{
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "considerations": ["consideration 1", "consideration 2"],
  "suggestions": ["actionable suggestion 1", "actionable suggestion 2", "actionable suggestion 3"],
  "similarConcepts": ["similar product or concept 1", "similar product or concept 2"],
  "overallRating": "promising" | "needs-work" | "innovative"
}

Keep each point concise (1-2 sentences max). Be encouraging but honest.`;

  const result = await model.generateContent(prompt);
  const response = result.response
    .text()
    .replace(/```json\n?|\n?```/g, "")
    .trim();

  try {
    return JSON.parse(response) as AIFeedback;
  } catch (error) {
    console.error("Failed to parse AI response:", response);
    throw new Error("Failed to parse AI feedback");
  }
}
