import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Wind,
  Zap,
  ThermometerSun,
  Wrench,
  Info,
  Snowflake,
  Sparkles,
  ShieldCheck,
  PlugZap,
} from "lucide-react";

type Slide = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  bullets: string[];
  tip?: string;
};

const AUTOPLAY_MS = 30_000;

const InfoHub: React.FC = () => {
  const slides = useMemo<Slide[]>(
    () => [
      {
        id: "btu",
        title: "O que é BTU?",
        subtitle: "A medida que define a potência ideal para o seu ambiente.",
        icon: <ThermometerSun className="h-5 w-5" />,
        bullets: [
          "BTU/h é a “capacidade de resfriamento” do ar-condicionado.",
          "Menos BTU do que precisa → demora pra gelar e gasta mais energia.",
          "BTU demais → liga e desliga mais, pode ressecar o ar e reduzir eficiência.",
        ],
        tip: "Dica: o ideal é dimensionar com folga moderada — nem no limite, nem exagerado.",
      },
      {
        id: "como-funciona",
        title: "Como o ar-condicionado funciona?",
        subtitle: "Ele não “cria frio”: ele tira calor do ambiente e joga pra fora.",
        icon: <Snowflake className="h-5 w-5" />,
        bullets: [
          "Evaporadora (interna) absorve o calor do ar do cômodo.",
          "Condensadora (externa) libera esse calor pro lado de fora.",
          "O gás refrigerante circula nesse ciclo transportando calor.",
        ],
        tip: "Dica: se a condensadora pega sol forte, o aparelho perde desempenho.",
      },
      {
        id: "inverter",
        title: "Tecnologia Inverter",
        subtitle: "Mais conforto, menos ruído e consumo mais estável.",
        icon: <Zap className="h-5 w-5" />,
        bullets: [
          "Em vez de ligar/desligar o compressor, ele ajusta a rotação conforme a necessidade.",
          "Mantém a temperatura mais estável (menos “picos” de frio/calor).",
          "Tende a economizar energia especialmente em uso contínuo.",
        ],
        tip: "Dica: inverter costuma valer mais a pena para quem usa muitas horas por dia.",
      },
      {
        id: "condensadoras",
        title: "Tipos de condensadora",
        subtitle: "O “motor” do sistema — e onde o calor é rejeitado.",
        icon: <Wind className="h-5 w-5" />,
        bullets: [
          "Convencional (On/Off): mais simples, costuma ser mais barata.",
          "Inverter: controle mais inteligente, melhor eficiência e conforto.",
          "Atenção ao local: precisa de ventilação e espaço para “respirar”.",
        ],
        tip: "Dica: evite instalar em nicho fechado — isso aumenta temperatura e consumo.",
      },
      {
        id: "funcoes-ia",
        title: "Funções “IA” e conectividade",
        subtitle: "Recursos que ajudam no conforto — mas não substituem o dimensionamento.",
        icon: <Sparkles className="h-5 w-5" />,
        bullets: [
          "Alguns modelos aprendem seu padrão de uso e ajustam o funcionamento.",
          "Controle por app/voz (Wi-Fi) facilita rotina e economia.",
          "Sensores podem melhorar a distribuição do ar e reduzir desperdício.",
        ],
        tip: "Dica: primeiro escolha o BTU certo, depois compare recursos “smart”.",
      },
      {
        id: "instalacao",
        title: "O que é necessário para instalar?",
        subtitle: "Uma instalação bem feita = mais eficiência e menos dor de cabeça.",
        icon: <PlugZap className="h-5 w-5" />,
        bullets: [
          "Disjuntor adequado e cabo dimensionado (segurança em 1º lugar).",
          "Tubulação e isolamento corretos (evita perda e condensação).",
          "Vácuo na linha e teste de estanqueidade (evita problemas futuros).",
        ],
        tip: "Dica: instalação ruim pode causar consumo alto e até travar o compressor.",
      },
      {
        id: "manutencao",
        title: "Manutenção básica (simples e efetiva)",
        subtitle: "Ajuda a economizar e melhora a qualidade do ar.",
        icon: <Wrench className="h-5 w-5" />,
        bullets: [
          "Limpe filtros 1x por mês (ou mais se tiver poeira/pets).",
          "Evite obstruir a saída de ar (cortinas/móveis na frente).",
          "Higienização periódica e checagem técnica aumentam vida útil.",
        ],
        tip: "Dica: filtro sujo derruba o desempenho e aumenta a conta de luz.",
      },
      {
        id: "seguranca",
        title: "Boas práticas e segurança",
        subtitle: "Escolha consciente e uso correto fazem toda a diferença.",
        icon: <ShieldCheck className="h-5 w-5" />,
        bullets: [
          "Temperatura recomendada: 23–24°C (conforto + economia).",
          "Feche portas/janelas durante o uso para não “perder” o ar frio.",
          "Se possível, reduza sol direto no ambiente (cortinas/insulfilm).",
        ],
        tip: "Dica: um ambiente bem vedado pode permitir BTU menor e maior economia.",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const goTo = (i: number) => {
    const next = (i + slides.length) % slides.length;
    setIndex(next);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  const resetAutoplay = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setIndex((v) => (v + 1) % slides.length);
    }, AUTOPLAY_MS);
  };

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  // reinicia autoplay quando o usuário navega manualmente
  useEffect(() => {
    resetAutoplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const current = slides[index];

  return (
    <section className="py-10">
      <div className="bg-white/70 backdrop-blur-sm border border-blue-100 rounded-2xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-[#1B3C87]">
                Guia Rápido do Ar-Condicionado
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Aprenda o essencial em cards curtos (troca automática a cada 30s).
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 active:scale-95 transition flex items-center justify-center"
                aria-label="Anterior"
                type="button"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 active:scale-95 transition flex items-center justify-center"
                aria-label="Próximo"
                type="button"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Dots */}
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                type="button"
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-[#1B3C87]" : "w-2.5 bg-gray-200 hover:bg-gray-300"
                }`}
                aria-label={`Ir para: ${s.title}`}
              />
            ))}
          </div>
        </div>

        {/* Slide */}
        <div className="p-6">
          <div className="relative">
            {/* Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 rounded-3xl blur opacity-30 pointer-events-none" />

            <div className="relative bg-white rounded-2xl border border-gray-100 shadow-md p-6">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-100 to-blue-50 border border-blue-100 text-[#1B3C87] flex items-center justify-center shadow-sm">
                    {current.icon}
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="text-xl font-extrabold text-gray-900">
                    {current.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{current.subtitle}</p>

                  <ul className="mt-4 space-y-2">
                    {current.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {current.tip && (
                    <div className="mt-5 flex items-start gap-2 rounded-xl bg-blue-50 border border-blue-100 p-4">
                      <Info className="h-4 w-4 text-blue-700 mt-0.5 shrink-0" />
                      <p className="text-sm text-blue-900">
                        <span className="font-semibold">Atalho prático: </span>
                        {current.tip}
                      </p>
                    </div>
                  )}

                  {/* Mobile nav */}
                  <div className="mt-6 flex sm:hidden items-center justify-between gap-3">
                    <button
                      onClick={prev}
                      className="flex-1 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 active:scale-[0.99] transition flex items-center justify-center gap-2 font-semibold text-gray-700"
                      type="button"
                    >
                      <ChevronLeft className="h-5 w-5" />
                      Anterior
                    </button>
                    <button
                      onClick={next}
                      className="flex-1 py-3 rounded-xl bg-[#1B3C87] hover:bg-blue-800 text-white active:scale-[0.99] transition flex items-center justify-center gap-2 font-semibold shadow-sm"
                      type="button"
                    >
                      Próximo
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Autoplay hint */}
                  <p className="mt-4 text-[11px] text-gray-400 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Auto-carrossel: 30s
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">
                      Você pode clicar nas bolinhas para ir direto ao tema
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer small CTA */}
        <div className="px-6 pb-6">
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-r from-white to-blue-50 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="font-bold text-gray-900">Quer acertar de primeira?</p>
              <p className="text-sm text-gray-600">
                Use a calculadora acima e depois compare as ofertas recomendadas.
              </p>
            </div>
            <div className="text-sm font-semibold text-[#1B3C87] flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Mais conforto, menos gasto
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoHub;
