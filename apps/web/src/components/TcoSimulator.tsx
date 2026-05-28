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
    insuranceAnnualRate: 0.012,
    storageMonthlyCost: 250,
    maintenanceIntervalYears: 2,
    maintenanceAverageCost: 1500,
    annualAppreciationRate: 0.03,
    inflationRate: 0.02,
  };

  const { params, updateParam, duration, setDuration, projections } = useTcoSimulation(defaultParams, 10);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FAF7F1', // Crème de luxe
      color: '#3A2F2A',          // Brun très foncé
      padding: '40px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid #D9D2C5', paddingBottom: '24px', marginBottom: '32px' }}>
        <p style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B5A4D', letterSpacing: '2px', margin: '0 0 8px 0' }}>
          Simulateur de Patrimoine
        </p>
        <h1 style={{ fontSize: '38px', fontWeight: 'normal', margin: 0, color: '#1A1A1A' }}>
          Total Cost of Ownership — <span style={{ fontStyle: 'italic' }}>{initialAsset.name}</span>
        </h1>
      </header>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', alignItems: 'start' }}>
        
        {/* Left Control Panel */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #D9D2C5', padding: '30px' }}>
          <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: '#B87333', borderBottom: '1px solid #FAF7F1', paddingBottom: '12px', marginTop: 0, marginBottom: '24px' }}>
            Variables de Simulation
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                <span>Frais de stockage mensuels</span>
                <span style={{ fontWeight: 'bold' }}>{formatCurrency(params.storageMonthlyCost)}</span>
              </div>
              <input
                type="range" min="0" max="2000" step="50"
                value={params.storageMonthlyCost}
                onChange={(e) => updateParam('storageMonthlyCost', Number(e.target.value))}
                style={{ width: '100%', accentColor: '#3A2F2A' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                <span>Cycle de maintenance</span>
                <span style={{ fontWeight: 'bold' }}>{params.maintenanceIntervalYears} ans</span>
              </div>
              <input
                type="range" min="1" max="5" step="1"
                value={params.maintenanceIntervalYears}
                onChange={(e) => updateParam('maintenanceIntervalYears', Number(e.target.value))}
                style={{ width: '100%', accentColor: '#3A2F2A' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                <span>Coût d'une révision</span>
                <span style={{ fontWeight: 'bold' }}>{formatCurrency(params.maintenanceAverageCost)}</span>
              </div>
              <input
                type="range" min="0" max="25000" step="500"
                value={params.maintenanceAverageCost}
                onChange={(e) => updateParam('maintenanceAverageCost', Number(e.target.value))}
                style={{ width: '100%', accentColor: '#3A2F2A' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                <span>Appréciation annuelle</span>
                <span style={{ fontWeight: 'bold' }}>{(params.annualAppreciationRate * 100).toFixed(1)} %</span>
              </div>
              <input
                type="range" min="-0.10" max="0.20" step="0.005"
                value={params.annualAppreciationRate}
                onChange={(e) => updateParam('annualAppreciationRate', Number(e.target.value))}
                style={{ width: '100%', accentColor: '#3A2F2A' }}
              />
            </div>

            <div style={{ paddingTop: '16px', borderTop: '1px solid #E6E1DA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                <span>Horizon temporel</span>
                <span style={{ fontWeight: 'bold' }}>{duration} ans</span>
              </div>
              <input
                type="range" min="5" max="30" step="5"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#3A2F2A' }}
              />
            </div>
          </div>
        </div>

        {/* Right Data Table */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #D9D2C5', padding: '30px', overflowX: 'auto' }}>
          <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: '#B87333', paddingBottom: '12px', marginTop: 0, marginBottom: '24px' }}>
            Projection Chronologique des Flux
          </h2>

          <table style={{ width: '100%', borderCollapse: 'collapse', textTransform: 'none' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #3A2F2A' }}>
                <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '12px', color: '#6B5A4D', textTransform: 'uppercase' }}>Année</th>
                <th style={{ padding: '12px 8px', textAlign: 'right', fontSize: '12px', color: '#6B5A4D', textTransform: 'uppercase' }}>Valeur Actif</th>
                <th style={{ padding: '12px 8px', textAlign: 'right', fontSize: '12px', color: '#6B5A4D', textTransform: 'uppercase' }}>Assurance</th>
                <th style={{ padding: '12px 8px', textAlign: 'right', fontSize: '12px', color: '#6B5A4D', textTransform: 'uppercase' }}>Garde / Box</th>
                <th style={{ padding: '12px 8px', textAlign: 'right', fontSize: '12px', color: '#6B5A4D', textTransform: 'uppercase' }}>Entretien</th>
                <th style={{ padding: '12px 8px', textAlign: 'right', fontSize: '12px', color: '#3A2F2A', textTransform: 'uppercase', fontWeight: 'bold' }}>Coût Cumulé</th>
              </tr>
            </thead>
            <tbody>
              {projections.map((row: any ) => (
                <tr key={row.year} style={{ borderBottom: '1px solid #E6E1DA' }}>
                  <td style={{ padding: '14px 8px', fontSize: '14px', color: '#6B5A4D', fontFamily: 'monospace' }}>An {row.year}</td>
                  <td style={{ padding: '14px 8px', fontSize: '14px', textAlign: 'right', fontWeight: 500 }}>{formatCurrency(row.assetValue)}</td>
                  <td style={{ padding: '14px 8px', fontSize: '14px', textAlign: 'right', color: '#666666' }}>{formatCurrency(row.insuranceCost)}</td>
                  <td style={{ padding: '14px 8px', fontSize: '14px', textAlign: 'right', color: '#666666' }}>{formatCurrency(row.storageCost)}</td>
                  <td style={{ padding: '14px 8px', fontSize: '14px', textAlign: 'right', color: '#666666' }}>
                    {row.maintenanceCost > 0 ? formatCurrency(row.maintenanceCost) : '—'}
                  </td>
                  <td style={{ padding: '14px 8px', fontSize: '14px', textAlign: 'right', fontWeight: 'bold', color: '#B87333' }}>
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