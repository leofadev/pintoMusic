import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavParams, IonicModule, ModalController } from '@ionic/angular';
import { ThemeService, Theme } from '../services/theme.service';import { StorageService } from '../services/storage.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,]
})
export class SongsModalPage implements OnInit {

  songs: any;
  artists: any;
  temaActual!: Theme;
  private themeSubscription!: Subscription;

  constructor(private themeService: ThemeService, private storageService: StorageService, private navParams: NavParams, private modalCtrl: ModalController) { }

  ngOnInit() {

    // Suscribirse a los cambios de tema
    this.themeSubscription = this.themeService.temaActual$.subscribe(tema => {
      this.temaActual = tema;
    });

    // Obtener el tema actual inmediatamente (en caso de que ya esté cargado)
    this.temaActual = this.themeService.temaActual;

    const receivedData = this.navParams.data;
    console.log('Datos recibidos completos:', receivedData);
    
    const songsData = receivedData['songs'];

    if (Array.isArray(songsData)) {
      // Caso 1: songs es directamente un array: { songs: [...] }
      this.songs = songsData;
      this.artists = receivedData['artist'] ?? null;
      console.log('Caso 1 - Songs como array directo:', this.songs, this.artists);
    } else if (songsData && typeof songsData === 'object' && songsData.tracks) {
      // Caso 2: songs es un objeto con tracks y artist: { songs: { tracks: [...], artist: {...} } }
      this.songs = songsData.tracks || [];
      this.artists = songsData.artist ?? null;
      console.log('Caso 2 - Songs como objeto con tracks:', this.songs, this.artists);
    } else {
      // Fallback - no se encontró estructura conocida
      this.songs = [];
      this.artists = null;
      console.log('Fallback - No se encontró estructura conocida');
    }

    console.log('Resultado final - Songs:', this.songs, 'Artists:', this.artists);

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

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  formatearDuracion(ms: number): string {
    const minutos = Math.floor(ms / 60000);
    const segundos = Math.floor((ms % 60000) / 1000);
    return `${minutos}:${segundos < 10 ? '0' + segundos : segundos}`;
  }

}
