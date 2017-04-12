function Item(id, name, components, weight, calories, src){
    this.id = id;
    this.name = name;
	this.weight = weight;
	this.calories = calories;
    this.components = components;
	this.src = src;
	this.imgPath = 'img/' + this.src + '';

    var that = this;
    this.onadditem = function(){};
	
    this.dom = document.createElement('div');
    this.dom.setAttribute('class', 'item');

	//itemFront
	var itemFront = document.createElement('div');
	itemFront.setAttribute('class', 'item-front');

	//itemName
    var itemName = document.createElement('div');
    itemName.setAttribute('class', 'item-name');
    itemName.textContent = this.name;
    itemFront.appendChild(itemName);

	//itemImg
	var itemImg = document.createElement('div');
    itemImg.setAttribute('class', 'item-img');

	var img = document.createElement('img');
	img.setAttribute('src', this.imgPath);
	img.setAttribute('class', 'img');
	itemImg.appendChild(img);

	itemFront.appendChild(itemImg);

	//itemWeight
	if (weight){
		var itemWeight = document.createElement('div');
		itemWeight.setAttribute('class', 'item-weight');
		itemWeight.innerHTML = 'Weight: ' + this.weight + 'g';
		itemFront.appendChild(itemWeight);
	}

	//itemCalories
	if (calories){
		var c = Math.round(this.calories * 100 / this.weight);
		var itemCalories = document.createElement('div');
		itemCalories.setAttribute('class', 'item-calories');
		itemCalories.innerHTML = 'Calories: ' + this.calories + ' (' + c + 'c/100g)';
		itemFront.appendChild(itemCalories);
	}

	//itemSelects
	var itemSelectInfo = document.createElement('a');
	itemSelectInfo.setAttribute('class', 'item-select item-select--info fa fa-info-circle');
	itemFront.appendChild(itemSelectInfo);

	var itemSelectAdd= document.createElement('a');
	itemSelectAdd.setAttribute('class', 'item-select item-select--add fa fa-plus');
    itemSelectAdd.setAttribute('data-id', this.id);
	itemFront.appendChild(itemSelectAdd);

	//itemBack
	var itemBack = document.createElement('div');
    itemBack.setAttribute('class', 'item-back');

	//itemBackName
    var itemComponentsName = document.createElement('div');
    itemComponentsName.setAttribute('class', 'item-name');
    itemComponentsName.textContent = 'components';
    itemBack.appendChild(itemComponentsName);

    var itemComponents = document.createElement('div');
    itemComponents.setAttribute('class', 'item-components');

    if(components){
        for (var i = 0; i < components.length; i++){
            itemComponents.appendChild(
                components[i].getDom()
            );
        }
    }

    itemBack.appendChild(itemComponents);

	var itemInfoClose = document.createElement('a');
	itemInfoClose.setAttribute('class', 'item-select item-select--info fa fa-close');
	itemBack.appendChild(itemInfoClose);


	this.dom.appendChild(itemFront);
	this.dom.appendChild(itemBack);

	var that = this;
	var selectInfo = this.dom.querySelectorAll('.item-select--info');
	for (var i = 0; i < selectInfo.length; i++){
		selectInfo[i].addEventListener('click', function(){
			$(that.dom).toggleClass('item--click');
		});
		selectInfo[i].addEventListener('mouseover', function(){
			$(that.dom).addClass('item--hover');
		});
		selectInfo[i].addEventListener('mouseleave', function(){
			$(that.dom).removeClass('item--hover');
		});
	}
}
Item.prototype.addComponent = function(component){
    this.components.push(component);
    //this.dom.addComponent(component);
}
Item.prototype.getId = function(){
    return this.id;
}
Item.prototype.getDom = function(){
    return this.dom;
}

/* tests

var a = new ItemList(
    app.getAppFind(), 
    [
        {
            name: 'apple pie',
            components: [
                {
                    id: 1,
                    name: 'pie',
                    weight: 666,
                    calories: 300,
					img: 'apple.svg'
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
                },
                {
                    id: 3,
                    name: 'cream',
                    weight: 666,
                    calories: 500
                }
            ],
            weight: 100,
            calories: 666,
            src: 'dish3.jpg'
        }
    ], 
    ''
)
*/