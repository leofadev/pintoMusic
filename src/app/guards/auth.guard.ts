import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { StorageService } from "../services/storage.service"
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
    private router: Router, private storageService: StorageService
  ) {}

    async canActivate(): Promise<boolean> {
    const value = await this.storageService.get('login');

    if (value === true) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
};
