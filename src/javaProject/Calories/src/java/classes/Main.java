/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

import com.google.gson.Gson;
import java.io.FileNotFoundException;
import java.io.IOException;

/**
 *
 * @author admin
 */
public class Main {
    public static void main(String... args) throws FileNotFoundException, IOException {
        User user;
        String t = "test";
        user = SQL.findUser(t, t);
        Gson gson = new Gson();
        String str = gson.toJson(user);
        System.out.println(SQL.getUserAccess(user));
    }
}
