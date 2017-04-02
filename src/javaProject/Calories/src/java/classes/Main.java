/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Base64;

/**
 *
 * @author admin
 */
public class Main {
    public static void main(String... args) throws UnsupportedEncodingException, FileNotFoundException, IOException {
        
        String code = "data:image/jpeg;base64,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";
        String type = code.substring(code.indexOf('/')+1, code.indexOf(';'));
        System.out.println(type);
    }
}
