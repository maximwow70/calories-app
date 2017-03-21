var app = document.getElementsByClassName('calories-app')[0];
var select = document.getElementsByClassName('calories-select')[0];
var loading = document.getElementsByClassName('calories-loading')[0];
var selectFind = document.getElementsByClassName('select-btn--find');
for (var i = 0; i < selectFind.length; i++){
    selectFind[i].addEventListener('click', function(){
        $(select).addClass('calories-select--close');
        $(loading).removeClass('calories-loading--close');
        setTimeout(function(){
            $(loading).addClass('calories-loading--close');
            $(app).removeClass('calories-app--close');
        }, 2000);
    });
}