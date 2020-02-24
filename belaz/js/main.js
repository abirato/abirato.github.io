$(document).ready(function(){
  let tag_p = $("#list-q li > p");
  let subtexts = $("#list-q .subtext");
  let subtexts_close = $("#list-q .subtext-close");

  for (let i = 0; i < tag_p.length; i++) {
    $(tag_p[i]).bind("click", function(){
      $(".subtext").css({"display":"none"});
      $(subtexts[i]).css({"display":"block"});
    });
    $(subtexts_close[i]).bind("click", function(){
      $(".subtext").css({"display":"none"});
    });
  }

  $(document).mouseup(function (e){
		var subtext = $(".subtext");
		if (!subtext.is(e.target) && subtext.has(e.target).length === 0) {
			$(".subtext").css({"display":"none"});
		}
	});
});

let multiItemSlider = (function() {
  return function(selector) {
    let
      mainElement = document.querySelector(selector),
      sliderWrapper = mainElement.querySelector('.slider__wrapper'),
      sliderItems = mainElement.querySelectorAll('.slider__item'),
      sliderControls = mainElement.querySelectorAll('.slider__control'),
      sliderControlRight = mainElement.querySelector('.slider__control_right'),
      sliderControlLeft = mainElement.querySelector('.slider__control_left'),
      wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width),
      itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width),
      positionLeftItem = 0,
      transform = 0,
      step = itemWidth / wrapperWidth * 100,
      items = [];

      sliderItems.forEach(function (item, index) {
        items.push({ item: item, position: index, transform: 0 });
      });

      let position = {
        getMin: 0,
        getMax: items.length - 1,
      }

      let transformItem = function (direction) {
        if (direction === 'right') {
          if ((positionLeftItem + wrapperWidth / itemWidth - 1) >= position.getMax) {
            return;
          }
          if (!sliderControlLeft.classList.contains('slider__control__show')) {
            sliderControlLeft.classList.add('slider__control__show');
          }
          if (sliderControlRight.classList.contains('slider__control__show') && (positionLeftItem + wrapperWidth / itemWidth) >= position.getMax) {
            sliderControlRight.classList.remove('slider__control__show');
          }
          positionLeftItem++;
          transform -= step;
        }
        if (direction === 'left') {
          if (positionLeftItem <= position.getMin) {
            return;
          }
          if (!sliderControlRight.classList.contains('slider__control__show')) {
            sliderControlRight.classList.add('slider__control__show');
          }
          if (sliderControlLeft.classList.contains('slider__control__show') && positionLeftItem - 1 <= position.getMin) {
            sliderControlLeft.classList.remove('slider__control__show');
          }
          positionLeftItem--;
          transform += step;
        }
        sliderWrapper.style.transform = 'translateX(' + transform + '%)';
      }

      let controlClick = function (e) {
        if (e.target.classList.contains('slider__control')) {
          e.preventDefault();
          transformItem(e.target.classList.contains('slider__control_right') ? 'right' : 'left');
        }
      };

      sliderControls.forEach(function (item) {
        item.addEventListener('click', controlClick);
      });

      return {
        right: function () {
          transformItem('right');
        },
        left: function () {
          transformItem('left');
        }
      }

  }
}());

let spares_slider = multiItemSlider('.spares__slider');
let guarantees_slider = multiItemSlider('.guarantees__slider');
let bonuses_slider = multiItemSlider('.bonuses__slider');
let convenience_slider = multiItemSlider('.convenience__slider');
let storage_slider = multiItemSlider('.storage__slider');
let service_slider = multiItemSlider('.service__slider');
