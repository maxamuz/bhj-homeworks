// Получаем необходимые элементы
const signinForm = document.getElementById('signin__form');
const signinBlock = document.getElementById('signin');
const welcomeBlock = document.getElementById('welcome');
const userIdSpan = document.getElementById('user_id');

// Проверяем при загрузке страницы, есть ли сохраненный пользователь
window.addEventListener('load', () => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
        // Если есть сохраненный ID пользователя, показываем блок приветствия
        userIdSpan.textContent = userId;
        signinBlock.classList.remove('signin_active');
        welcomeBlock.classList.add('welcome_active');
    }
});

// Обработчик отправки формы
signinForm.addEventListener('submit', (event) => {
    // Предотвращаем стандартное поведение формы (перезагрузку страницы)
    event.preventDefault();
    
    // Создаем объект FormData для сбора данных формы
    const formData = new FormData(signinForm);
    
    // Создаем XMLHttpRequest для отправки данных
    const xhr = new XMLHttpRequest();
    const url = 'https://students.netoservices.ru/nestjs-backend/auth';
    xhr.open('POST', url, true);
    
    // Установим таймаут для запроса (например, 10 секунд)
    xhr.timeout = 10000; 

    // Обработчик успешного получения ответа
    xhr.onload = function() {
        // Проверяем, является ли код ответа успешным (2xx)
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                // Парсим JSON-ответ
                const response = JSON.parse(xhr.responseText);
                console.log("Ответ сервера:", response); // Для отладки
                
                // Проверяем логику успеха, возвращаемую самим API
                if (response.success) {
                    // Успешная авторизация
                    const userId = response.user_id;
                    
                    // Сохраняем ID пользователя в localStorage
                    localStorage.setItem('user_id', userId);
                    
                    // Отображаем блок приветствия
                    userIdSpan.textContent = userId;
                    signinBlock.classList.remove('signin_active');
                    welcomeBlock.classList.add('welcome_active');
                } else {
                    // Неверные учетные данные (логика API: success: false)
                    alert('Неверный логин/пароль');
                    // Очищаем поля формы
                    signinForm.reset();
                }
            } catch (e) {
                // Ошибка при парсинге JSON
                console.error("Ошибка парсинга JSON:", e);
                console.error("Текст ответа:", xhr.responseText);
                alert('Ошибка при обработке ответа сервера. Получены некорректные данные.');
            }
        } else {
            // Ошибка HTTP (например, 4xx, 5xx)
            console.error(`HTTP ошибка ${xhr.status}: ${xhr.statusText}`);
            console.error("Текст ответа:", xhr.responseText);
            alert(`Ошибка сервера: ${xhr.status} ${xhr.statusText}`);
        }
    };
    
    // Обработчик сетевых ошибок (например, CORS, DNS, потеря соединения)
    xhr.onerror = function() {
        console.error("Сетевая ошибка при попытке соединения с", url);
        alert('Ошибка соединения с сервером. Проверьте подключение к интернету или настройки CORS.');
    };

    // Обработчик таймаута запроса
    xhr.ontimeout = function() {
        console.error("Таймаут запроса к", url);
        alert('Превышено время ожидания ответа от сервера.');
    };

    // Обработчик начала запроса (опционально, для отладки)
    xhr.onloadstart = function() {
       console.log("Запрос к", url, "начат...");
    };

    // Отправляем форму
    xhr.send(formData);
});