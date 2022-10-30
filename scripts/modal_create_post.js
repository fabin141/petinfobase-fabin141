import { createPost, getAllPosts, getUserData } from "./api.js"
import { renderCards } from "./card_post.js"

const modalCreateNewPost = () => {
  const modal = document.createElement("div")
  modal.classList.add("modal")

  const modalWrapper = document.createElement("div")
  modalWrapper.className = "modal-wrapper container"

  const cardHeader = document.createElement("div")
  cardHeader.classList.add("card-header")

  cardHeader.insertAdjacentHTML("afterbegin", 
    `
      <h2 class="text-1 gray-1">
          Criando novo post
      </h2>
    `
  )

  const btnsHeader = document.createElement("div")
  btnsHeader.classList.add("btns-header")

  const btnCloseModal = document.createElement("button")
  btnCloseModal.classList.add("btn-close-modal")
  btnCloseModal.innerText = "X"  
  btnCloseModal.addEventListener("click", () => {
    modal.remove()
  })

  btnsHeader.append(btnCloseModal)

  cardHeader.appendChild(btnsHeader)

  const form = document.createElement("form")
  
  const divTitle = document.createElement("div")

  const labelTitle = document.createElement("label")
  labelTitle.className = "text-2 gray-1"
  labelTitle.setAttribute("for", "post-title")
  labelTitle.innerText = "Título do post"

  const inputTitle = document.createElement("input")
  inputTitle.className = "post-title input-form"
  inputTitle.type = "text"
  inputTitle.name = "title"
  inputTitle.id = "post-title"
  inputTitle.required = true
  inputTitle.placeholder = "Digite o título aqui..."

  divTitle.append(labelTitle, inputTitle)

  const divContent = document.createElement("div")
  
  const labelContent = document.createElement("label")
  labelContent.className = "text-2 gray-1"
  labelContent.setAttribute("for", "post-content")
  labelContent.innerText = "Conteúdo do post"

  const inputContent = document.createElement("textarea")  
  inputContent.required = true
  inputContent.name = "content"
  inputContent.id = "post-content"
  inputContent.placeholder = "Desenvolva o conteúdo do post aqui..."

  divContent.append(labelContent, inputContent)

  const divBtns = document.createElement("div")

  const btnCancel = document.createElement("button")
  btnCancel.classList.add("close-modal-post")
  btnCancel.innerText = "Cancelar"
  btnCancel.addEventListener("click", () => {
    modal.remove()
  })

  const btnPost = document.createElement("button")
  btnPost.classList.add("create-post", "btn-disabled")
  btnPost.type = "submit"
  btnPost.innerText = "Publicar"
  btnPost.disabled = true
  

  divBtns.append(btnCancel, btnPost)

  form.append(divTitle, divContent, divBtns)

  const formElements = [...form.elements]

  formElements.forEach((e) => {
    if (e.nodeName == "INPUT" || e.nodeName == "TEXTAREA"){
      e.addEventListener("input", () => {
        if (inputTitle.value == "" || inputContent.value == ""){
          btnPost.disabled = true
          btnPost.classList.add("btn-disabled")
        }else {
          btnPost.disabled = false
          btnPost.classList.remove("btn-disabled")
        }
      })
    }
  })

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const objData = {}

    formElements.forEach((elem) => {
      if(elem.name) {
        objData[elem.name] = elem.value
      }
    })

    await createPost(JSON.parse(localStorage.getItem("token")), objData)

    modal.remove()

    await renderCards(await getAllPosts(JSON.parse(localStorage.getItem("token"))), await getUserData(JSON.parse(localStorage.getItem("token"))), JSON.parse(localStorage.getItem("token")))
  })  
 

  modalWrapper.append(cardHeader, form)

  modal.appendChild(modalWrapper)
  return modal  
}

export const renderCreatePost = () => {
  const body = document.querySelector("body")
  const btnCreate = document.getElementById("create-post")

  btnCreate.addEventListener("click", () => {
    body.appendChild(modalCreateNewPost())
  })
}