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
function getToolbarSelectComponents(parent){
	return parent.querySelector('.toolbar-select_components');
}
function getSelectComponent(parent){
    return parent.querySelector('.toolbar-select--components');
}
function getSelectComponentsAll(){
    return document.querySelectorAll('.toolbar-select--components');
}
function addSelectComponent(parent){
	var selectComponent = getSelectComponent(parent).cloneNode(true);
	var toolbarSelectComponents = getToolbarSelectComponents(parent);
	toolbarSelectComponents.appendChild(selectComponent);
}
function getControlComponents(parent){
    return parent.querySelector('.toolbar-btn--add_component');
}
function getControlToolbar(parent){
    return parent.querySelector('.toolbar-btn:last-child');
}
function createComponent(name){
	var option = document.createElement('option');
	option.value = name;
	option.innerHTML = name;
	return option;
}
function setComponents(arr){
    var selectElements = getSelectComponentsAll();
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
function main(){
    
}
main();
