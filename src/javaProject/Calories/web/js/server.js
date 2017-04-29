function Server(){
    this.onfind = function(){};
    this.onadd = function(){};
    this.ongetinfo = function(){};
    this.onaddcomponent = function(){};
    this.ongetcomponents = function(){};
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
Server.prototype.addDish = function (itemList, user, _dish){
    var that = this;
    
    var reader = new FileReader();
    file = _dish.image;
    reader.readAsDataURL(file);

    reader.onload = function(){
        _dish.image = reader.result;

        var addUser = {
            eMail: user.getMail(),
            password: user.getPassword()
        }
        var addInfo = {
            user: addUser,
            dish: _dish
        }
        var _addInfo = JSON.stringify(addInfo);
        
        var xhr = that.getNewXhr();
        xhr.open('POST', 'AddDish', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(_addInfo);
        xhr.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                if (xhr.responseText){
                    var obj = JSON.parse(xhr.responseText);
                    
                    var result = obj.result;
                    var dishes = obj.dish;

                    itemList.setTitle(result);
                    itemList.setItems(dishes);
                }
                else {
                    itemList.setTitle('Sorry, something get trouble. Try again!');
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
            var img = information.src;
            if (!title){
                title = 'Something get trouble :c';
            }
            info.setInfo(title, content, description, img);
            that.ongetinfo();
        }
    }
}
Server.prototype.addComponent = function(info, user, _component){
    var that = this;

    var reader = new FileReader();
    file = _component.image;
    reader.readAsDataURL(file);
    
    reader.onload = function(){
        _component.image = reader.result;

        var addUser = {
            eMail: user.getMail(),
            password: user.getPassword()
        }
        var addInfo = {
            user: addUser,
            component: _component
        }
        var _addInfo = JSON.stringify(addInfo);

        var xhr = that.getNewXhr();
        xhr.open('POST', 'AddComponent', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(_addInfo);
        xhr.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                var obj = JSON.parse(xhr.responseText);
                    
                var result = obj.result;
                var component = obj.component;

                var title = component.name;
                var content = component.info;
                var description = '(' + component.calories + 'c/100g)';
                var img = component.src;
                if (!title){
                    title = result;
                    content = '';
                    description = '';
                    img = '';
                }
                info.setInfo(title, content, description, img);
                that.ongetinfo();
            }
        }
    }
}
Server.prototype.addUser = function (regUser, user) {
    var that = this;

    var reader = new FileReader();
    file = regUser.image;
    reader.readAsDataURL(file);

    reader.onload = function(){
        regUser.image = reader.result;
        var _regUser = JSON.stringify(regUser);
        var xhr = that.getNewXhr();
        xhr.open('POST', 'AddUser', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(_regUser);
        xhr.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                var regUser = JSON.parse(xhr.responseText);
                user.setUserFromServer(regUser);
            }
        }
    }
}
Server.prototype.signInUser = function(inUser, user){
    var that = this;
    
    var _inUser = JSON.stringify(inUser);
    var xhr = that.getNewXhr();
    xhr.open('POST', 'UserLogin', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(_inUser);
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            var regUser = JSON.parse(xhr.responseText);
            user.setUserFromServer(regUser);
        }
    }
}
Server.prototype.userAddItem = function(_item, user){
    var that = this;

    var addUser = {
        id: user.getId(),
        eMail: user.getMail(),
        password: user.getPassword()
    }
    var addInfo = {
        user: addUser,
        dish: _item
    }
    var _addInfo = JSON.stringify(addInfo);
    
    var xhr = that.getNewXhr();
    xhr.open('POST', 'AddDishIntoDishList', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(_addInfo);
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            if (xhr.responseText){
                var result = JSON.parse(xhr.responseText);
                if (result.result=="true"){
                    var addUser = {
                        eMail: user.getMail(),
                        password: user.getPassword()
                    }
                    that.signInUser(addUser, user);
                }
                else {
                    alert('pesos');
                }
            }
        }
    }
}
Server.prototype.userRemoveItem = function(_item, user){
    var that = this;

    var addUser = {
        id: user.getId(),
        eMail: user.getMail(),
        password: user.getPassword()
    }
    var addInfo = {
        user: addUser,
        dish: _item
    }
    var _addInfo = JSON.stringify(addInfo);
    
    var xhr = that.getNewXhr();
    xhr.open('POST', 'RemoveDishIntoDishList', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(_addInfo);
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            if (xhr.responseText){
                var result = JSON.parse(xhr.responseText);
                if (result.result=="true"){
                    var addUser = {
                        eMail: user.getMail(),
                        password: user.getPassword()
                    }
                    that.signInUser(addUser, user);
                }
                else {
                    alert('pesos');
                }
            }
        }
    }
}


