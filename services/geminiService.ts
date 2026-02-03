import { GoogleGenerativeAI } from "@google/generative-ai";

// O Vite busca automaticamente a chave do seu arquivo .env.local ou da Vercel
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

// Inicializa o Google Generative AI apenas se a chave existir
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export const chatWithGemini = async (
  message: string,
  context?: string
): Promise<string> => {
  // Verificação de segurança para evitar erro de conexão
  if (!genAI) {
    return "O assistente de IA não está configurado corretamente. Verifique as variáveis de ambiente na Vercel.";
  }

  try {
    // Usando o modelo flash-latest para máxima velocidade e atualizações automáticas
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      systemInstruction: `
        Você é um especialista em climatização e ar-condicionado, atuando como o assistente virtual do "ThermoCalc Pro".
        
        Seu objetivo é ajudar usuários a entenderem cálculos de BTUs, diferenças entre modelos (Inverter vs Convencional) e dar dicas técnicas de instalação.
        
        Contexto do cálculo atual (se houver): ${context || 'Nenhum cálculo realizado ainda.'}
        
        Diretrizes:
        1. Seja técnico, mas use uma linguagem acessível.
        2. Baseie suas respostas em normas de engenharia (como a NBR 16401).
        3. Sempre recomende a validação final por um técnico instalador qualificado.
        4. Responda usando Markdown para facilitar a leitura.
      `,
    });

    // Envia a mensagem do usuário para a IA
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return text || "Desculpe, tive um problema ao processar sua resposta. Pode repetir?";
  } catch (error) {
    // Log detalhado para o console do navegador (F12) para ajudar no diagnóstico
    console.error("Erro na comunicação com o Gemini:", error);
    return "Ocorreu um erro ao conectar com o assistente inteligente. Por favor, tente novamente em alguns instantes.";
  }
};