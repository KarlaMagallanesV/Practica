let cart = [];
let total = 0;

function addToCart(product, price) {
    cart.push({ product, price });
    total += price;
    updateCartUI();
}

function removeItem(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartCount.innerText = cart.length;
    cartItems.innerHTML = cart.length === 0 ? '<p class="empty-cart">El carrito está vacío.</p>' : '';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.product}</span>
            <span>S/ ${item.price}</span>
            <button class="remove-item-btn" onclick="removeItem(${index})">✕</button>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.innerText = total;
}

function toggleCart() {
    const cartDetails = document.getElementById('cart-details');
    cartDetails.classList.toggle('active');
}

function finalizePurchase() {
    if (cart.length === 0) {
        alert('El carrito está vacío. Agrega productos antes de finalizar.');
        return;
    }
    alert(`Compra finalizada. Total: S/ ${total}`);
    cart = [];
    total = 0;
    updateCartUI();
    toggleCart();
}

// Cierra el carrito si se hace clic fuera del mismo y está vacío
document.addEventListener('click', function (event) {
    const cartDetails = document.getElementById('cart-details');
    const isClickInsideCart = cartDetails.contains(event.target);

    if (!isClickInsideCart && cart.length === 0 && cartDetails.classList.contains('active')) {
        cartDetails.classList.remove('active');
    }
});
