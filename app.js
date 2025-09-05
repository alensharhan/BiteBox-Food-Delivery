document.addEventListener("DOMContentLoaded", function () {
  const slides = [
    {
      // The 'background' property has been removed.
      subtitle: "FRESH & HEALTHY",
      title: "The Best Healthy Chicken Salad",
      image: "assets/hero-section/chicken-salad.png",
    },
    {
      subtitle: "HOT & SPICY",
      title: "Amazing Wood-Fired Pizza",
      image: "assets/hero-section/pizza.png",
    },
    {
      subtitle: "SWEET & TASTY",
      title: "Unforgettable Homemade Pancakes",
      image: "assets/hero-section/pancake.png",
    },
  ];

  const prevButton = document.getElementById("prevBtn");
  const nextButton = document.getElementById("nextBtn");

  const slideSubtitle = document.getElementById("slide-subtitle");
  const slideTitle = document.getElementById("slide-title");
  const slideImage = document.getElementById("slide-image");
  const heroContent = document.querySelector(".hero-content");

  let currentSlideIndex = 0;

  function updateSlide() {
    const currentSlide = slides[currentSlideIndex];

    slideSubtitle.textContent = currentSlide.subtitle;
    slideTitle.textContent = currentSlide.title;
    slideImage.src = currentSlide.image;

    heroContent.classList.remove("fade-in");
    void heroContent.offsetWidth;
    heroContent.classList.add("fade-in");
  }

  nextButton.addEventListener("click", function () {
    currentSlideIndex = currentSlideIndex + 1;
    if (currentSlideIndex >= slides.length) {
      currentSlideIndex = 0;
    }
    updateSlide();
  });

  prevButton.addEventListener("click", function () {
    currentSlideIndex = currentSlideIndex - 1;
    if (currentSlideIndex < 0) {
      currentSlideIndex = slides.length - 1;
    }
    updateSlide();
  });

  updateSlide();
});

// Hamburger Menu Logic

const hamburgerMenu = document.getElementById("hamburger-menu");
const navLinks = document.getElementById("nav-links");

hamburgerMenu.addEventListener("click", function () {
  navLinks.classList.toggle("active");
});

// =================================== //
// SHOPPING CART LOGIC //
// =================================== //

// 1. SELECT ELEMENTS (remains the same)
const cartIcon = document.getElementById("cart-icon");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartOverlay = document.getElementById("cart-overlay");
const cartButtonContainers = document.querySelectorAll(
  ".cart-button-container"
);
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartCountEl = document.getElementById("cart-count");

// 2. STATE (remains the same)
let cart = [];

// 3. EVENT LISTENERS (simplified for clarity)

// Open/close the cart
cartIcon.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// Listen for clicks on the buttons on the main page product cards
cartButtonContainers.forEach((container) => {
  container.addEventListener("click", (e) => {
    // Find the product ID from the parent card
    const productCard = e.target.closest(".product-card");
    const productId = productCard.dataset.id;

    // Check if the initial "add to cart" icon was clicked
    if (e.target.closest(".add-cart-icon")) {
      handleCartAction(productId, "add");
    }

    // Check if a "+/-" button was clicked
    if (e.target.closest(".quantity-btn")) {
      const action = e.target.dataset.action;
      handleCartAction(productId, action);
    }
  });
});

// Listen for clicks on the buttons INSIDE the cart sidebar
cartItemsContainer.addEventListener("click", (e) => {
  // Check if a button was clicked
  if (e.target.matches("button")) {
    const productId = e.target.dataset.id;
    const action = e.target.dataset.action;
    handleCartAction(productId, action);
  }
});

// 4. FUNCTIONS (Refactored to be more robust)

function openCart() {
  cartSidebar.classList.add("active");
  cartOverlay.classList.add("active");
}

function closeCart() {
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
}

// THIS IS THE NEW "MASTER" FUNCTION. All clicks lead here.
function handleCartAction(productId, action) {
  // Find the item we need to change in our cart data
  let item = cart.find((i) => i.id === productId);

  if (action === "add") {
    if (item) {
      item.quantity++;
    } else {
      // If the item is new, we need to get its info from the product card on the page
      const productCard = document.querySelector(
        `.product-card[data-id='${productId}']`
      );
      const productData = productCard.dataset;
      cart.push({
        id: productId,
        name: productData.name,
        price: parseFloat(productData.price),
        image: productData.image,
        quantity: 1,
      });
    }
  } else if (action === "increase") {
    if (item) item.quantity++;
  } else if (action === "decrease") {
    if (item) {
      item.quantity--;
      // If the quantity drops to 0, remove the item from the cart array
      if (item.quantity <= 0) {
        cart = cart.filter((i) => i.id !== productId);
      }
    }
  } else if (action === "remove") {
    // Remove the item from the cart array completely
    cart = cart.filter((i) => i.id !== productId);
  }

  // THE MOST IMPORTANT STEP: After ANY change to the data, update ALL visuals.
  updateAllUI();
}

// This is our "master visual update" function.
function updateAllUI() {
  renderCartSidebar(); // Redraw the items in the sidebar
  updateProductCardsUI(); // Update the buttons on the main page
  updateCartInfo(); // Update the total price and header icon count
}

// This function's only job is to draw the items in the sidebar.
function renderCartSidebar() {
  cartItemsContainer.innerHTML = "";
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  cart.forEach((item) => {
    const cartItemEl = document.createElement("div");
    cartItemEl.classList.add("cart-item");
    cartItemEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p class="price">$${item.price.toFixed(2)}</p>
      </div>
      <div class="cart-item-actions">
        <button class="quantity-btn" data-id="${
          item.id
        }" data-action="decrease">-</button>
        <span>${item.quantity}</span>
        <button class="quantity-btn" data-id="${
          item.id
        }" data-action="increase">+</button>
        <button class="remove-btn" data-id="${
          item.id
        }" data-action="remove">&times;</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItemEl);
  });
}

// This function's only job is to update the buttons on the product cards.
function updateProductCardsUI() {
  const allProductCards = document.querySelectorAll(".product-card");
  allProductCards.forEach((card) => {
    const productId = card.dataset.id;
    const itemInCart = cart.find((item) => item.id === productId);

    if (itemInCart) {
      card.classList.add("in-cart");
      const quantityDisplay = card.querySelector(".quantity-display");
      quantityDisplay.textContent = itemInCart.quantity;
    } else {
      card.classList.remove("in-cart");
    }
  });
}

// This function's only job is to update the totals and header icon.
function updateCartInfo() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotalEl.textContent = `$${total.toFixed(2)}`;
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = count;
}
