import { db } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import { SessionChatTable } from "@/config/schema";
import { v4 as uuidv4 } from "uuid";
import { currentUser } from "@clerk/nextjs/server";
import { eq, desc } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { notes, selectedDoctor } = await req.json();
  const user = await currentUser();

  try {
    const sessionId = uuidv4();
    const result = await db
      .insert(SessionChatTable)
      .values({
        sessionId: sessionId,
        createdBy: user?.emailAddresses?.[0]?.emailAddress,
        notes: notes,
        selectedDoctor: selectedDoctor,
        createdOn: new Date().toString(),
      })
      .returning();

    console.log("Session created:", { sessionId, result: result[0] });

    return NextResponse.json({
      sessionId: sessionId,
      data: result[0],
    });
  } catch (e) {
    console.error("Error creating session:", e);
    return NextResponse.json(
      { error: "Failed to create session", details: e },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  const user = await currentUser();

  if (sessionId === "all") {
    const result = await db
      .select()
      .from(SessionChatTable)
      .where(
        // @ts-ignore
        eq(SessionChatTable.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(SessionChatTable.id));

    return NextResponse.json(result || null);
  } else {
    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const result = await db
      .select()
      .from(SessionChatTable)
      .where(eq(SessionChatTable.sessionId, sessionId));

    return NextResponse.json(result[0] || null);
  }
}
