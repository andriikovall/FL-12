const rootElement = document.getElementById('root');

window.onhashchange = (event) => {
    const newHash = event.newURL.split('#')[1] || '';    
}
