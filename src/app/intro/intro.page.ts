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
        "https://i.scdn.co/image/ab67616d0000b273715c7ef6d90b86cad6f81df5", // Imagen de ejemplo
    },
    {
      id: 2,
      title: "",
      background: "rgba(255, 255, 255, 0.1)", // Color sutil para el glow
      color: "#FFFFFF",
      buttonText: "RITMO",
      backgroundImage:
        "https://i.scdn.co/image/ab67616d0000b27370063c9ac5c5ae15632c56fb", // Imagen de ejemplo
    },
    {
      id: 3,
      title: "",
      background: "rgba(255, 255, 255, 0.1)", // Color sutil para el glow
      color: "#FFFFFF",
      buttonText: "MELODÍA",
      backgroundImage:
        "https://i.scdn.co/image/ab67616d0000b273017f7f0b78acc1b124f4cb80", // Imagen de ejemplo
    },
    {
      id: 4,
      title: "",
      background: "rgba(255, 255, 255, 0.1)", // Color sutil para el glow
      color: "#333333",
      buttonText: "COMENZAR",
      backgroundImage:
        "https://i.scdn.co/image/ab67616d00001e02623c93ba10c967d7ff00836d", // Imagen de ejemplo
    },
  ]

  // Array de íconos de música para flotar
  iconMusics: IconMusic[] = [
    {
      image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSUfNSmvdd17uEoLBtiANlgHLk0Qo6xs2SMiMpOjp-yViSd9RaVnNpboch4lqLYMgwIR2iWVB0maclV4oCxUjj8Q409U6e-NLGZ4-uFnv0XsQ",
      text: "Music Note",
    },
    {
      image:
        "https://i.scdn.co/image/ab67616d0000b2736790b3128792f83536251ae8",
      text: "Electric Guitar",
    },
    {
      image:
        "https://i.scdn.co/image/ab67616d0000b2738d8d1be23d97d7eb738354d1",
      text: "Headphones",
    },
    {
      image:
        "https://i.scdn.co/image/ab67616d00001e02717ee51a0cc4b2d7cf48a2e2",
      text: "Rock Guitar",
    },
    {
      image: "https://i.scdn.co/image/ab67616d00001e02b10b7d12263bbf46e24283ee",
      text: "Music Icon",
    },
    {
      image:
        "https://i.scdn.co/image/ab67616d00001e02976971afd4d083676e7b5d51",
      text: "Audio Gear",
    },
    {
      image:
        "https://i.scdn.co/image/ab67616d0000b27302ab14a478db794bb0ba3cc7",
      text: "Winged Guitar",
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

