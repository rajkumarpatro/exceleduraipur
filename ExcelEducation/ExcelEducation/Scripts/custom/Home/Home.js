$(document).ready(function () {
    //$('select').select2();
    //$('select').niceSelect();
    // on load 
    //LoadFlash();
    LoadNews();


    function LoadFlash() {
        $.ajax({
            url: loadFlashPhotos,
            beforeSend: function () {
                $.blockUI();
            },
            success: function (view) {
                $.unblockUI();
                $('.topic-content').empty('').html(view);
                $('.topic-content').show();
                $('.topic').hide();
            },
            error: function (data, params) {
                $.unblockUI();
            }
        });
    }

    function LoadNews() {
        $.ajax({
            url: loadNewsDetails,
            beforeSend: function () {
                $.blockUI();
            },
            success: function (view) {
                $.unblockUI();
                $('.news-content').empty('').html(view);
                $('.news-content').show();
                $('.news').hide();
            },
            error: function (data, params) {
                $.unblockUI();
            }
        });
    }

    $(document).on('click', '#btnContactSubmit', function () {

        var course = $("#course").val();
        var mode = $("#mode").val();
        var applyfor = $("#applyfor").val();
        var name = $("#name").val();
        var mobile = $("#mobile").val();
        var message = $("#message").val();
        var city = $("#city").val();

        if (name === "") { alert("Please add Name"); return; }
        if (mobile === "") { alert("Please add Mobile"); return; }
        if (course === "") { alert("Please select Course"); return; }
        if (applyfor === "") { alert("Please select Apply for"); return; }
        if (mode === "") { alert("Please select Mode"); return; }
        if(city === "") { alert("Please select City"); return; }
        if (message === "") { alert("Please add Message"); return; }


        $.ajax({
            type: 'GET',
            url: enquiry + "?course=" + course + "&mode=" + mode + "&applyfor=" + applyfor + "&name=" + name + "&mobile=" + mobile + "&message=" + message + "&city=" + city,
            complete: function () {
                $('#exampleModal').modal('toggle');
            }
        });
    });

    $(document).on('change', '#course', function () {
        var course = $("#course").val();
        $.ajax({
            type: 'GET',
            url: GetAppearingFor + "?courseId=" + course,
            success: function (data) {
                $('#applyfor').empty();
                $('#applyfor').append($('<option/>', {
                    value: '',
                    text: 'Select'
                }));

                $.each(data, function (index, value) {
                    $('#applyfor').append($('<option/>', {
                        value: value,
                        text: value
                    }));
                }); 

                $('select').niceSelect('update');
                
                
            },
            error: function () { }
        });
    });
});
