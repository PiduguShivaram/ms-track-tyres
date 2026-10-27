import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations() {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) {
    // Graceful fallback for reduced motion: reveal all sections simply
    gsap.utils.toArray('.reveal-on-scroll').forEach((el) => {
      gsap.set(el, { opacity: 1, y: 0 });
    });
    return;
  }

  // 1. Staggered reveal of section content cards & headings
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  revealElements.forEach((el) => {
    gsap.fromTo(el, 
      {
        opacity: 0,
        y: 32
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // 2. Staggered card grid entrances
  const cardGrids = document.querySelectorAll('.stagger-cards');
  cardGrids.forEach((grid) => {
    const cards = grid.querySelectorAll('.card-item, .gallery-card');
    if (cards.length > 0) {
      gsap.fromTo(cards,
        {
          opacity: 0,
          y: 28
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  });
}
