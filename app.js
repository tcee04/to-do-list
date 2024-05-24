// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD9VE8Ed2pGSt6yOVqQ2zunllBbPWnM5MA",
    authDomain: "task-management-website-84096.firebaseapp.com",
    projectId: "task-management-website-84096",
    storageBucket: "task-management-website-84096.appspot.com",
    messagingSenderId: "95495359123",
    appId: "1:95495359123:web:0a1007cc7d3c203678db66",
    measurementId: "G-SPY970RYNL"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const priorityInput = document.getElementById('priorityInput');
const dueDateInput = document.getElementById('dueDateInput');
const taskList = document.getElementById('taskList');

// Add task
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = taskInput.value;
    const priority = priorityInput.value;
    const dueDate = dueDateInput.value;

    if (task && priority && dueDate) {
        const newTaskRef = database.ref('tasks').push();
        newTaskRef.set({
            task: task,
            priority: priority,
            dueDate: dueDate
        });
    }

    taskForm.reset();
});

// Display tasks
database.ref('tasks').on('value', (snapshot) => {
    taskList.innerHTML = '';
    snapshot.forEach((childSnapshot) => {
        const task = childSnapshot.val();
        const taskId = childSnapshot.key;

        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <div>${task.task}</div>
            <div>Priority: ${task.priority}, Due Date: ${task.dueDate}</div>
        `;

        taskList.appendChild(li);
    });
});
