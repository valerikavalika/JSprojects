const formElement = document.querySelector('.form');
const formInputElement = document.querySelector('.form__input');
const tasksList = document.querySelector('.list__tasks');

window.addEventListener('load', () =>{
    const cookies = document.cookie.split('; ').map(c => c.split('='));
    if(cookies[0] == ""){
        tasksList.style.visibility = "hidden";
    } else {
        tasksList.style.visibility = "visible";
    displayTasks(cookies);
    console.log(cookies);
    }
});

formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    tasksList.style.visibility = "visible";
    createNewTask();
});

function createNewTask () {
    const task = formInputElement.value;
    if(task == "") {
        console.log("empty input")
    } else {
    const taskElement = document.createElement("div");
    taskElement.classList.add("lisk__task");
    taskElement.classList.add("task");
    taskElement.setAttribute("id", String(task));
    tasksList.appendChild(taskElement);

    const taskContentElement = document.createElement("div");
    taskContentElement.classList.add("task__content");
    taskElement.appendChild(taskContentElement);

    const taskActionsElement = document.createElement("div");
    taskActionsElement.classList.add("task__action");
    taskActionsElement.classList.add("action");
    taskElement.appendChild(taskActionsElement);

    const taskTextElement = document.createElement("input");
    taskTextElement.classList.add("task__text");
    taskTextElement.type = "text";
    taskTextElement.value = task;
    taskTextElement.setAttribute("readonly", "readonly")
    taskContentElement.appendChild(taskTextElement);

    const editButtonElement = document.createElement("button");
    editButtonElement.classList.add("action__edit");
    editButtonElement.classList.add("action__button");
    editButtonElement.innerHTML = "Edit";
    taskActionsElement.appendChild(editButtonElement);

    const deleteButtonElement = document.createElement("button");
    deleteButtonElement.classList.add("action__delete");
    deleteButtonElement.classList.add("action__button");
    deleteButtonElement.innerHTML = "Delete";
    taskActionsElement.appendChild(deleteButtonElement);

    const key = taskElement.id;
    document.cookie = `${key}=${task}; expires=` + new Date (2025, 10, 3).toUTCString();
    formInputElement.value = "";
    

    editButtonElement.addEventListener('click', () => {
        if(editButtonElement.innerText.toLowerCase() == "edit") {
            taskTextElement.removeAttribute("readonly");
            taskTextElement.focus();
            editButtonElement.innerText = "Save";
        } else {
            taskTextElement.setAttribute("readonly", "readonly");
            editButtonElement.innerText = "Edit";
            const newValue = taskTextElement.value;
            document.cookie = `${key}=${newValue}`;

        }
    });
    
    deleteButtonElement.addEventListener('click', () => {
        tasksList.removeChild(taskElement);
        document.cookie = `${key}=${taskElement.value}; expires=` + new Date(2000,0,1).toUTCString();
    });
    }
};
function displayTasks (cookies) {
    let displayTasks = cookies.map((cookie) => {
    const cookieKey = `${cookie[0]}`;
    const cookieValue = `${cookie[1]}`;
    
    const taskElement = document.createElement("div");
    taskElement.classList.add("lisk__task");
    taskElement.classList.add("task");
    taskElement.setAttribute("id", `${cookieKey}`);
    tasksList.appendChild(taskElement);

    const taskContentElement = document.createElement("div");
    taskContentElement.classList.add("task__content");
    taskElement.appendChild(taskContentElement);

    const taskActionsElement = document.createElement("div");
    taskActionsElement.classList.add("task__action");
    taskActionsElement.classList.add("action");
    taskElement.appendChild(taskActionsElement);

    const taskTextElement = document.createElement("input");
    taskTextElement.classList.add("task__text");
    taskTextElement.type = "text";
    taskTextElement.value = `${cookieValue}`;
    taskTextElement.setAttribute("readonly", "readonly")
    taskContentElement.appendChild(taskTextElement);

    const editButtonElement = document.createElement("button");
    editButtonElement.classList.add("action__edit");
    editButtonElement.classList.add("action__button");
    editButtonElement.innerHTML = "Edit";
    taskActionsElement.appendChild(editButtonElement);

    const deleteButtonElement = document.createElement("button");
    deleteButtonElement.classList.add("action__delete");
    deleteButtonElement.classList.add("action__button");
    deleteButtonElement.innerHTML = "Delete";
    taskActionsElement.appendChild(deleteButtonElement);
    

    editButtonElement.addEventListener('click', () => {
        if(editButtonElement.innerText.toLowerCase() == "edit") {
            taskTextElement.removeAttribute("readonly");
            taskTextElement.focus();
            editButtonElement.innerText = "Save";
        } else {
            taskTextElement.setAttribute("readonly", "readonly");
            editButtonElement.innerText = "Edit";
            const newValue = taskTextElement.value;
            document.cookie = `${cookieKey}=${newValue}`;
        }
    });
    
    deleteButtonElement.addEventListener('click', () => {
        tasksList.removeChild(taskElement);
        document.cookie = `${cookieKey}=${taskElement.value}; expires=` + new Date(2000,0,1).toUTCString();
    });
    }
    );
};