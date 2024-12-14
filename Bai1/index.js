const taskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const deleteAllButton = document.getElementById("delete-all");
const tabs = document.querySelectorAll(".tab");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

addTaskButton.addEventListener("click", addTask);
deleteAllButton.addEventListener("click", deleteAllTasks);
tabs.forEach(tab => tab.addEventListener("click", changeFilter));

function renderTasks() {
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${index})">
      <span style="text-decoration: ${task.completed ? "line-through" : "none"};">
        ${task.text}
      </span>
      <button onclick="deleteTask(${index})">🗑️</button>
    `;
    taskList.appendChild(li);
  });

  deleteAllButton.classList.toggle("show", tasks.length > 0);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function deleteAllTasks() {
  tasks = [];
  renderTasks();
}

function changeFilter(e) {
  tabs.forEach(tab => tab.classList.remove("active"));
  e.target.classList.add("active");
  filter = e.target.id;
  renderTasks();
}

renderTasks();
