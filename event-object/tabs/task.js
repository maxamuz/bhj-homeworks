document.addEventListener("DOMContentLoaded", function () {
  // Находим все блоки с вкладками на странице
  const tabContainers = document.querySelectorAll(".tabs");

  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll(".tab");
    const contents = container.querySelectorAll(".tab__content");

    // Назначаем обработчики событий на каждую вкладку
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        // Убираем активный класс у всех вкладок
        tabs.forEach(t => t.classList.remove("tab_active"));
        // Убираем активный класс у всех контентных блоков
        contents.forEach(c => c.classList.remove("tab__content_active"));

        // Добавляем активный класс для текущей вкладки и соответствующего контента
        tab.classList.add("tab_active");
        contents[index].classList.add("tab__content_active");
      });
    });
  });
});