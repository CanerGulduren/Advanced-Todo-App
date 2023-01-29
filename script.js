const txtArea = document.getElementById("text-box");
const todoField = document.getElementById("todo-field");
const form = document.getElementById("todo-form");

form.addEventListener("submit", createTodo);

function createTodo(e) {
  e.preventDefault();

  /*Stop if no string enter*/
  let txtAreaValue = txtArea.value;
  let todoText = txtAreaValue.trim();
  if (todoText.length === 0) {
    return;
  }

  newTodo();
  deleteTodo();
}

function newTodo() {
  /*New delete button*/
  let createNewDltBtn = new Image();
  createNewDltBtn.src = "img/reject.png";
  createNewDltBtn.classList.add("new-dlt-btn");

  /*New li*/
  let createNewTodo = document.createElement("li");
  let newTodoInfo = txtArea.value;
  createNewTodo.innerHTML = newTodoInfo;
  createNewTodo.classList.add("new-todo");
  createNewTodo.append(createNewDltBtn);

  todoField.append(createNewTodo);
  txtArea.value = "";
}

function deleteTodo() {
  let deleteBtn = Array.from(document.getElementsByClassName("new-dlt-btn"));
  deleteBtn.forEach((button) => {
    button.addEventListener("click", () => {
      button.parentElement.classList.add("hide");
    });
  });
}
