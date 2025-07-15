// Получаем элементы счётчиков
const deadCounter = document.getElementById('dead');
const lostCounter = document.getElementById('lost');

// Функция, возвращающая лунку по индексу
function getHole(index) {
    return document.getElementById(`hole${index}`);
}

// Основной игровой цикл: регистрируем обработчики для всех лунок
for (let i = 1; i <= 9; i++) {
    const hole = getHole(i);

    hole.addEventListener('click', function () {
        // Проверяем, есть ли в лунке крот
        if (hole.classList.contains('hole_has-mole')) {
            let currentDead = parseInt(deadCounter.textContent, 10) + 1;
            deadCounter.textContent = currentDead;

            // Проверка условия победы
            if (currentDead === 10) {
                alert('Победа!');
                resetGame();
            }
        } else {
            let currentLost = parseInt(lostCounter.textContent, 10) + 1;
            lostCounter.textContent = currentLost;

            // Проверка условия проигрыша
            if (currentLost === 5) {
                alert('Вы проиграли!');
                resetGame();
            }
        }
    });
}

// Функция для сброса игры
function resetGame() {
    deadCounter.textContent = '0';
    lostCounter.textContent = '0';

    for (let i = 1; i <= 9; i++) {
        const hole = getHole(i);
        hole.classList.remove('hole_has-mole');
    }
}