
var FlashTables = function () {
    //TODO:: table-datatables-scroller.js use to fix scroller issue
    var table;
    var Watchlist = function () {
        table = $('#FlashTable');

        //debugger;
        // begin first table
        //alert('called');
        table.dataTable({
            //"autowidth": "true",
            //"scrollX": true,
            "ajax": {
                "url": LoadRecord,
                "type": "GET",
                "datatype": "json"
            },//
            "columns": [

                {
                    "title": "CAPTION", "data": "FLASH_CAPTION",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var labelflashid = "<label id='lbl_" + oData.FLASH_ID + "' for='L" + oData.FLASH_ID + "'>" + oData.FLASH_CAPTION + "</label>";
                        $(nTd).html(labelflashid);
                    }
                },
                {
                    "title": "PHOTO", "data": "FLASH_FILEPATH",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var labelflashimg = "<img src='" + oData.FLASH_FILEPATH + "' class='img-responsive' style='max-width:200px;'/>";
                        $(nTd).html(labelflashimg);
                    }
                },
                {
                    "title": "ORDER", "data": "FLASH_ORDER",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var txtorder = "<input id='txt_" + oData.FLASH_ID + "' style='width:50px;' type='text' value='" + oData.FLASH_ORDER + "'></input>";
                        $(nTd).html(txtorder);
                    }
                },

                {
                    "title": "SHOW", "data": "FLASH_SHOW",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var showtext = (oData.FLASH_SHOW == true ? 'YES' : 'NO');
                        var labelshow = "<label id='lnk_" + oData.FLASH_ID + "' class='LableText clsshow'>" + showtext + "</label>";
                        $(nTd).html(labelshow);
                    }
                },
                {
                    "title": "DELETE", "data": "FLASH_ID",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var conf = 'return confirm("Are you sure to delete this record?")';
                        //var editbtn = "&nbsp; <i data-id='" + oData.FLASH_ID + "' id='btnedit_" + oData.FLASH_ID + "' class='icon feather icon-edit f-w-600 f-16 m-r-15 text-c-green clsedit' ToolTip='Edit'></i>";
                        var delbtn = "<i data-id='" + oData.FLASH_ID + "' id='btndel_" + oData.FLASH_ID + "' class='icon feather icon-trash-2 f-w-600 f-16 m-r-15 text-c-red clsdel' ToolTip='Delete' onclick='" + conf + "'></i>";
                        //$(nTd).html(editbtn + delbtn);
                        $(nTd).html(delbtn);
                    }
                },

               
            ],
            dom: 'lBfrtip',
            buttons: ['excel', 'csv'],
        });
    }

    return {
        //main function to initiate the module
        init: function () {
            if (!jQuery().dataTable) {
                return;
            }

            Watchlist();
        },
        reloadTable: function () {
            table.DataTable().ajax.reload(null, false); // user paging is not reset on reload
        }
    };
}();

jQuery(document).ready(function () {
    FlashTables.init();
});

function checkNewsType(newstype) {
    if (newstype == 'Text') {
        $('#dv_file').hide();
        $('#dv_url').hide();
    }
    else if (newstype == 'URL') {
        $('#dv_file').hide();
        $('#dv_url').show();
    }
    else if (newstype == 'File') {
        $('#dv_file').show();
        $('#dv_url').hide();
    }
}

$(document).ready(function () {
    document.title = "Latest Updates";
    //alert('ok');

    var newstype = $('#ddl_news_type').val();
    checkNewsType(newstype);
    

    var table = $('#FlashTable').DataTable();

    $('#ddl_news_type').on('change', function () {
        
        checkNewsType($('#ddl_news_type').val());
    });

    $('#FlashTable tbody').on('click', '.clsdel', function () {
        //debugger
        var id = $(this).attr("data-id");
        
        debugger

        var flashid = id;
        var flashcaption = '';
        var filepath = '';
        var flashorder =0;
        var txtaction = '3';
        var url = AddEditDeleteRecord;

        $.ajax({
            url: AddEditDeleteRecord,
            type: "POST",
            //contentType: "json",
            //processData: false,
            dataType: "json",
            data: {
                FLASH_ID: flashid,
                FLASH_CAPTION: flashcaption,
                FLASH_FILEPATH: filepath,
                FLASH_ORDER: flashorder,
                FLASH_SHOW: true,
                ACTION: txtaction
            },
            beforeSend: function () {
                $.blockUI();
            },
            success: function (msg) {
                alert("Data Deleted Successfully");
                FlashTables.reloadTable(); //reloads Exam datatable
            },
            error: function (err) {
                
                $.unblockUI();
                alert("error", "Error occured", err.status + " " + err.statusText);
            },
            complete: function () {
                $.unblockUI();
                $('#FLASH_ID').val('');
                $('#ACTION').val('1');
            }
        });
    });

    

    $(document).on('click', '#btnsubmit', function () {
        debugger

        var flashid = $('#FLASH_ID').val();
        var flashcaption = $('#FLASH_CAPTION').val();
        var filepath = $('#uploadfile').val();
        var flashorder = $('#ddl_order').val();
        var txtaction = $('#ACTION').val();
        var url = AddEditDeleteRecord;

        $.ajax({
            url: AddEditDeleteRecord,
            type: "POST",
            //contentType: "json",
            //processData: false,
            dataType: "json",
            data: {
                FLASH_ID: flashid,
                FLASH_CAPTION: flashcaption,
                FLASH_FILEPATH: filepath,
                FLASH_ORDER: flashorder,
                FLASH_SHOW: true,
                ACTION: txtaction
            },
            beforeSend: function () {
                $.blockUI();
                //App.blockUI({ // sample ui-blockui.js
                //    animate: true,
                //    cenrerY: true,

                //});
            },
            success: function (msg) {
                alert("Data Add/Edited Successfully");
                FlashTables.reloadTable(); //reloads Exam datatable
                //notify(nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut);
            },
            error: function (err) {
                //ShowNotification("error", "Error occured", err.status + " " + err.statusText);
                $.unblockUI();
                alert("error", "Error occured", err.status + " " + err.statusText);
            },
            complete: function () {
                $.unblockUI();
                $('#FLASH_ID').val('');
                $('#FLASH_CAPTION').val('');
                $('#uploadfile').val('');
                $('#ddl_order').val('1');
                $('#ACTION').val('1');
            }
        });
    });
});