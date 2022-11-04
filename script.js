const formElement = document.querySelector('.form');
const formInputElement = document.querySelector('.form__input');
const submitButton = document.querySelector('.form__submit');
const tasksList = document.querySelector('.list__tasks');

window.addEventListener('load', () =>{
    const cookies = document.cookie.split('; ').map(c => c.split('='));
    if(cookies[0] == ""){
        tasksList.style.visibility = "hidden";
    } else {
        tasksList.style.visibility = "visible";
    displayTasks(cookies);
    }
});

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    tasksList.style.visibility = "visible";
    createNewTask(e);
});
formElement.addEventListener('keyup', (e) => {
    e.preventDefault();
    if(e.key == "Enter") {
        e.preventDefault();
        tasksList.style.visibility = "visible";
        createNewTask(e);
    }
});

function createNewTask (e) {
    const task = formInputElement.value;
    if(task == "") {
        return;
    } else {
    const taskElement =  createTaskElement(task);
    const taskContentElement =  createTaskContentElement(taskElement);
    const taskActionsElement =  createTaskActionsElement(taskElement);
    const taskTextElement =  createTaskTextElement(task, taskContentElement);
    const editButtonElement =  createEditButtonElement(taskActionsElement);
    const deleteButtonElement=  createDeleteButtonElement(taskActionsElement);

    const key = taskElement.id;
    document.cookie = `${key}=${task}; expires=` + new Date (2025, 10, 3).toUTCString();
      
    addEditEventListener(editButtonElement, taskTextElement, key, taskElement);
    addEnterEventListener(editButtonElement, taskTextElement, key, taskElement)
    addDeleteEventListener(deleteButtonElement, taskElement, key);
    formInputElement.value = "";
    }
};
function displayTasks (cookies) {
    let displayTasks = cookies.map((cookie) => {
    const cookieKey = `${cookie[0]}`;
    const cookieValue = `${cookie[1]}`;
    const taskElement =  createTaskElement(cookieKey);
    const taskContentElement =  createTaskContentElement(taskElement);
    const taskActionsElement =  createTaskActionsElement(taskElement);
    const taskTextElement =  createTaskTextElement(cookieValue, taskContentElement);
    const editButtonElement =  createEditButtonElement(taskActionsElement);
    const deleteButtonElement=  createDeleteButtonElement(taskActionsElement);
    
    addEditEventListener(editButtonElement, taskTextElement, cookieKey, taskElement);
    addEnterEventListener(editButtonElement, taskTextElement, cookieKey, taskElement)
    addDeleteEventListener(deleteButtonElement, taskElement, cookieKey);
    }
    );
};

function createTaskElement(value) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("lisk__task");
    taskElement.classList.add("task");
    taskElement.setAttribute("id", String(value));
    tasksList.appendChild(taskElement);
    return taskElement;
};
function createTaskContentElement(taskElement) {
    const taskContentElement = document.createElement("div");
    taskContentElement.classList.add("task__content");
    taskElement.appendChild(taskContentElement);
    return taskContentElement;
};
function createTaskActionsElement(taskElement) {
    const taskActionsElement = document.createElement("div");
    taskActionsElement.classList.add("task__action");
    taskActionsElement.classList.add("action");
    taskElement.appendChild(taskActionsElement);
    return taskActionsElement;
};

function createTaskTextElement(value, taskContentElement) {
    const taskTextElement = document.createElement("textarea");
    taskTextElement.classList.add("task__text");
    taskTextElement.innerHTML = value;
    taskTextElement.setAttribute("readonly", "readonly");
    if (value.length < 90) {
        taskTextElement.setAttribute("rows", "2");
    } else if (value.length < 180){
        taskTextElement.setAttribute("rows", "3");
    } else {
        taskTextElement.setAttribute("rows", "4");
    };
    taskContentElement.appendChild(taskTextElement);
    return taskTextElement;
};
function createEditButtonElement(taskActionsElement) {
    const editButtonElement = document.createElement("button");
    editButtonElement.classList.add("action__edit");
    editButtonElement.classList.add("action__button");
    editButtonElement.innerHTML = "Edit";
    taskActionsElement.appendChild(editButtonElement);
    return editButtonElement;
};
function createDeleteButtonElement(taskActionsElement) {
    const deleteButtonElement = document.createElement("button");
    deleteButtonElement.classList.add("action__delete");
    deleteButtonElement.classList.add("action__button");
    deleteButtonElement.innerHTML = "Delete";
    taskActionsElement.appendChild(deleteButtonElement);
    return deleteButtonElement;
};

function addEditEventListener(editButtonElement, taskTextElement, cookieKey, taskElement) {
    editButtonElement.addEventListener('click', () => {
        if(editButtonElement.innerText.toLowerCase() == "edit") {
            taskTextElement.removeAttribute("readonly");
            taskTextElement.focus();
            editButtonElement.innerText = "Save";
        } else {
            if(taskTextElement.value == "") {
                const deleteChild = document.getElementById(`${cookieKey}`);
                tasksList.removeChild(deleteChild);
                document.cookie = `${cookieKey}=${taskTextElement.value}; expires=` + new Date(2000,0,1).toUTCString();
            } else {
                taskTextElement.setAttribute("readonly", "readonly");
                editButtonElement.innerText = "Edit";
                const newValue = taskTextElement.value;
                document.cookie = `${cookieKey}=${newValue}`;
            }
        }
    });
};
function addEnterEventListener(editButtonElement, taskTextElement, cookieKey, taskElement) {
    taskTextElement.addEventListener('keyup', (e) => {
        e.preventDefault();
        taskInputHeight(taskTextElement, e);
        if(e.key == "Enter") {
            if(editButtonElement.innerText.toLowerCase() == "edit") {
                taskTextElement.removeAttribute("readonly");
                taskTextElement.focus();
                editButtonElement.innerText = "Save";
                
            } else {
                if(taskTextElement.value == "") {
                    const deleteChild = document.getElementById(`${cookieKey}`);
                    tasksList.removeChild(deleteChild);
                    document.cookie = `${cookieKey}=${taskTextElement.value}; expires=` + new Date(2000,0,1).toUTCString();
                } else {
                    taskTextElement.setAttribute("readonly", "readonly");
                    editButtonElement.innerText = "Edit";
                    const newValue = taskTextElement.value;
                    document.cookie = `${cookieKey}=${newValue}`;
                }
            }
        }
    });
};

function addDeleteEventListener(deleteButtonElement, taskElement, cookieKey) {
    deleteButtonElement.addEventListener('click', () => {
        tasksList.removeChild(taskElement);
        document.cookie = `${cookieKey}=${taskElement.value}; expires=` + new Date(2000,0,1).toUTCString();
    });
};

function taskInputHeight(taskTextElement, e) {
    taskTextElement.style.height = "auto";
    const height = e.target.scrollHeight;
    taskTextElement.style.height = `${height}px`;
};