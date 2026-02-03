import React from 'react';
import { Leaf, DollarSign, Wind, CheckCircle2 } from 'lucide-react';

const InfoHub: React.FC = () => {
  return (
    <div className="space-y-12 py-10">
      
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Leaf className="text-green-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Inverter vs. Convencional</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Modelos <strong>Inverter</strong> ajustam a velocidade do compressor, economizando até 60% de energia e sendo mais silenciosos. O Convencional (On/Off) é mais barato na compra, mas gasta mais luz pois liga e desliga o motor constantemente.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <DollarSign className="text-blue-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Como Economizar Energia</h3>
          <ul className="text-gray-600 text-sm space-y-2">
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-1 text-blue-500" /> Mantenha filtros limpos mensalmente.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-1 text-blue-500" /> Configure entre 23ºC e 24ºC.</li>
            <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-1 text-blue-500" /> Evite sol direto na unidade externa.</li>
          </ul>
        </div>
      </div>

      {/* SEO Content */}
      <article className="prose prose-blue max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-[#1B3C87]">Entendendo a Carga Térmica (BTU)</h2>
        <p>
          O cálculo de <strong>carga térmica</strong> é essencial para determinar quantos BTUs (British Thermal Units) seu ambiente precisa. Um ar-condicionado subdimensionado não gela e gasta muita energia. Já um superdimensionado liga e desliga muito (ciclos curtos), reduzindo a vida útil e não desumidificando corretamente.
        </p>
        <p>
          Nossa ferramenta utiliza parâmetros da norma para entregar o <em>ar condicionado ideal</em> para seu quarto, sala ou escritório. Fatores como exposição solar, número de eletrônicos e pessoas influenciam diretamente no resultado final.
        </p>
      </article>

      {/* Ad Placeholder */}
      <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300">
        <span>Espaço para Google AdSense / Banner Publicitário</span>
      </div>
    </div>
  );
};

export default InfoHub;