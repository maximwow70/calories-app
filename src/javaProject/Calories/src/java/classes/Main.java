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
        Gson gson = new Gson();
        ArrayList<ComponentsByTypes> list = new ArrayList<>();
        ArrayList<String> types = SQL.findTypesComponents();
        if(types==null)
            System.out.println("lol");
        for(String type : types) {
            list.add(new ComponentsByTypes(type));
        }
        String s = gson.toJson(list);
        System.out.println(s);
    }
}
