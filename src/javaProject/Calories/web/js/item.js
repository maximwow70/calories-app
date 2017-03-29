function Item(id, name, components, weight, calories){
    this.id = id;
    this.name = name;
	this.weight = weight;
	this.calories = calories;
    this.components = components;

    this.dom = document.createElement('div');
    
    this.dom.setAttribute('class', 'item');

    var itemNameHtml = document.createElement('div');
    itemNameHtml.setAttribute('class', 'item-name');
    itemNameHtml.textContent = this.name;
    this.dom.appendChild(itemNameHtml);

	if (weight){
		var itemWeightHtml = document.createElement('div');
		itemWeightHtml.setAttribute('class', 'item-weight');
		itemWeightHtml.innerHTML = 'Weight: ' + this.weight + 'g';
		this.dom.appendChild(itemWeightHtml);
	}

	if (calories){
		var c = Math.round(this.calories * 100 / this.weight);
		var itemCaloriesHtml = document.createElement('div');
		itemCaloriesHtml.setAttribute('class', 'item-calories');
		itemCaloriesHtml.innerHTML = 'Calories: ' + this.calories + ' (' + c + 'c/100g)';
		this.dom.appendChild(itemCaloriesHtml);
	}

    var itemComponentsHtml = document.createElement('div');
    itemComponentsHtml.setAttribute('class', 'item-components');

    if(components){
        for (var i = 0; i < components.length; i++){
            itemComponentsHtml.appendChild(
                components[i].getDom()
            );
        }
    }

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