import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service'; // Ajusta la ruta si es necesario
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
  standalone: true
})
export class AppComponent {
  constructor(private router: Router, private storageService: StorageService) {}

  async ngOnInit() {
    const introView = await this.storageService.get('introView');

    if (introView) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/intro');
    }
  }
}
