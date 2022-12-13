var fileInput = document.getElementById("uploadfile");
var allowedExtension = [".jpg", ".jpeg", ".png"]; //.jpg, .jpeg, .png
var gridTestimonialAction = "fromGrid"

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


$(document).ready(function () {
    $('select').select2();

    $(document).on('click', '.select2', function () {
        gridTestimonialAction = "fromGrid";
    });

    $(document).on('change', '.gridTestimonialSelect', function () {
        if (gridTestimonialAction === "fromLoad") return;

        $.ajax({
            url: SetOrder,
            type: "POST",
            data: { "TestimonialId": $(this).data('id'), "order": $(this).val() },
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

    $("#frm_Testimonial").validate({
        submitHandler: function (form) {

            if (!$('#frm_Testimonial').valid()) return;

            var frmData = new FormData(document.querySelector('#frm_Testimonial'));
            var filebase = $("#uploadfile").get(0);
            var files = filebase.files;

            if (filebase.files.length) {
                frmData.append(files[0].name, files[0]);
            }
            frmData.set("ID", $('#ID').val())
            frmData.set("TESTIMONIAL", $('#TESTIMONIAL').val())
            frmData.set("TESTIMONIAL_ORDER", $('#TESTIMONIAL_ORDER').val())
            frmData.set("STUDENT_CLASS", $('#STUDENT_CLASS').val())
            frmData.set("STUDENT_NAME", $('#STUDENT_NAME').val())

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
                    TestimonialTables.reloadTable(); //reloads Exam datatable
                },
                error: function (err) {
                    $.unblockUI();
                    notify("", "Something went wrong", "danger");

                },
                complete: function () {
                    $.unblockUI();
                    Reset();
                }
            });
        }
    });


    $(document).on('click', '.grdTestimonialshow', function () {
        var Testimonialid = $(this).data('id');
        var Testimonial = $(this).data('Testimonial_show');
        var thisObj = this;

        $.ajax({
            url: ToggleTestimonial,
            type: "POST",
            data: { "Testimonial": Testimonial, "TestimonialId": Testimonialid },
            beforeSend: function () {
                $.blockUI();
            },
            success: function (res) {
                $.unblockUI();
                if (res === 'False')
                    notify("", "Something went wrong", "danger");
                else {

                    $(thisObj).text(Testimonial ? 'NO' : 'YES')
                    $(thisObj).data('Testimonial_show', !Testimonial);
                    notify("", "Testimonial updated succesfully", "success");
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
            url: DeleteTestimonial,
            type: "POST",
            data: { "TestimonialId": $(this).data('id') },
            beforeSend: function () {
                $.blockUI();
            },
            success: function (res) {
                $.unblockUI();
                if (res === 'False')
                    notify("", "Something went wrong", "danger");
                else {
                    notify("", "Testimonial deleted succesfully", "success");
                }

                TestimonialTables.reloadTable(); //reloads Exam datatable
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

    function Reset() {
        $("#previewImg").attr('src', '');
        $("#TESTIMONIAL_ORDER").val(1);
        $("#TESTIMONIAL_ORDER").select2().trigger('change')
        document.getElementById("frm_Testimonial").reset();
    }

    $(document).on('click', '#btnTestCancel', function () {
        Reset();
    });

    $(document).on('click', '.clsedit', function () {

        $.ajax({
            url: GetTestimonial,
            type: "POST",
            data: { "TestimonialId": $(this).data('id') },
            beforeSend: function () {
                $.blockUI();
            },
            success: function (res) {
                debugger;
                $('#TESTIMONIAL').val(res.TESTIMONIAL);
                $('#STUDENT_NAME').val(res.STUDENT_NAME);
                $('#STUDENT_CLASS').val(res.STUDENT_CLASS);
                $('#TESTIMONIAL').val(res.TESTIMONIAL);
                $('#ID').val(res.ID);

                $("#TESTIMONIAL_ORDER").val(res.TESTIMONIAL_ORDER);
                $("#TESTIMONIAL_ORDER").select2().trigger('change');
                $("#previewImg").attr('src', res.STUDENT_PHOTO);
                $('#btnTestCancel').removeClass('hide_column');

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