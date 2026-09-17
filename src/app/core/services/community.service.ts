import { Injectable, signal } from '@angular/core';
import { Comment } from '../models/lesson.model';

@Injectable({ providedIn: 'root' })
export class CommunityService {
  private readonly STORAGE_KEY = 'angular-mastery-comments';
  private readonly USER_KEY = 'angular-mastery-user';
  private comments = signal<Comment[]>(this.loadComments());
  private currentUser = signal<string>(this.loadUser());

  readonly allComments = this.comments.asReadonly();
  readonly user = this.currentUser.asReadonly();

  getComments(lessonId: number): Comment[] {
    return this.comments().filter(c => c.lessonId === lessonId);
  }

  addComment(lessonId: number, content: string): Comment {
    const comment: Comment = {
      id: `comment-${Date.now()}`,
      lessonId,
      author: this.currentUser(),
      content,
      createdAt: new Date(),
      likes: 0,
      likedBy: [],
      replies: []
    };
    this.comments.set([...this.comments(), comment]);
    this.saveComments();
    return comment;
  }

  addReply(commentId: string, content: string): Comment | null {
    const reply: Comment = {
      id: `reply-${Date.now()}`,
      lessonId: 0,
      author: this.currentUser(),
      content,
      createdAt: new Date(),
      likes: 0,
      likedBy: [],
      replies: []
    };

    const updated = this.comments().map(c => {
      if (c.id === commentId) {
        return { ...c, replies: [...c.replies, reply] };
      }
      return c;
    });
    this.comments.set(updated);
    this.saveComments();
    return reply;
  }

  likeComment(commentId: string): void {
    const user = this.currentUser();
    const updated = this.comments().map(c => {
      if (c.id === commentId) {
        const alreadyLiked = c.likedBy.includes(user);
        return {
          ...c,
          likes: alreadyLiked ? c.likes - 1 : c.likes + 1,
          likedBy: alreadyLiked ? c.likedBy.filter(u => u !== user) : [...c.likedBy, user]
        };
      }
      return c;
    });
    this.comments.set(updated);
    this.saveComments();
  }

  setUser(name: string): void {
    this.currentUser.set(name);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.USER_KEY, name);
    }
  }

  private loadComments(): Comment[] {
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

  private loadUser(): string {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.USER_KEY) || 'Anonymous';
    }
    return 'Anonymous';
  }

  private saveComments(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.comments()));
    }
  }
}
