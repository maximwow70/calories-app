var selectFind = document.querySelectorAll('.select-btn--find');
var selectAdd = document.querySelectorAll('.select-btn--add');
var selectSearc = document.querySelectorAll('.navigation-list--search');
var selectMain = document.querySelectorAll('.navigation-list--main');
var selectAbout = document.querySelectorAll('.navigation-list--about');

var app = new App();
var server = new Server();

function openSelect(){
    app.openSelect();
}
function openFind(){
    app.openFind();
}
function openAdd(){
    app.openAdd();
}
function openAbout(){
    app.openAbout();
}
function openSearch(){
    app.openSearch();
}
for (var i = 0; i < selectMain.length; i++){
    selectMain[i].addEventListener('click', openSelect);
}
for (var i = 0; i < selectFind.length; i++){
    selectFind[i].addEventListener('click', openFind);
}
for (var i = 0; i < selectAdd.length; i++){
    selectAdd[i].addEventListener('click', openAdd);
}
for (var i = 0; i < selectSearc.length; i++){
    selectSearc[i].addEventListener('click', openSearch);
}
for (var i = 0; i < selectAbout.length; i++){
    selectAbout[i].addEventListener('click', openAbout);
}

function initAppFind(){
    var appFind = app.getAppFind();
    var toolbar = new Toolbar(appFind);
    var control = toolbar.control;
    var itemList = new ItemList(appFind);
    
    server.findDish(itemList, toolbar.getItem());
    server.getComponents(toolbar);
	control.addEventListener('click', function(){
		var dish = toolbar.getItem();
		server.findDish(itemList, dish);
	});
}
initAppFind();

function initAppAdd(){
    var appAdd = app.getAppAdd();
    var toolbar = new Toolbar(appAdd);
    var control = toolbar.control;
    var itemList = new ItemList(appAdd);

    server.getComponents(toolbar);
    control.addEventListener('click', function(){
        //appAdd.openAdd();
        var dish = toolbar.getItem();
        server.addDish(itemList, dish);
    });
}
initAppAdd();

function initAppSearch(){
    var appSearch = app.getAppSearch();

}
initAppSearch();