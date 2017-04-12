function App(){
    this.dom = document.querySelector('.app');


    this.select = this.dom.querySelector('.app-select');
    
    // items
    this.appFind = this.dom.querySelector('.app-find');
    this.appAdd = this.dom.querySelector('.app-add');

    // components
    this.appSearch = this.dom.querySelector('.app-search');
    this.appAddComponent = this.dom.querySelector('.app-add_component');
    
    this.appCalculator = this.dom.querySelector('.app-calculator');
    this.appUser = this.dom.querySelector('.app-user');
    this.appView = this.dom.querySelector('.app-view');
    this.about = this.dom.querySelector('.app-about');
    this.loading = this.dom.querySelector('.app-loading');

    this.initControls();

}
App.prototype.initControls = function() {
    var that = this;

    this.selectMain = document.querySelectorAll('.navigation-list--main');
    function openSelect(){
        that.openSelect();
    }
    for (var i = 0; i < this.selectMain.length; i++){
        this.selectMain[i].addEventListener('click', openSelect);
    }

    this.selectFind = document.querySelectorAll('.select-btn--find');
    function openFind(){
        that.openFind();
    }
    for (var i = 0; i < this.selectFind.length; i++){
        this.selectFind[i].addEventListener('click', openFind);
    }

    this.selectAdd = document.querySelectorAll('.select-btn--add');
    function openAdd(){
        that.openAdd();
    }
    for (var i = 0; i < this.selectAdd.length; i++){
        this.selectAdd[i].addEventListener('click', openAdd);
    }

    this.selectSearch = document.querySelectorAll('.navigation-list--search');
    function openSearch(){
        that.openSearch();
    }
    for (var i = 0; i < this.selectSearch.length; i++){
        this.selectSearch[i].addEventListener('click', openSearch);
    }

    this.selectAddComponent = document.querySelectorAll('.navigation-list--add');
    function openAddComponent(){
        that.openAddComponent();
    }
    for (var i = 0; i < this.selectAddComponent.length; i++){
        this.selectAddComponent[i].addEventListener('click', openAddComponent);
    }


    this.selectCalculator = document.querySelectorAll('.navigation-list--calculate');
    function openCalculator(){
        that.openCalculator();
    }
    for (var i = 0; i < this.selectCalculator.length; i++){
        this.selectCalculator[i].addEventListener('click', openCalculator);
    }

    this.selectUser = document.querySelectorAll('.navigation-list--user');
    function openUser(){
        that.openUser();
    }
    for (var i = 0; i < this.selectUser.length; i++){
        this.selectUser[i].addEventListener('click', openUser);
    }

    this.selectAbout = document.querySelectorAll('.navigation-list--about');
    function openAbout(){
        that.openAbout();
    }
    for (var i = 0; i < this.selectAbout.length; i++){
        this.selectAbout[i].addEventListener('click', openAbout);
    }
}
App.prototype.closeAll = function(){
    $(this.select).addClass('app-select--close');
    $(this.appUser).addClass('app-user--close');
    $(this.appFind).addClass('app-find--close');
    $(this.appAdd).addClass('app-add--close');
    $(this.appSearch).addClass('app-search--close');
    $(this.appAddComponent).addClass('app-add_component--close');
    $(this.appCalculator).addClass('app-calculator--close');
    $(this.appView).addClass('app-view--close');
    $(this.about).addClass('app-about--close');
    $(this.loading).removeClass('app-loading--close');
}
App.prototype.openSelect = function(){
    var that = this;
    that.closeAll();
    setTimeout(function(){
        $(that.loading).addClass('app-loading--close');
        $(that.select).removeClass('app-select--close');
    }, 500);
}
App.prototype.openFind = function(){
    var that = this;
    that.closeAll();
    setTimeout(function(){
        $(that.loading).addClass('app-loading--close');
        $(that.appFind).removeClass('app-find--close');
    }, 500);
}
App.prototype.openAdd = function(){
    var that = this;
    that.closeAll();
    setTimeout(function(){
        $(that.loading).addClass('app-loading--close');
        $(that.appAdd).removeClass('app-add--close');
    }, 500);
}
App.prototype.openAbout = function(){
    var that = this;
    that.closeAll();
    setTimeout(function(){
        $(that.loading).addClass('app-loading--close');
        $(that.about).removeClass('app-about--close');
    }, 500);
}
App.prototype.openSearch = function(){
    var that = this;
    that.closeAll();
    setTimeout(function(){
        $(that.loading).addClass('app-loading--close');
        $(that.appSearch).removeClass('app-search--close');
    }, 500);
}
App.prototype.openAddComponent = function(){
    var that = this;
    that.closeAll();
    setTimeout(function(){
        $(that.loading).addClass('app-loading--close');
        $(that.appAddComponent).removeClass('app-add_component--close');
    }, 500);
}
App.prototype.openCalculator = function(){
    var that = this;
    that.closeAll();
    setTimeout(function(){
        $(that.loading).addClass('app-loading--close');
        $(that.appCalculator).removeClass('app-calculator--close');
    }, 500);
}
App.prototype.openUser = function(){
    var that = this;
    that.closeAll();
    setTimeout(function(){
        $(that.loading).addClass('app-loading--close');
        $(that.appUser).removeClass('app-user--close');
    }, 500);
}
App.prototype.openView = function(){
    var that = this;
    that.closeAll();
    setTimeout(function(){
        $(that.loading).addClass('app-loading--close');
        $(that.appView).removeClass('app-view--close');
    }, 500);
}
App.prototype.getAppFind = function(){
    return this.appFind;
}
App.prototype.getAppAdd = function(){
    return this.appAdd;
}
App.prototype.getAppSearch = function(){
    return this.appSearch;
}
App.prototype.getAppCalculator = function(){
    return this.appCalculator;
}
App.prototype.getAppView = function(){
    return this.appView;
}
App.prototype.getAppAddComponent = function(){
    return this.appAddComponent;
}
App.prototype.getAllControls = function(){
    return {
        main: this.selectMain,
        find: this.selectFind,
        add: this.selectAdd,
        search: this.selectSearch,
        addComponent: this.selectAddComponent,
        calculator: this.selectCalculator,
        user: this.selectUser,
        about: this.selectAbout,
    }
}
