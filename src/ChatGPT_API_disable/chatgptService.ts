// src/ChatGPT_API/chatgptService.ts
import OpenAI from "openai";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY!;
//console.log("Loaded API Key:", process.env.REACT_APP_OPENAI_API_KEY);

//The below line is the correct and safe way to use this API key in a React app.
//const openai = new OpenAI({ apiKey }); 
//The below function overrides safety net and allows browser use.
// ⚠️ This is not recommended for production use, as it can expose your API key to the client-side code.
// ⚠️ Use with caution and only in trusted environments.

const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,    // ⚠️ enables browser use
  });


export async function askChatGPT(prompt: string): Promise<string> {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
  
    // If content is null, return an empty string instead
    return response.choices[0].message.content ?? "";
  }

  /*
The below functions are commented out because they are not used in the current implementation. They were suggested
by VSCode as possible overloads for the askChatGPT function. Not being used for now. 
  */
  /*
export async function askChatGPTWithContext(
  prompt: string,
  context: string
): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: context },
      { role: "user", content: prompt },
    ],
  });
  return response.choices[0].message.content;
}
export async function askChatGPTWithContextAndHistory(
  prompt: string,
  context: string,
  history: { role: string; content: string }[]
): Promise<string> {
  const messages = [
    { role: "system", content: context },
    ...history,
    { role: "user", content: prompt },
  ];
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  });
  return response.choices[0].message.content;
}
export async function askChatGPTWithContextAndHistoryAndTemperature(
  prompt: string,
  context: string,
  history: { role: string; content: string }[],
  temperature: number
): Promise<string> {
  const messages = [
    { role: "system", content: context },
    ...history,
    { role: "user", content: prompt },
  ];
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
    temperature,
  });
  return response.choices[0].message.content;
}
export async function askChatGPTWithContextAndHistoryAndTemperatureAndMaxTokens(
  prompt: string,
  context: string,
  history: { role: string; content: string }[],
  temperature: number,
  maxTokens: number
): Promise<string> {
  const messages = [
    { role: "system", content: context },
    ...history,
    { role: "user", content: prompt },
  ];
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
    temperature,
    max_tokens: maxTokens,
  });
  return response.choices[0].message.content;
}
export async function askChatGPTWithContextAndHistoryAndTemperatureAndMaxTokensAndTopP(
  prompt: string,
  context: string,
  history: { role: string; content: string }[],
  temperature: number,
  maxTokens: number,
  topP: number
): Promise<string> {
  const messages = [
    { role: "system", content: context },
    ...history,
    { role: "user", content: prompt },
  ];
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
    temperature,
    max_tokens: maxTokens,
    top_p: topP,
  });
  return response.choices[0].message.content;
}
  */