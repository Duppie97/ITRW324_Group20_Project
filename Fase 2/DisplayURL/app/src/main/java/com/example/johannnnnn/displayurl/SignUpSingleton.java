package com.example.johannnnnn.displayurl;

/**
 * Created by Johannnnnn on 2017/09/14.
 */

public class SignUpSingleton {
    private int email;


    private String firstName;
    private String lastName;


//remaining fields here

    private static SignUpSingleton instance = new SignUpSingleton();

    private SignUpSingleton(){}

    public static SignUpSingleton getInstance(){
        return instance;
    }


    public int getEmail() {
        return email;
    }

    public void setEmail(int emailOrPhone) {
        this.email = emailOrPhone;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


}
