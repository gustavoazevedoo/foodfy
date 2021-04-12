function paginate(selectedPage, totalPages) {
  let pages = []
  let oldPage

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

    const firstAndLastPage = currentPage == 1 || currentPage == totalPages
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 2
  
    if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
      if (oldPage && currentPage - oldPage > 2) {
        pages.push("...")
      }
  
      if (oldPage && currentPage - oldPage == 2) {
        pages.push(oldPage + 1)
      }
  
      pages.push(currentPage)
      
      oldPage = currentPage
    }
  }
  return pages
  
}

const pagination = document.querySelector(".pagination")
const page = Number(pagination.dataset.page)
const totalPages = Number(pagination.dataset.total)
const filter = pagination.dataset.filter

const pages = paginate(page, totalPages)

let elements = ""

for (let page of pages) {

  const selectedPage = page == Number(pagination.dataset.page)

  if (String(page).includes("...")) {
    elements += `<span>${page}</span>`
  } else {
    if (filter) {
      elements += `<a href=?page=${page}&filter=${filter}>${page}</a>`
    } else {
      elements += `<a href=?page=${page}>${page}</a>`
    }
  }
}

pagination.innerHTML = elements