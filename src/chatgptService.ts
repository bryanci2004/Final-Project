// src/ChatGPT_API/chatgptService.ts
import OpenAI from "openai";

export async function askChatGPT(prompt: string): Promise<string> {
  const raw = localStorage.getItem("MYKEY");
  const apiKey = raw ? JSON.parse(raw) as string : "";

  if (!apiKey) {
    throw new Error("No API key found. Please enter your key on the HomePage.");
  }

  const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,  // ❗ For development only
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4",  // or "gpt-4.0" if your key supports it
    messages: [
      {
        role: "system",
        content: "You are a helpful career guidance counselor. Based on quiz answers, suggest 2–3 well-matched careers. Provide detailed descriptions using this structure:\n\n1. 🔧 **Recommended Career: [Job Title]**\n---\n### Why This Fits You\n- Bullet reasons from user's answers\n\n### Day‑to‑Day Responsibilities\n- Description of typical tasks\n\n### Salary & Outlook\n- **Median Annual Wage:**\n- **Entry‑Level:**\n- **Experienced:**\n- **Job Growth:**\n\nRespond clearly and concisely using markdown."
      },
      {
        role: "user",
        content: prompt,
      }
    ],
  });

  return response.choices[0].message.content ?? "";
}
