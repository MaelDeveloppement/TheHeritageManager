export type AssetCategory = 'Horology' | 'Automotive' | 'FineArt' | 'Wine' | 'RealEstate';

export interface AssetProps {
    id: string;
    name: string;
    brand: string;
    model: string;
    serialNumberEncrypted: string; // Toujours chiffré, sécurité maximale
    acquisitionDate: string; // Format ISO YYYY-MM-DD
    acquisitionPrice: number;
    currentEstimatedValue: number;
    category: AssetCategory;
    status: 'Vaulted' | 'Maintenance' | 'Transit'; // Pour savoir où est l'objet
}

