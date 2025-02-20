document.addEventListener("DOMContentLoaded", () => {
  let cart = []; // Store cart items
  const counterSpan = document.querySelector(".plus-and-minus span");
  const plusButton = document.querySelector(".plus");
  const minusButton = document.querySelector(".minus");
  const mainImage = document.querySelector(".Product-images > img");
  const productImages = document.querySelectorAll(".Product-image-list img");
  const addToCartButton = document.querySelector("button");
  const cartContainer = document.getElementById("cart");
  const cartIcon = document.querySelector(".cart-icon");

  let count = 0; // Track quantity for selected product

  // Toggle cart visibility when clicking the cart icon
  cartIcon.addEventListener("click", () => {
    cartContainer.style.display =
      cartContainer.style.display === "none" ? "block" : "none";
  });

  // Function to update the counter display
  function updateCounter() {
    counterSpan.textContent = count;
  }

  // Event listener for clicking images in the list
  productImages.forEach((image) => {
    image.addEventListener("click", () => {
      mainImage.src = image.src; // Replace main image
      count = 1; // Reset count when selecting a new product
      updateCounter();
    });
  });

  // Increment counter when clicking plus button
  plusButton.addEventListener("click", () => {
    count++;
    updateCounter();
  });

  // Decrement counter when clicking minus button, preventing negative values
  minusButton.addEventListener("click", () => {
    if (count > 1) {
      count--;
      updateCounter();
    }
  });

  // Function to update cart
  function updateCart() {
    if (count > 0) {
      const productSrc = mainImage.src;
      const productName = "Fall Limited Edition Sneakers";
      const productPrice = 125.0;
      const existingProduct = cart.find((item) => item.src === productSrc);

      if (existingProduct) {
        existingProduct.quantity += count;
      } else {
        cart.push({
          src: productSrc,
          name: productName,
          price: productPrice,
          quantity: count,
        });
      }

      renderCart();
      count = 0; // Reset count after adding to cart
      updateCounter();
    }
  }

  // Function to render cart UI
  function renderCart() {
    if (cart.length === 0) {
      cartContainer.innerHTML = `<h3>Cart</h3><p>Your cart is empty.</p>`;
      return;
    }

    let cartHTML = `<h3>Cart</h3>`;

    cart.forEach((item, index) => {
      const totalPrice = (item.price * item.quantity).toFixed(2);
      cartHTML += `
                  <div class="cart-item">
                      <img src="${
                        item.src
                      }" alt="Product" width="50" height="50">
                      <div class="cart-details">
                          <p>${item.name}</p>
                          <p>$${item.price.toFixed(2)} x ${
        item.quantity
      } <strong>$${totalPrice}</strong></p>
                      </div>
                      <img class="delete-cart" data-index="${index}" src="./img/icon-delete.svg" alt="Delete" width="20" height="20">
                  </div>
              `;
    });

    cartHTML += `<button class="checkout-btn">Checkout</button>`;
    cartContainer.innerHTML = cartHTML;

    // Add event listeners to delete buttons
    document.querySelectorAll(".delete-cart").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        cart.splice(index, 1);
        renderCart();
      });
    });

    // Add event listener to checkout button
    document.querySelector(".checkout-btn").addEventListener("click", () => {
      cartContainer.innerHTML = `<h3>Cart</h3><p style="text-align:center; font-weight:bold;">Thanks for shopping with us!</p>`;
      cart = []; // Clear the cart after checkout
    });
  }

  // Add event listener to "Add to Cart" button
  addToCartButton.addEventListener("click", updateCart);
});
