// Display book cards

function displayBooks(bookList, containerId) {

    const container = document.getElementById(containerId);

    if (!container) return;

    if (bookList.length === 0) {
        container.innerHTML = "<p>No books found.</p>";
        return;
    }

    container.innerHTML = bookList.map(book => `

        <div class="book-card">

            <div class="book-image">
                ${book.image}
            </div>

            <div class="book-info">

                <p class="book-category">${book.category}</p>

                <h3>${book.title}</h3>

                <p class="author">By ${book.author}</p>

                <p class="rating">
                    ⭐ ${book.rating} (${book.reviews} reviews)
                </p>

                <div class="price">
                    <span>₹${book.price}</span>
                    <del>₹${book.originalPrice}</del>
                </div>

                <div class="card-buttons">

                    <button onclick="viewBook(${book.id})">
                        Details
                    </button>

                    <button onclick="addToCart(${book.id})">
                        Add to Cart
                    </button>

                </div>

            </div>

        </div>

    `).join("");
}


// View book details

function viewBook(bookId) {

    window.location.href = `book.html?id=${bookId}`;

}


// Display individual book

function displayBookDetails() {

    const container = document.getElementById("book-details");

    if (!container) return;

    const params = new URLSearchParams(window.location.search);

    const bookId = Number(params.get("id"));

    const book = books.find(item => item.id === bookId);

    if (!book) {

        container.innerHTML = "<h2>Book not found.</h2>";

        return;
    }

    container.innerHTML = `

        <div class="detail-image">
            ${book.image}
        </div>

        <div class="detail-content">

            <p class="eyebrow">${book.category}</p>

            <h1>${book.title}</h1>

            <h3>By ${book.author}</h3>

            <p>⭐ ${book.rating} (${book.reviews} reviews)</p>

            <h2>₹${book.price}</h2>

            <p>${book.description}</p>

            <p class="stock">
                ${book.inStock ? "Available in Stock" : "Out of Stock"}
            </p>

            <button
                class="btn"
                onclick="addToCart(${book.id})"
                ${!book.inStock ? "disabled" : ""}>
                Add to Cart
            </button>

            <br><br>

            <a href="books.html">← Back to Books</a>

        </div>

    `;
}


// Signup functionality

const signupForm = document.getElementById("signup-form");

if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("signup-name").value.trim();

        const email = document.getElementById("signup-email").value.trim().toLowerCase();

        const password = document.getElementById("signup-password").value;

        const confirmPassword = document.getElementById("confirm-password").value;

        const message = document.getElementById("signup-message");

        if (password !== confirmPassword) {

            message.textContent = "Passwords do not match.";

            message.style.color = "red";

            return;
        }

        let users = JSON.parse(localStorage.getItem("bookhiveUsers")) || [];

        const existingUser = users.find(user => user.email === email);

        if (existingUser) {

            message.textContent = "This email is already registered.";

            message.style.color = "red";

            return;
        }

        users.push({
            name: name,
            email: email,
            password: password
        });

        localStorage.setItem("bookhiveUsers", JSON.stringify(users));

        message.textContent = "Account created successfully!";

        message.style.color = "green";

        signupForm.reset();

    });

}


// Login functionality

const loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("login-email").value.trim().toLowerCase();

        const password = document.getElementById("login-password").value;

        const message = document.getElementById("login-message");

        const users = JSON.parse(localStorage.getItem("bookhiveUsers")) || [];

        const user = users.find(item =>
            item.email === email && item.password === password
        );

        if (user) {

            localStorage.setItem("bookhiveLoggedInUser", JSON.stringify({
                name: user.name,
                email: user.email
            }));

            message.textContent = "Login successful! Welcome, " + user.name;

            message.style.color = "green";

        } else {

            message.textContent = "Invalid email or password.";

            message.style.color = "red";

        }

    });

}


// Contact form functionality

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("contact-name").value.trim();

        const message = document.getElementById("contact-status");

        message.textContent =
            "Thank you, " + name + "! Your message has been received in this demo.";

        message.style.color = "green";

        contactForm.reset();

    });

}


// Initialize pages

document.addEventListener("DOMContentLoaded", () => {

    // Featured books

    if (document.getElementById("featured-books")) {

        displayBooks(books.slice(0, 4), "featured-books");

    }

    // All books

    if (document.getElementById("books-container") &&
        typeof filterBooks !== "function") {

        displayBooks(books, "books-container");

    }

    // Book details

    displayBookDetails();

    // Cart count

    if (typeof updateCartCount === "function") {
        updateCartCount();
    }

});