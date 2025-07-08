const bcrypt = require('bcrypt');

const hash = '$2b$10$zoGuxYv7C0dc/ahVxEatNuzhoyjkNxTJDCGGcUPX9a8f7hVEcm/wa';
const senhaTeste = 'Senha1234!'; 

bcrypt.compare(senhaTeste, hash).then(result => {
  console.log('Senha bate com hash?', result); // true ou false
}).catch(err => {
  console.error('Erro:', err);
});