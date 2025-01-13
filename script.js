// Fetch and render data from JSON
function fetchAndRenderData(jsonFile, containerId, folder) {
  fetch(jsonFile)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${jsonFile}`);
      return response.json();
    })
    .then(data => renderSections(data.sections, containerId, folder))
    .catch(error => console.error('Error:', error));
}

// Render sections dynamically
function renderSections(sections, containerId, folder) {
  const container = document.getElementById(containerId);
  container.innerHTML = ''; // Clear previous content

  sections.forEach(section => {
    // Create section container
    const sectionDiv = document.createElement('div');
    sectionDiv.classList.add('section');

    // Add section title
    const title = document.createElement('h2');
    title.textContent = section.title;
    sectionDiv.appendChild(title);

    // Add scrollable container
    const scrollableContainer = document.createElement('div');
    scrollableContainer.classList.add('scrollable-container');

    // Add items
    section.items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('app'); // Using "app" class for styling

      // Add item icon (from icons directory)
      const img = document.createElement('img');
      img.src = `icon/${item.name}.png`; // Directly using item name from JSON
      img.alt = `${item.name} icon`;
      img.classList.add('app-icon');
      img.addEventListener('click', () => openItemPage(folder, item.name)); // Add click event to icon

      // Add item name
      const itemName = document.createElement('p');
      itemName.textContent = item.name;
      itemName.addEventListener('click', () => openItemPage(folder, item.name)); // Add click event to name

      // Add click event to the item border
      itemDiv.addEventListener('click', () => openItemPage(folder, item.name)); // Add click event to item div

      itemDiv.appendChild(img);
      itemDiv.appendChild(itemName);
      scrollableContainer.appendChild(itemDiv);
    });

    sectionDiv.appendChild(scrollableContainer);
    container.appendChild(sectionDiv);
  });
}

// Open item page function
function openItemPage(folder, itemName) {
  // Redirect to item page
  window.location.href = `${folder}/${itemName}.html`;
}

// Load apps by default
fetchAndRenderData('./applications.json', 'app-sections', 'apps');

// Navigation bar click handling
document.querySelectorAll('.nav-item').forEach(navItem => {
  navItem.addEventListener('click', (event) => {
    const navText = navItem.querySelector('span').textContent;

    if (navText === 'Apps') {
      fetchAndRenderData('./applications.json', 'app-sections', 'apps');
    } else if (navText === 'Games') {
      fetchAndRenderData('./games.json', 'app-sections', 'games');
    }
  });
});

// Disable text selection and clicks triggering search popups
document.addEventListener('mousedown', (event) => {
  // Prevent triggering actions on text clicks
  if (event.detail > 0) {
    event.preventDefault();
  }
});

document.addEventListener('contextmenu', (event) => {
  // Prevent right-click menu on text
  event.preventDefault();
});
