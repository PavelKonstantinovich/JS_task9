
function fetchData(url, method, callback) {
  const xhr = new XMLHttpRequest()

  xhr.open(method, url)

  xhr.onload = function () {
    if (xhr.status == 200) {
      callback(xhr.response)
    } else {
      console.error(xhr.statusText + ': ' + xhr.status)
    }
  }

  xhr.onerror = function () {
    console.log(xhr.statusText + ': ' + xhr.status)
  }

  xhr.send()
}


const postCommentsElement = document.querySelector('#comment')
const containerPostElement = document.querySelector('#posts')

function handleClickPost(event) {
  const { target } = event
  const postElement = target.closest('.post')

  if (postElement) {
    const { id } = postElement.dataset

    const url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`

    fetchData(url, 'GET', (response) => {
      const data = JSON.parse(response)

      const comments = data.map((item) =>
        commentTemplate(item)
      )
      const result = comments.join('\n')

      postCommentsElement.innerHTML = result
    })
  }
}

fetchData('https://jsonplaceholder.typicode.com/posts', 'GET', (response) => {
  const data = JSON.parse(response)

  const cards = data.map((item) => {
    return cardTemplate(item.title, item.body, item.id)
  })

  const result = cards.join('\n')

  containerPostElement.innerHTML = result
})

function cardTemplate(title, text, id) {
  return `
      <div class="card post"  data-id="${id}">
        <div class="card-body">
        <details><summary><h5 class="card-title">${title}</h5></summary>
        <p class="card-text">${text}</p></details>
        </div>
      </div>
    `
}

function commentTemplate({name, email, body}) {
  return `
      <div class="comments">
      <h5>${name}</h5>
      <a href="mailto:${email}">${email}</a>
      <p>${body}</p>
      </div>
      
    `
}
containerPostElement.addEventListener('click', handleClickPost)