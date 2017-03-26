function addDish(parent, _dish){
    var dishes = [];
	var dish = JSON.stringify(_dish);
        console.log(dish);
	var xhr = new newXMLHttpRequest();
	xhr.open('POST', 'AddDish', true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(dish);
	xhr.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
            dishes = JSON.parse(xhr.responseText);
            if (dishes){
                setDishes(parent, dishes, 'Your dish:', false);
            }
            else {

            }
        }
	}
}