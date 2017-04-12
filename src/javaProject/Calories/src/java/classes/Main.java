/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

import static classes.SQL.findUser;
import com.google.gson.Gson;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Map;

/**
 *
 * @author admin
 */
public class Main {
    public static void main(String... args) throws FileNotFoundException, IOException {
        ArrayList<Dish> list = new ArrayList<>();
        String json = "{\"user\":{\"eMail\":\"Dima\",\"password\":\"Dima\"},\"dish\":{\"name\":\"nameDish\",\"components\":[{\"name\":\"\",\"weight\":\"123\"},{\"name\":\"\",\"weight\":\"444\"}],\"image\":\"\"}}";
        String jsonUser = map.get("user")[0];
        String jsonDish = map.get("dish")[0];
        Gson gson = new Gson();
        Dish dish = gson.fromJson(jsonDish, Dish.class);
        User user = gson.fromJson(jsonUser, User.class);
        String result = SQL.addDish(dish,user);
        list.add(SQL.findDishByNameOnly(dish.getName()));
        
        String outJson = "{\"result\" : \""+result+"\", \"dish\":"+gson.toJson(list)+"}";
        response.getWriter().write(outJson);
    }
}
