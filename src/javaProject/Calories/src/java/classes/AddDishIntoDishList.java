/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

import com.google.gson.Gson;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author admin
 */
@WebServlet(name = "AddDishIntoDishList", urlPatterns = {"/AddDishIntoDishList"})
public class AddDishIntoDishList extends HttpServlet {

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
        response.setContentType("text/html;charset=UTF-8");
        String jsonInput = request.getReader().readLine();
        Gson gson = new Gson();
        Input input = gson.fromJson(jsonInput, Input.class);
        String result = SQL.AddDishIntoDishList(input.dish, input.user);
        Dish dish = SQL.findDishByNameOnly(input.dish.getName());
        System.out.println("{\"result\":\""+result+"\"}");
        response.getWriter().write("{\"result\":\""+result+"\"}");
    }
    
    class Input {
        Dish dish;
        User user;
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
