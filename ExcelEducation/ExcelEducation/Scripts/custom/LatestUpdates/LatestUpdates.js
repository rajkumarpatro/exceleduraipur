var gridAction = "fromGrid"




$(document).ready(function () {

    $('#dv_file').hide();
    $('#dv_url').hide();

    function checkNewsType() {
        var islink = $('#NEWS_LINKTYPE').val();

        if (islink == "Text") {
            $('#dv_file').hide();
            $('#dv_url').hide();
        }
        else if (islink == "URL") {
            $('#dv_file').hide();
            $('#dv_url').show();
        }
        else if (islink == "File") {
            $('#dv_file').show();
            $('#dv_url').hide();
        }
    }

    $(document).on('change', '#NEWS_LINKTYPE', function () {
        debugger;
        checkNewsType();
    });
    
    $("#frm_latestupdates").validate({
        
        submitHandler: function (form) {
            debugger;
            var frmData = new FormData(document.querySelector('#frm_latestupdates'));
            var filebase = $("#uploadfile").get(0);
            var files = filebase.files;

            if (filebase.files.length) {
                frmData.append(files[0].name, files[0]);
            }

            frmData.set("NEWS_ID", $('#NEWS_ID').val())
            frmData.set("NEWS_DATE", $('#NEWS_DATE').val())
            frmData.set("NEWS_TITLE", $('#NEWS_TITLE').val())
            frmData.set("NEWS_SECTION", $('#NEWS_SECTION').val())
            frmData.set("NEWS_LINK", $('#NEWS_LINK').val())
            frmData.set("NEWS_LINKTYPE", $('#NEWS_LINKTYPE').val())
            frmData.set("ACTION", $('#ACTION').val())

            $.ajax({
                url: AddEditRecord,
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
                    LatestUpdatesTables.reloadTable(); //reloads Exam datatable
                },
                error: function (err) {
                    $.unblockUI();
                    notify("", "Something went wrong", "danger");
                    
                },
                complete: function () {
                    $.unblockUI();
                    $('#NEWS_ID').val('');
                    $('#NEWS_DATE').val('');
                    $('#NEWS_FILEPATH').val('');
                    $('#NEWS_LINK').val('');
                    $('#NEWS_LINKTYPE').val('Text');
                    $('#dv_file').hide();
                    $('#dv_url').hide();
                    $('#ACTION').val('1');
                }
            });
            //alert('test');
            //return false;

        }
    });


    $(document).on('click', '.clsdel', function () {
        //alert(DeleteRecord);
        $.ajax({
            url: DeleteRecord,
            type: "POST",
            data: { "recordId": $(this).data('id') },
            beforeSend: function () {
                $.blockUI();
            },
            success: function (res) {
                $.unblockUI();
                if (res === 'False')
                    notify("", "Something went wrong", "danger");
                else {
                    notify("", "Record deleted succesfully", "success");
                }

                LatestUpdatesTables.reloadTable(); //reloads Exam datatable
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

    $(document).on('click', '.clsedit', function () {
        debugger
        var id = $(this).attr("data-id");
        var date = $('#lbl_date' + id).text();
        var title = $('#lbl_title' + id).text();
        var section = $('#lbl_section' + id).text();
        var linktype = $('#lbl_linktype' + id).text();
        var link = $('#lbl_link' + id).text();
        var filepath = $(this).attr("data-file");
        $('#NEWS_ID').val(id);
        $('#NEWS_DATE').val(date);
        $('#NEWS_TITLE').val(title);
        $('#NEWS_SECTION').val(section);
        $('#NEWS_LINKTYPE').val(linktype);
        $('#NEWS_LINK').val(link);
        $('#ACTION').val('2');
        checkNewsType();
        //alert('hi');
    });

    
   
});