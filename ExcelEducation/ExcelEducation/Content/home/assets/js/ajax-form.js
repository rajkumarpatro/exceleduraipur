(function ($) {
    "use strict";

    // AJAX Form Submit
    $("form.ajax-form").on("submit", function (e) {
        e.preventDefault();

        var form = $(this);
        var actionUrl = form.attr("action");
        var method = form.attr("method") || "POST";

        $.ajax({
            type: method,
            url: actionUrl,
            data: form.serialize(),
            beforeSend: function () {
                form.find("button[type=submit]").prop("disabled", true);
            },
            success: function (response) {
                // agar success response aya
                alert("Form submitted successfully!");
                console.log(response);
                form[0].reset();
            },
            error: function (xhr, status, error) {
                // agar error aya
                alert("Something went wrong! Please try again.");
                console.error(error);
            },
            complete: function () {
                form.find("button[type=submit]").prop("disabled", false);
            }
        });
    });

})(jQuery);