document.addEventListener('DOMContentLoaded', function() {
  // Находим все ротаторы на странице
  const rotators = document.querySelectorAll('.rotator');

  // Для каждого ротатора запускаем свой интервал
  rotators.forEach(rotator => {
    const cases = rotator.querySelectorAll('.rotator__case');
    let activeIndex = 0; // Индекс активного элемента

    // Функция для смены активного элемента
    function rotate() {
      // Убираем класс активности у текущего элемента
      cases[activeIndex].classList.remove('rotator__case_active');
      
      // Вычисляем индекс следующего элемента (по кругу)
      activeIndex = (activeIndex + 1) % cases.length;
      
      // Получаем следующий активный элемент
      const nextActiveCase = cases[activeIndex];
      
      // Добавляем класс активности следующему элементу
      nextActiveCase.classList.add('rotator__case_active');
      
      // Получаем скорость из data-атрибута или используем значение по умолчанию 1000мс
      const speed = parseInt(nextActiveCase.dataset.speed) || 1000;
      
      // Получаем цвет из data-атрибута
      const color = nextActiveCase.dataset.color;
      if (color) {
        nextActiveCase.style.color = color;
      }
      
      // Очищаем предыдущий интервал и устанавливаем новый с нужной скоростью
      clearInterval(rotator.intervalId);
      rotator.intervalId = setInterval(rotate, speed);
    }
    
    // Устанавливаем начальный цвет для первого активного элемента
    const initialActiveCase = cases[activeIndex];
    const initialColor = initialActiveCase.dataset.color;
    if (initialColor) {
      initialActiveCase.style.color = initialColor;
    }
    
    // Запускаем ротацию с начальной скоростью
    const initialSpeed = parseInt(initialActiveCase.dataset.speed) || 1000;
    rotator.intervalId = setInterval(rotate, initialSpeed);
  });
});