const filterSelect = document.querySelector(".filter-todo");
// listens for changes in the filter dropdown and triggers the filterTasks function.
filterSelect.addEventListener("change", filterTasks);

function filterTasks(){
    const filterValue = filterSelect.value;
    const tasks =listContainer.querySelectorAll("li")

    tasks.forEach(task => {
        switch(filterValue) {
            case "completed":
                if (task.classList.contains('checked')){
                    task.style.display = "flex";
                }else{
                    task.style.display = "none";
                }
                break;
            case "incomplete":
                if (!task.classList.contains('checked')){
                    task.style.display = "flex";
                }else{
                    task.style.display = "none";
                }
                break;
            default:
                task.style.display = "flex";
                break;
        }
    });
}