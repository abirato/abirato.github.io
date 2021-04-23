import './sass/fonts.sass';
import './sass/nullstyle.sass';
import './sass/style.sass';

import './images/journey/1.png';
import './images/journey/2.png';
import './images/journey/3.png';

import './images/program/1.png';
import './images/program/2.png';
import './images/program/3.png';

let AutoSlider = (function() {
  return function(mainElement) {
    let
      sliderBody = mainElement.querySelector('.auto-slider__body'),
      mobileList = mainElement.querySelector('.auto-slider__mobile'),
      sliderItems = sliderBody.querySelectorAll('.auto-slider__item'),
      mobileItems = mobileList.querySelectorAll('.auto-slider__item'),
      imagesList = sliderBody.dataset.images.split(' '),
      activeItem = 0;

    function switchSlide(){
      sliderItems[activeItem].classList.remove('active');
      mobileItems[activeItem].classList.remove('active');
      if (activeItem === sliderItems.length - 1) activeItem = 0;
      else activeItem++;
      sliderBody.style.backgroundImage = 'url(' + imagesList[activeItem] + ')';
      sliderItems[activeItem].classList.add('active');
      mobileItems[activeItem].classList.add('active');
      setTimeout(switchSlide, 5000);
    }
    switchSlide();
  }
}());

let AutoSliderPaginatos = (function() {
  return function(mainElement) {
    let
      sliderBody = mainElement.querySelector('.instructors__slider__body'),
      sliderItems = sliderBody.querySelectorAll('.instructors__slider__item'),
      paginatorsContainer = mainElement.querySelector('.instructors__slider__paginators'),
      activeItem = 0,
      paginators,
      switchDate = new Date();

    let paginator_tmp = document.createElement('div');
    paginator_tmp.className = 'instructors__slider__paginator';
    for (let i = 0; i < sliderItems.length; i++) {
      paginatorsContainer.append(paginator_tmp.cloneNode(true));
    }
    paginators = paginatorsContainer.querySelectorAll('.instructors__slider__paginator');
    paginators[activeItem].classList.add('active');

    paginators.forEach(function(item, index) {
      item.addEventListener('click', function(e){
        e.preventDefault();
        switchDate = new Date();
        sliderItems[activeItem].classList.remove('active');
        paginators[activeItem].classList.remove('active');
        activeItem = index;
        sliderItems[activeItem].classList.add('active');
        paginators[activeItem].classList.add('active');
      });
    });

    function switchSlide(){
      if ((new Date() - switchDate) > 5500) {
        sliderItems[activeItem].classList.remove('active');
        paginators[activeItem].classList.remove('active');
        if (activeItem == sliderItems.length - 1) activeItem = 0;
        else activeItem++;
        sliderItems[activeItem].classList.add('active');
        paginators[activeItem].classList.add('active');
      }
      setTimeout(switchSlide, 5500);
    }
    switchSlide();
  }
}());

let ControlledSlider = (function() {
  return function(mainElement) {
      let
        sliderWrapper = mainElement.querySelector('.feedback__slider__wrapper'),
        sliderItems = mainElement.querySelectorAll('.feedback__slider__item'),
        sliderControls = mainElement.querySelectorAll('.slider-control'),
        sliderControlRight = mainElement.querySelector('.feedback__slider__control-right'),
        sliderControlLeft = mainElement.querySelector('.feedback__slider__control-left'),
        paginatorsContainer = mainElement.querySelector('.feedback__slider__paginators'),
        wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width),
        itemWidth = parseFloat(getComputedStyle(sliderItems[0], null).getPropertyValue("width")),
        positionLeftItem = 0,
        activeItem = 0,
        transform = 0,
        step = itemWidth / wrapperWidth * 100,
        paginators;

      let paginator_tmp = document.createElement('div');
      paginator_tmp.className = 'feedback__slider__paginator';
      for (let i = 0; i < sliderItems.length; i++) {
        paginatorsContainer.append(paginator_tmp.cloneNode(true));
      }
      paginators = paginatorsContainer.querySelectorAll('.feedback__slider__paginator');
      paginators[positionLeftItem].classList.add('active');

      paginators.forEach(function(item, index) {
        item.addEventListener('click', function(e){
          e.preventDefault();
          transform = -(step * index);
          positionLeftItem = index;
          paginators[activeItem].classList.remove('active');
          activeItem = positionLeftItem;
          paginators[positionLeftItem].classList.add('active');
          sliderWrapper.style.transform = 'translateX(' + transform + '%)';
          if (positionLeftItem === 0) {
            sliderControlLeft.classList.remove('slider-control__show');
            sliderControlRight.classList.add('slider-control__show');
          } else if (positionLeftItem !== 0 && positionLeftItem !== sliderItems.length - 1) {
            sliderControlLeft.classList.add('slider-control__show');
            sliderControlRight.classList.add('slider-control__show');
          } else if (positionLeftItem === sliderItems.length - 1) {
            sliderControlLeft.classList.add('slider-control__show');
            sliderControlRight.classList.remove('slider-control__show');
          }
        });
      });

      function transformItem (direction) {
        if (direction === 'right') {
          if (positionLeftItem === sliderItems.length - 1) return;
          positionLeftItem++;
          transform = -(step * positionLeftItem);
          if (positionLeftItem !== sliderItems.length - 1) sliderControlLeft.classList.add('slider-control__show');
          if (positionLeftItem === sliderItems.length - 1) sliderControlRight.classList.remove('slider-control__show');
        }
        if (direction === 'left') {
          if (positionLeftItem === 0) return;
          positionLeftItem--;
          transform = -(step * positionLeftItem);
          if (positionLeftItem !== 0) sliderControlRight.classList.add('slider-control__show');
          if (positionLeftItem === 0) sliderControlLeft.classList.remove('slider-control__show');
        }
        paginators[activeItem].classList.remove('active');
        activeItem = positionLeftItem;
        paginators[positionLeftItem].classList.add('active');
        sliderWrapper.style.transform = 'translateX(' + transform + '%)';
      }

      sliderControls.forEach(function(item){
        item.addEventListener('click', function(e){
          if (e.target.classList.contains('slider-control')) {
            e.preventDefault();
            transformItem(e.target.classList.contains('feedback__slider__control-right') ? 'right' : 'left');
          }
        });
      });
    }
}());

document.addEventListener('DOMContentLoaded', function(){
  let autoSliders = document.querySelectorAll('.sectionSlider');
  for(let val of autoSliders) AutoSlider(val);
  let autoPaginatorSliders = document.querySelectorAll('.instructors__slider');
  for(let val of autoPaginatorSliders) AutoSliderPaginatos(val);
  ControlledSlider(document.querySelector('.feedback'));
});

(function(){
  document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('.loaded-screen').style.display = 'none';

    const animItem = document.querySelectorAll('._animation');
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
      for (let item of animItem) {
        const itemHeight = item.offsetHeight;
        const itemOffset = item.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);
        const animStart = 4; // одна четвертая

        let itemPoint = window.innerHeight - itemHeight / animStart;
        if (itemHeight > window.innerHeight) itemPoint = window.innerHeight - window.innerHeight / animStart;
        if ((pageYOffset > itemOffset - itemPoint) && pageYOffset < (itemOffset + itemPoint)) {
          item.classList.add('_active');
        } // else { item.classList.remove('_active'); }
      }
    }
  animOnScroll();

  });

})();
