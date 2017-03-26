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

//var toolbar = document.querySelector('.toolbar--find_dish');

function getSelectElements(parent) {
    return parent.querySelectorAll('.toolbar-select--components');
}
function getDishComponents(parent){
	var selects = getSelectElements(parent);
	var components = [];
	for (var i = 0; i < selects.length; i++){
		components.push(selects[i].value);
	}
	return components;
}
function getDish(parent){
	var dish = {};
	var dishName = parent.querySelector('.toolbar-select--name').value;
	var dishComponents = getDishComponents(parent);
	dish.dishName = dishName;
	dish.names = dishComponents;
	return dish;
}
function setDishes(parent, arr, notRewrite){
	var dishList = new ItemList(parent);
	if (!notRewrite){
		dishList.setEmpty();
	}
	var dishes = arr;
	for (var i = 0; i < dishes.length; i++){
		
		var id = dishes[i].id;
		var name = dishes[i].name;
		
		var dishComponentsList = dishes[i].components;
		var components = [];
		for (var j = 0; j < dishComponentsList.length; j++){
			var idComponent = dishComponentsList[j].id;
			var nameComponent = dishComponentsList[j].name;
			var caloriesComponent = dishComponentsList[j].calories;
			var dishComponent = new Component(idComponent, nameComponent, caloriesComponent);
			components.push(dishComponent);
		}
		var dish = new Item(id, name, components);
		dishList.addChild(dish.getDom());
	}
}
function findDish(parent, _dish){
	var dishes = [];
	var dish = JSON.stringify(_dish);
	var xhr = new newXMLHttpRequest();
	xhr.open('POST', 'FindDish', true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(dish);
	xhr.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
            dishes = JSON.parse(xhr.responseText);
            setDishes(parent, dishes);
        }
	}
}
/*
	//tests
	
	setDishes(
		appFind,
		[
			{
				name: 'apple pie',
				components: [
					{
						id: 1,
						name: 'pie',
						calories: 300
					},
					{
						id: 2,
						name: 'apple',
						calories: 100
					},
					{
						id: 3,
						name: 'cream',
						calories: 500
					}
				]
			}
		]
	);
*/
function main(){
	
}
main();