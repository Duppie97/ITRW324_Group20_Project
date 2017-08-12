var imgPath = "img/";
var imgPath2 = "http://localhost/img/"

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
        if (document.getElementById(id).src == imgPath2 + id + "-h.png") 
        {
            document.getElementById(id).src = imgPath + id + ".png";
            document.getElementById(id).value = "true";
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
  //SELECT * FROM table
  var table = "member";

  //WHERE id=key                                -> format "/5"
  var key = "";

  //INSERT INTO table (column) VALUES (value)   -> format {'column1' : 'value1', 'column2' : 'value2'}
  var myArr = {'Name': document.getElementById("name").value, 'Surname': document.getElementById("surname").value,'Email': document.getElementById("email").value,'Password': document.getElementById("password").value,'Band_Stat': $('input[name=band-status]:checked').val(),'Audio_Prof': document.getElementById("audiof").value};

  //SELECT columns FROM table                   -> format "&column1,column2,column3"
  var columns = "";

  //WHERE crit                                  -> format "&column1=valueA AND column2=valueB"
  var crit = "";

  //GET, PUT, POST, DELETE, GETFIL(filter)      -> GET = SELECT * FROM table WHERE ID=key
  //                                            -> PUT = UPDATE table SET column1=value1, column2=value2... WHERE ID=key
  //                                            -> POST = INSERT INTO table(column1,column2...) VALUES (value1,value2...)
  //                                            -> DELETE = DELETE FROM table WHERE ID=key
  //                                            -> GETFIL = SELECT columns FROM table WHERE crit
  var method = "POST";

  var xhttp = new XMLHttpRequest();
  xhttp.open(method, "http://localhost/api.php/" + table + key , false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(myArr) + columns + crit);
  var response = JSON.parse(xhttp.responseText);
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

