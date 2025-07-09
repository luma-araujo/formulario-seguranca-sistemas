const bcrypt = require('bcrypt');

const hash = '$2b$10$K0Y9f85qiUY3YvglsunuV.2Xlt4CE5X99Y3jw94C33k6ie0E5c8hC';
const senhaTeste = '@Senha1234'; 

bcrypt.compare(senhaTeste, hash).then(result => {
  console.log('Senha bate com hash?', result); // True ou false
}).catch(err => {
  console.error('Erro:', err);
});
