function SelectFile(parent){
    this.fileInput = parent.querySelector('.file_select');

    this.fileLabel = parent.querySelector('.select_file-btn');

    this.fileReset = parent.querySelector('.select_file-reset');

    var that = this;
    this.fileInput.addEventListener('change', function(){
        var file = that.fileInput.files[0];
        if (file.size > 2097152){
            that.fileInput.value = '';
            that.fileLabel.innerHTML = 'Max size: 2mb';
        }
        else if(file.name == ''){
            that.fileInput.value = '';
            that.fileLabel.innerHTML = 'Add Image';
        }
        else{
            that.fileLabel.innerHTML = file.name;
        }
    });

    this.fileReset.addEventListener('click', function(){
        that.fileInput.value = '';
        that.fileLabel.innerHTML = 'Add Image';
    });
}

var fileSelects = document.querySelectorAll('.select_file');

for (var i = 0; i < fileSelects.length; i++){
    new SelectFile(fileSelects[i]);    
}




