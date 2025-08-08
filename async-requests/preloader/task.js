// task.js

document.addEventListener("DOMContentLoaded", function () {
  // Получаем необходимые элементы
  const loader = document.getElementById("loader");
  const itemsContainer = document.getElementById("items");

  // Создаем XMLHttpRequest объект
  const xhr = new XMLHttpRequest();

  // Настраиваем запрос
  xhr.open(
    "GET",
    "https://students.netoservices.ru/nestjs-backend/slow-get-courses",
    true
  );

  // Обработчик события загрузки
  xhr.onload = function () {
    // Скрываем анимацию загрузки
    loader.classList.remove("loader_active");

    if (xhr.status === 200) {
      try {
        // Парсим JSON-данные
        const data = JSON.parse(xhr.responseText);

        // Получаем объект с валютами
        const valute = data.response.Valute;

        // Очищаем контейнер от старых данных (на случай, если там что-то было)
        itemsContainer.innerHTML = "";

        // Проходим по каждой валюте и создаем для нее элементы
        for (const key in valute) {
          if (valute.hasOwnProperty(key)) {
            const currency = valute[key];

            // Создаем контейнер для одной валюты
            const itemDiv = document.createElement("div");
            itemDiv.className = "item";

            // Создаем и заполняем элемент с кодом валюты
            const codeDiv = document.createElement("div");
            codeDiv.className = "item__code";
            codeDiv.textContent = currency.CharCode;

            // Создаем и заполняем элемент со значением курса
            const valueDiv = document.createElement("div");
            valueDiv.className = "item__value";
            valueDiv.textContent = currency.Value;

            // Создаем и заполняем элемент с обозначением валюты
            const currencyDiv = document.createElement("div");
            currencyDiv.className = "item__currency";
            currencyDiv.textContent = "руб.";

            // Добавляем созданные элементы в контейнер валюты
            itemDiv.appendChild(codeDiv);
            itemDiv.appendChild(valueDiv);
            itemDiv.appendChild(currencyDiv);

            // Добавляем контейнер валюты в общий контейнер
            itemsContainer.appendChild(itemDiv);
          }
        }
      } catch (e) {
        console.error("Ошибка при парсинге JSON:", e);
      }
    } else {
      console.error("Ошибка загрузки данных. Статус:", xhr.status);
    }
  };

  // Обработчик ошибки
  xhr.onerror = function () {
    loader.classList.remove("loader_active");
    console.error("Ошибка сетевого запроса");
  };

  // Отправляем запрос
  xhr.send();
});
