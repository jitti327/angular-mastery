import { Component, inject, signal, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommunityService } from '../../../core/services/community.service';
import { Comment } from '../../../core/models/lesson.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-community-comments',
  standalone: true,
  imports: [FormsModule],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  template: `
    <div class="community-section">
      <div class="section-header">
        <h3>💬 Discussion</h3>
        <span class="comment-count">{{ comments().length }} comments</span>
      </div>

      @if (!communityService.user() || communityService.user() === 'Anonymous') {
        <div class="user-setup" @slideIn>
          <input type="text" placeholder="Enter your name to join the discussion"
            [value]="userName()" (input)="onNameInput($event)"
            (keydown.enter)="setUser()" class="name-input" />
          <button class="set-name-btn" (click)="setUser()">Join</button>
        </div>
      } @else {
        <div class="comment-form" @slideIn>
          <div class="user-badge">{{ communityService.user() }}</div>
          <textarea placeholder="Share your thoughts or ask a question..."
            [value]="newComment()" (input)="onCommentInput($event)"
            class="comment-input" rows="3"></textarea>
          <button class="submit-btn" (click)="submitComment()" [disabled]="!newComment().trim()">
            Post Comment
          </button>
        </div>
      }

      <div class="comments-list">
        @for (comment of comments(); track comment.id) {
          <div class="comment" @slideIn>
            <div class="comment-header">
              <span class="author">{{ comment.author }}</span>
              <span class="time">{{ formatTime(comment.createdAt) }}</span>
            </div>
            <p class="comment-content">{{ comment.content }}</p>
            <div class="comment-actions">
              <button class="action-btn" (click)="likeComment(comment.id)">
                {{ comment.likes > 0 ? '❤️' : '🤍' }} {{ comment.likes }}
              </button>
              <button class="action-btn" (click)="toggleReply(comment.id)">Reply</button>
            </div>

            @if (replyingTo() === comment.id) {
              <div class="reply-form" @slideIn>
                <textarea placeholder="Write a reply..."
                  [value]="replyContent()" (input)="onReplyInput($event)"
                  class="reply-input" rows="2"></textarea>
                <div class="reply-actions">
                  <button class="cancel-btn" (click)="replyingTo.set(null)">Cancel</button>
                  <button class="submit-btn small" (click)="submitReply(comment.id)">Reply</button>
                </div>
              </div>
            }

            @if (comment.replies.length > 0) {
              <div class="replies">
                @for (reply of comment.replies; track reply.id) {
                  <div class="reply">
                    <div class="comment-header">
                      <span class="author">{{ reply.author }}</span>
                      <span class="time">{{ formatTime(reply.createdAt) }}</span>
                    </div>
                    <p class="comment-content">{{ reply.content }}</p>
                  </div>
                }
              </div>
            }
          </div>
        }

        @if (comments().length === 0) {
          <div class="empty-state">
            <div class="empty-icon">💬</div>
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .community-section { margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--border-color); }
    .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .section-header h3 { margin: 0; font-size: 18px; color: var(--text-primary); }
    .comment-count { font-size: 13px; color: var(--text-secondary); }
    .user-setup { display: flex; gap: 8px; margin-bottom: 20px; }
    .name-input {
      flex: 1; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 8px;
      font-size: 14px; background: var(--card-bg); color: var(--text-primary);
    }
    .name-input:focus { outline: none; border-color: var(--primary); }
    .set-name-btn {
      padding: 10px 20px; background: var(--primary); color: white; border: none;
      border-radius: 8px; cursor: pointer; font-weight: 500;
    }
    .comment-form { margin-bottom: 24px; }
    .user-badge {
      display: inline-block; padding: 4px 12px; background: var(--primary); color: white;
      border-radius: 12px; font-size: 12px; font-weight: 600; margin-bottom: 8px;
    }
    .comment-input, .reply-input {
      width: 100%; padding: 12px; border: 1px solid var(--border-color); border-radius: 8px;
      font-size: 14px; resize: vertical; font-family: inherit;
      background: var(--card-bg); color: var(--text-primary);
    }
    .comment-input:focus, .reply-input:focus { outline: none; border-color: var(--primary); }
    .submit-btn {
      margin-top: 8px; padding: 8px 20px; background: var(--primary); color: white;
      border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px;
    }
    .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .submit-btn.small { padding: 6px 16px; font-size: 13px; }
    .comments-list { display: flex; flex-direction: column; gap: 16px; }
    .comment {
      padding: 16px; border: 1px solid var(--border-color); border-radius: 10px;
      background: var(--card-bg);
    }
    .comment-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
    .author { font-weight: 600; font-size: 14px; color: var(--text-primary); }
    .time { font-size: 12px; color: var(--text-secondary); }
    .comment-content { margin: 0 0 10px; font-size: 14px; line-height: 1.6; color: var(--text-primary); }
    .comment-actions { display: flex; gap: 12px; }
    .action-btn {
      padding: 4px 10px; background: transparent; border: none; color: var(--text-secondary);
      cursor: pointer; font-size: 13px; border-radius: 4px;
    }
    .action-btn:hover { background: var(--tag-bg, rgba(0,0,0,0.05)); }
    .reply-form { margin-top: 12px; }
    .reply-actions { display: flex; gap: 8px; margin-top: 8px; }
    .cancel-btn {
      padding: 6px 16px; background: transparent; border: 1px solid var(--border-color);
      border-radius: 8px; cursor: pointer; font-size: 13px;
    }
    .replies { margin-top: 12px; padding-left: 16px; border-left: 2px solid var(--border-color); }
    .reply { padding: 12px 0; }
    .reply + .reply { border-top: 1px solid var(--border-color); }
    .empty-state { text-align: center; padding: 40px; color: var(--text-secondary); }
    .empty-icon { font-size: 40px; margin-bottom: 12px; }
  `]
})
export class CommunityCommentsComponent {
  lessonId = input.required<number>();

  communityService = inject(CommunityService);

  newComment = signal('');
  replyingTo = signal<string | null>(null);
  replyContent = signal('');
  userName = signal('');

  comments = (): Comment[] => this.communityService.getComments(this.lessonId());

  onNameInput(event: Event): void {
    this.userName.set((event.target as HTMLInputElement).value);
  }

  onCommentInput(event: Event): void {
    this.newComment.set((event.target as HTMLTextAreaElement).value);
  }

  onReplyInput(event: Event): void {
    this.replyContent.set((event.target as HTMLTextAreaElement).value);
  }

  setUser(): void {
    if (this.userName()) {
      this.communityService.setUser(this.userName());
    }
  }

  submitComment(): void {
    if (this.newComment().trim()) {
      this.communityService.addComment(this.lessonId(), this.newComment());
      this.newComment.set('');
    }
  }

  toggleReply(commentId: string): void {
    this.replyingTo.set(this.replyingTo() === commentId ? null : commentId);
    this.replyContent.set('');
  }

  submitReply(commentId: string): void {
    if (this.replyContent().trim()) {
      this.communityService.addReply(commentId, this.replyContent());
      this.replyingTo.set(null);
      this.replyContent.set('');
    }
  }

  likeComment(commentId: string): void {
    this.communityService.likeComment(commentId);
  }

  formatTime(date: Date): string {
    const now = new Date();
    const d = new Date(date);
    const diff = now.getTime() - d.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString();
  }
}
