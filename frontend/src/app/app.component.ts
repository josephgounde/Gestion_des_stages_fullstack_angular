import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { SessionService } from './core/services/session.service';
import { ProfileImageService } from './core/services/profile-image.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent],
  template: `
    <!-- Layout pour les pages authentifiées -->
    <div *ngIf="!isAuthPage()" class="h-screen flex flex-col">
      <!-- Header fixe -->
      <app-header class="fixed top-0 left-0 right-0 z-30 h-16 bg-white border-b"></app-header>

      <div class="flex flex-1 pt-16 pb-16">
        <!-- Sidebar fixe -->
        <app-sidebar class="fixed left-0 top-16 bottom-16 w-64 bg-white border-r z-20 overflow-y-auto"></app-sidebar>

        <!-- Main content avec défilement -->
        <main class="flex-1 ml-64 overflow-y-auto bg-gray-50">
          <router-outlet></router-outlet>
        </main>
      </div>

      <!-- Footer fixe -->
      <app-footer class="fixed bottom-0 left-0 right-0 z-30 h-16 bg-white border-t"></app-footer>
    </div>

    <!-- Layout pour les pages de connexion/inscription -->
    <div *ngIf="isAuthPage()" class="min-h-screen bg-gray-50">
      <!-- Nom de l'application en haut -->
      <div class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-center items-center py-4">
            <span class="text-2xl font-bold text-indigo-600">Gestion Des Stages</span>
          </div>
        </div>
      </div>
      
      <!-- Contenu de la page de connexion -->
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(
    public router: Router,
    private sessionService: SessionService,
    private profileImageService: ProfileImageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log('=== INITIALISATION APP ===');
    console.log('URL actuelle:', this.router.url);
    
    // Vérification de session uniquement pour information, sans redirection
    if (!this.isAuthPage()) {
      console.log('Vérification de session existante...');
      this.sessionService.checkExistingSession().subscribe({
        next: (hasSession) => {
          console.log('Résultat vérification session:', hasSession);
          if (!hasSession) {
            console.log('Aucune session trouvée, redirection vers login');
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          console.error('Erreur vérification session:', err);
        }
      });
    } else {
      console.log('Page d\'authentification, pas de vérification de session');
    }

    // Normalize stored avatar URL if present (some older stored values may be bare filenames)
    try {
      const curr = this.authService.currentUser;
      if (curr && curr.avatarUrl && !curr.avatarUrl.startsWith('http') && !curr.avatarUrl.startsWith('/files/')) {
        console.log('Normalizing stored avatarUrl for current user:', curr.avatarUrl);
        try {
          curr.avatarUrl = this.profileImageService.buildImageUrl(curr.avatarUrl);
          this.authService.currentUser = curr;
        } catch (e) {
          console.warn('Erreur lors de la normalisation de avatarUrl:', e);
        }
      }
    } catch (e) {
      console.warn('Erreur accès currentUser lors de l init:', e);
    }

    // Also normalize legacy 'currentUser' key in localStorage if present
    try {
      const raw = localStorage.getItem('currentUser');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.avatarUrl && typeof parsed.avatarUrl === 'string' && !parsed.avatarUrl.startsWith('http') && !parsed.avatarUrl.startsWith('/files/')) {
          try {
            parsed.avatarUrl = this.profileImageService.buildImageUrl(parsed.avatarUrl);
            localStorage.setItem('currentUser', JSON.stringify(parsed));
            console.log('Normalized legacy localStorage.currentUser avatarUrl');
            // if auth service is empty, update it for consistency
            if (!this.authService.currentUser) {
              this.authService.currentUser = parsed;
            }
          } catch (e) {
            console.warn('Erreur lors de la normalisation localStorage.currentUser:', e);
          }
        }
      }
    } catch (e) {
      console.warn('Erreur lecture localStorage.currentUser:', e);
    }

    // Trigger a load from the server to refresh the profile image subject (if logged in)
    try {
      this.profileImageService.loadProfileImage().subscribe({ next: () => {}, error: () => {} });
    } catch (e) {
      console.warn('Erreur lors du chargement initial de la photo de profil:', e);
    }
  }

  isAuthPage(): boolean {
    const url = this.router.url;
    return url === '/login' || url === '/register' || url.startsWith('/login?') || url.startsWith('/register?');
  }
}
