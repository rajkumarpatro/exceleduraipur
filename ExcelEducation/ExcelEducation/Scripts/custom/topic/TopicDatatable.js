
var griddtable = function () {
    //TODO:: table-datatables-scroller.js use to fix scroller issue
    var table;
    var tableGrid = function (topicId) {
        table = $('#griddtable');
        table.dataTable({
            //"autowidth": "true",
            //"scrollX": true,
            "ajax": {
                "url": GetTopicDetails + "?topicId=" + topicId,
                "type": "GET",
                "datatype": "json",
                complete: function (data) {
                    var data = [];
                    for (i = 1; i <= 100; i++) {
                        data.push({ id: i, text: i })
                    }

                    $('.gridFlashSelect').select2({
                        data: data
                    });

                    gridFlashAction = "fromLoad";

                    $('.gridFlashSelect').each(function () {
                        //alert($(this).data('order'));
                        $(this).val($(this).data('order'));
                        $(this).select2().trigger('change');
                        // $(this).select2("val", $(this).data('order'));
                    });

                }
            },
            "columns": [
                
                {
                    "title": "S.No.", "data": "SUB_TOPIC_NAME",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                                                //var labelflashid = "<label id='lbl_" + oData.FLASH_ID + "' for='L" + oData.FLASH_ID + "'>" + oData.FLASH_CAPTION + "</label>";
                        $(nTd).html(++iRow);
                    }
                },
                {
                    "title": "TITLE", "data": "SUB_TOPIC_NAME"
                },
                {
                    "title": "SHOW", "data": "SHOW_TOPIC_NAME",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var data = oData.TOPIC_LINK_TYPE ? "YES" : "NO";
                        $(nTd).html(data);
                    }
                },
                {
                    "title": "DATE", "data": "TOPIC_DATE",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        $(nTd).html(moment(oData.TOPIC_DATE).format("DD/MM/YYYY"));
                    }
                },

                {
                    "title": "FILE PATH", "data": "TOPIC_FILEPATH"
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
                        $(nTd).html("<i data-id=" + oData.SUB_TOPIC_ID + " style='color: blue; cursor: pointer' class='fas fa-edit gridedit'></i>");
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
    griddtable.init(0);
    var table = $('#griddtable').DataTable();
});