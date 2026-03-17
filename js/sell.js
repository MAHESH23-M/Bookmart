document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("sellForm");
  const preview = document.getElementById("preview");
  const imageInput = document.querySelector("input[name='image']");

  imageInput.addEventListener("input", () => {
    const url = imageInput.value.trim();

    if (url) {
      preview.src = url;
      preview.style.display = "block";
    } else {
      preview.style.display = "none";
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      await db.collection("books").add({
        title: form.title.value.trim(),
        author: form.author.value.trim(),
        price: Number(form.price.value),
        stock: Number(form.stock.value),
        category: form.category.value,
        condition: form.condition.value,
        description: form.description.value.trim(),
        image: form.image.value.trim(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      alert("Book Published Successfully!");
      form.reset();
      preview.style.display = "none";

    } catch (error) {
      console.error(error);
      alert("Error publishing book");
    }
  });

});