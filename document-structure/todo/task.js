document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('tasks__form');
    const taskInput = document.getElementById('task__input');
    const taskList = document.getElementById('tasks__list');

    // Обработчик отправки формы (добавления задачи)
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем стандартное поведение формы
        
        // Проверяем, что поле ввода не пустое
        if (taskInput.value.trim() !== '') {
            // Создаем элемент задачи
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            
            // Создаем заголовок задачи
            const taskTitle = document.createElement('div');
            taskTitle.className = 'task__title';
            taskTitle.textContent = taskInput.value.trim();
            
            // Создаем кнопку удаления
            const removeButton = document.createElement('a');
            removeButton.href = '#';
            removeButton.className = 'task__remove';
            removeButton.innerHTML = '&times;';
            
            // Добавляем обработчик удаления только для этой кнопки
            removeButton.addEventListener('click', function(e) {
                e.preventDefault();
                taskElement.remove();
            });
            
            // Собираем элемент задачи
            taskElement.appendChild(taskTitle);
            taskElement.appendChild(removeButton);
            
            // Добавляем задачу в список
            taskList.appendChild(taskElement);
            
            // Очищаем поле ввода
            taskInput.value = '';
        }
    });
});