import './sass/fonts.sass';
import './sass/nullstyle.sass';
import './sass/style.sass';
import './sass/animation.sass';

document.addEventListener('DOMContentLoaded', function(){
  let
    header = document.querySelector('.header'),
    hamburger_button = header.querySelector('.hamburger-button'),
    main_block = header.querySelector('.main-block'),
    drop_menu = header.querySelector('.drop-menu');

    hamburger_button.addEventListener('click', function (e) {
      header.classList.toggle('menu-open');
    });

  function setAutoSlider(mainElement) {
    let
      sliderBody = mainElement.querySelector('.slider__body'),
      sliderItems = mainElement.querySelectorAll('.slider__item'),
      paginatorsContainer = mainElement.querySelector('.slider__paginators'),
      paginarots,
      activeItem = 0,
      items = [],
      switchDate = new Date();

    let paginator = document.createElement('div');
    paginator.className = 'slider-paginator';
    for (let i = 0; i < sliderItems.length; i++) {
      paginatorsContainer.append(paginator.cloneNode(true));
    }
    paginarots = paginatorsContainer.querySelectorAll('.slider-paginator');
    paginarots[activeItem].classList.add('active');

    paginarots.forEach(function (item, index) {
      item.addEventListener('click', function (e) {
        switchDate = new Date();
        e.preventDefault();
        sliderItems[activeItem].classList.remove('active');
        paginarots[activeItem].classList.remove('active');
        activeItem = index;
        sliderItems[activeItem].classList.add('active');
        paginarots[activeItem].classList.add('active');
      });
    });

    function switchSlide() {
      let nowTime = new Date();
      if ((nowTime - switchDate) > 4000) {
        sliderItems[activeItem].classList.remove('active');
        paginarots[activeItem].classList.remove('active');
        if (activeItem == sliderItems.length - 1) {
          activeItem = 0;
        } else {
          activeItem = activeItem + 1;
        }
        sliderItems[activeItem].classList.add('active');
        paginarots[activeItem].classList.add('active');
      }
      setTimeout(switchSlide, 5000);
    }
    switchSlide();
  }

  function setSliderBlock(mainElement) {
    let
      sliderWrapper = mainElement.querySelector('.slider__wrapper'),
      sliderItems = mainElement.querySelectorAll('.slider__item'),
      sliderControls = mainElement.querySelectorAll('.slider__control'),
      sliderControlRight = mainElement.querySelector('.slider__control_right'),
      sliderControlLeft = mainElement.querySelector('.slider__control_left'),
      wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width),
      itemWidth = parseFloat(getComputedStyle(sliderItems[0], null).getPropertyValue("width")),
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
  }

  let sliders = document.querySelectorAll('.slider-block');
  for (let value of sliders) setSliderBlock(value);

  setAutoSlider(document.querySelector('.header-slider'));
  setAutoSlider(document.querySelector('.banner-block__slider'));
});
