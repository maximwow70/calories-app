/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

import java.io.File;
import java.io.FileOutputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Base64;

/**
 *
 * @author admin
 */
public class SQL {
    private static final String url = "jdbc:mysql://localhost:3306/calories"; 
    private static final String userName = "root";
    private static final String password = "root";
    static Connection connect = null;
    static Statement stat = null;
    
    private static void connect() {
        try{
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            connect = DriverManager.getConnection(url, userName, password);
            stat = connect.createStatement();
        } catch(Exception e) {
            System.out.println("Error driver");
        }
    }
    
    public static ArrayList<Component> findComponents() {
        connect();
        ArrayList<Component> list = new ArrayList<>();
        try {
            ResultSet res =  stat.executeQuery("SELECT * FROM Components ORDER BY Name;");
            while(res.next()) {
                list.add(new Component(res.getString("Name"),res.getInt("ComponentID"),res.getInt("Calories")));
            }
            return list;
        } catch (SQLException e) {return null;}
    }
    
    public static ArrayList<Component> findComponentsByType(String type) {
        connect();
        ArrayList<Component> list = new ArrayList<>();
        try {
            ResultSet res = stat.executeQuery("SELECT * FROM Components WHERE Type = \""+type+"\" ORDER BY Name");
            while(res.next()) {
                list.add(new Component(res.getString("Name"),res.getInt("ComponentID"),res.getInt("Calories")));
            }
            return list;
        } catch (SQLException e) { return null;}
    }
    
    public static ArrayList<String> findTypesComponents() {
        connect();
        ArrayList<String> list = new ArrayList<>();
        try {
            ResultSet res = stat.executeQuery("SELECT DISTINCT Type FROM Components ORDER BY Type");
            while(res.next()) {
                list.add(res.getString("Type"));
            }
            return list;
        } catch(SQLException e) {return null;}
    }
    
    public static Dish findDishById(int id) {
        connect(); 
        try {
            ResultSet res = stat.executeQuery("SELECT * FROM Dishes WHERE DishID = "+id+";");
            res.next();
            return new Dish(res.getInt("DishID"),res.getString("Name"),res.getString("typeImage"));
        } catch(SQLException e) {return null;}
    }
    
    public static Dish findDishByName(String name) {
        connect();
        try{
            ResultSet res =  stat.executeQuery("SELECT * FROM Dishes WHERE Name LIKE \"%"+name+"%\";");
            res.next();
            return new Dish(res.getInt("DishID"),res.getString("Name"),res.getString("typeImage"));
        } catch(SQLException e) {return null;}
    }
    
    public static Dish findDishByNameOnly(String name) {
        connect();
        try{
            ResultSet res =  stat.executeQuery("SELECT * FROM Dishes WHERE Name = \""+name+"\";");
            res.next();
            return new Dish(res.getInt("DishID"),res.getString("Name"),res.getString("typeImage"));
        } catch(SQLException e) {return null;}
    }
    
    public static Component findComponentById(int id) {
        connect();
        try {
            ResultSet res = stat.executeQuery("SELECT * FROM Components WHERE ComponentID = "+id+";");
            res.next();
            return new Component(res.getString("Name"),res.getInt("ComponentID"),res.getInt("Calories"));
        } catch(SQLException e) {return null;}
    }
    
    public static Component findComponentByName(String name) {
        connect();
        try {
            ResultSet res = stat.executeQuery("SELECT * FROM Components WHERE Name LIKE \""+name+"\";");
            res.next();
            return new Component(res.getString("Name"),res.getInt("ComponentID"),res.getInt("Calories"),res.getString("Info"),res.getString("Type"),res.getInt("isImage"));
        } catch(SQLException e) {System.out.println("ByName ERROR");return null;}
    }
    
    public static ArrayList<Component> findComponentsByDishId(int id) {
        connect();
        ArrayList<Component> list = new ArrayList<>();
        try {
            ResultSet res = stat.executeQuery("SELECT c.*,f.Weight FROM Components c, DishFormulas f WHERE\n"
                    + "f.DishID = "+id+" AND\n"
                    + "c.ComponentID = f.ComponentID ;");
            while(res.next()) {
                list.add(new Component(res.getString("Name"),res.getInt("ComponentID"),res.getInt("Calories"),res.getInt("Weight"),res.getString("Info"),res.getString("Type"),res.getInt("isImage")));
            }
            return list;
        } catch(SQLException e) {System.out.println("ByDishId ERROR");return null;}
    }
    
    public static ArrayList<Dish> findDishesByNameAndComponents(Dish dish) {
        String url = "Select DISTINCT d.* from Dishes d,DishFormulas f \n" +
"INNER JOIN Components c ON\n" +
"c.ComponentID = f.ComponentID ";
        int i = 0;
        for(Component s : dish.getComponents()) {
            if(!s.getName().equals("")) {
                if(i == 0)
                    url+=" AND(\n";
                if(i>0)
                    url += " OR ";
                url+="c.Name = \""+s.getName()+"\"\n";
                i++;
            }
        }
        if(i>0)
            url+=")";
        url+= "AND\n" +
"(Select COUNT(dish.DishID) from DishFormulas dish where d.DishID = dish.DishID) >="+dish.length()+"\n" +
"WHERE\n" +
"d.Name LIKE \"%"+dish.getName()+"%\" AND\n" +
"d.DishID = f.DishID;";
        System.out.println(url);
        ArrayList<Dish> list = new ArrayList<>();
        connect();
        try {
        ResultSet res = stat.executeQuery(url);
            while(res.next()) {
                boolean is = false;
                list.add(new Dish(res.getInt("DishID"),res.getString("Name"),res.getString("typeImage")));
            }
            return list;
        } catch(SQLException e) {return null;}
    }
    
    public static boolean addDish(Dish dish) {
        connect();
        try {
            String code = dish.getImage();
            String type = code.substring(code.indexOf('/')+1, code.indexOf(';'));
            ResultSet res = stat.executeQuery("SELECT DishID from Dishes WHERE \n" +
                    "Name = \""+dish.getName()+"\";");
            res.next();
            try {
                res.getInt("DishID");
                return false;
            } catch(Exception e) {}
            stat.execute("INSERT INTO Dishes(Name, typeImage) VALUES(\""+dish.getName()+"\", \""+type+"\");");
            res = stat.executeQuery("SELECT DishID FROM Dishes WHERE Name = \""+dish.getName()+"\";");
            res.next();
            int id = res.getInt("DishID");
            Dish dish1 = findDishById(id);
            for(Component c :dish.getComponents()) {
                Component comp = findComponentByName(c.getName());
                if(!c.getName().equals(""))
                dish1.addComponent(new Component(comp.getName(),comp.getID(),comp.getCalories(),c.getWeight()));
            }
            for(Component comp : dish1.getComponents()) {
                stat.execute("INSERT INTO DishFormulas(DishID,ComponentID,Weight) VALUES ("+id+","+comp.getID()+","+comp.getWeight()+");");
            }
            
            code = code.substring(code.indexOf(',')+1);
            byte[] byteImage = Base64.getDecoder().decode(code);
            try (FileOutputStream out = new FileOutputStream(new File("/Users/admin/Desktop/git/calories-app/src/javaProject/Calories/build/web/img/"+dish1.getSrc()))) {
                out.write(byteImage);
            }
            return true;
        } catch (Exception ex) {
            return false;
        }
    }
    
    public static boolean addComponent(Component component) {
        connect();
        try {
            String code = component.getImage();
            int isImage = 1;
            if(code.equals(""))
                isImage = 0;
            ResultSet res = stat.executeQuery("SELECT * FROM Components WHERE Name = \""+component.getName()+"\"");
            System.out.println("1");
            res.next();
            try{
                res.getInt("ComponentID");
                return false;
            } catch(Exception e){}
            System.out.println("2");
            stat.execute("INSERT INTO Components(Name,Calories,Type,Info,isImage) \n"
                    + "VALUES (\""+component.getName()+"\","+component.getCalories()+",\""+component.getType()+"\",\""+component.getInfo()+"\","+isImage+");");
            res = stat.executeQuery("SELECT * FROM Components WHERE Name = \""+component.getName()+"\"");
            res.next();
            System.out.println("3");
            component = new Component(res.getString("Name"),res.getInt("ComponentID"),res.getInt("Calories"),res.getString("Info"),res.getString("Type"),res.getInt("isImage"));
            byte[] byteImage = Base64.getDecoder().decode(code.substring(code.indexOf(',')+1));
            try (FileOutputStream out = new FileOutputStream(new File("/Users/admin/Desktop/git/calories-app/src/javaProject/Calories/build/web/img/Components/"+component.getSrc()))) {
                out.write(byteImage);
            }
            System.out.println("4");
            return true;
        } catch (Exception e) {return false;}   
    }
    
    public static void addUser() {
        
    }
    
}
