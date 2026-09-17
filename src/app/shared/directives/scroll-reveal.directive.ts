import { Directive, ElementRef, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { AnimationBuilder, style, animate } from '@angular/animations';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() appScrollReveal = 'fadeInUp';
  @Input() revealDelay = 0;
  @Input() revealDuration = 600;

  private el = inject(ElementRef);
  private animationBuilder = inject(AnimationBuilder);
  private observer?: IntersectionObserver;

  private animations: Record<string, { transform: string; opacity: number }> = {
    fadeInUp: { transform: 'translateY(40px)', opacity: 0 },
    fadeInDown: { transform: 'translateY(-40px)', opacity: 0 },
    fadeInLeft: { transform: 'translateX(-40px)', opacity: 0 },
    fadeInRight: { transform: 'translateX(40px)', opacity: 0 },
    scaleIn: { transform: 'scale(0.8)', opacity: 0 },
    slideUp: { transform: 'translateY(60px)', opacity: 0 },
    blurIn: { transform: 'scale(1.02)', opacity: 0 }
  };

  ngOnInit(): void {
    const nativeEl = this.el.nativeElement;
    const initial = this.animations[this.appScrollReveal] || this.animations['fadeInUp'];

    nativeEl.style.opacity = '0';
    nativeEl.style.transform = initial.transform;
    nativeEl.style.transition = 'none';

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => this.reveal(), this.revealDelay);
            this.observer?.unobserve(nativeEl);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    this.observer.observe(nativeEl);
  }

  private reveal(): void {
    const factory = this.animationBuilder.build([
      style({ opacity: 0, transform: this.animations[this.appScrollReveal]?.transform || 'translateY(40px)' }),
      animate(`${this.revealDuration}ms cubic-bezier(0.35, 0, 0.25, 1)`,
        style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
    ]);

    const player = factory.create(this.el.nativeElement);
    player.play();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
