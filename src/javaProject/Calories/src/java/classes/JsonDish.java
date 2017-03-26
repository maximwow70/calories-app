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
    private String name;
    private String[] components;
    public JsonDish(String name, String[] components) {
        this.name = name;
        this.components = components;
    }
    public int length() {
        int k = 0;
        for(String s:components) {
            if(!s.equals(""))
                k++;
        }
        return k;
    }
    public String getName() {
        return name;
    }
}
