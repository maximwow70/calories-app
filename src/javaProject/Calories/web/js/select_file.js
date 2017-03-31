var fileSelect = document.querySelector('.select_file');

var fileInput = fileSelect.querySelector('.file_select');

var fileLabel = fileSelect.querySelector('.select_file-btn');

var fileReset = fileSelect.querySelector('.select_file-reset');


fileInput.addEventListener('change', function(){
    var file = fileInput.files[0];
    if (file.size > 2097152){
        fileInput.value = '';
        fileLabel.innerHTML = 'Max size: 2mb';
    }
    else if(file.name == ''){
        fileInput.value = '';
        fileLabel.innerHTML = 'Add Image';
    }
    else{
        fileLabel.innerHTML = file.name;
    }
});

fileReset.addEventListener('click', function(){
    fileInput.value = '';
    fileLabel.innerHTML = 'Add Image';
});


