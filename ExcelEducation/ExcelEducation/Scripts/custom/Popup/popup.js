function previewFile(input) {
    var file = $("#uploadfile").get(0).files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function () {
            $("#previewImg").attr("src", reader.result);
        }

        reader.readAsDataURL(file);
    }
}

function SavePopup() {

    //if (!$('#frm_Popup').valid()) return;

    var frmData = new FormData(document.querySelector('#frm_Popup'));
    var filebase = $("#uploadfile").get(0);
    var files = filebase.files;

    if (filebase.files.length) {
        frmData.append(files[0].name, files[0]);
        frmData.set("SHOW", $('#SHOW').prop('checked'))
    }
    $.ajax({
        url: SavePopupUrl,
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
        
        },
        error: function (err) {
            $.unblockUI();
            notify("", "Something went wrong", "danger");

        },
        complete: function () {
            $.unblockUI();
        }
    });
}

