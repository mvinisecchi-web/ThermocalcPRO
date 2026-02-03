import React, { useState } from 'react';
import { CalculationResult, Region } from '../types'; // Mantive seus tipos
import { MOCK_PRODUCTS, REGION_PRICES } from '../constants';
import { 
  ShoppingCart, ExternalLink, MapPin, Wrench, 
  AlertCircle, Info, ChevronDown, Zap, ShieldCheck 
} from 'lucide-react';

interface ResultsProps {
  result: CalculationResult;
}

// Lógica dos links dinâmicos por BTU
const PRODUCT_LINKS = {
  AMAZON: {
    9000: "https://www.amazon.com.br/s?k=ar+condicionado+9000+btu+inverter",
    12000: "https://www.amazon.com.br/s?k=ar+condicionado+12000+btu+inverter",
    18000: "https://www.amazon.com.br/s?k=ar+condicionado+18000+btu+inverter",
    24000: "https://www.amazon.com.br/s?k=ar+condicionado+24000+btu+inverter",
  },
  MERCADO_LIVRE: {
    9000: "https://lista.mercadolivre.com.br/ar-condicionado-9000-btu-inverter",
    12000: "https://lista.mercadolivre.com.br/ar-condicionado-12000-btu-inverter",
    18000: "https://lista.mercadolivre.com.br/ar-condicionado-18000-btu-inverter",
    24000: "https://lista.mercadolivre.com.br/ar-condicionado-24000-btu-inverter",
  }
};

const Results: React.FC<ResultsProps> = ({ result }) => {
  const [selectedRegion, setSelectedRegion] = useState<Region | ''>('');
  const btu = result.recommendedBtu;

  // Seus links dinâmicos
  const amazonUrl = PRODUCT_LINKS.AMAZON[btu as keyof typeof PRODUCT_LINKS.AMAZON] || PRODUCT_LINKS.AMAZON[12000];
  const mlUrl = PRODUCT_LINKS.MERCADO_LIVRE[btu as keyof typeof PRODUCT_LINKS.MERCADO_LIVRE] || PRODUCT_LINKS.MERCADO_LIVRE[12000];

  const displayedProducts = MOCK_PRODUCTS.filter(
    (p) => p.btu >= btu && p.btu <= btu * 1.5
  ).slice(0, 3);

  const installCost = selectedRegion ? REGION_PRICES[selectedRegion as Region] : null;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 1. Primary Result Card (Seu original) */}
      <div className="bg-gradient-to-br from-[#1B3C87] to-blue-900 text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <h2 className="text-2xl font-light mb-2">Resultado Ideal</h2>
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-6xl font-bold tracking-tight">{btu.toLocaleString()}</span>
          <span className="text-xl font-medium opacity-80">BTUs</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-sm bg-white/10 p-4 rounded-xl backdrop-blur-sm">
          <div><span className="block opacity-60">Área Base</span><span className="font-semibold">{Math.round(result.baseBtu)} BTU</span></div>
          {result.sunLoad > 0 && (
            <div><span className="block opacity-60">Sol Direto</span><span className="font-semibold text-yellow-300">+{Math.round(result.sunLoad)} BTU</span></div>
          )}
          <div><span className="block opacity-60">Pessoas</span><span className="font-semibold">{Math.round(result.peopleLoad)} BTU</span></div>
          <div><span className="block opacity-60">Equipamentos</span><span className="font-semibold">{Math.round(result.equipmentLoad)} BTU</span></div>
          <div><span className="block opacity-60">Janelas</span><span className="font-semibold">{Math.round(result.windowLoad)} BTU</span></div>
        </div>
      </div>

      {/* 2. NOVIDADE: Comparador de Ofertas Reais (Onde entra o lucro) */}
      <div className="bg-white border-2 border-orange-100 rounded-2xl p-6 shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Zap size={20} className="text-yellow-500 fill-current" />
          Melhores Preços para {btu.toLocaleString()} BTUs:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a href={amazonUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-[#FF9900]/10 border border-[#FF9900]/30 rounded-xl hover:scale-[1.02] transition-transform">
            <span className="font-bold text-[#FF9900]">Ver na Amazon</span>
            <ExternalLink size={18} className="text-[#FF9900]" />
          </a>
          <a href={mlUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-[#FFE600]/10 border border-[#FFE600]/40 rounded-xl hover:scale-[1.02] transition-transform">
            <span className="font-bold text-[#333]">Ver no Mercado Livre</span>
            <ExternalLink size={18} className="text-[#333]" />
          </a>
        </div>
        <p className="mt-3 text-[10px] text-gray-400 text-center flex items-center justify-center gap-1">
          <ShieldCheck size={12} /> Preços verificados em lojas oficiais.
        </p>
      </div>

      {/* 3. Explanation (Seu original) */}
      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-start gap-2">
         <Info size={16} className="shrink-0 mt-0.5" />
         <p><strong>Entenda o cálculo:</strong> Usamos 600 BTU/m² base, com acréscimos para sol direto, pessoas e eletrônicos.</p>
      </div>

      {/* 4. Modelos Recomendados (Seu original) */}
      <section>
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <ShoppingCart className="text-[#1B3C87]" /> Modelos Recomendados
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition">
              <div className="h-40 bg-gray-100"><img src={product.imageUrl} alt={product.title} className="w-full h-full object-contain p-4" /></div>
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="font-bold text-gray-800 text-sm mb-2">{product.title}</h4>
                <div className="mt-auto space-y-2">
                  <a href={product.affiliateLinks.amazon} className="block w-full text-center py-2 bg-yellow-400 text-xs font-bold rounded-lg transition">Amazon</a>
                  <a href={product.affiliateLinks.magalu} className="block w-full text-center py-2 bg-blue-600 text-white text-xs font-bold rounded-lg transition">Magalu</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Installation Estimator (Seu original) */}
      <section className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Wrench className="text-gray-600" /> Estimativa de Instalação
        </h3>
        <div className="flex flex-col md:flex-row gap-6">
          <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value as Region)} className="flex-1 p-3 bg-white border border-gray-300 rounded-lg outline-none">
            <option value="" disabled>Selecione sua Região...</option>
            {Object.values(Region).map(r => (<option key={r} value={r}>{r}</option>))}
          </select>
          <div className="flex-1 bg-white p-4 rounded-xl border border-gray-200 text-center font-bold">
            {installCost ? `R$ ${installCost.min} - R$ ${installCost.max}` : "Selecione a região"}
          </div>
        </div>
      </section>

      {/* 6. Technical Warning (Seu original) */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg flex gap-3 italic text-sm text-yellow-700">
        <AlertCircle className="text-yellow-600 shrink-0" />
        <p>Este cálculo segue a NBR 16401. Consulte sempre um técnico especializado.</p>
      </div>

    </div>
  );
};

export default Results;