function Component(id, name, weight, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
    this.weight = weight;

    this.dom = document.createElement('div');
    this.dom.setAttribute('class', 'component');

    /*var componentIdHtml = document.createElement('span');
    componentIdHtml.setAttribute('class', 'component-id');
    componentIdHtml.textContent = id;*/

    var componentNameHtml = document.createElement('span');
    componentNameHtml.setAttribute('class', 'component-name');
    componentNameHtml.textContent = name;

    var componentDescriptionHtml = document.createElement('span');
    componentDescriptionHtml.setAttribute('class', 'component-description');
    componentDescriptionHtml.textContent = weight + 'g (' + calories + 'c/100g)';

    /*this.dom.appendChild(componentIdHtml);*/
    this.dom.appendChild(componentNameHtml);
    this.dom.appendChild(componentDescriptionHtml);
}
Component.prototype.getDom = function(){
    return this.dom;
}