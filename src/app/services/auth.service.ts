import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private storageService: StorageService) { }

  loginUser(credentials: any){
    /* Si el guardar es exitoso guardar en el storage login: true */
    return new Promise( async(accept, reject) =>{
      try {
        // Primero verificar el usuario admin hardcodeado
        if (credentials.email == 'leo@gmail.com' && credentials.password == '123456') {
          await this.storageService.set("login", true);
          accept('Login correcto');
          return;
        }

        // Luego verificar usuarios registrados en el storage
        const users = await this.storageService.get('users') || [];
        const userFound = users.find((user: any) =>
          user.email.toLowerCase() === credentials.email.toLowerCase() &&
          user.password === credentials.password
        );

        if (userFound) {
          await this.storageService.set("login", true);
          // Opcionalmente guardar info del usuario logueado
          await this.storageService.set("currentUser", {
            name: userFound.name,
            lastName: userFound.lastName,
            email: userFound.email
          });
          accept('Login correcto');
        } else {
          reject('Credenciales incorrectas');
        }

      } catch (error) {
        console.error('Error en login:', error);
        reject('Error al iniciar sesión');
      }
    })
  }
}
