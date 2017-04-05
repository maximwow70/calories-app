function Menu(parent, menuList, callback) {
    this.parent = parent;
    this.dom;
    this.controls = [];

    this.callback = callback;

    if(menuList){
        this.initMenu(menuList);
    }
}
Menu.prototype.initControls = function(menu, controls){
    for (var i = 0; i < controls.length; i++) {
        controls[i].addEventListener('click', function () {
            $(menu).toggleClass('menu--click');
        });
    }
    
}
Menu.prototype.initAllLinks = function(callback){
    var menuControls = this.getAllLinks();

    for (var i = 0; i < menuControls.length; i++){
        menuControls[i].addEventListener('click', function(){
            var component = this.textContent;
            this.callback(component);
        });
    }
}
Menu.prototype.initMenu = function(menuList) {
    this.dom =  document.createElement('div');
    this.dom.setAttribute('class', 'menu_list');
    for (var i = 0; i < menuList.length; i++){
        var category = menuList[i].type;
        var lists = menuList[i].components;

        var menu = document.createElement('div');
        menu.setAttribute('class', 'menu');
            var menuControl = document.createElement('div');
            menuControl.setAttribute('class', 'menu-control');

            var menuTitle = document.createElement('a');
            menuTitle.setAttribute('class', 'menu-title');
            menuTitle.innerHTML = category + '';
            menuTitle.setAttribute('value', category);

            var menuBtn = document.createElement('a');
            menuBtn.setAttribute('class', 'menu-btn fa fa-plus');

            menuControl.appendChild(menuTitle);
            menuControl.appendChild(menuBtn);

        menu.appendChild(menuControl);
        this.initControls(menu, [
            menuTitle,
            menuBtn
        ]);
            
        var menuGroup = document.createElement('div');
        menuGroup.setAttribute('class', 'menu-group');

            for (var j = 0; j < lists.length; j++){
                var list = document.createElement('a');
                list.setAttribute('class', 'menu-list');
                list.textContent = lists[j] + '';
                list.setAttribute('value', lists[j]);
                menuGroup.appendChild(list);
            }
        menu.appendChild(menuGroup);
        
        this.dom.appendChild(menu);
    }
    this.parent.appendChild(this.dom);

    this.initAllLinks();
}
Menu.prototype.getAllLinks = function(){
    return this.dom.querySelectorAll('.menu-list');
}
Menu.prototype.getDom = function () {
    return this.dom;
}

/*
var par = document.querySelector('.toolbar-menu');
var menu1 = new Menu(
    par,
    [
        {
            type: 'fish',
            components: [
                'fish1',
                'fish2 Lorem ipsum dolor sit amet',
                'fish3',
                'fish4',
                'fish5 , consectetur adipisicing elit.',
                'fish6'
            ]
        },
        {
            type: 'Fruits',
            components: [
                'fruit1',
                'fruit2',
                'fruit3',
                'fruit4',
                'fruit5',
                'fruit6',
                'fruit7',
                'fruit8',
                'fruit9',
                'fruit10'
            ]
        },
        {
            type: 'Eggs',
            components: [
                'Eggs1',
                'Eggs2',
                'Eggs3',
                'Eggs4'
            ]
        },
        {
            type: 'Pokemons',
            components: [
                'Squirtle',
                'Rattata',
                'Charmander',
                'Venusaur',
                'Zubat',
                'Wooper',
                'Bulbasaur',
                'Pidgeotto',
                'Lotad'
            ]
        }
    ]
);
*/