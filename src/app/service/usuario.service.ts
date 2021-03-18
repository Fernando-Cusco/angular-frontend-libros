import { Credenciales } from './../components/utils/credenciales';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Usuario } from '../models/usuario';
import { catchError } from 'rxjs/operators';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = environment.api
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  private httpAuthorization = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json','Authorization': this.localstorage.getToken()})

  constructor(private http: HttpClient, private localstorage: LocalstorageService) { }

  login(credenciales: Credenciales): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}login`, credenciales, {headers: this.httpHeaders}).pipe(
      catchError(error => {
        return throwError(error)
      })
    )
  }

  registrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}registro`, usuario, {headers: this.httpHeaders}).pipe(
      catchError(error => {
        return throwError(error)
      })
    )
  }

  perfil(id: number):Observable<any> {
    return this.http.get<any>(`${this.url}usuario/perfil/${id}`, {headers: this.httpAuthorization}).pipe(
      catchError(error => {
        return error
      })
    )
  }

}
