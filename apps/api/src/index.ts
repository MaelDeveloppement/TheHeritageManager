import express from 'express';
import cors from 'cors'
import { prisma } from './db.js';

const app = express();

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app.use(express.json())
app.use(cors({
  origin: '*', // Plus de prise de tête avec les slashes ou les sous-domaines Railway
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/api/health', (req, res) => {
  res.json({ status: 'secure', message: 'Vault API is operational' });
});

app.get('/api/assets', async (req, res) => {
  try {
    const assets = await prisma.asset.findMany();
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: "Impossible de récupérer le coffre-fort" });
  }
});
app.get('/api/security-ping', async (req, res) => {
  try {
    const startTime = Date.now();
    
    // Un ping réel sur la base de données pour vérifier la latence
    await prisma.$queryRaw`SELECT 1`;
    
    const latency = Date.now() - startTime;

    res.json({
      status: "DEFCON_1",
      secure: true,
      timestamp: new Date().toISOString(),
      database: {
        status: "CONNECTED",
        latency: `${latency}ms`
      },
      system: "ALL_SYSTEMS_OPERATIONAL"
    });
  } catch (error) {
    res.status(500).json({ 
      status: "BREACH_DETECTED", 
      secure: false, 
      error: "Database handshake failed" 
    });
  }
});

app.listen(port, () => {
  console.log(`Backend d'élite sur le port ${port}`);
});