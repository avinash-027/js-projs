const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = [];

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
});

// https://youtu.be/THEKW1gITJI?si=tDtpRpLFM0eOOWXZ
// https://youtu.be/THEKW1gITJI?si=tDtpRpLFM0eOOWXZ
// https://youtu.be/THEKW1gITJI?si=tDtpRpLFM0eOOWXZ
// https://youtu.be/THEKW1gITJI?si=tDtpRpLFM0eOOWXZ
// https://youtu.be/THEKW1gITJI?si=tDtpRpLFM0eOOWXZ
// GO GO GO GO GO 
// https://youtu.be/THEKW1gITJI?si=tDtpRpLFM0eOOWXZ
// https://youtu.be/THEKW1gITJI?si=tDtpRpLFM0eOOWXZ
// https://youtu.be/THEKW1gITJI?si=tDtpRpLFM0eOOWXZ
// https://youtu.be/THEKW1gITJI?si=tDtpRpLFM0eOOWXZ
// https://youtu.be/THEKW1gITJI?si=tDtpRpLFM0eOOWXZ
// https://youtu.be/THEKW1gITJI?si=tDtpRpLFM0eOOWXZ
function addTodo(){
    const todoText = todoInput.ariaValueMax.trim();
    if(todoText.length > 0){
        allTodos.push(todoText);
        createTodoItem(todoText);

        todoInput.value = '';
    }
}
function createTaskElement(todo){
    const todoLI = document.createElement("li");
    todoLI.innerText = todo;
    todoListUL.append(todo);    
}