/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

import java.util.LinkedHashSet;

/**
 *
 * @author admin
 */
public class Dish {
    private LinkedHashSet<Component> components;
    private String name;
    private int id;
    private int count = 1;
    
    
    public Dish(int id,String name) {
        components = new LinkedHashSet<>();
        this.name = name;
        this.id = id;
    }
    public void addComponent(Component c) {
        components.add(c);
    }
    public int getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public int getCount() {
        return count;
    }
    public void addCount() {
        count++;
    }
}
