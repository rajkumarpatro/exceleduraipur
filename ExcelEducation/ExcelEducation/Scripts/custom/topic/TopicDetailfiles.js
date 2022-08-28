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

    // close details files close
    $(document).on('click', '.closeDetailFilesCard', function () {
        $('.topic-files').empty('');
        $('.topic-content').show();
    });

    // sets target control
    $(document).on('click', '.select2', function () {
        gridAction = "fromGrid";
    });

    // deletes a file
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

//# sourceURL=browsertools://scripts/custom/topic/TopicDetailfiles.js