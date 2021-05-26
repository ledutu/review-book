$(function () {
    "use strict"

    var closeNotificationMessage = $(".close-notification-message");
    var notificationText = $('.notification-text');

    closeNotificationMessage.on('click', function (event) {
        event.preventDefault();
        setTimeout(function () {
            $('.notification-overlay').removeClass("openform");
        }, 100);
    });


    if (notificationText.html().trim()) {
        setTimeout(function () {
            $('.notification-overlay').addClass("openform");
        }, 100);
    } else {
        notificationText.empty();
    }

})