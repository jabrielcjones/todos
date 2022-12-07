const todos = document.querySelector("#todos")
const form = document.querySelector("#todoForm")

function retrieveTodos() {
    return JSON.parse(localStorage.getItem("todos"))
}

function initializeTodos() {
    let todosList = retrieveTodos()

    if (!todosList) { return }

    console.log(todosList)
    todosList.forEach(function(todo) {
        todos.appendChild(createTodo(todo))
    })
}

function persistTodo(todo) {
    let todosList = retrieveTodos()
    if (!todosList) { todosList = [] }
    
    console.log(todosList)
    todosList.push(todo)
    console.log(todosList)
    localStorage.setItem("todos", JSON.stringify(todosList))
}

function depersistTodo(target) {
    todosList = retrieveTodos()
    console.log(todosList)
    todosList = todosList.filter(function(todo) {
        return todo != target
    })
    console.log(todosList)
    localStorage.setItem("todos", JSON.stringify(todosList))
}

function createTodo(todo) {
    const newTodo = document.createElement("li")
    newTodo.innerText = todo.trim()
    newTodo.appendChild(createCheckbox())
    newTodo.appendChild(createRemoveButton())

    return newTodo
}

function createRemoveButton() {
    const newRemoveButton = document.createElement("button")
    newRemoveButton.innerText = "Remove"

    return newRemoveButton
}

function createCheckbox() {
    const newCheckbox = document.createElement("input")
    newCheckbox.setAttribute("type", "checkbox")
    
    return newCheckbox
}

const addTodoListener = function(e) {
    e.preventDefault()
    const todoInput = document.querySelector("#todoInput")    
    
    if (todoInput.value) {
        todos.appendChild(createTodo(todoInput.value))
        persistTodo(todoInput.value)
        todoInput.value = ''
    }
}

function removeTodo(e) {
    e.target.parentElement.remove()
    depersistTodo(e.target.parentElement.firstChild.nodeValue)
}

const removeTodoListener = function(e) {
    if (e.target.tagName === "BUTTON") {
        removeTodo(e)
    }
}

const todoCompletedListener = function(e) {
    if (e.target.tagName === "INPUT" && e.target.checked) {
        removeTodo(e)
    }
}

form.addEventListener('submit', addTodoListener)
todos.addEventListener('click', removeTodoListener)
todos.addEventListener('change', todoCompletedListener)

initializeTodos()
