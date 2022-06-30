$(document).ready(function () {


    // loads Pages head and initialize select2
    $.ajax({
        url: GetPageHeads,
        dataType: 'json',
        success: function (params) {

            $('.clsddlpagehead').select2({
                placeholder: { text: "Select", selected: 'selected' },
                allowClear: true,
                data: params.data,
            });
            $('.clsddlpagehead').val('Select');
            $('.clsddlpagehead').trigger('change');
        },
        error: function (data, params) {
        }
    });

    //initialize select2 for sub menu and initialize select2
    $('.clsddlsubmenu').select2({
        placeholder: { text: "Select", selected: 'selected' },
        allowClear: true
    });

    //pagehead change event loads sub menu 
    $(document).on('change', '.clsddlpagehead', function () {
        $.ajax({
            url: GetPages + "?pageHeadId=" + $(this).val(),
            dataType: 'json',
            success: function (params) {

                $('.clsddlpage').empty().select2({
                    placeholder: { text: "Select", selected: 'selected' },
                    allowClear: true,
                    data: params.data,
                });
                $('.clsddlpage').val('Select');
                $('.clsddlpage').trigger('change');
            },
            error: function (data, params) {
            }
        });
    });

    //topic initialize select2
    $('.clsddltopic').select2({
        placeholder: { text: "Select", selected: 'selected' },
        allowClear: true
    });

    //submenu change event loads topic
    $(document).on('change', '.clsddlpage', function () {
        //if ($(this).val() == null) return;

        $.ajax({
            url: GetTopics + "?pageId=" + $(this).val(),
            dataType: 'json',
            success: function (params) {

                $('.clsddltopic').empty().select2({
                    placeholder: { text: "Select", selected: 'selected' },
                    allowClear: true,
                    data: params.data,
                });
                $('.clsddltopic').val('Select');
                $('.clsddltopic').trigger('change');
            },
            error: function (data, params) {
            }
        });
    });

    //topic change event loads topic details grid 
    $(document).on('change', '.clsddltopic', function () {

        if ($(this).val() == null) {
            $('#btnAddData').hide();
            return;
        };

        $('#btnAddData').show();
        var btnText = 'Add ' + $(this).children(":selected").text() + ' data';

        $('#btnAddData').text(btnText.toUpperCase());
        griddtable.destroy();
        griddtable.init($(this).val());
    });

    //add new topic details (opens topic details view)
    $(document).on('click', '#btnAddData', function () {

        $.ajax({
            url: AddTopicDetail + "?topicId=" + $('.clsddltopic').val(),
            beforeSend: function () {
                $.blockUI();
            },
            success: function (view) {
                $.unblockUI();
                $('.topic-content').empty('').html(view);
                $('.topic-content').show();
                $('.topic').hide();
            },
            error: function (data, params) {
                $.unblockUI();
            }
        });
    });

    //click event from details grid => edit topic details
    $(document).on('click', '.gridedit', function () {
        $.ajax({
            url: AddTopicDetail + "?subTopicId=" + $(this).data('id'),
            beforeSend: function () {
                $.blockUI();
            },
            success: function (view) {
                $.unblockUI();
                $('.topic-content').empty('').html(view);
                $('.topic-content').show();
                $('.topic').hide();
            },
            error: function (data, params) {
                $.unblockUI();
            }
        });
    });

    //form validation and submit for topic details
    $(document).on('click', '#testbtn', function () {

        if ($("#frm_topicdetails").valid()) {
            var fileUpload = $("#uploadfile").get(0);
            var files = fileUpload.files;

            var fileData = new FormData(document.querySelector('#frm_topicdetails'));
            fileData.delete("files")

            if (files.length > 0)
                fileData.append(files[0].name, files[0]);

            fileData.set('SHOW_TOPIC_NAME', $('#SHOW_TOPIC_NAME').prop('checked'));
            fileData.set('TOPIC_LINK_TYPE', $('#TOPIC_LINK_TYPE').prop('checked'))

            $.ajax({
                url: AddTopicDetail,
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
        }
    });

    // Opens topic details files view
    $(document).on('click', '#btnAddMultipleFiles', function () {
        $.ajax({
            url: AddTopicDetailFiles + "?subTopicId=" + $("#SUB_TOPIC_ID").val(),
            success: function (view) {
                subTopicId = $("#SUB_TOPIC_ID").val();

                $('.topic-files').empty().html(view);
                $('.topic-content').hide();
                
            },
            error: function (data, params) {
            }
        });
    });

    //form validation and submit for topic details
    $(document).on('click', '.addTopicDetailFiles', function () {

        if ($("#frm_topicdetailfiles").valid()) {

            var fileUpload = $("#uploadfiledetails").get(0);
            var files = fileUpload.files;

            var fileData = new FormData(document.querySelector('#frm_topicdetailfiles'));
            fileData.delete("files")

            if (files.length > 0)
                fileData.append(files[0].name, files[0]);

            var photosEle = $("#photosuploaddetails").get(0);
            var photos = photosEle.files;

            $.ajax({
                url: AddTopicDetailFiles,
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
                    }
                    gridTopicDetailFilestable.destroy();
                    gridTopicDetailFilestable.init(subTopicId);
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
    });

});
