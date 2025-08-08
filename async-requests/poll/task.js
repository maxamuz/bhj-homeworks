document.addEventListener("DOMContentLoaded", function () {
  // Получаем необходимые элементы
  const pollTitle = document.getElementById("poll__title");
  const pollAnswers = document.getElementById("poll__answers");

  // Создаем XMLHttpRequest объект
  const xhr = new XMLHttpRequest();

  // Настраиваем запрос
  xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/poll", true);

  // Обработчик события загрузки
  xhr.onload = function () {
    if (xhr.status === 200) {
      try {
        // Парсим JSON-данные
        const pollData = JSON.parse(xhr.responseText);

        // Устанавливаем заголовок опроса
        pollTitle.textContent = pollData.data.title;

        // Очищаем контейнер с ответами
        pollAnswers.innerHTML = "";

        // Создаем кнопки для каждого ответа
        pollData.data.answers.forEach((answer) => {
          const button = document.createElement("button");
          button.className = "poll__answer";
          button.textContent = answer;

          // Добавляем обработчик клика на кнопку
          button.addEventListener("click", function () {
            alert("Спасибо, ваш голос засчитан!");
          });

          // Добавляем кнопку в контейнер
          pollAnswers.appendChild(button);
        });
      } catch (e) {
        console.error("Ошибка при парсинге JSON:", e);
      }
    } else {
      console.error("Ошибка загрузки данных. Статус:", xhr.status);
    }
  };

  // Обработчик ошибки
  xhr.onerror = function () {
    console.error("Ошибка сетевого запроса");
  };

  // Отправляем запрос
  xhr.send();
});
