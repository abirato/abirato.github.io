(function(){
  let schedule_body = document.getElementsByClassName('schedule__body');
  let schedule_item = schedule_body[0].getElementsByClassName('schedule__body__item');
  for (let i = 0; i < 7; i++) {
    schedule_body[0].append(schedule_item[0].cloneNode(true));
  }
}());

let multiItemSlider = (function() {
  return function(selector, pag = "") {
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
      items = [],
      paginator,
      paginatorElements,
      paginatorActive;

      if (pag != "") {
        paginator = document.querySelector(pag);
        div = document.createElement('div');
        div.className = 'paginator';
        for (let i = 0; i < sliderItems.length; i++) {
          paginator.append(div.cloneNode(true));
        }
        paginatorElements = paginator.querySelectorAll('.paginator');
        paginatorActive = 0;
        paginatorElements[paginatorActive].classList.add('paginator__active');
      }

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

        if (paginator != undefined) {
          paginatorElements[paginatorActive].classList.remove('paginator__active');
          paginatorActive = positionLeftItem;
          paginatorElements[paginatorActive].classList.add('paginator__active');
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

let feedback_slider = multiItemSlider('.feedback__slider', '.feedback__slider__pagination');
