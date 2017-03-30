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
        FileInputStream in = new FileInputStream(new File("lol.txt"));
        byte[] bytes = new byte[500];
        int i = -1;
        int k = 0;
        while((i=in.read())!=-1) {
            bytes[k] = (byte)i;
            k++;
        }
        in.close();
        String code = Base64.getEncoder().encodeToString(bytes);
        byte[] lol = Base64.getDecoder().decode(code);
        FileOutputStream out = new FileOutputStream(new File("lol1.txt"));
        out.write(lol);
        out.close();
        
    }
}
