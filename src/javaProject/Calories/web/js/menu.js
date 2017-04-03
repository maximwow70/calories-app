function Menu(parent){
    this.dom = parent.querySelector('.menu');
    this.controls = [
        this.dom.querySelector('.menu-title'),
        this.dom.querySelector('.menu-btn')
    ]

    this.innerMenus = [
        this.dom
    ];


    var that = this;

    var controls = this.controls;
    for (var i = 0; i < this.controls.length; i++){
        this.controls[i].addEventListener('click', function(){
            $(that.dom).toggleClass('menu--click');
        });
    }

    var innerMenus = this.dom.querySelectorAll('.menu');
    for (var i = 0; i < innerMenus.length; i++){
        this.innerMenus.push(innerMenus[i]);
        var menu = new Menu(this.innerMenus[i]);
    }
}
Menu.prototype.getDom = function(){
    return this.dom;
}

var a = document.querySelector('.toolbar-menu');
var menu = new Menu(a);
