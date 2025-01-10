function searchApp() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const apps = document.querySelectorAll('.app-card');
    apps.forEach(app => {
        const appName = app.querySelector('h3').textContent.toLowerCase();
        if (appName.includes(query)) {
            app.style.display = 'block';
        } else {
            app.style.display = 'none';
        }
    });
}
