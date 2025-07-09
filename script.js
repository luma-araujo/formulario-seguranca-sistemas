const form = document.getElementById('formLogin');         //pega o formulário com esse id e insere na variável
const mensagem = document.getElementById('mensagem');     //pega o parágrafo com esse id e insere na variável

function verificarSenha(senha) {     //função para verificação da senha inserida pelo usuário 
  const temMaisDe8Letras = senha.length > 8;
  const temCaractereEspecial = /[!@#$%^&*()_+\-=\]{};':"\\|,.<>?]/.test(senha);
  const temNumero = /\d/.test(senha);

  if (!temMaisDe8Letras && !temCaractereEspecial && !temNumero) {       //condições para a verificação da senha digitada pelo usuário
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

  const nome = document.getElementById('nome').value;        //pega o valor do input com id nome e insere na variável
  const senha = document.getElementById('senha').value;      //pega o valor do input com id senha e insere na variável

  // Verificação da estrutura da senha
  const resultado = verificarSenha(senha);
  if (resultado !== 'válida') {
    mensagem.innerText = `${resultado}`;      //insere no parágrafo a mensagem de resposta da verificação
    mensagem.style.color = 'red';
    return;
  }

  // Envio dos dados para o backend
  const resposta = await fetch('http://localhost:3001/login', {    //Realização da requisição para o servidor do backend
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },  //Definição do tipo de conteúdo como JSON
    body: JSON.stringify({ nome, senha }),            //Conversão do objeto com nome e senha em JSON
  });

  const dados = await resposta.json();      //Essa variável rece a resposta em JSON

  if (resposta.ok) {
    mensagem.innerText = 'Login bem-sucedido!';   //insere no parágrafo a mensagem de sucesso
    mensagem.style.color = 'green';
  } else {
    mensagem.innerText = `${dados.erro || dados.message}`;  //insere no parágrafo a mensagem de erro
    mensagem.style.color = 'red';
  }
});
