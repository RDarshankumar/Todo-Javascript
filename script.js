document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const newTaskInput = document.getElementById("new-task");
  const taskList = document.getElementById("task-list");

 
  loadTasks();

  form.addEventListener("submit", (event) => {
      event.preventDefault();
      const taskText = newTaskInput.value.trim();
      if (taskText !== "") {
          addTask(taskText);
          newTaskInput.value = "";
          saveTasks(); 
      }
  });

  function addTask(taskText, completed = false) {
      const li = document.createElement("li");
      li.textContent = taskText;
      if (completed) {
          li.classList.add("completed");
      }

 
      const completeButton = document.createElement("button");
      completeButton.textContent = "Completed";
      completeButton.className = "btn btn-success";
      completeButton.type = "button";
      completeButton.addEventListener("click", () => {
          li.classList.toggle("completed");
          saveTasks(); 
      });

     
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "btn btn-danger";
      deleteButton.type = "button";
      deleteButton.addEventListener("click", () => {
          taskList.removeChild(li);
          saveTasks(); 
      });

      
      li.appendChild(completeButton);
      li.appendChild(deleteButton);
      taskList.appendChild(li);
  }

  function saveTasks() {
      const tasks = [];
      taskList.querySelectorAll("li").forEach(li => {
          tasks.push({
              text: li.textContent.replace("SuccessDanger", "").trim(),
              completed: li.classList.contains("completed")
          });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => addTask(task.text, task.completed));
  }
});
