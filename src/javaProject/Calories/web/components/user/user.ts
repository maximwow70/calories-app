declare var $: Function;
class RegistrationAssistant{
    private _dom: any;

    private _control: any;
    private onsubmit(): void {};

    constructor (parent: any){
        var that = this;

        this._dom = parent.querySelector('.registration');

        this._dom.addEventListener('submit', function(){
            event.preventDefault();
            that.onsubmit();
        });

        var btnClose = this._dom.querySelector('.registration-btn--close');
        btnClose.addEventListener('click', function(){
            var ar = parent.querySelector('.account-registration');
            $(ar).addClass('account-registration--close');
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
        
        var userPhoto: any;
        try{
            userPhoto = this._dom.querySelector('.registration-select--file .file_select').files[0];
        } catch(e){
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
        }
        return user;
    }
}

class SignInAssistant{
    private _dom : any;

    private _control: any;
    private onsubmit(): void {};

    constructor (parent: any){
        var that = this;
        
        this._dom = parent.querySelector('.sign_in');

        this._dom.addEventListener('submit', function(){
            event.preventDefault();
            that.onsubmit();
        });

        var btnClose = this._dom.querySelector('.sign_in-btn--close');
        btnClose.addEventListener('click', function(){
            var ar = parent.querySelector('.account-sign_in');
            $(ar).addClass('account-sign_in--close');
        });
    }
    
    public getUser(){
        var userMail = this._dom.querySelector('.sign_in-select--mail').value;
        var userPassword = this._dom.querySelector('.sign_in-select--password').value;
        
        var user = {
            eMail: userMail,
            password: userPassword
        }
        return user;
    }
}

class StatisticAssistant{

}

class User{
    private _dom: any;

    private _name: string;
    private _mail: string;
    private _password: string;
    
    private _photo: string;
    private _country: string;
    private _city: string;
    private _contacts: string;
    private _info: string;

    private _access: number;
    
    public _registrationAssistant: RegistrationAssistant;
    public _signInAssistant: SignInAssistant;
    public _statisticAssistant: StatisticAssistant;
    private _controlAssistants: any;

    
    constructor(parent: any, name: string, mail: string, password: string, photo:string, country: string,
        city: string, contacts: string, info: string, access: number) {

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

    private initControlAssistants(): void{
        let that = this;

        var controlsRegistration = this._dom.querySelectorAll('.navigation-list--registrate');
        var controlsSignIn = this._dom.querySelectorAll('.navigation-list--sign_in');
        var controlsSignOut = this._dom.querySelectorAll('.navigation-list--sign_out');


        let reg = that._dom.querySelector('.account-registration');
        let signIn = that._dom.querySelector('.account-sign_in');

        function initControlRegistration(){
            $(reg).removeClass('account-registration--close');
            $(signIn).addClass('account-sign_in--close');
        }        
        for (let i = 0; i < controlsRegistration.length; i++){
            controlsRegistration[i].addEventListener('click', initControlRegistration);
        }
    
        function initControlSignIn(){
            $(signIn).removeClass('account-sign_in--close');
            $(reg).addClass('account-registration--close');
        }
        for (let i = 0; i < controlsSignIn.length; i++){
            controlsSignIn[i].addEventListener('click', initControlSignIn);
        }

        this._controlAssistants = {
            registrate: controlsRegistration,
            signIn: controlsSignIn,
            signOut: controlsSignOut
        }

        function initControlSignOut(){
            that.outUser();
        }
        for (let i = 0; i < controlsSignOut.length; i++){
            controlsSignOut[i].addEventListener('click', initControlSignOut);
        }
    }
    
    private removeAssistentsVM(){
        var reg = this._dom.querySelector('.account-registration');
        $(reg).addClass('account-registration--close');

        var si = this._dom.querySelector('.account-sign_in');
        $(si).addClass('account-sign_in--close');
    }
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
    private updateControlsVM(isOut: boolean): void{
        var controlReg = this._controlAssistants.registrate;
        for (let i = 0; i < controlReg.length; i++){
            controlReg[i].style.display = isOut ? 'inline-block' : 'none';
        }
        var controlSignIn = this._controlAssistants.signIn;
        for (let i = 0; i < controlSignIn.length; i++){
            controlSignIn[i].style.display = isOut ? 'inline-block' : 'none';
        }
        var controlSignOut = this._controlAssistants.signOut;
        for (let i = 0; i < controlSignOut.length; i++){
            controlSignOut[i].style.display = isOut ? 'none' : 'inline-block';
        }
    }
    private updateVM(): void {
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
        
        this.updateControlsVM(false);
        this.removeAssistentsVM();
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
        
        this.updateControlsVM(false);
        this.removeAssistentsVM();
        this.updateVM();
    }
    public outUser(){
        this.setUser('', '', '', '', '', '', '', '', 0);

        this.updateControlsVM(true);
        this.updateVM();
    }
}




