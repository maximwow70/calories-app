function ItemList(parent, _items, _title){
    this.items = [];
    this.title;

    this.dom = parent.querySelector('.item_list');

    if (_title){
        this.setTitle(_title);
    }
    if (_items){
        this.addItems(_items);
    }

    this.onaddtouser = function(){
        alert('kek');
    };
}
ItemList.prototype.setTitle = function(_title){
    this.title = _title;
    
    // dom
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
ItemList.prototype.setItems = function(items){
    this.setEmpty();
    this.addItems(items);
}
ItemList.prototype.addItems = function(items){
    for (var i = 0; i < items.length; i++){

        // dom
        var id = items[i].id;
		var name = items[i].name;
        var weight = items[i].weight;
        var calories = items[i].calories;
        var src = items[i].src;
		var itemComponentsList = items[i].components;
		var components = [];

		for (var j = 0; j < itemComponentsList.length; j++){
			var idComponent = itemComponentsList[j].id;
			var nameComponent = itemComponentsList[j].name;
			var weightComponent = itemComponentsList[j].weight;
			var caloriesComponent = itemComponentsList[j].calories;
            var imgComponent = itemComponentsList[j].src;
			var itemComponent = new Component(idComponent, nameComponent, weightComponent, caloriesComponent, imgComponent);
			components.push(itemComponent);
		}
        var itemContainer = document.createElement('div');
        itemContainer.setAttribute('class', 'item_list-item');

		var item = new Item(id, name, components, weight, calories, src);
        this.items.push(item);
		itemContainer.appendChild(item.getDom());
        this.dom.appendChild(itemContainer);

        
    }
}
ItemList.prototype.setEmpty = function(){
    this.items = [];

    // dom
    var items = this.dom.querySelectorAll('.item_list-item');
    for (var i = 0; i < items.length; i++){
        this.dom.removeChild(items[i]);
    }
}
