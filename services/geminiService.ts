export const chatWithGemini = async (
  message: string,
  context?: string
): Promise<string> => {
  try {
    const response = await fetch("/api/ia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, context }),
    });

    if (!response.ok) {
      throw new Error("Erro ao chamar a API interna");
    }

    const data = await response.json();

    return data.text || "Erro ao obter resposta da IA.";
  } catch (error) {
    console.error("Erro ao conectar com a API interna:", error);
    return "Ocorreu um erro ao conectar com o assistente inteligente. Tente novamente em alguns instantes.";
  }
};
