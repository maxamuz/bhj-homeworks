// Получаем элементы
const counterElement = document.getElementById('clicker__counter');
const speedElement = document.createElement('div'); // Создаём элемент для скорости
speedElement.classList.add('clicker__speed');
speedElement.textContent = 'Скорость клика: 0 кликов/с';

// Вставляем его после счётчика
document.querySelector('.clicker__status').appendChild(speedElement);

const cookieElement = document.getElementById('cookie');

// Изначальное значение счётчика
let counter = 0;
let lastClickTime = null; // Храним время последнего клика

// Переменная для отслеживания текущего состояния размера
let isBig = true;

// Обработчик клика
cookieElement.addEventListener('click', () => {
    const now = Date.now();

    // Увеличиваем счётчик
    counter++;
    counterElement.textContent = counter;

    // Рассчитываем скорость
    if (lastClickTime !== null) {
        const timeDiffSeconds = (now - lastClickTime) / 1000; // разница в секундах
        const speed = timeDiffSeconds > 0 ? (1 / timeDiffSeconds).toFixed(2) : 0;
        speedElement.textContent = `Скорость клика: ${speed} кликов/с`;
    } else {
        speedElement.textContent = 'Скорость клика: 0 кликов/с';
    }

    // Сохраняем время текущего клика
    lastClickTime = now;

    // Меняем размер печеньки
    if (isBig) {
        cookieElement.width = 180;
        cookieElement.height = 180;
    } else {
        cookieElement.width = 200;
        cookieElement.height = 200;
    }

    // Переключаем состояние
    isBig = !isBig;
});