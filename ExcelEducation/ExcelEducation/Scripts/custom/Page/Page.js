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

    $("#frm_submenu").validate({
        submitHandler: function (form) {
            debugger;

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
                    gridTables.reloadTable(); //reloads Exam datatable
                },
                error: function (err) {
                    $.unblockUI();
                    notify("", "Something went wrong", "danger");

                },
                complete: function () {
                    $.unblockUI();
                    $('#PAGE_ID').val('');
                    $('#PAGE_NAME').val('');
                    $('#IS_LINK').val('false');
                    $('#LINK_URL').val('');
                    $('#SHOW').val('true');
                    $('#SUB_MENU').val('false');
                    $('#IS_DEPARTMENT').val('false');
                    $('#REORDER').val('1');
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
        var fieldName = $(this).data('field');
        var thisObj = this;

        $.ajax({
            url: ToggleRecord,
            type: "POST",
            data: { "togglevalue": flash, "recordId": flashid, "fieldName": fieldName },
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

                gridTables.reloadTable(); //reloads Exam datatable
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
        var page = $('#lbl_' + id).text();
        var order = $(this).attr("data-order");
        var link = $(this).attr("data-link");
        var url = $('#lbl_link' + id).text();
        var show = $(this).attr("data-show");
        var submenu = $(this).attr("data-submenu");
        var department = $(this).attr("data-department");
        $('#PAGE_ID').val(id);
        $('#PAGE_NAME').val(page);
        $('#IS_LINK').val(link);
        $('#LINK_URL').val(url);
        $('#REORDER').val(order);
        $('#SHOW').val(show);
        $('#SUB_MENU').val(submenu);
        $('#IS_DEPARTMENT').val(department);
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