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
Item.prototype.addComponent = function(component){
    this.components.push(component);
    //this.dom.addComponent(component);
}
Item.prototype.getDom = function(){
    return this.dom;
}

/* tests

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