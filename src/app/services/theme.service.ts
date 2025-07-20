import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

export interface Theme {
  // Colores principales
  background: string;
  textColor: string;
  slideBackground: string;
  titleColor: string;
  descriptionColor: string;
  borderColor: string;
  hoverBackground: string;
  shadow: string;
  hoverButton: string;
  toolbarBg: string;
  contentBg: string;
  buttonTheme: string;

  // Nuevas propiedades para el card mejorado
  cardBackground: string;
  cardBorder: string;
  cardShadow: string;
  cardHoverShadow: string;
  imageGlow: string;
  gradientPrimary: string;
  gradientCard: string;
  textGradient: string;
  buttonBackground: string;
  buttonHover: string;
  glowColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly temaOscuro: Theme = {
    // Propiedades existentes
    background: 'var(--music-dark-gray)',
    textColor: 'var(--music-text-white)',
    slideBackground: 'var(--music-card-bg)',
    titleColor: 'var(--music-text-light)',
    descriptionColor: 'var(--music-text-gray)',
    borderColor: 'var(--music-border)',
    hoverBackground: 'var(--music-card-hover-bg)',
    shadow: 'var(--music-shadow-lg)',
    hoverButton: 'var(--music-hover)',
    toolbarBg: 'var(--music-header-bg)',
    contentBg: 'var(--music-black)',
    buttonTheme: 'var(--music-green-dark)',

    // Nuevas propiedades para tema oscuro
    cardBackground: 'var(--music-gradient-card)',
    cardBorder: 'var(--music-border)',
    cardShadow: 'var(--music-shadow-xl)',
    cardHoverShadow: 'var(--music-shadow-xl), 0 0 40px var(--music-green-muted)',
    imageGlow: 'var(--music-green-muted)',
    gradientPrimary: 'var(--music-gradient-green)',
    gradientCard: 'var(--music-gradient-card)',
    textGradient: 'var(--music-gradient-green)',
    buttonBackground: 'var(--music-gradient-button)',
    buttonHover: 'var(--music-green-light)',
    glowColor: 'var(--music-green-muted)'
  };

  private readonly temaClaro: Theme = {
    // Propiedades existentes
    background: 'var(--music-light-bg)',
    textColor: 'var(--music-text-dark-primary)',
    slideBackground: 'var(--music-card-bg-light)',
    titleColor: 'var(--music-text-black)',
    descriptionColor: 'var(--music-text-dark-secondary)',
    borderColor: 'var(--music-border-light-theme)',
    hoverBackground: 'var(--music-card-hover-bg-light)',
    shadow: 'var(--music-shadow-lg-light)',
    hoverButton: 'var(--music-hover-light-theme)',
    toolbarBg: 'var(--music-header-bg-light)',
    contentBg: 'var(--music-white)',
    buttonTheme: 'var(--music-button-secondary-border-light)',

    // Nuevas propiedades para tema claro
    cardBackground: 'var(--music-gradient-light)',
    cardBorder: 'var(--music-border-light-theme)',
    cardShadow: 'var(--music-shadow-xl-light)',
    cardHoverShadow: 'var(--music-shadow-xl-light), 0 0 40px rgba(29, 185, 84, 0.2)',
    imageGlow: 'rgba(29, 185, 84, 0.3)',
    gradientPrimary: 'var(--music-gradient-green)',
    gradientCard: 'var(--music-gradient-light)',
    textGradient: 'var(--music-gradient-green)',
    buttonBackground: 'var(--music-gradient-button)',
    buttonHover: 'var(--music-green-light)',
    glowColor: 'rgba(29, 185, 84, 0.1)'
  };

  private temaActualSubject = new BehaviorSubject<Theme>(this.temaOscuro);
  public temaActual$ = this.temaActualSubject.asObservable();

  get temaActual(): Theme {
    return this.temaActualSubject.value;
  }

  constructor(private storageService: StorageService) {
    this.init();
  }

  private async init(): Promise<void> {
    await this.loadStorageData();
    this.applyThemeToDocument();
  }

  async cambiarTema(): Promise<void> {
    const nuevoTema = this.temaActual === this.temaOscuro ? this.temaClaro : this.temaOscuro;
    this.temaActualSubject.next(nuevoTema);
    await this.storageService.set('theme', JSON.stringify(nuevoTema));
    this.applyThemeToDocument();
  }

  async setTema(tema: 'claro' | 'oscuro'): Promise<void> {
    const nuevoTema = tema === 'oscuro' ? this.temaOscuro : this.temaClaro;
    this.temaActualSubject.next(nuevoTema);
    await this.storageService.set('theme', JSON.stringify(nuevoTema));
    this.applyThemeToDocument();
  }

  get isThemeDark(): boolean {
    return this.temaActual === this.temaOscuro;
  }

  // Nuevo método para aplicar el tema al documento
  private applyThemeToDocument(): void {
    const root = document.documentElement;
    const theme = this.temaActual;

    // Aplicar variables CSS dinámicas
    root.style.setProperty('--current-background', theme.background);
    root.style.setProperty('--current-text-color', theme.textColor);
    root.style.setProperty('--current-card-background', theme.cardBackground);
    root.style.setProperty('--current-card-border', theme.cardBorder);
    root.style.setProperty('--current-card-shadow', theme.cardShadow);
    root.style.setProperty('--current-card-hover-shadow', theme.cardHoverShadow);
    root.style.setProperty('--current-image-glow', theme.imageGlow);
    root.style.setProperty('--current-gradient-primary', theme.gradientPrimary);
    root.style.setProperty('--current-text-gradient', theme.textGradient);
    root.style.setProperty('--current-button-background', theme.buttonBackground);
    root.style.setProperty('--current-button-hover', theme.buttonHover);
    root.style.setProperty('--current-glow-color', theme.glowColor);
    root.style.setProperty('--current-title-color', theme.titleColor);
    root.style.setProperty('--current-description-color', theme.descriptionColor);

    // Agregar clase de tema al body
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(this.isThemeDark ? 'theme-dark' : 'theme-light');
  }

  private async loadStorageData(): Promise<void> {
    try {
      const savedThemeString = await this.storageService.get('theme');
      if (savedThemeString) {
        const savedTheme = JSON.parse(savedThemeString);
        if (this.isValidTheme(savedTheme)) {
          this.temaActualSubject.next(savedTheme);
        }
      }
    } catch (error) {
      console.warn('Error al cargar el tema desde storage:', error);
    }
  }

  private isValidTheme(theme: any): boolean {
    const requiredProperties = [
      'background', 'textColor', 'slideBackground', 'titleColor',
      'descriptionColor', 'borderColor', 'hoverBackground', 'shadow',
      'hoverButton', 'toolbarBg', 'contentBg', 'buttonTheme'
    ];
    return requiredProperties.every(prop => theme && theme[prop]);
  }

  getTemaOscuro(): Theme {
    return this.temaOscuro;
  }

  getTemaClaro(): Theme {
    return this.temaClaro;
  }

  
}
