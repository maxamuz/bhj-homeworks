
    // Находим все dropdown'ы на странице
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const valueElement = dropdown.querySelector('.dropdown__value');
        const list = dropdown.querySelector('.dropdown__list');
        const items = dropdown.querySelectorAll('.dropdown__item');

        // Открытие/закрытие списка
        valueElement.addEventListener('click', (e) => {
            list.classList.toggle('dropdown__list_active');
        });

        // Обработка выбора элемента
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault(); // отменяем переход по ссылке

                const selectedText = item.textContent.trim();
                valueElement.textContent = selectedText;

                list.classList.remove('dropdown__list_active');
            });
        });
    });

    // Закрытие всех списков при клике вне их области
    document.addEventListener('click', (e) => {
        dropdowns.forEach(dropdown => {
            const valueElement = dropdown.querySelector('.dropdown__value');
            const list = dropdown.querySelector('.dropdown__list');

            if (!dropdown.contains(e.target)) {
                list.classList.remove('dropdown__list_active');
            }
        });
    });
