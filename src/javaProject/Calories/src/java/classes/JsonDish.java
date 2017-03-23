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
public class JsonDish {
    public String dishName;
    public String[] names;
    public JsonDish(String dishName, String[] names) {
        this.dishName = dishName;
        this.names = names;
    }
}
