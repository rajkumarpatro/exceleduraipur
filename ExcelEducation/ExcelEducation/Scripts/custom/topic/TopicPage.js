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
        if ($(this).val() == null) {
            $('#btnAddTopic').hide();
            return;
        };

        LoadTopicData($(this).val());
    });

    function LoadTopicData(pageId) {

        $.ajax({
            url: GetTopics + "?pageId=" + pageId,
            dataType: 'json',
            success: function (params) {

                $('.clsddltopic').empty().select2({
                    placeholder: { text: "Select", selected: 'selected' },
                    allowClear: true,
                    data: params.data,
                });
                $('.clsddltopic').val('Select');
                $('.clsddltopic').trigger('change');
                $('#btnAddTopic').show();
            },
            error: function (data, params) {
            }
        });
    }

    //topic change event loads topic details grid 
    $(document).on('change', '.clsddltopic', function () {

        if ($(this).val() == null) {
            $('#btnAddData').hide();
            return;
        };

        griddtable.init($(this).val());

        var lblCntFilter = $('[name="griddtable_length"]').closest('label');
        lblCntFilter.html('<pan style="font-weight: bold">Topic</span>: <span style="color: blue; font-weight: bold">' + $('.clsddltopic option:selected').text() + '</span></br>' + lblCntFilter.html());

        $('#btnAddData').show();
        var btnText = 'Add ' + $(this).children(":selected").text() + ' data';

        $('#btnAddData').text(btnText.toUpperCase());

    });

    //add new topic (opens topic view)
    $(document).on('click', '#btnAddTopic', function () {

        $.ajax({
            url: AddTopic + "?pageId=" + $('.clsddlpage').val(),
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

    //form validation and submit for topic 
    $(document).on('click', '#btnSaveTopic', function () {

        if ($("#frm_topic").valid()) {

            var fileData = new FormData(document.querySelector('#frm_topic'));

            fileData.set('IS_LINK', $('#IS_LINK').prop('checked'));

            $.ajax({
                url: AddTopic,
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
                    gridTopicstable.reloadTable();
                    topicFrmReset();

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
    $(document).on('click', '.editsubtopic', function () {
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


    // close Topic view
    $(document).on('click', '.pagetopic .closeCard', function () {
        
        $('.topic-content').empty('');
        $('.topic-content').hide();
        $('.topic').show();


        LoadTopicData($('.clsddlpage').val());
        griddtable.reloadTable();
    });

    // close details close
    $(document).on('click', '.topicdetail   .closeCard', function () {
        
        $('.topic-content').empty('');
        $('.topic-content').hide();
        $('.topic').show();

        griddtable.reloadTable();
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
            fileData.set('TOPIC_LINK_TYPE', $('#TOPIC_LINK_TYPE').prop('checked'));
            fileData.set('TOPIC_DESCRIPTION', encodeURI($("#TOPIC_DESCRIPTION").val()));

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

                    if (res == "Inserted" || res == "Updated") {
                        notify("", "Data " + res + " Successfully", "success");
                    }
                    else {
                        notify("", "Error :" + res + "", "danger");

                    }
                    $('.closeCard').trigger('click');
                },
                error: function (err) {
                    $.unblockUI();
                    notify("", "Something went wrong "+err, "danger");

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
            cache: false,
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
                    getElementById("frm_topicdetailfiles").reset();
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

    //upload multiple photos for topic details
    $(document).on('click', '.btnUploadPhotos', function () {

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
                    LoadPagePhotos();
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

    function LoadPagePhotos() {
        $.ajax({
            type: 'GET',
            url: GetPagePhotos + "?subTopicId=" + $('#SUB_TOPIC_ID').val(),
            success: function (res) {
                $('#divPagePhotosList').empty().html(res);
            }
        });
    }

    // uploades multiple files of any format 
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
            }
        });

    });

    // sets target control
    $(document).on('click', '.select2', function () {
        gridFlashAction = "fromGrid";
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

    //Order ddl change from grid
    $(document).on('change', '.gridTopicDetailsSelect', function () {
        
        if (gridFlashAction === "fromLoad") return;

        $.ajax({
            url: SetSubTopicOrder,
            type: "POST",
            data: { "Id": $(this).data('id'), "order": $(this).val() },
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
    //Topic IS_LINK change
    $(document).on('change', '#IS_LINK', function () {

        if ($(this).prop('checked')) {
            $('.divlink').show();
        }
        else $('.divlink').hide();
    });

    //Topic delete
    $(document).on('click', '.deletetopic', function () {
        var id = $(this).data('id');

        $.ajax({
            url: DeleteTopic + "?id=" + id,
            type: 'GET',
            success: function () {
                gridTopicstable.reloadTable();
            }
        })
    });

    //Delete Topic details
    $(document).on('click', '.deletetopicdetails', function () {
        
        var id = $(this).data('id');
        var filepath = $(this).data('filepath');

        $.ajax({
            url: DeleteTopicDetail + "?subTopicId=" + id + "&filepath=" + filepath,
            type: 'GET',
            success: function () {
                notify("", "Record deleted succesfully", "success");
                griddtable.reloadTable();
            },
            error: function (res) {
                notify("", "Error while deleting record", "danger");
            }
        })
    });

    //Topic edit        
    $(document).on('click', '.edittopic', function () {
        
        var id = $(this).data('id');

        $.ajax({
            url: GetTopic + "?topicId=" + id,
            type: 'GET',
            success: function (res) {
                $("#PAGE_ID").val(res.PAGE_ID);
                $("#TOPIC_ID").val(res.TOPIC_ID);
                $("#TOPIC_NAME").val(res.TOPIC_NAME);
                $("#IS_LINK").val(res.IS_LINK);
                if (res.IS_LINK) {
                    $("#IS_LINK").bootstrapToggle('on');
                    $(".divlink").show();
                }
                else {
                    $("#IS_LINK").bootstrapToggle('off');
                    $(".divlink").hide();
                }
                $("#LINK_URL").val(res.LINK_URL);
                $("#TOPIC_ORDER").val(res.TOPIC_ORDER).trigger('change');
                $('#btnCancelTopic').show();
                $('#btnSaveTopic').html('Update');

            }
        })
    });

    //topic cancel edit
    $(document).on('click', '#btnCancelTopic', function () {
        topicFrmReset();
    });

    //topic form reset
    function topicFrmReset() {
        $('#btnSaveTopic').html('Add');
        document.getElementById("frm_topic").reset();
        $('#btnCancelTopic').hide();
        $("#IS_LINK").bootstrapToggle('off');
        $("#TOPIC_ORDER").val(1).trigger('change');
    }

    //Delete topic details photo event
    $(document).on('click', '.pagephoto', function () {

        var divToDelete = $(this).closest('.col-md-2');

        $.ajax({
            url: DeletePhoto + "?photoId=" + $(this).data('id'),
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

                if ($(divToDelete).closest('.col-md-2').siblings().length == 0) {
                    $(divToDelete).closest('.carousel-item').prev().addClass('active');
                    $(divToDelete).closest('.carousel-item').remove();
                }
                else {
                    $(divToDelete).remove();
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

});
