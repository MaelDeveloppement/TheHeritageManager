import { useState, useMemo } from 'react';

export interface TcoSimulationParams {
  purchasePrice: number;
  insuranceAnnualRate: number;    // ex: 0.015 pour 1.5%
  storageMonthlyCost: number;
  maintenanceIntervalYears: number;
  maintenanceAverageCost: number;
  annualAppreciationRate: number; // ex: 0.04 pour +4%
  inflationRate: number;          // ex: 0.02 pour +2% par an sur les coûts
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

export const useTcoSimulation = (initialParams: TcoSimulationParams, defaultDuration = 10) => {
  const [params, setParams] = useState<TcoSimulationParams>(initialParams);
  const [duration, setDuration] = useState<number>(defaultDuration);

  const updateParam = (key: keyof TcoSimulationParams, value: number) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const projections = useMemo(() => {
    const list: YearlyProjection[] = [];
    let currentAssetValue = params.purchasePrice;
    let totalCumulativeCost = 0;

    for (let year = 1; year <= duration; year++) {
      // Indexation de la valeur de l'actif
      currentAssetValue = currentAssetValue * (1 + params.annualAppreciationRate);

      // Application de l'inflation sur les coûts de maintenance et stockage d'année en année
      const inflationFactor = Math.pow(1 + params.inflationRate, year - 1);
      
      const insuranceCost = currentAssetValue * params.insuranceAnnualRate;
      const storageCost = (params.storageMonthlyCost * 12) * inflationFactor;
      
      const isMaintenanceYear = year % params.maintenanceIntervalYears === 0;
      const maintenanceCost = isMaintenanceYear ? (params.maintenanceAverageCost * inflationFactor) : 0;

      const totalYearlyOutflow = insuranceCost + storageCost + maintenanceCost;
      totalCumulativeCost += totalYearlyOutflow;

      list.push({
        year,
        assetValue: Math.round(currentAssetValue),
        insuranceCost: Math.round(insuranceCost),
        storageCost: Math.round(storageCost),
        maintenanceCost: Math.round(maintenanceCost),
        totalYearlyOutflow: Math.round(totalYearlyOutflow),
        cumulativeCost: Math.round(totalCumulativeCost),
      });
    }
    return list;
  }, [params, duration]);

  return { params, updateParam, duration, setDuration, projections };
};