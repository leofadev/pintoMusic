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
      if (credentials.email == 'leo@gmail.com' && credentials.password == '123456') {
        await this.storageService.set("login", true)
        accept('Login correcto');
      }else{
        reject('Login incorrecto');
      }
    })
  }
}
