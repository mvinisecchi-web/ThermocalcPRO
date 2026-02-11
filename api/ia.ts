import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { message, context } = req.body;

    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({ error: "API Key do Gemini não configurada na Vercel" });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `
Você é um especialista em climatização e ar-condicionado, atuando como o assistente virtual do "ThermoCalc Pro".

Seu objetivo é ajudar usuários a entenderem cálculos de BTUs, diferenças entre modelos (Inverter vs Convencional) e dar dicas técnicas de instalação.

Contexto do cálculo atual (se houver): ${context || "Nenhum cálculo realizado ainda."}

Diretrizes:
1. Seja técnico, mas use linguagem acessível.
2. Baseie suas respostas em normas (ex: NBR 16401).
3. Sempre recomende validação por técnico qualificado.
4. Responda em Markdown.
      `,
    });

    const result = await model.generateContent(message);
    const text = result.response.text();

    return res.status(200).json({ text });
  } catch (error) {
    console.error("Erro na API da IA:", error);
    return res.status(500).json({ error: "Erro ao conectar com o Gemini" });
  }
}
