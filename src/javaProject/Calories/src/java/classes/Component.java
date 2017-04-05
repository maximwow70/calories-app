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
public class Component {
    private String name;
    private int calories;
    private int weight;
    private int id;
    private String info;
    
    public Component(String name, int id,int calories) {
        this.name = name;
        this.id = id;
        this.calories = calories;
        weight = 0;
    }
    public Component(String name, int id, int calories, int weight) {
        this.name = name;
        this.id = id;
        this.calories = calories;
        this.weight = weight;
    }
    public Component(String name, int id, int calories, String info) {
        this.name = name;
        this.id = id;
        this.calories = calories;
        this.info = info;
    }
    public int getID() {
        return id;
    }
    public int getWeight() {
        return weight;
    }
    public String getName() {
        return name;
    }
    public int getCalories() {
        return calories;
    }
}
