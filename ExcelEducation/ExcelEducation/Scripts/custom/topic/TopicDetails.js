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
            //onImageUpload: imageUpload
        }
    }).on('summernote.change', function (customEvent, contents, $editable) {
        // Revalidate the content when its value is changed by Summernote
        fv.revalidateField('content');
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
                    if (xhr.responseText) {
                        toastr.error(xhr.responseText, 'Inconceivable!')
                    } else {
                        console.error("<div>Http status: " + xhr.status + " " + xhr.statusText + "</div>" + "<div>ajaxOptions: " + ajaxOptions + "</div>"
                            + "<div>thrownError: " + thrownError + "</div>");
                    }
                }
            });
        });
    }


    //date picker
    $(function () {
        
        if ($('#TOPIC_DATE').val() === "") {
            var date = new Date().toLocaleDateString();
            $('#TOPIC_DATE').val(date);
        }

        $('input[id="TOPIC_DATE"]').daterangepicker({
            locale: {
                format: 'DD/MM/YYYY'
            },
            singleDatePicker: true,
            showDropdowns: true,
        }, function (start, end, label) {
            var years = moment().diff(start, 'years');
        });
    });

    
    $(document).on('change', '#TOPIC_LINK_TYPE', function () {
        var ischecked = $(this).prop('checked');

        ischecked ? $('.divfile').css({ visibility: '' }) : $('.divfile').css({ visibility: 'hidden' });
    });

    // close details close
    $(document).on('click', '.closeCard', function () {
        $('.topic-content').empty('');
        $('.topic-content').hide();
        griddtable.reloadTable();
        $('.topic').show();
    });

    //initializr multi file uploader
    $('#photosupload').imageuploadify();

    //Delete photo event
    $(document).on('click', '.pagephoto', function () {
        
        var divToDelete = $(this).closest('.col-md-2');

        $.ajax({
            url: DeletePhoto + "?photoId="+$(this).data('id'),
            //data: { "photoId": $(this).data('id') },
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

                $(divToDelete).remove();
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