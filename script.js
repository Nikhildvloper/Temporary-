// Fetch and render apps from the selected section's JSON file
fetch('./apps.json')
  .then(response => {
    if (!response.ok) throw new Error('Failed to load apps.json');
    return response.json();
  })
  .then(data => renderAppSections(data.sections))
  .catch(error => console.error('Error:', error));

// Render app sections dynamically
function renderAppSections(sections) {
  const appSections = document.getElementById('app-sections');

  // Clear existing sections before rendering new ones
  appSections.innerHTML = '';

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

    // Add apps
    section.apps.forEach(app => {
      const appDiv = document.createElement('div');
      appDiv.classList.add('app');

      // Add app icon (from icons directory)
      const img = document.createElement('img');
      img.src = `icon/${app.name}.png`; // Directly using app name from JSON
      img.alt = `${app.name} icon`;
      img.classList.add('app-icon');
      img.addEventListener('click', () => openAppPage(app.name)); // Add click event to icon

      // Add app name
      const appName = document.createElement('p');
      appName.textContent = app.name;
      appName.addEventListener('click', () => openAppPage(app.name)); // Add click event to app name

      // Add click event to the app border
      appDiv.addEventListener('click', () => openAppPage(app.name)); // Add click event to app div

      appDiv.appendChild(img);
      appDiv.appendChild(appName);
      scrollableContainer.appendChild(appDiv);
    });

    sectionDiv.appendChild(scrollableContainer);
    appSections.appendChild(sectionDiv);
  });
}

// Open app page function
function openAppPage(appName) {
  // Redirect to app page in the apps folder
  window.location.href = `apps/${appName}.html`;
}

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

// Set default active section to Apps and handle section selection
window.addEventListener('DOMContentLoaded', () => {
  // Set default active section as Apps
  setActiveSection('apps-nav');

  // Add event listeners to navigation items
  document.getElementById('apps-nav').addEventListener('click', () => {
    setActiveSection('apps-nav');
    loadAppsFromSection('apps');
  });
  document.getElementById('games-nav').addEventListener('click', () => {
    setActiveSection('games-nav');
    loadAppsFromSection('games');
  });
  document.getElementById('tools-nav').addEventListener('click', () => {
    setActiveSection('tools-nav');
    loadAppsFromSection('tools');
  });
});

// Function to set the active section
function setActiveSection(sectionId) {
  // Remove active class from all sections
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  // Add active class to the clicked section
  const activeNavItem = document.getElementById(sectionId);
  activeNavItem.classList.add('active');
}

// Function to load apps from the corresponding JSON based on the selected section
function loadAppsFromSection(section) {
  fetch(`./${section}.json`)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${section}.json`);
      return response.json();
    })
    .then(data => renderAppSections(data.sections))
    .catch(error => console.error('Error:', error));
}
// Focus on the search bar when clicked
document.getElementById('search-bar').addEventListener('click', function() {
  this.focus(); // Focus the input when it's clicked
});

// Search functionality: Store the search term and redirect to search page
document.getElementById('search-bar').addEventListener('keydown', function(event) {
  // When 'Enter' is pressed
  if (event.key === 'Enter') {
    const searchTerm = event.target.value.trim();  // Get the search term
    if (searchTerm) {
      // Store the search term in local storage
      localStorage.setItem('searchTerm', searchTerm);

      // Redirect to search.html page
      window.location.href = 'search.html';
    }
  }
});

// Remove the cursor when the user navigates back (or goes back in history)
window.addEventListener('popstate', function() {
  document.getElementById('search-bar').blur();  // Remove focus from the search bar
});
