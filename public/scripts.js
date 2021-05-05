const PhotosUpload = {
  input: "",
  uploadLimit: 5,
  preview: document.querySelector('#photos-preview'),
  files: [],
  handleFileInput(event) {
    const { files: fileList } = event.target
    PhotosUpload.input = event.target
    console.log(`PhotosUpload.input: ${PhotosUpload.input}`)

    if (PhotosUpload.hasLimit(event)) return 

    Array.from(fileList).forEach(file => {
      PhotosUpload.files.push(file)

      const reader = new FileReader()

      reader.onload = () => {
        const image = new Image()
        image.src = String(reader.result)

        const container = PhotosUpload.getContainerImage(image)

        document.querySelector('#photos-preview').appendChild(container)
      }

      reader.readAsDataURL(file)
    })
    console.log(`PhotosUpload.files: ${PhotosUpload.files}`)
    PhotosUpload.input.files = PhotosUpload.getAllFiles()
    console.log(` PhotosUpload.input.files: ${PhotosUpload.input.files}`)
  },
  hasLimit(event) {
    const { files: fileList } = event.target
    const { uploadLimit } = PhotosUpload
    
    if (fileList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos`) 
      event.preventDefaulft() 
      return true
    }

    return false
  },
  getContainerImage(image) {
    const container = document.createElement('div')
    container.classList.add('photo')

    container.onclick = (event) => { 
      PhotosUpload.removePhoto(event)
    }

    container.appendChild(image)
    container.appendChild(PhotosUpload.getRemoveButton())

    return container
  },
  getRemoveButton() {
    const button = document.createElement('i')
    button.classList.add("material-icons")
    button.innerHTML = "close"
  
    return button
  },
  getAllFiles() {
    const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

    PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

    return dataTransfer.files
  },
  removePhoto(event) {
    const photoDiv = event.target.parentNode
    const photosArray = Array.from(PhotosUpload.preview.children)
    const index = photosArray.indexOf(photoDiv)

    PhotosUpload.files.splice(index, 1)
    PhotosUpload.input.files = PhotosUpload.getAllFiles()
  
    photoDiv.remove()
  }
}

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

function addPreparation() {
  const preparations = document.querySelector("#preparations");
  const fieldContainer = document.querySelectorAll(".preparation");

  // Realiza um clone do último preparation adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false;

  // Deixa o valor do input vazio
  newField.children[0].value = "";
  preparations.appendChild(newField);
}

document
  .querySelector(".add-preparation")
  .addEventListener("click", addPreparation);

const formDelete = document.querySelector("#delete-recipe")

formDelete.addEventListener("submit", (event) => {
  const confirmation = confirm("Deseja deletar a receita?")

  if(!confirmation) {
    event.preventDefault()
  }
})