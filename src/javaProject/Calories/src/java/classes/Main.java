/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

import com.google.gson.Gson;
import java.util.ArrayList;

/**
 *
 * @author admin
 */
public class Main {
    public static void main(String... args) {
        ArrayList<Dish> lightSet = new ArrayList<>();
        ArrayList<Dish> set = new ArrayList<>();
        
        
        String[] str = {"name"};
        JsonDish jsonDish = new JsonDish("",str);
        
        lightSet = SQL.findDishesByNameAndComponents(jsonDish.getName(), jsonDish.getComponents());
        for(Dish d:lightSet) {
            System.out.println(d.getName());
        if(d.getCount() >= jsonDish.length())
            set.add(d);
        }
        Gson gson = new Gson();
        System.out.println(gson.toJson(set));
        
    }
}
