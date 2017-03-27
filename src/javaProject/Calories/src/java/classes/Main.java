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
        
        
        String string = "{\"name\":\"\",\"components\":[{\"name\":\"\",\"weight\":100},{\"name\":\"\",\"weight\":100},{\"name\":\"\",\"weight\":100}]}";
        
        //КОСТЫЛЬ!!!!!!
        Gson gson = new Gson();
        Dish dish = gson.fromJson(string, Dish.class);
        
        
        lightSet = SQL.findDishesByNameAndComponents(dish);
        for(Dish d:lightSet) {
            System.out.println(d.getName());
        if(d.getCount() >= dish.length())
            set.add(d);
        }
        String s = gson.toJson(set);
        System.out.println(s);
    }
}
