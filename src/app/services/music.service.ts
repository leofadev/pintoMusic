import { Injectable } from '@angular/core';
import { Theme } from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  urlService = 'https://music.fly.dev';
  constructor() { }

  getTracks(){
    return fetch(`${this.urlService}/tracks`).then(
      response => response.json()
    );
  }

  getAlbums(){
    return fetch(`${this.urlService}/albums`).then(
      response => response.json()
    );
  }

  getArtists(){
    return fetch(`${this.urlService}/artists`).then(
      response => response.json()
    );
  }

  getSongsByAlbum(albumId: string){
    return fetch(`${this.urlService}/tracks/album/${albumId}`).then(
      response => response.json()
    );
  }

  async getSongsByArtist(artistId: string) {
    const [tracksRes, artistRes] = await Promise.all([
      fetch(`${this.urlService}/tracks/artist/${artistId}`),
      fetch(`${this.urlService}/artists/${artistId}`)
    ]);

    const [tracks, artist] = await Promise.all([
      tracksRes.json(),
      artistRes.json()
    ]);

    return { artist, tracks };
  }

}
