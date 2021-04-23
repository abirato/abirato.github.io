import './scss/fonts.scss';
import './scss/nullstyle.scss';
import './scss/style.scss';

document.addEventListener('DOMContentLoaded', function(){
  function createSlider(mainElement) {
    if (!(mainElement.querySelector('.slider__control_right'))) return;
    let
      sliderWrapper = mainElement.querySelector('.slider__wrapper'),
      sliderControls = mainElement.querySelectorAll('.slider__control'),
      sliderControlRight = mainElement.querySelector('.slider__control_right'),
      sliderControlLeft = mainElement.querySelector('.slider__control_left'),
      wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width),
      positionLeftItem = 0,
      transform = 0,
      step,
      items = [],
      itemWidth,
      sliderItems;

    if (sliderItems = mainElement.querySelector('.product-card')) {
      sliderItems = mainElement.querySelectorAll('.product-card');
    } else {
      sliderItems = mainElement.querySelectorAll('.product-cards-vert');
    }

    itemWidth = parseFloat(getComputedStyle(sliderItems[0], null).getPropertyValue("width"));
    step = itemWidth / wrapperWidth * 100;

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
  }

  let sliders = document.querySelectorAll('.block-card');
  for (let value of sliders) {
    createSlider(value);
  }
});
