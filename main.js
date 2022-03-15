// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Functions to addlist
function addTodo(event) {
  //Prevent form from submitting it so we use:
  event.preventDefault();

  //  Add todo to local
  saveLocalTodos(todoInput.value);

  //To make a div we use
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //To make a li we use
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  todoDiv.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //Buttons : mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"> </i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //Buttons : Delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"> </i>';
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);

  //Append the to list by:
  todoList.appendChild(todoDiv);

  //Clear the todo Input value
  todoInput.value = "";
}

//Function for delete check

function checkDelete(e) {
  const item = e.target;

  //delete the items todo
  if (item.classList[0] == "delete-btn") {
    const todo = item.parentElement;

    //Animation effect for transition
    todo.classList.add("fall");
    removeLocalTodos(todo);

    //Removing the items after ending the elements
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //Check the items to complete
  if (item.classList[0] == "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//Function for filtering
function filterTodo(e) {
  const todos = todoList.childNodes;
  console.log(todos);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "notDone":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//function for local storage.
function saveLocalTodos(todo) {
  //Check  if we have already or not if not not we gather it.
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(todo) {
  //Check  if we have already or not if not not we gather it.
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //To make a div we use
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //To make a li we use
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    todoDiv.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Buttons : mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"> </i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Buttons : Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"> </i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //Append the to list by:
    todoList.appendChild(todoDiv);
  });
}

//function for local storage.
function removeLocalTodos(todo) {
  //Check  if we have already or not if not not we gather it.
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Event Listerners
todoButton.addEventListener("click", addTodo);
//Event listerner To check and delete
todoList.addEventListener("click", checkDelete);
//Event listerner To sort the todo list
filterOption.addEventListener("click", filterTodo);

document.addEventListener("DOMContentLoaded", getTodos);
