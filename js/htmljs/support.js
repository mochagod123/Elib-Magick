document.getElementById('supportserver').addEventListener('click', function() {
    window.location.href = 'https://discord.gg/2FZt79WAHr';
});

document.getElementById('downloadso').addEventListener('click', function() {
    window.location.href = 'https://github.com/mochagod123/Elib-Magick';
});

document.getElementById('update').addEventListener('click', function() {
    window.location.href = chrome.runtime.getURL("html/update.html");
});

document.getElementById('dokujiplugin').addEventListener('click', function() {
    window.location.href = chrome.runtime.getURL("html/debug.html");
});