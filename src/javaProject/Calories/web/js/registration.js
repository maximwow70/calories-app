var Registration = (function () {
    function Registration(parent) {
        var that = this;
        this._dom = parent;
        this._dom.addEventListener('submit', function () {
            event.preventDefault();
            that.onsubmit();
        });
    }
    Registration.prototype.onsubmit = function () { };
    ;
    Registration.prototype.getUser = function () {
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
    return Registration;
}());
