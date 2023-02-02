const txtArea = document.getElementById("text-box");
const todoField = document.getElementById("todo-field");
const form = document.getElementById("todo-form");
const template = document.querySelector("template");
let LOCAL_STORAGE_KEY = "TODO_LIST";


let STORE = loadTodo();
STORE.forEach(newTodo);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  let todo = {
    todoText: txtArea.value,
    complete: false,
    id: new Date().valueOf().toString(),
  };

  let todoText = todo.todoText.trim();
  if (todoText.length === 0) return
  
  STORE.push(todo);
  newTodo(todo);
  saveTodo();
  deleteTodo();
});

todoField.addEventListener("change", (e) => {
  if (!e.target.matches("#check-box")) return;

  const parent = e.target.closest(".new-todo");
  let todoId = parent.dataset.todoId;
  let todo = STORE.find((t) => t.id === todoId);
  todo.complete = e.target.checked;
  saveTodo();
});

function newTodo(todo) {
  const templateClone = template.content.cloneNode(true);
  const listItem = templateClone.querySelector(".new-todo");
  const textElement = templateClone.getElementById("todo-txt-field");
  const checkbox = templateClone.getElementById("check-box");

  listItem.dataset.todoId = todo.id;
  textElement.innerText = todo.todoText;
  checkbox.checked = todo.complete;
  todoField.append(templateClone);
  txtArea.value = "";
  saveTodo(todo);
  deleteTodo();
}

function saveTodo() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(STORE));
  deleteTodo();
}

function loadTodo() {
  let savedTodo = localStorage.getItem(LOCAL_STORAGE_KEY);
  return JSON.parse(savedTodo) || [];
}

function deleteTodo() {
  let deleteBtn = Array.from(document.getElementsByClassName("new-dlt-btn"));
  deleteBtn.forEach((button) => {
    button.addEventListener("click", () => {
      button.parentElement.classList.add("hide");

      let parent = button.closest(".new-todo");
      todoId = parent.dataset.todoId;
      STORE = STORE.filter((dlt) => dlt.id !== todoId);
      saveTodo();
    });
  });
}
