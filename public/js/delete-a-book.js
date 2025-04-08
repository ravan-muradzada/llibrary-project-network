document.getElementById('deleteBookForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const bookId = document.getElementById('bookId').value.trim();
  const resultBox = document.getElementById('deleteResult');

  if (!bookId) {
    resultBox.textContent = 'Book ID is required.';
    return;
  }

  try {
    const res = await fetch(`/delete-a-book/${bookId}`, {
      method: 'DELETE'
    });

    const data = await res.json();
    resultBox.textContent = data.message || 'Book deleted.';

    document.getElementById('bookId').value = '';
  } catch (err) {
    resultBox.textContent = 'Something went wrong while deleting.';
    
    document.getElementById('bookId').value = '';
  }
});
