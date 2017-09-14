package com.example.jaco.jamroomfinal;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import com.example.jaco.jamroomfinal.R;
import java.util.Map;



public class LoginActivity extends AppCompatActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

    }

    public void gotoMainPage(View view)
    {
        Intent nextPage = new Intent(LoginActivity.this,MainActivity.class);
        startActivity((nextPage));
    }


}
