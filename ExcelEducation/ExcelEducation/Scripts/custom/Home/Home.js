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

    $("#frm_changepassword").validate({
        submitHandler: function (form) {
            debugger;

            $.ajax({
                url: changePassword,
                type: "POST",
                data: $(form).serialize(),
                beforeSend: function () {
                    $.blockUI();
                },
                success: function (res) {

                    if (res === 'False')
                        notify("", "Something went wrong", "danger");
                    else {
                        notify("", "Password Changed Successfully", "success");
                    }
                    
                },
                error: function (err) {
                    $.unblockUI();
                    notify("", "Something went wrong", "danger");

                },
                complete: function () {
                    $.unblockUI();
                    $('#USER_PASSWORD').val('');
                    $('#NEW_PASSWORD').val('');
                    $('#ConfirmPassword').val('');
                }
            });
        }
    });

});
