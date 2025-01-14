// Retrieve search term from local storage
const searchTerm = localStorage.getItem('searchTerm');

// Display the search term
document.getElementById('search-term').textContent = `You searched for: ${searchTerm}`;

// You can now use this searchTerm to filter or display actual results dynamically
