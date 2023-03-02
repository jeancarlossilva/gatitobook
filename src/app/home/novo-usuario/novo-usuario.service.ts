import { environment } from './../../../environments/environment.prod';
import { NovoUsuario } from './novo-usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class NovoUsuarioService {

  constructor(private httpCliente: HttpClient) { }

  cadastraNovoUsuario(novoUsuario: NovoUsuario){
    return this.httpCliente.post(`${API}/user/signup`, novoUsuario);
  }

  verificaUsuarioExistente(novoUsuario: string){
    return this.httpCliente.get(`${API}/user/exists/${novoUsuario}`);
  }

}
