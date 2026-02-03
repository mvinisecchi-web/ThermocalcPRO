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

export interface HeatSources {
  people: number;
  televisions: number;
  computers: number;
  lights: number;
  windows: number;
  other: number;
}

export interface Dimensions {
  width: number;
  length: number;
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