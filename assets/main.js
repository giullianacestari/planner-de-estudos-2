// Cria a lista "tabela"
let tabela = [
  {
    disciplina: "Matemática",
    descricao: "thhngrfb",
    data: "2024-08-02",
    feito: false,
    id: "ad980a9a-d480-e807-b06d-0f1df82337ad",
  },
]; // * excluir e deixar vazio no final do projeto

// Aula 2 - adicionar nova tarefa
function novaTarefa() {
  let disciplina = document.querySelector("#disciplina").value;
  let descricao = document.querySelector("#descricao").value;
  let data = document.querySelector("#data-de-conclusao").value;

  // Novo registro a ser adicionado
  let novoRegistro = {
    id: geraId(),
    disciplina: disciplina,
    descricao: descricao,
    data: data,
    feito: false,
  };

  tabela.push(novoRegistro);

  desenhaTabela(); // adicionado na aula de desenhar tabela

  //console.log(tabela); //* resultado da aula 2
}

// Criando um id único
function geraId() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

// Desenhando a tabela com JS
function desenhaTabela() {
  let tableBody = document.querySelector("tbody");

  //Limpando a tabela
  tableBody.innerHTML = "";

  tabela.forEach(function (item) {
    let row = tableBody.insertRow();
    let disciplinaCell = row.insertCell(0);
    let descricaoCell = row.insertCell(1);
    let dataCell = row.insertCell(2);
    let feitoCell = row.insertCell(3);
    let progressoCell = row.insertCell(4);
    let removerCell = row.insertCell(5);

    disciplinaCell.textContent = item.disciplina;
    descricaoCell.textContent = item.descricao;
    dataCell.textContent = formataData(item.data); // 1º resultado: item.data

    // 1º resultado: feitoCell.textContent = item.feito ? "Sim" : "Não";
    feitoCell.appendChild(verificaFeito(item.feito, item.id));
    feitoCell.classList.add("feito");

    progressoCell.textContent = verificaProgresso(item.feito, item.data); // 1º resultado: item.feito ? "Sim" : "Não"

    removerCell.appendChild(desenhaBotao(item.id));
  });
}

//desenhando assim que carrega a página
desenhaTabela();

function verificaProgresso(feito, prazo) {
  let hoje = new Date();

  //transforma o prazo de string para date
  prazo = new Date(prazo);

  if (feito == true) {
    return "Finalizado";
  } else {
    if (prazo < hoje) {
      // realizar o teste antes de add linha 85
      return "Atrasado!";
    } else {
      return "A fazer";
    }
  }
}

//cria o elemento html
function verificaFeito(status, id) {
  const marcaComoFeito = document.createElement("input");
  marcaComoFeito.type = "checkbox";
  //Definindo checkboxes marcados
  marcaComoFeito.checked = status;
  // Definindo o id do checkbox
  marcaComoFeito.dataset.id = id;

  // Ao clicar no checkbox, ativa e atualiza o campo FEITO
  marcaComoFeito.addEventListener("click", (element) => {
    // Pegando o alvo clicado
    let inputClicado = element.target;

    // "Marca como feito" percorrendo a lista de tarefas
    tabela.forEach((tarefa) => {
      // Verifica se o id da tarefa é igual ao id do input clicado
      if (tarefa.id == inputClicado.dataset.id) {
        tarefa.feito = inputClicado.checked;
      }
    });
    // ! VERIFICAÇÃO: console.log(tabela);

    //desenha a tabela novamente
    desenhaTabela();
  });

  //retorna o input criado
  return marcaComoFeito;
}

function desenhaBotao(id) {
  // Adicionado botão "Remover" em cada linha da mesma maneira do checkbox
  const botaoRemover = document.createElement("button");

  botaoRemover.innerText = "Remover";
  // Definindo `data-id` do botao remover
  botaoRemover.dataset.id = id;

  botaoRemover.classList.add("remover");

  // Ao clicar no checkbox, ativa e atualiza o campo FEITO
  botaoRemover.addEventListener("click", (element) => {
    // Removendo a tarefa da lista
    tabela = tabela.filter((tarefa) => {
      return tarefa.id != id;
    });

    //desenha a tabela novamente
    desenhaTabela();
  });

  return botaoRemover;
}

function formataData(data) {
  const dataObj = new Date(data + "T00:00:00");
  const dia = dataObj.getDate().toString().padStart(2, "0");
  const mes = (dataObj.getMonth() + 1).toString().padStart(2, "0"); // Janeiro é 0, então adicionamos 1
  const ano = dataObj.getFullYear().toString().slice(-2); // Pega os últimos dois dígitos do ano
  return `${dia}/${mes}/${ano}`;
}
