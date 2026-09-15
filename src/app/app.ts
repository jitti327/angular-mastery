import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SearchModalComponent } from './shared/components/search-modal/search-modal.component';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, SearchModalComponent],
  template: `
    <div class="app-layout" [attr.data-theme]="themeService.theme()">
      <app-sidebar />
      <div class="main-area">
        <app-header />
        <main class="main-content">
          <router-outlet />
        </main>
      </div>
      <app-search-modal />
    </div>
  `,
  styles: [`
    .app-layout {
      display: flex;
      min-height: 100vh;
    }
    .main-area {
      flex: 1;
      margin-left: 260px;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      transition: margin-left 0.3s;
    }
    .main-content {
      flex: 1;
      background: var(--bg-primary);
    }

    @media (max-width: 1024px) {
      .main-area {
        margin-left: 0;
      }
    }
  `]
})
export class AppComponent {
  themeService = inject(ThemeService);
  title = 'Angular Mastery';
}
