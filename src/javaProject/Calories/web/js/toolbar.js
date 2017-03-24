function newXMLHttpRequest() {
  var xmlreq = false;
  if (window.XMLHttpRequest) {
    // Создадим XMLHttpRequest объект для не-Microsoft браузеров
    xmlreq = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    // Создадим XMLHttpRequest с помощью MS ActiveX
    try {
      // Попробуем создать XMLHttpRequest для поздних версий
      // Internet Explorer
      xmlreq = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e1) {
      // Не удалось создать требуемый ActiveXObject
      try {
        // Пробуем вариант, который поддержат более старые версии
        //  Internet Explorer
        xmlreq = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e2) {
        // Не в состоянии создать XMLHttpRequest с помощью ActiveX
      }
    }
  }
  return xmlreq;
}
function getToolbarSelectComponents(){
	return document.querySelector('.toolbar-select_components');
}
function getSelectComponents(){
    return document.querySelectorAll('.toolbar-select--components');
}
function addSelectComponent(){
	var selectComponents = getSelectComponents()[0].cloneNode(true);
	var toolbarSelectComponents = getToolbarSelectComponents();
	toolbarSelectComponents.appendChild(selectComponents);
}
function getControlComponents(){
    return document.querySelector('.toolbar-btn--add_component');
}
function getControlToolbar(){
    return document.querySelector('.toolbar-btn--find_dish');
}
function createComponent(name){
	var option = document.createElement('option');
	option.value = name;
	option.innerHTML = name;
	return option;
}
function setComponents(arr){
    var selectElements = getSelectComponents();
    var components = arr;
    for (var i = 0; i < selectElements.length; i++){
        for (var j = 0; j < components.length; j++){
            var component = createComponent(components[j].name);
			selectElements[i].appendChild(component);
        }
    }
}
function getComponents(){
    var components = [];
    var xhr = new newXMLHttpRequest();
    xhr.open('POST', 'BeginFindComponents', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            components = JSON.parse(xhr.responseText);
            setComponents(components);
        }
    }
    //return components;
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

getComponents();

var controlComponents = getControlComponents();
controlComponents.addEventListener('click', function(){
	addSelectComponent();
});

