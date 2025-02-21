let cart = [];
const counterSpanEl = document.querySelector(".plus-and-minus span");
const profileSpanEl = document.querySelector(".profile-span");
const plusButtonEl = document.querySelector(".plus");
const minusButtonEl = document.querySelector(".minus");
const mainImageEl = document.querySelector(".Product-images > img");
const productImagesEl = document.querySelectorAll(".Product-image-list img");
const addToCartButtonEl = document.querySelector("button");
const cartContainerEl = document.getElementById("cart");
const cartIconEl = document.querySelector(".cart-icon");
const menuEl = document.querySelector(".menu");
const navListEl = document.querySelector(".navbar-list");
const overlayEl = document.querySelector(".overlay");

let count = 0;

// Toggle cart visibility when clicking the cart icon
cartIconEl.addEventListener("click", () => {
  cartContainerEl.style.display =
    cartContainerEl.style.display === "none" ? "block" : "none";
});

// Function to update the counter display
function updateCounter() {
  counterSpanEl.textContent = count;
}

// Function to update the profile cart count
function updateProfileCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  profileSpanEl.textContent = totalItems;
  profileSpanEl.style.display = totalItems > 0 ? "inline-block" : "none";
}

// Event listener for clicking images in the list
productImagesEl.forEach((image) => {
  image.addEventListener("click", () => {
    mainImageEl.src = image.src; // Replace main image
    count = 1; // Reset count when selecting a new product
    updateCounter();
  });
});

// Increment counter when clicking plus button
plusButtonEl.addEventListener("click", () => {
  count++;
  updateCounter();
});

// Decrement counter when clicking minus button, preventing negative values
minusButtonEl.addEventListener("click", () => {
  if (count > 1) {
    count--;
    updateCounter();
  }
});

// Function to update cart
function updateCart() {
  if (count > 0) {
    const productSrc = mainImageEl.src;
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
    updateProfileCartCount(); // Update profile count
    count = 0; // Reset count after adding to cart
    updateCounter();
  }
}

// Function to render cart UI
function renderCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = `<h3>Cart</h3><p>Your cart is empty.</p>`;
    updateProfileCartCount();
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
  cartContainerEl.innerHTML = cartHTML;

  // Add event listeners to delete buttons
  document.querySelectorAll(".delete-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      cart.splice(index, 1);
      renderCart();
      updateProfileCartCount(); // Update profile count when removing an item
    });
  });

  // Add event listener to checkout button
  document.querySelector(".checkout-btn").addEventListener("click", () => {
    cartContainerEl.innerHTML = `<h3>Cart</h3><p style="text-align:center; font-weight:bold;">Thanks for shopping with us!</p>`;
    cart = []; // Clear the cart after checkout
    updateProfileCartCount(); // Reset profile count
  });
}

// Add event listener to "Add to Cart" button
addToCartButtonEl.addEventListener("click", updateCart);

menuEl.addEventListener("click", () => {
  navListEl.classList.toggle("active");
  overlayEl.classList.toggle("show");
});
