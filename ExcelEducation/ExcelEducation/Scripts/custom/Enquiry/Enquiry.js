$(document).ready(function () {
    //$('select').select2();
    //$('select').niceSelect();
    // on load 
    //LoadFlash();
    

    $(document).on('click', '#btnContactSubmit', function () {

        var course = $("#course").val();
        var mode = $("#mode").val();
        var batch = $("#batch").val();
        var name = $("#name").val();
        var mobile = $("#mobile").val();
        var message = $("#message").val();
        var city = $("#city").val();


        if (name === "") { alert("Please add Name"); return; }
        if (mobile === "") { alert("Please add Mobile"); return; }
        if (course === "") { alert("Please select Course"); return; }
        if (batch === "") { alert("Please select Batch"); return; }
        if (mode === "") { alert("Please select Mode"); return; }
        if (city === "") { alert("Please select City"); return; }
        if (message === "") { alert("Please add Message"); return; }


        $.ajax({
            type: 'GET',
            url: enquiry + "?course=" + course + "&mode=" + mode + "&batch=" + batch + "&name=" + name + "&mobile=" + mobile + "&message=" + message + "&city=" + city,
            complete: function () {
                alert('Your enquiry sent successfully, out team will get in touch with you soon');
                $("#name").val('');
                $("#mobile").val('');
                $("#message").val('');
                $("#city").val('');
            }
        });
    });

    $(document).on('change', '#course', function () {
        var course = $("#course").val();
        $.ajax({
            type: 'GET',
            url: GetBatch + "?courseId=" + course,
            success: function (data) {
                $('#batch').empty();
                $('#batch').append($('<option/>', {
                    value: '',
                    text: 'Select'
                }));

                $.each(data, function (index, value) {
                    $('#batch').append($('<option/>', {
                        value: value.COURSE_ID,
                        text: value.COURSE
                    }));
                });

                $('select').niceSelect('update');


            },
            error: function () { }
        });
    });
});
