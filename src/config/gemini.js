import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

// 🧠 Main function that accepts user prompt
export async function runChat(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt, 
      config: {
        thinkingConfig: {
          thinkingBudget: 0, 
        },
      },
    });

 
    const text = response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (text) {
      console.log( text);
      return text;
    } else {
      console.warn("⚠️ Could not extract text from Gemini response:", response);
      return "Gemini returned an unexpected format.";
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Something went wrong!";
  }
}
