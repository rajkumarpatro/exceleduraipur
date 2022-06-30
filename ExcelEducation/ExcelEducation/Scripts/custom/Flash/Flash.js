var fileInput = document.getElementById("uploadfile");
var allowedExtension = [".jpg", ".jpeg", ".png"]; //.jpg, .jpeg, .png
var gridFlashAction = "fromGrid"

fileInput.addEventListener("change", function () {
    // Check that the file extension is supported.
    // If not, clear the input.
    var hasInvalidFiles = false;
    for (var i = 0; i < this.files.length; i++) {
        var file = this.files[i];

        var ext = file.name.substring(file.name.lastIndexOf("."));
        if (allowedExtension.indexOf(ext) === -1) {
            hasInvalidFiles = true;
        }
    }

    if (hasInvalidFiles) {
        fileInput.value = "";
        alert("Unsupported file selected.");
    } else {
        $('#uploadfile-error').hide();
    }
});


$(document).ready(function () {
    $(document).on('click', '.select2', function () {
        gridFlashAction = "fromGrid";
    });

    $(document).on('change', '.gridFlashSelect', function () {
        if (gridFlashAction === "fromLoad") return;

        $.ajax({
            url: SetOrder,
            type: "POST",
            data: { "flashId": $(this).data('id'), "order": $(this).val() },
            success: function (res) {
                
                if (res === 'False')
                    notify("", "Something went wrong", "danger");
                else {
                    notify("", "Order set succesfully", "success");
                }
            },
            error: function (err) {
                notify("", "Something went wrong", "danger");
            },
            complete: function () {
                
            }
        });
    });

    $("#frm_flash").validate({
        submitHandler: function (form) {

            var frmData = new FormData(document.querySelector('#frm_flash'));
            var filebase = $("#uploadfile").get(0);
            var files = filebase.files;

            if (filebase.files.length) {
                frmData.append(files[0].name, files[0]);
                frmData.set("FLASH_ID", $('#FLASH_ID').val())
                frmData.set("FLASH_CAPTION", $('#FLASH_CAPTION').val())
                frmData.set("FLASH_ORDER", $('#FLASH_ORDER').val())
                frmData.set("FLASH_SHOW", $('#FLASH_SHOW').val())
                frmData.set("ACTION", $('#ACTION').val())
            }
            $.ajax({
                url: AddEditDeleteRecord,
                type: "POST",
                contentType: false,
                processData: false,
                data: frmData,
                beforeSend: function () {
                    $.blockUI();
                },
                success: function (res) {
                   
                    if (res === 'False')
                        notify("", "Something went wrong", "danger");
                    else {
                        notify("", "Data Add / Edited Successfully", "success");
                    }
                    FlashTables.reloadTable(); //reloads Exam datatable
                },
                error: function (err) {
                    $.unblockUI();
                    notify("", "Something went wrong", "danger");
                    
                },
                complete: function () {
                    $.unblockUI();
                    $('#FLASH_ID').val('');
                    $('#FLASH_CAPTION').val('');
                    $('#uploadfile').val('');
                    $('#ddl_order').val('1');
                    $('#ACTION').val('1');
                }
            });
        }
    });

    $(document).on('click', '.grdflashshow', function () {
        var flashid = $(this).data('id');
        var flash = $(this).data('flash_show');
        var thisObj = this;

        $.ajax({
            url: ToggleFlash,
            type: "POST",
            data: { "flash": flash, "flashId": flashid },
            beforeSend: function () {
                $.blockUI();
            },
            success: function (res) {
                $.unblockUI();
                if (res === 'False')
                    notify("", "Something went wrong", "danger");
                else {

                    $(thisObj).text(flash ? 'NO' : 'YES')
                    $(thisObj).data('flash_show', !flash);
                    notify("", "Flash updated succesfully", "success");
                }
            },
            error: function (err) {
                $.unblockUI();
                notify("", "Something went wrong", "danger");
            },
            complete: function () {
                $.unblockUI();
            }
        });
    });

    $(document).on('click', '.clsdel', function () {
        
        $.ajax({
            url: DeleteFlash,
            type: "POST",
            data: { "flashId": $(this).data('id') },
            beforeSend: function () {
                $.blockUI();
            },
            success: function (res) {
                $.unblockUI();
                if (res === 'False')
                    notify("", "Something went wrong", "danger");
                else {
                    notify("", "Flash deleted succesfully", "success");
                }

                FlashTables.reloadTable(); //reloads Exam datatable
            },
            error: function (err) {
                $.unblockUI();
                notify("", "Something went wrong", "danger");
            },
            complete: function () {
                $.unblockUI();
            }
        });
    });

   
});