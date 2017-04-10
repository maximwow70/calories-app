function Toolbar(parent, title){
    this.title;
    this.components = [];
    this.img;

    this.dom = parent.querySelector('.toolbar');
    this.menu;
    this.addComponentBtn = this.dom.querySelector('.toolbar-btn--add_component');
    this.control = this.dom.querySelector('.toolbar-btn--control');

    this.oncreatemenu = function(){};
    this.onaddselect = function(){};

    if(title){
        this.setTitle(title);
    }

    var _that = this;
    try{
        this.addComponentBtn.addEventListener('click', clickAddComponent);
        function clickAddComponent(){
            _that.addSelectComponent();
        }
    }
    catch (e){
        
    }
}
Toolbar.prototype.setTitle = function(_title){
    this.title = _title;

    //dom
    var title = this.dom.querySelector('.toolbar-title');
    if (title){
        title.textContent = _title;
    }
    else {
        title = document.createElement('h3');
        title.setAttribute('class', 'toolbar-title');
        title.textContent = _title;
        var firstChild = this.dom.firstChild;
        this.dom.insertBefore(title, firstChild);
    }
}
Toolbar.prototype.initMenu = function(menuList){
    var menu = this.dom.querySelector('.toolbar-menu');
    this.menu = new Menu(menu, menuList);

    this.oncreatemenu();
}
Toolbar.prototype.initComponents = function(components){
    this.components = components;
    var selectElements = this.dom.querySelectorAll('.toolbar-select--component');
    for (var i = 0; i < selectElements.length; i++){
        this.setComponents(selectElements[i], this.components);
    }
}
Toolbar.prototype.setComponents = function(selectElement, components){
    for (var j = 0; j < components.length; j++){
        var component = this.createSelectComponentByName(components[j].name);
        selectElement.appendChild(component);
    }
}
Toolbar.prototype.addSelectComponent = function(component){
    var selectComponent = this.createSelectComponent();
    var lastChild = this.dom.lastElementChild;
    this.dom.insertBefore(selectComponent, lastChild);

    this.onaddselect();
}
Toolbar.prototype.createSelectComponent = function(){
    var selectComponent = document.createElement('div');
    selectComponent.setAttribute('class', 'toolbar-select_component');

    var select = document.createElement('select');
    select.setAttribute('class', 'toolbar-select toolbar-select--component');
    selectComponent.appendChild(select);

    var option = this.createSelectComponentByName();   
    option.setAttribute('class', 'toolbar-select--empty');
    select.appendChild(option);
    this.setComponents(select, this.components); 

    var input = document.createElement('input');
    input.setAttribute('class', 'toolbar-select toolbar-select--weight');
    input.setAttribute('type', 'number');
    input.setAttribute('min', '0');
    input.setAttribute('placeholder', 'weight');
    selectComponent.appendChild(input);

    return selectComponent;
}
Toolbar.prototype.createSelectComponentByName = function(name){
    var option = document.createElement('option');
    if (name){
        option.value = name;
	    option.innerHTML = name;
    }
    return option;
}
Toolbar.prototype.getItemComponents = function(){
    var selects = this.dom.querySelectorAll('.toolbar-select_component');
	var components = [];
	for (var i = 0; i < selects.length; i++){
        var componentName = selects[i].querySelector('.toolbar-select--component').value;
        var componentWeight = 0;
        try {
            componentWeight = selects[i].querySelector('.toolbar-select--weight').value;
        }
        catch(e){
        }

		var component = {};
        component.name = componentName;
        component.weight = componentWeight;
		components.push(component);
	}
	return components;
}
Toolbar.prototype.getItemImg = function(){
    try{
        this.img = this.dom.querySelector('.file_select').files[0];
    }
    catch(e){
        this.img = '';
    }
    return this.img;
}
Toolbar.prototype.getItem = function(){
	var itemName = this.dom.querySelector('.toolbar-select--name').value;
	var itemComponents = this.getItemComponents();

    var itemImg = this.getItemImg();
    
    var item = {
        name: itemName,
        components: itemComponents,
        image: itemImg
    };
	return item;
}
Toolbar.prototype.getNewComponent = function(){
	var componentName = this.dom.querySelector('.toolbar-select--name').value;
    var componentCategory = this.dom.querySelector('.toolbar-select--category').value;
    var componentCalories = this.dom.querySelector('.toolbar-select--calories').value;
    var componentInfo = this.dom.querySelector('.toolbar-select--description').value;

    var componentImg = this.getItemImg();

    return {
        name: componentName,
        type: componentCategory,
        calories: componentCalories,
        info: componentInfo,
        image: componentImg,
    }
}
Toolbar.prototype.getDom = function(){
    return this.dom;
}

/*
	tests//

	setComponents([
		{name: 'apple'},
		{name: 'coca-cola'},
		{name: 'pie'},
		{name: 'cherries'},
		{name: 'ice'},
		{name: 'tomatoes'},
	]);
*/
