import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { StorageService } from "./storage.service"

export interface Theme {
  // Colores principales
  musicGreen: string

  // Colores de texto
  musicTextMuted: string

  // Colores de estado
  musicError: string

  // Sombras
  musicShadowSm: string
  musicShadowMd: string

  // Transparencias
  musicAlpha5: string
  musicAlpha10: string
  musicAlpha40: string

  // Variables de transición
  musicTransitionNormal: string

  // Variables de espaciado
  musicSpacingXs: string
  musicSpacingSm: string
  musicSpacingMd: string

  // Variables de border radius
  musicRadiusSm: string
  musicRadiusMd: string
  musicRadiusLg: string
  musicRadiusXl: string
  musicRadiusFull: string
  musicRadiusPill: string

  // Variables de typography
  musicFontWeightMedium: string
  musicFontWeightSemibold: string
  musicFontWeightBold: string

  // Variables de font size
  musicTextXs: string
  musicTextSm: string
  musicTextBase: string
  musicTextLg: string
  musicTextXl: string
  musicText2xl: string

  // Variables de line height
  musicLeadingTight: string

  // Variables de backdrop filter
  musicBackdropBlurSm: string
  musicBackdropBlurMd: string
  musicBackdropBlurLg: string

  // Variables --current-* que se usan en las clases CSS
  currentBorderSubtle: string

  // Nuevas propiedades para el card mejorado
  background: string
  textColor: string
  slideBackground: string
  titleColor: string
  descriptionColor: string
  borderColor: string
  hoverBackground: string
  shadow: string
  toolbarBg: string
  contentBg: string

  cardBackground: string
  cardBorder: string
  cardShadow: string
  gradientPrimary: string
  textGradient: string
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly temaOscuro: Theme = {
    // Colores principales
    musicGreen: "#1DB954",
    // Colores de texto
    musicTextMuted: "#727272",
    // Colores de estado
    musicError: "#E22134",

    // Sombras
    // musicShadowXs: "0 1px 2px rgba(0, 0, 0, 0.2)",
    musicShadowSm: "0 2px 4px rgba(0, 0, 0, 0.3)",
    musicShadowMd: "0 4px 12px rgba(0, 0, 0, 0.4)",

    // Transparencias
    musicAlpha5: "rgba(255, 255, 255, 0.05)",
    musicAlpha10: "rgba(255, 255, 255, 0.1)",
    musicAlpha40: "rgba(255, 255, 255, 0.4)",

    // Variables de transición
    musicTransitionNormal: "0.2s ease",

    // Variables de espaciado
    musicSpacingXs: "4px",
    musicSpacingSm: "8px",
    musicSpacingMd: "16px",

    // Variables de border radius
    musicRadiusSm: "4px",
    musicRadiusMd: "8px",
    musicRadiusLg: "12px",
    musicRadiusXl: "16px",
    musicRadiusFull: "50%",
    musicRadiusPill: "9999px",

    // Variables de typography
    musicFontWeightMedium: "500",
    musicFontWeightSemibold: "600",
    musicFontWeightBold: "700",

    // Variables de font size
    musicTextXs: "12px",
    musicTextSm: "14px",
    musicTextBase: "16px",
    musicTextLg: "18px",
    musicTextXl: "20px",
    musicText2xl: "24px",

    // Variables de line height
    musicLeadingTight: "1.25",

    // Variables de backdrop filter
    musicBackdropBlurSm: "blur(4px)",
    musicBackdropBlurMd: "blur(8px)",
    musicBackdropBlurLg: "blur(16px)",

    // Variables --current-* para tema oscuro
    currentBorderSubtle: "#1F1F1F",

    // Nuevas propiedades para el card mejorado y aliases de alto nivel (valores literales)
    background: "#121212",
    textColor: "#FFFFFF",
    slideBackground: "#181818",
    titleColor: "#F7F7F7",
    descriptionColor: "#B3B3B3",
    borderColor: "#292929",
    hoverBackground: "#242424",
    shadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
    toolbarBg: "#121212",
    contentBg: "#000000",

    cardBackground: "linear-gradient(145deg, #181818 0%, #1F1F1F 100%)",
    cardBorder: "#292929",
    cardShadow: "0 16px 48px rgba(0, 0, 0, 0.6)",
    gradientPrimary: "linear-gradient(135deg, #1DB954 0%, #1ED760 100%)",
    textGradient: "linear-gradient(135deg, #1DB954 0%, #1ED760 100%)",
  }

  private readonly temaClaro: Theme = {
    // Colores principales (generalmente los mismos)
    musicGreen: "#1DB954",

    // Colores de texto
    musicTextMuted: "#8E8E8E",

    // Colores de estado (generalmente los mismos)
    musicError: "#E22134",

    // Sombras (cambian para tema claro)
    musicShadowSm: "0 2px 4px rgba(0, 0, 0, 0.08)",
    musicShadowMd: "0 4px 12px rgba(0, 0, 0, 0.12)",

    // Transparencias (cambian para tema claro)
    musicAlpha5: "rgba(0, 0, 0, 0.05)",
    musicAlpha10: "rgba(0, 0, 0, 0.1)",
    musicAlpha40: "rgba(0, 0, 0, 0.4)",

    // Variables de transición (generalmente las mismas)
    musicTransitionNormal: "0.2s ease",

    // Variables de espaciado (generalmente las mismas)
    musicSpacingXs: "4px",
    musicSpacingSm: "8px",
    musicSpacingMd: "16px",

    // Variables de border radius (generalmente las mismas)
    musicRadiusSm: "4px",
    musicRadiusMd: "8px",
    musicRadiusLg: "12px",
    musicRadiusXl: "16px",
    musicRadiusFull: "50%",
    musicRadiusPill: "9999px",

    // Variables de typography (generalmente las mismas)
    musicFontWeightMedium: "500",
    musicFontWeightSemibold: "600",
    musicFontWeightBold: "700",

    // Variables de font size (generalmente las mismas)
    musicTextXs: "12px",
    musicTextSm: "14px",
    musicTextBase: "16px",
    musicTextLg: "18px",
    musicTextXl: "20px",
    musicText2xl: "24px",

    // Variables de line height (generalmente las mismas)
    musicLeadingTight: "1.25",

    // Variables de backdrop filter (generalmente las mismas)
    musicBackdropBlurSm: "blur(4px)",
    musicBackdropBlurMd: "blur(8px)",
    musicBackdropBlurLg: "blur(16px)",

    // Variables --current-* para tema claro
    currentBorderSubtle: "#F3F4F6",

    // Nuevas propiedades para el card mejorado y aliases de alto nivel (valores literales)
    background: "#FFFFFF",
    textColor: "#121212",
    slideBackground: "#F7F7F7",
    titleColor: "#000000",
    descriptionColor: "#6A6A6A",
    borderColor: "#E5E7EB",
    hoverBackground: "#F7F7F7",
    shadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
    toolbarBg: "#FFFFFF",
    contentBg: "#FFFFFF",

    cardBackground: "linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)",
    cardBorder: "#E5E7EB",
    cardShadow: "0 16px 48px rgba(0, 0, 0, 0.20)",
    gradientPrimary: "linear-gradient(135deg, #1DB954 0%, #1ED760 100%)",
    textGradient: "linear-gradient(135deg, #1DB954 0%, #1ED760 100%)",
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

  getTemaOscuro(): Theme {
    return this.temaOscuro;
  }

  getTemaClaro(): Theme {
    return this.temaClaro;
  }
}
