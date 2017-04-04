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
public class Components {
    private ArrayList<Component> components;
    private String type;
    
    public Components(ArrayList<Component> components, String type) {
        this.components = components;
        this.type = type;
    }
    public ArrayList<Component> getComponents() {
        return components;
    }
    public String getType() {
        return type;
    }
}
