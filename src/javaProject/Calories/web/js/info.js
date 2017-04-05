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

    var title = document.createElement('h2');
    title.setAttribute('class', 'info-title');
    if (this.title){
        title.innerHTML = this.title;
    }
    else {
        title.innerHTML = 'something get trouble :c';
    }
    this.dom.appendChild(title);

    if (this.description){
        var description = document.createElement('h3');
        description.setAttribute('class', 'info-description');
        description.innerHTML = this.description;
        this.dom.appendChild(description);
    }

    if (this.content){
        var content = document.createElement('p');
        content.setAttribute('class', 'info-content');
        content.innerHTML = this.content;
        this.dom.appendChild(content);
    }
}
Info.prototype.setInfo = function(title, content, description, img){
    this.title = title;
    this.content = content;
    this.description = description;
    this.img = img;

    this.setEmpty();
    this.initInfo();
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