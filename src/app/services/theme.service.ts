// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { StorageService } from './storage.service';

// export interface Theme {
//   // Colores principales
//   background: string;
//   textColor: string;
//   slideBackground: string;
//   titleColor: string;
//   descriptionColor: string;
//   borderColor: string;
//   hoverBackground: string;
//   shadow: string;
//   hoverButton: string;
//   toolbarBg: string;
//   contentBg: string;
//   buttonTheme: string;

//   // Nuevas propiedades para el card mejorado
//   cardBackground: string;
//   cardBorder: string;
//   cardShadow: string;
//   cardHoverShadow: string;
//   imageGlow: string;
//   gradientPrimary: string;
//   gradientCard: string;
//   textGradient: string;
//   buttonBackground: string;
//   buttonHover: string;
//   glowColor: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class ThemeService {
//   private readonly temaOscuro: Theme = {
//     // Propiedades existentes
//     background: 'var(--music-dark-gray)',
//     textColor: 'var(--music-text-white)',
//     slideBackground: 'var(--music-card-bg)',
//     titleColor: 'var(--music-text-light)',
//     descriptionColor: 'var(--music-text-gray)',
//     borderColor: 'var(--music-border)',
//     hoverBackground: 'var(--music-card-hover-bg)',
//     shadow: 'var(--music-shadow-lg)',
//     hoverButton: 'var(--music-hover)',
//     toolbarBg: 'var(--music-header-bg)',
//     contentBg: 'var(--music-black)',
//     buttonTheme: 'var(--music-green-dark)',

//     // Nuevas propiedades para tema oscuro
//     cardBackground: 'var(--music-gradient-card)',
//     cardBorder: 'var(--music-border)',
//     cardShadow: 'var(--music-shadow-xl)',
//     cardHoverShadow: 'var(--music-shadow-xl), 0 0 40px var(--music-green-muted)',
//     imageGlow: 'var(--music-green-muted)',
//     gradientPrimary: 'var(--music-gradient-green)',
//     gradientCard: 'var(--music-gradient-card)',
//     textGradient: 'var(--music-gradient-green)',
//     buttonBackground: 'var(--music-gradient-button)',
//     buttonHover: 'var(--music-green-light)',
//     glowColor: 'var(--music-green-muted)'
//   };

//   private readonly temaClaro: Theme = {
//     // Propiedades existentes
//     background: 'var(--music-light-bg)',
//     textColor: 'var(--music-text-dark-primary)',
//     slideBackground: 'var(--music-card-bg-light)',
//     titleColor: 'var(--music-text-black)',
//     descriptionColor: 'var(--music-text-dark-secondary)',
//     borderColor: 'var(--music-border-light-theme)',
//     hoverBackground: 'var(--music-card-hover-bg-light)',
//     shadow: 'var(--music-shadow-lg-light)',
//     hoverButton: 'var(--music-hover-light-theme)',
//     toolbarBg: 'var(--music-header-bg-light)',
//     contentBg: 'var(--music-white)',
//     buttonTheme: 'var(--music-button-secondary-border-light)',

//     // Nuevas propiedades para tema claro
//     cardBackground: 'var(--music-gradient-light)',
//     cardBorder: 'var(--music-border-light-theme)',
//     cardShadow: 'var(--music-shadow-xl-light)',
//     cardHoverShadow: 'var(--music-shadow-xl-light), 0 0 40px rgba(29, 185, 84, 0.2)',
//     imageGlow: 'rgba(29, 185, 84, 0.3)',
//     gradientPrimary: 'var(--music-gradient-green)',
//     gradientCard: 'var(--music-gradient-light)',
//     textGradient: 'var(--music-gradient-green)',
//     buttonBackground: 'var(--music-gradient-button)',
//     buttonHover: 'var(--music-green-light)',
//     glowColor: 'rgba(29, 185, 84, 0.1)'
//   };

//   private temaActualSubject = new BehaviorSubject<Theme>(this.temaOscuro);
//   public temaActual$ = this.temaActualSubject.asObservable();

//   get temaActual(): Theme {
//     return this.temaActualSubject.value;
//   }

//   constructor(private storageService: StorageService) {
//     this.init();
//   }

//   private async init(): Promise<void> {
//     await this.loadStorageData();
//     this.applyThemeToDocument();
//   }

//   async cambiarTema(): Promise<void> {
//     const nuevoTema = this.temaActual === this.temaOscuro ? this.temaClaro : this.temaOscuro;
//     this.temaActualSubject.next(nuevoTema);
//     await this.storageService.set('theme', JSON.stringify(nuevoTema));
//     this.applyThemeToDocument();
//   }

//   async setTema(tema: 'claro' | 'oscuro'): Promise<void> {
//     const nuevoTema = tema === 'oscuro' ? this.temaOscuro : this.temaClaro;
//     this.temaActualSubject.next(nuevoTema);
//     await this.storageService.set('theme', JSON.stringify(nuevoTema));
//     this.applyThemeToDocument();
//   }

//   get isThemeDark(): boolean {
//     return this.temaActual === this.temaOscuro;
//   }

//   // Nuevo método para aplicar el tema al documento
//   private applyThemeToDocument(): void {
//     const root = document.documentElement;
//     const theme = this.temaActual;

//     // Aplicar variables CSS dinámicas
//     root.style.setProperty('--current-background', theme.background);
//     root.style.setProperty('--current-text-color', theme.textColor);
//     root.style.setProperty('--current-card-background', theme.cardBackground);
//     root.style.setProperty('--current-card-border', theme.cardBorder);
//     root.style.setProperty('--current-card-shadow', theme.cardShadow);
//     root.style.setProperty('--current-card-hover-shadow', theme.cardHoverShadow);
//     root.style.setProperty('--current-image-glow', theme.imageGlow);
//     root.style.setProperty('--current-gradient-primary', theme.gradientPrimary);
//     root.style.setProperty('--current-text-gradient', theme.textGradient);
//     root.style.setProperty('--current-button-background', theme.buttonBackground);
//     root.style.setProperty('--current-button-hover', theme.buttonHover);
//     root.style.setProperty('--current-glow-color', theme.glowColor);
//     root.style.setProperty('--current-title-color', theme.titleColor);
//     root.style.setProperty('--current-description-color', theme.descriptionColor);

//     // Agregar clase de tema al body
//     document.body.classList.remove('theme-dark', 'theme-light');
//     document.body.classList.add(this.isThemeDark ? 'theme-dark' : 'theme-light');
//   }

//   private async loadStorageData(): Promise<void> {
//     try {
//       const savedThemeString = await this.storageService.get('theme');
//       if (savedThemeString) {
//         const savedTheme = JSON.parse(savedThemeString);
//         if (this.isValidTheme(savedTheme)) {
//           this.temaActualSubject.next(savedTheme);
//         }
//       }
//     } catch (error) {
//       console.warn('Error al cargar el tema desde storage:', error);
//     }
//   }

//   private isValidTheme(theme: any): boolean {
//     const requiredProperties = [
//       'background', 'textColor', 'slideBackground', 'titleColor',
//       'descriptionColor', 'borderColor', 'hoverBackground', 'shadow',
//       'hoverButton', 'toolbarBg', 'contentBg', 'buttonTheme'
//     ];
//     return requiredProperties.every(prop => theme && theme[prop]);
//   }

//   getTemaOscuro(): Theme {
//     return this.temaOscuro;
//   }

//   getTemaClaro(): Theme {
//     return this.temaClaro;
//   }


// }



import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { StorageService } from "./storage.service"

export interface Theme {
  // Colores principales
  musicGreen: string
  musicGreenLight: string
  musicGreenDark: string
  musicGreenBright: string
  musicGreenMuted: string

  // Colores de fondo
  musicBlack: string
  musicDarkGray: string
  musicMediumGray: string
  musicLightGray: string
  musicCardGray: string
  musicElevatedGray: string
  musicWhite: string
  musicLightBg: string
  musicLightCard: string
  musicLightElevated: string

  // Colores de texto
  musicTextWhite: string
  musicTextLight: string
  musicTextGray: string
  musicTextDark: string
  musicTextMuted: string
  musicTextSubtle: string
  musicTextBlack: string
  musicTextDarkPrimary: string
  musicTextDarkSecondary: string
  musicTextDarkMuted: string
  musicTextDarkSubtle: string

  // Colores de estado
  musicError: string
  musicErrorLight: string
  musicErrorDark: string
  musicWarning: string
  musicWarningLight: string
  musicWarningDark: string
  musicSuccess: string
  musicSuccessLight: string
  musicSuccessDark: string
  musicInfo: string
  musicInfoLight: string
  musicInfoDark: string

  // Colores de interacción
  musicHover: string
  musicHoverLight: string
  musicHoverSubtle: string
  musicActive: string
  musicFocus: string
  musicSelected: string
  musicDisabled: string
  musicHoverLightTheme: string
  musicHoverLightThemeIntense: string
  musicHoverLightThemeSubtle: string
  musicActiveLightTheme: string
  musicFocusLightTheme: string
  musicSelectedLightTheme: string
  musicDisabledLightTheme: string

  // Colores de borde
  musicBorder: string
  musicBorderLight: string
  musicBorderDark: string
  musicBorderSubtle: string
  musicBorderLightTheme: string
  musicBorderLightThemeDark: string
  musicBorderLightThemeSubtle: string

  // Colores de overlay
  musicOverlay: string
  musicOverlayLight: string
  musicOverlayDark: string
  musicOverlayWhite: string
  musicOverlayModal: string
  musicOverlayTooltip: string

  // Gradientes
  musicGradientGreen: string
  musicGradientGreenVertical: string
  musicGradientDark: string
  musicGradientLight: string
  musicGradientOverlay: string
  musicGradientOverlayLight: string
  musicGradientCard: string
  musicGradientButton: string

  // Sombras
  musicShadowXs: string
  musicShadowSm: string
  musicShadowMd: string
  musicShadowLg: string
  musicShadowXl: string
  musicShadowInner: string
  musicShadowFocus: string
  musicShadowXsLight: string
  musicShadowSmLight: string
  musicShadowMdLight: string
  musicShadowLgLight: string
  musicShadowXlLight: string
  musicShadowInnerLight: string
  musicShadowFocusLight: string

  // Colores adicionales
  musicPurple: string
  musicPurpleLight: string
  musicPurpleDark: string
  musicOrange: string
  musicOrangeLight: string
  musicOrangeDark: string
  musicBlue: string
  musicBlueLight: string
  musicBlueDark: string
  musicYellow: string
  musicPink: string
  musicPinkLight: string
  musicPinkDark: string
  musicRed: string
  musicTeal: string
  musicIndigo: string

  // Transparencias
  musicAlpha5: string
  musicAlpha10: string
  musicAlpha15: string
  musicAlpha20: string
  musicAlpha25: string
  musicAlpha30: string
  musicAlpha40: string
  musicAlpha50: string
  musicAlpha60: string
  musicAlpha70: string
  musicAlphaBlack5: string
  musicAlphaBlack10: string
  musicAlphaBlack15: string
  musicAlphaBlack20: string
  musicAlphaBlack25: string
  musicAlphaBlack30: string
  musicAlphaBlack40: string
  musicAlphaBlack50: string
  musicAlphaBlack60: string
  musicAlphaBlack70: string

  // Variables de transición
  musicTransitionFast: string
  musicTransitionNormal: string
  musicTransitionSlow: string
  musicTransitionSlower: string
  musicTransitionCubic: string
  musicTransitionSpring: string
  musicTransitionBounce: string

  // Variables de espaciado
  musicSpacingXs: string
  musicSpacingSm: string
  musicSpacingMd: string
  musicSpacingLg: string
  musicSpacingXl: string
  musicSpacingXxl: string
  musicSpacingXxxl: string
  musicSpacingXxxxl: string

  // Variables de border radius
  musicRadiusXs: string
  musicRadiusSm: string
  musicRadiusMd: string
  musicRadiusLg: string
  musicRadiusXl: string
  musicRadiusXxl: string
  musicRadiusFull: string
  musicRadiusPill: string

  // Variables de typography
  musicFontWeightThin: string
  musicFontWeightLight: string
  musicFontWeightNormal: string
  musicFontWeightMedium: string
  musicFontWeightSemibold: string
  musicFontWeightBold: string
  musicFontWeightExtrabold: string
  musicFontWeightBlack: string

  // Variables de font size
  musicTextXs: string
  musicTextSm: string
  musicTextBase: string
  musicTextLg: string
  musicTextXl: string
  musicText2xl: string
  musicText3xl: string
  musicText4xl: string
  musicText5xl: string

  // Variables de line height
  musicLeadingNone: string
  musicLeadingTight: string
  musicLeadingSnug: string
  musicLeadingNormal: string
  musicLeadingRelaxed: string
  musicLeadingLoose: string

  // Variables de z-index
  musicZHide: string
  musicZBase: string
  musicZDocked: string
  musicZDropdown: string
  musicZSticky: string
  musicZBanner: string
  musicZOverlay: string
  musicZModal: string
  musicZPopover: string
  musicZSkiplink: string
  musicZTooltip: string
  musicZNotification: string

  // Variables de layout - Sidebar
  musicSidebarWidth: string
  musicSidebarCollapsedWidth: string
  musicSidebarMobileWidth: string
  musicSidebarBg: string
  musicSidebarBorder: string
  musicSidebarBgLight: string
  musicSidebarBorderLight: string

  // Variables de layout - Header
  musicHeaderHeight: string
  musicHeaderHeightMobile: string
  musicHeaderBg: string
  musicHeaderBorder: string
  musicHeaderBgLight: string
  musicHeaderBorderLight: string

  // Variables de layout - Player
  musicPlayerHeight: string
  musicPlayerHeightMobile: string
  musicPlayerBg: string
  musicPlayerBorder: string
  musicPlayerBgLight: string
  musicPlayerBorderLight: string

  // Variables de componentes - Cards
  musicCardBg: string
  musicCardHoverBg: string
  musicCardRadius: string
  musicCardShadow: string
  musicCardBgLight: string
  musicCardHoverBgLight: string
  musicCardShadowLight: string

  // Variables de componentes - Buttons
  musicButtonHeightSm: string
  musicButtonHeightMd: string
  musicButtonHeightLg: string
  musicButtonPrimaryBg: string
  musicButtonPrimaryHover: string
  musicButtonPrimaryActive: string
  musicButtonPrimaryText: string
  musicButtonSecondaryBg: string
  musicButtonSecondaryBorder: string
  musicButtonSecondaryHover: string
  musicButtonSecondaryText: string
  musicButtonSecondaryBgLight: string
  musicButtonSecondaryBorderLight: string
  musicButtonSecondaryHoverLight: string
  musicButtonSecondaryTextLight: string

  // Variables de componentes - Inputs
  musicInputHeightSm: string
  musicInputHeightMd: string
  musicInputHeightLg: string
  musicInputBg: string
  musicInputBorder: string
  musicInputFocusBorder: string
  musicInputPlaceholder: string
  musicInputText: string
  musicInputBgLight: string
  musicInputBorderLight: string
  musicInputPlaceholderLight: string
  musicInputTextLight: string

  // Variables de componentes - Scrollbar
  musicScrollbarWidth: string
  musicScrollbarWidthThin: string
  musicScrollbarTrack: string
  musicScrollbarThumb: string
  musicScrollbarThumbHover: string
  musicScrollbarTrackLight: string
  musicScrollbarThumbLight: string
  musicScrollbarThumbHoverLight: string

  // Variables de breakpoints
  musicBreakpointSm: string
  musicBreakpointMd: string
  musicBreakpointLg: string
  musicBreakpointXl: string
  musicBreakpoint2xl: string

  // Variables de animaciones
  musicAnimationSpin: string
  musicAnimationPing: string
  musicAnimationPulse: string
  musicAnimationBounce: string

  // Variables de backdrop filter
  musicBackdropBlurSm: string
  musicBackdropBlurMd: string
  musicBackdropBlurLg: string
  musicBackdropBlurXl: string

  // Variables --current-* que se usan en las clases CSS
  currentBgPrimary: string
  currentBgSecondary: string
  currentBgCard: string
  currentBgElevated: string
  currentTextPrimary: string
  currentTextSecondary: string
  currentTextMuted: string
  currentTextSubtle: string
  currentBorder: string
  currentBorderSubtle: string
  currentHover: string
  currentHoverIntense: string
  currentActive: string
  currentShadow: string
  currentShadowLg: string
  currentSidebarBg: string
  currentHeaderBg: string
  currentPlayerBg: string
  currentScrollbarTrack: string
  currentScrollbarThumb: string
  currentInputBg: string
  currentInputText: string
  currentInputPlaceholder: string

  // Nuevas propiedades para el card mejorado
  background: string // Alias para currentBgPrimary
  textColor: string // Alias para currentTextPrimary
  slideBackground: string // Alias para currentBgCard o musicCardGray
  titleColor: string // Alias para currentTextPrimary o musicTextLight
  descriptionColor: string // Alias para currentTextSecondary o musicTextGray
  borderColor: string // Alias para currentBorder
  hoverBackground: string // Alias para currentHover o musicCardHoverBg
  shadow: string // Alias para currentShadow
  hoverButton: string // Alias para currentHover
  toolbarBg: string // Alias para currentHeaderBg
  contentBg: string // Alias para currentBgPrimary o musicBlack/musicWhite
  buttonTheme: string // Alias para musicButtonPrimaryActive o musicButtonSecondaryBorderLight

  cardBackground: string
  cardBorder: string
  cardShadow: string
  cardHoverShadow: string
  imageGlow: string
  gradientPrimary: string
  gradientCard: string
  textGradient: string
  buttonBackground: string
  buttonHover: string
  glowColor: string
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly temaOscuro: Theme = {
    // Colores principales
    musicGreen: "#1DB954",
    musicGreenLight: "#1ED760",
    musicGreenDark: "#169C46",
    musicGreenBright: "#1FDF64",
    musicGreenMuted: "rgba(29, 185, 84, 0.8)",

    // Colores de fondo
    musicBlack: "#000000",
    musicDarkGray: "#121212",
    musicMediumGray: "#1A1A1A",
    musicLightGray: "#242424",
    musicCardGray: "#181818",
    musicElevatedGray: "#282828",
    musicWhite: "#FFFFFF",
    musicLightBg: "#FAFAFA",
    musicLightCard: "#F7F7F7",
    musicLightElevated: "#FFFFFF",

    // Colores de texto
    musicTextWhite: "#FFFFFF",
    musicTextLight: "#F7F7F7",
    musicTextGray: "#B3B3B3",
    musicTextDark: "#A7A7A7",
    musicTextMuted: "#727272",
    musicTextSubtle: "#535353",
    musicTextBlack: "#000000",
    musicTextDarkPrimary: "#121212",
    musicTextDarkSecondary: "#6A6A6A",
    musicTextDarkMuted: "#8E8E8E",
    musicTextDarkSubtle: "#ADADAD",

    // Colores de estado
    musicError: "#E22134",
    musicErrorLight: "#F87171",
    musicErrorDark: "#B91C3C",
    musicWarning: "#F59E0B",
    musicWarningLight: "#FCD34D",
    musicWarningDark: "#D97706",
    musicSuccess: "#1DB954",
    musicSuccessLight: "#22C55E",
    musicSuccessDark: "#16A34A",
    musicInfo: "#3B82F6",
    musicInfoLight: "#60A5FA",
    musicInfoDark: "#2563EB",

    // Colores de interacción
    musicHover: "rgba(255, 255, 255, 0.1)",
    musicHoverLight: "rgba(255, 255, 255, 0.2)",
    musicHoverSubtle: "rgba(255, 255, 255, 0.05)",
    musicActive: "rgba(255, 255, 255, 0.3)",
    musicFocus: "rgba(29, 185, 84, 0.4)",
    musicSelected: "rgba(29, 185, 84, 0.15)",
    musicDisabled: "rgba(255, 255, 255, 0.3)",
    musicHoverLightTheme: "rgba(0, 0, 0, 0.04)",
    musicHoverLightThemeIntense: "rgba(0, 0, 0, 0.08)",
    musicHoverLightThemeSubtle: "rgba(0, 0, 0, 0.02)",
    musicActiveLightTheme: "rgba(0, 0, 0, 0.12)",
    musicFocusLightTheme: "rgba(29, 185, 84, 0.3)",
    musicSelectedLightTheme: "rgba(29, 185, 84, 0.08)",
    musicDisabledLightTheme: "rgba(0, 0, 0, 0.26)",

    // Colores de borde
    musicBorder: "#292929",
    musicBorderLight: "#3E3E3E",
    musicBorderDark: "#1A1A1A",
    musicBorderSubtle: "#1F1F1F",
    musicBorderLightTheme: "#E5E7EB",
    musicBorderLightThemeDark: "#D1D5DB",
    musicBorderLightThemeSubtle: "#F3F4F6",

    // Colores de overlay
    musicOverlay: "rgba(0, 0, 0, 0.5)",
    musicOverlayLight: "rgba(0, 0, 0, 0.25)",
    musicOverlayDark: "rgba(0, 0, 0, 0.75)",
    musicOverlayWhite: "rgba(255, 255, 255, 0.9)",
    musicOverlayModal: "rgba(0, 0, 0, 0.6)",
    musicOverlayTooltip: "rgba(0, 0, 0, 0.8)",

    // Gradientes
    musicGradientGreen: "linear-gradient(135deg, #1DB954 0%, #1ED760 100%)",
    musicGradientGreenVertical: "linear-gradient(180deg, #1DB954 0%, #169C46 100%)",
    musicGradientDark: "linear-gradient(135deg, #121212 0%, #1A1A1A 100%)",
    musicGradientLight: "linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)",
    musicGradientOverlay: "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%)",
    musicGradientOverlayLight: "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.4) 100%)",
    musicGradientCard: "linear-gradient(145deg, #181818 0%, #1F1F1F 100%)",
    musicGradientButton: "linear-gradient(135deg, #1DB954 0%, #1ED760 100%)",

    // Sombras
    musicShadowXs: "0 1px 2px rgba(0, 0, 0, 0.2)",
    musicShadowSm: "0 2px 4px rgba(0, 0, 0, 0.3)",
    musicShadowMd: "0 4px 12px rgba(0, 0, 0, 0.4)",
    musicShadowLg: "0 8px 24px rgba(0, 0, 0, 0.5)",
    musicShadowXl: "0 16px 48px rgba(0, 0, 0, 0.6)",
    musicShadowInner: "inset 0 2px 4px rgba(0, 0, 0, 0.3)",
    musicShadowFocus: "0 0 0 3px rgba(29, 185, 84, 0.4)",
    musicShadowXsLight: "0 1px 2px rgba(0, 0, 0, 0.05)",
    musicShadowSmLight: "0 2px 4px rgba(0, 0, 0, 0.08)",
    musicShadowMdLight: "0 4px 12px rgba(0, 0, 0, 0.12)",
    musicShadowLgLight: "0 8px 24px rgba(0, 0, 0, 0.16)",
    musicShadowXlLight: "0 16px 48px rgba(0, 0, 0, 0.20)",
    musicShadowInnerLight: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
    musicShadowFocusLight: "0 0 0 3px rgba(29, 185, 84, 0.3)",

    // Colores adicionales
    musicPurple: "#8B5CF6",
    musicPurpleLight: "#A78BFA",
    musicPurpleDark: "#7C3AED",
    musicOrange: "#F59E0B",
    musicOrangeLight: "#FCD34D",
    musicOrangeDark: "#D97706",
    musicBlue: "#3B82F6",
    musicBlueLight: "#60A5FA",
    musicBlueDark: "#2563EB",
    musicYellow: "#F59E0B",
    musicPink: "#EC4899",
    musicPinkLight: "#F472B6",
    musicPinkDark: "#DB2777",
    musicRed: "#EF4444",
    musicTeal: "#14B8A6",
    musicIndigo: "#6366F1",

    // Transparencias
    musicAlpha5: "rgba(255, 255, 255, 0.05)",
    musicAlpha10: "rgba(255, 255, 255, 0.1)",
    musicAlpha15: "rgba(255, 255, 255, 0.15)",
    musicAlpha20: "rgba(255, 255, 255, 0.2)",
    musicAlpha25: "rgba(255, 255, 255, 0.25)",
    musicAlpha30: "rgba(255, 255, 255, 0.3)",
    musicAlpha40: "rgba(255, 255, 255, 0.4)",
    musicAlpha50: "rgba(255, 255, 255, 0.5)",
    musicAlpha60: "rgba(255, 255, 255, 0.6)",
    musicAlpha70: "rgba(255, 255, 255, 0.7)",
    musicAlphaBlack5: "rgba(0, 0, 0, 0.05)",
    musicAlphaBlack10: "rgba(0, 0, 0, 0.1)",
    musicAlphaBlack15: "rgba(0, 0, 0, 0.15)",
    musicAlphaBlack20: "rgba(0, 0, 0, 0.2)",
    musicAlphaBlack25: "rgba(0, 0, 0, 0.25)",
    musicAlphaBlack30: "rgba(0, 0, 0, 0.3)",
    musicAlphaBlack40: "rgba(0, 0, 0, 0.4)",
    musicAlphaBlack50: "rgba(0, 0, 0, 0.5)",
    musicAlphaBlack60: "rgba(0, 0, 0, 0.6)",
    musicAlphaBlack70: "rgba(0, 0, 0, 0.7)",

    // Variables de transición
    musicTransitionFast: "0.15s ease",
    musicTransitionNormal: "0.2s ease",
    musicTransitionSlow: "0.3s ease",
    musicTransitionSlower: "0.5s ease",
    musicTransitionCubic: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    musicTransitionSpring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    musicTransitionBounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",

    // Variables de espaciado
    musicSpacingXs: "4px",
    musicSpacingSm: "8px",
    musicSpacingMd: "16px",
    musicSpacingLg: "24px",
    musicSpacingXl: "32px",
    musicSpacingXxl: "48px",
    musicSpacingXxxl: "64px",
    musicSpacingXxxxl: "96px",

    // Variables de border radius
    musicRadiusXs: "2px",
    musicRadiusSm: "4px",
    musicRadiusMd: "8px",
    musicRadiusLg: "12px",
    musicRadiusXl: "16px",
    musicRadiusXxl: "24px",
    musicRadiusFull: "50%",
    musicRadiusPill: "9999px",

    // Variables de typography
    musicFontWeightThin: "100",
    musicFontWeightLight: "300",
    musicFontWeightNormal: "400",
    musicFontWeightMedium: "500",
    musicFontWeightSemibold: "600",
    musicFontWeightBold: "700",
    musicFontWeightExtrabold: "800",
    musicFontWeightBlack: "900",

    // Variables de font size
    musicTextXs: "12px",
    musicTextSm: "14px",
    musicTextBase: "16px",
    musicTextLg: "18px",
    musicTextXl: "20px",
    musicText2xl: "24px",
    musicText3xl: "30px",
    musicText4xl: "36px",
    musicText5xl: "48px",

    // Variables de line height
    musicLeadingNone: "1",
    musicLeadingTight: "1.25",
    musicLeadingSnug: "1.375",
    musicLeadingNormal: "1.5",
    musicLeadingRelaxed: "1.625",
    musicLeadingLoose: "2",

    // Variables de z-index
    musicZHide: "-1",
    musicZBase: "0",
    musicZDocked: "10",
    musicZDropdown: "1000",
    musicZSticky: "1020",
    musicZBanner: "1030",
    musicZOverlay: "1040",
    musicZModal: "1050",
    musicZPopover: "1060",
    musicZSkiplink: "1070",
    musicZTooltip: "1080",
    musicZNotification: "1090",

    // Variables de layout - Sidebar
    musicSidebarWidth: "280px",
    musicSidebarCollapsedWidth: "72px",
    musicSidebarMobileWidth: "100vw",
    musicSidebarBg: "#000000",
    musicSidebarBorder: "#292929",
    musicSidebarBgLight: "#FFFFFF",
    musicSidebarBorderLight: "#E5E7EB",

    // Variables de layout - Header
    musicHeaderHeight: "64px",
    musicHeaderHeightMobile: "56px",
    musicHeaderBg: "#121212",
    musicHeaderBorder: "#292929",
    musicHeaderBgLight: "#FFFFFF",
    musicHeaderBorderLight: "#E5E7EB",

    // Variables de layout - Player
    musicPlayerHeight: "90px",
    musicPlayerHeightMobile: "80px",
    musicPlayerBg: "#181818",
    musicPlayerBorder: "#292929",
    musicPlayerBgLight: "#FFFFFF",
    musicPlayerBorderLight: "#E5E7EB",

    // Variables de componentes - Cards
    musicCardBg: "#181818",
    musicCardHoverBg: "#242424",
    musicCardRadius: "8px",
    musicCardShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
    musicCardBgLight: "#FFFFFF",
    musicCardHoverBgLight: "#F7F7F7",
    musicCardShadowLight: "0 4px 12px rgba(0, 0, 0, 0.12)",

    // Variables de componentes - Buttons
    musicButtonHeightSm: "32px",
    musicButtonHeightMd: "40px",
    musicButtonHeightLg: "48px",
    musicButtonPrimaryBg: "#1DB954",
    musicButtonPrimaryHover: "#1ED760",
    musicButtonPrimaryActive: "#169C46",
    musicButtonPrimaryText: "#000000",
    musicButtonSecondaryBg: "transparent",
    musicButtonSecondaryBorder: "#3E3E3E",
    musicButtonSecondaryHover: "rgba(255, 255, 255, 0.1)",
    musicButtonSecondaryText: "#FFFFFF",
    musicButtonSecondaryBgLight: "transparent",
    musicButtonSecondaryBorderLight: "#E5E7EB",
    musicButtonSecondaryHoverLight: "rgba(0, 0, 0, 0.04)",
    musicButtonSecondaryTextLight: "#000000",

    // Variables de componentes - Inputs
    musicInputHeightSm: "32px",
    musicInputHeightMd: "40px",
    musicInputHeightLg: "48px",
    musicInputBg: "#181818",
    musicInputBorder: "#292929",
    musicInputFocusBorder: "#1DB954",
    musicInputPlaceholder: "#727272",
    musicInputText: "#FFFFFF",
    musicInputBgLight: "#FFFFFF",
    musicInputBorderLight: "#E5E7EB",
    musicInputPlaceholderLight: "#8E8E8E",
    musicInputTextLight: "#000000",

    // Variables de componentes - Scrollbar
    musicScrollbarWidth: "8px",
    musicScrollbarWidthThin: "4px",
    musicScrollbarTrack: "#121212",
    musicScrollbarThumb: "#727272",
    musicScrollbarThumbHover: "#B3B3B3",
    musicScrollbarTrackLight: "#FAFAFA",
    musicScrollbarThumbLight: "#E5E7EB",
    musicScrollbarThumbHoverLight: "#6A6A6A",

    // Variables de breakpoints
    musicBreakpointSm: "640px",
    musicBreakpointMd: "768px",
    musicBreakpointLg: "1024px",
    musicBreakpointXl: "1280px",
    musicBreakpoint2xl: "1536px",

    // Variables de animaciones
    musicAnimationSpin: "spin 1s linear infinite",
    musicAnimationPing: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
    musicAnimationPulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    musicAnimationBounce: "bounce 1s infinite",

    // Variables de backdrop filter
    musicBackdropBlurSm: "blur(4px)",
    musicBackdropBlurMd: "blur(8px)",
    musicBackdropBlurLg: "blur(16px)",
    musicBackdropBlurXl: "blur(24px)",

    // Variables --current-* para tema oscuro
    currentBgPrimary: "#121212",
    currentBgSecondary: "#1A1A1A",
    currentBgCard: "#181818",
    currentBgElevated: "#282828",
    currentTextPrimary: "#FFFFFF",
    currentTextSecondary: "#B3B3B3",
    currentTextMuted: "#727272",
    currentTextSubtle: "#535353",
    currentBorder: "#292929",
    currentBorderSubtle: "#1F1F1F",
    currentHover: "rgba(255, 255, 255, 0.1)",
    currentHoverIntense: "rgba(255, 255, 255, 0.2)",
    currentActive: "rgba(255, 255, 255, 0.3)",
    currentShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
    currentShadowLg: "0 8px 24px rgba(0, 0, 0, 0.5)",
    currentSidebarBg: "#000000",
    currentHeaderBg: "#121212",
    currentPlayerBg: "#181818",
    currentScrollbarTrack: "#121212",
    currentScrollbarThumb: "#727272",
    currentInputBg: "#181818",
    currentInputText: "#FFFFFF",
    currentInputPlaceholder: "#727272",

    // Nuevas propiedades para el card mejorado y aliases de alto nivel (valores literales)
    background: "#121212", // Mapea a currentBgPrimary
    textColor: "#FFFFFF", // Mapea a currentTextPrimary
    slideBackground: "#181818", // Mapea a musicCardGray
    titleColor: "#F7F7F7", // Mapea a musicTextLight
    descriptionColor: "#B3B3B3", // Mapea a musicTextGray
    borderColor: "#292929", // Mapea a musicBorder
    hoverBackground: "#242424", // Mapea a musicLightGray
    shadow: "0 8px 24px rgba(0, 0, 0, 0.5)", // Mapea a musicShadowLg
    hoverButton: "rgba(255, 255, 255, 0.1)", // Mapea a musicHover
    toolbarBg: "#121212", // Mapea a musicDarkGray
    contentBg: "#000000", // Mapea a musicBlack
    buttonTheme: "#169C46", // Mapea a musicGreenDark

    cardBackground: "linear-gradient(145deg, #181818 0%, #1F1F1F 100%)", // Mapea a musicGradientCard
    cardBorder: "#292929", // Mapea a musicBorder
    cardShadow: "0 16px 48px rgba(0, 0, 0, 0.6)", // Mapea a musicShadowXl
    cardHoverShadow: "0 16px 48px rgba(0, 0, 0, 0.6), 0 0 40px rgba(29, 185, 84, 0.8)", // musicShadowXl + musicGreenMuted
    imageGlow: "rgba(29, 185, 84, 0.8)", // Mapea a musicGreenMuted
    gradientPrimary: "linear-gradient(135deg, #1DB954 0%, #1ED760 100%)", // Mapea a musicGradientGreen
    gradientCard: "linear-gradient(145deg, #181818 0%, #1F1F1F 100%)", // Mapea a musicGradientCard
    textGradient: "linear-gradient(135deg, #1DB954 0%, #1ED760 100%)", // Mapea a musicGradientGreen
    buttonBackground: "linear-gradient(135deg, #1DB954 0%, #1ED760 100%)", // Mapea a musicGradientButton
    buttonHover: "#1ED760", // Mapea a musicGreenLight
    glowColor: "rgba(29, 185, 84, 0.8)", // Mapea a musicGreenMuted
  }

  private readonly temaClaro: Theme = {
    // Colores principales (generalmente los mismos)
    musicGreen: "#1DB954",
    musicGreenLight: "#1ED760",
    musicGreenDark: "#169C46",
    musicGreenBright: "#1FDF64",
    musicGreenMuted: "rgba(29, 185, 84, 0.8)",

    // Colores de fondo (cambian para tema claro)
    musicBlack: "#000000",
    musicDarkGray: "#121212",
    musicMediumGray: "#1A1A1A",
    musicLightGray: "#242424",
    musicCardGray: "#181818",
    musicElevatedGray: "#282828",
    musicWhite: "#FFFFFF",
    musicLightBg: "#FAFAFA",
    musicLightCard: "#F7F7F7",
    musicLightElevated: "#FFFFFF",

    // Colores de texto (cambian para tema claro)
    musicTextWhite: "#000000",
    musicTextLight: "#121212",
    musicTextGray: "#6A6A6A",
    musicTextDark: "#6A6A6A",
    musicTextMuted: "#8E8E8E",
    musicTextSubtle: "#ADADAD",
    musicTextBlack: "#000000",
    musicTextDarkPrimary: "#121212",
    musicTextDarkSecondary: "#6A6A6A",
    musicTextDarkMuted: "#8E8E8E",
    musicTextDarkSubtle: "#ADADAD",

    // Colores de estado (generalmente los mismos)
    musicError: "#E22134",
    musicErrorLight: "#F87171",
    musicErrorDark: "#B91C3C",
    musicWarning: "#F59E0B",
    musicWarningLight: "#FCD34D",
    musicWarningDark: "#D97706",
    musicSuccess: "#1DB954",
    musicSuccessLight: "#22C55E",
    musicSuccessDark: "#16A34A",
    musicInfo: "#3B82F6",
    musicInfoLight: "#60A5FA",
    musicInfoDark: "#2563EB",

    // Colores de interacción (cambian para tema claro)
    musicHover: "rgba(0, 0, 0, 0.04)",
    musicHoverLight: "rgba(0, 0, 0, 0.08)",
    musicHoverSubtle: "rgba(0, 0, 0, 0.02)",
    musicActive: "rgba(0, 0, 0, 0.12)",
    musicFocus: "rgba(29, 185, 84, 0.3)",
    musicSelected: "rgba(29, 185, 84, 0.08)",
    musicDisabled: "rgba(0, 0, 0, 0.26)",
    musicHoverLightTheme: "rgba(0, 0, 0, 0.04)",
    musicHoverLightThemeIntense: "rgba(0, 0, 0, 0.08)",
    musicHoverLightThemeSubtle: "rgba(0, 0, 0, 0.02)",
    musicActiveLightTheme: "rgba(0, 0, 0, 0.12)",
    musicFocusLightTheme: "rgba(29, 185, 84, 0.3)",
    musicSelectedLightTheme: "rgba(29, 185, 84, 0.08)",
    musicDisabledLightTheme: "rgba(0, 0, 0, 0.26)",

    // Colores de borde (cambian para tema claro)
    musicBorder: "#E5E7EB",
    musicBorderLight: "#D1D5DB",
    musicBorderDark: "#D1D5DB",
    musicBorderSubtle: "#F3F4F6",
    musicBorderLightTheme: "#E5E7EB",
    musicBorderLightThemeDark: "#D1D5DB",
    musicBorderLightThemeSubtle: "#F3F4F6",

    // Colores de overlay (generalmente los mismos, o adaptados si hay versiones claras)
    musicOverlay: "rgba(0, 0, 0, 0.5)",
    musicOverlayLight: "rgba(0, 0, 0, 0.25)",
    musicOverlayDark: "rgba(0, 0, 0, 0.75)",
    musicOverlayWhite: "rgba(255, 255, 255, 0.9)",
    musicOverlayModal: "rgba(0, 0, 0, 0.6)",
    musicOverlayTooltip: "rgba(0, 0, 0, 0.8)",

    // Gradientes (cambian para tema claro)
    musicGradientGreen: "linear-gradient(135deg, #1DB954 0%, #1ED760 100%)",
    musicGradientGreenVertical: "linear-gradient(180deg, #1DB954 0%, #169C46 100%)",
    musicGradientDark: "linear-gradient(135deg, #121212 0%, #1A1A1A 100%)",
    musicGradientLight: "linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)",
    musicGradientOverlay: "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%)",
    musicGradientOverlayLight: "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.4) 100%)",
    musicGradientCard: "linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)",
    musicGradientButton: "linear-gradient(135deg, #1DB954 0%, #1ED760 100%)",

    // Sombras (cambian para tema claro)
    musicShadowXs: "0 1px 2px rgba(0, 0, 0, 0.05)",
    musicShadowSm: "0 2px 4px rgba(0, 0, 0, 0.08)",
    musicShadowMd: "0 4px 12px rgba(0, 0, 0, 0.12)",
    musicShadowLg: "0 8px 24px rgba(0, 0, 0, 0.16)",
    musicShadowXl: "0 16px 48px rgba(0, 0, 0, 0.20)",
    musicShadowInner: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
    musicShadowFocus: "0 0 0 3px rgba(29, 185, 84, 0.3)",
    musicShadowXsLight: "0 1px 2px rgba(0, 0, 0, 0.05)",
    musicShadowSmLight: "0 2px 4px rgba(0, 0, 0, 0.08)",
    musicShadowMdLight: "0 4px 12px rgba(0, 0, 0, 0.12)",
    musicShadowLgLight: "0 8px 24px rgba(0, 0, 0, 0.16)",
    musicShadowXlLight: "0 16px 48px rgba(0, 0, 0, 0.20)",
    musicShadowInnerLight: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
    musicShadowFocusLight: "0 0 0 3px rgba(29, 185, 84, 0.3)",

    // Colores adicionales (generalmente los mismos)
    musicPurple: "#8B5CF6",
    musicPurpleLight: "#A78BFA",
    musicPurpleDark: "#7C3AED",
    musicOrange: "#F59E0B",
    musicOrangeLight: "#FCD34D",
    musicOrangeDark: "#D97706",
    musicBlue: "#3B82F6",
    musicBlueLight: "#60A5FA",
    musicBlueDark: "#2563EB",
    musicYellow: "#F59E0B",
    musicPink: "#EC4899",
    musicPinkLight: "#F472B6",
    musicPinkDark: "#DB2777",
    musicRed: "#EF4444",
    musicTeal: "#14B8A6",
    musicIndigo: "#6366F1",

    // Transparencias (cambian para tema claro)
    musicAlpha5: "rgba(0, 0, 0, 0.05)",
    musicAlpha10: "rgba(0, 0, 0, 0.1)",
    musicAlpha15: "rgba(0, 0, 0, 0.15)",
    musicAlpha20: "rgba(0, 0, 0, 0.2)",
    musicAlpha25: "rgba(0, 0, 0, 0.25)",
    musicAlpha30: "rgba(0, 0, 0, 0.3)",
    musicAlpha40: "rgba(0, 0, 0, 0.4)",
    musicAlpha50: "rgba(0, 0, 0, 0.5)",
    musicAlpha60: "rgba(0, 0, 0, 0.6)",
    musicAlpha70: "rgba(0, 0, 0, 0.7)",
    musicAlphaBlack5: "rgba(0, 0, 0, 0.05)",
    musicAlphaBlack10: "rgba(0, 0, 0, 0.1)",
    musicAlphaBlack15: "rgba(0, 0, 0, 0.15)",
    musicAlphaBlack20: "rgba(0, 0, 0, 0.2)",
    musicAlphaBlack25: "rgba(0, 0, 0, 0.25)",
    musicAlphaBlack30: "rgba(0, 0, 0, 0.3)",
    musicAlphaBlack40: "rgba(0, 0, 0, 0.4)",
    musicAlphaBlack50: "rgba(0, 0, 0, 0.5)",
    musicAlphaBlack60: "rgba(0, 0, 0, 0.6)",
    musicAlphaBlack70: "rgba(0, 0, 0, 0.7)",

    // Variables de transición (generalmente las mismas)
    musicTransitionFast: "0.15s ease",
    musicTransitionNormal: "0.2s ease",
    musicTransitionSlow: "0.3s ease",
    musicTransitionSlower: "0.5s ease",
    musicTransitionCubic: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    musicTransitionSpring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    musicTransitionBounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",

    // Variables de espaciado (generalmente las mismas)
    musicSpacingXs: "4px",
    musicSpacingSm: "8px",
    musicSpacingMd: "16px",
    musicSpacingLg: "24px",
    musicSpacingXl: "32px",
    musicSpacingXxl: "48px",
    musicSpacingXxxl: "64px",
    musicSpacingXxxxl: "96px",

    // Variables de border radius (generalmente las mismas)
    musicRadiusXs: "2px",
    musicRadiusSm: "4px",
    musicRadiusMd: "8px",
    musicRadiusLg: "12px",
    musicRadiusXl: "16px",
    musicRadiusXxl: "24px",
    musicRadiusFull: "50%",
    musicRadiusPill: "9999px",

    // Variables de typography (generalmente las mismas)
    musicFontWeightThin: "100",
    musicFontWeightLight: "300",
    musicFontWeightNormal: "400",
    musicFontWeightMedium: "500",
    musicFontWeightSemibold: "600",
    musicFontWeightBold: "700",
    musicFontWeightExtrabold: "800",
    musicFontWeightBlack: "900",

    // Variables de font size (generalmente las mismas)
    musicTextXs: "12px",
    musicTextSm: "14px",
    musicTextBase: "16px",
    musicTextLg: "18px",
    musicTextXl: "20px",
    musicText2xl: "24px",
    musicText3xl: "30px",
    musicText4xl: "36px",
    musicText5xl: "48px",

    // Variables de line height (generalmente las mismas)
    musicLeadingNone: "1",
    musicLeadingTight: "1.25",
    musicLeadingSnug: "1.375",
    musicLeadingNormal: "1.5",
    musicLeadingRelaxed: "1.625",
    musicLeadingLoose: "2",

    // Variables de z-index (generalmente las mismas)
    musicZHide: "-1",
    musicZBase: "0",
    musicZDocked: "10",
    musicZDropdown: "1000",
    musicZSticky: "1020",
    musicZBanner: "1030",
    musicZOverlay: "1040",
    musicZModal: "1050",
    musicZPopover: "1060",
    musicZSkiplink: "1070",
    musicZTooltip: "1080",
    musicZNotification: "1090",

    // Variables de layout - Sidebar (cambian para tema claro)
    musicSidebarWidth: "280px",
    musicSidebarCollapsedWidth: "72px",
    musicSidebarMobileWidth: "100vw",
    musicSidebarBg: "#FFFFFF",
    musicSidebarBorder: "#E5E7EB",
    musicSidebarBgLight: "#FFFFFF",
    musicSidebarBorderLight: "#E5E7EB",

    // Variables de layout - Header (cambian para tema claro)
    musicHeaderHeight: "64px",
    musicHeaderHeightMobile: "56px",
    musicHeaderBg: "#FFFFFF",
    musicHeaderBorder: "#E5E7EB",
    musicHeaderBgLight: "#FFFFFF",
    musicHeaderBorderLight: "#E5E7EB",

    // Variables de layout - Player (cambian para tema claro)
    musicPlayerHeight: "90px",
    musicPlayerHeightMobile: "80px",
    musicPlayerBg: "#FFFFFF",
    musicPlayerBorder: "#E5E7EB",
    musicPlayerBgLight: "#FFFFFF",
    musicPlayerBorderLight: "#E5E7EB",

    // Variables de componentes - Cards (cambian para tema claro)
    musicCardBg: "#FFFFFF",
    musicCardHoverBg: "#F7F7F7",
    musicCardRadius: "8px",
    musicCardShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
    musicCardBgLight: "#FFFFFF",
    musicCardHoverBgLight: "#F7F7F7",
    musicCardShadowLight: "0 4px 12px rgba(0, 0, 0, 0.12)",

    // Variables de componentes - Buttons (cambian para tema claro)
    musicButtonHeightSm: "32px",
    musicButtonHeightMd: "40px",
    musicButtonHeightLg: "48px",
    musicButtonPrimaryBg: "#1DB954",
    musicButtonPrimaryHover: "#1ED760",
    musicButtonPrimaryActive: "#169C46",
    musicButtonPrimaryText: "#000000",
    musicButtonSecondaryBg: "transparent",
    musicButtonSecondaryBorder: "#E5E7EB",
    musicButtonSecondaryHover: "rgba(0, 0, 0, 0.04)",
    musicButtonSecondaryText: "#000000",
    musicButtonSecondaryBgLight: "transparent",
    musicButtonSecondaryBorderLight: "#E5E7EB",
    musicButtonSecondaryHoverLight: "rgba(0, 0, 0, 0.04)",
    musicButtonSecondaryTextLight: "#000000",

    // Variables de componentes - Inputs (cambian para tema claro)
    musicInputHeightSm: "32px",
    musicInputHeightMd: "40px",
    musicInputHeightLg: "48px",
    musicInputBg: "#FFFFFF",
    musicInputBorder: "#E5E7EB",
    musicInputFocusBorder: "#1DB954",
    musicInputPlaceholder: "#8E8E8E",
    musicInputText: "#000000",
    musicInputBgLight: "#FFFFFF",
    musicInputBorderLight: "#E5E7EB",
    musicInputPlaceholderLight: "#8E8E8E",
    musicInputTextLight: "#000000",

    // Variables de componentes - Scrollbar (cambian para tema claro)
    musicScrollbarWidth: "8px",
    musicScrollbarWidthThin: "4px",
    musicScrollbarTrack: "#FAFAFA",
    musicScrollbarThumb: "#E5E7EB",
    musicScrollbarThumbHover: "#6A6A6A",
    musicScrollbarTrackLight: "#FAFAFA",
    musicScrollbarThumbLight: "#E5E7EB",
    musicScrollbarThumbHoverLight: "#6A6A6A",

    // Variables de breakpoints (generalmente las mismas)
    musicBreakpointSm: "640px",
    musicBreakpointMd: "768px",
    musicBreakpointLg: "1024px",
    musicBreakpointXl: "1280px",
    musicBreakpoint2xl: "1536px",

    // Variables de animaciones (generalmente las mismas)
    musicAnimationSpin: "spin 1s linear infinite",
    musicAnimationPing: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
    musicAnimationPulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    musicAnimationBounce: "bounce 1s infinite",

    // Variables de backdrop filter (generalmente las mismas)
    musicBackdropBlurSm: "blur(4px)",
    musicBackdropBlurMd: "blur(8px)",
    musicBackdropBlurLg: "blur(16px)",
    musicBackdropBlurXl: "blur(24px)",

    // Variables --current-* para tema claro
    currentBgPrimary: "#FFFFFF",
    currentBgSecondary: "#FAFAFA",
    currentBgCard: "#F7F7F7",
    currentBgElevated: "#FFFFFF",
    currentTextPrimary: "#121212",
    currentTextSecondary: "#6A6A6A",
    currentTextMuted: "#8E8E8E",
    currentTextSubtle: "#ADADAD",
    currentBorder: "#E5E7EB",
    currentBorderSubtle: "#F3F4F6",
    currentHover: "rgba(0, 0, 0, 0.04)",
    currentHoverIntense: "rgba(0, 0, 0, 0.08)",
    currentActive: "rgba(0, 0, 0, 0.12)",
    currentShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
    currentShadowLg: "0 8px 24px rgba(0, 0, 0, 0.16)",
    currentSidebarBg: "#FFFFFF",
    currentHeaderBg: "#FFFFFF",
    currentPlayerBg: "#FFFFFF",
    currentScrollbarTrack: "#FAFAFA",
    currentScrollbarThumb: "#E5E7EB",
    currentInputBg: "#FFFFFF",
    currentInputText: "#000000",
    currentInputPlaceholder: "#8E8E8E",

    // Nuevas propiedades para el card mejorado y aliases de alto nivel (valores literales)
    background: "#FFFFFF", // Mapea a currentBgPrimary
    textColor: "#121212", // Mapea a currentTextPrimary
    slideBackground: "#F7F7F7", // Mapea a musicLightCard
    titleColor: "#000000", // Mapea a musicTextBlack
    descriptionColor: "#6A6A6A", // Mapea a musicTextDarkSecondary
    borderColor: "#E5E7EB", // Mapea a musicBorderLightTheme
    hoverBackground: "#F7F7F7", // Mapea a musicLightCard
    shadow: "0 4px 12px rgba(0, 0, 0, 0.12)", // Mapea a musicShadowMdLight
    hoverButton: "rgba(0, 0, 0, 0.04)", // Mapea a musicHoverLightTheme
    toolbarBg: "#FFFFFF", // Mapea a musicWhite
    contentBg: "#FFFFFF", // Mapea a musicWhite
    buttonTheme: "#E5E7EB", // Mapea a musicButtonSecondaryBorderLight

    cardBackground: "linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)", // Mapea a musicGradientLight
    cardBorder: "#E5E7EB", // Mapea a musicBorderLightTheme
    cardShadow: "0 16px 48px rgba(0, 0, 0, 0.20)", // Mapea a musicShadowXlLight
    cardHoverShadow: "0 16px 48px rgba(0, 0, 0, 0.20), 0 0 40px rgba(29, 185, 84, 0.3)", // musicShadowXlLight + rgba(29, 185, 84, 0.3)
    imageGlow: "rgba(29, 185, 84, 0.3)",
    gradientPrimary: "linear-gradient(135deg, #1DB954 0%, #1ED760 100%)", // Mapea a musicGradientGreen
    gradientCard: "linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)", // Mapea a musicGradientLight
    textGradient: "linear-gradient(135deg, #1DB954 0%, #1ED760 100%)", // Mapea a musicGradientGreen
    buttonBackground: "linear-gradient(135deg, #1DB954 0%, #1ED760 100%)", // Mapea a musicGradientButton
    buttonHover: "#1ED760", // Mapea a musicGreenLight
    glowColor: "rgba(29, 185, 84, 0.3)",
  }

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
    // Almacenar solo el nombre del tema para una carga más robusta
    await this.storageService.set("theme", nuevoTema === this.temaOscuro ? "oscuro" : "claro");
    this.applyThemeToDocument();
  }

  async setTema(tema: "claro" | "oscuro"): Promise<void> {
    const nuevoTema = tema === "oscuro" ? this.temaOscuro : this.temaClaro;
    this.temaActualSubject.next(nuevoTema);
    // Almacenar solo el nombre del tema
    await this.storageService.set("theme", tema);
    this.applyThemeToDocument();
  }

  get isThemeDark(): boolean {
    return this.temaActual === this.temaOscuro;
  }

  // Método para aplicar el tema al documento
  private applyThemeToDocument(): void {
    const root = document.documentElement
    const theme = this.temaActual

    // Aplicar todas las variables CSS dinámicas
    for (const key in theme) {
      if (Object.prototype.hasOwnProperty.call(theme, key)) {
        // Convertir camelCase a kebab-case para el nombre de la variable CSS
        const cssVarName = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`
        root.style.setProperty(cssVarName, (theme as any)[key])
      }
    }

    // Agregar clase de tema al body (para cualquier CSS que dependa de ellas)
    document.body.classList.remove("theme-dark", "theme-light")
    document.body.classList.add(this.isThemeDark ? "theme-dark" : "theme-light")
  }

  private async loadStorageData(): Promise<void> {
    try {
      const savedTheme = await this.storageService.get("theme")
      if (savedTheme === "claro") {
        this.temaActualSubject.next(this.temaClaro)
      } else {
        // Por defecto a oscuro si no hay tema guardado o no es 'claro'
        this.temaActualSubject.next(this.temaOscuro)
      }
    } catch (error) {
      console.warn("Error al cargar el tema desde storage:", error)
      this.temaActualSubject.next(this.temaOscuro) // Fallback en caso de error
    }
  }

  // Este método es útil si necesitas validar un objeto Theme de una fuente externa,
  // pero con el nuevo enfoque de guardar solo el nombre del tema, su uso interno se reduce.
  private isValidTheme(theme: any): boolean {
    // Validar un subconjunto representativo de propiedades para asegurar la integridad básica
    const requiredProperties = [
      "musicGreen",
      "musicDarkGray",
      "musicWhite",
      "musicTextWhite",
      "musicTextBlack",
      "musicShadowMd",
      "musicGradientGreen",
      "musicSidebarWidth",
      "currentBgPrimary",
      "currentTextPrimary",
      "currentBgCard",
      "currentBorder",
      "currentHover",
      "currentShadow",
      "currentSidebarBg",
      "currentHeaderBg",
      "currentPlayerBg",
      "currentScrollbarTrack",
      "currentInputBg",
      "background",
      "textColor",
      "cardBackground",
      "cardBorder",
      "imageGlow",
    ]
    return requiredProperties.every((prop) => theme && theme[prop] !== undefined);
  }

  getTemaOscuro(): Theme {
    return this.temaOscuro;
  }

  getTemaClaro(): Theme {
    return this.temaClaro;
  }
}
