/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

import java.util.Comparator;

/**
 *
 * @author admin
 */
public class CustomComparator implements Comparator<Component> {
    @Override
    public int compare(Component o1, Component o2) {
        if(o1.getName().compareTo(o2.getName())>0)
            return 1;
        else return -1;
    }
}
