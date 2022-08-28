var gridAction = "fromGrid"

$(document).ready(function () {
    //checkbox toggle initialize
    $('.chktoggle').bootstrapToggle();

    //sub menu
    $('#TOPIC_ORDER').select2({
        placeholder: 'Select',
        allowClear: true
    });

    // sets target control
    $(document).on('click', '.select2', function () {
        gridAction = "fromGrid";
    });

    //Order ddl change from grid
    $(document).on('change', '.gridTopicSelect', function () {

        if (gridAction === "fromLoad") return;

        $.ajax({
            url: SetTopicOrder,
            type: "POST",
            data: { "topicId": $(this).data('id'), "order": $(this).val() },
            success: function (res) {

                if (res === 'False')
                    notify("", "Something went wrong", "danger");
                else {
                    notify("", "Order set succesfully", "success");
                }
            },
            error: function (err) {
                notify("", "Something went wrong", "danger");
            },
            complete: function () {

            }
        });
    });
});
