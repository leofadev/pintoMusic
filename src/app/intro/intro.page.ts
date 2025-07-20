import { Component, type OnInit, type OnDestroy, type AfterViewInit, ViewChild, type ElementRef } from "@angular/core"
import { IonicModule } from "@ionic/angular"
import { CommonModule } from "@angular/common"
import { ThemeService, Theme } from "../services/theme.service"
import { Subscription } from "rxjs"
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"
import { StorageService } from "../services/storage.service"
import { Router } from "@angular/router"
import { register } from "swiper/element/bundle"

// Registrar Swiper
register()

interface Carta {
  id: number;
  title: string;
  subtitle: string;
  background: string;
  color: string;
  buttonText: string;
}

@Component({
  selector: "app-intro",
  templateUrl: "./intro.page.html",
  styleUrls: ["./intro.page.scss"],
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IntroPage implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("swiper", { static: false }) swiperRef!: ElementRef

  temaActual!: Theme
  private themeSubscription!: Subscription

  // Cartas con colores específicos mejorados
  cartas: Carta[] = [
    {
      id: 1,
      title: "Music",
      subtitle: "Discover new sounds",
      background: "linear-gradient(135deg, #FF6B6B, #FF8E8E)",
      color: "#FFFFFF",
      buttonText: "EXPLORAR",
    },
    {
      id: 2,
      title: "Playlists",
      subtitle: "Your favorite tracks",
      background: "linear-gradient(135deg, #4FACFE, #00F2FE)",
      color: "#FFFFFF",
      buttonText: "VER LISTAS",
    },
    {
      id: 3,
      title: "Artists",
      subtitle: "Follow your favorites",
      background: "linear-gradient(135deg, #43E97B, #38F9D7)",
      color: "#FFFFFF",
      buttonText: "ARTISTAS",
    },
    {
      id: 4,
      title: "Music",
      subtitle: "Explore all styles",
      background: "linear-gradient(135deg, #A8EDEA, #FED6E3)",
      color: "#333333",
      buttonText: "GÉNEROS",
    },
  ]

  constructor(
    private themeService: ThemeService,
    private storageService: StorageService,
    private router: Router,
  ) {}

  ngOnInit() {
    // Suscribirse a los cambios de tema
    this.themeSubscription = this.themeService.temaActual$.subscribe((tema) => {
      this.temaActual = tema;
    })
    // Obtener el tema actual inmediatamente
    this.temaActual = this.themeService.temaActual
  }

  ngAfterViewInit() {
    // Configurar Swiper después de que la vista se haya inicializado
    setTimeout(() => {
      const swiperEl = document.querySelector(".cards-swiper") as any
      if (swiperEl) {
        // Configuración específica para el efecto cards
        Object.assign(swiperEl, {
          effect: "cards",
          grabCursor: true,
          cardsEffect: {
            slideShadows: true,
            transformEl: null,
            rotate: true,
            perSlideOffset: 8,
            perSlideRotate: 2,
          },
          // Opciones adicionales para mejor rendimiento
          speed: 400,
          spaceBetween: 0,
          centeredSlides: true,
        })
        swiperEl.initialize()
      }
    }, 100)
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe()
    }
  }

  async goBack() {
    await this.storageService.set("introView", true)
    this.router.navigateByUrl("/home")
  }

  onCardAction(index: number) {
    // Acciones específicas según la carta
    this.goBack();
  }

  // Método para obtener el color principal de una carta (útil para efectos adicionales)
  getCardMainColor(background: string): string {
    // Extraer el primer color del gradiente
    const match = background.match(/#[A-Fa-f0-9]{6}/);
    return match ? match[0] : '#FF6B6B';
  }
}
