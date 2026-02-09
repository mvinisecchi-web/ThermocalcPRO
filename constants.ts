import { Region, SunExposure } from './types';

// BTU Factors (Aligned with market standards + safety margin)
export const BTU_FACTORS = {
  BASE_SQM: 600,         // Base load per m² (shade)
  SUN_ADDITION_SQM: 200, // Additional load per m² if direct sun (Total 800)
  PERSON: 600,           // Per person (standard metabolic rate avg)
  ELECTRONIC: 600,       // TV/PC average heat dissipation
  LIGHT_SQM: 100,        // Per light bulb (approx. conservative LED/CFL mix)
  WINDOW: 400,           // Per window (conduction/infiltration margin)
};

// Standard BTU capacities available in market
export const STANDARD_BTUS = [
  9000, 12000, 18000, 24000, 30000, 36000, 48000, 60000
];

export const REGION_PRICES: Record<Region, { min: number; max: number }> = {
  [Region.SUL]: { min: 700, max: 1200 },
  [Region.SUDESTE]: { min: 700, max: 1200 },
  [Region.NORDESTE]: { min: 500, max: 900 },
  [Region.NORTE]: { min: 600, max: 1000 },
  [Region.CENTRO_OESTE]: { min: 650, max: 1100 },
};

// IMPORTANTE: Substitua os '#' abaixo pelos seus links de afiliado reais da Amazon/Magalu
export const MOCK_PRODUCTS = [
  {
    id: '1',
    btu: 9000,
    type: 'Inverter',
    title: 'Ar-Condicionado Split Inverter 9000 BTUs',
    price: 'R$ 1.899,00',
    imageUrl: 'https://placehold.co/600x400/e2e8f0/1e293b.png?text=Split+Inverter+9000',
    affiliateLinks: { 
      amazon: 'https://www.amazon.com.br/s?k=ar+condicionado+9000+btu+inverter&tag=SEU_TAG_AQUI', 
      magalu: 'https://www.magazinevoce.com.br/magazineSEULOJA/busca/ar+condicionado+9000+btu/' 
    }
  },
  {
    id: '2',
    btu: 12000,
    type: 'Inverter',
    title: 'Ar-Condicionado Split Inverter 12000 BTUs',
    price: 'R$ 2.299,00',
    imageUrl: 'https://placehold.co/600x400/e2e8f0/1e293b.png?text=Split+Inverter+12000',
    affiliateLinks: { 
      amazon: 'https://www.amazon.com.br/s?k=ar+condicionado+12000+btu+inverter&tag=SEU_TAG_AQUI', 
      magalu: 'https://www.magazinevoce.com.br/magazineSEULOJA/busca/ar+condicionado+12000+btu/' 
    }
  },
  {
    id: '3',
    btu: 18000,
    type: 'Split',
    title: 'Ar-Condicionado Split High Wall 18000 BTUs',
    price: 'R$ 3.100,00',
    imageUrl: 'https://placehold.co/600x400/e2e8f0/1e293b.png?text=Split+18000',
    affiliateLinks: { 
      amazon: 'https://www.amazon.com.br/s?k=ar+condicionado+18000+btu&tag=SEU_TAG_AQUI', 
      magalu: 'https://www.magazinevoce.com.br/magazineSEULOJA/busca/ar+condicionado+18000+btu/' 
    }
  },
  {
    id: '4',
    btu: 24000,
    type: 'Inverter',
    title: 'Ar-Condicionado Split Inverter 24000 BTUs',
    price: 'R$ 4.500,00',
    imageUrl: 'https://placehold.co/600x400/e2e8f0/1e293b.png?text=Inverter+24000',
    affiliateLinks: { 
      amazon: 'https://www.amazon.com.br/s?k=ar+condicionado+24000+btu&tag=SEU_TAG_AQUI', 
      magalu: 'https://www.magazinevoce.com.br/magazineSEULOJA/busca/ar+condicionado+24000+btu/' 
    }
  }
];