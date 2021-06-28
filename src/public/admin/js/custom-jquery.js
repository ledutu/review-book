$(function () {
    "use strict"

    var statusMessageAlert = $('#statusMessageAlert');
    var contentMessageAlert = $('#contentMessageAlert');

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