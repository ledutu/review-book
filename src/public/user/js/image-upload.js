function readURL(input, number) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $('.image-upload-wrap-'+number).hide();

            $('.file-upload-image-'+number).attr('src', e.target.result);
            $('.file-upload-content-'+number).show();

            $('.image-title-'+number).html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);

    } else {
        removeUpload(number);
    }
}

function removeUpload(number) {
    $('.file-upload-input-'+number).replaceWith($('.file-upload-input-'+number).clone());
    $('.file-upload-content-'+number).hide();
    $('.image-upload-wrap-'+number).show();
}
$('.image-upload-wrap-1').bind('dragover', function () {
    $('.image-upload-wrap-1').addClass('image-dropping');
});
$('.image-upload-wrap-1').bind('dragleave', function () {
    $('.image-upload-wrap-1').removeClass('image-dropping');
});

$('.image-upload-wrap-2').bind('dragover', function () {
    $('.image-upload-wrap-2').addClass('image-dropping');
});
$('.image-upload-wrap-2').bind('dragleave', function () {
    $('.image-upload-wrap-2').removeClass('image-dropping');
});

$('.image-upload-wrap-3').bind('dragover', function () {
    $('.image-upload-wrap-3').addClass('image-dropping');
});
$('.image-upload-wrap-3').bind('dragleave', function () {
    $('.image-upload-wrap-3').removeClass('image-dropping');
});