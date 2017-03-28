var app = document.getElementsByClassName('calories-app')[0];
var appFind = document.querySelector('.app-find');
var appAdd = document.querySelector('.app-add');

var select = document.getElementsByClassName('app-select')[0];
var loading = document.getElementsByClassName('app-loading')[0];

var selectFind = document.getElementsByClassName('select-btn--find');
var selectAdd = document.getElementsByClassName('select-btn--add');
var linkMain = document.getElementsByClassName('navigation-list--main')[0];

var openMain = function (){
    $(select).addClass('app-select--close');
    $(appFind).addClass('app-find--close');
    $(appAdd).addClass('app-add--close');
    $(loading).removeClass('app-loading--close');
    
    setTimeout(function(){
        $(loading).addClass('app-loading--close');
        $(select).removeClass('app-select--close');
    }, 500);
}

for (var i = 0; i < selectFind.length; i++){
    selectFind[i].addEventListener('click', function(){
        $(select).addClass('app-select--close');
        $(loading).removeClass('app-loading--close');
        setTimeout(function(){
            $(loading).addClass('app-loading--close');
            $(appFind).removeClass('app-find--close');
        }, 500);
    });
}

for (var i = 0; i < selectAdd.length; i++){
    selectAdd[i].addEventListener('click', function(){
        $(select).addClass('app-select--close');
        $(loading).removeClass('app-loading--close');
        setTimeout(function(){
            $(loading).addClass('app-loading--close');
            $(appAdd).removeClass('app-add--close');
        }, 500);
    });
}

linkMain.addEventListener('click', openMain);

function initToolbar(){

    

    //var appAddControlComponents = getControlComponents(appAdd);
   
}
initToolbar();

//function initAppFind(){
    var toolbar = new Toolbar(appFind);
    var control = toolbar.control;
    var itemList = new ItemList(appFind);
    
    findDish(itemList, toolbar.getItem());
    getComponents(toolbar);
	control.addEventListener('click', function(){
		var dish = toolbar.getItem();
		findDish(itemList, dish);
	});
//}
//initAppFind();

function initAppAdd(){
    var toolbar = new Toolbar(appAdd);
    var control = toolbar.control;
    var itemList = new ItemList(appAdd);

    getComponents(toolbar);
    control.addEventListener('click', function(){
        var dish = toolbar.getItem();
        addDish(itemList, dish);
    });
}
initAppAdd();

