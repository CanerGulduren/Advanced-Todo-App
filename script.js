const txtArea = document.getElementById("text-box");
const todoField = document.getElementById("todo-field");
const form = document.getElementById("todo-form");
const template = document.querySelector("template");
const LOCAL_STORAGE_KEY = "TODO_LIST";

const STORE = loadTodo();
STORE.forEach(newTodo);

form.addEventListener("submit", createTodo);

function createTodo(e) {
  e.preventDefault();

  /*Stop if no string enter*/
  let txtValue = txtArea.value;
  let todoText = txtValue.trim();
  if (todoText.length === 0) {
    return;
  }
  newTodo(txtValue);
  STORE.push(txtValue);
  saveTodo();
  deleteTodo();
}

function newTodo(txtValue) {
  const templateClone = template.content.cloneNode(true);
  const li = templateClone.getElementById("todo-txt-field");
  li.innerText = txtValue;
  todoField.append(templateClone);
  txtArea.value = "";
  saveTodo(txtValue);
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
    });
  });
}
