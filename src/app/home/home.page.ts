import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ThemeService, Theme } from '../services/theme.service';
import { Subscription } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit, OnDestroy {

  temaActual!: Theme;
  private themeSubscription!: Subscription;

  genres = [
    {
      title: "Musica clasica",
      image: "https://img.pikbest.com/element_our/20220217/bg/b9525e1860810.png!bw700",
      description: "La música clásica es una forma de arte que ha perdurado a lo largo de los siglos, con obras de compositores como Mozart, Beethoven y Bach. Su riqueza melódica y complejidad estructural la convierten en un género profundo y emotivo, capaz de transmitir desde serenidad hasta intensidad. Interpretada por orquestas y solistas, es una expresión cultural que sigue inspirando y conmoviendo al mundo hasta hoy."
    },
    {
      title: "Música rock",
      image: "https://png.pngtree.com/png-vector/20240125/ourmid/pngtree-a-colored-winged-rock-guitar-art-for-music-png-image_11551392.png",
      description: "La música rock es una explosión de energía, rebeldía y libertad que marcó generaciones enteras. Con guitarras eléctricas, baterías potentes y voces apasionadas, el rock ha sido la banda sonora de movimientos culturales y sociales. Desde los riffs clásicos de los años 60 hasta las fusiones modernas, sigue siendo un género vibrante que transmite emoción pura y actitud sin filtros."
    },
    {
      title: "Música electrónica",
      image: "https://static.vecteezy.com/system/resources/thumbnails/022/984/297/small/headphones-brush-painted-icon-free-png.png",
      description: "La música electrónica combina tecnología y creatividad para crear sonidos envolventes, ritmos hipnóticos y atmósferas únicas. Nacida en clubes y festivales, abarca géneros como el house, techno, trance y dubstep, cada uno con su propia identidad. Con sintetizadores, samplers y beats digitales, la electrónica transforma la pista de baile en una experiencia sensorial que conecta cuerpo y mente."
    },
    {
      title: "Música jazz",
      image: "https://static.vecteezy.com/system/resources/thumbnails/013/146/098/small_2x/jazz-musician-playing-saxophone-scratchboard-png.png",
      description: "El jazz es un género sofisticado y lleno de alma, nacido en los barrios de Nueva Orleans. Se caracteriza por la improvisación, los ritmos sincopados y una conexión profunda entre los músicos. Con instrumentos como el saxofón, el contrabajo y la trompeta, el jazz transmite emociones complejas y una libertad creativa que lo convierte en una de las formas musicales más expresivas y versátiles del mundo."
    },
    {
      title: "Música pop",
      image: "https://dbdzm869oupei.cloudfront.net/img/sticker/preview/3721.png",
      description: "La música pop es vibrante, accesible y contagiosa. Dominando las listas de éxitos desde hace décadas, este género combina melodías pegajosas con ritmos bailables y letras universales. Adaptándose constantemente a nuevas tendencias, el pop conecta con públicos de todas las edades y culturas, haciendo de cada canción una experiencia fácil de recordar y cantar."
    },
    {
      title: "Música hip hop",
      image: "https://png.pngtree.com/png-vector/20231210/ourmid/pngtree-typography-graffiti-hip-hop-letters-vector-png-image_262487.png",
      description: "El hip hop es una cultura y un género musical que nació en las calles como forma de expresión social y artística. A través del rap, beats urbanos y mensajes directos, aborda temas como la identidad, la lucha y la superación. Con influencias del soul, funk y electrónica, el hip hop ha evolucionado hasta convertirse en un fenómeno global con voz propia."
    },
    {
      title: "Música reggae",
      image: "https://img1.picmix.com/output/stamp/normal/3/0/9/2/2282903_e6980.png",
      description: "Originado en Jamaica, el reggae transmite un mensaje de paz, unidad y conciencia social. Con ritmos lentos y marcados, guitarras sincopadas y letras profundas, este género ganó fama mundial gracias a artistas como Bob Marley. El reggae no solo es música: es un estilo de vida que promueve la armonía, la espiritualidad y la resistencia cultural."
    }
  ];

  constructor(private themeService: ThemeService, private storageService: StorageService, private router: Router, private navCtrl: NavController,) {}

  ngOnInit() {
    // Suscribirse a los cambios de tema
    this.themeSubscription = this.themeService.temaActual$.subscribe(tema => {
      this.temaActual = tema;
    });

    // Obtener el tema actual inmediatamente (en caso de que ya esté cargado)
    this.temaActual = this.themeService.temaActual;
  }

  ngOnDestroy() {
    // Limpiar la suscripción para evitar memory leaks
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  // Método simplificado para cambiar tema
  async cambiarTema() {
    await this.themeService.cambiarTema();
  }

  async goIntro(){
    await this.storageService.remove('introView');
    this.router.navigateByUrl("/intro");
  }

    goToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}
