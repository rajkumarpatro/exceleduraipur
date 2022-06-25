$(document).ready(function(){

    // loads Pages head
    $.ajax({
        url: GetPageHead,
        dataType: 'json',
        success: function (params) {
            
            $('.clsddlpagehead').select2({
                placeholder: { text: "Select", selected: 'selected' },
                allowClear: true,
                data: params.data,
            });
            $('.clsddlpagehead').val('Select');
            $('.clsddlpagehead').trigger('change');
        },
        error: function (data, params) {
        }
    });

    //sub menu
    $('.clsddlsubmenu').select2({
        placeholder: { text: "Select", selected: 'selected' },
        allowClear: true
    });

    $(document).on('change', '.clsddlpagehead', function () {
        //if ($(this).val() == null) return;

        $.ajax({
            url: GetPage +"?pageHeadId="+$(this).val(),
            dataType: 'json',
            success: function (params) {

                $('.clsddlpage').empty().select2({
                    placeholder: { text: "Select", selected: 'selected' },
                    allowClear: true,
                    data: params.data,
                });
                $('.clsddlpage').val('Select');
                $('.clsddlpage').trigger('change');
            },
            error: function (data, params) {
            }
        });
    });

    //topic
    $('.clsddltopic').select2({
        placeholder: { text: "Select", selected: 'selected' },
        allowClear: true
    });
});
