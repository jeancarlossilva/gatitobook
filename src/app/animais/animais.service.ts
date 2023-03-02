import { environment } from './../../environments/environment.prod';
import { TokenService } from './../autenticacao/token.service';
import { catchError, Observable, throwError, mapTo, of } from 'rxjs';
import { Animais, Animal } from './animais';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = environment.apiURL;
const NOT_MODIFIED = '304'

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(private httpClient: HttpClient, private tokenService:TokenService) { }

  listaDoUsuario(nomeDoUsuario: string): Observable<Animais> {
    return this.httpClient.get<Animais>(`${API}/${nomeDoUsuario}/photos`);
  }

  buscaPorID(id: number): Observable<Animal>{
    return this.httpClient.get<Animal>(`${API}/photos/${id}`);
  }

  excluiAnimal(id: number): Observable<Animal> {
    return this.httpClient.delete<Animal>(`${API}/photos/${id}`);
  }

  curtir(id: number): Observable<boolean> {
    return this.httpClient.post(
      `${API}/photos/${id}/like`,
      {},
      {observe: 'response'}
    ).pipe(
      mapTo(true),
      catchError((error)=> {return error.status == NOT_MODIFIED ? of(false) : throwError(error)})
    );
  }


  upload(descricao: string, permiteComentario: boolean, arquivo: File) {
    const formData = new FormData();
    formData.append('description', descricao);
    formData.append('allowComments', permiteComentario ? 'true' : 'false');
    formData.append('imageFile', arquivo)

    return this.httpClient.post(`${API}/photos/upload`, formData, {
      observe: 'events',
      reportProgress: true
    })
  }

}
