const input = document.getElementById('searchInput');
const resultsContainer = document.getElementById('searchResults');

input.addEventListener('input', () => {
  const query = input.value.toLowerCase().trim();
  resultsContainer.innerHTML = '';

  if (!query) return;

  const results = posts.filter(post =>
    post.title.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    resultsContainer.innerHTML = '<p>No results found.</p>';
    return;
  }

  results.forEach(post => {
    const div = document.createElement('div');
    div.style.marginBottom = '1.5rem';

    div.innerHTML = `
      <h3>
        <a href="${post.url}">${post.title}</a>
      </h3>
      <p>${post.text}</p>
    `;

    resultsContainer.appendChild(div);
  });
});
