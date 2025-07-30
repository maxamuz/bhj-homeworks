document.addEventListener('DOMContentLoaded', function() {
    const cartProducts = document.querySelector('.cart__products');
    
    // Обработчик для всего документа (делегирование событий)
    document.addEventListener('click', function(event) {
        const target = event.target;
        
        // Обработка увеличения количества
        if (target.classList.contains('product__quantity-control_inc')) {
            const quantityValue = target.closest('.product__quantity-controls').querySelector('.product__quantity-value');
            let currentValue = parseInt(quantityValue.textContent);
            quantityValue.textContent = currentValue + 1;
        }
        
        // Обработка уменьшения количества
        if (target.classList.contains('product__quantity-control_dec')) {
            const quantityValue = target.closest('.product__quantity-controls').querySelector('.product__quantity-value');
            let currentValue = parseInt(quantityValue.textContent);
            if (currentValue > 1) {
                quantityValue.textContent = currentValue - 1;
            }
        }
        
        // Обработка добавления в корзину
        if (target.classList.contains('product__add')) {
            const product = target.closest('.product');
            const productId = product.dataset.id;
            const productImage = product.querySelector('.product__image').src;
            const quantityValue = parseInt(product.querySelector('.product__quantity-value').textContent);
            
            // Проверяем, есть ли уже такой товар в корзине
            const existingCartProduct = cartProducts.querySelector(`.cart__product[data-id="${productId}"]`);
            
            if (existingCartProduct) {
                // Если товар уже есть, увеличиваем количество
                const cartProductCount = existingCartProduct.querySelector('.cart__product-count');
                let currentCount = parseInt(cartProductCount.textContent);
                cartProductCount.textContent = currentCount + quantityValue;
            } else {
                // Если товара нет, создаем новый элемент в корзине
                const cartProduct = document.createElement('div');
                cartProduct.className = 'cart__product';
                cartProduct.dataset.id = productId;
                
                const cartProductImage = document.createElement('img');
                cartProductImage.className = 'cart__product-image';
                cartProductImage.src = productImage;
                
                const cartProductCount = document.createElement('div');
                cartProductCount.className = 'cart__product-count';
                cartProductCount.textContent = quantityValue;
                
                cartProduct.appendChild(cartProductImage);
                cartProduct.appendChild(cartProductCount);
                
                cartProducts.appendChild(cartProduct);
            }
        }
    });
});