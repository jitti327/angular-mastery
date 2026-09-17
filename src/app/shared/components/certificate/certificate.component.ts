import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [FormsModule, DatePipe],
  template: `
    <div class="certificate-overlay" (click)="onOverlayClick($event)">
      <div class="certificate-modal">
        <button class="close-btn" (click)="close.emit()">✕</button>

        <div class="certificate-wrapper" id="certificate-content">
          <div class="certificate">
            <div class="certificate-border">
              <div class="certificate-inner">
                <div class="certificate-header">
                  <div class="logo">
                    <span class="logo-icon">🔺</span>
                    <span class="logo-text">Angular Mastery</span>
                  </div>
                  <h1 class="certificate-title">Certificate of Completion</h1>
                  <div class="divider"></div>
                </div>

                <div class="certificate-body">
                  <p class="presented-to">This certificate is proudly presented to</p>
                  <div class="name-field">
                    <input
                      type="text"
                      [(ngModel)]="editableName"
                      class="name-input"
                      placeholder="Your Name"
                    />
                    <div class="name-underline"></div>
                  </div>
                  <p class="completion-text">has successfully completed</p>
                  <h2 class="category-name">{{ category }}</h2>
                  <div class="details-row">
                    <div class="detail">
                      <span class="detail-label">Date of Completion</span>
                      <span class="detail-value">{{ completionDate | date:'MMMM d, yyyy' }}</span>
                    </div>
                    <div class="detail">
                      <span class="detail-label">Lessons Completed</span>
                      <span class="detail-value">{{ totalLessons }}</span>
                    </div>
                  </div>
                </div>

                <div class="certificate-footer">
                  <div class="signature-line">
                    <div class="line"></div>
                    <span>Angular Mastery Team</span>
                  </div>
                  <div class="certificate-id">
                    Certificate ID: AM-{{ completionDate | date:'yyyyMMdd' }}-{{ totalLessons }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="actions">
          <button class="download-btn" (click)="downloadPdf()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download as PDF
          </button>
          <button class="close-action-btn" (click)="close.emit()">Close</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .certificate-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 24px;
    }
    .certificate-modal {
      background: white;
      border-radius: 16px;
      padding: 32px;
      max-width: 900px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.3);
    }
    .close-btn {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 36px;
      height: 36px;
      border: none;
      background: var(--bg-secondary);
      border-radius: 50%;
      cursor: pointer;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary);
      transition: all 0.2s;
      z-index: 10;
    }
    .close-btn:hover {
      background: #fee2e2;
      color: #dc2626;
    }
    .certificate-wrapper {
      display: flex;
      justify-content: center;
    }
    .certificate {
      width: 100%;
      max-width: 760px;
      background: #fffdf7;
    }
    .certificate-border {
      border: 3px solid #b8860b;
      padding: 8px;
    }
    .certificate-inner {
      border: 1px solid #d4a843;
      padding: 48px 56px;
      text-align: center;
      position: relative;
    }
    .certificate-inner::before,
    .certificate-inner::after {
      content: '';
      position: absolute;
      width: 60px;
      height: 60px;
      border: 2px solid #b8860b;
    }
    .certificate-inner::before {
      top: 8px;
      left: 8px;
      border-right: none;
      border-bottom: none;
    }
    .certificate-inner::after {
      bottom: 8px;
      right: 8px;
      border-left: none;
      border-top: none;
    }
    .certificate-header {
      margin-bottom: 32px;
    }
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-bottom: 24px;
    }
    .logo-icon {
      font-size: 32px;
    }
    .logo-text {
      font-size: 22px;
      font-weight: 700;
      color: #dd0031;
      letter-spacing: 1px;
    }
    .certificate-title {
      font-size: 36px;
      font-weight: 300;
      color: #1a1a2e;
      margin: 0 0 8px;
      letter-spacing: 3px;
      text-transform: uppercase;
    }
    .divider {
      width: 120px;
      height: 2px;
      background: linear-gradient(90deg, transparent, #b8860b, transparent);
      margin: 16px auto 0;
    }
    .certificate-body {
      margin: 32px 0;
    }
    .presented-to {
      font-size: 14px;
      color: #666;
      margin: 0 0 20px;
      font-style: italic;
    }
    .name-field {
      margin: 0 auto 24px;
      max-width: 400px;
    }
    .name-input {
      width: 100%;
      text-align: center;
      font-size: 28px;
      font-weight: 600;
      color: #1a1a2e;
      border: none;
      border-bottom: 2px solid #b8860b;
      background: transparent;
      padding: 8px 4px;
      outline: none;
      font-family: 'Georgia', serif;
    }
    .name-input::placeholder {
      color: #ccc;
    }
    .name-underline {
      height: 1px;
      background: #d4a843;
      margin-top: 2px;
    }
    .completion-text {
      font-size: 14px;
      color: #666;
      margin: 0 0 12px;
    }
    .category-name {
      font-size: 24px;
      font-weight: 600;
      color: #dd0031;
      margin: 0 0 32px;
      letter-spacing: 1px;
    }
    .details-row {
      display: flex;
      justify-content: center;
      gap: 64px;
      margin: 32px 0;
    }
    .detail {
      text-align: center;
    }
    .detail-label {
      display: block;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #999;
      margin-bottom: 6px;
    }
    .detail-value {
      display: block;
      font-size: 15px;
      color: #333;
      font-weight: 500;
    }
    .certificate-footer {
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
    .signature-line {
      text-align: center;
    }
    .signature-line .line {
      width: 200px;
      height: 1px;
      background: #333;
      margin-bottom: 8px;
    }
    .signature-line span {
      font-size: 13px;
      color: #555;
      font-style: italic;
    }
    .certificate-id {
      font-size: 10px;
      color: #aaa;
      letter-spacing: 1px;
    }
    .actions {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-top: 24px;
    }
    .download-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 28px;
      background: linear-gradient(135deg, #dd0031, #c3002f);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .download-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 16px rgba(221, 0, 49, 0.4);
    }
    .close-action-btn {
      padding: 12px 28px;
      background: var(--bg-secondary);
      color: var(--text-secondary);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      font-size: 15px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .close-action-btn:hover {
      background: var(--bg-primary);
    }

    @media print {
      body * {
        visibility: hidden !important;
      }
      #certificate-content,
      #certificate-content * {
        visibility: visible !important;
      }
      .certificate-overlay {
        position: static !important;
        background: none !important;
        padding: 0 !important;
      }
      .certificate-modal {
        box-shadow: none !important;
        border-radius: 0 !important;
        padding: 0 !important;
        max-height: none !important;
        overflow: visible !important;
      }
      .close-btn,
      .actions {
        display: none !important;
      }
      .certificate-wrapper {
        display: block !important;
      }
      .certificate {
        max-width: none !important;
        page-break-inside: avoid;
      }
      @page {
        size: landscape;
        margin: 0.5in;
      }
    }

    @media (max-width: 640px) {
      .certificate-modal {
        padding: 16px;
      }
      .certificate-inner {
        padding: 32px 24px;
      }
      .certificate-title {
        font-size: 22px;
        letter-spacing: 1px;
      }
      .name-input {
        font-size: 22px;
      }
      .category-name {
        font-size: 18px;
      }
      .details-row {
        flex-direction: column;
        gap: 24px;
      }
    }
  `]
})
export class CertificateComponent {
  @Input({ required: true }) userName = '';
  @Input({ required: true }) category = '';
  @Input({ required: true }) completionDate = new Date();
  @Input({ required: true }) totalLessons = 0;
  @Output() close = new EventEmitter<void>();

  editableName = '';

  ngOnInit() {
    this.editableName = this.userName;
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('certificate-overlay')) {
      this.close.emit();
    }
  }

  downloadPdf() {
    window.print();
  }
}
