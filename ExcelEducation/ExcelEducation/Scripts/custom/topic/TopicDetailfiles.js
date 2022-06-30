var subTopicId;
var gridAction = "fromGrid"

$(document).ready(function () {

    //initializr files grid for topic details
    gridTopicDetailFilestable.init(subTopicId);

    //initializr multi file uploader
    $('#photosuploaddetails').imageuploadify();

    //order dd
    $('#FILE_ORDER').select2({
        placeholder: { text: "Select", selected: 'selected' },
        allowClear: true
    });

    $(document).on('click', '.uploadDetailFiles', function () {

        var fileData = new FormData(document.querySelector('#frm_topicdetailsfiles'));
        fileData.delete("files")

        var photosEle = $("#photosuploaddetails").get(0);
        var photos = photosEle.files;

        $(photos).each(function () {
            fileData.append(this.name, this);
        });

        fileData.append("subTopicId", $('#SUB_TOPIC_ID').val());

        $.ajax({
            url: UploadTopicDetailFiles,
            type: "POST",
            contentType: false,
            processData: false,
            data: fileData,
            beforeSend: function () {
                $.blockUI();
            },
            success: function (res) {

                if (res === 'False')
                    notify("", "Something went wrong", "danger");
                else {
                    notify("", "Data Add / Edited Successfully", "success");
                    gridTopicDetailFilestable.destroy();
                    gridTopicDetailFilestable.init(subTopicId);
                    //$('#photosuploaddetails').uploadify('destroy')
                    $('.imageuploadify-container').remove();
                    $('#photosuploaddetails').val('');
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

    // close details files close
    $(document).on('click', '.closeDetailFilesCard', function () {
        $('.topic-files').empty('');
        $('.topic-content').show();
    });

    // sets target control
    $(document).on('click', '.select2', function () {
        gridAction = "fromGrid";
    });

    //Order ddl change from grid
    $(document).on('change', '.gridSelect', function () {
        if (gridAction === "fromLoad") return;

        $.ajax({
            url: SetOrder,
            type: "POST",
            data: { "fileId": $(this).data('id'), "order": $(this).val() },
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

    
    $(document).on('click', '.deletefile', function () {
        
        $.ajax({
            url: DeleteTopicDetailFile,
            type: "POST",
            data: { "fileId": $(this).data('id')},
            success: function (res) {
                    
                if (res === 'False')
                    notify("", "Something went wrong", "danger");
                else {
                    notify("", "Order set succesfully", "success");
                    gridTopicDetailFilestable.destroy();
                    gridTopicDetailFilestable.init(subTopicId);
                }
            },
            error: function (err) {
                notify("", "Something went wrong", "danger");
            },
            complete: function () {

            }
        });
    });
});