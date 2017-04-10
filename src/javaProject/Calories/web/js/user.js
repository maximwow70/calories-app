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
        console.log(this);
        this.updateVM();
    }
    User.prototype.updateVM = function () {
        var photoVM = this._parent.querySelector('.portfolio-img');
        photoVM.setAttribute('src', this._photo);
        var nameVM = this._parent.querySelector('.portfolio-name');
        nameVM.innerHTML = '' + this._name;
        var countryVM = this._parent.querySelector('.portfolio-country');
        countryVM.innerHTML = 'Country: ' + this._country;
        var cityVM = this._parent.querySelector('.portfolio-city');
        cityVM.innerHTML = 'City: ' + this._city;
        var contactsVM = this._parent.querySelector('.portfolio-contacts');
        contactsVM.innerHTML = 'Contacts: ' + this._contacts;
        var infoVM = this._parent.querySelector('.portfolio-about');
        infoVM.innerHTML = 'Contacts: ' + this._info;
    };
    return User;
}());
var user1 = new User(document.querySelector('.user'), 'Maksim Samuilionak', 'maximwow70@gmail.com', 'maxGotic', './img/users/user3.jpg', 'Belarus', 'Mogilev', 'maximGotik@gmail.com', 'Web-Deadveloper', 3);
