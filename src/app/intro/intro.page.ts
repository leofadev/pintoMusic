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
  id: number
  title: string
  background: string // Se mantiene para el glow, pero será un color sutil
  color: string
  buttonText: string
  backgroundImage?: string // Propiedad para la imagen de fondo
}

// Nueva interfaz para los íconos de música flotantes
interface IconMusic {
  image: string
  text: string // Añadido para el texto descriptivo
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

  // Cartas con colores específicos mejorados y ahora con imágenes de fondo
  cartas: Carta[] = [
    {
      id: 1,
      title: "",
      background: "rgba(255, 255, 255, 0.1)", // Color sutil para el glow
      color: "#FFFFFF",
      buttonText: "SONIDO",
      backgroundImage:
        "../../assets/images/MOOD.jpg", // Imagen de ejemplo
    },
    {
      id: 2,
      title: "",
      background: "rgba(255, 255, 255, 0.1)", // Color sutil para el glow
      color: "#FFFFFF",
      buttonText: "RITMO",
      backgroundImage:
        "../../assets/images/OCTAVO.jpg", // Imagen de ejemplo
    },
    {
      id: 3,
      title: "",
      background: "rgba(255, 255, 255, 0.1)", // Color sutil para el glow
      color: "#FFFFFF",
      buttonText: "MELODÍA",
      backgroundImage:
        "../../assets/images/LIT_KILLAH.jpg", // Imagen de ejemplo
    },
    {
      id: 4,
      title: "",
      background: "rgba(255, 255, 255, 0.1)", // Color sutil para el glow
      color: "#333333",
      buttonText: "COMENZAR",
      backgroundImage:
        "../../assets/images/ZOMBIE.jpg", // Imagen de ejemplo
    },
  ]

  // Array de íconos de música para flotar
  iconMusics: IconMusic[] = [
    {
      image: "../../assets/images/the_ama.jpg",
      text: "the_ama",
    },
    {
      image:
        "../../assets/images/MOOD.jpg",
      text: "MOOD",
    },
    {
      image:
        "../../assets/images/CAOS.jpg",
      text: "CAOS",
    },
    {
      image:
        "../../assets/images/RIP_OZA.jpg",
      text: "RIP_OZA",
    },
    {
      image: "../../assets/images/TRAP_GOD.jpg",
      text: "TRAP_GOD",
    },
    {
      image:
        "../../assets/images/PLAYER.jpg",
      text: "PLAYER",
    },
    {
      image:
        "../../assets/images/SAN_HALLOWEEN.jpg",
      text: "SAN_HALLOWEEN",
    },
  ]

  // Estilos predefinidos para los elementos flotantes, para dar variedad
  private floatingStyles = [
    { top: "70%", left: "10%", animationDelay: "0s" },
    { top: "80%", left: "70%", animationDelay: "8s" },
    { top: "60%", left: "40%", animationDelay: "16s" },
    { top: "75%", left: "25%", animationDelay: "24s" },
    { top: "65%", left: "85%", animationDelay: "32s" },
    { top: "72%", left: "50%", animationDelay: "40s" },
    { top: "85%", left: "5%", animationDelay: "48s" },
    { top: "68%", left: "90%", animationDelay: "56s" },
    { top: "78%", left: "15%", animationDelay: "64s" },
    { top: "62%", left: "55%", animationDelay: "72s" },
  ]

  constructor(
    private themeService: ThemeService,
    private storageService: StorageService,
    private router: Router,
  ) {}

  ngOnInit() {
    // Suscribirse a los cambios de tema
    this.themeSubscription = this.themeService.temaActual$.subscribe((tema) => {
      this.temaActual = tema
    })
    // Obtener el tema actual inmediatamente
    this.temaActual = this.themeService.temaActual
  }

  ngAfterViewInit() {
    // Configurar Swiper después de que la vista se haya inicializado
    setTimeout(() => {
      const swiperEl = document.querySelector(".cards-swiper") as any
      if (swiperEl) {
        // Configuration specific for the cards effect
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
          // Additional options for better performance and UX
          speed: 600, // Slightly slower for smoother transitions
          spaceBetween: 0,
          centeredSlides: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false, // Keep autoplaying even after user interaction
          },
          loop: true, // Enable looping
          pagination: {
            el: ".swiper-pagination", // Enable pagination dots
            clickable: true,
          },
          keyboard: {
            enabled: true, // Enable keyboard navigation
            onlyInViewport: true,
          },
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
    const carta = this.cartas[index]

    if (carta.id === 4) {
      this.goBack()
    } else {
      console.log(`Card ${carta.buttonText} (id ${carta.id}) pressed — no redirection.`)
    }
  }

  // Método para obtener los estilos de posición y retraso para cada ícono flotante
  getFloatingItemStyle(index: number) {
    return this.floatingStyles[index % this.floatingStyles.length]
  }

  // Method to get the main color of a card (useful for additional effects)
  getCardMainColor(background: string): string {
    // Extrae el primer color de la cadena (ahora será un rgba sutil)
    const match = background.match(/rgba$$\d{1,3},\s*\d{1,3},\s*\d{1,3},\s*[\d.]+$$/)
    return match ? match[0] : "#FFFFFF" // Devuelve el rgba o un blanco por defecto
  }

  ionViewWillEnter() {
    // Pausar animaciones momentáneamente
    const content = document.querySelector('.intro-page-content') as HTMLElement;
    if (content) {
      content.style.animationPlayState = 'paused';

      setTimeout(() => {
        content.style.animationPlayState = 'running';
      }, 200);
    }

    // Reiniciar swiper suavemente
    setTimeout(() => {
      const swiperEl = document.querySelector('.cards-swiper') as any;
      if (swiperEl && swiperEl.swiper) {
        swiperEl.swiper.allowTouchMove = true;
        swiperEl.swiper.update();
        swiperEl.swiper.slideTo(0, 300);
      }
    }, 300);
  }
}

