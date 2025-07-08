const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

// Usuário e senha em hash
const usuarios = [
  {
    nome: 'luma',
    senhaHash: '$2b$10$zoGuxYv7C0dc/ahVxEatNuzhoyjkNxTJDCGGcUPX9a8f7hVEcm/wa',
  },
];

app.post('/login', async (req, res) => {
  console.log('Recebido:', req.body); // para debug

  const { nome, senha } = req.body;

  const usuario = usuarios.find((u) => u.nome === nome);

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash);
  console.log('Senha correta?', senhaCorreta);

  if (senhaCorreta) {
    res.json({ mensagem: 'Login realizado com sucesso!' });
  } else {
    res.status(401).json({ erro: 'Senha incorreta' });
  }
});

app.listen(3001, () => {
  console.log('Backend rodando na porta 3001');
});