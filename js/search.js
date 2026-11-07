function filterBooks() {

    const searchInput = document.getElementById("search-input");
    const categoryFilter = document.getElementById("category-filter");
    const sortFilter = document.getElementById("sort-filter");

    if (!searchInput || !categoryFilter || !sortFilter) {
        return;
    }

    const searchValue = searchInput.value.toLowerCase();

    const selectedCategory = categoryFilter.value;

    const selectedSort = sortFilter.value;

    let filteredBooks = books.filter(book => {

        const matchesSearch =
            book.title.toLowerCase().includes(searchValue) ||
            book.author.toLowerCase().includes(searchValue);

        const matchesCategory =
            selectedCategory === "All" ||
            book.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });


    // Sort by price

    if (selectedSort === "low") {
        filteredBooks.sort((a, b) => a.price - b.price);
    }

    else if (selectedSort === "high") {
        filteredBooks.sort((a, b) => b.price - a.price);
    }

    else if (selectedSort === "rating") {
        filteredBooks.sort((a, b) => b.rating - a.rating);
    }


    displayBooks(filteredBooks, "books-container");


    document.getElementById("result-count").textContent =
        `${filteredBooks.length} books found`;
}


document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("search-input");

    const categoryFilter = document.getElementById("category-filter");

    const sortFilter = document.getElementById("sort-filter");

    if (!searchInput) return;


    // Read category from URL

    const params = new URLSearchParams(window.location.search);

    const category = params.get("category");

    if (category && [...categoryFilter.options].some(option => option.value === category)) {
        categoryFilter.value = category;
    }


    searchInput.addEventListener("input", filterBooks);

    categoryFilter.addEventListener("change", filterBooks);

    sortFilter.addEventListener("change", filterBooks);

    filterBooks();

});