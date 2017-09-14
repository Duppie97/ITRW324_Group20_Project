package com.example.jaco.jamroomfinal;


import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class HttpURLConnectionExample {

    private final String USER_AGENT = "Mozilla/5.0";
	/*private Map<String,Object> map;

	public static void main(String[] args) throws Exception {
		//Hierdie deel is teenwoordig vir alle GET/PUT/POST/DELETE calls na die api
		HttpURLConnectionExample http = new HttpURLConnectionExample();


		//Stuur 'n GET/SELECT request en ontvang antwoord in map datatipe
		//Die parameters is TABLE, CRITERIA.  Kyk na onderstaande voorbeeld vir leiding
		Map<String, String> map = http.sendGet("member","`Email`='DitWerk'");		//select * from TABLE where CRITERIA

		//Hierdie kode toets of die spesifieke kolom se waarde bestaan en lees dit indien dit is
		//Hierdie sal altyd saam met die GET/SELECT metode gaan
		String key = "Email";
		if (map.containsKey(key))
		{
			Object value = map.get(key);
			System.out.println("Key : " + key +" value :"+ value);
		}


		//Stuur POST/INSERT request
		//columns is die lys kolomme wat in geinsert word en values is die waardes
		String[] columns1 = {"Email","Name"};
		String[] values1 = {"asdasdqqq123","Jan"};
		http.sendPost("member",columns1,values1);									//insert into Table columns values(VALUES)

		//DELETE request
		//Stuur TABLE en criteria as parameter
		http.sendDelete("member","`Email`='a@a'");									//delete from TABLE where CRITERIA

		//PUT/UPDATE request
		//Ontvang colomme wat verander, waardes wat vaerander TABLE en CRITERIA
		String[] columns2 = {"Email"};
		String[] values2 = {"DitWerk"};
		http.sendPut("member",columns2,values2,"`Email`='s@s'");					//update Table set(COLUMNS=VALUES) where CRITERIA



	}*/

    // HTTP GET request
    public Map<String, String>[] sendGet(String table, String crit) throws Exception {

        String url = "http://10.0.2.2/api.php/" + table + "/" + crit;

        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        // optional default is GET
        con.setRequestMethod("GET");

        //add request header
        con.setRequestProperty("User-Agent", USER_AGENT);


        int responseCode = con.getResponseCode();
        System.out.println("\nSending 'GET' request to URL : " + url);
        System.out.println("Response Code : " + responseCode);

        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        //print result
        System.out.println(response.toString());

        String[] arr = response.toString().split("\\},\\{");

        Map<String, String>[] ant = new HashMap[arr.length];

        for(int i = 0; i < arr.length; i++)
        {
            ant[i] = splitToMap(arr[i]);
        }

        return ant;
    }

    public void sendDelete(String table, String crit) throws Exception {

        String url = "http://10.0.2.2/api.php/" + table + "/" + crit;

        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        // optional default is GET
        con.setRequestMethod("DELETE");

        //add request header
        con.setRequestProperty("User-Agent", USER_AGENT);


        int responseCode = con.getResponseCode();
        System.out.println("\nSending 'GET' request to URL : " + url);
        System.out.println("Response Code : " + responseCode);

        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        //print result
        System.out.println(response.toString());



    }

    // HTTP POST request
    public void sendPost(String table, String[] columns, String[] values) throws Exception {

        String url = "http://10.0.2.2/api.php/" + table;
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        //add reuqest header
        con.setRequestMethod("POST");
        con.setRequestProperty("User-Agent", USER_AGENT);
        con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");

        String parm = "{";

        for(int i = 0; i < columns.length; i++)
        {
            parm += "\"" + columns[i] + "\":\"" + values[i] + "\",";
        }
        parm = parm.substring(0,parm.length()-1);
        parm += "}";

        String urlParameters = parm;

        // Send post request
        con.setDoOutput(true);
        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
        wr.writeBytes(urlParameters);
        wr.flush();
        wr.close();

        int responseCode = con.getResponseCode();
        System.out.println("\nSending 'POST' request to URL : " + url);
        System.out.println("Post parameters : " + urlParameters);
        System.out.println("Response Code : " + responseCode);

        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        //print result
        System.out.println(response.toString());




    }

    // HTTP POST request
    public void sendPut(String table, String[] columns, String[] values, String crit) throws Exception {

        String url = "http://10.0.2.2/api.php/" + table + "/" + crit;
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        //add reuqest header
        con.setRequestMethod("PUT");
        con.setRequestProperty("User-Agent", USER_AGENT);
        con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");

        String parm = "{";

        for(int i = 0; i < columns.length; i++)
        {
            parm += "\"" + columns[i] + "\":\"" + values[i] + "\"";
        }
        parm += "}";

        String urlParameters = parm;

        // Send post request
        con.setDoOutput(true);
        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
        wr.writeBytes(urlParameters);
        wr.flush();
        wr.close();

        int responseCode = con.getResponseCode();
        System.out.println("\nSending 'POST' request to URL : " + url);
        System.out.println("Post parameters : " + urlParameters);
        System.out.println("Response Code : " + responseCode);

        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        //print result
        System.out.println(response.toString());




    }

    private Map<String, String> splitToMap(String in)
    {
        in = in.replaceAll("\\{","");
        in = in.replaceAll("\\}","");
        in = in.replaceAll("\"","");

        String[] kvps = in.split(",");
        String[] kvsv;

        Map<String, String> map = new HashMap<>();
        for(int i = 0; i < kvps.length; i++)
        {
            kvsv = kvps[i].split(":");
            if(kvps[i].length() != kvps[i].indexOf(':') + 1)
                map.put(kvsv[0],kvsv[1]);
            else
                map.put(kvsv[0],"");
        }
        return map;
    }
}