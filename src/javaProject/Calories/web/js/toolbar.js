function Toolbar(parent, title){
    this.title;
    this.components = [];

    this.dom = parent.querySelector('.toolbar');
    this.addComponentBtn = this.dom.querySelector('.toolbar-btn--add_component');
    this.control = this.dom.querySelector('.toolbar-btn--control');

    if(title){
        this.setTitle(title);
    }

    var _that = this;
    this.addComponentBtn.addEventListener('click', clickAddComponent);
    function clickAddComponent(){
        _that.addSelectComponent();
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
Toolbar.prototype.initComponents = function(components){
    this.components = components;
    var selectElements = this.dom.querySelectorAll('.toolbar-select--component');
    for (var i = 0; i < selectElements.length; i++){
        this.setComponents(selectElements[i], components);
    }
}
Toolbar.prototype.setComponents = function(selectElement, components){
    for (var j = 0; j < components.length; j++){
        var component = this.createSelectComponentName(components[j].name);
        selectElement.appendChild(component);
    }
}
Toolbar.prototype.addSelectComponent = function(component){
    var selectComponent = this.createSelectComponent();
    var lastChild = this.dom.lastElementChild;
    this.dom.insertBefore(selectComponent, lastChild);
}
Toolbar.prototype.createSelectComponent = function(){
    var selectComponent = document.createElement('div');
    selectComponent.setAttribute('class', 'toolbar-select_component');

    var select = document.createElement('select');
    select.setAttribute('class', 'toolbar-select toolbar-select--component');
    selectComponent.appendChild(select);

    var option = this.createSelectComponentName();   
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
Toolbar.prototype.createSelectComponentName = function(name){
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
        var componentWeight;
        try{
            componentWeight = selects[i].querySelector('.toolbar-select--weight').value;
            if (!componentWeight){
                componentWeight = 0;
            }
        }
        catch(e){
            componentWeight = 0;
        }

		var component = {};
        component.name = componentName;
        component.weight = componentWeight;
		components.push(component);
	}
	return components;
}
Toolbar.prototype.getItem = function(){
	var dishName = this.dom.querySelector('.toolbar-select--name').value;
	var dishComponents = this.getItemComponents();
    
    var dish = {
        name: dishName,
        components: dishComponents
    };
	return dish;
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
