import { Credenciales } from './../components/utils/credenciales';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Usuario } from '../models/usuario';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = environment.api
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  login(credenciales: Credenciales): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}/usuario/login`, credenciales, {headers: this.httpHeaders}).pipe(
      catchError(error => {
        return throwError(error)
      })
    )
  }

}
