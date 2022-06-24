//Get the button
var mybutton = document.getElementById("myBtn");


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    $("#myBottomBtn").show();
    if (document.documentElement.scrollTop == 0) {
        $("#myBottomBtn").show();
    }
    else { $("#myBottomBtn").hide(); }

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function bottomFunction() {
    document.body.scrollTop = $(document).height();
    document.documentElement.scrollTop = $(document).height();
}

//notification
function notify(title, message, type) {
    //$.notify({
    //    title: title,
    //    message: message
    //}, {
    //    type: type,
    //    allow_dismiss: false,
    //    label: 'Cancel',
    //    className: 'btn-xs btn-inverse',
    //    placement: {
    //        from: 'top',
    //        align: 'right'
    //    },
    //    delay: 2500,
    //    animate: {
    //        enter: 'animated fadeInRight',
    //        exit: 'animated fadeOutRight'
    //    },
    //    offset: {
    //        x: 30,
    //        y: 30
    //    }
    //});

    $.notify({
       // icon: icon,
        title: title,
        message: message,
        url: ''
    }, {
        element: 'body',
        type: type,
        allow_dismiss: true,
        placement: {
            from: 'top',
            align: 'right'
        },
        offset: {
            x: 30,
            y: 30
        },
        spacing: 10,
        z_index: 999999,
        delay: 2500,
        timer: 1000,
        url_target: '_blank',
        mouse_over: false,
        animate: {
            enter: 'animated fadeInRight',
            exit: 'animated fadeOutRight'
        },
        icon_type: 'class',
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
            '<span data-notify="icon"></span> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
    });
}
$(document).ready(function () {
    $(document).ajaxError(function () {
       
        //notify("Failed", "Something went wrong", "danger");
    });

    $(document).ajaxSuccess(function (event, jqxhr, settings, thrownError) {
        //debugger;
        //if (settings.url.indexOf("toggleFlash") !== -1)
        //notify("Success", "Flash updated succesfully", "success");
    });
})
