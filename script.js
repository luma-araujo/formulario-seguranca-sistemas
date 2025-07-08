const form = document.getElementById('formLogin');
const mensagem = document.getElementById('mensagem');

function verificarSenha(senha) {     //condições para a verificação da senha digitada pelo usuário
  const temMaisDe8Letras = senha.length > 8;
  const temCaractereEspecial = /[!@#$%^&*()_+\-=\]{};':"\\|,.<>?]/.test(senha);
  const temNumero = /\d/.test(senha);

  if (!temMaisDe8Letras && !temCaractereEspecial && !temNumero) {
    return 'A senha deve ter mais de 8 letras, conter pelo menos um caractere especial e um número.';
  } else if (!temMaisDe8Letras && !temCaractereEspecial) {
    return 'A senha deve ter mais de 8 letras e conter pelo menos um caractere especial.';
  } else if (!temMaisDe8Letras && !temNumero) {
    return 'A senha deve ter mais de 8 letras e conter pelo menos um número.';
  } else if (!temCaractereEspecial && !temNumero) {
    return 'A senha deve conter pelo menos um caractere especial e um número.';
  } else if (!temMaisDe8Letras) {
    return 'A senha deve ter mais de 8 letras.';
  } else if (!temCaractereEspecial) {
    return 'A senha deve conter pelo menos um caractere especial.';
  } else if (!temNumero) {
    return 'A senha deve conter pelo menos um número.';
  } else {
    return 'válida';
  }
}

form.addEventListener('submit', async function (e) {
  e.preventDefault(); // Evita que o formulário recarregue a página

  const nome = document.getElementById('nome').value;
  const senha = document.getElementById('senha').value;

  // Verificação da estrutura da senha
  const resultado = verificarSenha(senha);
  if (resultado !== 'válida') {
    mensagem.innerText = `${resultado}`;
    mensagem.style.color = 'red';
    return;
  }

console.log('Enviando para backend:', { nome, senha });


  // Envio dos dados para o backend
  const resposta = await fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, senha }),
  });

  const dados = await resposta.json();

  if (resposta.ok) {
    mensagem.innerText = 'Login bem-sucedido!';
    mensagem.style.color = 'green';
  } else {
    mensagem.innerText = `${dados.erro || dados.message}`;
    mensagem.style.color = 'red';
  }
});
