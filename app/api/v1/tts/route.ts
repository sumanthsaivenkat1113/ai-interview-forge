import { NextRequest, NextResponse } from "next/server";
import { generateSpeech } from "@/server/modules/tts/tts.service";

export async function POST(req: NextRequest) {
  try {
    const { text, voice } = await req.json();

    if (!text) {
      return NextResponse.json(
        {
          error: "Text is required",
        },
        {
          status: 400,
        }
      );
    }

    const audio = await generateSpeech(text, voice);

    return new NextResponse(audio, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Failed to generate speech",
      },
      {
        status: 500,
      }
    );
  }
}