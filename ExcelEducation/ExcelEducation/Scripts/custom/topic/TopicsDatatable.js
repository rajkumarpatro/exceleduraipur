
var gridTopicstable = function () {
    //TODO:: table-datatables-scroller.js use to fix scroller issue
    var table;
    var tableGrid = function (pageId) {
        table = $('#gridTopicstable');
        table.dataTable({
            "ajax": {
                order: [[1, "desc"]],
                "url": GetTopicList + "?pageId=" + pageId,
                "type": "GET",
                "datatype": "json",
                complete: function (data1) {
                    var data = [];
                    for (i = 1; i <= 100; i++) {
                        data.push({ id: i, text: i })
                    }

                    $('.gridTopicSelect').select2({
                        data: data
                    });

                    gridAction = "fromLoad";

                    $('.gridTopicSelect').each(function () {
                        $(this).val($(this).data('order'));
                        $(this).select2().trigger('change');
                    });
                }
            },
            "columns": [
                {
                    "title": "TOPIC", "data": "TOPIC_NAME"
                },
                {
                    "title": "IS_LINK", "data": "IS_LINK",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        $(nTd).html(oData.IS_LINK ? "YES":"NO" );
                    }
                },
                {
                    "title": "LINK", "data": "LINK_URL",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var select = '<a href="' + oData.LINK_URL +' target="_blank">';
                        $(nTd).html(select);
                    }
                },
                {
                    "title": "ORDER", "data": "TOPIC_ORDER",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var select = "<select data-order=" + oData.TOPIC_ORDER + " data-id=" + oData.TOPIC_ID + " class='gridTopicSelect'></select>"
                        $(nTd).html(select);
                    }
                }
                ,
                {
                    "title": "", "data": "TOPIC_ORDER",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        $(nTd).html("<i data-id=" + oData.TOPIC_ID + " class='feather icon-trash-2 deletefile'></i> <i data-id=" + oData.FILE_ID + " class='feather icon-edit'></i>");
                    }
                }
            ]
        });
    }

    return {
        //main function to initiate the module
        init: function (pageId) {
            if (!jQuery().dataTable) {
                return;
            }

            tableGrid(pageId);
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
    gridTopicstable.init($("#PAGE_ID").val());
});