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
    public final String FolderImages = "/Users/admin/Desktop/git/calories-app/src/javaProject/Calories/build/web/img/users/";
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
    private String srcServer;
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
        setSRCServer(id,type);
    }
    
    private void setSRCServer(int id, String type) {
        if(type.equals("NAN"))
            srcServer=FolderImages+"user.png";
        else {
            if(type.equals("jpeg"))
                srcServer=FolderImages+"user"+id+".jpg";
            else
                srcServer=FolderImages+"user"+id+"."+type;
        }
    }
    private void setSRC(int id, String type) {
        if(type.equals("NAN"))
            src="./img/users/user.png";
        else {
            if(type.equals("jpeg"))
                src="./img/users/user"+id+".jpg";
            else
                src="./img/users/user"+id+"."+type;
        }
    }
    
    private void setDishes(int id) {
        dishes = SQL.findDishesByUserId(id);
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
    public String getSRCServer() {
        return srcServer;
    }
    public String getSRC() {
        return src;
    }
    public String getImage() {
        return image;
    }
    
}
