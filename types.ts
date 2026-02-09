// =======================
// ENUMS
// =======================

export enum SunExposure {
  NONE = 'Nenhuma (Sombra o dia todo)',
  PARTIAL = 'Parcial (Sol manhã ou tarde)',
  DIRECT = 'Direta (Sol o dia todo)'
}

export enum Region {
  SUL = 'Sul',
  SUDESTE = 'Sudeste',
  NORTE = 'Norte',
  NORDESTE = 'Nordeste',
  CENTRO_OESTE = 'Centro-Oeste'
}

// =======================
// STATE DA CALCULADORA
// =======================

export interface Dimensions {
  width: number;
  length: number;
}

export interface HeatSources {
  people: number;
  televisions: number;
  computers: number;
  lights: number;
  windows: number;
  other: number;
}

export interface CalculatorState {
  dimensions: Dimensions;
  sunExposure: SunExposure;
  heatSources: HeatSources;
}

// =======================
// RESULTADO DO CÁLCULO
// =======================

export interface CalculationResult {
  baseBtu: number;
  peopleLoad: number;
  equipmentLoad: number;
  windowLoad: number;
  sunLoad: number;
  totalBtu: number;
  recommendedBtu: number;
}

// =======================
// PRODUTOS / AFILIADOS
// =======================

export interface ProductRecommendation {
  id: string;
  btu: number;
  type: string;        // Ex: Inverter, High Capacity, etc
  title: string;
  price: string;       // Texto (Amazon muda preço o tempo todo)
  imageUrl: string;

  affiliateLinks: {
    amazon: string;
    magalu?: string;
  };

  // Campos opcionais (UX + conversão)
  badge?: string;        // Ex: "Mais vendido", "Melhor custo-benefício"
  highlights?: string[]; // Bullet points de venda
}
