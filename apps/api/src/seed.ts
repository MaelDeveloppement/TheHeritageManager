import { prisma } from './db.js';

async function main() {
  console.log('⏳ Début du peuplement de la base...');

  // Nettoyage au cas où pour éviter les doublons en dev
  await prisma.asset.deleteMany({});
  await prisma.user.deleteMany({});

  // Création de l'utilisateur d'élite
  const user = await prisma.user.create({
    data: {
      email: 'mael@gruandandco.com', // Ton email corporate
      name: 'Mael',
      role: 'Owner',
      assets: {
        create: [
          {
            name: 'Submariner Date',
            brand: 'Rolex',
            model: '126610LN',
            serialNumberEncrypted: 'ENC_V1_RLE_839201', // On chiffrera ça plus tard
            acquisitionDate: '2025-05-12',
            acquisitionPrice: 10200.0,
            currentEstimatedValue: 14200.0,
            category: 'Horology',
            status: 'Vaulted'
          },
          {
            name: '911 GT3 RS',
            brand: 'Porsche',
            model: '992',
            serialNumberEncrypted: 'ENC_V1_POR_992731',
            acquisitionDate: '2026-01-20',
            acquisitionPrice: 245000.0,
            currentEstimatedValue: 265000.0, // Les prix montent, inflation oblige
            category: 'Automotive',
            status: 'Vaulted'
          }
        ]
      }
    }
  });

  console.log(`✅ Base de données initialisée avec l'utilisateur : ${user.name}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});