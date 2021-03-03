gsap.registerPlugin(ScrollTrigger);

gsap.set('#scroll__content', { autoAlpha: 0 });

function loaderAnimation() {
  const tl = gsap.timeline({
    defaults: {
      duration: 1.2,
      ease: 'power2.inOut',
    },
  });
  const loaders = document.querySelectorAll('.loader');
  const loaderWrapper = document.querySelector('.loader__wrapper');
  const loaderText = document.querySelectorAll('.loader__text');
  gsap.set(loaders, { scaleY: 0.01 });
  gsap.set(loaderText, { yPercent: 100 });

  tl.to(loaders, { scaleY: 1, stagger: 0.3 })
    .to(loaderText, { yPercent: 0 })
    .to([loaders, loaderText], { yPercent: 80 }, 2.4)
    .to(
      loaderWrapper,
      {
        yPercent: -100,
        onComplete: () => {
          gsap.set('#scroll__content', { autoAlpha: 1 });
          heroImageEnter();
        },
      },
      2.4
    );
}

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

//
// nav slide
//
let navOpen = false;
gsap.set('.main__nav', { yPercent: -100 });
gsap.set('.burger__menu', { autoAlpha: 0, yPercent: -100 });
function navSlide() {
  const burger = document.querySelector('.burger__menu');
  const nav = document.querySelector('.main__nav');
  const navItems = document.querySelectorAll('.nav__item a');
  const body = document.body;
  const lines = document.querySelectorAll('.burger__menu .line');
  const main = document.querySelector('main');

  gsap.to(burger, { autoAlpha: 1, yPercent: 0, duration: 0.8 });
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
        backgroundColor: 'var(--white)',
      },
      0
    )
    .to(
      lines[1],
      {
        duration: 0.2,
        rotate: 45,
        translateY: -3,
        backgroundColor: 'var(--white)',
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
        backgroundColor: 'var(--black)',
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
// hero name enter animation
//
function textReplacement(text) {
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

  const span = text.querySelectorAll('span');
  gsap.set(span, { yPercent: 200 });
}

//
// text replacement function, used on hero title
//
function textAnimation(text) {
  const span = text.querySelectorAll('span');
  let char = 0;

  const int = setInterval(() => {
    const currentSpan = span[char];
    gsap.to(currentSpan, {
      yPercent: 0,
      duration: 0.8,
      ease: 'power1.out',
    });

    char++;

    if (char === span.length) {
      clearInterval(int);
      return;
    }
  }, 100);
}

//
// hero image enter
//
gsap.set('.hero__img figure', {
  autoAlpha: 0,
  xPercent: -50,
  top: '5%',
  left: '50%',
  width: '10rem',
  height: '15rem',
});
function heroImageEnter() {
  const heroImg = document.querySelector('.hero__img figure');

  const tl = gsap.timeline({
    defaults: {
      duration: 2.5,
      ease: 'power1.inOut',
    },
  });

  tl.to(heroImg, { autoAlpha: 1, duration: 1 })
    .to(heroImg, {
      width: '100%',
      height: '110vh',
      top: '70vh',
    })
    .to(heroImg, {
      top: 0,
      position: 'relative',
      duration: 0,
      onComplete: () => {
        if (window.innerWidth > 1024) {
          initSmoothScrollbar();
        }
        start();
      },
    });
}

//
// project title fade in on scroll
//
gsap.set('.project', { autoAlpha: 0 });
function projectTitleEnter() {
  gsap.set('.project', { autoAlpha: 1 });
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
    gsap.set(images, { yPercent: -100 });
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
// images parralax on scroll
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
// name marquee slider
//
function nameSlider() {
  const boxWidth = 400;
  const totalWidth = boxWidth * 7; //  * n of boxes
  const text = document.querySelectorAll('.slider__text');
  const dirFromLeft = '+=' + totalWidth;

  const mod = gsap.utils.wrap(0, totalWidth);

  function marquee(which, time, direction) {
    gsap.set(which, {
      x: (i) => {
        return i * boxWidth;
      },
    });
    const action = gsap.timeline().to(which, {
      x: direction,
      modifiers: {
        x: (x) => mod(parseFloat(x)) + 'px',
      },
      duration: time,
      ease: 'none',
      repeat: -1,
    });
    return action;
  }

  const master = gsap.timeline().add(marquee(text, 25, dirFromLeft), 1);
}

//
// footer details enter
//
function footerDetailsEnter() {
  const details = document.querySelectorAll('.footer__details .text__mask');

  details.forEach((el) => {
    const text = el.querySelector('.footer__info');
    gsap.set(text, { yPercent: 100 });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(text, {
          yPercent: 0,
          duration: 0.6,
          ease: 'power1.out',
        });
      },
    });
  });
}

//
// call functions on load
//
function start() {
  navSlide();
  nameSlider();
  navItemUnderline();
  projectTitleEnter();
  imageParallaxScroll('.hero__img img');
  imageEnterScroll();
  aboutEnter();
  footerDetailsEnter();
  textAnimation(document.querySelectorAll('.hero__text div')[0]);
  textAnimation(document.querySelectorAll('.hero__text div')[1]);
}
window.addEventListener('load', () => {
  gsap.set('body', { display: 'block' });
  textReplacement(document.querySelectorAll('.hero__text div')[0]);
  textReplacement(document.querySelectorAll('.hero__text div')[1]);
  loaderAnimation();
});
