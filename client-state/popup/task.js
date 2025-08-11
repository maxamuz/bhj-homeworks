// Получаем ссылку на модальное окно и кнопку закрытия
const modal = document.getElementById("subscribe-modal");
const closeBtn = modal.querySelector(".modal__close");

// Функция для получения значения cookie по имени
function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Функция для установки cookie
function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

// Проверяем, показывалось ли окно ранее
window.addEventListener("load", () => {
  const modalClosed = getCookie("modalClosed");

  // Если cookie не установлен или равно 'false', показываем окно
  if (!modalClosed || modalClosed !== "true") {
    modal.classList.add("modal_active");
  }
});

// Обработчик закрытия окна
closeBtn.addEventListener("click", () => {
  // Убираем класс активности у модального окна
  modal.classList.remove("modal_active");

  // Устанавливаем cookie, указывающий, что окно было закрыто
  setCookie("modalClosed", "true", { expires: 365 }); // Храним информацию 365 дней
});
