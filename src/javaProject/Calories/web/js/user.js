var RegistrationAssistant = (function () {
    function RegistrationAssistant(parent) {
        var that = this;
        this._dom = parent.querySelector('.registration');
        this._dom.addEventListener('submit', function () {
            event.preventDefault();
            that.onsubmit();
        });
    }
    RegistrationAssistant.prototype.onsubmit = function () { };
    ;
    RegistrationAssistant.prototype.getUser = function () {
        var userName = this._dom.querySelector('.registration-select--name').value;
        var userMail = this._dom.querySelector('.registration-select--mail').value;
        var userPassword = this._dom.querySelector('.registration-select--password').value;
        var userCounty = this._dom.querySelector('.registration-select--country').value;
        var userCity = this._dom.querySelector('.registration-select--city').value;
        var userContacts = this._dom.querySelector('.registration-select--contacts').value;
        var userInfo = this._dom.querySelector('.registration-select--info').value;
        var userPhoto = this._dom.querySelector('.registration-select--file .file_select').files[0];
        var user = {
            name: userName,
            eMail: userMail,
            password: userPassword,
            country: userCounty,
            city: userCity,
            contact: userContacts,
            info: userInfo,
            image: userPhoto
        };
        return user;
    };
    return RegistrationAssistant;
}());
var SignInAssistant = (function () {
    function SignInAssistant(parent) {
        var that = this;
        this._dom = parent.querySelector('.sign_in');
        this._dom.addEventListener('submit', function () {
            event.preventDefault();
            that.onsubmit();
        });
    }
    SignInAssistant.prototype.onsubmit = function () { };
    ;
    SignInAssistant.prototype.getUser = function () {
        var userMail = this._dom.querySelector('.sign_in-select--mail').value;
        var userPassword = this._dom.querySelector('.sign_in-select--password').value;
        var user = {
            eMail: userMail,
            password: userPassword
        };
        return user;
    };
    return SignInAssistant;
}());
var User = (function () {
    function User(parent, name, mail, password, photo, country, city, contacts, info, access) {
        this._dom = parent;
        this._name = name;
        this._mail = mail;
        this._password = password;
        this._photo = photo;
        this._country = country;
        this._city = city;
        this._contacts = contacts;
        this._info = info;
        this._access = access;
        this._registrationAssistant = new RegistrationAssistant(this._dom);
        this._signInAssistant = new SignInAssistant(this._dom);
        this.initControlAssistants();
        this.updateControlsVM(false);
        this.updateVM();
    }
    User.prototype.initControlAssistants = function () {
        var that = this;
        var controlsRegistration = this._dom.querySelectorAll('.navigation-list--registrate');
        var controlsSignIn = this._dom.querySelectorAll('.navigation-list--sign_in');
        var controlsSignOut = this._dom.querySelectorAll('.navigation-list--sign_out');
        function initControlRegistration() {
            var reg = that._dom.querySelector('.account-registration');
            $(reg).toggleClass('account-registration--close');
        }
        for (var i = 0; i < controlsRegistration.length; i++) {
            controlsRegistration[i].addEventListener('click', initControlRegistration);
        }
        function initControlSignIn() {
            var signIn = that._dom.querySelector('.account-sign_in');
            $(signIn).toggleClass('account-sign_in--close');
        }
        for (var i = 0; i < controlsSignIn.length; i++) {
            controlsSignIn[i].addEventListener('click', initControlSignIn);
        }
        this._controlAssistants = {
            registrate: controlsRegistration,
            signIn: controlsSignIn,
            signOut: controlsSignOut
        };
        function initControlSignOut() {
            that.outUser();
        }
        for (var i = 0; i < controlsSignOut.length; i++) {
            controlsSignOut[i].addEventListener('click', initControlSignOut);
        }
    };
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
    User.prototype.updateControlsVM = function (isOut) {
        var controlReg = this._controlAssistants.registrate;
        for (var i = 0; i < controlReg.length; i++) {
            controlReg[i].style.display = isOut ? 'inline-block' : 'none';
        }
        var controlSignIn = this._controlAssistants.signIn;
        for (var i = 0; i < controlSignIn.length; i++) {
            controlSignIn[i].style.display = isOut ? 'inline-block' : 'none';
        }
        var controlSignOut = this._controlAssistants.signOut;
        for (var i = 0; i < controlSignOut.length; i++) {
            controlSignOut[i].style.display = isOut ? 'none' : 'inline-block';
        }
    };
    User.prototype.updateVM = function () {
        var photoVM = this._dom.querySelector('.portfolio-img');
        photoVM.setAttribute('src', this._photo);
        var nameVM = this._dom.querySelector('.portfolio-name');
        var accessVM = this.updateAccessVM(this._access);
        nameVM.innerHTML = this._name + ' ' + '(' + accessVM + ')';
        var countryVM = this._dom.querySelector('.portfolio-country');
        countryVM.innerHTML = 'Country: ' + this._country;
        var cityVM = this._dom.querySelector('.portfolio-city');
        cityVM.innerHTML = 'City: ' + this._city;
        var contactsVM = this._dom.querySelector('.portfolio-contacts');
        contactsVM.innerHTML = 'Contacts: ' + this._contacts;
        var infoVM = this._dom.querySelector('.portfolio-about');
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
        this.updateControlsVM(false);
        this.updateVM();
    };
    User.prototype.setUserByObj = function (user) {
        this._name = user.name;
        this._mail = user.eMail;
        this._password = user.password;
        this._photo = user.src;
        this._country = user.country;
        this._city = user.city;
        this._contacts = user.contact;
        this._info = user.info;
        this._access = user.access;
        this.updateVM();
    };
    User.prototype.outUser = function () {
        this.setUser('', '', '', '', '', '', '', '', 0);
        this.updateControlsVM(true);
        this.updateVM();
    };
    return User;
}());
