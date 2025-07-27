document.addEventListener('DOMContentLoaded', function() {
  const book = document.getElementById('book');
  const fontSizeControls = document.querySelectorAll('.font-size');

  fontSizeControls.forEach(control => {
    control.addEventListener('click', function(event) {
      event.preventDefault();
      
      // Убираем класс активности у всех элементов управления размером шрифта
      fontSizeControls.forEach(item => item.classList.remove('font-size_active'));
      
      // Добавляем класс активности текущему элементу
      this.classList.add('font-size_active');
      
      // Получаем значение размера из data-атрибута
      const size = this.dataset.size;
      
      // Удаляем все классы размера шрифта у книги
      book.classList.remove('book_fs-small', 'book_fs-big');
      
      // Добавляем соответствующий класс в зависимости от выбранного размера
      if (size === 'small') {
        book.classList.add('book_fs-small');
      } else if (size === 'big') {
        book.classList.add('book_fs-big');
      }
      // Если size не задан (нормальный размер), классы не добавляются
    });
  });
});