// * Criando novas disciplinas de forma dinâmica

// Array de disciplinas adicionais
var disciplinas = [
  { nome: "Matemática" },
  { nome: "Português" },
  { nome: "Ciências" },
  //{nome: "História"},
  //{nome: "Geografia"},
  // Adicione mais disciplinas conforme necessário
];

// Obtém a referência para o elemento select
var elementoSelect = document.querySelectorAll(".disciplina");

elementoSelect.forEach((element) => {
  // Adiciona as novas disciplinas ao select
  for (var i = 0; i < disciplinas.length; i++) {
    var optionElement = document.createElement("option");
    optionElement.text = disciplinas[i].nome;
    optionElement.value = disciplinas[i].nome;
    element.add(optionElement, null);
  }
});
