var ip = "196.252.154.147";
var imgPath = "img/";
var imgPath2 = "http://localhost/img/";
var imgPath3 = "http://"+ip+"/img/";
var apiPath = "http://localhost/api.php/";
var apiPath2 = "http://"+ip+"/api.php/";

$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }



});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});

function changeImage(id) {
        if (document.getElementById(id).src == imgPath2 + id + "-h.png"||document.getElementById(id).src == imgPath3 + id + "-g.png") 
        {
            document.getElementById(id).src = imgPath + id + ".png";
            document.getElementById(id).value = "true";
        }
        else if(document.getElementById(id).src == imgPath3 + id + ".png")
        {
            document.getElementById(id).src = imgPath + id + "-g.png";
            document.getElementById(id).value = "false";
        }
        else
        {
            document.getElementById(id).src = imgPath + id + "-h.png";
            document.getElementById(id).value = "false";
        }
    }

function hoverImage(id) {
        if (document.getElementById(id).src == imgPath2 + id + "-g.png") 
        {
            document.getElementById(id).src = imgPath + id + "-h.png";
        }
        
    }   

function hoverOff(id) {

        if (document.getElementById(id).src == imgPath2 + id + "-h.png") 
        {
            document.getElementById(id).src = imgPath + id + "-g.png";
        }
        
    } 

function validate()
{
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    apiPath = apiPath2;
  }

  if(validateEmail()==true)
  {
  var table = "member";
  var myArr = {'Name': document.getElementById("name").value, 'Surname': document.getElementById("surname").value,'Email': document.getElementById("email").value,'Password': document.getElementById("password").value,'Band_Stat': $('input[name=band-status]:checked').val(),'Audio_Prof': document.getElementById("audiof").value};
  var method = "POST";

  var xhttp = new XMLHttpRequest();
  xhttp.open(method, apiPath + table , false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(myArr));


  var response = xhttp.responseText;
  console.log(response);

  

  var i = 0;
  $( '.gallery' ).each( function ( ) {
    var id = ($(this).attr('id'));
    var val = document.getElementById(id).value;
    if(val==='true')
    {
      validateInstruments(id, i);
      i = i + 1;
    }
  });
  }
}

function validateInstruments(id, i)
{
      var xhttp = new XMLHttpRequest();
      var table = "user_instrument";
      var myArr = {'Email': document.getElementById("email").value,'Instrument': id};
      var method = "POST";

     if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    apiPath = apiPath2;
  }
      xhttp.open(method, apiPath + table, true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(JSON.stringify(myArr));  
}

function validateEmail()
{
  var table = "member";                               
  var crit = "`Email` = '" + document.getElementById("email").value + "'";
  var method = "GETFIL";
  var xhttp = new XMLHttpRequest();
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     apiPath = apiPath2;
  }
  xhttp.open(method, apiPath + table, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send("&Email&" + crit);

  var response = xhttp.responseText;
  if(Object.keys(response).length > 0)
  {
    alert(response);
    alert("This email is already registered. To continue please log in or sign up with a different email.");
    return false;
  }
  else return true;

}

function logIn()
{
  var table = "member";                               
  var crit = "`Email` = '" + document.getElementById("logemail").value + "'";
  var method = "GETFIL";
  var xhttp = new XMLHttpRequest();
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    apiPath = apiPath2;
  }
  alert(apiPath);
  xhttp.open(method, apiPath + table, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send("&Email,Password&" + crit);
  var bool = true;
  var response = xhttp.responseText;
  var json = JSON.parse(response);

  if(Object.keys(response).length == 0)
  {
    alert("This email is not registered. Please re-enter email or sign up.");
    bool = false;
  }
  else
  {
    if(json['Email']==document.getElementById("logpassword").value)
    {
      alert('ok');
    }
    else
    {
      alert('Email and password does not match. Please try again.')
    }
  }
}

$( document ).ready(function() {
  $( '.gallery' ).each( function ( ) {
    var id = ($(this).attr('id'));
      this.src=imgPath+id+"-g.png";
      this.width=100;
      this.style.paddingRight="10px";
      this.style.paddingBottom="20px";
      this.title = id;
  });
});

