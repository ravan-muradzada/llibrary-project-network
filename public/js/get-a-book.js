document.getElementById('findBookForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const bookId = document.getElementById('bookId').value.trim();
    const resultBox = document.getElementById('bookDetails');
    resultBox.innerHTML = '';
  
    if (!bookId) {
      resultBox.textContent = 'Please enter a Book ID.';
      return;
    }
  
    try {
      const res = await fetch(`/get-a-book/${bookId}`);
      const data = await res.json();
  
      if (!data.success) {
        resultBox.textContent = data.message || 'Book not found.';
        return;
      }
  
      const { bookName, authorName, genre } = data.book;
  
      resultBox.innerHTML = `
        <strong>📖 ${bookName}</strong><br/>
        ✍️ ${authorName}<br/>
        🎭 ${genre}
      `;
    } catch (err) {
      resultBox.textContent = 'Something went wrong.';
    }
  });
  