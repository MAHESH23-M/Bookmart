document.addEventListener("DOMContentLoaded", () => {
  console.log("Wishlist loaded successfully");
  loadWishlist();
});

function loadWishlist() {
  const container = document.getElementById("wishlistContainer");

  if (!container) return;

  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

  container.innerHTML = "";

  if (wishlist.length === 0) {
    container.innerHTML = `<div class="empty">Your wishlist is empty 💔</div>`;
    return;
  }

  wishlist.forEach((item, index) => {
    if (!item) return;

    const card = document.createElement("div");
    card.className = "card";

   card.innerHTML = `
  <img src="${item.image}" alt="${item.title}">
  <div class="details">
    <div class="title">${item.title}</div>
    <div class="author">by ${item.author}</div>
    <div class="price">INR ${item.price}</div>
    <div class="description">
      ${item.description || "No description available."}
    </div>
    <div class="btn-group">
      <button class="move">Move to Cart</button>
      <button class="remove">Remove</button>
    </div>
  </div>
`;

    // Add event listeners properly
    card.querySelector(".remove").addEventListener("click", () => {
      removeFromWishlist(index);
    });

    card.querySelector(".move").addEventListener("click", () => {
      moveToCart(index);
    });

    container.appendChild(card);
  });
}

function removeFromWishlist(index) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

  if (index < 0 || index >= wishlist.length) return;

  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  loadWishlist();
}

function moveToCart(index) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (index < 0 || index >= wishlist.length) return;

  const item = wishlist[index];

  const exists = cart.find(i => i.id === item.id);

  if (!exists) {
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  alert("Moved to Cart 🛒");
  loadWishlist();
}