//
// nav slide
//
function navSlide() {
  const burger = document.querySelector('.burger__menu');
  const nav = document.querySelector('.main__nav');

  burger.addEventListener('click', () => {
    nav.classList.toggle('nav--open');
  });
}

window.addEventListener('load', () => {
  navSlide();
});
