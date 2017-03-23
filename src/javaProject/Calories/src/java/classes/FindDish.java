/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

import com.google.gson.Gson;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedHashSet;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author admin
 */
@WebServlet(name = "FindDish", urlPatterns = {"/FindDish"})
public class FindDish extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text.html;charset=UTF-8");
        
        LinkedHashSet<Dish> lightSet = new LinkedHashSet<>();
        LinkedHashSet<Dish> set = new LinkedHashSet<>();
        
        Gson gson = new Gson();
        String[] str = {"name"};
        JsonDish jsonDish = new JsonDish("",str);
        
        try {
            ResultSet res = SQL.findDishByNameAndComponents(jsonDish.dishName, jsonDish.names);
            while(res.next()) {
                boolean is = false;
                for(Dish d :lightSet) {
                    if(d.getId() == res.getInt("DishID")){
                        d.addCount();
                        is = true;
                        break;
                    }
                }
                if(!is)
                lightSet.add(new Dish(res.getInt("DishID"),res.getString("Name")));
            }
            for(Dish d : lightSet) {
                res = SQL.findComponentsByDishId(d.getId());
                while(res.next()) {
                    String name = res.getString("Name");
                    int id = res.getInt("ComponentID");
                    int calories = res.getInt("Calories");
                    d.addComponent(new Component(name,id,calories));
                }
            }
            for(Dish d:lightSet) {
            if(d.getCount() == str.length)
                set.add(d);
        }
        } catch(SQLException ex) {System.out.println("Error");}
        String s = gson.toJson(set);
        response.getWriter().write(s);
        
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
