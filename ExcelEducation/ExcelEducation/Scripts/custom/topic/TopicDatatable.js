
var griddtable = function () {
    //TODO:: table-datatables-scroller.js use to fix scroller issue
    var table;
    var tableGrid = function (topicId) {
        table = $('#griddtable');
        table.dataTable({
            destroy: true,
            "oLanguage": {
                "sLengthMenu": "Displays _MENU_ records",
            },
            order: [[3, 'desc']],
            "ajax": {
                "url": GetTopicDetails + "?topicId=" + topicId,
                "type": "GET",
                "datatype": "json",
                complete: function (data) {
                    var data = [];
                    for (i = 1; i <= 100; i++) {
                        data.push({ id: i, text: i })
                    }

                    $('.gridTopicDetailsSelect').select2({
                        data: data
                    });

                    gridFlashAction = "fromLoad";

                    $('.gridTopicDetailsSelect').each(function () {
                        //alert($(this).data('order'));
                        $(this).val($(this).data('order'));
                        $(this).select2().trigger('change');
                        // $(this).select2("val", $(this).data('order'));
                    });

                }
            },
            "columns": [
                {
                    "title": "TITLE", "data": "SUB_TOPIC_NAME"
                },
                {
                    "title": "SHOW", "data": "TOPIC_LINK_TYPE",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var data = oData.TOPIC_LINK_TYPE ? "YES" : "NO";
                        $(nTd).html(data);
                    }
                },
                {
                    "title": "DATE", "data": "TOPIC_DATE",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        $(nTd).html(moment(oData.TOPIC_DATE).format("DD-MM-YYYY"));
                    }
                },
                {
                    "title": "FILE PATH", "data": "TOPIC_FILEPATH"
                },
                {
                    "title": "ORDER", "data": "SUB_TOPIC_ORDER",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var select = "<select data-order=" + oData.SUB_TOPIC_ORDER + " data-id=" + oData.SUB_TOPIC_ID + " class='gridTopicDetailsSelect'></select>"
                        $(nTd).html(select);
                    }
                },
                {
                    "title": "LINK TYPE", "data": "TOPIC_LINK_TYPE",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var data = oData.TOPIC_LINK_TYPE ? "FILE" : "#";
                        $(nTd).html(data);
                    }
                },
                {
                    "title": "EDIT", "data": "TOPIC_LINK_TYPE",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        $(nTd).html("<i  style='cursor: pointer' data-filepath=" + oData.TOPIC_FILEPATH + " data-id=" + oData.SUB_TOPIC_ID + " class='feather icon-trash-2 deletetopicdetails'></i> | <i data-id=" + oData.SUB_TOPIC_ID + " style='cursor: pointer' class='fas fa-edit editsubtopic'></i>");
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
            table.api().ajax.reload(null, false); // user paging is not reset on reload
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
    griddtable.init(0);
});