import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-project',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="project-container">
      <header class="project-header">
        <a routerLink="/" class="back-link">← Back to Home</a>
        <h1>✅ Todo App - Practice Project</h1>
        <p>Learn components, events, and basic state management</p>
        <div class="concepts">
          <span class="concept">Components</span>
          <span class="concept">Events</span>
          <span class="concept">Two-way Binding</span>
          <span class="concept">Signals</span>
        </div>
      </header>

      <div class="app-container">
        <div class="input-section">
          <input
            type="text"
            [(ngModel)]="newTodoText"
            placeholder="Add a new todo..."
            (keyup.enter)="addTodo()"
          />
          <button (click)="addTodo()" [disabled]="!newTodoText.trim()">Add</button>
        </div>

        <div class="filters">
          <button [class.active]="filter() === 'all'" (click)="filter.set('all')">
            All ({{ totalCount() }})
          </button>
          <button [class.active]="filter() === 'active'" (click)="filter.set('active')">
            Active ({{ activeCount() }})
          </button>
          <button [class.active]="filter() === 'completed'" (click)="filter.set('completed')">
            Completed ({{ completedCount() }})
          </button>
        </div>

        <ul class="todo-list">
          @for (todo of filteredTodos(); track todo.id) {
            <li class="todo-item" [class.completed]="todo.completed">
              <input
                type="checkbox"
                [checked]="todo.completed"
                (change)="toggleTodo(todo.id)"
              />
              <span class="todo-text">{{ todo.text }}</span>
              <button class="delete-btn" (click)="deleteTodo(todo.id)">×</button>
            </li>
          } @empty {
            <li class="empty-state">No todos yet. Add one above!</li>
          }
        </ul>

        @if (completedCount() > 0) {
          <button class="clear-btn" (click)="clearCompleted()">
            Clear Completed ({{ completedCount() }})
          </button>
        }
      </div>

      <section class="code-explanation">
        <h2>How This App Works</h2>
        <div class="code-block">
          <h3>1. Todo Component with Signals</h3>
          <pre><code>{{ codeExample1 }}</code></pre>
        </div>
        <div class="code-block">
          <h3>2. Computed Signals for Filtering</h3>
          <pre><code>{{ codeExample2 }}</code></pre>
        </div>
        <div class="code-block">
          <h3>3. Template with &#64;for and &#64;if</h3>
          <pre><code>{{ codeExample3 }}</code></pre>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .project-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 24px;
    }
    .back-link {
      display: inline-block;
      margin-bottom: 16px;
      color: #2196f3;
      text-decoration: none;
    }
    .project-header {
      text-align: center;
      margin-bottom: 40px;
    }
    .project-header h1 {
      margin: 0 0 8px;
      color: #1a1a1a;
    }
    .project-header p {
      color: #666;
      margin: 0 0 16px;
    }
    .concepts {
      display: flex;
      justify-content: center;
      gap: 8px;
    }
    .concept {
      background: #e3f2fd;
      color: #1565c0;
      padding: 6px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
    }
    .app-container {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      padding: 24px;
      margin-bottom: 40px;
    }
    .input-section {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
    }
    .input-section input {
      flex: 1;
      padding: 14px 18px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 16px;
    }
    .input-section input:focus {
      outline: none;
      border-color: #2196f3;
    }
    .input-section button {
      padding: 14px 24px;
      background: #2196f3;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
    }
    .input-section button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    .filters {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
    }
    .filters button {
      flex: 1;
      padding: 10px;
      background: #f5f5f5;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
    }
    .filters button.active {
      background: #2196f3;
      color: white;
    }
    .todo-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .todo-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px;
      border-bottom: 1px solid #eee;
    }
    .todo-item.completed .todo-text {
      text-decoration: line-through;
      color: #999;
    }
    .todo-item input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
    .todo-text {
      flex: 1;
      font-size: 16px;
    }
    .delete-btn {
      width: 32px;
      height: 32px;
      background: #ff5252;
      color: white;
      border: none;
      border-radius: 50%;
      font-size: 20px;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.2s;
    }
    .todo-item:hover .delete-btn {
      opacity: 1;
    }
    .empty-state {
      text-align: center;
      padding: 40px;
      color: #999;
    }
    .clear-btn {
      width: 100%;
      padding: 12px;
      background: transparent;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin-top: 16px;
      cursor: pointer;
      color: #666;
    }
    .clear-btn:hover {
      background: #f5f5f5;
    }
    .code-explanation {
      margin-top: 40px;
    }
    .code-explanation h2 {
      margin-bottom: 24px;
      color: #1a1a1a;
    }
    .code-block {
      background: #1e1e1e;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 24px;
    }
    .code-block h3 {
      margin: 0;
      padding: 16px 20px;
      background: #2d2d2d;
      color: #fff;
      font-size: 14px;
    }
    .code-block pre {
      margin: 0;
      padding: 20px;
      overflow-x: auto;
    }
    .code-block code {
      color: #d4d4d4;
      font-family: 'Consolas', monospace;
      font-size: 14px;
      line-height: 1.6;
    }
  `]
})
export class TodoProjectComponent {
  todos = signal<Todo[]>([
    { id: 1, text: 'Learn Angular Components', completed: true },
    { id: 2, text: 'Master Signal-based State', completed: false },
    { id: 3, text: 'Build Practice Projects', completed: false }
  ]);
  newTodoText = '';
  filter = signal<'all' | 'active' | 'completed'>('all');

  private nextId = 4;

  filteredTodos = computed(() => {
    const f = this.filter();
    const t = this.todos();
    switch (f) {
      case 'active': return t.filter(todo => !todo.completed);
      case 'completed': return t.filter(todo => todo.completed);
      default: return t;
    }
  });

  totalCount = computed(() => this.todos().length);
  activeCount = computed(() => this.todos().filter(t => !t.completed).length);
  completedCount = computed(() => this.todos().filter(t => t.completed).length);

  addTodo(): void {
    if (this.newTodoText.trim()) {
      this.todos.update(todos => [
        ...todos,
        { id: this.nextId++, text: this.newTodoText.trim(), completed: false }
      ]);
      this.newTodoText = '';
    }
  }

  toggleTodo(id: number): void {
    this.todos.update(todos =>
      todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }

  deleteTodo(id: number): void {
    this.todos.update(todos => todos.filter(t => t.id !== id));
  }

  clearCompleted(): void {
    this.todos.update(todos => todos.filter(t => !t.completed));
  }

  codeExample1 = `import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-todo',
  standalone: true,
  template: \`...\`
})
export class TodoComponent {
  // Writable signal for todos
  todos = signal<Todo[]>([]);
  
  // Computed signals for derived state
  totalCount = computed(() => this.todos().length);
  activeCount = computed(() => 
    this.todos().filter(t => !t.completed).length
  );
  
  addTodo(text: string) {
    this.todos.update(todos => [
      ...todos, 
      { id: Date.now(), text, completed: false }
    ]);
  }
}`;

  codeExample2 = `// Filter signal
filter = signal<'all' | 'active' | 'completed'>('all');

// Computed signal for filtered todos
filteredTodos = computed(() => {
  const f = this.filter();
  const t = this.todos();
  
  switch (f) {
    case 'active': return t.filter(todo => !todo.completed);
    case 'completed': return t.filter(todo => todo.completed);
    default: return t;
  }
});`;

  codeExample3 = `<!-- New Todo Input -->
<input
  type="text"
  [(ngModel)]="newTodoText"
  placeholder="Add a new todo..."
  (keyup.enter)="addTodo()"
/>

<!-- Filter Buttons -->
<button [class.active]="filter() === 'all'" 
        (click)="filter.set('all')">
  All ({{ totalCount() }})
</button>

<!-- Todo List with @for -->
@for (todo of filteredTodos(); track todo.id) {
  <li class="todo-item" [class.completed]="todo.completed">
    <input type="checkbox" 
           [checked]="todo.completed"
           (change)="toggleTodo(todo.id)" />
    <span>{{ todo.text }}</span>
    <button (click)="deleteTodo(todo.id)">×</button>
  </li>
} @empty {
  <li>No todos yet!</li>
}`;
}
