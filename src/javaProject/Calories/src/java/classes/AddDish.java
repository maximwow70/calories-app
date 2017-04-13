/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
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
@WebServlet(name = "AddDish", urlPatterns = {"/AddDish"})
public class AddDish extends HttpServlet {


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
        ArrayList<Dish> list = new ArrayList<>();
        Gson gson = new Gson();
        String inJson = request.getReader().readLine();
        Input input = gson.fromJson(inJson, Input.class);
        String result = SQL.addDish(input.dish,input.user);
        list.add(SQL.findDishByNameOnly(input.dish.getName()));
        String jsonList = gson.toJson(list);
        if(list.get(0)==null)
            jsonList = "[]";
        String outJson = "{\"result\" : \""+result+"\", \"dish\":"+jsonList+"}";
        response.getWriter().write(outJson);
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
