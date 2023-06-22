'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');

const tabs = document.querySelectorAll('.empower__tab');
const tabsContainer = document.querySelector('.empower__tab-container');
const tabsContent = document.querySelectorAll('.empower__content');

// Scrolling

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tab into the section empower
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.empower__tab');
  if (!clicked) return;

  tabs.forEach((t) => t.classList.remove('empower__tab--active'));
  tabsContent.forEach((c) => c.classList.remove('empower__content--active'));

  clicked.classList.add('empower__tab--active');
  document
    .querySelector(`.empower__content--${clicked.dataset.tab}`)
    .classList.add('empower__content--active');
});

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Mobile navigation

const btnNavEl = document.querySelector('.btn-mobile-nav');

btnNavEl.addEventListener('click', function () {
  header.classList.toggle('nav-open');
});

// Slider

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
const btnContainer = document.querySelector('.solution__btn-container');

let curSlide = 0;
const maxSlide = slides.length;

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach((dot) => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const activateBtn = function (slide) {
  document
    .querySelectorAll('.solution__btn')
    .forEach((btn) => btn.classList.remove('solution__btn--active'));

  document
    .querySelector(`.solution__btn[data-solution="${slide}"]`)
    .classList.add('solution__btn--active');
};

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translate(${100 * (i - slide)}%)`)
  );
};

// Next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
  activateBtn(curSlide);
};

// Previous slide
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
  activateBtn(curSlide);
};

const init = function () {
  goToSlide(0);
  createDots();
  activateDot(0);
  activateBtn(0);
};
init();

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
    activateBtn(slide);
  }
});

btnContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('solution__btn')) {
    const { solution } = e.target.dataset;
    goToSlide(solution);
    activateDot(solution);
    activateBtn(solution);
  }
});

// Year
const year = document.querySelector('.year');
const currentYear = new Date().getFullYear();
year.textContent = currentYear;
