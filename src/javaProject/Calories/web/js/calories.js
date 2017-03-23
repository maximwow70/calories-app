var app = document.getElementsByClassName('calories-app')[0];
var select = document.getElementsByClassName('calories-select')[0];
var loading = document.getElementsByClassName('calories-loading')[0];
var selectFind = document.getElementsByClassName('select-btn--find');
var linkMain = document.getElementsByClassName('link--main')[0];

var openMain = function (){
    console.log('lox');
    $(select).addClass('calories-select--close');
    $(app).addClass('calories-app--close');
    $(loading).removeClass('calories-loading--close');
    
    console.log('lox2');
    setTimeout(function(){
        $(loading).addClass('calories-loading--close');
        $(select).removeClass('calories-select--close');
    }, 500);
}

for (var i = 0; i < selectFind.length; i++){
    selectFind[i].addEventListener('click', function(){
        $(select).addClass('calories-select--close');
        $(loading).removeClass('calories-loading--close');
        setTimeout(function(){
            $(loading).addClass('calories-loading--close');
            $(app).removeClass('calories-app--close');
        }, 500);
    });
}

linkMain.addEventListener('click', openMain);



