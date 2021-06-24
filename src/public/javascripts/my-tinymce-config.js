tinymce.init({
    selector: 'textarea#editor',
    height: 500,
    menubar: true,
    plugins: [
        'advlist autolink lists link image imagetools charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
    ],
    imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
    images_upload_handler: example_image_upload_handler
});

function example_image_upload_handler (blobInfo, success, failure, progress) {
    let data = new FormData();
    data.append('file', blobInfo.blob(), blobInfo.filename());
    axios.post('/user/upload-image', data)
    .then(function (res) {
        console.log(res)
        // success(res.data.location);
    })
    .catch(function (err) {
        // failure('HTTP Error: ' + err.message);
    });
};