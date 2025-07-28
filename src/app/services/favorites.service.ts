import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { StorageService } from '../services/storage.service';

export interface FavoriteTrack {
  id: number;
  name: string;
  artist: string;
  duration_ms: number;
  preview_url?: string;
  user_id: number;
  track_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private apiUrl = 'https://music.fly.dev';
  private favoritesSubject = new BehaviorSubject<FavoriteTrack[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();

  constructor(private http: HttpClient, private storageService: StorageService) {
    this.initializeFavorites();
  }

  private async initializeFavorites(): Promise<void> {
    await this.loadUserFavorites();
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  /**
   * SERVICIO 1: Validar si una canción está en favoritos
   * Basado en GET /user_favorites/:user_id
   */
  async isTrackInFavorites(trackId: number): Promise<boolean> {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) return false;

      return new Promise((resolve) => {
        this.getUserFavorites(userId).subscribe({
          next: (favorites) => {
            const isFavorite = favorites.some(fav => fav.track_id === trackId);
            resolve(isFavorite);
          },
          error: () => resolve(false)
        });
      });
    } catch (error) {
      console.error('Error validando favorito:', error);
      return false;
    }
  }

  /**
   * SERVICIO 2: Agregar una canción a favoritos
   * Basado en POST /favorite_tracks (asumiendo estructura Rails estándar)
   */
  async addTrackToFavorites(song: any): Promise<Observable<{success: boolean, message: string, data?: any}>> {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        return of({success: false, message: 'Usuario no autenticado'});
      }

      // Verificar primero si ya está en favoritos
      const isAlreadyFavorite = await this.isTrackInFavorites(song.id);
      if (isAlreadyFavorite) {
        return of({success: false, message: 'La canción ya está en favoritos'});
      }

      const favoriteData = {
        favorite_track: {
          user_id: userId,
          track_id: song.id,
          name: song.name,
          artist: song.artists?.[0]?.name || song.artist || 'Artista desconocido',
          duration_ms: song.duration_ms || 0,
          preview_url: song.preview_url
        }
      };

      return this.http.post<any>(`${this.apiUrl}/favorite_tracks`, favoriteData, {
        headers: this.getHeaders()
      }).pipe(
        tap((response) => {
          // Actualizar la lista local de favoritos
          const currentFavorites = this.favoritesSubject.value;
          const newFavorite: FavoriteTrack = {
            id: response.id || Date.now(), // ID temporal si no viene del servidor
            user_id: userId,
            track_id: song.id,
            name: song.name,
            artist: song.artists?.[0]?.name || song.artist || 'Artista desconocido',
            duration_ms: song.duration_ms || 0,
            preview_url: song.preview_url
          };
          this.favoritesSubject.next([...currentFavorites, newFavorite]);
          console.log('✅ Canción agregada a favoritos:', song.name);
        }),
        map(response => ({
          success: true,
          message: 'Canción agregada a favoritos correctamente',
          data: response
        })),
        catchError(error => {
          console.error('❌ Error agregando a favoritos:', error);
          return of({success: false, message: 'Error al agregar a favoritos'});
        })
      );
    } catch (error) {
      console.error('Error obteniendo userId para agregar favorito:', error);
      return of({success: false, message: 'Usuario no autenticado'});
    }
  }

  /**
   * SERVICIO 3: Eliminar una canción de favoritos
   * NOTA: La API de Postman no incluye DELETE, necesitarás implementarlo
   * Por ahora simularemos con eliminación local + llamada ficticia
   */
  async removeTrackFromFavorites(trackId: number): Promise<Observable<{success: boolean, message: string}>> {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        return of({success: false, message: 'Usuario no autenticado'});
      }

      // Encontrar el favorito en la lista local
      const currentFavorites = this.favoritesSubject.value;
      const favoriteToRemove = currentFavorites.find(fav => Number(fav.track_id) === Number(trackId));

      if (!favoriteToRemove) {
        return of({success: false, message: 'La canción no está en favoritos'});
      }

      // TODO: Implementar endpoint DELETE en el backend
      // Por ahora, solo eliminación local
      const updatedFavorites = currentFavorites.filter(fav => fav.track_id !== trackId);
      this.favoritesSubject.next(updatedFavorites);

      console.log('🗑️ Canción eliminada de favoritos (local):', favoriteToRemove.name);

      return of({success: true, message: 'Canción eliminada de favoritos correctamente'});

    } catch (error) {
      console.error('Error eliminando favorito:', error);
      return of({success: false, message: 'Error interno'});
    }
  }

  async toggleTrackFavorite(song: any): Promise<Observable<{success: boolean, message: string, data?: any}>> {
    const isFavorite = this.isSongFavorite(song.id);

    if (isFavorite) {
      return await this.removeTrackFromFavorites(song.id);
    } else {
      return await this.addTrackToFavorites(song);
    }
  }


  /**
   * Carga todos los favoritos del usuario actual
   * GET /user_favorites/:user_id
   */
  private async loadUserFavorites(): Promise<void> {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) return;

      this.getUserFavorites(userId).subscribe({
        next: (favorites) => {
          this.favoritesSubject.next(favorites);
          console.log('📚 Favoritos cargados:', favorites.length, 'canciones');
        },
        error: (error) => {
          console.error('❌ Error cargando favoritos:', error);
          this.favoritesSubject.next([]);
        }
      });
    } catch (error) {
      console.error('❌ Error obteniendo userId:', error);
      this.favoritesSubject.next([]);
    }
  }

  /**
   * Obtiene todos los favoritos de un usuario
   * GET /user_favorites/:user_id
   */
  getUserFavorites(userId: number): Observable<FavoriteTrack[]> {
    return this.http.get<FavoriteTrack[]>(`${this.apiUrl}/user_favorites/${userId}`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(error => {
        console.error('❌ Error obteniendo favoritos del usuario:', error);
        return of([]);
      })
    );
  }

  /**
   * Obtiene todos los favoritos (endpoint general)
   * GET /favorite_tracks
   */
  getAllFavorites(): Observable<FavoriteTrack[]> {
    return this.http.get<FavoriteTrack[]>(`${this.apiUrl}/favorite_tracks`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(error => {
        console.error('❌ Error obteniendo todos los favoritos:', error);
        return of([]);
      })
    );
  }

  /**
   * Verifica si una canción está en favoritos (método síncrono para UI)
   */
  isSongFavorite(trackId: number): boolean {
    return this.favoritesSubject.value.some(fav => fav.track_id === trackId);
  }

  /**
   * Obtiene la lista actual de favoritos
   */
  getCurrentFavorites(): FavoriteTrack[] {
    return this.favoritesSubject.value;
  }

  /**
   * Refresca la lista de favoritos
   */
  async refreshFavorites(): Promise<void> {
    await this.loadUserFavorites();
  }

  /**
   * Obtiene el ID del usuario actual
   */
  private async getCurrentUserId(): Promise<number | null> {
    try {
      const currentUser = await this.storageService.get('currentUser');
      if (!currentUser || !currentUser.id) {
        console.warn('⚠️ Usuario no autenticado o sin ID');
        return null;
      }
      return currentUser.id;
    } catch (error) {
      console.error('❌ Error obteniendo usuario actual:', error);
      return null;
    }
  }
}
