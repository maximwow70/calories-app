/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
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
        
        ArrayList<Dish> lightSet = new ArrayList<>();
        ArrayList<Dish> set = new ArrayList<>();
        
        
        String string = request.getReader().readLine();
        
        //КОСТЫЛЬ!!!!!!
        Gson gson = new Gson();
        Dish dish = gson.fromJson(string, Dish.class);
        JsonDish jsonDish = new JsonDish(dish.getName());
        for(Component c : dish.getComponents()) {
            jsonDish.addComponent(c.getName());
        }
        
        lightSet = SQL.findDishesByNameAndComponents(jsonDish.getName(), jsonDish.getComponents());
        for(Dish d:lightSet) {
            System.out.println(d.getName());
        if(d.getCount() >= jsonDish.length())
            set.add(d);
        }
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
