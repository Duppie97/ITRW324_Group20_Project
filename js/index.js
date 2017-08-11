var imgPath = "img/";

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

        if (document.getElementById(id).src == imgPath + id + "-h.png") 
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

        if (document.getElementById(id).src == imgPath + id + "-g.png") 
        {
            document.getElementById(id).src = imgPath + id + "-h.png";
        }
        
    }   

function hoverOff(id) {

        if (document.getElementById(id).src == imgPath + id + "-h.png") 
        {
            document.getElementById(id).src = imgPath + id + "-g.png";
        }
        
    } 

$( document ).ready(function() {
  $( '.gallery' ).each( function ( ) {
    var id = ($(this).attr('id'));
      this.src=imgPath+id+"-g.png";
      this.width=100;
      this.style.paddingRight="10px";
      this.style.paddingBottom="20px";
  });
});

