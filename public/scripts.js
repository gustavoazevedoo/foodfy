const logo = document.querySelector(".logo")
const recipes = document.querySelectorAll(".card")

logo.addEventListener("click", () => {
  window.location.href = "/"
})

for (let recipe of recipes) {
  recipe.addEventListener("click", () => {
    const id = recipe.getAttribute("id")
    window.location.href = `/foodfy/recipes/${id}`
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

