import { Directive, ElementRef, Input, OnInit, OnDestroy, inject } from '@angular/core';

@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements OnInit, OnDestroy {
  @Input() appCountUp = 0;
  @Input() countDuration = 2000;
  @Input() countPrefix = '';
  @Input() countSuffix = '';

  private el = inject(ElementRef);
  private animationFrame?: number;

  ngOnInit(): void {
    this.observeAndAnimate();
  }

  private observeAndAnimate(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCount();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(this.el.nativeElement);
  }

  private animateCount(): void {
    const target = this.appCountUp;
    const duration = this.countDuration;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      this.el.nativeElement.textContent = this.countPrefix + current + this.countSuffix;

      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(step);
      }
    };

    this.animationFrame = requestAnimationFrame(step);
  }

  ngOnDestroy(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}
