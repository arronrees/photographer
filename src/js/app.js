gsap.registerPlugin(ScrollTrigger);
//
// init smooth scrollbar
//
let bodyScrollBar;
function initSmoothScrollbar() {
  bodyScrollBar = Scrollbar.init(document.querySelector('#scroll__content'), {
    damping: 0.05,
  });

  // remove horizontal scrollbar
  bodyScrollBar.track.xAxis.element.remove();

  // keep ScrollTrigger in sync with smooth scrollbar
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        bodyScrollBar.scrollTop = value; // setter
      }
      return bodyScrollBar.scrollTop; // getter
    },
  });

  // when the smooth scroller updates, tell ScrollTrigger to update() too:
  bodyScrollBar.addListener(ScrollTrigger.update);
}
if (window.innerWidth > 1024) {
  initSmoothScrollbar();
}

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
    .to(navItems, { yPercent: 0, stagger: 0.2, duration: 0.8 }, 0.5);
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

  projects.forEach((project) => {
    const text = project.querySelectorAll('.text__mask div');
    gsap.set(text, { yPercent: 100 });

    ScrollTrigger.create({
      trigger: project,
      start: 'top center',
      onEnter: () => {
        gsap.to(text, {
          yPercent: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power1.out',
        });
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
      start: 'top center',
      onEnter: () => {
        gsap.to([images[i], imageMask[i]], {
          yPercent: 0,
          duration: 1,
          onComplete: () => {
            imageParallaxScroll(images[i]);
          },
        });
      },
    });
  });
}

//
// hero image parralax on scroll
//
function imageParallaxScroll(image) {
  gsap.to(image, {
    scale: 1,
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: image,
      start: `top top`,
      scrub: true,
    },
  });
}

//
// hero name enter animation
//
function textEnter(text) {
  const textContent = text.textContent;
  const splitText = textContent.split('');
  text.textContent = '';

  splitText.forEach((letter) => {
    // Adds space for multiple words
    if (letter === ' ') {
      text.innerHTML += `<span style="width: 3rem">${letter}</span>`;
    } else {
      text.innerHTML += `<span>${letter}</span>`;
    }
  });

  let char = 0;
  const span = text.querySelectorAll('span');
  gsap.set(span, { autoAlpha: 0, yPercent: 100 });

  const int = setInterval(() => {
    const currentSpan = span[char];
    gsap.to(currentSpan, {
      yPercent: 0,
      autoAlpha: 1,
      duration: 0.8,
      ease: 'power1.out',
    });

    char++;

    if (char === splitText.length) {
      clearInterval(int);
      return;
    }
  }, 100);
}

//
// about desc enter
//
function aboutEnter() {
  const aboutDescText = document.querySelectorAll('.about__desc .text__mask');

  aboutDescText.forEach((line) => {
    const text = line.querySelectorAll('div');
    gsap.set(text, { yPercent: 100 });

    ScrollTrigger.create({
      trigger: line,
      start: 'top 70%',
      onEnter: () => {
        gsap.to(text, {
          yPercent: 0,
          duration: 0.8,
          ease: 'power1.out',
        });
      },
    });
  });
}

//
// call functions on load
//
window.addEventListener('load', () => {
  navSlide();
  navItemUnderline();
  projectTitleEnter();
  imageParallaxScroll('.hero__img img');
  imageEnterScroll();
  textEnter(document.querySelectorAll('.hero__text div')[0]);
  textEnter(document.querySelectorAll('.hero__text div')[1]);
  aboutEnter();
});
