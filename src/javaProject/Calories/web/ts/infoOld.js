function Info(parent, title, content, description, img){
    this.dom = parent.querySelector('.info');

    this.title = title;
    this.content = content;
    this.description = description;
    this.img = img;
    this.path = './img/components/' + img;

    this.initInfo();
}
Info.prototype.setEmpty = function(){
    this.dom.innerHTML = '';
}
Info.prototype.initInfo = function(){
    if (this.img){
        var img = document.createElement('img');
        img.setAttribute('class', 'info-img');
        img.setAttribute('src', this.path);
        this.dom.appendChild(img);
    }

    this.setTitle(this.title);

    if (this.description){
        var description = document.createElement('h3');
        description.setAttribute('class', 'info-description');
        description.innerHTML = this.description;
        this.dom.appendChild(description);
    }

    this.setContent(this.content);
}
Info.prototype.setInfo = function(title, content, description, img){
    this.title = title;
    this.content = content;
    this.description = description;
    this.img = img;
    //var path = this.path;
    this.path = './img/components/' + this.img + '';

    this.setEmpty();
    this.initInfo();
}
Info.prototype.setTitle = function(title) {
    this.title = title;

    if (title){
        var titleDom = this.dom.querySelector('.info-title');
        if (!titleDom){
            titleDom = document.createElement('h2');
            titleDom.setAttribute('class', 'info-title');
            this.dom.appendChild(titleDom);
        }
        titleDom.innerHTML = this.title;
    }
}
Info.prototype.setContent = function(content) {
    this.content = content;

    if (content) {
        var contentDom = this.dom.querySelector('.info-content');
        if (!contentDom) {
            contentDom = document.createElement('p');
            contentDom.setAttribute('class', 'info-content');
            this.dom.appendChild(contentDom);
        }
        contentDom.innerHTML = this.content;
    }
}
Info.prototype.setContentUsial = function(){
    var content = this.dom.querySelector('.info-content');
}
Info.prototype.setContentImportant = function(importance){
    var content = this.dom.querySelector('.info-content');

    try{
        if (importance == 1) {
            content.style.color = '#22bf65';
        }
        else if (importance == 2) {
            content.style.color = '#fff568';
        }
        else if (importance == 3) {
            content.style.color = '#f72f5f';
        }
    }
    catch (e) {
        
    }
}

/*
var a = new Info(
    document.querySelector('.app-search'),
    'Clown Fish',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Magni magnam, enim odit cumque quaerat iure id sequi doloribus, et error.',
    'calories: (666c/100g)',
    'clown-fish.svg'
);
*/