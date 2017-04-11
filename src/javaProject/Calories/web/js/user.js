var User = (function () {
    function User(parent, name, mail, password, photo, country, city, contacts, info, access) {
        this._parent = parent;
        this._name = name;
        this._mail = mail;
        this._password = password;
        this._photo = photo;
        this._country = country;
        this._city = city;
        this._contacts = contacts;
        this._info = info;
        this._access = access;
        this.updateVM();
    }
    User.prototype.updateAccessVM = function (access) {
        var accessVM;
        if (access == 1) {
            accessVM = 'User';
        }
        else if (access == 2) {
            accessVM = 'Developer';
        }
        else if (access == 3) {
            accessVM = 'God';
        }
        else {
            accessVM = 'Slave';
        }
        return accessVM;
    };
    User.prototype.updateVM = function () {
        var photoVM = this._parent.querySelector('.portfolio-img');
        photoVM.setAttribute('src', this._photo);
        var nameVM = this._parent.querySelector('.portfolio-name');
        var accessVM = this.updateAccessVM(this._access);
        nameVM.innerHTML = this._name + ' ' + '(' + accessVM + ')';
        var countryVM = this._parent.querySelector('.portfolio-country');
        countryVM.innerHTML = 'Country: ' + this._country;
        var cityVM = this._parent.querySelector('.portfolio-city');
        cityVM.innerHTML = 'City: ' + this._city;
        var contactsVM = this._parent.querySelector('.portfolio-contacts');
        contactsVM.innerHTML = 'Contacts: ' + this._contacts;
        var infoVM = this._parent.querySelector('.portfolio-about');
        infoVM.innerHTML = 'About Myself: ' + this._info;
    };
    User.prototype.setUser = function (name, mail, password, photo, country, city, contacts, info, access) {
        this._name = name;
        this._mail = mail;
        this._password = password;
        this._photo = photo;
        this._country = country;
        this._city = city;
        this._contacts = contacts;
        this._info = info;
        this._access = access;
        this.updateVM();
    };
    User.prototype.setUserByObj = function (user) {
        this._name = user.name;
        this._mail = user.eMail;
        this._password = user.password;
        this._photo = user.src;
        this._country = user.country;
        this._city = user.city;
        this._contacts = user.contacts;
        this._info = user.info;
        this._access = user.access;
        this.updateVM();
    };
    return User;
}());
