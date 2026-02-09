import React, { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Snowflake,
  Zap,
  Wrench,
  ThermometerSun,
  Fan,
  Cpu,
  Gauge,
  ShieldCheck,
  Droplets,
} from "lucide-react";

type Slide = {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  bullets: string[];
  tip: string;
};

export default function EduCarousel() {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: "como-funciona",
        icon: <Snowflake className="text-[#1B3C87]" size={20} />,
        title: "Como funciona um ar-condicionado?",
        subtitle:
          "Ele retira calor do ambiente e joga esse calor para fora — como uma “bomba de calor ao contrário”.",
        bullets: [
          "A unidade interna (evaporadora) resfria o ar e desumidifica.",
          "A unidade externa (condensadora) libera o calor para o lado de fora.",
          "O fluido refrigerante circula e “transporta” o calor no sistema.",
          "O termostato mantém a temperatura escolhida.",
        ],
        tip: "Se o ambiente estiver úmido, o ar pode demorar um pouco para “sentir” gelar — parte do trabalho é tirar a umidade.",
      },
      {
        id: "btu",
        icon: <Gauge className="text-[#1B3C87]" size={20} />,
        title: "O que é BTU (e por que importa)?",
        subtitle:
          "BTU/h é a “força” do ar-condicionado para remover calor por hora.",
        bullets: [
          "BTU baixo demais: não gela e fica ligado no máximo.",
          "BTU alto demais: liga/desliga com frequência (ciclo curto) e pode desumidificar mal.",
          "O ideal é casar BTU com o tamanho do ambiente e as fontes de calor.",
        ],
        tip: "A calculadora te dá uma potência padrão acima do necessário, para você comprar um modelo disponível no mercado com segurança.",
      },
      {
        id: "inverter",
        icon: <Zap className="text-[#1B3C87]" size={20} />,
        title: "O que é tecnologia Inverter?",
        subtitle:
          "É o controle inteligente da velocidade do compressor — ele não fica só “liga/desliga”.",
        bullets: [
          "Mantém a temperatura mais estável (mais conforto).",
          "Geralmente gasta menos energia em uso contínuo.",
          "Tende a ser mais silencioso.",
          "Compensa muito quando o uso é diário.",
        ],
        tip: "Se você usa o ar por várias horas por dia, Inverter costuma valer mais a pena.",
      },
      {
        id: "condensadoras",
        icon: <Fan className="text-[#1B3C87]" size={20} />,
        title: "Tipos de condensadora (unidade externa)",
        subtitle:
          "A condensadora é a parte “lá fora” que rejeita o calor. O tipo correto facilita instalação e manutenção.",
        bullets: [
          "High Wall (split comum): o mais popular para quartos e salas.",
          "Multi Split: uma condensadora para várias evaporadoras (mais caro).",
          "Piso-teto / Cassete: usados em ambientes maiores e comerciais.",
          "Inverter vs convencional: muda o controle do compressor, não o “formato” do split.",
        ],
        tip: "Para a maioria das casas: split hi-wall + inverter é a combinação mais comum e eficiente.",
      },
      {
        id: "funcoes-ia",
        icon: <Cpu className="text-[#1B3C87]" size={20} />,
        title: "Como funcionam funções “IA” (Smart)?",
        subtitle:
          "No dia a dia, é automação inteligente: sensores + app + ajustes automáticos para conforto e economia.",
        bullets: [
          "Alguns modelos ajustam potência conforme temperatura e presença.",
          "Modos automáticos tentam economizar energia sem perder conforto.",
          "App permite agendar horários e acompanhar consumo.",
          "Integração com assistentes (depende do modelo).",
        ],
        tip: "Funções Smart são ótimas, mas o principal continua sendo: BTU certo + instalação bem feita.",
      },
      {
        id: "manutencao",
        icon: <Droplets className="text-[#1B3C87]" size={20} />,
        title: "Manutenção básica (o que você pode fazer)",
        subtitle:
          "Manutenção simples melhora o desempenho, reduz gasto e evita mau cheiro.",
        bullets: [
          "Limpe o filtro 1x por mês (ou mais, se tiver poeira/pets).",
          "Mantenha portas e janelas fechadas durante o uso.",
          "Evite obstruir a saída/entrada de ar.",
          "Se sentir cheiro forte ou pingos fora do normal: chame um técnico.",
        ],
        tip: "Filtro sujo é uma das maiores causas de “não gela” e aumento de consumo.",
      },
      {
        id: "instalacao",
        icon: <Wrench className="text-[#1B3C87]" size={20} />,
        title: "O que é necessário para instalar um ar?",
        subtitle:
          "Uma boa instalação faz muita diferença (às vezes mais do que o modelo).",
        bullets: [
          "Local adequado e suporte firme para a condensadora.",
          "Tubulação (cobre) e isolamento corretos.",
          "Dreno com caimento (para não pingar).",
          "Vácuo na instalação (essencial para evitar problemas).",
          "Rede elétrica dimensionada corretamente (disjuntor e cabos).",
        ],
        tip: "Uma instalação mal feita pode reduzir eficiência, aumentar ruído e causar vazamentos.",
      },
      {
        id: "sol-e-ambiente",
        icon: <ThermometerSun className="text-[#1B3C87]" size={20} />,
        title: "Dicas rápidas para o ar render mais",
        subtitle:
          "Pequenos ajustes fazem o equipamento trabalhar menos e economizar energia.",
        bullets: [
          "Use 23–24°C como ponto de partida.",
          "Cortinas/blackout ajudam muito em sol direto.",
          "Evite fontes de calor próximas (forno, PC forte, muitas lâmpadas).",
          "Se o ambiente é grande, às vezes vale um BTU acima.",
        ],
        tip: "Conforto não é só “temperatura baixa”: é temperatura estável + menos umidade + ar bem distribuído.",
      },
      {
        id: "seguranca",
        icon: <ShieldCheck className="text-[#1B3C87]" size={20} />,
        title: "Uso seguro e confiável",
        subtitle:
          "A calculadora te orienta, mas a validação final ideal é com um profissional quando há particularidades.",
        bullets: [
          "Ambientes com pé-direito alto podem pedir ajuste.",
          "Muita incidência solar ou muita gente/equipamentos também.",
          "Instalação correta garante eficiência e vida útil.",
        ],
        tip: "Se o seu caso foge do “padrão”, use o resultado como base e peça uma avaliação rápida de um técnico.",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  const current = slides[index];

  return (
    <section className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
      <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-extrabold text-gray-900">
            Guia rápido do Ar-Condicionado (sem complicação)
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Passe pelos cards para entender BTU, Inverter, instalação e manutenção.
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition flex items-center justify-center"
            aria-label="Anterior"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition flex items-center justify-center"
            aria-label="Próximo"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="relative">
          {/* Card */}
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-blue-50/60 to-white p-6 md:p-7">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white border border-blue-100 shadow-sm flex items-center justify-center">
                {current.icon}
              </div>

              <div className="min-w-0">
                <h4 className="text-lg md:text-xl font-bold text-gray-900">
                  {current.title}
                </h4>
                <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                  {current.subtitle}
                </p>
              </div>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-gray-700">
              {current.bullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1 w-2 h-2 rounded-full bg-[#1B3C87] shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-xl bg-white border border-gray-100 p-4">
              <p className="text-sm">
                <span className="font-bold text-[#1B3C87]">Dica rápida: </span>
                <span className="text-gray-700">{current.tip}</span>
              </p>
            </div>

            {/* Mobile arrows */}
            <div className="md:hidden mt-5 flex items-center justify-between">
              <button
                onClick={prev}
                className="px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition flex items-center gap-2"
              >
                <ChevronLeft size={18} />
                <span className="text-sm font-semibold">Anterior</span>
              </button>
              <button
                onClick={next}
                className="px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition flex items-center gap-2"
              >
                <span className="text-sm font-semibold">Próximo</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Dots */}
          <div className="mt-5 flex flex-wrap gap-2 justify-center">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                aria-label={`Ir para ${s.title}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === index
                    ? "w-10 bg-[#1B3C87]"
                    : "w-2.5 bg-gray-200 hover:bg-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="mt-3 text-center text-[11px] text-gray-400">
            {index + 1} / {slides.length}
          </div>
        </div>
      </div>
    </section>
  );
}
