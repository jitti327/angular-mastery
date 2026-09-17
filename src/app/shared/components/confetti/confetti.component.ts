import { Component, Input, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-confetti',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('particleAnimation', [
      transition(':enter', [
        style({ opacity: 1, transform: 'translateY(0) rotate(0deg) scale(1)' }),
        animate('{{ duration }}ms {{ delay }}ms ease-out', style({
          opacity: 0,
          transform: 'translateY({{ y }}px) rotate({{ rotation }}deg) scale(0.3)'
        }))
      ])
    ])
  ],
  template: `
    @if (active) {
      <div class="confetti-container">
        @for (particle of particles; track $index) {
          <div class="confetti-particle"
            [@particleAnimation]="{
              value: '',
              params: {
                duration: particle.duration,
                delay: particle.delay,
                y: particle.y,
                rotation: particle.rotation
              }
            }"
            [style.left]="particle.x + 'px'"
            [style.top]="particle.y_start + 'px'"
            [style.background-color]="particle.color"
            [style.width]="particle.size + 'px'"
            [style.height]="particle.size + 'px'"
            [style.border-radius]="particle.shape === 'circle' ? '50%' : '2px'">
          </div>
        }
      </div>
    }
  `,
  styles: [`
    .confetti-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }
    .confetti-particle {
      position: absolute;
      pointer-events: none;
    }
  `]
})
export class ConfettiComponent implements OnInit, OnDestroy {
  @Input() particleCount = 50;

  active = false;
  particles: Array<{
    x: number;
    y_start: number;
    y: number;
    rotation: number;
    color: string;
    size: number;
    delay: number;
    duration: number;
    shape: string;
  }> = [];

  private colors = ['#dd0031', '#c3002f', '#1976d2', '#ffc107', '#4caf50', '#ff5722', '#9c27b0', '#00bcd4'];

  ngOnInit(): void {
    this.trigger();
  }

  trigger(): void {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
        y_start: -20,
        y: 200 + Math.random() * 400,
        rotation: Math.random() * 720 - 360,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        size: 6 + Math.random() * 8,
        delay: Math.random() * 500,
        duration: 1500 + Math.random() * 1000,
        shape: Math.random() > 0.5 ? 'circle' : 'rect'
      });
    }
    this.active = true;
    setTimeout(() => this.active = false, 3000);
  }

  ngOnDestroy(): void {}
}
