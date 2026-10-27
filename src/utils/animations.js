import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations() {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) {
    gsap.utils.toArray('.reveal-on-scroll').forEach((el) => {
      gsap.set(el, { opacity: 1, y: 0 });
    });
    return;
  }

  // 1. Reveal section headings
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  revealElements.forEach((el) => {
    gsap.fromTo(el, 
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // 2. Card stagger reveals
  const cardGrids = document.querySelectorAll('.stagger-cards');
  cardGrids.forEach((grid) => {
    const cards = grid.querySelectorAll('.card-item, .photo-gallery-card, .service-photo-card');
    if (cards.length > 0) {
      gsap.fromTo(cards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });
}
