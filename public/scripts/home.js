console.log("teste");

document.addEventListener("DOMContentLoaded", function () {
  const miniCard = document.querySelector(".mini-card");
  if (usuarioLogado) {
    miniCard.style.visibility = "visible";
  } else {
    miniCard.style.visibility = "hidden";
  }
});
