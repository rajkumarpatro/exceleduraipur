$(document).ready(function () {

    // on load 
    

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
