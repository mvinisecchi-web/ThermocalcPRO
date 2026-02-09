import { affiliateProducts } from "../src/data/affiliateProducts";
import { CalculationResult, ProductRecommendation } from "../types";
import { ExternalLink, ShieldCheck, Sparkles, BadgeCheck } from "lucide-react";

interface Props {
  result: CalculationResult;
}

export default function Results({ result }: Props) {
  // pega produtos do mesmo BTU recomendado (mais assertivo que ">= recommended")
  const exactBtu = result.recommendedBtu;
  const recommended = affiliateProducts
    .filter((p) => p.btu === exactBtu)
    .slice(0, 3);

  // link “ver todas as ofertas” (pesquisa) com sua tag
  // se você já tem amazon.ts util, pode trocar pra usar ele aqui
  const viewAllUrl = `https://www.amazon.com.br/s?k=ar+condicionado+${exactBtu}+btu+inverter&tag=marcossecchi-20`;

  return (
    <section className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border border-blue-100 shadow-sm rounded-2xl p-6 md:p-7">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
              Melhores ofertas para{" "}
              <span className="text-[#1B3C87]">{exactBtu.toLocaleString("pt-BR")} BTU/h</span>
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Selecionamos opções compatíveis com o seu resultado. Compare preços e escolha o modelo ideal para seu ambiente.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-green-600" size={16} />
              <span>Links para lojas confiáveis</span>
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="text-blue-600" size={16} />
              <span>Recomendação com margem segura</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="text-orange-500" size={16} />
              <span>Compare e pegue a melhor oferta</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        {recommended.map((p: ProductRecommendation, idx: number) => (
          <article
            key={p.id}
            className={[
              "bg-white border rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden",
              idx === 0 ? "border-orange-200 ring-2 ring-orange-100" : "border-gray-100",
            ].join(" ")}
          >
            {/* Badge topo */}
            {idx === 0 && (
              <div className="px-4 pt-4">
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                  Mais recomendado
                </span>
              </div>
            )}

            {/* Imagem */}
            <div className="px-4 pt-4">
              <div className="bg-slate-50 rounded-xl border border-slate-100 h-44 flex items-center justify-center overflow-hidden">
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Conteúdo */}
            <div className="p-4">
              <h3 className="font-extrabold text-gray-900 leading-snug">
                {p.title}
              </h3>

              <div className="mt-2 text-sm text-gray-500 flex items-center justify-between">
                <span className="capitalize">{p.type}</span>
                <span className="font-semibold text-gray-400">
                  {p.btu.toLocaleString("pt-BR")} BTU/h
                </span>
              </div>

              {/* Se você não quiser mostrar preço, pode remover esse bloco */}
              <div className="mt-3 text-lg font-extrabold text-[#1B3C87]">
                {p.price}
              </div>

              <ul className="mt-3 text-sm text-gray-600 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                  Boa escolha para o seu BTU
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                  Compare preços e escolha a melhor oferta
                </li>
              </ul>

              <a
                href={p.affiliateLinks.amazon}
                target="_blank"
                rel="noreferrer"
                className={[
                  "mt-4 w-full inline-flex items-center justify-center gap-2",
                  "rounded-xl px-4 py-3 font-extrabold",
                  idx === 0
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-[#1B3C87] hover:bg-blue-800 text-white",
                  "transition",
                ].join(" ")}
              >
                Ver na Amazon <ExternalLink size={18} />
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* CTA abaixo – maior, com mais ênfase e com estética melhor */}
      <div className="mt-6">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-[#0f2e75] via-[#1B3C87] to-blue-600 shadow-lg">
          <div className="p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-white">
              <h3 className="text-xl md:text-2xl font-extrabold">
                Quer ver MAIS opções de {exactBtu.toLocaleString("pt-BR")} BTU/h?
              </h3>
              <p className="text-white/90 mt-1">
                Abra uma lista com várias ofertas atualizadas e escolha a melhor.
              </p>
            </div>

            <a
              href={viewAllUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#1B3C87] font-extrabold px-6 py-3 rounded-xl hover:bg-blue-50 transition w-full md:w-auto"
            >
              Ver todas as ofertas <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
