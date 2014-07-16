
var data = {};
$(function() {

  /////////////////
  //   TypeForm  //
  /////////////////

  (function() {
    var link, node, insertAt, body;
    var doc = document;
    var write = doc.getElementById;
    var test = doc.createElement;
    var d = doc.getElementsByTagName;
    var url = "typef_orm";
    var path = "https://s3-eu-west-1.amazonaws.com/share.typeform.com/";
    if (!write.call(doc, url)) {
      node = test.call(doc, "script");
      node.id = url;
      node.src = path + "share.js";
      insertAt = d.call(doc, "script")[0];
      insertAt.parentNode.insertBefore(node, insertAt);
    }
    url = url + "_";
    if (!write.call(doc, url)) {
      link = test.call(doc, "link");
      link.rel = "stylesheet";
      link.id = url;
      link.href = path + "share-button.css";
      body = d.call(doc, "head")[0];
      body.appendChild(link, body);
    }
  })();

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

  $('.carousel').each(function(){
    var $carousel = $(this);
    $carousel.find('ul li:last-child').prependTo( $carousel.find('ul') );
    var itemCount = $carousel.find('.carousel__item').length;
    var itemWidth = $carousel.find('.carousel__item').eq(0).outerWidth() + 10;
    var totalWidth = itemCount * itemWidth;
    $carousel.find('ul').css({ width: totalWidth, marginLeft: - itemWidth });
  });

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

  	// $.ajax({
  	//   type: "POST",
  	//   url: "/mailer.php",
  	//   data: JSON.stringify(data),
  	//   contentType: "application/json; charset=utf-8",
   //      success: function (data) {
   //      	preloader.find('div').html(okHTML);
   //        if ( console && console.log ) {
   //          console.log( "Sample of data:", data.slice( 0, 100 ) );
   //        }
   //      },
   //      error: function (data) {
   //      	isError = true;
   //      	preloader.find('div').html(errorHTML);
   //      }
  	// });

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
