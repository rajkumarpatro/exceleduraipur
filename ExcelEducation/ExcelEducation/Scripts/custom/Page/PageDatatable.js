
var gridTables = function () {
    //TODO:: table-datatables-scroller.js use to fix scroller issue
    var table;
    var tableGrid = function (pagehead) {
        //debugger;
        table = $('#gridtable');
        //alert(pagehead);
        table.dataTable({
            //"autowidth": "true",
            //"scrollX": true,
            "ajax": {
                "url": LoadRecord,
                "type": "GET",
                "datatype": "json",
                "data": { pageHeadId: pagehead },
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
                    "title": "SUB MENU", "data": "PAGE_NAME",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var labelid = "<label id='lbl_" + oData.PAGE_ID + "' for='L" + oData.PAGE_ID + "'>" + oData.PAGE_NAME + "</label>";
                        $(nTd).html(labelid);
                    }
                },
                {
                    "title": "SHOW", "data": "SHOW",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var showtext = (oData.SHOW == true ? 'YES' : 'NO');
                        var labelshow = "<label data-id='" + oData.PAGE_ID + "' data-field='SHOW' data-SHOW=" + oData.SHOW + "  id='lnk_" + oData.PAGE_ID + "' class='grdshow LableText clsshow'>" + showtext + "</label>";
                        $(nTd).html(labelshow);
                    }
                },
                {
                    "title": "SUB_MENU", "data": "SUB_MENU",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var showtext = (oData.SUB_MENU == true ? 'YES' : 'NO');
                        var labelshow = "<label data-id='" + oData.PAGE_ID + "' data-field='SUB_MENU' data-SHOW=" + oData.SUB_MENU + "  id='lnk_" + oData.PAGE_ID + "' class='grdshow LableText clsshow'>" + showtext + "</label>";
                        $(nTd).html(labelshow);
                    }
                },
                {
                    "title": "IS_DEPARTMENT", "data": "IS_DEPARTMENT",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var showtext = (oData.IS_DEPARTMENT == true ? 'YES' : 'NO');
                        var labelshow = "<label data-id='" + oData.PAGE_ID + "' data-field='IS_DEPARTMENT' data-SHOW=" + oData.IS_DEPARTMENT + "  id='lnk_" + oData.PAGE_ID + "' class='grdshow LableText clsshow'>" + showtext + "</label>";
                        $(nTd).html(labelshow);
                    }
                },
                {
                    "title": "ORDER", "data": "REORDER",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var select = "<select data-order=" + oData.REORDER + " data-id=" + oData.PAGE_ID + " class='gridSelect'></select>";
                        $(nTd).html(select);
                    }
                },
                {
                    "title": "IS_LINK", "data": "IS_LINK",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var linktext = (oData.IS_LINK == true ? 'LINK' : 'DESCRIPTION');
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
                    "title": "EDIT", "data": "PAGE_ID",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var conf = 'return confirm("Are you sure to delete this record?")';
                        var editbtn = "&nbsp; <i data-id='" + oData.PAGE_ID + "' data-link='" + oData.IS_LINK + "' data-show='" + oData.SHOW + "' data-submenu='" + oData.SUB_MENU + "' data-department='" + oData.IS_DEPARTMENT + "' data-order='" + oData.REORDER + "' id='btnedit_" + oData.PAGE_ID + "' class='icon feather icon-edit f-w-600 f-16 m-r-15 text-c-green clsedit' ToolTip='Edit'></i>";
                        var delbtn = "<i data-id='" + oData.PAGE_ID + "' id='btndel_" + oData.PAGE_ID + "' class='icon feather icon-trash-2 f-w-600 f-16 m-r-15 text-c-red clsdel' ToolTip='Delete' ></i>";
                        $(nTd).html(editbtn + delbtn);
                        //$(nTd).html(delbtn);
                    }
                },


            ],
            order: [[2, 'asc']],
            //dom: 'lBfrtip',
            //buttons: ['excel', 'csv'],
        });
    }

    return {
        //main function to initiate the module
        init: function (pagehead) {
            //debugger;
            if (!jQuery().dataTable) {
                return;
            }

            tableGrid(pagehead);
        },
        reloadTable: function () {
            table.DataTable().ajax.reload(null, false); // user paging is not reset on reload
        },
        destroy: function () {
            if (table != null)
                table.DataTable().destroy();
        }
    };
}();



$(document).ready(function () {
    document.title = "Sub Menu";
    //alert('ok');
    //var table = $('#gridtable').DataTable();

    $(document).on('change', '#PAGE_HEAD_ID', function () {
        debugger;
        var pageHeadId = $(this).val();
        gridTables.destroy();
        gridTables.init(pageHeadId);
        //alert('hi');
    });

});