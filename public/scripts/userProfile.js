// functio para quando apertar no icone do lapis
// alterar o readonly do input e mostrar
// o btn salvar do form
function alternarEdicaoBiografia() {
  const inputBiografia = document.getElementById("biografiaInput");
  const btnSalvar = document.getElementById("btnSalvar");

  if (inputBiografia && btnSalvar) {
    inputBiografia.removeAttribute("readonly");
    inputBiografia.setSelectionRange(
      inputBiografia.value.length,
      inputBiografia.value.length
    );
    inputBiografia.focus();

    // mostrar o botão Salvar
    btnSalvar.style.display = "inline-block";
  }
}
