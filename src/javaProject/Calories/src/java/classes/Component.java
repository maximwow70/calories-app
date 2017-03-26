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
    public String name;
    public int calories;
    public int weight;
    public int id;
    
    
    public Component(String name, int id,int calories) {
        this.name = name;
        this.id = id;
        this.calories = calories;
        weight = 0;
    }
    public Component(String name, int id, int calories, int weidth) {
        this.name = name;
        this.id = id;
        this.calories = calories;
        this.weight = weidth;
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
