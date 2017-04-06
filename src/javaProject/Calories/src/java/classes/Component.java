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
    private String img;
    private String type;
    
    public Component(String name, int id,int calories) {
        this.name = name;
        this.id = id;
        this.calories = calories;
        weight = 0;
        img = "Component"+id+".svg";
    }
    public Component(String name, int id, int calories, int weight) {
        this.name = name;
        this.id = id;
        this.calories = calories;
        this.weight = weight;
        img = "Component"+id+".svg";
    }
    public Component(String name, int id, int calories, int weight, String info, String type, int isImage) {
        this.name = name;
        this.id = id;
        this.calories = calories;
        this.type = type;
        this.weight = weight;
        if(isImage == 1)
            img = "Component"+id+".svg";
        else
            img = type+".svg";
        if(info!=null)
            this.info = info;
        else 
            this.info = "";
    }
    public Component(String name, int id, int calories, String info, String type, int isImage) {
        this.name = name;
        this.id = id;
        this.calories = calories;
        this.type = type;
        weight = 0;
        if(isImage == 1)
            img = "Component"+id+".svg";
        else
            img = type+".svg";
        if(info!=null)
            this.info = info;
        else 
            this.info = "";
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
