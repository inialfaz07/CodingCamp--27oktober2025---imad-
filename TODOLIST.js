
document.addEventListener('DOMContentLoaded', () => {

    
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const filterButtons = document.querySelector('.filter-buttons');

    
    todoForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const taskText = todoInput.value.trim();

        if (taskText !== '') {
            addTask(taskText);
            todoInput.value = ''; 
            todoInput.focus(); 
        }
    });

    
    todoList.addEventListener('click', (event) => {
        const clickedElement = event.target;
        const targetLi = clickedElement.closest('li'); 

        if (!targetLi) return; 

        
        if (clickedElement.classList.contains('delete-btn')) {
            targetLi.remove();
        } 
        
        else if (clickedElement.classList.contains('edit-btn')) {
            editTask(targetLi);
        }
        
        else if (clickedElement.closest('.task-content')) {
            targetLi.classList.toggle('completed');
            
            applyActiveFilter();
        }
    });

    
    filterButtons.addEventListener('click', (event) => {
        const clickedButton = event.target.closest('button');
        if (!clickedButton) return;

        
        const filterType = clickedButton.dataset.filter;

        
        filterButtons.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('active');
        });
        clickedButton.classList.add('active');

        
        filterTasks(filterType);
    });

    
    function applyActiveFilter() {
        const activeButton = filterButtons.querySelector('button.active');
        if (activeButton) {
            filterTasks(activeButton.dataset.filter);
        }
    }
});



function addTask(taskText) {
    const li = document.createElement('li');

    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'task-content';

    const taskSpan = document.createElement('span');
    taskSpan.className = 'task-text';
    taskSpan.textContent = taskText;

    const dateSpan = document.createElement('span');
    dateSpan.className = 'task-date';
    const today = new Date();
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    dateSpan.textContent = today.toLocaleDateString('id-ID', options);

    contentDiv.appendChild(taskSpan);
    contentDiv.appendChild(dateSpan);

    
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'task-controls';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Hapus';
    deleteBtn.className = 'delete-btn';

    controlsDiv.appendChild(editBtn);
    controlsDiv.appendChild(deleteBtn);

    
    li.appendChild(contentDiv);
    li.appendChild(controlsDiv);

    
    const todoList = document.getElementById('todo-list');
    todoList.appendChild(li);
}


function editTask(li) {
    const contentDiv = li.querySelector('.task-content');
    const taskSpan = li.querySelector('.task-text');
    const currentText = taskSpan.textContent;

    
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = currentText;
    editInput.className = 'task-text'; 
    editInput.style.width = '100%'; 

    contentDiv.replaceChild(editInput, taskSpan);
    editInput.focus();

   
    function saveEdit() {
        const newText = editInput.value.trim();
        if (newText !== '') {
            const newTaskSpan = document.createElement('span');
            newTaskSpan.className = 'task-text';
            newTaskSpan.textContent = newText;
            contentDiv.replaceChild(newTaskSpan, editInput);
        } else {
            
            contentDiv.replaceChild(taskSpan, editInput);
        }
    }

    
    editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        }
    });

    
    editInput.addEventListener('blur', saveEdit);
}


function filterTasks(filter) {
    const tasks = document.querySelectorAll('#todo-list li');

    tasks.forEach(task => {
        const isCompleted = task.classList.contains('completed');

        switch (filter) {
            case 'all':
                task.style.display = 'flex'; 
                break;
            case 'active':
                task.style.display = isCompleted ? 'none' : 'flex';
                break;
            case 'completed':
                task.style.display = isCompleted ? 'flex' : 'none';
                break;
        }
    });
}