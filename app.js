var control = document.getElementById("lectureVideo");
control.addEventListener("change", function(event) {

    // When the control has changed, there are new files

    var i = 0,
        files = control.files,
        len = files.length;


        console.log("File Type: " + files[i].type);

    const mimeType = files[i].type.substring(0, 5);
    console.log(mimeType);

    // If invalid file type
    if(mimeType !== 'video')
    {
        $('#fileTypeErrorAlert').show();
        $('#fileTypeErrorAlert').removeAttr('hidden');

        // disable the submit button
        $("#submitButton").prop("disabled", true);
    }
    else
    {
        $('#fileTypeErrorAlert').hide();

        // Enable submit button
        $("#submitButton").prop("disabled", false);
    }

}, false);


// Upload image using AJAX
$('form#imageUploadForm').submit(function (event) {
    //stop the form submitting automatically
    event.preventDefault();

    // disable the submit button
    $("#submitButton").prop("disabled", true);

    // Show progress bar
    $('#progressBarModal').modal('show');

    // Create a FormData object
    const formData = new FormData($(this)[0]);

    // Submit form
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "http://localhost:5000/api/video",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        xhr: function () {
            const xhr = new XMLHttpRequest();

            // Add progress event listener to the upload.
            xhr.upload.addEventListener('progress', function (event) {
                const progressBar = $('.progress-bar');

                // Change progress bar values
                if (event.lengthComputable) {
                    const percent = (event.loaded / event.total) * 100;
                    progressBar.width(percent + '%');
                }
            });

            return xhr;
        },
        success: function(response) {
            console.log("response");
            console.log(response);
            if(response.success===true)
            {
                $('#successModal').modal('show');
            }
            else
            {
                $('#progressBarModal').modal('hide');

                $('#failedModal').modal('show');

                // Enable submit button
                $("#submitButton").prop("disabled", false);
            }

            // Enable submit button
            $("#submitButton").prop("disabled", false);
        },
        error: function (err) {
            console.log(err);
            $('#progressBarModal').modal('hide');

            $('#failedModal').modal('show');

            // Enable submit button
            $("#submitButton").prop("disabled", false);
        }
    });

});

function reloadPage()
{
    window.location.reload();
}

$(document).on("change", "#lectureVideo", function(evt) {
    const $source = $('#videoPreview');
    $source[0].src = URL.createObjectURL(this.files[0]);
    $source.parent()[0].load();

    $('#lectureVideoPreview').removeAttr('hidden');
});

