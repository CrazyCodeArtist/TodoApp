/*Name:M>Ahmed
Version 2
Todo App

Can Add edit remove and also count task 
*/

const todoList = document.getElementById("todoList")
const counter = document.getElementById("counter")
const btnAddTodo = document.getElementById("btnAddTodo")
const inputTodoTask = document.getElementById("inputTodoTask")
const noTodo = document.getElementById("no-todo")
let firstTime = true
let arrayOfTodo;



initTodoApp()

function initTodoApp() {

    const localTodos= localStorage.getItem("todos")
    if (localTodos) {
        arrayOfTodo = JSON.parse(localStorage.getItem("todos"))
        arrayOfTodo.forEach(element => {
            showTask(element)
        }); 

    }else{
arrayOfTodo=[]
    }
    if (arrayOfTodo.length==0) {
        
        noTodo.classList.remove("hide")
        
    }
   
    btnAddTodo.addEventListener("click", addTask)
    todoList.addEventListener("click", handleTodoAction)



}


function toggleInEditMode(element) {

    element.querySelector("input").disabled = !element.querySelector("input").disabled
    element.querySelector("#saveOrCancel").classList.toggle("hide")
    element.querySelector("#editOrRemove").classList.toggle("hide")



}


function cancelTask(element) {

    let id = element.querySelector("p").innerText
    let indexOfTask = -1

    indexOfTask = arrayOfTodo.findIndex((subArrayOfTodo) => subArrayOfTodo.id == id)
    element.querySelector("input").value = arrayOfTodo[indexOfTask].todo

    toggleInEditMode(element)
}

function updateTask(id, task = "none") {

    let arrayTaskIndex = 0
    arrayTaskIndex = arrayOfTodo.findIndex((subArray)=> subArray.id == id)
    if (task == "none") {

        document.getElementById(id).querySelector("input").value = arrayOfTodo[arrayTaskIndex].todo
    } else {
        document.getElementById(id).querySelector("input").value = task
        arrayOfTodo[arrayTaskIndex].todo = task

    }
}



function handleTodoAction(e) {
    const action = e.target.className

    switch (action) {
        case "edit":toggleInEditMode(e.target.closest(".task"))
         break;
        case "remove": removeTodo(e.target.closest('.task').id)
         break;
        case "save":
            updateTask(e.target.closest(".task").id, document.getElementById(e.target.closest(".task").id).querySelector(".input").value)
            toggleInEditMode(e.target.closest(".task"))
            break
        case "cancel":
            cancelTask(e.target.parentElement.parentElement)
            break;
        default:
            break;
    }





}


function updateCounterAndStorage() {
    
    localStorage.setItem("todos",JSON.stringify(arrayOfTodo))
    if (arrayOfTodo.length ==0) {
            noTodo.classList.remove("hide")

    } else {
    
    counter.innerText = arrayOfTodo.length
    noTodo.classList.add("hide")    
}
}


function idGenerater() {
    return Math.floor(Math.random() * 99999);

}



function addTask() {


    const taskTrimed = inputTodoTask.value.trim()
    if (taskTrimed) {
        const todoObj = {
            id: idGenerater(),
            todo: taskTrimed
        };
        arrayOfTodo.push(todoObj);
        showTask(todoObj)
    }



}




function removeTodo(id) {

    let alertText = "Do You really want to remove"
    if (confirm(alertText)) {

        arrayOfTodo = arrayOfTodo.filter(todo => todo.id != id);
        document.getElementById(id).remove();
        updateCounterAndStorage();
    }
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
    updateCounterAndStorage()
}
