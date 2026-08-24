import { groqClient } from "@/server/providers/groq/groqClient";


/**
 * Sends a system + user prompt pair to Groq and returns the parsed JSON response.
 * Throws if the model call fails or the response is not valid JSON.
 */
export async function callGroqJSON<T = unknown>(
  systemPrompt: string,
  userPrompt: string,
  model: string,
  max_completion_tokens: number,
  temperature: number = 0.1,
): Promise<T> {
  try {
    const completion = await groqClient.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: temperature,
      max_completion_tokens: max_completion_tokens,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Groq returned an empty response");
    }

    console.log(`[LLM-RESUME-Parser] => ${content}`)

    return JSON.parse(content) as T;
  } catch (error) {
    console.error("[GroqProvider] Failed to generate JSON response:", error);
    throw error;
  }
}



/**
 * Sends a only system prompt pair to Groq and returns the parsed JSON response.
 * in this no user prompt is required 
 * Throws if the model call fails or the response is not valid JSON.
 */


export async function callGroqJSON_NUP<T = unknown>(
  systemPrompt: string,
  model: string,
  max_completion_tokens: number,
  temperature: number = 0.1,
): Promise<T> {
  try {
    const completion = await groqClient.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: systemPrompt },
      ],
      temperature: temperature,
      max_completion_tokens: max_completion_tokens,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Groq returned an empty response");
    }

    return JSON.parse(content) as T;
  } catch (error) {
    console.error("[GroqProvider] Failed to generate JSON response:", error);
    throw error;
  }
}