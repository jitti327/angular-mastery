import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  state,
  keyframes,
  group,
  animateChild
} from '@angular/animations';

// ─── Route Transitions ───────────────────────────────────────
export const routeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' })
    ], { optional: true }),
    group([
      query(':leave', [
        animate('200ms ease-out', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ], { optional: true }),
      query(':enter', [
        animate('350ms 100ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ], { optional: true })
    ])
  ])
]);

// ─── Stagger Animations ──────────────────────────────────────
export const staggerFadeIn = trigger('staggerFadeIn', [
  transition(':enter', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(30px) scale(0.95)' }),
      stagger('60ms', [
        animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ])
    ], { optional: true })
  ])
]);

export const staggerSlideIn = trigger('staggerSlideIn', [
  transition(':enter', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateX(-30px)' }),
      stagger('80ms', [
        animate('450ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ], { optional: true })
  ])
]);

export const staggerScaleIn = trigger('staggerScaleIn', [
  transition(':enter', [
    query(':enter', [
      style({ opacity: 0, transform: 'scale(0.8)' }),
      stagger('100ms', [
        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ], { optional: true })
  ])
]);

// ─── Fade Animations ─────────────────────────────────────────
export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-out', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({ opacity: 0 }))
  ])
]);

export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(30px)' }),
    animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

export const fadeInDown = trigger('fadeInDown', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-20px)' }),
    animate('350ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

// ─── Scale Animations ────────────────────────────────────────
export const scaleIn = trigger('scaleIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.8)' }),
    animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'scale(1)' }))
  ])
]);

export const popIn = trigger('popIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.5)' }),
    animate('500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', style({ opacity: 1, transform: 'scale(1)' }))
  ])
]);

// ─── Slide Animations ────────────────────────────────────────
export const slideInLeft = trigger('slideInLeft', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-50px)' }),
    animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
  ])
]);

export const slideInRight = trigger('slideInRight', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(50px)' }),
    animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
  ])
]);

// ─── Complex Animations ──────────────────────────────────────
export const heroAnimation = trigger('heroAnimation', [
  transition(':enter', [
    query('.hero-title, .hero-subtitle, .hero-cta, .hero-stats', [
      style({ opacity: 0, transform: 'translateY(40px)' })
    ], { optional: true }),
    query('.hero-title', [
      animate('600ms 200ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
    ], { optional: true }),
    query('.hero-subtitle', [
      animate('600ms 400ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
    ], { optional: true }),
    query('.hero-cta', [
      animate('600ms 600ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
    ], { optional: true }),
    query('.hero-stats', [
      animate('600ms 800ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
    ], { optional: true })
  ])
]);

export const cardHover = trigger('cardHover', [
  state('default', style({ transform: 'translateY(0)' })),
  state('hovered', style({ transform: 'translateY(-8px)' })),
  transition('default <=> hovered', animate('300ms cubic-bezier(0.35, 0, 0.25, 1)'))
]);

// ─── Quiz Animations ─────────────────────────────────────────
export const quizOptionAnimation = trigger('quizOptionAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-20px)' }),
    animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
  ])
]);

export const correctAnswer = trigger('correctAnswer', [
  transition(':enter', [
    style({ transform: 'scale(1)' }),
    animate('600ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', keyframes([
      style({ transform: 'scale(1)', offset: 0 }),
      style({ transform: 'scale(1.05)', offset: 0.3 }),
      style({ transform: 'scale(0.98)', offset: 0.6 }),
      style({ transform: 'scale(1)', offset: 1 })
    ]))
  ])
]);

export const wrongAnswer = trigger('wrongAnswer', [
  transition(':enter', [
    animate('500ms', keyframes([
      style({ transform: 'translateX(0)', offset: 0 }),
      style({ transform: 'translateX(-10px)', offset: 0.2 }),
      style({ transform: 'translateX(10px)', offset: 0.4 }),
      style({ transform: 'translateX(-10px)', offset: 0.6 }),
      style({ transform: 'translateX(10px)', offset: 0.8 }),
      style({ transform: 'translateX(0)', offset: 1 })
    ]))
  ])
]);

// ─── Celebration ─────────────────────────────────────────────
export const celebration = trigger('celebration', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.5) rotate(-10deg)' }),
    animate('800ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', style({ opacity: 1, transform: 'scale(1) rotate(0deg)' }))
  ])
]);

// ─── Floating Animation ──────────────────────────────────────
export const floating = trigger('floating', [
  transition(':enter', [
    animate('3s ease-in-out infinite', keyframes([
      style({ transform: 'translateY(0)', offset: 0 }),
      style({ transform: 'translateY(-10px)', offset: 0.5 }),
      style({ transform: 'translateY(0)', offset: 1 })
    ]))
  ])
]);

// ─── Pulse ───────────────────────────────────────────────────
export const pulse = trigger('pulse', [
  transition(':enter', [
    animate('2s ease-in-out infinite', keyframes([
      style({ transform: 'scale(1)', offset: 0 }),
      style({ transform: 'scale(1.05)', offset: 0.5 }),
      style({ transform: 'scale(1)', offset: 1 })
    ]))
  ])
]);

// ─── Confetti Particles ──────────────────────────────────────
export const confettiParticle = trigger('confettiParticle', [
  transition(':enter', [
    style({ opacity: 1, transform: 'translateY(0) rotate(0deg)' }),
    animate('2s ease-out', style({ opacity: 0, transform: 'translateY(400px) rotate(720deg)' }))
  ])
]);
