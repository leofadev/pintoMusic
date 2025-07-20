import { Injectable } from '@angular/core';
import{ Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage |null = null;
  constructor(private storage: Storage ) {
    this.init();
  }

  async init () {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  private async ready(){
    if (!this._storage) {
      await this.init();
    }
  }

  /* Puedo setear datos en el storage */
  public async set(key: string, value: any){
    await this.ready();
    return this._storage?.set(key, value);
  }

  /* Obtener datos del storage */
  public async get(key: string){
    await this.ready();
    return this._storage?.get(key);
  }

  public async remove(key: string){
    await this.ready();
    return this._storage?.remove(key);
  }

  public async clear(){
    await this.ready();
    return this._storage?.clear();
  }

  public async keys(){
    await this.ready();
    return this._storage?.keys();
  }

  public async length(){
    await this.ready();
    return this._storage?.length();
  }
}
