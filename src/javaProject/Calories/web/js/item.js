function ItemDom(id, name, components){
    
}
ItemDom.prototype.addComponent = function(component){
    
}
ItemDom.prototype.getDom = function(){
    return this.dom;
}


function Item(id, name, components){
    this.id = id;
    this.name = name;
    this.components = components;

    //this.dom = new ItemDom(id, name, components);    

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
Item.prototype.addComponent = function(component){
    this.components.push(component);
    //this.dom.addComponent(component);
}
Item.prototype.getDom = function(){
    return this.dom;
}

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


var a = new ItemList(appFind, [
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
					}
				]
			}
		], 'kek')
*/