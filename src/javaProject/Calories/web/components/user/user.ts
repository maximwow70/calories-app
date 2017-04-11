class RegistrationAssistant{
    private _dom: any;

    private _control: any;
    private onsubmit(): void {};

    constructor (parent: any){
        var that = this;

        this._dom = parent;

        this._dom.addEventListener('submit', function(){
            event.preventDefault();
            that.onsubmit();
        });
    }
    
    public getUser(){
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
        }
        return user;
    }
}

class signInAssistant{
    private _dom : any;

    private _control: any;
    private onsubmit(): void {};

    constructor (parent: any){
        var that = this;

        this._dom = parent;

        this._dom.addEventListener('submit', function(){
            event.preventDefault();
            that.onsubmit();
        });
    }
    
    public getUser(){
        var userMail = this._dom.querySelector('.registration-select--mail').value;
        var userPassword = this._dom.querySelector('.registration-select--password').value;
        
        var user = {
            eMail: userMail,
            password: userPassword
        }
        return user;
    }
}

class User{
    private _parent: any;

    private _name: string;
    private _mail: string;
    private _password: string;
    
    private _photo: string;
    private _country: string;
    private _city: string;
    private _contacts: string;
    private _info: string;

    private _access: number;
    

    private updateAccessVM(access: number): string{
        var accessVM: string;

        if ( access == 1) {
            accessVM = 'User';
        } else if ( access == 2) {
            accessVM = 'Developer';
        } else if ( access == 3) {
            accessVM = 'God';
        } else {
            accessVM = 'Slave';
        }
        
        return accessVM;
    }

    private updateVM(): void {
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
    }

    constructor(parent: any, name: string, mail: string, password: string, photo:string, country: string,
        city: string, contacts: string, info: string, access: number) {

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

    public setUser(name: string, mail: string, password: string, photo:string, country: string,
        city: string, contacts: string, info: string, access: number): void{
        
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
    public setUserByObj(user: any): void{
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
    }

}


