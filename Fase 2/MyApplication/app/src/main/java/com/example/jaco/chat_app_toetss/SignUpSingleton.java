package com.example.jaco.chat_app_toetss;

/**
 * Created by Jaco on 2017/09/15.
 */


public class SignUpSingleton {
    private String email;


    private String firstName;
    private String lastName;


//remaining fields here

    private static SignUpSingleton instance = new SignUpSingleton();

    private SignUpSingleton(){}

    public static SignUpSingleton getInstance(){
        return instance;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String emailOrPhone) {
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
