const txtArea = document.getElementById("text-box")
const todoField = document.getElementById("todo-field")
const form = document.getElementById("todo-form")

form.addEventListener("submit", createTodo)

function createTodo(e){
    e.preventDefault()
    
    /*New delete button*/
    let createNewDltBtn = new Image()
    createNewDltBtn.src = "img/reject.png"
    createNewDltBtn.classList.add("new-dlt-btn")

    /*New li*/
    let createNewTodo = document.createElement("li")
    let newTodoInfo = txtArea.value
    createNewTodo.innerHTML = newTodoInfo
    createNewTodo.classList.add("new-todo")
    createNewTodo.append(createNewDltBtn)

    

    todoField.append(createNewTodo)
    txtArea.value = ""
}

