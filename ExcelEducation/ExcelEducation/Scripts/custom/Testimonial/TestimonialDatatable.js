
var TestimonialTables = function () {
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
                    
                    $('.gridTestimonialSelect').select2({
                        data: data
                    });

                    gridTestimonialAction = "fromLoad"
                    $('.gridTestimonialSelect').each(function () {
                        //alert($(this).data('order'));
                        $(this).val($(this).data('order'));
                        $(this).select2().trigger('change');
                       // $(this).select2("val", $(this).data('order'));
                    });

                }
            },
            "columns": [

                {
                    "title": "STUDENT NAME", "data": "STUDENT_NAME",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var labelflashid = "<label id='lbl_" + oData.ID + "' for='L" + oData.ID + "'>" + oData.STUDENT_NAME + "</label>";
                        $(nTd).html(labelflashid);
                    }
                },
                {
                    "title": "STUDENT CLASS", "data": "STUDENT_CLASS",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var labelflashid = "<label id='lbl_" + oData.ID + "' for='L" + oData.ID + "'>" + oData.STUDENT_CLASS + "</label>";
                        $(nTd).html(labelflashid);
                    }
                },
                {
                    "title": "PHOTO", "data": "STUDENT_PHOTO",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                     
                        var labelflashimg =
                            "<img src='" + oData.STUDENT_PHOTO + "' class='img-responsive' style='max-height:150px;'/>";
                        $(nTd).html(labelflashimg);
                    }
                },
                {
                    "title": "ORDER", "data": "TESTIMONIAL_ORDER",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var select = "<select data-order=" + oData.TESTIMONIAL_ORDER +" data-id=" + oData.ID + " class='gridTestimonialSelect'></select>"
                        //var txtorder = "<input id='txt_" + oData.FLASH_ID + "' style='width:50px;' type='text' value='" + oData.FLASH_ORDER + "'></input>";
                        $(nTd).html(select);
                    }
                },

                //{
                //    "title": "SHOW", "data": "FLASH_SHOW",
                //    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                //        var showtext = (oData.FLASH_SHOW == true ? 'YES' : 'NO');
                //        var labelshow = "<label data-id='" + oData.FLASH_ID + "' data-FLASH_SHOW=" + oData.FLASH_SHOW + "  id='lnk_" + oData.FLASH_ID + "' class='grdflashshow LableText clsshow'>" + showtext + "</label>";
                //        $(nTd).html(labelshow);
                //    }
                //},
                {
                    "title": "", "data": "ID",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var conf = 'return confirm("Are you sure to delete this record?")';
                        //var editbtn = "&nbsp; <i data-id='" + oData.FLASH_ID + "' id='btnedit_" + oData.FLASH_ID + "' class='icon feather icon-edit f-w-600 f-16 m-r-15 text-c-green clsedit' ToolTip='Edit'></i>";
                        var delbtn = "<i data-id='" + oData.ID + "' id='btndel_" + oData.ID + "' class='icon feather icon-trash-2 f-w-600 f-16 m-r-15 text-c-red clsdel' ToolTip='Delete' ></i>";
                        var editbtn = "<i data-id='" + oData.ID + "' id='btndel_" + oData.ID + "' class='icon feather icon-edit f-w-600 f-16 m-r-15 text-c-red clsedit' ToolTip='Edit' ></i>";
                        $(nTd).html(editbtn + delbtn);
                        //$(nTd).html(delbtn);
                    }
                },


            ],
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
    TestimonialTables.init();
});

$(document).ready(function () {
    document.title = "Testimonial";
    //alert('ok');
    var table = $('#gridtable').DataTable();

});