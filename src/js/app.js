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
//
// nav underline on hover
//
function navItemUnderline() {
  const navItems = document.querySelectorAll('.nav__item');
  console.log(navItems);
  navItems.forEach((item) => {
    item.addEventListener('mouseleave', (e) => {
      // Add class
      item.classList.add('animate-out');
    });
    // Remove class
    item.ontransitionend = () => {
      //remove class
      item.classList.remove('animate-out');
    };
  });
}

window.addEventListener('load', () => {
  navSlide();
  navItemUnderline();
});
