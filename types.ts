// types.ts

export enum SunExposure {
  NONE = "Nenhuma (Sombra o dia todo)",
  PARTIAL = "Parcial (Sol manhã ou tarde)",
  DIRECT = "Direta (Sol o dia todo)",
}

export enum Region {
  SUL = "Sul",
  SUDESTE = "Sudeste",
  NORTE = "Norte",
  NORDESTE = "Nordeste",
  CENTRO_OESTE = "Centro-Oeste",
}

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

export interface CalculationResult {
  baseBtu: number;
  peopleLoad: number;
  equipmentLoad: number;
  windowLoad: number;
  sunLoad: number;
  totalBtu: number;
  recommendedBtu: number;
}

export interface ProductRecommendation {
  id: string;
  btu: number;
  type: string;
  title: string;
  price?: string; // pode ficar vazio se você quiser “consultar na Amazon”
  imageUrl?: string; // pode ser local ou url
  affiliateLinks: {
    amazon: string;
    magalu?: string;
  };

  // extras pro layout “premium”
  badge?: string;
  highlights?: string[];
}
