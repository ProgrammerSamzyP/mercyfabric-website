document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartUI();

    // Add to Cart Button Click Event
    document.querySelectorAll(".product-card button").forEach(button => {
        button.addEventListener("click", function () {
            const productCard = this.closest(".product-card");
            const productName = productCard.querySelector("h3").textContent;
            const productPrice = parseFloat(productCard.querySelector("p").textContent.replace("$", ""));
            const productImage = productCard.querySelector("img").src;

            addToCart(productName, productPrice, productImage);
        });
    });

    function addToCart(name, price, image) {
        const existingProduct = cart.find(item => item.name === name);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name, price, image, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
    }

    function updateCartUI() {
        const cartCount = document.querySelector(".cart-icon");
        const cartList = document.querySelector(".cart-items");
        const cartTotal = document.querySelector(".cart-total");

        let totalItems = 0;
        let totalPrice = 0;
        cartList.innerHTML = "";

        cart.forEach(item => {
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                    <button class="remove-btn" data-name="${item.name}">Remove</button>
                </div>
            `;
            cartList.appendChild(cartItem);
        });

        cartCount.innerHTML = `<box-icon name='cart'></box-icon> (${totalItems})`;
        cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;

        // Remove Item Event
        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function () {
                removeFromCart(this.dataset.name);
            });
        });
    }

    function removeFromCart(name) {
        const index = cart.findIndex(item => item.name === name);
        if (index !== -1) {
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartUI();
        }
    }
});
