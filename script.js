document.getElementById('todo-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const done = document.getElementById('done').checked;
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    let taskIdCounter = parseInt(localStorage.getItem('taskIdCounter')) || 0;
    taskIdCounter += 1;

    tasks.push({ id: taskIdCounter, name, description, date, done });

    localStorage.setItem('tasks', JSON.stringify(tasks));

    localStorage.setItem('taskIdCounter', taskIdCounter.toString());

    addTaskToTable(taskIdCounter, name, description, date, done);

    document.getElementById('todo-form').reset();

});

function addTaskToTable(id, name, description, date, done) {
    const tableBody = document.querySelector('#todo-table tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${description}</td>
        <td>${date}</td>
        <td>${done ? 'Yes' : 'No'}</td>
        <td class="actions">
            <button class="edit" onclick="editTask(${id})">Edit</button>
            <button class="delete" onclick="deleteTask(${id})">Delete</button>
        </td>
    `;

    tableBody.appendChild(row);
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToTable(task.id, task.name, task.description, task.date, task.done));
}

function editTask(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.id === id);

    if (task) {
        document.getElementById('name').value = task.name;
        document.getElementById('description').value = task.description;
        document.getElementById('date').value = task.date;
        document.getElementById('done').checked = task.done;

        deleteTask(id);  
    }
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== id);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    const tableBody = document.querySelector('#todo-table tbody');
    tableBody.innerHTML = '';
    loadTasks();
}

document.addEventListener('DOMContentLoaded', loadTasks);
