/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

import java.util.ArrayList;

/**
 *
 * @author admin
 */
public class User {
    private int id;
    private String eMail;
    private String password;
    private String country;
    private String city;
    private String info;
    private String name;
    private String contact;
    private int access;
    private String image;
    private String src;
    private String longSrc;
    private ArrayList<Dish> dishes;
    
    public User(int id,String eMail, String password, String name, String info, String country, String city, String contact, int access, String type) {
        this.id = id;
        this.eMail = eMail;
        this.password = password;
        this.name = name;
        this.info = info;
        this.country = country;
        this.city = city;
        this.contact = contact;
        this.access = access;
        setDishes(id);
        setSRC(id,type);
        setLongSRC(id,type);
    }
    
    private void setLongSRC(int id, String type) {
        if(type.equals("NAN"))
            longSrc=Constants.FOLDER_USER_IMAGE_FULL+"user.png";
        else {
            if(type.equals("jpeg"))
                longSrc=Constants.FOLDER_USER_IMAGE_FULL+"user"+id+".jpg";
            else
                longSrc=Constants.FOLDER_USER_IMAGE_FULL+"user"+id+"."+type;
        }
    }
    
    private void setSRC(int id, String type) {
        if(type.equals("NAN"))
            src=Constants.FOLDER_USER_IMAGE_LOCAL+"user.png";
        else {
            if(type.equals("jpeg"))
                src=Constants.FOLDER_USER_IMAGE_LOCAL+"user"+id+".jpg";
            else
                src=Constants.FOLDER_USER_IMAGE_LOCAL+"user"+id+"."+type;
        }
    }
    
    private void setDishes(int id) {
        dishes = SQL.findDishesByUserId(id);
    }
    
    //gets
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
    public String getLongSRC() {
        return longSrc;
    }
    public String getSRC() {
        return src;
    }
    public String getImage() {
        return image;
    }
    public int getId() {
        return id;
    }
    
}
