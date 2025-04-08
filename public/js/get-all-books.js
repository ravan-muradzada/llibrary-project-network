document.addEventListener('DOMContentLoaded', async () => {
  const booksList = document.getElementById('booksList');

  try {
    const res = await fetch('/get-all-books');
    const data = await res.json();

    if (data.success && data.books.length > 0) {
      booksList.innerHTML = data.books.map(book => `
        <div class="book">
          <p class="book-id">🆔 <code>${book._id}</code></p>
          <h2>${book.bookName}</h2>
          <p><strong>Author:</strong> ${book.authorName}</p>
          <p><strong>Genre:</strong> ${book.genre}</p>
        </div>
      `).join('');
    } else {
      booksList.innerHTML = `<p>No books found.</p>`;
    }
  } catch (err) {
    booksList.innerHTML = `<p>❌ Failed to fetch books.</p>`;
  }
});
