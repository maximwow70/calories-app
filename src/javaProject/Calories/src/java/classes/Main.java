/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

/**
 *
 * @author admin
 */
public class Main {
    public static void main(String... args) {
        Dish dish = new Dish(6,"");
        //dish.addComponents(SQL.findComponentsByDishId(1));
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
"(Select COUNT(dish.DishID) from DishFormulas dish where d.DishID = dish.DishID) ="+dish.length()+"\n" +
"WHERE\n" +
"d.Name LIKE \"%"+dish.getName()+"%\" AND\n" +
"d.DishID = f.DishID;";
        System.out.println(url);
    }
}
