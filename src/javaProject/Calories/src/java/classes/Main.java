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
        String str = "Apples (dried, uncooked)";
            Component component = SQL.findComponentByName(str);
            Gson gson = new Gson();
            String s = gson.toJson(component);
        System.out.println(s);
    }
}
