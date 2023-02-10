const todos = JSON.parse(localStorage.getItem("todos")) || [];

const render = () => {
  const todolist = document.getElementById("todo-list");
  const todostemplates = todos.map((t) => `<li>${t}</li>`);
  todolist.innerHTML = todostemplates.join("");
  const elementos = document.querySelectorAll("#todo-list li");
  elementos.forEach((elemento, i) => {
    elemento.addEventListener("click", () => {
      elemento.parentNode.removeChild(elemento);
      todos.splice(i, 1);
      actulizaTodos(todos);
      render();
      /*console.log(todos, i)
        console.log(elemento, i);
        console.log(elemento.parentNode); */
    });
  });
};

const actulizaTodos = (todos) => {
    const todosstrings = JSON.stringify(todos);
    localStorage.setItem("todos", todosstrings); 
}

window.onload = () => {
  render();
  const form = document.getElementById("todo-form");
  form.onsubmit = (e) => {
    e.preventDefault();
    const todo = document.getElementById("todo");
    const todotext = todo.value;
    todo.value = "";
    todos.push(todotext);
    actulizaTodos(todos);
    render();
  };
};
