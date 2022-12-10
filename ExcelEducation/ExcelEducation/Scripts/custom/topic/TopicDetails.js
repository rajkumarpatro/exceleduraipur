'use strict';

$(document).ready(function () {
    //checkbox toggle initialize
    $('.chktoggle').bootstrapToggle();

    //sub menu
    $('.frmselect').select2({
        placeholder: 'Select',
        allowClear: true
    });

    //summer note
    $('.description').summernote({
        tabsize: 1,
        height: 200,
        callbacks: {
            onImageUpload: imageUpload
        }
    }).on('summernote.change', function (customEvent, contents, $editable) {
        // Revalidate the content when its value is changed by Summernote
        //fv.revalidateField('content');
    });

    function imageUpload(files) {
        debugger;
        var $files = $(files);
        var $this = $(this);
        $files.each(function () {
            var file = this;
            var data = new FormData();
            data.append("file", file);
            $.ajax({
                data: data,
                type: "POST",
                url: "/topic/SaveImages",
                cache: false,
                contentType: false,
                processData: false,
                success: function (response) {

                    $this.summernote('insertImage', 'https://localhost:44312/' + response, function ($image) {


                    });

                },
                error: function (xhr, ajaxOptions, thrownError) {
                    debugger;
                    if (xhr.responseText) {
                        //toastr.error(xhr.responseText, 'Inconceivable!')
                    } else {
                        console.error("<div>Http status: " + xhr.status + " " + xhr.statusText + "</div>" + "<div>ajaxOptions: " + ajaxOptions + "</div>"
                            + "<div>thrownError: " + thrownError + "</div>");
                    }
                }
            });
        });
    }


    //date picker
    //$(function () {
        
    //    if ($('#TOPIC_DATE').val() === "") {
    //        var date = new Date().toLocaleDateString();
    //        $('#TOPIC_DATE').val(date);
    //    }

    //    $('input[id="TOPIC_DATE"]').daterangepicker({
    //        locale: {
    //            format: 'DD/MM/YYYY'
    //        },
    //        singleDatePicker: true,
    //        showDropdowns: true,
    //    }, function (start, end, label) {
    //        var years = moment().diff(start, 'years');
    //    });
    //});

    
    $(document).on('change', '#TOPIC_LINK_TYPE', function () {
        var ischecked = $(this).prop('checked');

        ischecked ? $('.divfile').css({ visibility: '' }) : $('.divfile').css({ visibility: 'hidden' });
    });

   

    //initializr multi file uploader
    $('#photosupload').imageuploadify();

    

    

});