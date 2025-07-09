const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

// Armazenamento do usuário e da senha em hash
const usuarios = [
  {
    nome: 'luma',
    senhaHash: '$2b$10$K0Y9f85qiUY3YvglsunuV.2Xlt4CE5X99Y3jw94C33k6ie0E5c8hC',
  },
];

app.post('/login', async (req, res) => {
  console.log('Recebido:', req.body); // Para teste de funcionamento, executado no terminal exibindo o sucesso do login ou com erro
 
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
