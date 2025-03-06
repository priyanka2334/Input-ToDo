

let tasksArray = [];

document.getElementById("addButton").addEventListener("click", function() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim(); 

    if (taskText === "") return; 

    tasksArray.push({ text: taskText, completed: false });
    saveTasks(); 
    input.value = ""; 
    displayTasks(); 
});


document.getElementById("allButton").addEventListener("click", function() {
    displayTasks();
});

document.getElementById("completeButton").addEventListener("click", function() {
    displayTasks(true);
});

function displayTasks(showCompleted = false) {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; 

    tasksArray.forEach((taskData, index) => {
        if (showCompleted && !taskData.completed) return;

        let li = document.createElement("li");
        let text = document.createElement("span");
        text.textContent = taskData.text;

        if (taskData.completed) {
            text.classList.add("completed"); 
        }

        
        let completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.addEventListener("click", function() {
            taskData.completed = !taskData.completed; 
            saveTasks();
            displayTasks(showCompleted);
        });

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Remove";
        deleteButton.addEventListener("click", function() {
            tasksArray.splice(index, 1); 
            saveTasks();
            displayTasks(showCompleted);
        });

        li.appendChild(text);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function loadTasks() {
    tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
    displayTasks();
}

window.addEventListener("load", loadTasks);
