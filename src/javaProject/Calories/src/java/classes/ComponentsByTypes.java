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
public class ComponentsByTypes {
    private ArrayList<String> components = new ArrayList<>();
    private String type;
    
    public ComponentsByTypes( String type) {
        this.type = type;
        ArrayList<Component> list = SQL.findComponentsByType(type);
        for(Component c : list) {
            components.add(c.getName());
        }
    }
    public ArrayList<String> getComponents() {
        return components;
    }
    public String getType() {
        return type;
    }
}
