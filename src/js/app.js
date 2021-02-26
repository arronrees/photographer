gsap.registerPlugin(ScrollTrigger);
//
// nav slide
//
let navOpen = false;
function navSlide() {
  const burger = document.querySelector('.burger__menu');
  const nav = document.querySelector('.main__nav');
  const navItems = document.querySelectorAll('.nav__item a');
  const body = document.body;
  const lines = document.querySelectorAll('.burger__menu .line');
  const main = document.querySelector('main');

  gsap.set(nav, { yPercent: -100 });

  gsap.set(navItems, { yPercent: 200 });

  burger.addEventListener('click', () => {
    if (!navOpen) {
      body.classList.add('nav--open');
      openNav(nav, navItems, lines, main);
    } else {
      body.classList.remove('nav--open');
      closeNav(nav, navItems, lines, main);
    }
  });
}
function openNav(nav, navItems, lines, main) {
  navOpen = !navOpen;
  const openTl = gsap.timeline({
    defaults: { duration: 1, ease: 'power1.inOut' },
  });

  openTl
    .to(main, { y: 100 })
    .fromTo(nav, { yPercent: -100 }, { yPercent: 0 }, 0)
    .to(
      lines[0],
      {
        duration: 0.2,
        rotate: -45,
        translateY: 3,
      },
      0
    )
    .to(
      lines[1],
      {
        duration: 0.2,
        rotate: 45,
        translateY: -3,
      },
      0
    )
    .to(navItems, { yPercent: 0, stagger: 0.2, duration: 0.8 });
}
function closeNav(nav, navItems, lines, main) {
  navOpen = !navOpen;
  const closeTl = gsap.timeline({
    defaults: { duration: 0.8, ease: 'power1.inOut' },
  });

  closeTl
    .to(navItems, { yPercent: 200, stagger: 0.1, duration: 0.4 })
    .to(nav, { yPercent: 100 }, 0.7)
    .to(nav, { yPercent: -100, duration: 0 })
    .fromTo(main, { y: -100 }, { y: 0 }, 0.7)
    .to(
      lines,
      {
        duration: 0.2,
        rotate: 0,
        translateY: 0,
      },
      0.7
    );
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
// project title fade in on scroll
//
function projectTitleEnter() {
  const projects = document.querySelectorAll('.project');

  const tl = gsap.timeline({
    defaults: {
      duration: 0.6,
      ease: 'power1.out',
    },
  });

  projects.forEach((project) => {
    const text = project.querySelectorAll('.text__mask div');
    gsap.set(text, { yPercent: 100 });

    ScrollTrigger.create({
      trigger: project,
      start: 'top 70%',
      onEnter: () => {
        tl.to(text, { yPercent: 0, stagger: 0.1 });
      },
    });
  });
}

//
// image enter on scroll
//
function imageEnterScroll() {
  const projects = document.querySelectorAll('.project');
  const images = document.querySelectorAll('.project img');
  const imageMask = document.querySelectorAll('.project figure');

  projects.forEach((el, i) => {
    gsap.set(images, { yPercent: -120 });
    gsap.set(imageMask, { yPercent: 100 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 60%',
      onEnter: () => {
        gsap.to([images[i], imageMask[i]], {
          yPercent: 0,
          duration: 1,
        });
      },
    });
  });
}

//
// hero image parralax on scroll
//
function imageParallaxScroll() {
  gsap.to('.hero__img img', {
    scale: 1,
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero__img img',
      start: `top bottom`,
      scrub: true,
    },
  });
}

//
// skew on scroll
//
const projectImages = document.querySelectorAll('.projects figure');
let currentPixel = window.pageYOffset;
const imgSkewScroll = () => {
  const newPixel = window.pageYOffset;
  const diff = newPixel - currentPixel;

  const speed = diff * 0.075;

  projectImages.forEach((img) => {
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
  projectTitleEnter();
  imageParallaxScroll();
  imageEnterScroll();
});
