import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { type YearlyProjection, type TcoSimulationParams } from '../context/useTcoSimulation';

// Configuration des styles style "Old Money"
const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: '#FAF7F1', // Fond crème
    color: '#3A2F2A',          // Texte brun foncé
    fontFamily: 'Helvetica',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#D9D2C5',
    paddingBottom: 20,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#6B5A4D',
    marginBottom: 5,
  },
  title: {
    fontSize: 26,
    color: '#1A1A1A',
  },
  metaGrid: {
    flexDirection: 'row',
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E1DA',
    paddingBottom: 15,
  },
  metaColumn: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 8,
    textTransform: 'uppercase',
    color: '#8C7A5B',
    marginBottom: 3,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  sectionTitle: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#B87333',
    marginBottom: 15,
  },
  // Tableau
  table: {
    width: 'auto',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E1DA',
    paddingVertical: 8,
    alignItems: 'center',
  },
  tableHeader: {
    borderBottomWidth: 2,
    borderBottomColor: '#3A2F2A',
    backgroundColor: '#F3F0E6',
  },
  th: {
    fontSize: 8,
    textTransform: 'uppercase',
    color: '#6B5A4D',
    fontWeight: 'bold',
    padding: 5,
  },
  td: {
    fontSize: 9,
    padding: 5,
  },
  textRight: {
    textAlign: 'right',
  },
  colYear: { width: '10%' },
  colValue: { width: '22%', textAlign: 'right' },
  colCost: { width: '17%', textAlign: 'right' },
  colTotal: { width: '17%', textAlign: 'right' },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    borderTopWidth: 1,
    borderTopColor: '#D9D2C5',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 8,
    color: '#8C7A5B',
  }
});

interface TcoPdfReportProps {
  assetName: string;
  params: TcoSimulationParams;
  projections: YearlyProjection[];
}

const formatCurrency = (val: number) => `${val.toLocaleString('fr-FR')} €`;

export const TcoPdfReport: React.FC<TcoPdfReportProps> = ({ assetName, params, projections }) => {
  const finalProjection = projections[projections.length - 1];

  return (
    <Document title={`Rapport TCO - ${assetName}`}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.subtitle}>Heritage Asset Management — Confidential</Text>
          <Text style={styles.title}>Rapport d'Évaluation Logistique & TCO</Text>
        </View>

        {/* Résumé de l'Actif */}
        <View style={styles.metaGrid}>
          <View style={styles.metaColumn}>
            <Text style={styles.metaLabel}>Actif Spécifié</Text>
            <Text style={styles.metaValue}>{assetName}</Text>
          </View>
          <View style={styles.metaColumn}>
            <Text style={styles.metaLabel}>Valeur Initiale</Text>
            <Text style={styles.metaValue}>{formatCurrency(params.purchasePrice)}</Text>
          </View>
          <View style={styles.metaColumn}>
            <Text style={styles.metaLabel}>Coût Cumulé ({projections.length} ans)</Text>
            <Text style={[styles.metaValue, { color: '#B87333' }]}>
              {formatCurrency(finalProjection?.cumulativeCost || 0)}
            </Text>
          </View>
        </View>

        {/* Tableau des flux */}
        <Text style={styles.sectionTitle}>Projection Chronologique des Charges</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.th, styles.colYear]}>Terme</Text>
            <Text style={[styles.th, styles.colValue]}>Val. Estimée</Text>
            <Text style={[styles.th, styles.colCost]}>Assurance</Text>
            <Text style={[styles.th, styles.colCost]}>Garde / Box</Text>
            <Text style={[styles.th, styles.colCost]}>Entretien</Text>
            <Text style={[styles.th, styles.colTotal, { fontWeight: 'bold' }]}>Total Cumulé</Text>
          </View>
          
          {/* Table Body */}
          {projections.map((row) => (
            <View key={row.year} style={styles.tableRow}>
              <Text style={[styles.td, styles.colYear, { color: '#6B5A4D' }]}>An {row.year}</Text>
              <Text style={[styles.td, styles.colValue]}>{formatCurrency(row.assetValue)}</Text>
              <Text style={[styles.td, styles.colCost, { color: '#666666' }]}>{formatCurrency(row.insuranceCost)}</Text>
              <Text style={[styles.td, styles.colCost, { color: '#666666' }]}>{formatCurrency(row.storageCost)}</Text>
              <Text style={[styles.td, styles.colCost, { color: '#666666' }]}>
                {row.maintenanceCost > 0 ? formatCurrency(row.maintenanceCost) : '—'}
              </Text>
              <Text style={[styles.td, styles.colTotal, { fontWeight: 'bold', color: '#B87333' }]}>
                {formatCurrency(row.cumulativeCost)}
              </Text>
            </View>
          ))}
        </View>

        {/* Mentions Légales / Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Généré par The Heritage Manager</Text>
          <Text style={styles.footerText}>Document hautement confidentiel — Destiné à un usage privé</Text>
        </View>
      </Page>
    </Document>
  );
};