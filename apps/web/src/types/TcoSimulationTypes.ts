export interface TcoSimulationParams {
  purchasePrice: number;        // Prix d'achat de l'actif
  insuranceAnnualRate: number;  // Pourcentage de la valeur de l'actif (ex: 0.015 pour 1.5%)
  storageMonthlyCost: number;   // Gardiennage / Box sécurisé par mois
  maintenanceIntervalYears: number; // Tous les combien d'années on fait la grosse révision
  maintenanceAverageCost: number;  // Coût de cette révision
  annualAppreciationRate: number; // Évolution de la valeur de l'objet (inflation/hype, ex: 0.04 pour +4%/an)
}

export interface YearlyProjection {
  year: number;
  assetValue: number;
  insuranceCost: number;
  storageCost: number;
  maintenanceCost: number;
  totalYearlyOutflow: number;
  cumulativeCost: number;
}