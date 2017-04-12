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
    private int weight;
    private int calories;
    private String src;
    private String image;
    
    public Dish(int id,String name) {
        components = new ArrayList<>();
        this.name = name;
        this.id = id;
        src = "dish"+id+".jpg";
        addComponents(SQL.findComponentsByDishId(id));
        weight = getWeight();
        calories = getCalories();
    }
    
    public Dish(int id,String name, String type) {
        components = new ArrayList<>();
        this.name = name;
        this.id = id;
        src = "dish"+id+"."+type;
        addComponents(SQL.findComponentsByDishId(id));
        weight = getWeight();
        calories = getCalories();
    }
    
    public void addComponent(Component c) {
        components.add(c);
    }
    public void addComponents(ArrayList<Component> list) {
        components.addAll(list);
    }
    
    public int length() {
        int count = 0;
        for(Component c : components) {
            if(!c.getName().equals(""))
                count++;
        }
        return count;
    }
    
    //gets
    public int getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getImage() {
        return image;
    }
    public String getSrc() {
        return src;
    }
    public ArrayList<Component> getComponents() {
        return components;
    }
    public int getWeight() {
        int result = 0;
        for(Component c : components) {
            result+=c.getWeight();
        }
        return result;
    }
    public int getCalories() {
        int result = 0;
        for(Component c : components) {
            result+=(c.getWeight()*c.getCalories())/100;
        }
        return result;
    }
}
