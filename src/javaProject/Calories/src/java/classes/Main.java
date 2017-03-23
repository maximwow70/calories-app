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
        LinkedHashSet<Component> set = new LinkedHashSet<>();
        ResultSet res = null;
        try {
            res = SQL.findComponents();
            while(res.next()) {
            set.add(new Component(res.getString("Name"),res.getInt("ComponentID")));
        }
        } catch (SQLException ex) { }
        Gson g = new Gson();
        String s = g.toJson(set);
        System.out.println(s);
    }
}
