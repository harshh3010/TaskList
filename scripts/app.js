// Initializing Variables
const taskInput = document.querySelector('#task_name');
const addBtn = document.querySelector('#mytasks__add-btn');
const taskList = document.querySelector('.mytasks__list');
const dltBtn = document.querySelector('.delete-btn');

loadTasks();

// Event Listeners
addBtn.addEventListener('click', addTask);
document.querySelector('body').addEventListener('click', deleteTask);

// Functions
function addTask(e) {
    e.preventDefault();

    if (taskInput.value.trim() !== "") {
        let list_item = document.createElement('li');
        list_item.className = 'mytasks__item';
        list_item.innerHTML =
            `
                ${taskInput.value.trim()}
                <a class="delete-btn">&Cross;</a>
                `;
        taskList.appendChild(list_item);
        storeTaskInStorage(taskInput.value.trim());
    } else {
        alert("Enter a task");
    }

}

function deleteTask(e) {
    e.preventDefault();

    if (e.target.classList.contains('delete-btn')) {
        deleteTaskFromStorage(e.target.parentElement);
        e.target.parentElement.remove();
    }
}

function loadTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        let list_item = document.createElement('li');
        list_item.className = 'mytasks__item';
        list_item.innerHTML =
            `
            ${task}
            <a class="delete-btn">&Cross;</a>
            `;
        taskList.appendChild(list_item);
    });
}

function storeTaskInStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTaskFromStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index) {
        if (taskItem.childNodes[0].textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}