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
        height: 200
    });

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

    //upload multiple photos for topic details
    $(document).on('click', '.btnUploadPhotos', function () {
        debugger;
        var fileData = new FormData(document.querySelector('#frm_topicdetails'));
        for (var key of fileData.keys()) {
            // here you can add filtering conditions
            fileData.delete(key)
        }

        fileData.delete("files")

        var photosEle = $("#photosupload").get(0);
        var photos = photosEle.files;

        $(photos).each(function () {
            fileData.append(this.name, this);
        });
        fileData.append("subTopicId", $('#SUB_TOPIC_ID').val());

        $.ajax({
            url: UploadTopicDetailPhotos,
            type: "POST",
            contentType: false,
            processData: false,
            data: fileData,
            beforeSend: function () {
                $.blockUI();
            },
            success: function (res) {
                $.unblockUI();

                if (res === 'False')
                    notify("", "Something went wrong", "danger");
                else {
                    notify("", "Data Add / Edited Successfully", "success");
                    //$('#photosupload').uploadify('destroy')
                    $('.imageuploadify-container').remove();
                    $('#photosupload').val('');
                }

            },
            error: function (err) {
                $.unblockUI();
                notify("", "Something went wrong", "danger");

            },
            complete: function () {
                $.unblockUI();
                //$('#FLASH_ID').val('');
                //$('#FLASH_CAPTION').val('');
                //$('#uploadfile').val('');
                //$('#ddl_order').val('1');
                //$('#ACTION').val('1');
            }
        });
    });

});