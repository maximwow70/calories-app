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
public class Dish {
    private ArrayList<Component> components;
    private String name;
    private int id;
    private int count = 1;
    
    
    public Dish(int id,String name) {
        components = new ArrayList<>();
        this.name = name;
        this.id = id;
        setComponents(SQL.findComponentsByDishId(id));
    }
    public void addComponent(Component c) {
        components.add(c);
    }
    public void setComponents(ArrayList<Component> list) {
        components = list;
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
    public ArrayList<Component> getComponents() {
        return components;
    }
}
