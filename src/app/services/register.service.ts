import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly API_URL = 'https://music.fly.dev';

  constructor(private http: HttpClient) { }

  async registerUser(credentials: any): Promise<string> {
    try {
      // Validaciones previas
      if (!credentials.name || !credentials.lastName || !credentials.email || !credentials.password) {
        throw 'Todos los campos son obligatorios';
      }

      const cleanCredentials = {
        name: credentials.name.trim(),
        last_name: credentials.lastName.trim(),
        email: credentials.email.toLowerCase().trim(),
        password: credentials.password,
        password_confirmation: credentials.password 
      };

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanCredentials.email)) {
        throw 'El formato del correo no es válido';
      }

      if (cleanCredentials.password.length < 6) {
        throw 'La contraseña debe tener al menos 6 caracteres';
      }

      const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
      if (!nameRegex.test(cleanCredentials.name)) {
        throw 'El nombre solo debe contener letras';
      }

      if (!nameRegex.test(cleanCredentials.last_name)) {
        throw 'El apellido solo debe contener letras';
      }

      if (cleanCredentials.name.length < 3) {
        throw 'El nombre debe tener al menos 3 caracteres';
      }

      if (cleanCredentials.last_name.length < 3) {
        throw 'El apellido debe tener al menos 3 caracteres';
      }

      // Enviar al backend con estructura correcta
      const payload = { user: cleanCredentials };

      await lastValueFrom(this.http.post(`${this.API_URL}/signup`, payload));
      return 'Usuario registrado exitosamente';
    } catch (error: any) {
      const msg = typeof error === 'string' ? error : error?.error?.msg || 'Error al registrar el usuario.';
      throw msg;
    }
  }

}
