/*Name:M>Ahmed
Version 1
Todo App

Can Add edit remove and also count task 
*/

const todoList = document.getElementById("todoList")
const counter = document.getElementById("counter")
const btnAddTodo = document.getElementById("btnAddTodo")
const inputTodoTask = document.getElementById("inputTodoTask")
let firstTime = true



//for first time only it will remove after


let arrayOfTodo = [];
addTaskInTodoList("No TODO found ADD a todo to start")
document.getElementById(arrayOfTodo[0].id).querySelector("#editOrRemove").querySelector(".edit").disabled = true
document.getElementById(arrayOfTodo[0].id).querySelector("#editOrRemove").querySelector(".remove").disabled = true




btnAddTodo.addEventListener("click", () => {
    const taskTrimed = inputTodoTask.value.trim()
    
console.log("arrayOfTodo")
console.log(arrayOfTodo)
if (taskTrimed) {
    if (firstTime) {
        removeTodo(arrayOfTodo[0].id)
    firstTime=false
        }
    addTaskInTodoList(taskTrimed)
}
   
    console.log("arrayOfTodo")
    console.log(arrayOfTodo)
})


function toggleInEditMode(element) {

    element.querySelector("input").disabled = !element.querySelector("input").disabled 
    element.querySelector("#saveOrCancel").classList.toggle("hide")
    element.querySelector("#editOrRemove").classList.toggle("hide")



}


function cancelTask(id) {
    element.querySelector("input").value = arrayOfTodo[indexOfTask].todo
}

function updateTask(id,task="none") {
    console.log("entering in updating")
    
    let arrayTaskIndex = 0 
    for (let i = 0; i < arrayOfTodo.length; i++) {
        if (arrayOfTodo[i].id ==id) {
            arrayTaskIndex = i
            break
        }
        
    }
    if (task=="none") {
       
        document.getElementById(id).querySelector("input").value = arrayOfTodo[arrayTaskIndex].todo
    }else{
        document.getElementById(id).querySelector("input").value = task 
        arrayOfTodo[arrayTaskIndex].todo = task

    }

    console.log("Updated")
    console.log(arrayOfTodo)



}

todoList.addEventListener("click", (e) => {

    if (e.target.matches('.edit')) {
        
        toggleInEditMode(e.target.closest(".task"))

    }

    else if (e.target.matches('.remove')) {

        let alertText = "Do YOu really want to remove"
        if (confirm(alertText)) {
        
    removeTodo(e.target.closest('.task').id)
    updateCounter()
        }
    if(counter == 0 ){
    
addTaskInTodoList("No TODO found")
firstTime = true
        
    }



    }

    else if (e.target.matches('.save')) {

    
        toggleInEditMode(e.target.closest(".task"))
        console.log(e.target.closest("input")) 
        console.log(e.target.querySelector("input")) 

        updateTask(e.target.closest(".task").id ,document.getElementById(e.target.closest(".task").id).querySelector(".input").value)


    }
    else if (e.target.matches('.cancel')) {
        cancelTask(e.target.parentElement.parentElement)

        toggleInEditMode(e.target.parentElement.parentElement)

    }



})



function updateCounter() {
    counter.innerText = arrayOfTodo.length
}


function idGenerater() {
    return Math.floor(Math.random() * 99999);

}



function addTaskInTodoList(todo) {

    const todoObj = {
        id: idGenerater(),  
        todo: todo
    };
    arrayOfTodo.push(todoObj);
   showTask(todoObj)

}




function removeTodo(id) {
    arrayOfTodo = arrayOfTodo.filter(todo => todo.id != id);
    document.getElementById(id).remove();
    updateCounter();

}


function showTask(todo) {

    const todoElementDiv = document.createElement("div");
    todoElementDiv.id = todo.id;
    todoElementDiv.className = "task";
    todoElementDiv.innerHTML = `
        <p class="todo id">${todo.id}</p>
        <input class="todo input" value="${todo.todo}" disabled>
        <span id="editOrRemove" class="todo action">
            <button class="edit">edit</button>
            <button class="remove">remove</button>
        </span>
        <span id="saveOrCancel" class="hide todo action">
            <button class="save">save</button>
            <button class="cancel">cancel</button>
        </span>
    `;

    todoList.appendChild(todoElementDiv);
    updateCounter()
}
