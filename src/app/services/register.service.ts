import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private storageService: StorageService) { }

  async registerUser(credentials: any): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        // Validar que todos los campos requeridos estén presentes
        if (!credentials.name || !credentials.lastName || !credentials.email || !credentials.password) {
          reject('Todos los campos son obligatorios');
          return;
        }

        // Limpiar datos de entrada
        const cleanCredentials = {
          name: credentials.name.trim(),
          lastName: credentials.lastName.trim(),
          email: credentials.email.toLowerCase().trim(),
          password: credentials.password
        };

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanCredentials.email)) {
          reject('El formato del correo no es válido');
          return;
        }

        // Validar longitud de contraseña
        if (cleanCredentials.password.length < 6) {
          reject('La contraseña debe tener al menos 6 caracteres');
          return;
        }

        // Validar que nombre y apellido solo contengan letras
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
        if (!nameRegex.test(cleanCredentials.name)) {
          reject('El nombre solo debe contener letras');
          return;
        }

        if (!nameRegex.test(cleanCredentials.lastName)) {
          reject('El apellido solo debe contener letras');
          return;
        }

        // Validar longitud mínima de nombre y apellido
        if (cleanCredentials.name.length < 3) {
          reject('El nombre debe tener al menos 3 caracteres');
          return;
        }

        if (cleanCredentials.lastName.length < 3) {
          reject('El apellido debe tener al menos 3 caracteres');
          return;
        }

        // Verificar si el usuario ya existe
        const existingUsers = await this.storageService.get('users') || [];
        const userExists = existingUsers.find((user: any) =>
          user.email.toLowerCase() === cleanCredentials.email.toLowerCase()
        );

        if (userExists) {
          reject('Ya existe un usuario registrado con este correo electrónico');
          return;
        }

        // Verificar email hardcodeado del admin
        if (cleanCredentials.email === 'leo@gmail.com') {
          reject('Este correo electrónico está reservado');
          return;
        }

        // Crear nuevo usuario
        const newUser = {
          name: cleanCredentials.name,
          lastName: cleanCredentials.lastName,
          email: cleanCredentials.email,
          password: cleanCredentials.password
        };

        // Agregar usuario a la lista de usuarios
        existingUsers.push(newUser);
        await this.storageService.set('users', existingUsers);

        console.log('Usuario registrado:', newUser);
        resolve('Usuario registrado exitosamente');

      } catch (error) {
        console.error('Error en registro:', error);
        reject('Error al registrar el usuario. Intenta nuevamente.');
      }
    });
  }

  // Método auxiliar para obtener todos los usuarios
  async getAllUsers(): Promise<any[]> {
    return await this.storageService.get('users') || [];
  }

  // Método auxiliar para verificar si un email ya existe
  async emailExists(email: string): Promise<boolean> {
    const users = await this.getAllUsers();
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
  }

  // Método para obtener un usuario por email
  async getUserByEmail(email: string): Promise<any | null> {
    const users = await this.getAllUsers();
    return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
  }
}
