$(function () {
    "use strict"

    var statusMessageAlert = $('#statusMessageAlert');
    var contentMessageAlert = $('#contentMessageAlert');

    // closeNotificationMessage.on('click', function (event) {
    //     event.preventDefault();
    //     setTimeout(function () {
    //         $('.notification-overlay').removeClass("openform");
    //     }, 100);
        
    //     fetch('/api/util/delete-message-session')
    //     .then(res => res.json())
    //     .then(data => {})
    //     .catch(err => console.log(err));
    // });


    if (contentMessageAlert.html()) {
        
        cuteToast({
            type: statusMessageAlert.html().trim(), // or 'info', 'error', 'warning'
            message: contentMessageAlert.html().trim(),
            timer: 5000
        });
        
        setTimeout(function () {
            // $('.notification-overlay').addClass("openform");
            fetch('/api/util/delete-message-session')
            .then(res => res.json())
            .then(data => {})
            .catch(err => console.log(err));
        }, 1000);
    } else {
        contentMessageAlert.empty();
        statusMessageAlert.empty();
    }

})