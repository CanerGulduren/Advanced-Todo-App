const txtArea = document.getElementById("text-box");
let mainTodoField = document.getElementById("main-todo-field");
let completeTodoField = document.getElementById("complete-todo-field");
let allTodoFields = [mainTodoField, completeTodoField];
const form = document.getElementById("todo-form");
const template = document.querySelector("template");
let mainTodoBtn = document.getElementById("main-todo-btn");
let completeTodoBtn = document.getElementById("complete-todo-btn");
let completeCount = window.getComputedStyle(completeTodoBtn, "::after").getPropertyValue("content")
let LOCAL_STORAGE_KEY = "TODO_LIST";
let LOCAL_STORE = loadTodo();


window.addEventListener("DOMContentLoaded", completeTodoCount)

completeTodoBtn.onclick = ()=>{
  completeTodoField.style.display = "block";
  mainTodoField.style.display = "none";
}
mainTodoBtn.onclick = ()=>{
  mainTodoField.style.display = "block";
  completeTodoField.style.display = "none";
}
LOCAL_STORE.forEach(newTodo);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let todo = {
    todoText: txtArea.value,
    complete: false,
    id: new Date().valueOf().toString(),
  };
  let todoText = todo.todoText.trim();
  if (todoText.length === 0) return;
  LOCAL_STORE.push(todo);
  newTodo(todo);
  saveTodo();
  deleteTodo();
});

allTodoFields.forEach((field) => {
  field.addEventListener("change", (e) => {
    if (!e.target.matches("#check-box")) return;
    const box = e.target;
    completeTodo(box);
    chooseAppendTodo(box.checked, box.closest(".new-todo"));
    completeTodoCount()
    saveTodo();
  });
});

function newTodo(todo) {
  const templateClone = template.content.cloneNode(true);
  const listItem = templateClone.querySelector(".new-todo");
  const textElement = templateClone.getElementById("todo-txt-field");
  const checkbox = templateClone.getElementById("check-box");
  fillTodoInfo(listItem, textElement, checkbox, todo);
  chooseAppendTodo(todo.complete, templateClone);
  saveTodo(todo);
  deleteTodo();
}

function fillTodoInfo(listItem, textElement, checkbox, todo) {
  listItem.dataset.todoId = todo.id;
  textElement.innerText = todo.todoText;
  checkbox.checked = todo.complete;
  txtArea.value = "";
}

function chooseAppendTodo(condition, element) {
  condition ? completeTodoField.append(element) : mainTodoField.append(element);
}

function saveTodo() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(LOCAL_STORE));
}

function loadTodo() {
  let savedTodo = localStorage.getItem(LOCAL_STORAGE_KEY);
  return JSON.parse(savedTodo) || [];
}

function deleteTodo() {
  let deleteBtn = Array.from(document.getElementsByClassName("new-dlt-btn"));
  deleteBtn.forEach((button) => {
    button.addEventListener("click", () => {
      let parent = button.closest(".new-todo");
      deleteAfterAnim(parent);
      saveDeletedTodos(parent)
      .then(()=>{
        LOCAL_STORE = LOCAL_STORE.filter((dlt) => dlt.id !== todoId);
        saveTodo();
      })
    });
  });
}

function saveDeletedTodos(parent){
  todoId = parent.dataset.todoId;
  return new Promise((resolve)=>{
    resolve(todoId)
  })
}

function completeTodo(box) {
  let parent = box.closest(".new-todo");
  let todoId = parent.dataset.todoId;
  let todo = LOCAL_STORE.find((t) => t.id === todoId);
  todo.complete = box.checked;
}

function deleteAfterAnim(element) {
  element.classList.add("hide");
    setTimeout(() => {
      element.remove();
      completeTodoCount()
    }, 300)

}

function completeTodoCount(){
  let child = Array.from(completeTodoField.children)
  let count = child.length
  completeTodoBtn.dataset.content = count
}