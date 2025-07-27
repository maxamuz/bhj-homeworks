document.addEventListener('DOMContentLoaded', function() {
  const revealElements = document.querySelectorAll('.reveal');

  function checkReveal() {
    const viewportHeight = window.innerHeight;

    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;

      // Элемент считается видимым, если его верхняя граница находится
      // выше нижней границы окна и его нижняя граница находится
      // ниже верхней границы окна (с небольшим запасом в 1 пиксель по умолчанию для top и bottom).
      // getBoundingClientRect().top >= 0 - элемент начинается внутри viewport
      // getBoundingClientRect().bottom <= viewportHeight - элемент заканчивается внутри viewport
      // getBoundingClientRect().top <= viewportHeight && getBoundingClientRect().bottom >= 0 - элемент пересекает viewport
      if (elementTop < viewportHeight && elementBottom > 0) {
        element.classList.add('reveal_active');
      } else {
         // Опционально: убрать класс, если элемент ушел из поля зрения
         // element.classList.remove('reveal_active');
         // (Закомментировано, так как в описании не указано, что блоки должны исчезать)
      }
    });
  }

  // Проверить видимость при загрузке страницы
  checkReveal();

  // Проверять видимость при прокрутке
  window.addEventListener('scroll', checkReveal);
});