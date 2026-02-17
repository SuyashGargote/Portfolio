import { GoogleGenerativeAI } from "@google/generative-ai";
import { PROJECTS, SKILL_CATEGORIES, ABOUT_TEXT } from '../constants';

// Initialize Gemini Client
const getClient = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey === "PLACEHOLDER_API_KEY") {
    console.warn("VITE_GEMINI_API_KEY not found or is placeholder. Chat features will be limited.");
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
};

export const generateChatResponse = async (history: { role: string; content: string }[], userMessage: string): Promise<string> => {
  const genAI = getClient();
  if (!genAI) {
    return "System Error: Neural Link Offline (API Key missing). Please check .env.local and ensure VITE_GEMINI_API_KEY is set.";
  }

  try {
    // Construct the context based on portfolio data
    const systemInstruction = `
You are "CyberBot", an advanced AI security assistant for Suyash Gargote's portfolio.
Suyash is a CyberSecurity Focused Engineer & Full Stack Developer.

YOUR PERSONALITY:
- Technical, professional, and slightly "cyberpunk/hacker" themed.
- Use terminal-inspired language (e.g., "Scanning database...", "Uplink stable", "Query processed").
- Be helpful but concise (max 3-4 sentences).

DATA CONTEXT:
- ABOUT: ${ABOUT_TEXT}
- RECENT PROJECTS: ${PROJECTS.map(p => `${p.title}: ${p.description}`).join(' | ')}
- SKILLS: ${SKILL_CATEGORIES.map(c => `${c.title} (${c.subcategories.map(s => s.title).join(', ')})`).join(' | ')}
- CONTACT: Email is suyashgargote026@gmail.com.

GUIDELINES:
- If asked about projects, mention specific ones from the data.
- If asked about skills, highlight his expertise in Offensive Security and Web Development.
- If asked how to contact him, provide the email: suyashgargote026@gmail.com.
- Do not hallucinate credentials Suyash doesn't have.
- If data is missing, suggest manual inquiry via contact module.
    `;

    // List of models to try in order of preference
    const modelsToTry = ["gemini-3-flash-preview", "gemini-1.5-flash", "gemini-pro"];

    let lastError;

    for (const modelName of modelsToTry) {
      try {
        console.log(`Attempting to use model: ${modelName}`);
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: systemInstruction,
        });

        // 1. Map to SDK format
        let formattedHistory = history.map(h => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.content }],
        }));

        // 2. Remove any leading model messages (Gemini requirement)
        while (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
          formattedHistory.shift();
        }

        // 3. Ensure Strict Alternation (User -> Model -> User)
        const sanitizedHistory = [];
        if (formattedHistory.length > 0) {
          sanitizedHistory.push(formattedHistory[0]);
          for (let i = 1; i < formattedHistory.length; i++) {
            const prev = sanitizedHistory[sanitizedHistory.length - 1];
            const current = formattedHistory[i];
            if (prev.role !== current.role) {
              sanitizedHistory.push(current);
            } else {
              console.warn(`Dropping message due to role duplication: ${current.role}`);
            }
          }
        }

        const chat = model.startChat({
          history: sanitizedHistory,
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.7,
          },
        });

        // Add a timeout to prevent infinite loading state
        const timeoutPromise = new Promise<string>((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out after 15 seconds")), 60000)
        );

        const resultPromise = chat.sendMessage(userMessage);
        const response = await Promise.race([resultPromise.then(res => res.response), timeoutPromise]);

        if (typeof response === 'string') {
          throw new Error("Invalid response type");
        }

        const text = response.text();
        return text;

      } catch (error) {
        console.warn(`Model ${modelName} failed:`, error);
        lastError = error;
        // Continue to the next model in the list
      }
    }

    // If all models fail
    throw lastError;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Packet loss detected in neural link. Please re-transmit your query. Detailed error: " + (error instanceof Error ? error.message : String(error));
  }
};