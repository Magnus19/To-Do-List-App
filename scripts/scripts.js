const submitForm = document.getElementById("app-input");
const appBody = document.getElementById("app-body");
const addTask = document.getElementById("add-task");

let idCounter = 0;
const list = [];

const addTaskToList = (taskName) => {
    const item = {id: String(idCounter).padStart(8, "0"), title: taskName, completed: false};
    list.push(item);
    idCounter++;
    renderTaskContainers();
}

const deleteTaskById = (id) => {
    const idx = list.findIndex(t => t.id === id);
    if (idx !== -1) list.splice(idx, 1);
    renderTaskContainers();
}

const toggleTaskById = (id, completed) => {
    const idx = list.findIndex(t => t.id === id);
    if (idx !== -1) list[idx].completed = !completed;
}

const renderTaskContainers = () => {
    // Rerender entire task containers
    appBody.innerHTML = "";

    list.forEach(task => {
        const taskContainer = document.createElement("div");
        taskContainer.className = "div-container";
        taskContainer.dataset.id = task.id;

        const taskCheck = document.createElement("input");
        taskCheck.type = "checkbox";
        taskCheck.dataset.role = "toggle";
        taskCheck.checked = !!task.completed;

        const taskText = document.createElement("p");
        taskText.textContent = task.title;

        const taskDel = document.createElement("button");
        taskDel.className = "del-task";
        taskDel.dataset.role = "delete";
        taskDel.textContent = "X";

        taskContainer.appendChild(taskCheck);
        taskContainer.appendChild(taskText);
        taskContainer.appendChild(taskDel);

        appBody.appendChild(taskContainer);
    });
}

submitForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskName = addTask.value.trim();
    if(!taskName) return alert("Please enter a task!");
    addTaskToList(taskName);
    addTask.value = "";
});

appBody.addEventListener("click", (event) => {
    const role = event.target.dataset.role;
    if (!role) return;

    const container = event.target.closest(".div-container");
    if (!container) return;
    
    const id = container.dataset.id;

    if (role === "delete") deleteTaskById(id);
});

appBody.addEventListener("change", (event) => {
    const eventParent = event.target.parentElement;
    const container = event.target.closest(".div-container");
    if (!container) return;
    const id = container.dataset.id;

    if (event.target.checked) {
        eventParent.classList.add("checked");
        toggleTaskById(id, event.target.checked);
    } else {
        eventParent.classList.remove("checked");
    }
})

renderTaskContainers();


// Original code with no modular architecture intended

// submitForm.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const taskName = addTask.value.trim();

//     if (!taskName) return alert("Please enter a task!");

//     list.push({id: String(idCounter).padStart(8, "0"), title: taskName, completed: false});
//     idCounter++;

//     renderTaskContainers();

//     addTask.value = "";
// });

// const renderTaskContainers = () => {
//     const taskContainer = document.createElement("div");
//     taskContainer.setAttribute("class", "div-container");

//     const taskText = document.createElement("p");
//     taskText.textContent = list[list.length - 1].title;

//     const taskDel = document.createElement("button");
//     taskDel.setAttribute("class", "del-task");
//     taskDel.textContent = "X";

//     taskDel.addEventListener("click", (event) => {
//         if (event.target.matches(".del-task")) {
//             const p = event.target.parentElement.querySelector('p');
//             const text = p ? p.textContent : null;

//             event.target.parentElement.remove()

//             list.forEach(taskTitle => {
//                 if (taskTitle.title === text) {
//                     const listIndex = list.indexOf(taskTitle);
//                     list.splice(listIndex, 1);
//                 }
//             });
//         };
//     });

//     const taskCheck = document.createElement("input");
//     taskCheck.type = "checkbox";
    
//     taskCheck.addEventListener("change", (event) =>{
//         const taskCheckParent = event.target.parentElement;
//         const p = event.target.parentElement.querySelector('p');
//         const text = p ? p.textContent : null;

//         if (event.target.checked) {
//             taskCheckParent.classList.add("checked");
//             list.forEach(taskDone => {
//                 if (taskDone.title === text) {
//                     taskDone.completed = true;
//                     console.log(list);
//                 }
//             });

//         }
//         else {
//             taskCheckParent.classList.remove("checked");
//             list.forEach(taskDone => {
//                 if (taskDone.title === text) {
//                     taskDone.completed = false;
//                     console.log(list);
//                 }
//             });
//         }
//     });

//     taskContainer.appendChild(taskCheck);
//     taskContainer.appendChild(taskText);
//     taskContainer.appendChild(taskDel);

//     appBody.appendChild(taskContainer);
// }
