import './scss/fonts.scss';
import './scss/nullstyle.scss';
import './scss/style.scss';
//import './scss/animation.scss';

let popup = document.querySelector('.pop-up');
let links = document.getElementsByTagName('a');
let buttons = document.querySelectorAll('.button');
let popupBanner = document.querySelector('.pop-up__banner__form');
let popupSent = document.querySelector('.pop-up__banner__sent');
let popupBannerButton = popupBanner.querySelector('.button');

let closePopUp = function (e) {
  e.preventDefault();
  if (e.target.className === 'pop-up' || e.target.className === 'pop-up__close') {
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
    if (popupBanner.style.display === 'none') {
      popupBanner.style.display = 'block';
      popupSent.style.display = 'none';
    }
  }
};

function openPopUp() {
  if (popup.style.display === 'none') {
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

let popUpSend = function (e) {
  e.preventDefault();
  popupBanner.style.display = 'none';
  popupSent.style.display = 'block';
};

popup.addEventListener('click', closePopUp);
[...links].forEach(function (link) {
  link.addEventListener('click', openPopUp);
});
buttons.forEach(function (button) {
  button.addEventListener('click', openPopUp);
});
popupBannerButton.addEventListener('click', popUpSend);
