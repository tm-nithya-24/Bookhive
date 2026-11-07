// Get cart from LocalStorage

function getCart() {
    return JSON.parse(localStorage.getItem("bookhiveCart")) || [];
}


// Save cart in LocalStorage

function saveCart(cart) {
    localStorage.setItem("bookhiveCart", JSON.stringify(cart));
}


// Update cart count

function updateCartCount() {

    const cart = getCart();

    const total = cart.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);

    document.querySelectorAll(".cart-count").forEach(element => {
        element.textContent = total;
    });
}


// Add book to cart

function addToCart(bookId) {

    const book = books.find(item => item.id === bookId);

    if (!book || !book.inStock) {
        alert("This book is currently unavailable.");
        return;
    }

    let cart = getCart();

    const existingItem = cart.find(item => item.id === bookId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: book.id,
            title: book.title,
            price: book.price,
            image: book.image,
            quantity: 1
        });
    }

    saveCart(cart);

    updateCartCount();

    alert(book.title + " added to your cart!");
}


// Change quantity

function changeQuantity(id, amount) {

    let cart = getCart();

    const item = cart.find(book => book.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(book => book.id !== id);
    }

    saveCart(cart);

    displayCart();

    updateCartCount();
}


// Remove item

function removeItem(id) {

    let cart = getCart();

    cart = cart.filter(item => item.id !== id);

    saveCart(cart);

    displayCart();

    updateCartCount();
}


// Display cart

function displayCart() {

    const container = document.getElementById("cart-items");

    if (!container) return;

    const cart = getCart();

    if (cart.length === 0) {

        container.innerHTML = `
            <div class="empty-cart">
                <h2>Your Cart is Empty 🛒</h2>
                <p>Discover something interesting to read.</p>
                <a href="books.html" class="btn">Explore Books</a>
            </div>
        `;

        updateSummary(cart);

        return;
    }

    container.innerHTML = cart.map(item => `

        <div class="cart-item">

            <div class="cart-book-image">
                ${item.image}
            </div>

            <div class="cart-book-info">

                <h3>${item.title}</h3>

                <p>₹${item.price}</p>

                <div class="quantity-controls">

                    <button onclick="changeQuantity(${item.id}, -1)">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${item.id}, 1)">
                        +
                    </button>

                </div>

            </div>

            <div>
                <h3>₹${item.price * item.quantity}</h3>

                <button
                    class="remove-btn"
                    onclick="removeItem(${item.id})">
                    Remove
                </button>
            </div>

        </div>

    `).join("");

    updateSummary(cart);
}


// Calculate total

function updateSummary(cart) {

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const itemElement = document.getElementById("total-items");
    const priceElement = document.getElementById("total-price");

    if (itemElement) {
        itemElement.textContent = totalItems;
    }

    if (priceElement) {
        priceElement.textContent =
            "₹" + totalPrice.toLocaleString("en-IN");
    }
}


// Demo checkout

function checkout() {

    const cart = getCart();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you for shopping with BookHive! This is a demo checkout.");

    localStorage.removeItem("bookhiveCart");

    displayCart();

    updateCartCount();
}


// Initialize cart

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

    if (document.getElementById("cart-items")) {
        displayCart();
    }

});