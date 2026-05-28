import React from 'react';
import { useTcoSimulation, type TcoSimulationParams } from '../context/useTcoSimulation';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
};

interface TcoSimulatorProps {
  initialAsset: {
    price: number;
    name: string;
  };
}

export const TcoSimulator: React.FC<TcoSimulatorProps> = ({ initialAsset }) => {
  const defaultParams: TcoSimulationParams = {
    purchasePrice: initialAsset.price,
    insuranceAnnualRate: 0.012, // 1.2% par défaut
    storageMonthlyCost: 250,
    maintenanceIntervalYears: 2,
    maintenanceAverageCost: 1500,
    annualAppreciationRate: 0.03, // +3% par an
    inflationRate: 0.02,          // 2% d'inflation sur les services
  };

  const { params, updateParam, duration, setDuration, projections } = useTcoSimulation(defaultParams, 10);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] p-8 font-sans">
      {/* Header */}
      <header className="border-b border-[#D4AF37]/30 pb-6 mb-8">
        <p className="text-xs tracking-widest uppercase text-[#8C7A5B] mb-2">Simulateur de Patrimoine</p>
        <h1 className="text-4xl font-serif italic text-[#1A1A1A]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Total Cost of Ownership — {initialAsset.name}
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Panneau des Paramètres / Sliders */}
        <div className="bg-white border border-[#E6E1DA] p-6 rounded-none shadow-sm h-fit">
          <h2 className="text-lg font-medium border-b border-[#E6E1DA] pb-3 mb-6 uppercase tracking-wider text-[#8C7A5B]">
            Variables de Simulation
          </h2>

          <div className="space-y-6">
            <div>
              <label className="flex justify-between text-sm mb-2">
                <span>Frais de stockage mensuels</span>
                <span className="font-semibold">{formatCurrency(params.storageMonthlyCost)}</span>
              </label>
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={params.storageMonthlyCost}
                onChange={(e) => updateParam('storageMonthlyCost', Number(e.target.value))}
                className="w-full accent-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm mb-2">
                <span>Cycle de maintenance (années)</span>
                <span className="font-semibold">{params.maintenanceIntervalYears} ans</span>
              </label>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={params.maintenanceIntervalYears}
                onChange={(e) => updateParam('maintenanceIntervalYears', Number(e.target.value))}
                className="w-full accent-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm mb-2">
                <span>Coût moyen d'une révision</span>
                <span className="font-semibold">{formatCurrency(params.maintenanceAverageCost)}</span>
              </label>
              <input
                type="range"
                min="0"
                max="25000"
                step="500"
                value={params.maintenanceAverageCost}
                onChange={(e) => updateParam('maintenanceAverageCost', Number(e.target.value))}
                className="w-full accent-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm mb-2">
                <span>Taux d'appréciation annuel de l'actif</span>
                <span className="font-semibold">{(params.annualAppreciationRate * 100).toFixed(1)} %</span>
              </label>
              <input
                type="range"
                min="-0.10"
                max="0.20"
                step="0.005"
                value={params.annualAppreciationRate}
                onChange={(e) => updateParam('annualAppreciationRate', Number(e.target.value))}
                className="w-full accent-[#1A1A1A]"
              />
            </div>

            <div className="pt-4 border-t border-[#E6E1DA]">
              <label className="flex justify-between text-sm mb-2">
                <span>Horizon de projection</span>
                <span className="font-semibold">{duration} ans</span>
              </label>
              <input
                type="range"
                min="5"
                max="30"
                step="5"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full accent-[#1A1A1A]"
              />
            </div>
          </div>
        </div>

        {/* Table des Projections Financières */}
        <div className="lg:col-span-2 bg-white border border-[#E6E1DA] p-6 shadow-sm overflow-x-auto">
          <h2 className="text-lg font-medium border-b border-[#E6E1DA] pb-3 mb-6 uppercase tracking-wider text-[#8C7A5B]">
            Projection chronologique des flux
          </h2>

          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#1A1A1A] text-xs uppercase tracking-wider text-[#8C7A5B]">
                <th className="py-3 font-medium">Année</th>
                <th className="py-3 font-medium text-right">Valeur Estimée</th>
                <th className="py-3 font-medium text-right">Assurance</th>
                <th className="py-3 font-medium text-right">Garde / Box</th>
                <th className="py-3 font-medium text-right">Entretien</th>
                <th className="py-3 font-medium text-right font-semibold text-[#1A1A1A]">Coût Cumulé</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E1DA]/60">
              {projections.map((row) => (
                <tr key={row.year} className="hover:bg-[#FDFBF7] transition-colors">
                  <td className="py-4 font-mono text-[#8C7A5B]">An {row.year}</td>
                  <td className="py-4 text-right font-medium">{formatCurrency(row.assetValue)}</td>
                  <td className="py-4 text-right text-[#666666]">{formatCurrency(row.insuranceCost)}</td>
                  <td className="py-4 text-right text-[#666666]">{formatCurrency(row.storageCost)}</td>
                  <td className="py-4 text-right text-[#666666]">
                    {row.maintenanceCost > 0 ? formatCurrency(row.maintenanceCost) : <span className="text-gray-300">—</span>}
                  </td>
                  <td className="py-4 text-right font-semibold text-[#8C7A5B]">
                    {formatCurrency(row.cumulativeCost)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};