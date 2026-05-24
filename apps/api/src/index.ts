import express from 'express';
import cors from 'cors'
import { prisma } from './db.js';

const app = express();

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app.use(express.json())
app.use(cors({
  origin: ['http://localhost:5173', 'https://theheritagemanager-production.up.railway.app/'] 
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

app.listen(port, () => {
  console.log(`Backend d'élite sur le port ${port}`);
});