function ItemList(parent, _items, _title){
    this.items = _items;
    this.title = _title;
    this.dom = parent.querySelector('.item_list');

    if (title != ""){
        var title = document.createElement('h3');
        title.setAttribute('class', 'item_list-title');
        title.textContent = this.title;
        this.dom.appendChild(title);
    } 
}
ItemList.prototype.setItems = function(){

}
ItemList.prototype.setTitle = function(title){
    this.title = title;
}
ItemList.prototype.addItem = function(item){
    this.dom.appendChild(item);
}
ItemList.prototype.setEmpty = function(){
    var title = this.dom.querySelector('.item_list-title');
    this.dom.removeChild(title);
    var items = this.dom.querySelectorAll('.item');
    for (var i = 0; i < items.length; i++){
        this.dom.removeChild(items[i]);
    }
}

function Item(id, name, components){
    this.id = id;
    this.name = name;
    this.components = components;

    this.dom = document.createElement('div');
    this.dom.setAttribute('class', 'item');

    var itemNameHtml = document.createElement('div');
    itemNameHtml.setAttribute('class', 'item-name');
    itemNameHtml.textContent = name;
    var itemComponentsHtml = document.createElement('div');
    itemComponentsHtml.setAttribute('class', 'item-components');

    if(components){
        for (var i = 0; i < components.length; i++){
            itemComponentsHtml.appendChild(
                components[i].getDom()
            );
        }
    }

    this.dom.appendChild(itemNameHtml);
    this.dom.appendChild(itemComponentsHtml);
}
Item.prototype.addComponent = function(){
    this.components.push(component);
}
Item.prototype.getDom = function(){
    return this.dom;
}

function Component(id, name, calories, weight){
    this.id = id;
    this.name = name;
    this.calories = calories;
    this.weight = weight;

    this.dom = document.createElement('div');
    this.dom.setAttribute('class', 'component');

    var componentIdHtml = document.createElement('span');
    componentIdHtml.setAttribute('class', 'component-id');
    componentIdHtml.textContent = id;

    var componentNameHtml = document.createElement('span');
    componentNameHtml.setAttribute('class', 'component-name');
    componentNameHtml.textContent = name;

    var componentDescriptionHtml = document.createElement('span');
    componentDescriptionHtml.setAttribute('class', 'component-description');
    componentDescriptionHtml.textContent = calories;

    this.dom.appendChild(componentIdHtml);
    this.dom.appendChild(componentNameHtml);
    this.dom.appendChild(componentDescriptionHtml);
}
Component.prototype.getDom = function(){
    return this.dom;
}


//var i = new Item(1, 'apple pie', [{name: 'pie'}]);
/* template using
var components = [];
components.push(new Component(1, 'pie', 100, 'qwe'));
components.push(new Component(2, 'pie', '100', ''));
components.push(new Component(3, 'pie', '100', ''));
components.push(new Component(4, 'pie', '100', ''));

var item = new Item('1', 'apple pie', components);

var list = new ItemList();
list.addChild(item.getDom());
*/