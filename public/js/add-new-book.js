document.getElementById('addBookForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const bookName = document.getElementById('bookName').value;
  const authorName = document.getElementById('authorName').value;
  const genre = document.getElementById('genre').value;
  const resultBox = document.getElementById('result');

  try {
    const res = await fetch('/add-new-book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ bookName, authorName, genre })
    });

    const data = await res.json();

    if (data.success) {
      resultBox.innerHTML = `
        ✅ ${data.message}<br>
        📚 <strong>Book ID:</strong> <code>${data.book._id}</code>
      `;
    } else {
      resultBox.textContent = data.error || 'Something went wrong.';
    }
  } catch (err) {
    resultBox.textContent = '❌ Error while adding the book.';
  }
});
