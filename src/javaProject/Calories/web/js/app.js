function App(){
    this.dom = document.querySelector('.app');

    this.select = this.dom.querySelector('.app-select');
    this.appFind = this.dom.querySelector('.app-find');
    this.appAdd = this.dom.querySelector('.app-add');
    this.appSearch = this.dom.querySelector('.app-search');
    this.appView = this.dom.querySelector('.app-view');
    this.about = this.dom.querySelector('.app-about');
    this.loading = this.dom.querySelector('.app-loading');
}
App.prototype.closeAll = function(){
    $(this.select).addClass('app-select--close');
    $(this.appFind).addClass('app-find--close');
    $(this.appAdd).addClass('app-add--close');
    $(this.appSearch).addClass('app-search--close');
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
App.prototype.getAppView = function(){
    return this.appView;
}
