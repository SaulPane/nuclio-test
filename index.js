const button = document.querySelector("button");
const input = document.querySelector("input");
const list = document.querySelector("ul");
const form = document.querySelector("form");
const error = document.querySelector("p");
const taskPending = document.querySelector("span");

function getTasksList() {
    if (localStorage.getItem('tasks')) {
        const items = localStorage.getItem('tasks').split(",");
        items.forEach((item) => {
            const itemList = document.createElement("li");
            list.append(itemList);
            itemList.innerText = item;
        });
    }
}

function pendingTasks() {
    if (localStorage.getItem('tasks')) {
        const items = localStorage.getItem('tasks').split(",");
        console.log(items.length);
        taskPending.innerText = "Pending tasks: " + items.length;
        taskPending.style.display = "block";
    } else { taskPending.style.display = "none"; }
}

function addStorage(task) {
    if (localStorage.getItem('tasks')) {
        let tasks = localStorage.getItem('tasks');
        tasks = tasks + "," + task;
        localStorage.setItem('tasks', tasks);
    } else { localStorage.setItem('tasks', task); }
}


function addItem(task) {
    addStorage(task);
    const item = document.createElement("li");
    list.append(item);
    item.innerText = task;
    pendingTasks();
    input.value = "";
    input.focus();
}

list.addEventListener("click", (event) => {
    event.target.remove();
    error.style.display = "none";
    //Esto lo copié de tu ejemplo;
    const items = document.querySelectorAll("li");
    const listStorage = [];
    items.forEach((item) => listStorage.push(item.innerText));
    localStorage.setItem('tasks', listStorage);
    pendingTasks();
});


form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value) {
        error.style.display = "none";
        addItem(input.value);
    } else {
        error.style.display = "block";
    }
});

getTasksList();
pendingTasks();