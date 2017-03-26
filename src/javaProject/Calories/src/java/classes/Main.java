/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

import com.google.gson.Gson;

/**
 *
 * @author admin
 */
public class Main {
    public static void main(String... args) {
        Dish dish = SQL.findDishById(1);
        Gson gson = new Gson();
        System.out.println(gson.toJson(dish));
    }
}
