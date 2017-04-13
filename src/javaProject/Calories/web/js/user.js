var UserVM = (function () {
    function UserVM(dom) {
        this._dom = dom;
        this._statistic = dom.querySelector('.statistic');
    }
    UserVM.prototype.initControlAssistants = function (user) {
        var that = this;
        var controlsRegistration = this._dom.querySelectorAll('.navigation-list--registrate');
        var controlsSignIn = this._dom.querySelectorAll('.navigation-list--sign_in');
        var controlsSignOut = this._dom.querySelectorAll('.navigation-list--sign_out');
        var reg = that._dom.querySelector('.account-registration');
        var signIn = that._dom.querySelector('.account-sign_in');
        function initControlRegistration() {
            $(reg).removeClass('account-registration--close');
            $(signIn).addClass('account-sign_in--close');
        }
        for (var i = 0; i < controlsRegistration.length; i++) {
            controlsRegistration[i].addEventListener('click', initControlRegistration);
        }
        function initControlSignIn() {
            $(signIn).removeClass('account-sign_in--close');
            $(reg).addClass('account-registration--close');
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
            that.updateControlsVM(true);
            user.outUser();
        }
        for (var i = 0; i < controlsSignOut.length; i++) {
            controlsSignOut[i].addEventListener('click', initControlSignOut);
        }
    };
    UserVM.prototype.updateControlsVM = function (isOut) {
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
    UserVM.prototype.removeAssistentsVM = function () {
        var reg = this._dom.querySelector('.account-registration');
        $(reg).addClass('account-registration--close');
        var si = this._dom.querySelector('.account-sign_in');
        $(si).addClass('account-sign_in--close');
    };
    UserVM.prototype.updateAccessVM = function (access) {
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
    UserVM.prototype.updateStatisticVM = function (statistic) {
        var averageCaloriesVM = this._statistic.querySelector('.statistic-type--average_calories .statistic-value');
        averageCaloriesVM.innerHTML = statistic.averageCalories;
        var countItemsVM = this._statistic.querySelector('.statistic-type--count_items .statistic-value');
        countItemsVM.innerHTML = statistic.countItems;
        var favoriteComponentVM = this._statistic.querySelector('.statistic-type--favorite_component .statistic-value');
        favoriteComponentVM.innerHTML = statistic.favoriteComponent;
    };
    UserVM.prototype.updateItemBtnVM = function (user) {
        var btns = user.getItemList().getDom().querySelectorAll('.item-select--add');
        for (var i = 0; i < btns.length; i++) {
            $(btns[i]).addClass('item-select--added');
        }
    };
    UserVM.prototype.updateVM = function (user) {
        var photoVM = this._dom.querySelector('.portfolio-img');
        photoVM.setAttribute('src', user.getPhoto());
        var nameVM = this._dom.querySelector('.portfolio-name');
        var accessVM = this.updateAccessVM(user.getAccess());
        nameVM.innerHTML = user.getName() + ' ' + '(' + accessVM + ')';
        var countryVM = this._dom.querySelector('.portfolio-country');
        countryVM.innerHTML = 'Country: ' + user.getCountry();
        var cityVM = this._dom.querySelector('.portfolio-city');
        cityVM.innerHTML = 'City: ' + user.getCity();
        var contactsVM = this._dom.querySelector('.portfolio-contacts');
        contactsVM.innerHTML = 'Contacts: ' + user.getContacts();
        var infoVM = this._dom.querySelector('.portfolio-about');
        infoVM.innerHTML = 'About Myself: ' + user.getInfo();
        this.updateItemBtnVM(user);
    };
    return UserVM;
}());
var RegistrationAssistant = (function () {
    function RegistrationAssistant(parent) {
        var that = this;
        this._dom = parent.querySelector('.registration');
        this._dom.addEventListener('submit', function () {
            event.preventDefault();
            that.onsubmit();
        });
        var btnClose = this._dom.querySelector('.registration-btn--close');
        btnClose.addEventListener('click', function () {
            var ar = parent.querySelector('.account-registration');
            $(ar).addClass('account-registration--close');
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
        var userPhoto;
        try {
            userPhoto = this._dom.querySelector('.registration-select--file .file_select').files[0];
        }
        catch (e) {
            userPhoto = '';
        }
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
        var btnClose = this._dom.querySelector('.sign_in-btn--close');
        btnClose.addEventListener('click', function () {
            var ar = parent.querySelector('.account-sign_in');
            $(ar).addClass('account-sign_in--close');
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
var StatisticAssistant = (function () {
    function StatisticAssistant() {
    }
    StatisticAssistant.prototype.getCountItems = function (user) {
        var count = user.getItemList().items.length;
        return count;
    };
    StatisticAssistant.prototype.getAverageCalories = function (user) {
        var items = user.getItemList().items;
        var calories = 0;
        for (var i = 0; i < items.length; i++) {
            calories += parseInt(items[i].calories);
        }
        calories = Math.round(calories / items.length);
        return (isNaN(calories)) ? 0 : calories;
    };
    StatisticAssistant.prototype.getFavoriteComponent = function (user) {
        var items = user.getItemList().items;
        var components = [];
        for (var i = 0; i < items.length; i++) {
            for (var j = 0; j < items[i].components.length; j++) {
                components.push(items[i].components[j].name);
            }
        }
        var statistic = [];
        for (var i = 0; i < components.length; i++) {
            var count = 0;
            var name_1 = components[i];
            for (var j = 0; j < components.length; j++) {
                count = (name_1 == components[j]) ? count + 1 : count;
            }
            statistic.push({
                _name: name_1,
                _count: count
            });
        }
        var name;
        if (statistic.length != 0) {
            var max = statistic[0]._count;
            name = statistic[0]._name;
            for (var i = 0; i < statistic.length; i++) {
                if (max < statistic[i]._count) {
                    max = statistic[i]._count;
                    name = statistic[i]._name;
                }
            }
        }
        else {
            name = '-';
        }
        return name;
    };
    StatisticAssistant.prototype.getStatistic = function (user) {
        return {
            averageCalories: this.getAverageCalories(user),
            countItems: this.getCountItems(user),
            favoriteComponent: this.getFavoriteComponent(user)
        };
    };
    return StatisticAssistant;
}());
var User = (function () {
    function User(parent, name, mail, password, photo, country, city, contacts, info, access, items) {
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
        //console.log(parent.querySelector('.item_list'));
        this._itemList = new ItemList(parent, items, 'My Dishes');
        //this._itemList.onaddtouser = function(){alert('lel')};
        this._vm = new UserVM(parent);
        this._registrationAssistant = new RegistrationAssistant(parent);
        this._signInAssistant = new SignInAssistant(parent);
        this._statisticAssistant = new StatisticAssistant();
        this._statistic = this._statisticAssistant.getStatistic(this);
        this._vm.updateStatisticVM(this._statistic);
        this._vm.initControlAssistants(this);
        if (name == "") {
            this._vm.updateControlsVM(true);
        }
        else {
            this._vm.updateControlsVM(false);
        }
        this._vm.updateVM(this);
    }
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
        this._vm.initControlAssistants(this);
        if (name == "") {
            this._vm.updateControlsVM(true);
        }
        else {
            this._vm.updateControlsVM(false);
        }
        this._vm.removeAssistentsVM();
        this._vm.updateVM(this);
        this._statistic = this._statisticAssistant.getStatistic(this);
        this._vm.updateStatisticVM(this._statistic);
    };
    User.prototype.setUserFromServer = function (user) {
        this._id = user.id;
        this._name = user.name;
        this._mail = user.eMail;
        this._password = user.password;
        this._photo = user.src;
        this._country = user.country;
        this._city = user.city;
        this._contacts = user.contact;
        this._info = user.info;
        this._access = user.access;
        this._itemList.setItems(user.dishes);
        this._vm.initControlAssistants(this);
        if (name == "") {
            this._vm.updateControlsVM(true);
        }
        else {
            this._vm.updateControlsVM(false);
        }
        this._vm.removeAssistentsVM();
        this._vm.updateVM(this);
        this._statistic = this._statisticAssistant.getStatistic(this);
        this._vm.updateStatisticVM(this._statistic);
    };
    User.prototype.outUser = function () {
        this.setUser('', '', '', '', '', '', '', '', 0);
        this._itemList.setEmpty();
        this._vm.initControlAssistants(this);
        this._vm.updateControlsVM(true);
        this._statistic = this._statisticAssistant.getStatistic(this);
        this._vm.updateStatisticVM(this._statistic);
    };
    User.prototype.addItems = function (items) {
        this._itemList.addItems(items);
        this._statistic = this._statisticAssistant.getStatistic(this);
        this._vm.updateStatisticVM(this._statistic);
    };
    User.prototype.getDom = function () {
        return this._dom;
    };
    User.prototype.getItemList = function () {
        return this._itemList;
    };
    User.prototype.getId = function () {
        return this._id;
    };
    User.prototype.getName = function () {
        return this._name;
    };
    User.prototype.getMail = function () {
        return this._mail;
    };
    User.prototype.getPassword = function () {
        return this._password;
    };
    User.prototype.getPhoto = function () {
        return this._photo;
    };
    User.prototype.getAccess = function () {
        return this._access;
    };
    User.prototype.getCountry = function () {
        return this._country;
    };
    User.prototype.getCity = function () {
        return this._city;
    };
    User.prototype.getContacts = function () {
        return this._contacts;
    };
    User.prototype.getInfo = function () {
        return this._info;
    };
    return User;
}());
