/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

/**
 *
 * @author admin
 */
public class User {
    private String eMail;
    private String password;
    private String country;
    private String city;
    private String info;
    private String name;
    private String contact;
    private int access;
    
    public User(String eMail, String password, String name, String info, String country, String city, String contact) {
        this.eMail = eMail;
        this.password = password;
        this.name = name;
        this.info = info;
        this.country = country;
        this.city = city;
        this.contact = contact;
    }
    
    public User(String eMail, String password, String name, String info, String country, String city, String contact, int access) {
        this.eMail = eMail;
        this.password = password;
        this.name = name;
        this.info = info;
        this.country = country;
        this.city = city;
        this.contact = contact;
        this.access = access;
    }
    public String getEMail() {
        return eMail;
    }
    public String getPassword() {
        return password;
    }
    public String getName() {
        return name;
    }
    public String getInfo() {
        return info;
    }
    public String getCountry() {
        return country;
    }
    public String getCity() {
        return city;
    }
    public String getContact() {
        return contact;
    }
    
}
