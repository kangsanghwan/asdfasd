(function ($) {
	'use strict';
	$.fn.mapslider = function (options) {

	//default options
	var settings = $.extend($.fn.mapslider.defaultOptions, options);

	var init = function () {
		var $this = $(this);
		var width = $this.width();
		$this.find('.s_map img').css('width' , width + 'px');
		$this.find('.s_left.image, .s_handle').css('width', Math.floor(width * settings.initialPosition));
	};

	var slideResize = function (e) {
		e.preventDefault();
		var width;
		if(e.type.startsWith('touch')){
			width = e.originalEvent.touches[0].clientX - e.originalEvent.layerX;
		} else {
			width = e.offsetX === undefined ? e.pageX - e.originalEvent.layerX : e.offsetX;
		}
		if (width<=$(this).width()){
			$(this).find('.s_left.image, .s_handle').css('width', width + 'px');
		}
	};

	var enableSliderDrag = function (e) {
		e.preventDefault();
		$(this).css('cursor' , 'ew-resize')
			.on('mousemove.sliderns', slideResize)
			.on('touchmove.sliderns', slideResize);
	};

	var disableSliderDrag = function (e) {
		e.preventDefault();
		$(this).css('cursor', 'normal')
			.off('mousemove.sliderns')
			.off('touchmove.sliderns');
	};

	var redrawSlider = function () {
		return $('.map_slider').each(init);
	};

	$(window).on('resize', redrawSlider);
	return this.each(init)
		.on('click touchstart', slideResize)
		.on('mousedown touchstart', enableSliderDrag)
		.on('mouseup touchend', disableSliderDrag);
	};

	$.fn.mapslider.defaultOptions= {
		initialPosition: 0.5,
		showInstruction: true,
		instructionText: 'Click and Drag'
	};

}(jQuery));
