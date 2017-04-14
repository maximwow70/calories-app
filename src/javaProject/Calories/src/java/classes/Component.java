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
    private String image;
    private String src;
    private String longSrc;
    private String type;
    
    public Component(String name, int id,int calories) {
        this.name = name;
        this.id = id;
        this.calories = calories;
        weight = 0;
        setSRC();
    }
    
    public Component(String name, int id, int calories, int weight) {
        this.name = name;
        this.id = id;
        this.calories = calories;
        this.weight = weight;
        src = "Component"+id+".svg";
    }
    
    public Component(String name, int id, int calories, String info, String type, int isImage) {
        this.name = name;
        this.id = id;
        this.calories = calories;
        this.type = type;
        this.weight = 0;
        setSRC(isImage,type);
        if(info!=null)
            this.info = info;
        else 
            this.info = "";
    }
    
    public Component(String name, int id, int calories, int weight, String info, String type, int isImage) {
        this.name = name;
        this.id = id;
        this.calories = calories;
        this.type = type;
        this.weight = weight;
        setSRC(isImage,type);
        if(info!=null)
            this.info = info;
        else 
            this.info = "";
    }
    
    private void setSRC() {
        src = "Component"+id+".svg";
    }
    private void setSRC(int isImage,String type) {
        if(isImage == 1)
            src = "Component"+id+".svg";
        else
            src = "Default/"+type+".svg";
    }
    
    //gets
    public int getId() {
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
    public String getImage() {
        return image;
    }
    public String getType() {
        return type;
    }
    public String getInfo() {
        return info;
    }
    public String getSrc() {
        if(src!=null)
            return src;
        else
            return "Component"+id+".svg";
    }
}
