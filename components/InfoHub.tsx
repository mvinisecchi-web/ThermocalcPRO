import React, { useEffect, useMemo, useState } from "react";
import {
  Snowflake,
  Zap,
  Wind,
  Wrench,
  Thermometer,
  Home,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type TipSlide = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  bullets: string[];
  footer?: string;
};

const AUTOPLAY_MS = 30_000;

export default function InfoHub() {
  const slides: TipSlide[] = useMemo(
    () => [
      {
        id: "como-funciona",
        title: "Como funciona um ar-condicionado?",
        subtitle: "Ele “tira calor” do ambiente e joga para fora.",
        icon: <Snowflake className="h-5 w-5 text-blue-600" />,
        bullets: [
          "A unidade interna puxa o ar do cômodo e passa pelo evaporador (frio).",
          "O refrigerante absorve o calor e leva para a unidade externa.",
          "A condensadora libera esse calor para fora e o ciclo se repete.",
        ],
        footer: "Dica: portas e janelas bem vedadas melhoram MUITO o desempenho.",
      },
      {
        id: "btu",
        title: "O que é BTU?",
        subtitle: "É a “potência térmica” que o ar precisa para resfriar bem.",
        icon: <Thermometer className="h-5 w-5 text-indigo-600" />,
        bullets: [
          "BTU/h mede quanto calor o aparelho consegue remover por hora.",
          "Pouco BTU: não gela, trabalha no limite e gasta mais.",
          "Muito BTU: pode ligar/desligar demais (ciclos curtos) e incomodar.",
        ],
        footer: "Por isso a calculadora ajuda a acertar no ponto.",
      },
      {
        id: "inverter",
        title: "Tecnologia Inverter vale a pena?",
        subtitle: "Na maioria dos casos, sim: mais conforto e economia.",
        icon: <Zap className="h-5 w-5 text-emerald-600" />,
        bullets: [
          "Inverter ajusta a rotação do compressor para manter a temperatura estável.",
          "Geralmente consome menos energia e faz menos ruído.",
          "Convencional (On/Off) é mais barato, mas tende a oscilar mais.",
        ],
        footer: "Se usa todo dia, Inverter costuma compensar mais.",
      },
      {
        id: "condensadoras",
        title: "Tipos de condensadora",
        subtitle: "A “unidade externa” que troca calor com o ambiente.",
        icon: <Wind className="h-5 w-5 text-sky-600" />,
        bullets: [
          "Hi Wall (mais comum): unidade interna alta na parede + externa do lado de fora.",
          "Piso-teto/cassete: para ambientes maiores ou comerciais.",
          "Quanto melhor a ventilação externa, melhor a eficiência.",
        ],
        footer: "Evite sol direto e espaço apertado na condensadora.",
      },
      {
        id: "ia",
        title: "Funções “IA” e automação",
        subtitle: "Geralmente são modos inteligentes e sensores.",
        icon: <BrainCircuit className="h-5 w-5 text-violet-600" />,
        bullets: [
          "Ajuste automático de potência para chegar mais rápido na temperatura.",
          "Sensores de presença/temperatura para otimizar consumo.",
          "Apps/Wi-Fi: rotinas, timer, controle remoto e alertas.",
        ],
        footer: "Ótimo para praticidade — mas o BTU correto continua sendo o principal.",
      },
      {
        id: "instalacao",
        title: "O que precisa para instalar?",
        subtitle: "Instalação bem feita = conforto + economia + durabilidade.",
        icon: <Home className="h-5 w-5 text-slate-700" />,
        bullets: [
          "Local certo (boa circulação) e tubulação com comprimento adequado.",
          "Vácuo na linha e teste de estanqueidade (evita perda de desempenho).",
          "Disjuntor/cabos corretos e dreno bem instalado.",
        ],
        footer: "Se possível, use instalador qualificado (faz diferença real).",
      },
      {
        id: "manutencao",
        title: "Manutenção simples (que salva sua conta de luz)",
        subtitle: "Poucos minutos por mês já fazem diferença.",
        icon: <Wrench className="h-5 w-5 text-amber-600" />,
        bullets: [
          "Limpe os filtros a cada 30 dias (ou menos se tiver poeira/pets).",
          "Mantenha a unidade externa livre de sujeira e com espaço para ventilar.",
          "Se notar cheiro forte/goteira/ruído, chame assistência antes de piorar.",
        ],
        footer: "Filtro sujo = menos ar = mais consumo e menos conforto.",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  useEffect(() => {
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(t);
  }, [slides.length]);

  const active = slides[index];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B3C87]">
            Dicas rápidas e fáceis
          </h2>
          <p className="text-gray-600 mt-1">
            Aprenda o essencial em poucos segundos (passa sozinho a cada 30s).
          </p>
        </div>

        {/* Dots */}
        <div className="hidden md:flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              className={[
                "h-2.5 rounded-full transition-all",
                i === index ? "w-8 bg-[#1B3C87]" : "w-2.5 bg-gray-300 hover:bg-gray-400",
              ].join(" ")}
              aria-label={`Ir para: ${s.title}`}
            />
          ))}
        </div>
      </div>

      {/* Carousel Card */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-100/60 blur-2xl" />
          <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-indigo-100/60 blur-2xl" />
        </div>

        <div className="relative p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-white/80 border border-gray-100 flex items-center justify-center shadow-sm">
                {active.icon}
              </div>
              <div>
                <div className="text-sm font-semibold text-blue-700">
                  {index + 1}/{slides.length}
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight">
                  {active.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="h-10 w-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
              <button
                onClick={next}
                className="h-10 w-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center"
                aria-label="Próximo"
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>

          <p className="mt-3 text-gray-600">{active.subtitle}</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            {active.bullets.map((b, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-100 bg-white/70 p-4 shadow-[0_1px_0_rgba(0,0,0,0.03)]"
              >
                <div className="text-sm text-gray-700 leading-relaxed">{b}</div>
              </div>
            ))}
          </div>

          {active.footer && (
            <div className="mt-6 rounded-2xl bg-blue-50/60 border border-blue-100 p-4">
              <div className="text-sm font-semibold text-blue-900">Resumo</div>
              <div className="text-sm text-blue-900/80 mt-1">{active.footer}</div>
            </div>
          )}

          {/* Mobile dots */}
          <div className="mt-6 flex md:hidden items-center justify-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                className={[
                  "h-2.5 rounded-full transition-all",
                  i === index ? "w-8 bg-[#1B3C87]" : "w-2.5 bg-gray-300 hover:bg-gray-400",
                ].join(" ")}
                aria-label={`Ir para: ${s.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
