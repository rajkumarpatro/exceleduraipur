$(document).ready(function () {

    // on load 
    //LoadFlash();
    LoadNews();

    
    function LoadFlash() {
        $.ajax({
            url: loadFlashPhotos,
            beforeSend: function () {
                $.blockUI();
            },
            success: function (view) {
                $.unblockUI();
                $('.topic-content').empty('').html(view);
                $('.topic-content').show();
                $('.topic').hide();
            },
            error: function (data, params) {
                $.unblockUI();
            }
        });
    }

    function LoadNews() {
        $.ajax({
            url: loadNewsDetails,
            beforeSend: function () {
                $.blockUI();
            },
            success: function (view) {
                $.unblockUI();
                $('.news-content').empty('').html(view);
                $('.news-content').show();
                $('.news').hide();
            },
            error: function (data, params) {
                $.unblockUI();
            }
        });
    }
});
