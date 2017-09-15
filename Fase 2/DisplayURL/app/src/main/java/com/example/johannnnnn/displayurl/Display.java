package com.example.johannnnnn.displayurl;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.media.MediaMetadataRetriever;
import android.media.ThumbnailUtils;
import android.net.Uri;
import android.os.Bundle;
import android.os.StrictMode;
import android.provider.MediaStore;
import android.provider.Settings;
import android.support.annotation.NonNull;
import android.support.design.widget.AppBarLayout;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Gallery;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Display extends AppCompatActivity {

    private TextView mTextMessage;
    private Spinner spinner1;

    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener
            = new BottomNavigationView.OnNavigationItemSelectedListener() {

        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            switch (item.getItemId()) {
                case R.id.navigation_home:
                    mTextMessage.setText(R.string.title_home);
                    return true;
                case R.id.navigation_dashboard:
                    mTextMessage.setText(R.string.title_dashboard);
                    return true;
                case R.id.navigation_notifications:
                    mTextMessage.setText(R.string.title_notifications);
                    return true;
            }
            return false;
        }

    };

    @Override
    public void onCreate(Bundle bundle) {
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();

        StrictMode.setThreadPolicy(policy);
        super.onCreate(bundle);
        setContentView(R.layout.activity_main);
        final LinearLayout linearLayout1 = (LinearLayout) findViewById(R.id.linearLayout1);
        final ScrollView scroll = (ScrollView) findViewById(R.id.scrollView1);
        final String url = "http://10.0.2.2/uploads/";
        final String url2 = "http://10.0.2.2/profile/";
        final HttpURLConnectionExample http = new HttpURLConnectionExample();

        Map<String, String>[] map2 = null;

        BufferedReader br = null;
        FileReader fr = null;
        final String email = "allersjohann@gmail.com";

        spinner1 =(Spinner) findViewById(R.id.spinner);
        final List<String> list = new ArrayList<String>();
        list.add(email);
        try {
            map2 = http.sendGet("friends","`Email_Member_1`='"+email+"'");

            for(int i = 0; i < map2.length; i++)
            {
                list.add(map2[i].get("Email_Member_2"));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }






        ArrayAdapter<String> dataAdapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, list);
        dataAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner1.setAdapter(dataAdapter);


        spinner1.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parentView, View selectedItemView, int position, long id) {
                try{
                    linearLayout1.removeAllViews();
                    HttpURLConnectionExample http = new HttpURLConnectionExample();
                    String email= (String) spinner1.getSelectedItem();

                    Map<String, String>[] map = null;

                    Map<String, String>[] mapP = null;

                    System.out.println(email);



                    mapP = http.sendGet("member","`Email`='"+email+"'");

                    String names = mapP[0].get("PicturePath");
                    ImageView prof = new ImageView(Display.this);
                    linearLayout1.addView(prof);
                    //if(tipe.equals("jpg")) {
                    ImageLoadTask iltp = (ImageLoadTask) new ImageLoadTask(url2 + names, prof).execute();


                    TextView txtName = new TextView(Display.this);
                    txtName.setTextSize(getResources().getDimension(R.dimen.textsize));
                    txtName.setLayoutParams(new AppBarLayout.LayoutParams(AppBarLayout.LayoutParams.WRAP_CONTENT, AppBarLayout.LayoutParams.WRAP_CONTENT));
                    txtName.setTextColor(Color.BLACK);
                    txtName.setTextSize(30);
                    txtName.setText("\r\n" +  mapP[0].get("Name") + " " + mapP[0].get("Surname"));
                    linearLayout1.addView(txtName);


                    TextView txtEmail = new TextView(Display.this);
                    txtEmail.setTextSize(getResources().getDimension(R.dimen.textsize));
                    txtEmail.setLayoutParams(new AppBarLayout.LayoutParams(AppBarLayout.LayoutParams.WRAP_CONTENT, AppBarLayout.LayoutParams.WRAP_CONTENT));
                    txtEmail.setTextColor(Color.BLACK);
                    txtEmail.setTextSize(20);
                    txtEmail.setText("\r\nEmail:\n" +
                            "\t\t\t\t" +  mapP[0].get("Email"));
                    linearLayout1.addView(txtEmail);

                    TextView txtBand = new TextView(Display.this);
                    txtBand.setTextSize(getResources().getDimension(R.dimen.textsize));
                    txtBand.setLayoutParams(new AppBarLayout.LayoutParams(AppBarLayout.LayoutParams.WRAP_CONTENT, AppBarLayout.LayoutParams.WRAP_CONTENT));
                    txtBand.setTextColor(Color.BLACK);
                    txtBand.setTextSize(20);
                    txtBand.setText("\r\nBand Status:\n" +
                            "\t\t\t\t" +  mapP[0].get("Band_Stat"));
                    linearLayout1.addView(txtBand);

                    TextView txtSes = new TextView(Display.this);
                    txtSes.setTextSize(getResources().getDimension(R.dimen.textsize));
                    txtSes.setLayoutParams(new AppBarLayout.LayoutParams(AppBarLayout.LayoutParams.WRAP_CONTENT, AppBarLayout.LayoutParams.WRAP_CONTENT));
                    txtSes.setTextColor(Color.BLACK);
                    txtSes.setTextSize(20);
                    txtSes.setText("\r\nTotal Sessions:\n" +
                            "\t\t\t\t" +  mapP[0].get("Total_Sessions"));
                    linearLayout1.addView(txtSes);

                    TextView txtComm = new TextView(Display.this);
                    txtComm.setTextSize(getResources().getDimension(R.dimen.textsize));
                    txtComm.setLayoutParams(new AppBarLayout.LayoutParams(AppBarLayout.LayoutParams.WRAP_CONTENT, AppBarLayout.LayoutParams.WRAP_CONTENT));
                    txtComm.setTextColor(Color.BLACK);
                    txtComm.setTextSize(20);
                    txtComm.setText("\r\nCommendations:\n" +
                            "\t\t\t\t" +  mapP[0].get("Commendations") + "\r\n\r\nPosts:\r\n");
                    linearLayout1.addView(txtComm);





                    map = http.sendGet("uploads","`Email`='"+email+"'");		//select * from TABLE where CRITERIA
                    //System.out.println(map[0].toString() + map[1].toString());

                    for(int x=0;x<map.length;x++) {

                        String name = map[x].get("FileName");
                        ImageView image = new ImageView(Display.this);
                        // image.setBackgroundResource(R.mipmap.ic_launcher);
                        TextView txt = new TextView(Display.this);
                        txt.setTextSize(getResources().getDimension(R.dimen.textsize));
                        txt.setLayoutParams(new AppBarLayout.LayoutParams(AppBarLayout.LayoutParams.WRAP_CONTENT, AppBarLayout.LayoutParams.WRAP_CONTENT));
                        txt.setTextColor(Color.BLACK);
                        //txt.setTextSize(getResources().getDimension(R.dimen.layout_width));
                        //txt.setTextSize(getResources().getDimension(R.dimen.layout_height));
                        if(map[x].get("Caption")!=null)
                        txt.setText("\r\n" +  map[x].get("Caption"));
                        else
                            txt.setText("This user does not have any posts yet");
                        //String tipe = name.substring(name.indexOf(".")+1);

                        linearLayout1.addView(txt);
                        linearLayout1.addView(image);
                        //if(tipe.equals("jpg")) {
                        ImageLoadTask ilt = (ImageLoadTask) new ImageLoadTask(url + name, image).execute();
               /* }
                else if(tipe.equals("mp4"))
                {
                    ImageLoadTask ilt = (ImageLoadTask) new ImageLoadTask(url + "vid.jpg", image).execute();

                }
                else
                {
                    ImageLoadTask ilt = (ImageLoadTask) new ImageLoadTask(url + "aud.jpg", image).execute();
                }*/




                    }
                }
                catch (Exception e) {
                    e.printStackTrace();
                } catch (Throwable throwable) {
                    throwable.printStackTrace();
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parentView) {
                // your code here
            }

        });




    }








}
