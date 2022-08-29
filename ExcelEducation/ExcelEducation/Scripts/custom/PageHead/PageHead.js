var gridAction = "fromGrid"




$(document).ready(function () {
    $(document).on('click', '.select2', function () {
        gridAction = "fromGrid";
    });

    $('#dv_link').hide();

    $(document).on('change', '#IS_LINK', function () {
        debugger;
        var islink = $('#IS_LINK').val();

        if (islink == "true") {
            $('#dv_link').show();
        }
        else {
            $('#dv_link').hide();
            $('#LINK_URL').val('');
        }
    });

    $(document).on('change', '.gridSelect', function () {
        if (gridAction === "fromLoad") return;

        $.ajax({
            url: SetOrder,
            type: "POST",
            data: { "recordId": $(this).data('id'), "order": $(this).val() },
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

    $("#frm_pagehead").validate({
        submitHandler: function (form) {
            debugger;
            //var frmData = new FormData(document.querySelector('#frm_flash'));

            ///frmData.set("PAGE_HEAD_ID", $('#PAGE_HEAD_ID').val())
            //frmData.set("PAGE_HEAD_NAME", $('#PAGE_HEAD_NAME').val())
            //frmData.set("FLASH_ORDER", $('#FLASH_ORDER').val())
            //frmData.set("FLASH_SHOW", $('#FLASH_SHOW').val())
            //frmData.set("ACTION", $('#ACTION').val())

            $.ajax({
                url: AddEditRecord,
                type: "POST",
                data: $(form).serialize(),
                beforeSend: function () {
                    $.blockUI();
                },
                success: function (res) {
                   
                    if (res === 'False')
                        notify("", "Something went wrong", "danger");
                    else {
                        notify("", "Data Add / Edited Successfully", "success");
                    }
                    PageHeadTables.reloadTable(); //reloads Exam datatable
                },
                error: function (err) {
                    $.unblockUI();
                    notify("", "Something went wrong", "danger");
                    
                },
                complete: function () {
                    $.unblockUI();
                    $('#PAGE_HEAD_ID').val('');
                    $('#PAGE_HEAD_NAME').val('');
                    $('#ddl_show').val('true');
                    $('#ddl_order').val('1');
                    $('#IS_LINK').val('false');
                    $('#LINK_URL').val('');
                    $('#ACTION').val('1');
                }
            });
            //alert('test');
            //return false;

        }
    });

    $(document).on('click', '.grdshow', function () {
        var flashid = $(this).data('id');
        var flash = $(this).data('show');
        var thisObj = this;

        $.ajax({
            url: ToggleRecord,
            type: "POST",
            data: { "togglevalue": flash, "recordId": flashid },
            beforeSend: function () {
                $.blockUI();
            },
            success: function (res) {
                $.unblockUI();
                if (res === 'False')
                    notify("", "Something went wrong", "danger");
                else {

                    $(thisObj).text(flash ? 'NO' : 'YES')
                    $(thisObj).data('show', !flash);
                    notify("", "Record updated succesfully", "success");
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

                PageHeadTables.reloadTable(); //reloads Exam datatable
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
        var pagehead = $('#lbl_' + id).text();
        var order = $(this).attr("data-order");
        var show = $(this).attr("data-show");
        var link = $(this).attr("data-link");
        var url = $('#lbl_link' + id).text();
        $('#PAGE_HEAD_ID').val(id);
        $('#PAGE_HEAD_NAME').val(pagehead);
        $('#REORDER').val(order);
        $('#SHOW').val(show);
        $('#IS_LINK').val(link);
        $('#LINK_URL').val(url);
        $('#ACTION').val('2');
        if (link == "true") {
            $('#dv_link').show();
        }
        else {
            $('#dv_link').hide();
            $('#LINK_URL').val('');
        }
        //alert('hi');
    });

    
   
});