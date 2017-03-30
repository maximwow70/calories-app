var fileSelect = document.querySelector('.select_file');

var fileInput = fileSelect.querySelector('.file_select');

var fileLabel = fileSelect.querySelector('.select_file-btn');

var fileReset = fileSelect.querySelector('.select_file-reset');


fileInput.addEventListener('change', function(){
    var file = fileInput.files[0];
    if (file.name != ''){
        fileLabel.innerHTML = file.name;
    }
    else{
        fileLabel.innerHTML = 'Add Image';
    }
});

fileReset.addEventListener('click', function(){
    fileInput.value = '';
    fileLabel.innerHTML = 'Add Image';
});


