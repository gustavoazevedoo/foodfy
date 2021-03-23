const logo = document.querySelector(".logo")
const recipes = document.querySelectorAll(".image-recipe")

logo.addEventListener("click", () => {
  window.location.href = "/"
})

for (let recipe of recipes) {
  recipe.addEventListener("click", () => {
    const id = recipe.getAttribute("id")
    if (location.pathname.includes("foodfy")) {
      window.location.href = `/foodfy/recipes/${id}`
    } else {
      window.location.href = `/admin/recipes/${id}`
    }
  })
}

const topics = document.getElementsByClassName("topic")
// getElementsByClassName permite fazer alterações na DOM
// querySelectorAll não permite.

for (let topic of topics) {
  const button = topic.querySelector(".topic-header p")

  button.addEventListener("click", () => {
    if (button.innerHTML === "mostrar") {
      topic.querySelector(".topic-content").classList.remove("hide")
      button.innerHTML = "esconder"
    } else {
      topic.querySelector(".topic-content").classList.add("hide")
      console.log(button)
      button.innerHTML = "mostrar"
    }
  })
}

const currentPage = location.pathname
const menuItems = document.querySelectorAll("header nav a")

for (item of menuItems) {
  if(currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active")
  }
}

function addIngredient() {
  const ingredients = document.querySelector("#ingredients");
  const fieldContainer = document.querySelectorAll(".ingredient");

  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false;

  // Deixa o valor do input vazio
  newField.children[0].value = "";
  ingredients.appendChild(newField);
}

document
  .querySelector(".add-ingredient")
  .addEventListener("click", addIngredient)

function addStep() {
  const steps = document.querySelector("#steps");
  const fieldContainer = document.querySelectorAll(".step");

  // Realiza um clone do último step adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false;

  // Deixa o valor do input vazio
  newField.children[0].value = "";
  steps.appendChild(newField);
}

document
  .querySelector(".add-step")
  .addEventListener("click", addStep);

const formDelete = document.querySelector("#delete-recipe")

formDelete.addEventListener("submit", (event) => {
  const confirmation = confirm("Deseja deletar a receita?")

  if(!confirmation) {
    event.preventDefault()
  }
})