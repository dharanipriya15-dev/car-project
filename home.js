

// home.js - carousel, counters, bookNow, reviews auto-scroll

// Year
document.getElementById('yearFoot').textContent = new Date().getFullYear();

/* ---------------- Carousel (Hero) ---------------- */
const slidesEl = document.getElementById('slides');
const slides = slidesEl.children;
const dotsEl = document.getElementById('dots');
let current = 0;
// create dots
for (let i = 0; i < slides.length; i++) {
  const d = document.createElement('div');
  d.className = 'dot';
  d.dataset.idx = i;
  d.addEventListener('click', () => goToSlide(i));
  dotsEl.appendChild(d);
}
const dots = dotsEl.children;
function updateCarousel() {
  slidesEl.style.transform = `translateX(-${current * 100}%)`;
  for (let i = 0; i < dots.length; i++) dots[i].classList.toggle('active', i === current);
}
function goToSlide(i) {
  current = i; updateCarousel();
}
// auto rotate
let heroInterval = setInterval(() => {
  current = (current + 1) % slides.length;
  updateCarousel();
}, 4500);

// pause on hover
const carouselWrap = document.getElementById('carousel');
carouselWrap.addEventListener('mouseenter', () => clearInterval(heroInterval));
carouselWrap.addEventListener('mouseleave', () => heroInterval = setInterval(() => {
  current = (current + 1) % slides.length; updateCarousel();
}, 4500));

updateCarousel();

/* ---------------- Animated counters ---------------- */
const counters = document.querySelectorAll('.num');
counters.forEach(el => {
  const target = +el.dataset.target;
  let curr = 0;
  const step = Math.max(1, Math.floor(target / 120));
  const timer = setInterval(() => {
    curr += step;
    if (curr >= target) {
      el.textContent = target >= 1000 ? target + '+' : target;
      clearInterval(timer);
    } else {
      el.textContent = curr;
    }
  }, 14);
});

/* ---------------- Book now with car param ---------------- */
function bookNow(carName) {
  const encoded = encodeURIComponent(carName);
  window.location.href = `bookRide.html?car=${encoded}`;
}
window.bookNow = bookNow; // expose to global for inline onclicks

/* ---------------- Reviews auto-scroll (simple) ---------------- */
const reviews = document.getElementById('reviews');
let revScroll = 0;
setInterval(() => {
  revScroll += 332;
  if (revScroll > reviews.scrollWidth - reviews.clientWidth) revScroll = 0;
  reviews.scrollTo({ left: revScroll, behavior: 'smooth' });
}, 3500);

// greet user if name in localStorage
const savedName = localStorage.getItem('savedName') || localStorage.getItem('userName') || '';
if (savedName) {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) heroTitle.textContent = `Welcome back, ${savedName}! Smart rides at unbeatable prices`;
}
