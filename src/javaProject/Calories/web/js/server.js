function Server(){
}
Server.prototype.getNewXhr = function(){
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
Server.prototype.addDish = function (itemList, _dish){
    var that = this;

    var reader = new FileReader();
    file = _dish.image;
    reader.readAsDataURL(file);

    reader.onload = function(){
        _dish.image = reader.result;
        console.log(_dish.image);

        var dishes = [];
        var dish = JSON.stringify(_dish);
        var xhr = that.getNewXhr();
        xhr.open('POST', 'AddDish', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(dish);
        xhr.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                if (xhr.responseText){
                    dishes = JSON.parse(xhr.responseText);
                    itemList.setTitle('Your dish: ');
                    itemList.setItems(dishes);
                }
                else {
                    itemList.setTitle('Sorry, this dish is already exist. Try again!');
                }
            }
        }
    }
}
Server.prototype.findDish = function (itemList, _dish){
	var dishes = [];
	var dish = JSON.stringify(_dish);
	var xhr = this.getNewXhr();
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
Server.prototype.getComponents = function (toolbar){
    var components = [];
    var xhr = this.getNewXhr();
    xhr.open('POST', 'BeginFindComponents', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            components = JSON.parse(xhr.responseText);
            toolbar.initComponents(components);
        }
    }
}