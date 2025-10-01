import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/config/OpenAIModel";
import { Doctors } from "@/app/shared/list";

// Simple cache for similar requests (optional - you can remove if not needed)
const suggestionCache = new Map<string, any>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Function to get suggestions based on keywords (faster fallback)
function getQuickSuggestions(notes: string) {
  const keywords = notes.toLowerCase();
  const suggestions = [];

  // Simple keyword matching for common symptoms
  if (
    keywords.includes("heart") ||
    keywords.includes("chest") ||
    keywords.includes("pressure")
  ) {
    suggestions.push(Doctors.find((d) => d.specialist === "Cardiologist"));
  }
  if (
    keywords.includes("skin") ||
    keywords.includes("rash") ||
    keywords.includes("acne")
  ) {
    suggestions.push(Doctors.find((d) => d.specialist === "Dermatologist"));
  }
  if (
    keywords.includes("child") ||
    keywords.includes("baby") ||
    keywords.includes("kid")
  ) {
    suggestions.push(Doctors.find((d) => d.specialist === "Pediatrician"));
  }
  if (
    keywords.includes("mental") ||
    keywords.includes("stress") ||
    keywords.includes("anxiety") ||
    keywords.includes("depression")
  ) {
    suggestions.push(Doctors.find((d) => d.specialist === "Psychologist"));
  }
  if (
    keywords.includes("tooth") ||
    keywords.includes("dental") ||
    keywords.includes("gum")
  ) {
    suggestions.push(Doctors.find((d) => d.specialist === "Dentist"));
  }
  if (
    keywords.includes("bone") ||
    keywords.includes("joint") ||
    keywords.includes("muscle") ||
    keywords.includes("pain")
  ) {
    suggestions.push(Doctors.find((d) => d.specialist === "Orthopedic"));
  }

  // Remove null values and add General Physician if we don't have enough
  const filteredSuggestions = suggestions.filter(Boolean);

  // Always include General Physician as fallback
  if (filteredSuggestions.length === 0) {
    filteredSuggestions.push(
      Doctors.find((d) => d.specialist === "General Physician")
    );
  }

  // Fill up to 3 doctors
  while (
    filteredSuggestions.length < 3 &&
    filteredSuggestions.length < Doctors.length
  ) {
    const randomDoctor = Doctors[Math.floor(Math.random() * Doctors.length)];
    if (!filteredSuggestions.includes(randomDoctor)) {
      filteredSuggestions.push(randomDoctor);
    }
  }

  return filteredSuggestions.slice(0, 3);
}

export async function POST(request: NextRequest) {
  try {
    const { notes } = await request.json();

    if (!notes || typeof notes !== "string" || notes.trim().length === 0) {
      return NextResponse.json(
        { error: "Notes are required and must be a non-empty string" },
        { status: 400 }
      );
    }

    // Check cache first (optional optimization)
    const cacheKey = notes.toLowerCase().trim();
    const cached = suggestionCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json(cached.data);
    }

    // Try AI suggestion with timeout
    const aiPromise = openai.chat.completions.create({
      model: "meta-llama/llama-3.2-3b-instruct:free",
      messages: [
        {
          role: "system",
          content: `You are a medical assistant. Based on symptoms, suggest top 3 relevant doctors from this list. Return ONLY a valid JSON array containing the complete doctor objects (not just IDs). Available doctors: ${JSON.stringify(
            Doctors
          )}`,
        },
        {
          role: "user",
          content: `Symptoms: "${notes}". Return top 3 doctor objects as JSON array.`,
        },
      ],
    });

    // Race between AI call and timeout
    const timeoutPromise = new Promise(
      (_, reject) =>
        setTimeout(() => reject(new Error("AI request timeout")), 15000) // 15 second timeout
    );

    let aiSuggestions;
    try {
      const completion = (await Promise.race([
        aiPromise,
        timeoutPromise,
      ])) as any;
      const content = completion.choices[0]?.message?.content;

      if (content) {
        // Clean and parse AI response
        const cleanedContent = content
          .trim()
          .replace(/```json\s*/g, "")
          .replace(/```\s*/g, "")
          .replace(/^[^\[\{]*/, "")
          .replace(/[^\]\}]*$/, "");

        const parsed = JSON.parse(cleanedContent);
        if (Array.isArray(parsed) && parsed.length > 0) {
          aiSuggestions = parsed.slice(0, 3); // Ensure max 3 doctors
        }
      }
    } catch (aiError) {
      console.log("AI suggestion failed, using fallback:", aiError);
    }

    // Use AI suggestions if available, otherwise use keyword-based fallback
    const suggestions = aiSuggestions || getQuickSuggestions(notes);

    // Cache the result (optional)
    suggestionCache.set(cacheKey, {
      data: suggestions,
      timestamp: Date.now(),
    });

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error("Error in suggest-doctors API:", error);

    // Always provide fallback suggestions instead of error
    const fallbackSuggestions = [Doctors[0], Doctors[1], Doctors[2]]; // First 3 doctors

    return NextResponse.json(fallbackSuggestions);
  }
}
