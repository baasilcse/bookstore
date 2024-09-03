// Function to filter books based on category
function filterBooks(category) {
    const books = document.querySelectorAll('.book');
    books.forEach(book => {
        if (category === 'all' || book.getAttribute('data-category') === category) {
            book.style.display = 'block';
        } else {
            book.style.display = 'none';
        }
    });
}

const booksDictionary = {
    "Mahabharata": 99,
    "The Girl with Broken Dreams": 149,
    "Nikola Tesla": 149,
    "Avengers": 199,
    "Spiter Man Venom": 349,
    "Avatar": 159,
    "Futuer Science and Technology": 1449,
    "The Rogue spy": 849,
    "The silent patient": 199,
    "You Only Live Once": 699,
    "Iron Flame": 699,
    "That Night": 539,
    "Tenali Raman": 299,
    "Tenali Raman1": 49,
    "Hanuman": 599,
    "Technology": 999,
    "Days at the Morisaki Bookshop": 999,
    "The Magic of The Lost Temple": 899,
    "Solar Electicity Handbook": 299,
    "Application Development with SAP": 669,
    "Science and Technology": 299,
    "Narayana Guru": 159,
    "Tom and Jerry": 159,
    "Everything Archie": 129,
    "Science and Technology1": 599,
    "A Man Called OVE": 699,
    "You Can": 999,
    "365 Science and Technology Facts": 599,
    "production Technology": 399,
    "Medical Laboratory Technology": 599,
    "Fundamental Of Travel & Tourism": 300,
    "Travel India": 199,
    "Tourism": 699,
    "Time Management": 250,
    "The New Tourist": 350,
    "UPSC": 999,
    "English Language": 765,
    "SAT Guide": 599,
    "English Core": 500,
    "Plant Physiology": 599
};


// Function to add books to the cart
function addToCart(title) {
    const price = booksDictionary[title];
    if (price === undefined) {
        console.error("Book not found in dictionary");
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const bookIndex = cart.findIndex(book => book.title === title);

    if (bookIndex !== -1) {
        cart[bookIndex].quantity += 1;
    } else {
        cart.push({ title, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Function to decrease the quantity of a book in the cart
function decreaseQuantity(title) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const bookIndex = cart.findIndex(book => book.title === title);

    if (bookIndex !== -1) {
        cart[bookIndex].quantity -= 1;
        if (cart[bookIndex].quantity === 0) {
            cart.splice(bookIndex, 1);  // Remove item if quantity is zero
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}

// Function to increase the quantity of a book in the cart
function increaseQuantity(title) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const bookIndex = cart.findIndex(book => book.title === title);

    if (bookIndex !== -1) {
        cart[bookIndex].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}

// Function to update the cart display
function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(book => {
        total += book.price * book.quantity;
        const bookItem = document.createElement('div');
        bookItem.className = 'cart-item';
        bookItem.innerHTML = `
            ${book.title} => ₹${book.price} x ${book.quantity}
            <button onclick="decreaseQuantity('${book.title}')">-</button>
            <button onclick="increaseQuantity('${book.title}')">+</button>
        `;
        cartItemsContainer.appendChild(bookItem);
    });

    totalPriceElement.textContent = `Total: ₹${total.toFixed(2)}`;
}

// Function to clear the entire cart
function clearCart() {
    localStorage.removeItem('cart');
    updateCart();
}

// Function to show a specific tab
function showTab(tabId) {
    document.querySelector('.shop').style.display = tabId === 'shop' ? 'block' : 'none';
    document.querySelector('.orders').style.display = tabId === 'orders' ? 'block' : 'none';
}

// Function to place an order
function placeOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) return;

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderDate = new Date().toLocaleDateString();
    orders.push({ date: orderDate, items: cart });

    localStorage.setItem('orders', JSON.stringify(orders));
    clearCart();
    updateOrders();
}

// Function to update the orders display
function updateOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderItemsContainer = document.getElementById('order-items');

    orderItemsContainer.innerHTML = '';

    orders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `<strong>Date:</strong> ${order.date}<br>`;
        
        order.items.forEach(item => {
            orderItem.innerHTML += `${item.title} - ₹${item.price.toFixed(2)} x ${item.quantity}<br>`;
        });

        orderItemsContainer.appendChild(orderItem);
    });
}

// Initialize the cart and orders display on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
    updateOrders();
});

// Smooth scroll to the contact section
document.getElementById('contact').addEventListener('click', function() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
});
