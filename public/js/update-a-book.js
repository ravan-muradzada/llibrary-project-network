document.getElementById('updateBookForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const bookId = document.getElementById('bookId').value.trim();
    const bookName = document.getElementById('bookName').value.trim();
    const authorName = document.getElementById('authorName').value.trim();
    const genre = document.getElementById('genre').value.trim();
    const resultBox = document.getElementById('updateResult');
  
    if (!bookId) {
      resultBox.textContent = 'Book ID is required.';
      return;
    }
  
    const payload = {};
    if (bookName) payload.bookName = bookName;
    if (authorName) payload.authorName = authorName;
    if (genre) payload.genre = genre;
  
    if (Object.keys(payload).length === 0) {
      resultBox.textContent = 'Please provide at least one field to update.';
      return;
    }
  
    try {
      const res = await fetch(`/update-a-book/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      const data = await res.json();
      resultBox.textContent = data.message || 'Update complete.';
    } catch (err) {
      resultBox.textContent = 'Something went wrong while updating.';
    }
  });
  