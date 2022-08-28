
var PageHeadTables = function () {
    //TODO:: table-datatables-scroller.js use to fix scroller issue
    var table;
    var tableGrid = function () {
        table = $('#gridtable');
        table.dataTable({
            //"autowidth": "true",
            //"scrollX": true,
            "ajax": {
                "url": LoadRecord,
                "type": "GET",
                "datatype": "json",
                complete: function (data) {
                    var data = [];
                    for (i = 1; i <= 100; i++) {
                        data.push({ id: i, text: i })
                    }
                    
                    $('.gridSelect').select2({
                        data: data
                    });

                    gridAction = "fromLoad"
                    $('.gridSelect').each(function () {
                        //alert($(this).data('order'));
                        $(this).val($(this).data('order'));
                        $(this).select2().trigger('change');
                       // $(this).select2("val", $(this).data('order'));
                    });

                }
            },
            "columns": [

                {
                    "title": "PAGE HEAD", "data": "PAGE_HEAD_NAME",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var labelid = "<label id='lbl_" + oData.PAGE_HEAD_ID + "' for='L" + oData.PAGE_HEAD_ID + "'>" + oData.PAGE_HEAD_NAME + "</label>";
                        $(nTd).html(labelid);
                    }
                },
                {
                    "title": "IS_LINK", "data": "IS_LINK",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var linktext = (oData.IS_LINK == true ? 'Yes' : 'No');
                        var labelshow = "<label data-id='" + oData.PAGE_ID + "' data-SHOW=" + oData.IS_LINK + "  id='lnk_" + oData.PAGE_ID + "'>" + linktext + "</label>";
                        $(nTd).html(labelshow);
                    }
                },
                {
                    "title": "LINK_URL", "data": "LINK_URL",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var labelid = "<label id='lbl_link" + oData.PAGE_ID + "' for='link" + oData.PAGE_ID + "'>" + (oData.LINK_URL == "null" ? "-" : oData.LINK_URL) + "</label>";
                        $(nTd).html(labelid);
                    }
                },
                {
                    "title": "ORDER", "data": "REORDER",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var select = "<select data-order=" + oData.REORDER + " data-id=" + oData.PAGE_HEAD_ID + " class='gridSelect'></select>"
                        //var txtorder = "<input id='txt_" + oData.PAGE_HEAD_ID + "' style='width:50px;' type='text' value='" + oData.REORDER + "'></input>";
                        $(nTd).html(select);
                    }
                },

                {
                    "title": "SHOW", "data": "SHOW",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var showtext = (oData.SHOW == true ? 'YES' : 'NO');
                        var labelshow = "<label data-id='" + oData.PAGE_HEAD_ID + "' data-show=" + oData.SHOW + "  id='lnk_" + oData.PAGE_HEAD_ID + "' class='grdshow LableText clsshow'>" + showtext + "</label>";
                        $(nTd).html(labelshow);
                    }
                },
                {
                    "title": "EDIT/DELETE", "data": "PAGE_HEAD_ID",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var conf = 'return confirm("Are you sure to delete this record?")';
                        var editbtn = "&nbsp; <i data-id='" + oData.PAGE_HEAD_ID + "' data-link='" + oData.IS_LINK + "' data-order=" + oData.REORDER + " data-show=" + oData.SHOW + " id='btnedit_" + oData.PAGE_HEAD_ID + "' class='icon feather icon-edit f-w-600 f-16 m-r-15 text-c-green clsedit' ToolTip='Edit'></i>";
                        var delbtn = "<i data-id='" + oData.PAGE_HEAD_ID + "' id='btndel_" + oData.PAGE_HEAD_ID + "' class='icon feather icon-trash-2 f-w-600 f-16 m-r-15 text-c-red clsdel' ToolTip='Delete' ></i>";
                        $(nTd).html(editbtn + delbtn);
                        //$(nTd).html(delbtn);
                    }
                },


            ],
            order: [[4, 'asc']],
            //dom: 'lBfrtip',
            //buttons: ['excel', 'csv'],
        });
    }

    return {
        //main function to initiate the module
        init: function () {
            if (!jQuery().dataTable) {
                return;
            }

            tableGrid();
        },
        reloadTable: function () {
            table.DataTable().ajax.reload(null, false); // user paging is not reset on reload
        }
    };
}();

jQuery(document).ready(function () {
    PageHeadTables.init();
});

$(document).ready(function () {
    document.title = "Page Head";
    //alert('ok');
    var table = $('#gridtable').DataTable();

});