// src/ChatGPT_API/chatgptService.ts
import OpenAI from "openai";

export async function askChatGPT(prompt: string): Promise<string> {
  // 1. Read the key that HomePage stored in localStorage
  const raw = localStorage.getItem("MYKEY");
  const apiKey = raw ? JSON.parse(raw) as string : "";

  if (!apiKey) {
    throw new Error("No API key found. Please enter your key on the HomePage.");
  }

  // 2. Instantiate the client here with the dynamic key
  const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,  // dev only; remove for prod
  });

  // 3. Send the prompt and return GPT's reply
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content ?? "";
}
