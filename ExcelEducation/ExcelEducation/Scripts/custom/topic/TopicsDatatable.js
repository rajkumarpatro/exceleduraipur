
var gridTopicstable = function () {
    //TODO:: table-datatables-scroller.js use to fix scroller issue
    var table1;
    var tableGrid1 = function (pageId) {
        table1 = $('#gridTopicstable');
        table1.dataTable({
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
                        
                        var select = '';
                        if (oData.LINK_URL != null) {
                           select = "<a href='" + (oData.LINK_URL == null ? '' : oData.LINK_URL) + "' target='_blank'>file</a>";
                        }
                        
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
                        $(nTd).html("<i data-id=" + oData.TOPIC_ID + " class='feather icon-trash-2 deletetopic'></i> | <i data-id=" + oData.TOPIC_ID + " class='feather icon-edit edittopic'></i>");
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

            tableGrid1(pageId);
        },
        reloadTable: function () {
            table1.DataTable().ajax.reload(null, false); // user paging is not reset on reload
        },
        destroy: function () {
            if (table1 != null)
                table1.DataTable().destroy();
        },
        clear: function () {
            if (table1 != null)
                table1.DataTable().clear();
        },
        draw: function () {
            if (table1 != null)
                table1.DataTable().draw();
        }
    };
}();

jQuery(document).ready(function () {
    gridTopicstable.init($("#PAGE_ID").val());
});