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
public class JsonDish {
    private String name;
    private ArrayList<String> components;
    public JsonDish(String name) {
        this.name = name;
        components = new ArrayList<>();
    }
    public int length() {
        int k = 0;
        for(String s:components) {
            if(!s.equals(""))
                k++;
        }
        return k;
    }
    public void addComponent(String s) {
        components.add(s);
    }
    public String getName() {
        return name;
    }
    public ArrayList<String> getComponents() {
        return components;
    }
}
