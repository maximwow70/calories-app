function ItemListDom(parent, items, title){
    this.dom = parent.querySelector('.item_list');

    if (title){
        this.setTitle(title);
    }
    if (items){
        this.addItems(items);
    } 
}
ItemListDom.prototype.setTitle = function(_title){
    var title = this.dom.querySelector('.item_list-title');
    if (title){
        title.textContent = _title;
    }
    else {
        title = document.createElement('h3');
        title.setAttribute('class', 'item_list-title');
        title.textContent = _title;
        var firstChild = this.dom.firstChild;
        this.dom.insertBefore(title, firstChild);
    }
}
ItemListDom.prototype.addItems = function(items){
	for (var i = 0; i < items.length; i++){
		var id = items[i].id;
		var name = items[i].name;
		var itemComponentsList = items[i].components;
		var components = [];

		for (var j = 0; j < itemComponentsList.length; j++){
			var idComponent = itemComponentsList[j].id;
			var nameComponent = itemComponentsList[j].name;
			var weightComponent = itemComponentsList[j].weight;
			var caloriesComponent = itemComponentsList[j].calories;
			var itemComponent = new Component(idComponent, nameComponent, weightComponent, caloriesComponent);
			components.push(itemComponent);
		}
		var dish = new Item(id, name, components);
		this.dom.appendChild(dish.getDom());
	}
}
ItemListDom.prototype.setEmpty = function(){
    var items = this.dom.querySelectorAll('.item');
    for (var i = 0; i < items.length; i++){
        this.dom.removeChild(items[i]);
    }
}
ItemListDom.prototype.getDom = function(){
    return this.dom;
}

function ItemList(parent, _items, _title){
    this.items = _items;
    this.title = _title;

    this.dom = new ItemListDom(parent, _items, _title);
    
}
ItemList.prototype.setTitle = function(title){
    this.title = title;
    this.dom.setTitle(title);
}
ItemList.prototype.setItems = function(items){
    this.setEmpty();
    this.addItems(items);
}
ItemList.prototype.addItems = function(items){
    for (var i = 0; i < items.length; i++){
        this.items.push(items[i]);
    }
    this.dom.addItems(items);
}
ItemList.prototype.setEmpty = function(){
    this.items = [];
    this.dom.setEmpty();
}