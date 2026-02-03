import { GoogleGenAI } from "@google/genai";

/**
 * ATENÇÃO: Para produção, as chamadas de IA devem ser feitas através de um backend seguro.
 * Chamar a API diretamente do frontend expõe sua API_KEY.
 */

// Tenta obter a chave do ambiente (Vite)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

let ai: GoogleGenAI | null = null;
if (API_KEY && API_KEY !== "PLACEHOLDER_API_KEY") {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

export const chatWithGemini = async (
  message: string,
  context?: string
): Promise<string> => {
  if (!ai) {
    return "O assistente de IA não está configurado. Por favor, adicione sua GEMINI_API_KEY no arquivo .env.local.";
  }

  try {
    const modelId = "gemini-1.5-flash"; // Usando modelo estável
    
    const systemInstruction = `
      Você é um especialista em climatização e ar-condicionado, atuando como assistente virtual do app "ThermoCalc Pro".
      
      Seu objetivo é ajudar usuários a entenderem o cálculo de BTUs, escolherem entre modelos Inverter vs Convencional, e darem dicas de instalação.
      
      Contexto atual do usuário (se houver): ${context || 'Nenhum cálculo realizado ainda.'}
      
      Regras:
      1. Seja direto e útil.
      2. Use linguagem acessível, mas tecnicamente correta.
      3. Sempre recomende a consulta de um técnico instalador para validação final.
      4. Se perguntarem sobre marcas, seja imparcial.
      5. Formate a resposta com Markdown simples se necessário.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: message,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return response.text || "Desculpe, não consegui processar sua dúvida no momento. Tente novamente.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "Ocorreu um erro ao conectar com o assistente inteligente. Por favor, verifique sua conexão ou tente mais tarde.";
  }
};