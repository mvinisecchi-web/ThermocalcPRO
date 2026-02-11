<<<<<<< HEAD
// =======================
// ENUMS
// =======================

=======
>>>>>>> f02f9b026814d6f3e9d3f5c591063081409a2f71
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

<<<<<<< HEAD
// =======================
// STATE DA CALCULADORA
// =======================

export interface Dimensions {
  width: number;
  length: number;
}

=======
>>>>>>> f02f9b026814d6f3e9d3f5c591063081409a2f71
export interface HeatSources {
  people: number;
  televisions: number;
  computers: number;
  lights: number;
  windows: number;
  other: number;
}

<<<<<<< HEAD
=======
export interface Dimensions {
  width: number;
  length: number;
}

>>>>>>> f02f9b026814d6f3e9d3f5c591063081409a2f71
export interface CalculatorState {
  dimensions: Dimensions;
  sunExposure: SunExposure;
  heatSources: HeatSources;
}

<<<<<<< HEAD
// =======================
// RESULTADO DO CÁLCULO
// =======================

=======
>>>>>>> f02f9b026814d6f3e9d3f5c591063081409a2f71
export interface CalculationResult {
  baseBtu: number;
  peopleLoad: number;
  equipmentLoad: number;
  windowLoad: number;
  sunLoad: number;
  totalBtu: number;
  recommendedBtu: number;
}

<<<<<<< HEAD
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
=======
export interface ProductRecommendation {
  id: string;
  title: string;
  btu: number;
  type: 'Split' | 'Inverter' | 'Janela' | 'Multi-Split';
  price: string;
  imageUrl: string;
  affiliateLinks: {
    amazon?: string;
    magalu?: string;
    generic?: string;
  };
}

export interface InstallationEstimate {
  min: number;
  max: number;
}
>>>>>>> f02f9b026814d6f3e9d3f5c591063081409a2f71
