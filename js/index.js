document.addEventListener('DOMContentLoaded', () => {
    searchUsers()
    userRepo()
})

function fetchUsers(id){
    fetch(`https://api.github.com/search/users?q=${id}`)
    .then(response => response.json())
    .then(json => renderUsers(json.items))
}

function fetchRepos(id){
    fetch(`https://api.github.com/users/${id}/repos`)
    .then(response => response.json())
    .then(json => renderUserRepos(json))
}

// write a function to use search on site passing in an id for fetch
function searchUsers(){
    document.querySelector('#github-form').addEventListener('submit', (e) => {
        e.preventDefault()
        fetchUsers(e.target.search.value)
        // using the inputted value to fetch a user
        // how do we get the data from fetch onto our page?
            // make new function to render the data from fetch for each result
    } )
}

function renderUsers(users){
    users.forEach(renderUserFunction)
    // function to render a specific look for each result
}

function renderUserFunction(data){
    let ul1 = document.querySelector('#user-list')
    let name = document.createElement('li')
    let img = document.createElement('img')
    let url = document.createElement('li')
    
    name.textContent = data.login
    img.src = data.avatar_url
    url.textContent = data.html_url
    // name.className = 'login'

    ul1.append(name, img, url)
    document.querySelector('#github-container').append(ul1)
}

// clicking on a user should send a request and return all repos from that user

function userRepo(){
    document.querySelector('#user-list').addEventListener('click', (e) => {
        // what do we want it to do on click? -> return repos from that user
        fetchRepos(e.target.textContent)
        // optimize in future date by allowing for only the name to be clicked?
    })
}

function renderUserRepos(repo){
    repo.forEach(renderUserRepoView)
}

function renderUserRepoView(data){
    let ul = document.querySelector('#user-list')
    let ul2 = document.querySelector('#repos-list')
    let repos = document.createElement('li')

    repos.textContent = data.name
    ul.innerHTML = ''

    ul2.append(repos)
    document.querySelector('#github-container').append(ul)
}