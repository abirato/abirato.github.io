(function() {
  let button = document.getElementById('toggle-menu');
  button.addEventListener('click', function(event) {
    event.preventDefault();
    let menu = document.getElementById('main-menu');
    menu.classList.toggle('is-open');
  });
})();

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

let promo_slider = multiItemSlider('.promo__slider');
let products_slider = multiItemSlider('.products__slider');
