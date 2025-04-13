// Add interactivity to the cart button
const buttons = document.querySelectorAll('.product-card button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Product added to cart!');
    });
});

