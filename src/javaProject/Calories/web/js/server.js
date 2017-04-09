function Server(){
    this.onfind = function(){};
    this.onadd = function(){};
    this.ongetinfo = function(){};
    this.onaddcomponent = function(){};
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
                that.onadd();
            }
        }
    }
}
Server.prototype.findDish = function (itemList, _dish){
    var that = this;
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
        that.onfind();
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
Server.prototype.getFullComponents = function(toolbar){
    var components = [];
    var xhr = this.getNewXhr();
    xhr.open('POST', 'GetFullComponents', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onreadystatechange = function() {
        if(this.readyState ==4 && this.status == 200){
            components = JSON.parse(xhr.responseText);
            toolbar.initMenu(components);
        }
    }
}
Server.prototype.getInfo = function(info, str){
    var that = this;
    var xhr = this.getNewXhr();
    xhr.open('POST', 'GetInfoComponent', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(str);
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            var information = JSON.parse(xhr.responseText);
            var title = information.name;
            var content = information.info;
            var description = '(' + information.calories + 'c/100g)';
            var img = information.img;
            if (!title){
                title = 'Something get trouble :c';
            }
            info.setInfo(title, content, description, img);
            that.ongetinfo();
        }
    }
}
Server.prototype.addComponent = function(info, component){
    var that = this;

    var reader = new FileReader();
    file = component.img;
    reader.readAsDataURL(file);

    reader.onload = function(){
        component.img = reader.result;
        console.log(component);

        var _component = JSON.stringify(component);
        var xhr = that.getNewXhr();
        xhr.open('POST', 'AddComponent', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(_component);
        xhr.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                var information = JSON.parse(xhr.responseText);
                var title = information.name;
                var content = information.info;
                var description = '(' + information.calories + 'c/100g)';
                var img = information.img;
                if (!title){
                    title = 'Something get trouble :c';
                }
                info.setInfo(title, content, description, img);
                that.ongetinfo();
            }
        }
    }
}