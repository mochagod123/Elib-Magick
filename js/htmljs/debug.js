document.getElementById('debugbutton').addEventListener('click', function() {
    window.location.href = chrome.runtime.getURL("html/template.html");
});

document.getElementById('downloadso').addEventListener('click', function() {
    window.open('https://github.com/mochagod123/Elib-Magick/archive/refs/heads/main.zip')
});