// src/utils/amazon.ts

export const AMAZON_TAG = "marcossecchi-20";

/**
 * Gera link de busca na Amazon já com sua tag de afiliado.
 * Isso é ótimo porque evita produto esgotado (sempre mostra várias ofertas).
 */
export function amazonSearchUrl(query: string) {
  const q = encodeURIComponent(query.trim());
  return `https://www.amazon.com.br/s?k=${q}&tag=${AMAZON_TAG}`;
}

/**
 * Se você quiser usar link direto de produto no futuro, você pode montar
 * por ASIN + tag (nem sempre a Amazon mantém a tag visível na URL final).
 */
export function amazonAsinUrl(asin: string) {
  const a = encodeURIComponent(asin.trim());
  return `https://www.amazon.com.br/dp/${a}?tag=${AMAZON_TAG}`;
}
