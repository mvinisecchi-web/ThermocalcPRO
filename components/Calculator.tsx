import React from 'react';
import { Minus, Plus, Ruler, Sun, Users, Monitor, Tv, Lightbulb, Box, Calculator as CalcIcon } from 'lucide-react';
import { CalculatorState, Dimensions, HeatSources, SunExposure } from '../types';

interface CalculatorProps {
  state: CalculatorState;
  onChange: (newState: CalculatorState) => void;
  onCalculate: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ state, onChange, onCalculate }) => {
  
  const updateDimension = (field: keyof Dimensions, value: number) => {
    onChange({
      ...state,
      dimensions: { ...state.dimensions, [field]: Math.max(0, value) }
    });
  };

  const updateSource = (field: keyof HeatSources, delta: number) => {
    onChange({
      ...state,
      heatSources: { 
        ...state.heatSources, 
        [field]: Math.max(0, state.heatSources[field] + delta) 
      }
    });
  };

  const handleSourceInputChange = (field: keyof HeatSources, value: string) => {
    if (value === '') {
       onChange({
        ...state,
        heatSources: { ...state.heatSources, [field]: 0 }
      });
      return;
    }
    
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      onChange({
        ...state,
        heatSources: {
          ...state.heatSources,
          [field]: Math.max(0, numValue)
        }
      });
    }
  };

  const area = (state.dimensions.width * state.dimensions.length).toFixed(1);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-8 border-t-4 border-[#1B3C87] relative">
      
      {/* SECTION A: DIMENSIONS */}
      <section className="animate-fade-in">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl text-[#1B3C87] shadow-sm">
            <Ruler size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-800">1. Medidas do Ambiente</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 group">
            <label className="text-sm font-semibold text-gray-600 transition-colors group-hover:text-[#1B3C87]">Largura (m)</label>
            <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
              <button onClick={() => updateDimension('width', state.dimensions.width - 0.5)} aria-label="Diminuir largura" className="w-10 h-10 rounded-lg bg-white shadow-sm border border-gray-100 hover:bg-gray-50 text-gray-500 flex items-center justify-center transition active:scale-90">
                <Minus size={16} />
              </button>
              <input 
                type="number" 
                step="0.1"
                value={state.dimensions.width}
                onChange={(e) => updateDimension('width', parseFloat(e.target.value) || 0)}
                className="w-full text-center bg-transparent outline-none font-bold text-xl text-gray-800"
              />
              <button onClick={() => updateDimension('width', state.dimensions.width + 0.5)} aria-label="Aumentar largura" className="w-10 h-10 rounded-lg bg-[#1B3C87] shadow-md shadow-blue-900/20 hover:bg-blue-800 text-white flex items-center justify-center transition active:scale-90">
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="space-y-2 group">
            <label className="text-sm font-semibold text-gray-600 transition-colors group-hover:text-[#1B3C87]">Comprimento (m)</label>
            <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
              <button onClick={() => updateDimension('length', state.dimensions.length - 0.5)} aria-label="Diminuir comprimento" className="w-10 h-10 rounded-lg bg-white shadow-sm border border-gray-100 hover:bg-gray-50 text-gray-500 flex items-center justify-center transition active:scale-90">
                <Minus size={16} />
              </button>
              <input 
                type="number" 
                step="0.1"
                value={state.dimensions.length}
                onChange={(e) => updateDimension('length', parseFloat(e.target.value) || 0)}
                className="w-full text-center bg-transparent outline-none font-bold text-xl text-gray-800"
              />
              <button onClick={() => updateDimension('length', state.dimensions.length + 0.5)} aria-label="Aumentar comprimento" className="w-10 h-10 rounded-lg bg-[#1B3C87] shadow-md shadow-blue-900/20 hover:bg-blue-800 text-white flex items-center justify-center transition active:scale-90">
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-center text-blue-800 font-semibold text-sm">
          Área Calculada: <span className="text-lg">{area} m²</span>
        </div>
      </section>

      {/* SECTION B: SUN EXPOSURE */}
      <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl text-orange-600 shadow-sm">
            <Sun size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-800">2. Exposição Solar</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {Object.values(SunExposure).map((option) => (
            <button
              key={option}
              onClick={() => onChange({ ...state, sunExposure: option })}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-sm font-medium relative overflow-hidden group ${
                state.sunExposure === option
                  ? 'border-[#1B3C87] bg-blue-50 text-[#1B3C87] shadow-md'
                  : 'border-gray-100 hover:border-blue-300 text-gray-500 hover:bg-white bg-gray-50'
              }`}
            >
              <span className="relative z-10">{option}</span>
              {state.sunExposure === option && (
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-200/50 rounded-tl-full -mr-2 -mb-2"></div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* SECTION C: HEAT SOURCES */}
      <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-gradient-to-br from-red-100 to-red-50 rounded-xl text-red-600 shadow-sm">
            <Users size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-800">3. Fontes de Calor</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { key: 'people', label: 'Pessoas', icon: <Users size={20} /> },
            { key: 'televisions', label: 'TVs', icon: <Tv size={20} /> },
            { key: 'computers', label: 'Computadores', icon: <Monitor size={20} /> },
            { key: 'lights', label: 'Lâmpadas', icon: <Lightbulb size={20} /> },
            { key: 'windows', label: 'Janelas', icon: <Box size={20} /> },
            { key: 'other', label: 'Outros', icon: <Box size={20} /> },
          ].map((item) => (
            <div key={item.key} className="flex flex-col items-center p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 group">
              <span className="text-gray-400 group-hover:text-[#1B3C87] transition-colors mb-2 bg-gray-50 p-2 rounded-full">{item.icon}</span>
              <span className="text-sm text-gray-600 font-medium mb-3">{item.label}</span>
              <div className="flex items-center gap-2 w-full justify-center">
                <button 
                  onClick={() => updateSource(item.key as keyof HeatSources, -1)}
                  aria-label={`Diminuir ${item.label}`}
                  className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-600 flex items-center justify-center transition shrink-0"
                >
                  <Minus size={14} />
                </button>
                
                <input 
                  type="number" 
                  min="0"
                  value={state.heatSources[item.key as keyof HeatSources]}
                  onChange={(e) => handleSourceInputChange(item.key as keyof HeatSources, e.target.value)}
                  className="w-12 text-center py-1 bg-transparent border-b-2 border-gray-200 focus:border-[#1B3C87] outline-none font-bold text-gray-900"
                />

                <button 
                  onClick={() => updateSource(item.key as keyof HeatSources, 1)}
                  aria-label={`Aumentar ${item.label}`}
                  className="w-8 h-8 rounded-full bg-[#1B3C87] text-white flex items-center justify-center hover:bg-blue-800 transition shrink-0 shadow-sm"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button
        onClick={onCalculate}
        className="w-full py-5 bg-gradient-to-r from-[#1B3C87] to-blue-600 hover:to-blue-700 text-white text-xl font-bold rounded-xl shadow-xl shadow-blue-900/20 transform transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:animate-shimmer"></div>
        <CalcIcon className="group-hover:rotate-12 transition-transform" />
        <span>CALCULAR CARGA TÉRMICA</span>
      </button>
    </div>
  );
};

export default Calculator;