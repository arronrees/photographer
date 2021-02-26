gsap.registerPlugin(ScrollTrigger);
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

//
// image parralax on scroll
//
function imageParallaxScroll() {
  const images = document.querySelectorAll('img');

  images.forEach((img) => {
    gsap.to(img, {
      scale: 1,
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: img,
        start: 'top bottom',
        scrub: true,
      },
    });
  });
}
imageParallaxScroll();

//
// skew on scroll
//
const images = document.querySelectorAll('figure');
let currentPixel = window.pageYOffset;
const imgSkewScroll = () => {
  const newPixel = window.pageYOffset;
  const diff = newPixel - currentPixel;

  const speed = diff * 0.075;

  images.forEach((img) => {
    img.style.transform = `skewY(${speed}deg)`;
  });

  currentPixel = newPixel;

  requestAnimationFrame(imgSkewScroll);
};

//
// call functions on load
//
window.addEventListener('load', () => {
  navSlide();
  navItemUnderline();
  imgSkewScroll();
});
