
var gridTopicDetailFilestable = function () {
    //TODO:: table-datatables-scroller.js use to fix scroller issue
    var table;
    var tableGrid = function (topicId) {
        table = $('#gridDetailsFilestable');
        table.dataTable({
            "ajax": {
                "url": GetTopicDetailFiles + "?subTopicId=" + topicId,
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

                    gridAction = "fromLoad";

                    $('.gridSelect').each(function () {
                        $(this).val($(this).data('order'));
                        $(this).select2().trigger('change');
                    });
                }
            },
            "columns": [
                {
                    "title": "TITLE", "data": "FILE_DESCRIPTION"
                },
                {
                    "title": "FILE PATH", "data": "FILE_PATH"
                },
                {
                    "title": "ORDER", "data": "FILE_ORDER",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var select = "<select data-order=" + oData.FILE_ORDER + " data-id=" + oData.FILE_ID + " class='gridSelect'></select>"
                        $(nTd).html(select);
                    }
                }
                ,
                {
                    "title": "", "data": "FILE_ORDER",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        $(nTd).html("<i data-id=" + oData.FILE_ID + " class='feather icon-trash-2 deletefile'></i> <i data-id=" + oData.FILE_ID + " class='feather icon-edit'></i>");
                    }
                }
            ]
        });
    }

    return {
        //main function to initiate the module
        init: function (topicId) {
            if (!jQuery().dataTable) {
                return;
            }

            tableGrid(topicId);
        },
        reloadTable: function () {
            table.DataTable().ajax.reload(null, false); // user paging is not reset on reload
        },
        destroy: function () {
            if (table != null)
                table.DataTable().destroy();
        },
        clear: function () {
            if (table != null)
                table.DataTable().clear();
        },
        draw: function () {
            if (table != null)
                table.DataTable().draw();
        }
    };
}();

jQuery(document).ready(function () {
    
    var table = $('#gridDetailsFilestable').DataTable();
});