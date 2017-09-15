package com.example.jaco.chat_app_toetss;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class ProfilesActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profiles);
        System.out.println("DIT WERK");
        System.out.println(SignUpSingleton.getInstance().getEmail() + "Werk");
    }
}
