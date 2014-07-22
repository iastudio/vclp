
var data = {};

$(function() {

  //////////////
  //   Modal  //
  //////////////

  var preloaderHTML = ' \
        <ul class="clouds"> \
          <li class="cloud"></li> \
          <li class="cloud"></li> \
          <li class="cloud"></li> \
          <li class="cloud"></li> \
          <li class="cloud"></li> \
        </ul> \
        ';

  $.modal.defaults = {
    overlay: "#FFF",        // Overlay color
    opacity: 0.8,          // Overlay opacity
    zIndex: 5,              // Overlay z-index.
    escapeClose: true,      // Allows the user to close the modal by pressing `ESC`
    clickClose: true,       // Allows the user to close the modal by clicking the overlay
    closeText: '',     // Text content for the close <a> tag.
    closeClass: '',         // Add additional class(es) to the close <a> tag.
    showClose: true,        // Shows a (X) icon/link in the top-right corner
    modalClass: "modal",    // CSS class added to the element being displayed in the modal.
    spinnerHtml: preloaderHTML,      // HTML appended to the default spinner during AJAX requests.
    showSpinner: true,      // Enable/disable the default spinner during AJAX requests.
    fadeDuration: 200,     // Number of milliseconds the fade transition takes (null means no transition)
    fadeDelay: 1.0          // Point during the overlay's fade-in that the modal begins to fade in (.5 = 50%, 1.5 = 150%, etc.)
  };

  /////////////////
  //   PARALLAX  //
  /////////////////

  $.stellar({
    horizontalScrolling: false
  });

  /////////////////
  //   CAROUSEL  //
  /////////////////

  var carouselSlideSpeed = 800;
  var carouselEasing = 'easeInOutCubic';

  if ( $('.carousel .carousel__item').length > 3 ) {
    $('.carousel').each(function(){
      var $carousel = $(this);
      $carousel.find('ul li:last-child').prependTo( $carousel.find('ul') );
      var itemCount = $carousel.find('.carousel__item').length;
      var itemWidth = $carousel.find('.carousel__item').eq(0).outerWidth() + 10;
      var totalWidth = itemCount * itemWidth;
      $carousel.find('ul').css({ width: totalWidth, marginLeft: - itemWidth });
    });
  } else {
    $('.carousel__nav').hide();
  }

  $('.carousel__nav').on('click', function(e) {

    e.preventDefault();

    var $carousel = $(this).parent();
    var itemWidth = $carousel.find('.carousel__item').eq(0).outerWidth();

    if ($carousel.find('ul:animated').size() > 0) return;

    var direction;

    $(this).hasClass('carousel__nav--next') ? direction = 1 : direction = 0;

    if (direction == 1) {
      $carousel.find('ul').animate({
          left: - itemWidth
      }, carouselSlideSpeed, carouselEasing, function () {
          $carousel.find('ul li:first-child').appendTo( $carousel.find('ul') );
          $carousel.find('ul').css('left', '');
      });
    } else {
      $carousel.find('ul').animate({
          left: + itemWidth
      }, carouselSlideSpeed, carouselEasing, function () {
          $carousel.find('ul li:last-child').prependTo( $carousel.find('ul') );
          $carousel.find('ul').css('left', '');
      });
    }

  });

	////////////////////////
	//  PLACEHOLDERS FIX  //
	////////////////////////

	if ($.fn.placeholder.input && $.fn.placeholder.textarea) {
	} else if ($.fn.placeholder.input) {
		$('textarea').placeholder();
	} else {
		$('input, textarea').placeholder();
	}

	////////////////////////
	//  FORMS VALIDATION  //
	////////////////////////

	// $('input[type=submit]').click(function(e) {
	// 	e.preventDefault();
	// 	$(this).parent().submit();
	// });

	$('form').each(function() {
    $(this).validate({
      errorPlacement: $.noop,
	    submitHandler: function(form) {
			  $(form).submitForm();
			}
    });
  });

	/////////////////
	//    SCROLL   //
	/////////////////

	smoothScroll.init({
    speed: 500, // scroll speed (ms)
    easing: 'easeInOutCubic', // easing
    updateURL: true // url hash update
	});



  ////////////////////////////
  //  FORM SUBMIT FUNCTION  //
  ////////////////////////////

  $.fn.submitForm = function() {

  	var form = $(this);
  	var preloaderHTML = ' \
    <div class="form-preloader"> \
      <div> \
        <ul class="clouds"> \
          <li class="cloud"></li> \
          <li class="cloud"></li> \
          <li class="cloud"></li> \
          <li class="cloud"></li> \
          <li class="cloud"></li> \
        </ul> \
      </div> \
    </div>';

  	var okHTML = '<i class="fa fa-check"></i><br />Сообщение отправлено!';
  	var errorHTML = '<i class="fa fa-frown-o"></i><br />Произошла ошибка!';

  	form.parent().append(preloaderHTML);
  	var preloader = $(this).parent().find('.form-preloader');

  	var preloaderHeight = preloader.height();
  	var innerHeight = preloader.find('div').height();
  	var preloaderPadding = ((preloaderHeight/2) - innerHeight/2) + 10;
  	preloader.css("padding-top", preloaderPadding + "px");

  	preloader.show();
    preloader.toggleClass('active');

  	var fields = form.find("input[type=text], input[type=email], input[type=tel]");
  	// var data = {};
  	data["formName"] = form.attr("data-title");

  	$(fields).each(function(){
  		var name = $(this).attr("name");
  		var val = $(this).val();
  		data[name] = val;
  	});

  	data["secret"] = "2f7d9f0d0acf89a8f6a57d79f0f7d475";

  	var isError = false;

  	$.ajax({
  	  type: "POST",
  	  url: "/mailer.php",
  	  //data: JSON.stringify(data),
      data: "data="+JSON.stringify(data),
  	  //contentType: "application/json; charset=utf-8",
      success: function (data) {
      	preloader.find('div').html(okHTML);
      },
      error: function (data) {
      	isError = true;
      	preloader.find('div').html(errorHTML);
      }
  	});

  	$('.form-preloader').on('click', function() {

      $(this).toggleClass('active');

      setTimeout(function(){
        $('.form-preloader').remove();
      }, 500);

  		if (!isError) {
  			fields.val('');
  		}
  	});

  };

});
