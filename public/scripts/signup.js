console.log("teste");
function validatePassword() {
  var senha = document.getElementById("senha_User").value;
  var confirmarSenha = document.getElementById("confirmPassword").value;

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem");
    // Limpar os campos de senha
    document.getElementById("senha_User").value = "";
    document.getElementById("confirmPassword").value = "";
    return false; // Impede o envio do formulário
  }

  return true; // Permite o envio do formulário
}
