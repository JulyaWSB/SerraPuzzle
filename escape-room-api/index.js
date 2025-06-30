import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = 3001;
const DATA_FILE = './progresso.json';

app.use(cors());
app.use(express.json());

// Endpoint para receber progresso do jogo
app.post('/progresso', (req, res) => {
  const { sala, inventario, data } = req.body;
  if (!sala || !inventario) {
    return res.status(400).json({ erro: 'Dados incompletos' });
  }

  // Lê progresso atual
  let progresso = [];
  if (fs.existsSync(DATA_FILE)) {
    progresso = JSON.parse(fs.readFileSync(DATA_FILE));
  }

  // Adiciona novo registro
  progresso.push({ sala, inventario, data: data || new Date().toISOString() });
  fs.writeFileSync(DATA_FILE, JSON.stringify(progresso, null, 2));

  res.json({ sucesso: true, mensagem: 'Progresso salvo com sucesso!' });
});

// Endpoint para consultar todos os registros
app.get('/progresso', (req, res) => {
  if (!fs.existsSync(DATA_FILE)) return res.json([]);
  const progresso = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(progresso);
});

app.listen(PORT, () => {
  console.log(`API Escape Room rodando em http://localhost:${PORT}`);
});
