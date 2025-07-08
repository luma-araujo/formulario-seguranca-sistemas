const bcrypt = require('bcrypt');

const senha = 'Senha1234!';

bcrypt.hash(senha, 10).then((hash) => {
  console.log('Hash da senha:', hash);
});