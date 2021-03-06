/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
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
        } catch(ClassNotFoundException | InstantiationException | IllegalAccessException | SQLException e) {
            System.out.println("Error driver");
        }
    }
    
    //Component
    private static Component initComponentWithoutInfo(ResultSet res) throws SQLException {
        return new Component(res.getString("Name"),res.getInt("ComponentID"),res.getInt("Calories"));
    }
    
    private static Component initComponentWithInfo(ResultSet res) throws SQLException {
        return new Component(res.getString("Name"),res.getInt("ComponentID"),res.getInt("Calories"),res.getInt("Weight"),res.getString("Info"),res.getString("Type"),res.getInt("isImage"));
    }
    
    private static Component initComponentWithInfoWithoutWeight(ResultSet res) throws SQLException {
        return new Component(res.getString("Name"),res.getInt("ComponentID"),res.getInt("Calories"),res.getString("Info"),res.getString("Type"),res.getInt("isImage"));
    }
    
    public static ArrayList<Component> findComponents() {
        connect();
        ArrayList<Component> list = new ArrayList<>();
        try {
            ResultSet res =  stat.executeQuery("SELECT * FROM Components ORDER BY Name;");
            while(res.next()) {
                list.add(initComponentWithoutInfo(res));
            }
            return list;
        } catch (SQLException e) {return new ArrayList<>();}
    }
    
    public static ArrayList<Component> findComponentsByType(String type) {
        connect();
        ArrayList<Component> list = new ArrayList<>();
        try {
            ResultSet res = stat.executeQuery("SELECT * FROM Components WHERE Type = \""+type+"\" ORDER BY Name");
            while(res.next()) {
                list.add(initComponentWithoutInfo(res));
            }
            return list;
        } catch (SQLException e) { return new ArrayList<>();}
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
        } catch(SQLException e) {return new ArrayList<>();}
    }
    
    public static Component findComponentById(int id) {
        connect();
        try {
            ResultSet res = stat.executeQuery("SELECT * FROM Components WHERE ComponentID = "+id+";");
            res.next();
            return initComponentWithoutInfo(res);
        } catch(SQLException e) {return null;}
    }
    
    public static Component findComponentByName(String name) {
        connect();
        try {
            ResultSet res = stat.executeQuery("SELECT * FROM Components WHERE Name LIKE \""+name+"\";");
            res.next();
            return initComponentWithInfoWithoutWeight(res);
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
                list.add(initComponentWithInfo(res));
            }
            return list;
        } catch(SQLException e) {return new ArrayList<>();}
    }
    
    public static String addComponent(Component component, User user) {
        connect();
        try {
            if(getUserAccess(user)>1) {
                String code = component.getImage();
                int isImage = 1;
                if(code.equals(""))
                    isImage = 0;
                ResultSet res = stat.executeQuery("SELECT * FROM Components WHERE Name = \""+component.getName()+"\"");
                res.next();
                try{
                    res.getInt("ComponentID");
                    return "Component in BD";
                } catch(Exception e){}
                stat.execute("INSERT INTO Components(Name,Calories,Type,Info,isImage,autor) \n"
                        + "VALUES (\""+component.getName()+"\","+component.getCalories()+",\""+component.getType()+"\",\""+component.getInfo()+"\","+isImage+",\""+user.getEMail()+"\");");
                component = SQL.findComponentByName(component.getName());
                System.out.println(Constants.FOLDER_COMPONENT_IMAGE_FULL+component.getSrc());
                byte[] byteImage = Base64.getDecoder().decode(code.substring(code.indexOf(',')+1));
                System.out.println("norm");
                try (FileOutputStream out = new FileOutputStream(new File(Constants.FOLDER_COMPONENT_IMAGE_FULL+component.getSrc()))) {
                    out.write(byteImage);
                }
                return "Vse norm";
            }
            else 
                return "net prav";
        } catch (SQLException | IOException e) {return "oshibochka";}   
    }
    
    public static boolean removerComponent(Component component) {
        connect();
        try {
            component = findComponentById(component.getId());
            stat.execute("DELETE FROM Components WHERE ComponentID = " + component.getId());
            File file = new File(Constants.FOLDER_COMPONENT_IMAGE_FULL+component.getSrc());
            file.delete();
            return true;
        } catch (Exception e) { return false;}
    }
    
    //Dish
    
    private static Dish initDish(ResultSet res) throws SQLException {
        return new Dish(res.getInt("DishID"),res.getString("Name"),res.getString("typeImage"));
    }
    
    public static Dish findDishById(int id) {
        connect(); 
        try {
            ResultSet res = stat.executeQuery("SELECT * FROM Dishes WHERE DishID = "+id+";");
            res.next();
            return initDish(res);
        } catch(SQLException e) {return null;}
    }
    
    public static Dish findDishByName(String name) {
        connect();
        try{
            ResultSet res =  stat.executeQuery("SELECT * FROM Dishes WHERE Name LIKE \"%"+name+"%\";");
            res.next();
            return initDish(res);
        } catch(SQLException e) {return null;}
    }
    
    public static Dish findDishByNameOnly(String name) {
        connect();
        try{
            ResultSet res =  stat.executeQuery("SELECT * FROM Dishes WHERE Name = \""+name+"\";");
            res.next();
            return initDish(res);
        } catch(SQLException e) {return null;}
    }
    
    public static ArrayList<Dish> findDishesByUserId(int id) {
        connect();
        try {
            ArrayList<Dish> list = new ArrayList<>();
            ResultSet res = stat.executeQuery("SELECT d.* FROM Dishes d \n" +
"INNER JOIN DishList dl ON dl.DishID = d.DishID AND dl.UserID = "+id+";");
            while(res.next())
                list.add(initDish(res));
            return list;
        } catch (Exception e) {return new ArrayList<>();}
    }
    
    public static ArrayList<Dish> findDishesByNameAndComponents(Dish dish) {
        String execute = "";
        if(dish.length()==0) {
            execute = "Select DISTINCT d.* from Dishes d" + 
                    "\nWHERE\n" + 
                    "d.Name LIKE \"%"+dish.getName()+"%\"";
        }
        else {
            int count = 0;
            for(Component s : dish.getComponents()) {
                if(!s.getName().equals("")) {
                    if(count != 0)
                        execute+=" AND\n" +
                            "d.DishID in\n" +
                            "(";
                    execute+="Select DISTINCT ";
                    if(count == 0)
                        execute+="d.*";
                    else
                        execute+="d.DishID";
                    execute+=" from Dishes d,DishFormulas f \n" +
                    "INNER JOIN Components c ON\n" +
                    "c.ComponentID = f.ComponentID  AND\n" +
                    "c.Name = \""+s.getName()+"\"\n" +
                    "WHERE\n" +
                    "d.Name LIKE \"%"+dish.getName()+"%\" AND\n" +
                    "d.DishID = f.DishID";
                    count++;
                }
            }
            for(int i = 0; i < count-1; i++) {
                execute+=")";
            }
        }
        System.out.println(execute);
        ArrayList<Dish> list = new ArrayList<>();
        connect();
        try {
        ResultSet res = stat.executeQuery(execute);
            while(res.next()) {
                boolean is = false;
                list.add(initDish(res));
            }
            return list;
        } catch(SQLException e) {return new ArrayList<>();}
    }
    
    public static String addDish(Dish dish, User user) {
        connect();
        try {
            if(getUserAccess(user)>0) {
            String code = dish.getImage();
            String type = code.substring(code.indexOf('/')+1, code.indexOf(';'));
            ResultSet res = stat.executeQuery("SELECT DishID from Dishes WHERE \n" +
                    "Name = \""+dish.getName()+"\";");
            res.next();
            try {
                res.getInt("DishID");
                return "the dish in DB";
            } catch(Exception e) {}
            stat.execute("INSERT INTO Dishes(Name, typeImage,autor) VALUES(\""+dish.getName()+"\", \""+type+"\", \""+user.getEMail()+"\");");
            res = stat.executeQuery("SELECT DishID FROM Dishes WHERE Name = \""+dish.getName()+"\";");
            res.next();
            int id = res.getInt("DishID");
            Dish dish1 = findDishById(id);
            dish.getComponents().stream().forEach((c) -> {
                Component comp = findComponentByName(c.getName());
                if (!c.getName().equals("")) {
                    dish1.addComponent(new Component(comp.getName(),comp.getId(),comp.getCalories(),c.getWeight()));
                }
                });
            for(Component comp : dish1.getComponents()) {
                stat.execute("INSERT INTO DishFormulas(DishID,ComponentID,Weight) VALUES ("+id+","+comp.getId()+","+comp.getWeight()+");");
            }
            
            code = code.substring(code.indexOf(',')+1);
            byte[] byteImage = Base64.getDecoder().decode(code);
            try (FileOutputStream out = new FileOutputStream(new File(Constants.FOLDER_IMAGE_FULL+dish1.getSrc()))) {
                out.write(byteImage);
            }
            return "norm";
            }
            else
                return "malo dostupa";
        } catch (SQLException | IOException ex) {
            return "ne norm";
        }
    }
    
   public static String AddDishIntoDishList(Dish dish, User user) {
       connect();
       try {
            ResultSet res = stat.executeQuery("SELECT COUNT(*) as count FROM DishList WHERE UserID = "+user.getId()+" AND DishID = "+dish.getId());
            res.next();
            int count = res.getInt("count");
            res = stat.executeQuery("SELECT COUNT(*) as count FROM DishList WHERE UserID = "+user.getId());
            res.next();
            int countDishes = res.getInt("count");
            if(count==0&&countDishes<=20) {
                stat.execute("INSERT INTO DishList(UserID,DishID) VALUES("+user.getId()+","+dish.getId()+")");
                return "true"; 
            }
            return "false";
       } catch(SQLException e) {return "false";}
   }
   
   public static void RemoveDishFromDishList(Dish dish,User user) {
       connect();
       try {
           stat.execute("DELETE FROM DishList WHERE UserID = "+user.getId()+" AND DishID = "+dish.getId());
       } catch(Exception e) {}
   }
   
   public static boolean RemoveDish(Dish dish,User user) {
       connect();
       try {
           if(getUserAccess(user)>2) {
           stat.execute("DELETE FROM DishList WHERE DishID = " + dish.getId());
           stat.execute("DELETE FROM DishFormulas WHERE DishID = " + dish.getId());
           stat.execute("DELETE FROM Dishes WHERE DishID = " + dish.getId());
           return true;
           }
           return false;
       } catch (SQLException e) { return false;}
   }
    
    //User
    private static User initUser(ResultSet res) throws SQLException {
        return new User(res.getInt("UserID"),res.getString("eMail"),res.getString("Password"),res.getString("Name"),res.getString("Info"),
                    res.getString("Country"),res.getString("City"),res.getString("Contact"),res.getInt("Access"),res.getString("TypeImage"));
    }
    public static boolean addUser(User user) {
        connect();
        try{
            String code = user.getImage();
            boolean isImage = true;
            if(code.equals("")) {
                isImage = false;
            }
            ResultSet res = stat.executeQuery("SELECT * FROM Users WHERE eMail = \""+user.getEMail()+"\"");
            res.next();
            try{
                res.getInt("UserID");
                return false;
            } catch (Exception e) {}
            String type = "NAN";
            if(isImage) {
                type = code.substring(code.indexOf('/')+1, code.indexOf(';'));
            }
            String execute = "INSERT INTO Users(eMail,Name,Country,City,Contact,Info,Password,TypeImage)\n" +
"values(\""+user.getEMail()+"\",\""+user.getName()+"\",\""+user.getCountry()+"\",\""+user.getCity()+"\",\""+user.getContact()+"\",\""+user.getInfo()+"\",\n" +
"\""+user.getPassword()+"\", \""+type+"\")";
            stat.execute(execute);
            if(isImage) {
                user = findUser(user.getEMail(),user.getPassword());
                code = code.substring(code.indexOf(',')+1);
                byte[] byteImage = Base64.getDecoder().decode(code);
                try(FileOutputStream out = new FileOutputStream(new File(user.getLongSRC()))) {
                    out.write(byteImage);
                }
            }
            return true;
        } catch (SQLException | IOException e) {return false;}
    }
    
    public static User findUser(String eMail, String password) {
        connect();
        try {
            ResultSet res = stat.executeQuery("SELECT * FROM Users WHERE Password = \""+password+"\" AND eMail = \""+eMail+"\"");
            res.next();
            User user = initUser(res);
            return user;
        } catch(Exception e) {return null;}
    }
    
    public static int getUserAccess(User user) {
        connect();
        try {
            ResultSet res = stat.executeQuery("SELECT Access FROM Users WHERE Password = \""+user.getPassword()+"\" AND eMail = \""+user.getEMail()+"\"");
            res.next();
            return res.getInt("Access");
        } catch(Exception e) { return 0;}
    }
    public static boolean removeUser(User user) {
        connect();
        try {
            user = findUser(user.getEMail(), user.getPassword());
            stat.execute("DELETE FROM DishList WHERE UserID = "+user.getId());
            stat.execute("DELETE FROM Users WHERE UserID = " + user.getId());
            return true;
        } catch (Exception e) { return false;}
    }
}
