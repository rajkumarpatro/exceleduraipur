var fileInput = document.getElementById("uploadfile");
var allowedExtension = [".jpg", ".jpeg", ".png"]; //.jpg, .jpeg, .png

fileInput.addEventListener("change", function () {
    // Check that the file extension is supported.
    // If not, clear the input.
    var hasInvalidFiles = false;
    for (var i = 0; i < this.files.length; i++) {
        var file = this.files[i];
        debugger;
        var ext = file.name.substring(file.name.lastIndexOf("."));
        if (allowedExtension.indexOf(ext) === -1) {
            hasInvalidFiles = true;
        }
    }

    if (hasInvalidFiles) {
        fileInput.value = "";
        alert("Unsupported file selected.");
    }
});

$(document).ready(function () {
    $("#frm_flash").validate({
        submitHandler: function (form) {
            var flashid = $('#FLASH_ID').val();
            var flashcaption = $('#FLASH_CAPTION').val();
            var filepath = $('#uploadfile').val();
            var flashorder = $('#ddl_order').val();
            var txtaction = $('#ACTION').val();
            var url = AddEditDeleteRecord;

            $.ajax({
                url: AddEditDeleteRecord,
                type: "POST",
                //contentType: "json",
                //processData: false,
                dataType: "json",
                data: {
                    FLASH_ID: flashid,
                    FLASH_CAPTION: flashcaption,
                    FLASH_FILEPATH: filepath,
                    FLASH_ORDER: flashorder,
                    FLASH_SHOW: true,
                    ACTION: txtaction
                },
                beforeSend: function () {
                    $.blockUI();
                    //App.blockUI({ // sample ui-blockui.js
                    //    animate: true,
                    //    cenrerY: true,

                    //});
                },
                success: function (msg) {
                    alert("Data Add/Edited Successfully");
                    FlashTables.reloadTable(); //reloads Exam datatable
                    //notify(nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut);
                },
                error: function (err) {
                    //ShowNotification("error", "Error occured", err.status + " " + err.statusText);
                    $.unblockUI();
                    alert("error", "Error occured", err.status + " " + err.statusText);
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

    $(document).on('click', '#btnsubmit1', function () {
        debugger;
        return;

        
    });

    $(document).on('click', '#btnImport', function () {
        if ($("#uploadfile").get(0).files.length == 0) {
            alert('Please Select Excel File');
        }
        else {
            var frmData = new FormData(document.querySelector("#frm_watchlist"));
            var filebase = $("#uploadfile").get(0);
            var files = filebase.files;

            if (filebase.files.length) {
                frmData.append(files[0].name, files[0]);
            }

            $.ajax({
                url: upLoadRecordFileUrl,
                type: "POST",
                contentType: false,
                processData: false,
                data: frmData,
                beforeSend: function () {
                    $.blockUI();
                },
                success: function (result) {
                    //$(frmId + " input#ExamId").val(Examid);
                    //ShowNotification("success", "Record Saved", "Exam# " + Examid + " Saved Successfully");
                    //ExamTable.reloadTable(); //reloads Exam datatable
                    alert(result);
                },
                error: function (err) {
                    //ShowNotification("error", "Error occured", err.status + " " + err.statusText);
                    //App.unblockUI();
                    $.unblockUI();
                    alert(err.status + " " + err.statusText);
                },
                complete: function () {
                    $.unblockUI();
                    FlashTables.reloadTable();
                }
            });
        }
    });
});