document.addEventListener('DOMContentLoaded', function() {
    // Находим все элементы с классом has-tooltip
    const tooltipTriggers = document.querySelectorAll('.has-tooltip');
    
    // Переменная для хранения ссылки на активную подсказку
    let activeTooltip = null;

    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(event) {
            event.preventDefault(); // Предотвращаем переход по ссылке

            // Если есть активная подсказка, удаляем её
            if (activeTooltip) {
                activeTooltip.remove();
                // Если кликнули по тому же элементу, просто скрываем подсказку
                if (activeTooltip.triggerElement === this) {
                    activeTooltip = null;
                    return;
                }
            }

            // Создаем элемент подсказки
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip tooltip_active';
            tooltip.textContent = this.getAttribute('title');

            // Сохраняем ссылку на элемент, который вызвал подсказку
            tooltip.triggerElement = this;

            // Добавляем подсказку в документ
            document.body.appendChild(tooltip);

            // Получаем координаты элемента, на котором кликнули
            const rect = this.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

            // Позиционируем подсказку
            tooltip.style.top = rect.bottom + scrollTop + 'px';
            tooltip.style.left = rect.left + scrollLeft + 'px';

            // Сохраняем ссылку на активную подсказку
            activeTooltip = tooltip;
        });
    });

    // Закрываем подсказку при клике вне её
    document.addEventListener('click', function(event) {
        if (activeTooltip && !activeTooltip.triggerElement.contains(event.target) && event.target !== activeTooltip) {
            activeTooltip.remove();
            activeTooltip = null;
        }
    });
});