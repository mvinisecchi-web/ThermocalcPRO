import React, { useState, useEffect } from 'react'; // [Adicionado useEffect]
import { CalculatorState, SunExposure, CalculationResult } from './types';
import { BTU_FACTORS, STANDARD_BTUS } from './constants';
import Calculator from './components/Calculator';
import Results from './components/Results';
import AiAssistant from './components/AiAssistant';
import InfoHub from './components/InfoHub';
import { Snowflake, Zap, CheckCircle } from 'lucide-react';

const initialState: CalculatorState = {
  dimensions: { width: 3, length: 3 },
  sunExposure: SunExposure.PARTIAL,
  heatSources: {
    people: 2,
    televisions: 1,
    computers: 0,
    lights: 1,
    windows: 1,
    other: 0,
  }
};

const App: React.FC = () => {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>(initialState);
  const [result, setResult] = useState<CalculationResult | null>(null);

  // --- SOLUÇÃO PARA O PROBLEMA DE ROLAGEM ---
  useEffect(() => {
    // Força o scroll para o topo no carregamento inicial
    window.scrollTo(0, 0);

    // Garante que nenhum input receba foco automático e puxe a tela para baixo
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, []);
  // ------------------------------------------

  const calculateBTU = () => {
    const { dimensions, sunExposure, heatSources } = calculatorState;
    const area = dimensions.width * dimensions.length;
    const baseBtu = area * BTU_FACTORS.BASE_SQM;
    
    const sunLoad = sunExposure === SunExposure.DIRECT 
      ? area * BTU_FACTORS.SUN_ADDITION_SQM 
      : 0;

    const peopleLoad = heatSources.people * BTU_FACTORS.PERSON;

    const equipmentLoad = 
      (heatSources.televisions * BTU_FACTORS.ELECTRONIC) +
      (heatSources.computers * BTU_FACTORS.ELECTRONIC) +
      (heatSources.other * BTU_FACTORS.ELECTRONIC) +
      (heatSources.lights * BTU_FACTORS.LIGHT_SQM); 

    const windowLoad = heatSources.windows * BTU_FACTORS.WINDOW;
    const totalRaw = baseBtu + sunLoad + peopleLoad + equipmentLoad + windowLoad;
    
    const recommendedBtu = STANDARD_BTUS.find(btu => btu >= totalRaw) || STANDARD_BTUS[STANDARD_BTUS.length - 1];

    setResult({
      baseBtu,
      peopleLoad,
      equipmentLoad,
      windowLoad,
      sunLoad,
      totalBtu: totalRaw,
      recommendedBtu
    });

    // Scroll suave para os resultados após o cálculo
    setTimeout(() => {
      scrollToSection('results-section');
    }, 100);
  };

  const getContextSummary = () => {
    if (!result) return "";
    return `Área: ${(calculatorState.dimensions.width * calculatorState.dimensions.length).toFixed(1)}m². Calc: ${result.totalBtu.toFixed(0)} BTUs. Rec: ${result.recommendedBtu} BTUs. Sol: ${calculatorState.sunExposure}.`;
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative overflow-x-hidden">
      
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-br from-blue-100/50 to-transparent pointer-events-none -z-10" />

      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo agora também força o scroll para o topo (0,0) */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-gradient-to-tr from-[#1B3C87] to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Snowflake size={24} className="animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1B3C87] leading-none tracking-tight">ThermoCalc Pro</h1>
              <span className="text-[10px] text-blue-500 font-bold tracking-widest uppercase">Calculadora Inteligente</span>
            </div>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <a href="#calculator" onClick={(e) => handleNavClick(e, 'calculator-section')} className="hover:text-[#1B3C87] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#1B3C87] after:transition-all hover:after:w-full">Calculadora</a>
            <a href="#tips" onClick={(e) => handleNavClick(e, 'tips-section')} className="hover:text-[#1B3C87] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#1B3C87] after:transition-all hover:after:w-full">Dicas</a>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about-section')} className="hover:text-[#1B3C87] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#1B3C87] after:transition-all hover:after:w-full">Sobre</a>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-10">
          <div className="text-center md:text-left pt-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-4 border border-blue-200">
              <Zap size={14} className="fill-current" />
              <span>Cálculo Preciso & Gratuito</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Descubra o <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B3C87] via-blue-600 to-blue-400">Ar-Condicionado Ideal</span>
            </h2>
          </div>

          <div id="calculator-section" className="relative z-10">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-20"></div>
            <Calculator 
              state={calculatorState} 
              onChange={setCalculatorState} 
              onCalculate={calculateBTU} 
            />
          </div>

          {result && (
            <div id="results-section">
              <Results result={result} />
            </div>
          )}
          
          <div id="tips-section">
            <InfoHub />
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-24 z-30">
            <AiAssistant contextSummary={getContextSummary()} />
            
            <div id="about-section" className="mt-6 bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-blue-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="text-green-500" size={20} />
                <h4 className="font-bold text-[#1B3C87]">Garantia de Segurança</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Utilizamos a norma <strong>NBR 16401</strong> como base.
              </p>
              <div className="pt-4 border-t border-gray-100 text-xs text-gray-400 flex justify-between items-center">
                <span>© 2026 ThermoCalc Pro</span>
                <span>v1.0.0</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;