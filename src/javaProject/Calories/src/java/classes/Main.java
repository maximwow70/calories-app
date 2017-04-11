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
        String jsonUser = "{\"name\":\"qwe\",\"eMail\":\"qwe\",\"password\":\"qwe\",\"country\""
                + ":\"qwe\",\"city\":\"qwe\",\"contact\":\"wqe\",\"info\":\"qwe\",\"image\":\"\"}";
        Gson gson = new Gson();
        User user = gson.fromJson(jsonUser, User.class);
        String answer =  "";
        boolean lol = SQL.addUser(user);
        System.out.println(lol);
        //if(lol) {
            user = SQL.findUser(user.getEMail(), user.getPassword());
            answer = gson.toJson(user);
        //}
        System.out.println(answer);
    }
}
