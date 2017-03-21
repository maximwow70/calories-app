/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author admin
 */
public class Main {
    public static void main(String... args) {
        try {
            ResultSet rs = SQL.findComponentsByDishId(1);
            while(rs.next()) {
                System.out.println(rs.getString("Name"));
            }
        } catch (Exception e) {
            System.out.println("resSetError");
        }
    }
}
