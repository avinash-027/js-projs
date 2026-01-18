
const addButton = document.querySelector('#addTask');
const taskInput = document.querySelector('#taskInput');
const listContainer = document.querySelector('#listContainer');

loadData(); 
// Load previously saved tasks from localStorage when the page loads

function addTask(){

    const task = taskInput.value.trim();

    if (task){
        createTaskElement(task);
        
        taskInput.value =''; 
        saveData(); // Save the updated list of tasks to localStorage
    }else{
        alert("Please enter task..!");
    }
}

addButton.addEventListener("click",addTask);

function createTaskElement(task){

    const listItem = document.createElement('li');
    listItem.textContent = task;

    listContainer.append(listItem);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener("click", function(){
        listItem.remove(); // Remove the <li> when the delete button is clicked
        // listContainer.removeChild(listItem);
        saveData(); // Save the updated list of tasks after deletion
    });

    listItem.append(deleteButton);
}

function saveData() {

    let tasks = [];
    // Loop through all the <li> elements and get their text content (task text) 
    listContainer.querySelectorAll('li').forEach(function(item){
        tasks.push(item.textContent.replace("Delete","").trim());
    });
    // Remove the "Delete" button text and trim the task text before adding to the array

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function loadData(){
    
    const  tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Loop through the tasks array and create the task elements
    tasks.forEach(function(task){
        createTaskElement(task);
    }); 
    // Create and append a task for each item in the tasks array
}
