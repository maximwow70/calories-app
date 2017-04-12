var app = new App();
var server = new Server();

var links = app.getAllControls();

//function initUser(){ 
    var user = new User(
        document.querySelector('.user'),
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        0,
        [
            {
                name: 'apple pie',
                components: [
                    {
                        id: 1,
                        name: 'pie',
                        weight: 666,
                        calories: 300
                    },
                    {
                        id: 2,
                        name: 'apple',
                        weight: 666,
                        calories: 100
                    },
                    {
                        id: 3,
                        name: 'cream',
                        weight: 666,
                        calories: 500
                    },
                    {
                        id: 3,
                        name: 'cream',
                        weight: 666,
                        calories: 500
                    }
                ],
                weight: 100,
                calories: 666,
                src: 'dish3.jpg'
            },
            {
                name: 'apple pie',
                components: [
                    {
                        id: 1,
                        name: 'pie',
                        weight: 666,
                        calories: 300
                    },
                    {
                        id: 2,
                        name: 'apple',
                        weight: 666,
                        calories: 100
                    },
                    {
                        id: 3,
                        name: 'cream',
                        weight: 666,
                        calories: 500
                    },
                    {
                        id: 3,
                        name: 'cream',
                        weight: 666,
                        calories: 500
                    }
                ],
                weight: 100,
                calories: 666,
                src: 'dish4.jpg'
            },
            {
                name: 'apple pie',
                components: [
                    {
                        id: 1,
                        name: 'pie',
                        weight: 666,
                        calories: 300
                    },
                    {
                        id: 2,
                        name: 'apple',
                        weight: 666,
                        calories: 100
                    },
                    {
                        id: 3,
                        name: 'cream',
                        weight: 666,
                        calories: 500
                    },
                    {
                        id: 3,
                        name: 'cream',
                        weight: 666,
                        calories: 500
                    }
                ],
                weight: 100,
                calories: 666,
                src: 'dish3.jpg'
            }
        ]
    );

    var ra = user._registrationAssistant;
    var sia = user._signInAssistant;
    ra.onsubmit = function(){
        var regUser = ra.getUser()
        server.addUser(regUser, user);
    }   
    sia.onsubmit = function(){
        var inUser = sia.getUser();
        server.signInUser(inUser, user);
    }
//}
//initUser();

function findItem(){
    var appFind = app.getAppFind();
    var toolbarFind = new Toolbar(appFind);
    var controlFind = toolbarFind.control;
    var itemListFind = new ItemList(appFind);

    for (var i = 0; i < links.find.length; i++){
        links.find[i].addEventListener('click', initAppFind);
    }

    controlFind.addEventListener('click', function(){
        var dish = toolbarFind.getItem();
        server.findDish(itemListFind, dish);
    });

    function initAppFind(){
        server.findDish(itemListFind, toolbarFind.getItem());
        server.getComponents(toolbarFind);
    }
    initAppFind();
}
findItem();

function addItem(){
    for (var i = 0; i < links.add.length; i++){
        links.add[i].addEventListener('click', initAppAdd);
    }
    var appAdd = app.getAppAdd();
    var toolbar = new Toolbar(appAdd);
    var control = toolbar.control;
    var itemList = new ItemList(appAdd);
    control.addEventListener('click', function(){
        var dish = toolbar.getItem();
        server.addDish(itemList, user, dish);
    });
    function initAppAdd(){
        server.getComponents(toolbar);
    }
    initAppAdd();
}
addItem();

function searchComponents(){

    for (var i = 0; i < links.search.length; i++){
        links.search[i].addEventListener('click', initAppSearch);
    }

    var appSearch = app.getAppSearch();
    var toolbar = new Toolbar(appSearch);
    var control = toolbar.control;
    var info = new Info(appSearch);
    info.setTitle('Search components and enjoy');

    function initAppSearch(){

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
}
searchComponents();

function addComponents(){
    var appAddComponents = app.getAppAddComponent();
    var toolbar = new Toolbar(appAddComponents);
    var control = toolbar.control;
    var info = new Info(appAddComponents, 'Add new components', 'People can use them in their dishes!');

    function initAppAddComponents(){
        control.addEventListener('click', function(){
            var component = toolbar.getNewComponent();
            server.addComponent(info, user, component);
        });
    }
    initAppAddComponents();
}
addComponents();

function calculateCalories(){

    var calculator = new Calculator();

    var appCalculator = app.getAppCalculator();
    var info = new Info(appCalculator, 'Total Calories:');

    var toolbar = new Toolbar(appCalculator);
    var control = toolbar.control;

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
        info.setContent(totalCalories);
        if (totalCalories <= 500){
            info.setContentImportant(1);
        }
        else if (totalCalories <= 1800){
            info.setContentImportant(2);
        }
        else if (totalCalories <= 100000){
            info.setContentImportant(3);
        }
        else {
            info.setContent('Too much..');
        }
    }

    toolbar.onaddselect = function(){
        var toolbarSelects = this.getDom().querySelectorAll('.toolbar-select');
        for (var i = 0; i < toolbarSelects.length; i++){
            toolbarSelects[i].addEventListener('input', calculateCalories);
        }
    }
    toolbar.onaddselect();
    control.addEventListener('click', calculateCalories);  
      
    function initCalculator() {
        server.getComponents(toolbar);
    }
    initCalculator();

    for (var i = 0; i < links.calculator.length; i++){
        links.calculator[i].addEventListener('click', initCalculator);
    }
}
calculateCalories();


