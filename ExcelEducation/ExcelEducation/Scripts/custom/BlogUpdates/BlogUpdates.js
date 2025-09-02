$(document).ready(function () {
    loadBlogs();

    // Save Blog
    $("#frm_BlogUpdates").on("submit", function (e) {
        e.preventDefault();
        var formData = new FormData(this);

        $.ajax({
            url: SaveOrUpdateBlog,
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                if (res.success) {
                    alert(res.message);
                    $("#blogGridTable").DataTable().ajax.reload();
                    $("#frm_BlogUpdates")[0].reset();
                } else {
                    alert(res.message);
                }
            }
        });
    });
});

function loadBlogs() {
    $("#blogGridTable").DataTable({
        ajax: {
            url: LoadBlogs,
            type: "GET",
            dataSrc: "data"
        },
        columns: [
            { data: "Id", title: "ID" },
            { data: "Category", title: "Category" },
            { data: "PublishedDate", title: "Published Date" },
            { data: "Title", title: "Title" },
            { data: "A_Name", title: "Author" },
            {
                data: "Id",
                render: function (data) {
                    return `<button class="btn btn-sm btn-primary" onclick="editBlog(${data})">Edit</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteBlog(${data})">Delete</button>`;
                }
            }
        ]
    });
}
