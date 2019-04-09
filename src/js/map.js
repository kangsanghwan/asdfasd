$(function(){
	searchItem();
    setupSelect();
    
	// Header
	$('.h_close').click(function() {
		$('header').toggleClass('open');
	});
    
    // Map Nav 
	$('.search_close').click(function(){
		if ($(this).hasClass('open')) {
            $('.search_area').animate({left: '20px'}, 300, 'easeInOutQuad');
            $(this).removeClass('open');
		} else {
            $('.search_area').animate({left: '-250px'}, 300, 'easeInOutQuad');
            $(this).addClass('open');
		}
	});
    
    // Layer Popup
	$('.map_layer .l_close, body > .dim').click(function() {		
		$('.map_layer').hide();
		$('body > .dim').fadeOut();
	});
	$('.show-layer').click(function(e){				
		e.preventDefault();
	
		$('body > .dim').fadeIn();	
		$('.map_layer').hide();

		var activeLayer = $(this).attr('aria-controls');
		var left = ($(window).width() - $('#' + activeLayer).width()) / 2;
		var top = ($(window).height() - $('#' + activeLayer).height()) / 2;

		$('#' + activeLayer).css({'left': left,'top': top}).show();
	});	
    
    // 시설물 더보기
    $('.search_area .more').click(function(){	
		var activeLayer = $(this).attr('aria-controls');
		if ($(this).hasClass('active')) {
            $('.box_more').hide();
            $('.more').removeClass('active')
            $(this).removeClass('active');
		} else {
            $('.box_more').hide();
            $('.more').removeClass('active');
            $(this).addClass('active');
            $('.' + activeLayer).show();
            $('.box_more button').click(function(){	
                $(this).parent().hide();
                $('.more').removeClass('active')
            });
		}
    });
    
    //모드
    $('.mode').click(function(){	
        $('.mode').removeClass('active');
        $(this).addClass('active');
        $('#mapFacilities').fadeOut();
        
        if ($(this).attr('aria-controls') !== 'search_landscape') {
            $('.search_landscape').stop().animate({right: '-100%'}, 500, 'easeInOutQuad');
            $('.search_portrait').stop().animate({bottom: '0'}, 500, 'easeInOutQuad');
            $('.search_area').stop().animate({bottom:'515px'}, 500, 'easeInOutQuad');
            $('.search_area .s1 ul').stop().animate({height:'62px'}, 500, 'easeInOutQuad');
            $('.search_area .s2, .search_area .s4, .search_area .search_form').slideUp(500);
            $('#search_open').slideDown(500);
            $('.map_wraper').stop().animate({right: '0px',bottom: '400px'}, 600, 'easeInOutQuad');
            $('.search_area .s1 li > label').click(function(){
                $('.search_landscape').stop().animate({right: '-100%'}, 500, 'easeInOutQuad');
                $('.map_wraper').stop().animate({right: '0px'}, 300, 'easeInOutQuad');
            })
            return 'false';
		}else {
            $('.search_landscape').stop().animate({right: '0'}, 500, 'easeInOutQuad');
            $('.search_portrait').stop().animate({bottom: '-100%'}, 500, 'easeInOutQuad');
            $('.search_area').animate({bottom:'120px'}, 500, 'easeInOutQuad');
            $('.search_area .s1 ul').animate({height:'190px'}, 500, 'easeInOutQuad');
            $('.search_area .s2, .search_area .search_form').slideDown(500);
            $('.search_area .s4').slideDown(500);
            $('#search_open').slideUp(500).removeClass('open');
            $('.map_wraper').stop().animate({right: '540px',bottom: '0px'}, 500, 'easeInOutQuad');
            if ($('.search_area .s1 li > label').hasClass('checked')) {
                $('.search_landscape').stop().animate({right: '0'}, 500, 'easeInOutQuad');
                $('.map_wraper').stop().animate({right: '540px',bottom: '0px'}, 600, 'easeInOutQuad');
            }else {
                $('.search_landscape').stop().animate({right: '-100%'}, 500, 'easeInOutQuad');
                $('.map_wraper').stop().animate({right: '0px',bottom: '0px'}, 600, 'easeInOutQuad');
            }
	        searchItem();
            return 'true';
		}
    });
    
    //가로모드 메뉴 노출
    $('#search_open').click(function(){
        if ($(this).hasClass('open')) {
            $('.search_area').stop().animate({bottom:'515px'}, 500, 'easeInOutQuad');
            $('.search_area .s1 ul').stop().animate({height:'62px'}, 500, 'easeInOutQuad');
            $('.search_area .s2, .search_area .search_form').slideUp(500);
            $('.search_area .s4').slideUp(500);
            $(this).removeClass('open');
        }else {
            $('.search_area').stop().animate({bottom:'120px'}, 500, 'easeInOutQuad');
            $('.search_area .s1 ul').stop().animate({height:'190px'}, 500, 'easeInOutQuad');
            $('.search_area .s2, .search_area .search_form').slideDown(500);
            $('.search_area .s4').slideDown(500);
            $(this).addClass('open');
        }
    })
    
    //버튼 레이어 연결
    $('.s2 button').click(function(){	
        if ($(this).hasClass('current')) {
            $('.s2 button').removeClass('current');
            $(this).removeClass('current');
        }else {
            $('.s2 button').removeClass('current');
            $(this).addClass('current');
        }
    });
    $('.s3 button').click(function(){	
		$(this).toggleClass('current');
    });
    
    //지도 타입
    $('button[class^=type_]').click(function(){	
        $(this).hide().siblings('button[class^=type_]').show();
    });
    
    //시설물
    $('.search_landscape .item > i, .search_landscape .item > strong').click(function(){	
		if ($(this).parent().hasClass('current')) {
            $('.search_landscape .item').removeClass('current');
            $(this).parent().removeClass('current');
            $('.search_landscape .dim').fadeOut();
		} else {
            $('.search_landscape .item').removeClass('current');
            $(this).parent().addClass('current');
            $('.search_landscape .dim').fadeIn();
		}
    });
    
    //시설물 전체보기 & 끄기 1130
    $('.s1 .custom_switch').click(function(){	
        if($(this).hasClass('checked')){
            $('.search_landscape').stop().animate({right: '0'}, 500, 'easeInOutQuad');
            $('.map_wraper').stop().animate({right: '540px',bottom: '0px'}, 600, 'easeInOutQuad');
        }else{
            $('.search_landscape').stop().animate({right: '-100%'}, 500, 'easeInOutQuad');
            $('.map_wraper').stop().animate({right: '0px',bottom: '0px'}, 600, 'easeInOutQuad');
            $('.search_area .s1 li > label').click(function(){	
                $('.search_landscape').stop().animate({right: '-100%'}, 500, 'easeInOutQuad');
                $('.map_wraper').stop().animate({right: '0px',bottom: '0px'}, 600, 'easeInOutQuad');
                var activeItem = $(this).find('input').attr('aria-controls');
                if ($(this).hasClass('checked')) {
                    $('.'+activeItem).addClass('open');
                }else {
                    $('.'+activeItem).removeClass('open'); 
                }
            });
        }
    });
    
    //출력
    $('.btn.print').click(function(){	
        $('div.loading').show();
        setTimeout(function(){$('div.loading').hide();},6000)
        
    });
    
    //Zoom
    $('.zoom_in').click(function(){	
        if($('body').hasClass('zoom100')){
            $('body').attr('class','').addClass('zoom120');
            return 'true';
        }
        if($('body').hasClass('zoom120')){
            alert("더이상 확대 하실수 없습니다.");
            return 'true';
        }
        if($('body').hasClass('zoom80')){
            $('body').attr('class','').addClass('zoom100');
            return 'true';
        }
    });
    $('.zoom_out').click(function(){	
        if($('body').hasClass('zoom100')){
            $('body').attr('class','').addClass('zoom80');
            return 'true';
        }
        if($('body').hasClass('zoom120')){
            $('body').attr('class','').addClass('zoom100');
            return 'true';
        }
        if($('body').hasClass('zoom80')){
            alert("더이상 축소 하실수 없습니다.");
            return 'true';
        }
    });
    
    
    //Datepicker
    $( "#datepicker" ).datepicker({
      showOn: "button",
      buttonImage: "images/btn/btn_cal.png",
      buttonImageOnly: true,
      buttonText: "Select date"
    });
    
	customScroller($('.search_area article').css('height','100%'));

    //시계열 1130
    $('#timeSeries').click(function(){
        if($('.map_slider .s_handle').css('display') == 'none'){
            $('.map_slider').mapslider().on();
            $('.s_handle, .s_right.image img').show();
            $('.search_landscape').stop().animate({right: '-100%'}, 500, 'easeInOutQuad');
            $('.search_area').stop().animate({left: '-250px'}, 500, 'easeInOutQuad');
            $('.search_close').addClass('open');
        } else{
            $('.map_slider').mapslider().off().find('.s_left.image').css('width','100%');
            $('.s_handle, .s_right.image img').hide();
            $('.search_landscape').stop().animate({right: '0'}, 500, 'easeInOutQuad');
            $('.search_area').stop().animate({left: '20px'}, 500, 'easeInOutQuad');
        }
        
	});
    
	//input ckeckbox & input radio
	$('input[type=radio], input[type=checkbox]').click(function(){
        setuplabel();
    });
    setuplabel(); 
});

/* Custom Scroller */
function customScroller($classname) {
	$classname.mCustomScrollbar();
}

//시설물 선택
function searchItem() {
    $('.search_area .s1 li > label').click(function(){	
        $('#mapFacilities').fadeOut();
        var activeItem = $(this).find('input').attr('aria-controls');
		if ($(this).hasClass('checked')) {
            $('.search_landscape').stop().animate({right: '0'}, 500, 'easeInOutQuad');
            $('.map_wraper').stop().animate({right: '540px'}, 600, 'easeInOutQuad');
            $('.'+activeItem).addClass('open');
		}else {
            $('.search_landscape').stop().animate({right: '-100%'}, 500, 'easeInOutQuad');
            $('.map_wraper').stop().animate({right: '0px'}, 600, 'easeInOutQuad');
            $('.'+activeItem).removeClass('open'); 
            
            if ($('.search_area .s1 li > label').hasClass('checked')) {
                $('.search_landscape').stop().animate({right: '0'}, 500, 'easeInOutQuad');
                $('.map_wraper').stop().animate({right: '540px'}, 600, 'easeInOutQuad');
            }
		}
    });
}

// Datepicker 
$.datepicker.setDefaults({
	dateFormat: 'yy-mm-dd',
	prevText: '이전 달',
	nextText: '다음 달',
	monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
	monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
	dayNames: ['일', '월', '화', '수', '목', '금', '토'],
	dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
	dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
	showMonthAfterYear: true,
	yearSuffix: '년'
});

//input ckeckbox & input radio
function setuplabel() {
    if ($('input[type=radio]').length) {
        $('input[type=radio]').each(function(){ 
            $(this).parent('label').removeClass('checked');
        });
        $('input[type=radio]:checked').each(function(){ 
            $(this).parent('label').addClass('checked');
        });                
    };
    if ($('input[type=checkbox]').length) {
        $('input[type=checkbox]').each(function(){ 
            $(this).parent('label').removeClass('checked');
        });
        $('input[type=checkbox]:checked').each(function(){ 
            $(this).parent('label').addClass('checked');
        });
    };      
};

//Select
function setupSelect() {
    $('select').each(function () {

		var $this = $(this),
			numberOfOptions = $(this).children('option').length;

		$this.addClass('s_blind');
		$this.wrap('<div class="custom_select"></div>');
		$this.after('<div class="options_title"></div>');

		var $optionsTitle = $this.next('div.options_title');
		$optionsTitle.text($this.children('option').eq(0).text());

		var $list = $('<ul />', {
			'class': 'options'
		}).insertAfter($optionsTitle);

		for (var i = 0; i < numberOfOptions; i++) {
			$('<li />', {
				text: $this.children('option').eq(i).text(),
				rel: $this.children('option').eq(i).val()
			}).appendTo($list);
		}

		var $listItems = $list.children('li');

		$optionsTitle.click(function (e) {
			e.stopPropagation();
			$('div.options_title.active').not(this).each(function () {
				$(this).removeClass('active').next('ul.options').hide();
			});
			$(this).toggleClass('active').next('ul.options').toggle();
		});
		
		$listItems.first().addClass('selected');
		
		$listItems.click(function (e) {
			e.stopPropagation();
			$optionsTitle.text($(this).text()).removeClass('active');
			$this.val($(this).attr('rel'));
			$list.hide();
			$listItems.removeClass('selected');
			$(this).addClass('selected');
		});

		$(document).click(function () {
			$optionsTitle.removeClass('active');
			$list.hide();
		});
	});
}   

