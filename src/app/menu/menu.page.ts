import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ThemeService, Theme } from '../services/theme.service';
import { Subscription } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class MenuPage implements OnInit {

  temaActual!: Theme;
  private themeSubscription!: Subscription;

  constructor(private themeService: ThemeService, private storageService: StorageService, private router: Router, private navCtrl: NavController) { }

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

  async goToLogin() {
    this.navCtrl.navigateBack('/login');
  }

  async closeSession() {
    await this.storageService.remove('login');
    this.navCtrl.navigateBack('/login');
  }
}
