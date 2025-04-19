const originalShowNotification = showNotification;
  
showNotification = function(message, title = "お知らせ") {
    $('#modal-layer').fadeIn();
    $('#modal-notification').fadeIn();
    $('#modal-notification-message').html(message);
    document.getElementsByClassName("modal-window")[1].getElementsByTagName("h3")[0].textContent = title;
}