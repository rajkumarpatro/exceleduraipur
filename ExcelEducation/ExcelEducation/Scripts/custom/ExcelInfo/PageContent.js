$(document).ready(function () {


    // on load 
    PageContents(firstTopicID);

    //add new topic (opens topic view)
    $(document).on('click', '#lnk_topicdetails', function () {
        debugger;
        var topicid = $(this).attr("data-topicid");
        PageContents(topicid);
    });

    function PageContents(topicid) {
        $.ajax({
            url: LoadPageContent + "?topicid=" + topicid,
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
});
