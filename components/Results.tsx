import React, { useState } from 'react';
import { CalculationResult, ProductRecommendation, Region } from '../types';
import { MOCK_PRODUCTS, REGION_PRICES } from '../constants';
import { ShoppingCart, ExternalLink, MapPin, Wrench, AlertCircle, Info, ChevronDown } from 'lucide-react';

interface ResultsProps {
  result: CalculationResult;
}

const Results: React.FC<ResultsProps> = ({ result }) => {
  const [selectedRegion, setSelectedRegion] = useState<Region | ''>('');

  // Filter products that match or slightly exceed the recommended BTU
  const recommendedProducts = MOCK_PRODUCTS.filter(
    (p) => p.btu >= result.recommendedBtu && p.btu <= result.recommendedBtu * 1.5
  ).slice(0, 3); // Take top 3

  // Fallback if no exact match, show closest higher
  const displayedProducts = recommendedProducts.length > 0 
    ? recommendedProducts 
    : MOCK_PRODUCTS.sort((a, b) => a.btu - b.btu).filter(p => p.btu >= result.recommendedBtu).slice(0, 1);

  const getInstallCost = () => {
    if (!selectedRegion) return null;
    return REGION_PRICES[selectedRegion as Region];
  };

  const installCost = getInstallCost();

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Primary Result Card */}
      <div className="bg-gradient-to-br from-[#1B3C87] to-blue-900 text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <h2 className="text-2xl font-light mb-2">Resultado Ideal</h2>
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-6xl font-bold tracking-tight">{result.recommendedBtu.toLocaleString()}</span>
          <span className="text-xl font-medium opacity-80">BTUs</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-sm bg-white/10 p-4 rounded-xl backdrop-blur-sm">
          <div>
            <span className="block opacity-60">Área (Base)</span>
            <span className="font-semibold">{Math.round(result.baseBtu)} BTU</span>
          </div>
          {result.sunLoad > 0 && (
            <div>
              <span className="block opacity-60">Sol Direto</span>
              <span className="font-semibold text-yellow-300">+{Math.round(result.sunLoad)} BTU</span>
            </div>
          )}
          <div>
            <span className="block opacity-60">Pessoas</span>
            <span className="font-semibold">{Math.round(result.peopleLoad)} BTU</span>
          </div>
          <div>
            <span className="block opacity-60">Equipamentos</span>
            <span className="font-semibold">{Math.round(result.equipmentLoad)} BTU</span>
          </div>
          <div>
            <span className="block opacity-60">Janelas</span>
            <span className="font-semibold">{Math.round(result.windowLoad)} BTU</span>
          </div>
        </div>
      </div>

      {/* Explanation of Calculation */}
      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-start gap-2">
         <Info size={16} className="shrink-0 mt-0.5" />
         <p>
           <strong>Entenda o cálculo:</strong> Utilizamos a regra padrão de 600 BTU/m² para área base. Em casos de sol direto, adicionamos 200 BTU/m². Somam-se também 600 BTU por pessoa e equipamentos, além de margem para janelas.
         </p>
      </div>

      {/* Product Recommendations */}
      <section>
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <ShoppingCart className="text-[#1B3C87]" />
          Modelos Recomendados
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition">
              <div className="h-48 bg-gray-100 relative">
                <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {product.type}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="font-bold text-gray-800 mb-2">{product.title}</h4>
                <p className="text-[#1B3C87] text-xl font-bold mb-4">{product.price}</p>
                
                <div className="mt-auto space-y-2">
                  <a href={product.affiliateLinks.amazon} className="block w-full text-center py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition flex items-center justify-center gap-2">
                    Ver na Amazon <ExternalLink size={16}/>
                  </a>
                  <a href={product.affiliateLinks.magalu} className="block w-full text-center py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition flex items-center justify-center gap-2">
                    Magalu Ofertas <ExternalLink size={16}/>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Installation Cost Estimator */}
      <section className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Wrench className="text-gray-600" />
          Estimativa de Instalação
        </h3>
        
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-600 mb-2">Selecione sua Região</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" size={18} />
              
              <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value as Region)}
                className="w-full pl-10 pr-10 p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B3C87] outline-none appearance-none cursor-pointer text-gray-700 relative z-0"
              >
                <option value="" disabled className="text-gray-400">Selecione...</option>
                {Object.values(Region).map(r => (
                  <option key={r} value={r} className="text-gray-900">{r}</option>
                ))}
              </select>
              
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" size={20} />
            </div>
          </div>

          <div className="flex-1 w-full bg-white p-4 rounded-xl border border-gray-200 text-center">
            {installCost ? (
              <div>
                <span className="block text-gray-500 text-sm mb-1">Custo Médio na região {selectedRegion}</span>
                <span className="text-2xl font-bold text-gray-800">
                  R$ {installCost.min} - R$ {installCost.max}
                </span>
                <p className="text-xs text-gray-400 mt-2">*Valores estimados para instalação básica de até 3m de tubulação.</p>
              </div>
            ) : (
              <span className="text-gray-400">Selecione uma região para ver a estimativa</span>
            )}
          </div>
        </div>
      </section>

      {/* Technical Warning */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg flex gap-3">
        <AlertCircle className="text-yellow-600 flex-shrink-0" />
        <div>
          <h4 className="font-bold text-yellow-800">Atenção Técnica</h4>
          <p className="text-sm text-yellow-700 mt-1">
            Este cálculo é uma estimativa baseada na norma NBR 16401. Fatores como pé-direito alto ({'>'}3m), telhado sem isolamento ou paredes de vidro extensas podem exigir equipamentos mais potentes. Consulte sempre um técnico especializado antes da compra.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Results;