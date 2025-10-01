import DoctorsAgentList from "@/app/(routes)/dashboard/_components/DoctorsAgentList";
import { db } from "@/config/db";
import { openai } from "@/config/OpenAIModel";
import { SessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const REPORT_GEN_PROMPT =
  "You are an AI Medical Agent that just finished a conversation with a user. Based on the AI Agent Doctor Info and conversation, generate a structured reponse with the following fields: ";
("1. sessionId: a unique session identifier");
("2. agent: the medical specialist name (e.g. Cardiologist, Dermatologist, etc.)");
("3. user: name of the patient or 'Anonymous' if not provided");
("4. timeStamp: current date and time is ISO format");
("5. chiefComplaint: one-sentence summary of the main health concern");
("6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations");
("7. symptoms: a list of symptoms mentioned by the user");
("8. duration: how long the symptoms have been present");
("9. severity: mild, moderate or severe");
("10. medicationsMentioned: list of any medications mentioned");
("11. recommendations: list of AI suggestions");
("Return the result in this JSON format:{ sessionId: string, agent: string, user: string, timeStamp: ISO Datetime, chiefComplaint: string, summary: string, symptoms: string[], duration: string, severity: string, medicationsMentioned: string[], recommendations: string[] }");
("Only include valid fields, do not reposnd with any other text.");

export async function POST(req: NextRequest) {
  const { sessionId, sessionDetails, messages } = await req.json();

  const UserInput =
    "AI Agent Doctor Info: " +
    JSON.stringify(sessionDetails) +
    ", conversation: " +
    JSON.stringify(messages);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: REPORT_GEN_PROMPT,
        },
        {
          role: "user",
          content: UserInput,
        },
      ],
    });
    const rawResp = completion.choices[0].message;

    //@ts-ignore
    const Resp = rawResp.content
      .trim()
      .replace("```json", "")
      .replace("```", "");
    const JSONResp = JSON.parse(Resp);

    const result = await db
      .update(SessionChatTable)
      .set({
        report: JSONResp,
        conversation: messages,
      })
      .where(eq(SessionChatTable.sessionId, sessionId));
    return NextResponse.json(JSONResp);
  } catch (e) {
    return NextResponse.json(e);
  }
}
