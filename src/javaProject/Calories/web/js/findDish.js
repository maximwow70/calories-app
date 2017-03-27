function getSelectElements(parent) {
    return parent.querySelectorAll('.toolbar-select--components');
}
function getDishComponents(parent){
	var selects = getSelectElements(parent);
	var components = [];
	for (var i = 0; i < selects.length; i++){
		var component = {
			name: selects[i].value,
			weight: 100
		}
		components.push(component);
	}
	return components;
}
function getDish(parent){
	var dish = {};
	var dishName = parent.querySelector('.toolbar-select--name').value;
	var dishComponents = getDishComponents(parent);
	dish.name = dishName;
	dish.components = dishComponents;
	return dish;
}


function findDish(itemList, _dish){
	var dishes = [];
	var dish = JSON.stringify(_dish);
	var xhr = new newXMLHttpRequest();
	xhr.open('POST', 'FindDish', true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  	xhr.send(dish);
	xhr.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
            dishes = JSON.parse(xhr.responseText);
            itemList.setItems(dishes);
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
		]
	);
*/