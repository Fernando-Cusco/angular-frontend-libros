import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Autor } from '../models/autor';
import { environment } from '../../environments/environment';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  private url: string = environment.api
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json','Authorization': this.localstorage.getToken()})

  constructor(private http: HttpClient, private localstorage: LocalstorageService) { }


  all():Observable<Autor[]> {
    return this.http.get<Autor[]>(`${this.url}autor/all`, {headers: this.httpHeaders}).pipe(
      catchError(error => {
        console.log('Error para listar');
        return throwError(error)
      })
    )
  }

  findById(id: number): Observable<Autor> {
    return this.http.get<Autor>(`${this.url}autor/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(error => {
        console.log('Error al buscar');
        return throwError(error)
      })
    )
  }

  save(autor: Autor):Observable<Autor> {
    return this.http.post<Autor>(`${this.url}autor`, autor, {headers: this.httpHeaders}).pipe(
      catchError(error => {
        console.log('Error al crear');
        return throwError(error)
      })
    )
  }
}
