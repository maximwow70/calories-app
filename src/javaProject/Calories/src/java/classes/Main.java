/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

import com.google.gson.Gson;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedHashSet;

/**
 *
 * @author admin
 */
public class Main {
    public static void main(String... args) {
        LinkedHashSet<Dish> lightSet = new LinkedHashSet<>();
        LinkedHashSet<Dish> set = new LinkedHashSet<>();
        
        Gson gson = new Gson();
        String[] str = {"name"};
        JsonDish jsonDish = new JsonDish("",str);
        
        try {
            ResultSet res = SQL.findDishByNameAndComponents(jsonDish.dishName, jsonDish.names);
            while(res.next()) {
                boolean is = false;
                for(Dish d :lightSet) {
                    if(d.getId() == res.getInt("DishID")){
                        d.addCount();
                        is = true;
                        break;
                    }
                }
                if(!is)
                lightSet.add(new Dish(res.getInt("DishID"),res.getString("Name")));
            }
            for(Dish d : lightSet) {
                res = SQL.findComponentsByDishId(d.getId());
                while(res.next()) {
                    String name = res.getString("Name");
                    int id = res.getInt("ComponentID");
                    int calories = res.getInt("Calories");
                    d.addComponent(new Component(name,id,calories));
                }
            }
            for(Dish d:lightSet) {
            if(d.getCount() == str.length)
                set.add(d);
        }
        } catch(SQLException ex) {System.out.println("Error");}
        String s = gson.toJson(set);
        System.out.println(s);
        for(Dish d:set) {
            System.out.println(d.getName());
        }
    }
}
