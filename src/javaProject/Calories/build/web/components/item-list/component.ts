export class Component{
    public name: string;

    constructor(id: any, name: any, weight: any, calories: any, img: any) {

    }
}
/*
function Component(id: any, name: any, weight: any, calories: any, img: any){
    this.id = id;
    this.name = name;
    this.calories = calories;
    this.weight = weight;
    this.img = img;
    this.path = './img/components/' + this.img;

    this.dom = document.createElement('div');
    
    this.dom.setAttribute('class', 'component');

    
    if (this.img){
        var componentImg = document.createElement('img');
        componentImg.setAttribute('class', 'component-img');
        componentImg.setAttribute('src', this.path);
        this.dom.appendChild(componentImg);
    }

    var componentNameHtml = document.createElement('span');
    componentNameHtml.setAttribute('class', 'component-name');
    componentNameHtml.textContent = name;

    var componentDescriptionHtml = document.createElement('span');
    componentDescriptionHtml.setAttribute('class', 'component-description');
    componentDescriptionHtml.textContent = weight + 'g (' + calories + 'c/100g)';

    this.dom.appendChild(componentNameHtml);
    this.dom.appendChild(componentDescriptionHtml);
}
Component.prototype.getDom = function(){
    return this.dom;
}
*/