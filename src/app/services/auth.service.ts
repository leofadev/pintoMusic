import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly urlService = 'https://music.fly.dev';

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  loginUser(credentials: any): Promise<any> {
    return new Promise(async (accept, reject) => {
      try {
        const payload = { user: credentials };

        const response: any = await lastValueFrom(
          this.http.post(`${this.urlService}/login`, payload)
        );

        if (response.status === 'OK') {
          await this.storageService.set("login", true);
          await this.storageService.set("currentUser", response.user);
          accept(response.user);
        } else {
          reject(response.msg || 'Credenciales incorrectas');
        }

      } catch (error: any) {
        console.error('Error al conectar con la API:', error);
        const errorMsg = error?.error?.msg || 'Error en el servidor';
        reject(errorMsg);
      }
    });
  }
}
