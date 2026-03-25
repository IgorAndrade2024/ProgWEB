document.addEventListener('DOMContentLoaded', () => {
  let tasks = [];
  let editingIndex = null;
  const home = document.getElementById('home');
  const formPage = document.getElementById('formPage');
  const taskList = document.getElementById('taskList');
  const titleInput = document.getElementById('title');
  const descInput = document.getElementById('description');
  const dateInput = document.getElementById('date');
  const addBtn = document.getElementById('addBtn');
  const createBtn = document.getElementById('createBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  // Eventos dos botoes
  addBtn.addEventListener('click', () => showForm());
  createBtn.addEventListener('click', addTask);
  cancelBtn.addEventListener('click', hideForm);
  // form da criação da tarefa
  function showForm(index = null) {
    home.classList.add('hidden');
    formPage.classList.remove('hidden');
    if (index !== null) {
      editingIndex = index;
      const task = tasks[index];
      titleInput.value = task.title;
      descInput.value = task.description;
      dateInput.value = task.date;
    } else {
      editingIndex = null;
      clearForm();
    }
  }
  // Manter o form escondido na tela de tarefas
  function hideForm() {
    home.classList.remove('hidden');
    formPage.classList.add('hidden');
    clearForm();
  }
  // Limpar form para uma nova tarefa
  function clearForm() {
    titleInput.value = '';
    descInput.value = '';
    dateInput.value = '';
  }
  // Adicionar e edtar tarefas
  function addTask() {
    const title = titleInput.value;
    const description = descInput.value;
    const date = dateInput.value;
    if (!title) {
      alert('Título obrigatório');
      return;
    }
    const task = { title, description, date };
    if (editingIndex !== null) {
      tasks[editingIndex] = task;
    } else {
      tasks.push(task);
    }
    editingIndex = null;
    renderTasks();
    hideForm();
  }
  // Excluir tarefa
  function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
  }
  // Mostrar a lista de tarefas
  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const div = document.createElement('div');
      div.className = 'task';
      div.innerHTML = `
        <strong>${task.title}</strong><br>
        ${task.description}<br>
        <small>${task.date}</small>
        <div class="task-buttons">
          <button class="edit">editar</button>
          <button class="delete">excluir</button>
        </div>
      `;
      const editBtn = div.querySelector('.edit');
      const deleteBtn = div.querySelector('.delete');
      editBtn.addEventListener('click', () => {
        showForm(index);
      });
      deleteBtn.addEventListener('click', () => {
        deleteTask(index);
      });
      taskList.appendChild(div);
    });
  }
});