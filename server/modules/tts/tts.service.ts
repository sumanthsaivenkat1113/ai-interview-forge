import fs from "fs";
import os from "os";
import path from "path";
import { EdgeTTS } from "node-edge-tts";

export async function generateSpeech(
  text: string,
  voice = "en-US-JennyNeural"
) {
  const filePath = path.join(
    os.tmpdir(),
    `tts-${Date.now()}.mp3`
  );

  const tts = new EdgeTTS({
    voice,
    lang: "en-US",
    outputFormat: "audio-24khz-96kbitrate-mono-mp3",
  });

  await tts.ttsPromise(text, filePath);

  const audio = fs.readFileSync(filePath);

  fs.unlink(filePath, () => {});

  return audio;
}