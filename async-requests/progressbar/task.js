document.addEventListener("DOMContentLoaded", function () {
  // Получаем необходимые элементы
  const form = document.getElementById("form");
  const fileInput = document.getElementById("file");
  const progress = document.getElementById("progress");
  const fileNameSpan = document.querySelector(".input__wrapper-desc");
  const sendButton = document.getElementById("send");

  // Обработчик изменения файла
  fileInput.addEventListener("change", function () {
    if (fileInput.files.length > 0) {
      fileNameSpan.textContent = fileInput.files[0].name;
    } else {
      fileNameSpan.textContent = "Имя файла...";
    }
  });

  // Обработчик отправки формы
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Предотвращаем стандартную отправку формы

    // Проверяем, выбран ли файл
    if (fileInput.files.length === 0) {
      alert("Пожалуйста, выберите файл для загрузки");
      return;
    }

    // Создаем объект FormData и добавляем файл
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    // Создаем XMLHttpRequest объект
    const xhr = new XMLHttpRequest();

    // Настраиваем отслеживание прогресса загрузки
    xhr.upload.addEventListener("progress", function (event) {
      if (event.lengthComputable) {
        // Вычисляем процент загрузки
        const percentComplete = event.loaded / event.total;
        progress.value = percentComplete;
      }
    });

    // Обработчик завершения загрузки
    xhr.onload = function () {
      if (xhr.status === 200 || xhr.status === 201) {
        alert("Файл успешно загружен");
        // Сбрасываем форму и прогресс
        form.reset();
        progress.value = 0;
        fileNameSpan.textContent = "Имя файла...";
      } else {
        alert("Ошибка загрузки файла. Попробуйте еще раз.");
        progress.value = 0;
      }
    };

    // Обработчик ошибки
    xhr.onerror = function () {
      alert("Ошибка сети. Попробуйте еще раз.");
      progress.value = 0;
    };

    // Отправляем запрос
    xhr.open(
      "POST",
      "https://students.netoservices.ru/nestjs-backend/upload",
      true
    );
    xhr.send(formData);
  });
});
