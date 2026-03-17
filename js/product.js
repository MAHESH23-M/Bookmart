

// ===============================
// GET PRODUCT ID FROM URL
// ===============================
const related = document.getElementById("relatedProducts");
// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const source = urlParams.get("source") || "books";

let currentBook = null;

if (!id) {
  alert("Invalid product link");
  window.location.href = "index.html";
}

// Load product
db.collection(source).doc(id).get().then((doc) => {
  if (doc.exists) {
    const book = doc.data();
    currentBook = { id: doc.id, ...book };

    loadProductData(currentBook);

    if (book.category) {
      loadRelatedBooks(book.category);
    }
  } else {
    alert("Book not found");
  }
});


// Load product data into HTML
function loadProductData(book) {
  document.getElementById("bookTitle").innerText = book.title || "Untitled";
  document.getElementById("bookAuthor").innerText = "by " + (book.author || "Unknown");
  document.getElementById("bookPrice").innerText = book.price || 0;
  document.getElementById("oldPrice").innerText = (book.price * 1.2).toFixed(0);
  document.getElementById("bookDesc").innerText = book.description || "No description available.";

document.getElementById("bookImage").src =
  book.image || "images/default-book.jpg";
}


// Load related books
function loadRelatedBooks(category) {

  if (!category) {
    console.log("No category found for related books.");
    return;
  }

  const related = document.getElementById("relatedProducts");
  related.innerHTML = "Loading related books...";

  db.collection("books")
    .where("category", "==", category)
    .limit(6)
    .get()
    .then(snapshot => {

      related.innerHTML = "";

      if (snapshot.empty) {
        related.innerHTML = "<p>No related books found.</p>";
        return;
      }

      snapshot.forEach(doc => {

        if (doc.id === currentBook.id) return; // skip same book

        const data = doc.data();

        related.innerHTML += `
          <div class="related-card"
               onclick="window.location.href='product.html?id=${doc.id}&source=books'">
            <img src="${data.image || 'images/default-book.jpg'}">
            <div>${data.title}</div>
            <div>₹${data.price}</div>
          </div>
        `;
      });

    })
    .catch(error => {
      console.error("Related books error:", error);
    });
}
// ===============================
// QUANTITY
// ===============================
function increaseQty() {
  quantity++;
  document.getElementById("quantity").innerText = quantity;
}

function decreaseQty() {
  if (quantity > 1) {
    quantity--;
    document.getElementById("quantity").innerText = quantity;
  }
}

// ===============================
// ADD TO CART
// ===============================
function addToCart() {

  if (!currentBook) {
    alert("Book not loaded yet.");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const existingItem = cart.find(item => item.id === currentBook.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: currentBook.id,
      title: currentBook.title,
      author: currentBook.author,
      price: currentBook.price,
      image: currentBook.image,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to Cart 🛒");
}

  

// ===============================
// BUY NOW
// ===============================
window.buyNow = function() {

  if (!currentBook) {
    alert("Book not loaded yet.");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const existingItem = cart.find(item => item.id === currentBook.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: currentBook.id,
      title: currentBook.title,
      author: currentBook.author,
      price: currentBook.price,
      image: currentBook.image,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  window.location.href = "cart.html";
};
function addToWishlist() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

  const book = {
    id: currentBook.id,
    title: currentBook.title,
    author: currentBook.author,
    price: currentBook.price,
    image: currentBook.image
  };

  const exists = wishlist.find(item => item.id === book.id);

  if (exists) {
    alert("Already in wishlist ❤️");
    return;
  }

  wishlist.push(book);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  alert("Added to wishlist ❤️");
}



