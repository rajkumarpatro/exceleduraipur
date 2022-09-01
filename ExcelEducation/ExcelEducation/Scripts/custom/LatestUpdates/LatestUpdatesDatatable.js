
var LatestUpdatesTables = function () {
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
                    
                }
            },
            "columns": [

                {
                    "title": "DATE", "data": "NEWS_DATE",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        $(nTd).html(moment(oData.NEWS_DATE).format("DD-MM-YYYY"));
                    }
                },
                {
                    "title": "TITLE", "data": "NEWS_TITLE",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var labelid = "<label id='lbl_title" + oData.NEWS_ID + "' for='Ltitle" + oData.NEWS_ID + "'>" + oData.NEWS_TITLE + "</label>";
                        $(nTd).html(labelid);
                    }
                },
                {
                    "title": "SECTION", "data": "NEWS_SECTION",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var labelid = "<label id='lbl_section" + oData.NEWS_ID + "' for='Lsection" + oData.NEWS_ID + "'>" + oData.NEWS_SECTION + "</label>";
                        $(nTd).html(labelid);
                    }
                },
                {
                    "title": "LINK_TYPE", "data": "NEWS_LINKTYPE",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var labelid = "<label id='lbl_linktype" + oData.NEWS_ID + "' for='Llink" + oData.NEWS_ID + "'>" + oData.NEWS_LINKTYPE + "</label>";
                        $(nTd).html(labelid);
                    }
                },
                {
                    "title": "LINK", "data": "NEWS_LINK",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var labelid = "<label id='lbl_link" + oData.NEWS_ID + "' for='Llink" + oData.NEWS_ID + "'>" + oData.NEWS_LINK + "</label>";
                        $(nTd).html(labelid);
                    }
                },
                

                {
                    "title": "FILEPATH", "data": "NEWS_FILEPATH",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var labelid = "<a href='" + oData.NEWS_FILEPATH + "' target='_blank'>File</label>";
                        $(nTd).html(labelid);
                    }
                },
                {
                    "title": "EDIT/DELETE", "data": "NEWS_ID",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var conf = 'return confirm("Are you sure to delete this record?")';
                        var editbtn = "&nbsp; <i data-id='" + oData.NEWS_ID + "' data-file=" + oData.NEWS_FILEPATH + " id='btnedit_" + oData.NEWS_ID + "' class='icon feather icon-edit f-w-600 f-16 m-r-15 text-c-green clsedit' ToolTip='Edit'></i>";
                        var delbtn = "<i data-id='" + oData.NEWS_ID + "' id='btndel_" + oData.NEWS_ID + "' class='icon feather icon-trash-2 f-w-600 f-16 m-r-15 text-c-red clsdel' ToolTip='Delete' ></i>";
                        $(nTd).html(editbtn + delbtn);
                        //$(nTd).html(delbtn);
                    }
                },


            ],
            order: [[0, 'asc']],
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
    LatestUpdatesTables.init();
});

$(document).ready(function () {
    document.title = "Latest Updates";
    //alert('ok');
    var table = $('#gridtable').DataTable();

});