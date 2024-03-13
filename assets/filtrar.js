// * Todas as funções relacionadas ao menu "Filtrar por disciplina"

let btnFiltrar = document.querySelector("#filtrar");

btnFiltrar.addEventListener("click", ExibeMenuSuspenso);

// Alternar a exibição do menu suspenso de filtro
function ExibeMenuSuspenso() {
  const menu = document.getElementById("menuFiltrar");
  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
}

// Filtrar a lista de tarefas com base na disciplina selecionada
function filtraTarefas() {
  // Busca a listagem COMPLETA de tarefas
  let tarefas = tabela;

  let listaFinal;

  // Pega o valor do filtro selecionado
  const filtroSelecionado = document.getElementById("menuFiltrar").value;

  // Caso o filtro selecionado seja vazio, exibe a listagem completa
  if (filtroSelecionado == "") {
    desenhaTabela(tarefas);
    listaFinal = tarefas;

    // Senão, exibe a listagem filtrada
  } else {
    const listaFiltrada = tarefas.filter(
      (requisicao) => requisicao.disciplina === filtroSelecionado
    );
    desenhaTabela(listaFiltrada);
    listaFinal = listaFiltrada;
  }

  return listaFinal;
  console.log(listaFinal);
}
