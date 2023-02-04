const form = document.getElementById('form') //get the form element from the html and assign form
const input = document.getElementById('input') //get the input element from the html and assign input
const todosUL = document.getElementById('todos') //get the todos list element from the html and assign todos

const todos = JSON.parse(localStorage.getItem('todos')) //pase todos as JSON object

if(todos) { 
    todos.forEach(todo => addTodo(todo)) //if todos passed through, iterate through todos array and pass each todo from the todos array through the addTodo() function 
}

form.addEventListener('submit', (event) => { //eventListener function
    event.preventDefault()

    addTodo() // on submit, call the addTodo function
})

function addTodo(todo) {
    let todoText = input.value //value of user input assigned to toDo text

    if(todo) { //if arguemnt passed, set toDotext to the text propoert of the passed argument
        todoText = todo.text 
    }
    
    /*
    if todoText item passed, 
    - create list element
    - add element to list 
    - display new element with text of todo

    - completed on click

    - delete on left click
    */

    if(todoText) { //if todo text passed
        const todoEl = document.createElement('li')

        // todoEl.style.opacity = 0;
        // todoEl.style.transition = "opacity 1s ease-in-out";

        // setTimeout(() => {
        //     todoEl.style.opacity = 1;
        // }, 50);

        if(todo && todo.completed) {
            todoEl.classList.add('completed') //add the class completed to the todo element if element completed
        }

        todoEl.innerText = todoText

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
            updateLS() //on todo click, call updateLS function
        }) 

        todoEl.addEventListener('contextmenu', (event) => {
            event.preventDefault()

            todoEl.remove() //remove element from list
            updateLS() //on left click, call updateLS function
        }) 

        todosUL.appendChild(todoEl) //append todo element to the ul list

        input.value = '' //clear input text value

        updateLS() //call updateLS function
    }
}

function updateLS() {
    todosEl = document.querySelectorAll('li') // get list of elements

    const todos = [] //initialize empty array that will be used to store list items

    todosEl.forEach(todoEl => { //iterates through each todo element
        todos.push({
            text: todoEl.innerText, // pushes text and completed - text property stores the text content of the li element
            completed: todoEl.classList.contains('completed') //completed property stores whether the to-do item has the class completed
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos)) //store the array in the local storage
}