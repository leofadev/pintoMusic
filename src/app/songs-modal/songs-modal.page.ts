import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavParams, IonicModule, ModalController } from '@ionic/angular';
import { ThemeService, Theme } from '../services/theme.service';
import { StorageService } from '../services/storage.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,]
})
export class SongsModalPage implements OnInit {

  // Propiedades para almacenar los datos de canciones y artistas
  songs: any;
  artists: any;
  songName: string | null = null;

  // Variables para el manejo de temas
  temaActual!: Theme;
  private themeSubscription!: Subscription;

  constructor(private themeService: ThemeService, private storageService: StorageService, private navParams: NavParams, private modalCtrl: ModalController) { }

  ngOnInit() {
    // Configurar la suscripción al tema actual
    this.themeSubscription = this.themeService.temaActual$.subscribe(tema => {
      this.temaActual = tema;
    });

    // Obtener el tema actual inmediatamente (en caso de que ya esté cargado)
    this.temaActual = this.themeService.temaActual;

    // Obtener los datos pasados al modal
    const receivedData = this.navParams.data;
    const songsData = receivedData['songs'];

    // Procesar los datos de canciones según su estructura
    if (Array.isArray(songsData)) {
      // Caso 1: songs es directamente un array: { songs: [...] }
      this.songs = songsData;
      this.artists = receivedData['artist'] ?? null;
    } else if (songsData && typeof songsData === 'object' && songsData.tracks) {
      // Caso 2: songs es un objeto con tracks y artist: { songs: { tracks: [...], artist: {...} } }
      this.songs = songsData.tracks || [];
      this.artists = songsData.artist ?? null;
    } else {
      // Fallback - no se encontró estructura conocida
      this.songs = [];
      this.artists = null;
    }

    // Obtener el nombre de la canción si está disponible
    this.songName = receivedData['songName'] ?? null;
  }

  ngOnDestroy() {
    // Limpiar la suscripción para evitar memory leaks
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  // Cambiar entre temas (claro/oscuro)
  async cambiarTema() {
    await this.themeService.cambiarTema();
  }

  // Cerrar el modal sin seleccionar ninguna canción
  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  // Convertir duración de milisegundos a formato MM:SS
  formatearDuracion(ms: number): string {
    const minutos = Math.floor(ms / 60000);
    const segundos = Math.floor((ms % 60000) / 1000);
    return `${minutos}:${segundos < 10 ? '0' + segundos : segundos}`;
  }

  // Seleccionar una canción y cerrar el modal retornando la canción seleccionada
  async selectSong(song: any){
    await this.modalCtrl.dismiss(song);
  }
}
