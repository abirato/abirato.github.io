import './sass/fonts.sass';
import './sass/nullstyle.sass';
import './sass/style.sass';
import './sass/animation.sass';

(function(){
  document.addEventListener('DOMContentLoaded', function(){

    const select_tabs = function(mainElement) {
      let
        tabs = document.querySelector(mainElement),
        selection = tabs.querySelector('.projects-slider__tabs__selection'),
        tabs_btns = tabs.querySelectorAll('.projects-slider__tabs__btn'),
        items = tabs.querySelectorAll('.projects-slider__tabs__item'),
        active_tab = 0;

      function setSelection(tab) {
        let
          height = tab.offsetHeight,
          width = tab.offsetWidth,
          rect = tab.getBoundingClientRect().left - tabs.getBoundingClientRect().left;

        selection.style.left = rect + 'px';
        selection.style.width = width + 'px';
        selection.style.height = height + 'px';
      }

      window.addEventListener('resize', function() {
        setSelection(tabs_btns[active_tab]);
      });
      setSelection(tabs_btns[active_tab]);
      selection.style.display = 'block';

      function changeTab(index) {
        active_tab = index;
        setSelection(tabs_btns[active_tab]);
        items.forEach( i => {i.classList.remove('is-active')});
        items[index].classList.add('is-active');
      }

      for(let i = 0; i < tabs_btns.length; i++) {
        tabs_btns[i].addEventListener('click', () => {
          changeTab(i);
        })
      }
    }; // end select_tabs()

    const projects_slider = function (mainElement) {
      let
        sliderWrapper = mainElement.querySelector('.projects-slider__wrapper'),
        sliderControlLeft = mainElement.querySelector('.projects-slider__controls_left'),
        sliderControlRight = mainElement.querySelector('.projects-slider__controls_right'),
        paginatorContainers = mainElement.querySelector('.projects-slider__paginators'),
        sliderItems = mainElement.querySelectorAll('.projects-slider__wrapper__item'),
        wrapperWidth = parseFloat(getComputedStyle(sliderWrapper, null).getPropertyValue("width")),
        itemWidth = parseFloat(getComputedStyle(sliderItems[0], null).getPropertyValue("width")),
        position = 0,
        maxPosition = 0,
        transform = 0,
        paginators = [];

      while (maxPosition * wrapperWidth < itemWidth * sliderItems.length) maxPosition++;

      let pag_tmp = document.createElement('div');
      pag_tmp.className = 'projects-slider__paginator';
      for (let i = 0; i < maxPosition; i++) {
        paginatorContainers.append(pag_tmp.cloneNode(true));
      }
      paginators = paginatorContainers.querySelectorAll('.projects-slider__paginator');
      paginators[0].classList.add('active');

      paginators.forEach((item, index) => {
        item.addEventListener('click', function(e){
          e.preventDefault();
          wrapperWidth = parseFloat(getComputedStyle(sliderWrapper, null).getPropertyValue("width"));
          position = index;
          transform = wrapperWidth * position;
          paginators.forEach(i=>{i.classList.remove('active')});
          paginators[index].classList.add('active');
          sliderWrapper.style.transform = 'translateX(' + -transform + 'px)';
          if (position == 0) {
            sliderControlLeft.classList.remove('projects-slider__control__show');
            sliderControlRight.classList.add('projects-slider__control__show');
          }
          if (position != 0 && position != maxPosition-1) {
            sliderControlLeft.classList.add('projects-slider__control__show');
            sliderControlRight.classList.add('projects-slider__control__show');
          }
          if (position == maxPosition-1) {
            sliderControlRight.classList.remove('projects-slider__control__show');
            sliderControlLeft.classList.add('projects-slider__control__show');
          }
        });
      });

      function transformItem(direction) {
        wrapperWidth = parseFloat(getComputedStyle(sliderWrapper, null).getPropertyValue("width"));
        if (direction === 'left' && position != 0) {
          position--;
          transform = wrapperWidth * position;
          if (transform >= 0 && position <= maxPosition-1) sliderControlRight.classList.add('projects-slider__control__show');
          if (position == 0) sliderControlLeft.classList.remove('projects-slider__control__show');
        }
        if (direction === 'right' && position < maxPosition-1) {
          position++;
          transform = wrapperWidth * position;
          if (position > 0) sliderControlLeft.classList.add('projects-slider__control__show');
          if (position == maxPosition-1) sliderControlRight.classList.remove('projects-slider__control__show');
        }
        sliderWrapper.style.transform = 'translateX(' + -(transform) + 'px)';
        paginators.forEach(i=>{i.classList.remove('active')});
        paginators[position].classList.add('active');
      }

      sliderControlLeft.addEventListener('click', function(e) {
        e.preventDefault();
        transformItem('left');
      });
      sliderControlRight.addEventListener('click', function(e) {
        e.preventDefault();
        transformItem('right');
      });
    }; // end projects_slider()

    const slider = function(mainElement) {
      let
        sliderWrapper = mainElement.querySelector('.slider__wrapper'),
        sliderItems = mainElement.querySelectorAll('.slider__item'),
        sliderControlLeft = mainElement.querySelector('.slider__control_left'),
        sliderControlRight = mainElement.querySelector('.slider__control_right'),
        wrapperWidth = parseFloat(getComputedStyle(sliderWrapper, null).getPropertyValue("width")),
        itemWidth = parseFloat(getComputedStyle(sliderItems[0], null).getPropertyValue("width")),
        position = 0,
        positionMax = sliderItems.length,
        transform = 0,
        step = itemWidth / wrapperWidth * 100;

      function transformItem(direction) {
        if (direction === 'left' && position > 0) {
          position--;
          transform = step * position;
          if (position < sliderItems.length - 1) sliderControlRight.classList.add('slider__control__show');
          if (position == 0) sliderControlLeft.classList.remove('slider__control__show');
        }
        if (direction === 'right' && (position + wrapperWidth / itemWidth) < positionMax) {
          position++;
          transform = step * position;
          if (position > 0) sliderControlLeft.classList.add('slider__control__show');
          if ((position + wrapperWidth / itemWidth) >= positionMax) sliderControlRight.classList.remove('slider__control__show');
        }
        sliderWrapper.style.transform = 'translateX(' + -transform + '%)';
      }

      sliderControlLeft.addEventListener('click', function(e) {
        e.preventDefault();
        transformItem('left');
      });
      sliderControlRight.addEventListener('click', function(e) {
        e.preventDefault();
        transformItem('right');
      });
    }; // end slider()

    const helptip = function(mainElement) {
      let
        title = mainElement.querySelector('.helptip__item__title'),
        tip = mainElement.querySelector('.helptip__item__tip');
      title.onmouseover = title.onmouseout = handler;
      function handler(event) {
        if (event.type == 'mouseover') tip.style.display = 'block';
        if (event.type == 'mouseout') tip.style.display = 'none';
      }
    };

    select_tabs('.projects-slider__tabs');
    let projects_sliders = document.querySelectorAll('.projects-slider__tabs__item');
    for (let i = 0; i < projects_sliders.length; i++) {
      projects_slider(projects_sliders[i]);
    }
    let sliders = document.querySelectorAll('.slider');
    for (let i = 0; i < sliders.length; i++) slider(sliders[i]);

    let helptips = document.querySelectorAll('.helptip__item');
    for (let i = 0; i < helptips.length; i++) helptip(helptips[i]);


    (function(){
        document.querySelector('.loaded-screen').style.display = 'none';

        const animItem = document.querySelectorAll('._animation');
        window.addEventListener('scroll', animOnScroll);
        function animOnScroll() {
          for (let item of animItem) {
            const itemHeight = item.offsetHeight;
            const itemOffset = item.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);
            const animStart = 4; // одна четвертая высоты

            let itemPoint = window.innerHeight - itemHeight / animStart;
            if (itemHeight > window.innerHeight) itemPoint = window.innerHeight - window.innerHeight / animStart;
            if ((pageYOffset > itemOffset - itemPoint) && pageYOffset < (itemOffset + itemPoint)) {
              item.classList.add('_active');
            } // else { item.classList.remove('_active'); }
          }
        }
      animOnScroll();
    })();
  });
})();
