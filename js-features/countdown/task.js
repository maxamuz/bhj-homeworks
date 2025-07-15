// Получаем элемент таймера
const timerElement = document.getElementById("timer");

// Читаем начальное значение таймера из HTML и преобразуем его в число
let timerValue = parseInt(timerElement.textContent, 10);

// Функция, которая обновляет таймер
function updateTimer() {
  if (timerValue > 0) {
    timerValue--; // Уменьшаем таймер на 1
    timerElement.textContent = timerValue; // Обновляем значение в HTML
  } else {
    clearInterval(timerInterval); // Останавливаем интервал
    alert("Вы победили в конкурсе!"); // Показываем сообщение
  }
}

// Запускаем таймер, вызывая функцию updateTimer каждую секунду
const timerInterval = setInterval(updateTimer, 1000);
