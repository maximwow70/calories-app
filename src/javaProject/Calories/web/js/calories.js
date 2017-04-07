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

    // init action
    var itemList = appFind.querySelector('.app-item_list');
    var loading = appFind.querySelector('.app-loading');
    server.onfind = function(){
        $(loading).addClass('app-loading--close');
        $(itemList).removeClass('app-item_list--close');
    }
	control.addEventListener('click', function(){
        $(itemList).addClass('app-item_list--close');
        $(loading).removeClass('app-loading--close');
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
        var dish = toolbar.getItem();
        server.addDish(itemList, dish);
    });
}
initAppAdd();

function initAppSearch(){
    var appSearch = app.getAppSearch();
    var toolbar = new Toolbar(appSearch);
    var control = toolbar.control;
    var info = new Info(appSearch);

    server.getFullComponents(toolbar, info);

    toolbar.oncreatemenu = function(){
        this.menu.dom.addEventListener('click', function(){
            var clickedElem = event.target;
            if (clickedElem.classList.value.indexOf('menu-list') + 1){
                var name = clickedElem.innerHTML;
                server.getInfo(info, name);
            }
        });
    }
}
initAppSearch();

//function initCalculator() {
    var calculator = new Calculator();

    var appCalculator = app.getAppCalculator();
    var info = new Info(appCalculator, 'Total Calories:');

    var toolbar = new Toolbar(appCalculator);
    var control = toolbar.control;

    server.getComponents(toolbar);

    function calculateCalories(){
        var components = toolbar.getItemComponents();

        var calories = [];
        for (var i = 0; i < components.length; i++){
            var calori = 1;
            for (var j = 0; j < toolbar.components.length; j++) {
                if (toolbar.components[j].name == components[i].name) {
                    calori = toolbar.components[j].calories;
                }
            }
            calories.push(components[i].weight * calori / 100);
        }

        var totalCalories = calculator.sumOfArray(calories);
        info.setInfo('Total Calories:', totalCalories);
    }

    
    toolbar.onaddselect = function(){
        var toolbarSelects = this.getDom().querySelectorAll('.toolbar-select');
        for (var i = 0; i < toolbarSelects.length; i++){
            toolbarSelects[i].addEventListener('input', calculateCalories);
        }
    }
    toolbar.onaddselect();
    control.addEventListener('click', calculateCalories);
    
//}
//initCalculator();

/*
    'Clown Fish',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Magni magnam, enim odit cumque quaerat iure id sequi doloribus, et error.',
    'calories: (666c/100g)',
    'clown-fish.svg'
*/

/*
toolbar.initComponents([
		{name: 'apple', calories: 100},
		{name: 'coca-cola', calories: 200},
		{name: 'pie', calories: 300},
		{name: 'cherries', calories: 50},
		{name: 'ice', calories: 10},
		{name: 'tomatoes', calories: 666},
	])
*/
