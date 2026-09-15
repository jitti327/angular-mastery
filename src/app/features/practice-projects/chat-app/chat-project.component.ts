import { Component, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Message {
  id: number;
  user: string;
  text: string;
  timestamp: Date;
  isSystem?: boolean;
}

@Component({
  selector: 'app-chat-project',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="project-container">
      <header class="project-header">
        <a routerLink="/" class="back-link">← Back to Home</a>
        <h1>💬 Real-time Chat - Practice Project</h1>
        <p>Learn Signals, Effects, and Advanced Patterns</p>
        <div class="concepts">
          <span class="concept">Signals</span>
          <span class="concept">Effects</span>
          <span class="concept">Computed</span>
          <span class="concept">State Management</span>
        </div>
      </header>

      <div class="app-container">
        <div class="chat-layout">
          <aside class="chat-sidebar">
            <h3>Online Users ({{ onlineUsers().length }})</h3>
            <ul class="user-list">
              @for (user of onlineUsers(); track user) {
                <li class="user-item">
                  <span class="user-avatar">{{ user.charAt(0).toUpperCase() }}</span>
                  <span class="user-name">{{ user }}</span>
                  <span class="online-dot"></span>
                </li>
              }
            </ul>

            <div class="room-info">
              <h4>Chat Room</h4>
              <p>{{ currentRoom() }}</p>
              <p class="member-count">{{ onlineUsers().length }} members online</p>
            </div>
          </aside>

          <main class="chat-main">
            <div class="messages-container" #messagesContainer>
              @for (message of messages(); track message.id) {
                <div class="message" [class.system]="message.isSystem" [class.own]="message.user === currentUser()">
                  @if (message.isSystem) {
                    <div class="system-message">{{ message.text }}</div>
                  } @else {
                    <div class="message-avatar">{{ message.user.charAt(0).toUpperCase() }}</div>
                    <div class="message-content">
                      <div class="message-header">
                        <span class="message-user">{{ message.user }}</span>
                        <span class="message-time">{{ formatTime(message.timestamp) }}</span>
                      </div>
                      <div class="message-text">{{ message.text }}</div>
                    </div>
                  }
                </div>
              }
            </div>

            <div class="message-input">
              <input
                type="text"
                [(ngModel)]="newMessage"
                placeholder="Type a message..."
                (keyup.enter)="sendMessage()"
              />
              <button (click)="sendMessage()" [disabled]="!newMessage.trim()">Send</button>
            </div>
          </main>
        </div>

        <section class="code-explanation">
          <h2>How This App Works</h2>
          <div class="code-block">
            <h3>1. Signal-based State Management</h3>
            <pre><code>{{ codeExample1 }}</code></pre>
          </div>
          <div class="code-block">
            <h3>2. Effects for Side Effects</h3>
            <pre><code>{{ codeExample2 }}</code></pre>
          </div>
          <div class="code-block">
            <h3>3. Computed Signals for Derived State</h3>
            <pre><code>{{ codeExample3 }}</code></pre>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .project-container { max-width: 1200px; margin: 0 auto; padding: 24px; }
    .back-link { display: inline-block; margin-bottom: 16px; color: #2196f3; text-decoration: none; }
    .project-header { text-align: center; margin-bottom: 40px; }
    .project-header h1 { margin: 0 0 8px; color: #1a1a1a; }
    .project-header p { color: #666; margin: 0 0 16px; }
    .concepts { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; }
    .concept { background: #e3f2fd; color: #1565c0; padding: 6px 12px; border-radius: 16px; font-size: 12px; font-weight: 600; }
    .app-container { background: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden; margin-bottom: 40px; }
    .chat-layout { display: flex; height: 500px; }
    .chat-sidebar {
      width: 250px; background: #1a1a2e; color: white; padding: 20px;
      display: flex; flex-direction: column;
    }
    .chat-sidebar h3 { margin: 0 0 16px; font-size: 16px; }
    .user-list { list-style: none; padding: 0; margin: 0; flex: 1; }
    .user-item { display: flex; align-items: center; gap: 12px; padding: 10px 0; }
    .user-avatar {
      width: 36px; height: 36px; background: #4fc3f7; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-weight: 600; font-size: 14px;
    }
    .user-name { flex: 1; }
    .online-dot { width: 10px; height: 10px; background: #4caf50; border-radius: 50%; }
    .room-info { margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); }
    .room-info h4 { margin: 0 0 8px; font-size: 14px; opacity: 0.7; }
    .room-info p { margin: 0; font-size: 16px; }
    .member-count { font-size: 12px; opacity: 0.6; margin-top: 4px !important; }
    .chat-main { flex: 1; display: flex; flex-direction: column; }
    .messages-container {
      flex: 1; overflow-y: auto; padding: 20px; background: #f5f5f5;
    }
    .message { display: flex; gap: 12px; margin-bottom: 16px; }
    .message.own { flex-direction: row-reverse; }
    .message.system { justify-content: center; }
    .system-message {
      background: #e3f2fd; color: #1565c0; padding: 8px 16px;
      border-radius: 20px; font-size: 14px;
    }
    .message-avatar {
      width: 40px; height: 40px; background: #667eea; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      color: white; font-weight: 600; flex-shrink: 0;
    }
    .message.own .message-avatar { background: #4caf50; }
    .message-content {
      background: white; padding: 12px 16px; border-radius: 12px;
      max-width: 70%; box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }
    .message.own .message-content { background: #dcf8c6; }
    .message-header { display: flex; justify-content: space-between; gap: 16px; margin-bottom: 4px; }
    .message-user { font-weight: 600; color: #333; font-size: 14px; }
    .message-time { font-size: 12px; color: #999; }
    .message-text { color: #333; line-height: 1.4; }
    .message-input {
      display: flex; gap: 12px; padding: 16px; background: white;
      border-top: 1px solid #eee;
    }
    .message-input input {
      flex: 1; padding: 12px 16px; border: 1px solid #ddd; border-radius: 24px;
      font-size: 14px;
    }
    .message-input input:focus { outline: none; border-color: #2196f3; }
    .message-input button {
      padding: 12px 24px; background: #2196f3; color: white; border: none;
      border-radius: 24px; font-weight: 600; cursor: pointer;
    }
    .message-input button:disabled { background: #ccc; }
    .code-explanation { margin-top: 40px; }
    .code-explanation h2 { margin-bottom: 24px; color: #1a1a1a; }
    .code-block { background: #1e1e1e; border-radius: 12px; overflow: hidden; margin-bottom: 24px; }
    .code-block h3 { margin: 0; padding: 16px 20px; background: #2d2d2d; color: #fff; font-size: 14px; }
    .code-block pre { margin: 0; padding: 20px; overflow-x: auto; }
    .code-block code { color: #d4d4d4; font-family: 'Consolas', monospace; font-size: 14px; line-height: 1.6; }
  `]
})
export class ChatProjectComponent {
  currentUser = signal('You');
  currentRoom = signal('Angular Learning');
  onlineUsers = signal(['Alice', 'Bob', 'Charlie', 'You']);
  messages = signal<Message[]>([
    { id: 1, user: 'Alice', text: 'Hey everyone! How\'s the Angular learning going?', timestamp: new Date(Date.now() - 300000) },
    { id: 2, user: 'Bob', text: 'Great! Just learned about Signals. They\'re amazing!', timestamp: new Date(Date.now() - 240000) },
    { id: 3, user: 'Charlie', text: 'I\'m working on the practice projects. The todo app was fun!', timestamp: new Date(Date.now() - 180000) },
    { id: 4, user: 'Alice', text: 'Has anyone tried the new Signal Forms in Angular 22?', timestamp: new Date(Date.now() - 120000) },
    { id: 5, user: 'system', text: 'You joined the chat', timestamp: new Date(), isSystem: true },
  ]);
  newMessage = '';

  messageCount = computed(() => this.messages().length);

  constructor() {
    effect(() => {
      console.log(`Chat has ${this.messageCount()} messages`);
    });
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.update(msgs => [
        ...msgs,
        {
          id: msgs.length + 1,
          user: this.currentUser(),
          text: this.newMessage.trim(),
          timestamp: new Date()
        }
      ]);
      this.newMessage = '';
    }
  }

  codeExample1 = `@Component({...})
export class ChatComponent {
  // Writable signals for state
  currentUser = signal('You');
  currentRoom = signal('Angular Learning');
  messages = signal<Message[]>([]);
  onlineUsers = signal<string[]>([]);
  
  sendMessage(text: string) {
    this.messages.update(msgs => [
      ...msgs,
      {
        id: msgs.length + 1,
        user: this.currentUser(),
        text,
        timestamp: new Date()
      }
    ]);
  }
}`;

  codeExample2 = `constructor() {
  // Effect runs when signals change
  effect(() => {
    const count = this.messageCount();
    console.log(\`Chat has \${count} messages\`);
    
    // Could send analytics, update title, etc.
    document.title = \`Chat (\${count})\`;
  });
  
  // Cleanup function
  effect((onCleanup) => {
    const subscription = someObservable.subscribe();
    onCleanup(() => subscription.unsubscribe());
  });
}`;

  codeExample3 = `// Computed signals for derived state
messageCount = computed(() => this.messages().length);

lastMessage = computed(() => {
  const msgs = this.messages();
  return msgs[msgs.length - 1];
});

unreadCount = computed(() => 
  this.messages().filter(m => !m.read).length
);

sortedMessages = computed(() =>
  [...this.messages()].sort((a, b) => 
    a.timestamp.getTime() - b.timestamp.getTime()
  )
);`;
}
