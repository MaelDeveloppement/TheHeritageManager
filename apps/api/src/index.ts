import express from 'express';

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.get('/api/health', (req, res) => {
  res.json({ status: 'secure', message: 'Vault API is operational' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend d'élite sur le port ${port}`);
});