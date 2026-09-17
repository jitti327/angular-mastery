import { Injectable, signal, inject } from '@angular/core';
import { Certificate, LearningPath } from '../models/lesson.model';
import { ProgressService } from './progress.service';
import { ChallengeService } from './challenge.service';
import { LearningPathService } from './learning-path.service';

@Injectable({ providedIn: 'root' })
export class CertificateService {
  private readonly STORAGE_KEY = 'angular-mastery-certificates';
  private progressService = inject(ProgressService);
  private challengeService = inject(ChallengeService);
  private pathService = inject(LearningPathService);
  private certificates = signal<Certificate[]>(this.loadCertificates());

  readonly allCertificates = this.certificates.asReadonly();

  generateCertificate(pathId: string, learnerName: string): Certificate | null {
    const path = this.pathService.getPath(pathId);
    if (!path) return null;

    const progress = this.pathService.getPathProgress(pathId);
    if (progress.percentage < 100) return null;

    const existing = this.certificates().find(c => c.pathId === pathId);
    if (existing) return existing;

    const scores = Object.values(this.progressService.progress().quizScores);
    const averageScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 100;

    const cert: Certificate = {
      id: `cert-${pathId}-${Date.now()}`,
      pathId,
      pathTitle: path.title,
      completedAt: new Date(),
      totalLessons: progress.total,
      totalChallenges: path.milestones.reduce((acc, m) => acc + m.challengeIds.length, 0),
      averageScore,
      learnerName
    };

    this.certificates.set([...this.certificates(), cert]);
    this.saveCertificates();
    return cert;
  }

  getCertificate(pathId: string): Certificate | undefined {
    return this.certificates().find(c => c.pathId === pathId);
  }

  downloadCertificate(cert: Certificate): void {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 850;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 1200, 850);

    // Border
    ctx.strokeStyle = '#dd0031';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 1160, 810);

    // Inner border
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.strokeRect(30, 30, 1140, 790);

    // Header
    ctx.fillStyle = '#dd0031';
    ctx.font = 'bold 16px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ANGULAR MASTERY', 600, 80);

    // Title
    ctx.fillStyle = '#1a1a1a';
    ctx.font = 'bold 48px system-ui, sans-serif';
    ctx.fillText('Certificate of Completion', 600, 160);

    // Decorative line
    ctx.strokeStyle = '#dd0031';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(300, 185);
    ctx.lineTo(900, 185);
    ctx.stroke();

    // Recipient
    ctx.fillStyle = '#666';
    ctx.font = '20px system-ui, sans-serif';
    ctx.fillText('This certifies that', 600, 240);

    ctx.fillStyle = '#1a1a1a';
    ctx.font = 'bold 36px system-ui, sans-serif';
    ctx.fillText(cert.learnerName, 600, 290);

    // Achievement
    ctx.fillStyle = '#666';
    ctx.font = '20px system-ui, sans-serif';
    ctx.fillText('has successfully completed', 600, 340);

    ctx.fillStyle = '#dd0031';
    ctx.font = 'bold 30px system-ui, sans-serif';
    ctx.fillText(cert.pathTitle, 600, 390);

    // Stats
    ctx.fillStyle = '#666';
    ctx.font = '18px system-ui, sans-serif';
    const statsY = 460;
    ctx.fillText(`${cert.totalLessons} Lessons Completed`, 400, statsY);
    ctx.fillText(`${cert.totalChallenges} Challenges Mastered`, 600, statsY);
    ctx.fillText(`${cert.averageScore}% Average Score`, 800, statsY);

    // Date
    ctx.fillStyle = '#999';
    ctx.font = '16px system-ui, sans-serif';
    const date = new Date(cert.completedAt);
    ctx.fillText(`Completed on ${date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 600, 540);

    // Footer
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px system-ui, sans-serif';
    ctx.fillText('ANGULAR MASTERY', 600, 750);
    ctx.fillStyle = '#999';
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillText('www.angular-mastery.com', 600, 770);

    // Download
    const link = document.createElement('a');
    link.download = `angular-mastery-${cert.pathId}-certificate.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  private loadCertificates(): Certificate[] {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          localStorage.removeItem(this.STORAGE_KEY);
        }
      }
    }
    return [];
  }

  private saveCertificates(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.certificates()));
    }
  }
}
