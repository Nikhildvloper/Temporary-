// Fetch and render apps from applications.json
fetch('./applications.json')
  .then(response => {
    if (!response.ok) throw new Error('Failed to load applications.json');
    return response.json();
  })
  .then(data => renderAppSections(data.sections))
  .catch(error => console.error('Error:', error));

// Render app sections dynamically
function renderAppSections(sections) {
  const appSections = document.getElementById('app-sections');

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
      img.src = `icon/${app.name}.png`;  // Directly using app name from JSON
      img.alt = `${app.name} icon`;
      img.classList.add('app-icon');

      // Add app name
      const appName = document.createElement('p');
      appName.textContent = app.name;

      appDiv.appendChild(img);
      appDiv.appendChild(appName);
      scrollableContainer.appendChild(appDiv);
    });

    sectionDiv.appendChild(scrollableContainer);
    appSections.appendChild(sectionDiv);
  });
}
